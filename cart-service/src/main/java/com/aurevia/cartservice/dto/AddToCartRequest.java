package com.aurevia.cartservice.dto;

import lombok.Data;

@Data
public class AddToCartRequest {

    private String userEmail;

    private String productId;

    private Integer quantity;
}