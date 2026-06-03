package com.aurevia.productservice.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "products")
public class Product {

    @Id
    private String id;

    private String name;

    private String description;

    private BigDecimal price;

    private Integer stock;

    private String category;

    private String imageUrl;

    private String[] images;

    private BigDecimal rating;

    private Boolean featured;

    private String vendorId;

    private String vendor;

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