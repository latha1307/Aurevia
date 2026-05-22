package com.aurevia.productservice.controller;

import com.aurevia.productservice.dto.CreateProductRequest;
import com.aurevia.productservice.entity.Product;
import com.aurevia.productservice.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @PostMapping
    public Product createProduct(
            @RequestBody CreateProductRequest request
    ) {
        return productService.createProduct(request);
    }
}