package com.aurevia.productservice.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class CreateProductRequest {

    private String name;

    private String description;

    private BigDecimal price;

    private Integer stock;

    private String category;

    private String imageUrl;

    private String[] images;

    private String vendorId;

    private String vendor;

    private BigDecimal rating;

    private Boolean featured;

    private String[] tags;

    private BigDecimal originalPrice;

    private Integer reviews;

    private ProductVariant[] variants;

    private Specification[] specifications;

    @Data
    public static class ProductVariant {
        private String name;

        private BigDecimal price;

        private Integer stock;

        private String image;

        private String[] options;
    }

    @Data
    public static class Specification {
        private String key;
        private String value;
    }

}