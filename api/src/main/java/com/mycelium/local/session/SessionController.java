package com.mycelium.local.session;

import java.net.URI;
import java.util.Map;

import com.mycelium.local.repository.user.UserRepo;

import io.micronaut.http.HttpResponse;
import io.micronaut.http.annotation.Body;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.Post;
import io.micronaut.security.annotation.Secured;
import io.micronaut.security.authentication.Authentication;
import io.micronaut.security.rules.SecurityRule;

class RegisterRequest {
    public String username;
    public String password;
    public String name;
    public String lastname;
}

class SessionResponse {
    public Integer id;
    public String email;
    public String name;
    public String lastname;
    public Integer roleId;
    public String role;

    public SessionResponse(Integer id, String email, String name, String lastname, Integer roleId, String role) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.lastname = lastname;
        this.roleId = roleId;
        this.role = role;
    }

    public static SessionResponse empty() {
        return new SessionResponse(null, null, null, null, null, null);
    }
}

@Secured(SecurityRule.IS_ANONYMOUS)
@Controller("/")
public class SessionController {

    private UserRepo userRepo;

    public SessionController(UserRepo userRepo) {
        super();
        this.userRepo = userRepo;
    }

    @Post("/register")
    public HttpResponse<?> register(@Body RegisterRequest body) {
        var foundUsers = this.userRepo.findByEmail(body.username);

        if (foundUsers.size() > 0) {
            return HttpResponse.ok(Map.of("code", "fail"));
        }

        this.userRepo.create(body.name, body.lastname, body.username, body.password, 1);

        return HttpResponse.temporaryRedirect(URI.create("login"));
    }

    @Get("/session")
    public SessionResponse session(Authentication authentication) {
        var userMap = authentication.getAttributes();
        var userId = (int) (long) userMap.get("id");

        var userOpt = this.userRepo.findById(userId);

        if (userOpt.isEmpty()) {
            return SessionResponse.empty();
        } else {
            var user = userOpt.get();
            return new SessionResponse(user.id, user.email, user.name, user.lastname, user.roleId, user.role.name);
        }
    }
}
