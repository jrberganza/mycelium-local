package com.mycelium.local.controller.integration;

import java.util.List;

import com.google.common.collect.Lists;
import com.mycelium.local.repository.integration.Integration;
import com.mycelium.local.repository.integration.IntegrationRepo;

import io.micronaut.http.annotation.Body;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Delete;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.Post;
import io.micronaut.http.annotation.Put;
import io.micronaut.security.annotation.Secured;
import io.micronaut.security.rules.SecurityRule;

class IntegrationCreateRequest {
    public String name;
    public String request;
    public String user;
    public String password;
}

@Secured(SecurityRule.IS_AUTHENTICATED)
@Controller("/integration")
public class IntegrationController {

    private IntegrationRepo integrationRepo;

    public IntegrationController(IntegrationRepo integrationRepo) {
        this.integrationRepo = integrationRepo;
    }

    @Get("/")
    public List<Integration> list() {
        return Lists.newArrayList(integrationRepo.findAll());
    }

    @Get("/{id}")
    public Integration get(int id) {
        return integrationRepo.findById(id).get();
    }

    @Secured(SecurityRule.IS_AUTHENTICATED)
    @Post("/")
    public List<Integration> create(@Body IntegrationCreateRequest body) {
        var newIntegration = new Integration();
        newIntegration.name = body.name;
        newIntegration.request = body.request;
        newIntegration.user = body.user;
        newIntegration.password = body.password; // TODO: hash
        integrationRepo.save(newIntegration);
        return list();
    }

    @Secured(SecurityRule.IS_AUTHENTICATED)
    @Put("/{id}")
    public List<Integration> update(int id, @Body IntegrationCreateRequest body) {
        var integration = integrationRepo.findById(id).get();
        integration.name = body.name;
        integration.request = body.request;
        integration.user = body.user;
        integration.password = body.password; // TODO: hash
        integrationRepo.update(integration);
        return list();
    }

    @Secured(SecurityRule.IS_AUTHENTICATED)
    @Delete("/{id}")
    public List<Integration> delete(int id) {
        integrationRepo.deleteById(id);
        return list();
    }
}