package com.aurevia.orderservice.repository;

import com.aurevia.orderservice.entity.Order;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface OrderRepository
        extends MongoRepository<Order, String> {

    List<Order> findByUserEmail(String userEmail);
}