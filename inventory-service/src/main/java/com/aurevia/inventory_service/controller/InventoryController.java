package com.aurevia.inventory_service.controller;

import com.aurevia.inventory_service.dto.CreateInventoryRequest;
import com.aurevia.inventory_service.dto.ReduceStockRequest;
import com.aurevia.inventory_service.entity.Inventory;
import com.aurevia.inventory_service.service.InventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/inventory")
@RequiredArgsConstructor
public class InventoryController {

    private final InventoryService inventoryService;

    @PostMapping
    public Inventory createInventory(
            @RequestBody
            CreateInventoryRequest request
    ) {

        return inventoryService.createInventory(request);
    }

    @PutMapping("/reduce")
    public Inventory reduceStock(
            @RequestBody
            ReduceStockRequest request
    ) {

        return inventoryService.reduceStock(request);
    }

    @PutMapping("/add")
    public Inventory addStock(
            @RequestBody
            ReduceStockRequest request
    ) {

        return inventoryService.addStock(request);
    }

    @GetMapping("/{productId}")
    public Inventory getInventory(
            @PathVariable String productId
    ) {

        return inventoryService.getInventory(productId);
    }
}