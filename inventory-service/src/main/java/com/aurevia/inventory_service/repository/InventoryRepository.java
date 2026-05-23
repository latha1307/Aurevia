package com.aurevia.inventory_service.repository;

import com.aurevia.inventory_service.entity.Inventory;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface InventoryRepository
        extends MongoRepository<Inventory, String> {

    Optional<Inventory> findByProductId(String productId);
}