package com.aurevia.cartservice.dto;

import lombok.Data;

@Data
public class UpdateQuantityRequest {

    private String userEmail;

    private String productId;

    private Integer quantity;
}