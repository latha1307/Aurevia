package com.aurevia.orderservice.client;

import com.aurevia.orderservice.dto.ReduceStockRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "INVENTORY-SERVICE")
public interface InventoryClient {

    @PutMapping("/api/inventory/reduce")
    void reduceStock(
            @RequestBody ReduceStockRequest request
    );
}