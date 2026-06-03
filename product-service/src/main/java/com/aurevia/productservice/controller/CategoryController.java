package com.aurevia.productservice.controller;

import com.aurevia.productservice.entity.Category;
import com.aurevia.productservice.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping
    public List<Category> getAllCategories() {
        return categoryService.getAllCategories();
    }

    @PostMapping
    public Category createCategory(
            @RequestBody Category category
    ) {
        return categoryService.createCategory(category);
    }
}