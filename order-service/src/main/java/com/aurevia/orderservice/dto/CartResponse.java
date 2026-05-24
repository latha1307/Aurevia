package com.aurevia.orderservice.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class CartResponse {

    private String id;

    private String userEmail;

    private List<CartItemResponse> items;

    private BigDecimal totalPrice;
}