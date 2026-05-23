package com.aurevia.inventory_service.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "inventory")
@Data
public class Inventory {

    @Id
    private String id;

    private String productId;

    private Integer availableQuantity;

    private Integer reservedQuantity;
}