package com.aurevia.orderservice.dto;

import lombok.Data;

@Data
public class ReduceStockRequest {

    private String productId;

    private Integer quantity;
}