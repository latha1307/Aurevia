package com.aurevia.inventory_service.dto;

import lombok.Data;

@Data
public class ReduceStockRequest {

    private String productId;

    private Integer quantity;
}