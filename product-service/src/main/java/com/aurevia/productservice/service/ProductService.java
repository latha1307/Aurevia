package com.aurevia.productservice.service;

import com.aurevia.productservice.dto.CreateProductRequest;
import com.aurevia.productservice.entity.Product;
import com.aurevia.productservice.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.*;

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
        product.setImages(request.getImages());
        product.setVendor(request.getVendor());
        product.setVendorId(request.getVendorId());
        product.setRating(request.getRating());
        product.setFeatured(request.getFeatured());
        product.setTags(request.getTags());
        product.setOriginalPrice(request.getOriginalPrice());
        product.setReviews(request.getReviews());
        product.setVariants(mapVariants(request.getVariants()));
        product.setSpecifications(mapSpecifications(request.getSpecifications()));
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

        if (request == null) {
            return product;
        }

        if (request.getName() != null) product.setName(request.getName());
        if (request.getDescription() != null) product.setDescription(request.getDescription());
        if (request.getPrice() != null) product.setPrice(request.getPrice());
        if (request.getStock() != null) product.setStock(request.getStock());
        if (request.getCategory() != null) product.setCategory(request.getCategory());
        if (request.getImageUrl() != null) product.setImageUrl(request.getImageUrl());
        if (request.getImages() != null) product.setImages(request.getImages());
        if (request.getVendor() != null) product.setVendor(request.getVendor());
        if (request.getVendorId() != null) product.setVendorId(request.getVendorId());
        if (request.getRating() != null) product.setRating(request.getRating());
        if (request.getFeatured() != null) product.setFeatured(request.getFeatured());
        if (request.getTags() != null) product.setTags(request.getTags());
        if (request.getOriginalPrice() != null) product.setOriginalPrice(request.getOriginalPrice());
        if (request.getReviews() != null) product.setReviews(request.getReviews());
        if (request.getVariants() != null) product.setVariants(mapVariants(request.getVariants()));
        if (request.getSpecifications() != null) product.setSpecifications(mapSpecifications(request.getSpecifications()));

        return productRepository.save(product);
    }

    // DELETE
    public String deleteProduct(String id) {

        Product product = getProductById(id);

        productRepository.delete(product);

        return "Product deleted successfully";
    }

    private static Product.ProductVariant[] mapVariants(CreateProductRequest.ProductVariant[] requestVariants) {
        if (requestVariants == null) {
            return null;
        }

        Product.ProductVariant[] variants = new Product.ProductVariant[requestVariants.length];
        for (int i = 0; i < requestVariants.length; i++) {
            CreateProductRequest.ProductVariant requestVariant = requestVariants[i];
            Product.ProductVariant variant = new Product.ProductVariant();
            variant.setName(requestVariant.getName());
            variant.setPrice(requestVariant.getPrice());
            variant.setStock(requestVariant.getStock());
            variant.setImage(requestVariant.getImage());
            variant.setOptions(requestVariant.getOptions());
            variants[i] = variant;
        }

        return variants;
    }

    private static Product.Specification[] mapSpecifications(CreateProductRequest.Specification[] requestSpecs) {
        if (requestSpecs == null) {
            return null;
        }

        Product.Specification[] specs = new Product.Specification[requestSpecs.length];
        for (int i = 0; i < requestSpecs.length; i++) {
            CreateProductRequest.Specification requestSpec = requestSpecs[i];
            Product.Specification spec = new Product.Specification();
            spec.setKey(requestSpec.getKey());
            spec.setValue(requestSpec.getValue());
            specs[i] = spec;
        }

        return specs;
    }
}