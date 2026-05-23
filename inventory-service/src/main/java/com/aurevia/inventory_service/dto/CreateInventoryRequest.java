package com.aurevia.inventory_service.dto;

import lombok.Data;

@Data
public class CreateInventoryRequest {

    private String productId;

    private Integer quantity;
}