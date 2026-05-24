package com.aurevia.productservice.service;

import com.aurevia.productservice.dto.CreateProductRequest;
import com.aurevia.productservice.entity.Product;
import com.aurevia.productservice.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.*;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    // CREATE
    public Product createProduct(CreateProductRequest request) {

        Product product = new Product();

        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setStock(request.getStock());
        product.setCategory(request.getCategory());
        product.setImageUrl(request.getImageUrl());

        return productRepository.save(product);
    }

    // GET ALL
    public Page<Product> getAllProducts(
            int page,
            int size,
            String search,
            String category,
            String sortBy,
            String direction
    ) {
    
        Sort sort = direction.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();
    
        Pageable pageable =
                PageRequest.of(page, size, sort);
    
        boolean hasSearch =
                search != null && !search.isBlank();
    
        boolean hasCategory =
                category != null && !category.isBlank();
    
        // SEARCH + CATEGORY
        if (hasSearch && hasCategory) {
        
            return productRepository
                    .findByNameContainingIgnoreCaseAndCategoryIgnoreCase(
                            search,
                            category,
                            pageable
                    );
        }
    
        // SEARCH ONLY
        if (hasSearch) {
        
            return productRepository
                    .findByNameContainingIgnoreCase(
                            search,
                            pageable
                    );
        }
    
        // CATEGORY ONLY
        if (hasCategory) {
        
            return productRepository
                    .findByCategoryIgnoreCase(
                            category,
                            pageable
                    );
        }
    
        // ALL PRODUCTS
        return productRepository.findAll(pageable);
    }

    // GET BY ID
    public Product getProductById(String id) {

        return productRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Product not found"));
    }

    // UPDATE
    public Product updateProduct(
            String id,
            CreateProductRequest request
    ) {

        Product product = getProductById(id);

        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setStock(request.getStock());
        product.setCategory(request.getCategory());
        product.setImageUrl(request.getImageUrl());

        return productRepository.save(product);
    }

    // DELETE
    public String deleteProduct(String id) {

        Product product = getProductById(id);

        productRepository.delete(product);

        return "Product deleted successfully";
    }
}