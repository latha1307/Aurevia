package com.aurevia.orderservice.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class CartItemResponse {

    private String productId;

    private String productName;

    private BigDecimal price;

    private Integer quantity;
}