package com.aurevia.productservice.controller;

import com.aurevia.productservice.dto.CreateProductRequest;
import com.aurevia.productservice.entity.Product;
import com.aurevia.productservice.service.ProductService;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    // CREATE
    @PostMapping
    public Product createProduct(
            @RequestBody CreateProductRequest request
    ) {
        return productService.createProduct(request);
    }

    // GET ALL
    @GetMapping
    public Page<Product> getAllProducts(
    
            @RequestParam(defaultValue = "0")
            int page,
    
            @RequestParam(defaultValue = "5")
            int size,
    
            @RequestParam(defaultValue = "")
            String search,
    
            @RequestParam(defaultValue = "")
            String category,
    
            @RequestParam(defaultValue = "name")
            String sortBy,
    
            @RequestParam(defaultValue = "asc")
            String direction
    ) {
    
        return productService.getAllProducts(
                page,
                size,
                search,
                category,
                sortBy,
                direction
        );
    }

    // GET BY ID
    @GetMapping("/{id}")
    public Product getProductById(
            @PathVariable String id
    ) {
        return productService.getProductById(id);
    }

    // UPDATE
    @PutMapping("/{id}")
    public Product updateProduct(
            @PathVariable String id,
            @RequestBody CreateProductRequest request
    ) {
        return productService.updateProduct(id, request);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public String deleteProduct(
            @PathVariable String id
    ) {
        return productService.deleteProduct(id);
    }
}