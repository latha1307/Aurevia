package com.aurevia.inventory_service.service;

import com.aurevia.inventory_service.dto.CreateInventoryRequest;
import com.aurevia.inventory_service.dto.ReduceStockRequest;
import com.aurevia.inventory_service.entity.Inventory;
import com.aurevia.inventory_service.repository.InventoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class InventoryService {

    private final InventoryRepository inventoryRepository;

    public Inventory createInventory(
            CreateInventoryRequest request
    ) {

        Inventory inventory = new Inventory();

        inventory.setProductId(request.getProductId());
        inventory.setAvailableQuantity(request.getQuantity());
        inventory.setReservedQuantity(0);

        return inventoryRepository.save(inventory);
    }

    public Inventory reduceStock(
            ReduceStockRequest request
    ) {

        Inventory inventory =
                inventoryRepository
                        .findByProductId(request.getProductId())
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Inventory not found"
                                ));

        if (inventory.getAvailableQuantity()
                < request.getQuantity()) {

            throw new RuntimeException(
                    "Insufficient stock"
            );
        }

        inventory.setAvailableQuantity(
                inventory.getAvailableQuantity()
                        - request.getQuantity()
        );

        return inventoryRepository.save(inventory);
    }


    public Inventory addStock(
            ReduceStockRequest request
    ) {
    
        Inventory inventory = inventoryRepository
                .findByProductId(request.getProductId())
                .orElseThrow(() ->
                        new RuntimeException("Inventory not found"));
    
        Integer currentAvailable = inventory.getAvailableQuantity();
        if (currentAvailable == null) {
            currentAvailable = 0;
        }
    
        inventory.setAvailableQuantity(
                currentAvailable + request.getQuantity()
        );
    
        return inventoryRepository.save(inventory);
    }

    public Inventory getInventory(
            String productId
    ) {

        return inventoryRepository
                .findByProductId(productId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Inventory not found"
                        ));
    }
}