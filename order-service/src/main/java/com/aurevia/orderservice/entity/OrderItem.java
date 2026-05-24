package com.aurevia.orderservice.entity;

import lombok.*;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderItem {

    private String productId;

    private String productName;

    private BigDecimal price;

    private Integer quantity;
}