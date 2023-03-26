package com.mycelium.local.repository.integorderproduct;

import java.util.List;

import io.micronaut.data.annotation.Repository;
import io.micronaut.data.jdbc.annotation.JdbcRepository;
import io.micronaut.data.model.query.builder.sql.Dialect;
import io.micronaut.data.repository.CrudRepository;

@Repository("default")
@JdbcRepository(dialect = Dialect.ORACLE)
public interface IntegOrderProductRepo extends CrudRepository<IntegOrderProduct, Integer> {
    List<IntegOrderProduct> findByOrderId(int orderId);
}
