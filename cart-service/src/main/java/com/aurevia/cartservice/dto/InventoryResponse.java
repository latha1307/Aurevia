package com.aurevia.cartservice.dto;

import lombok.Data;

@Data
public class InventoryResponse {

    private String id;

    private String productId;

    private Integer availableQuantity;
}