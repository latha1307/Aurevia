package com.aurevia.cartservice.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductResponse {

    private String id;

    private String name;

    private BigDecimal price;

    private Integer stock;
}