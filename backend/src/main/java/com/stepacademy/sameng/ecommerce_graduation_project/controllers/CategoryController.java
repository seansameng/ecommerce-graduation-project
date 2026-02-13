package com.stepacademy.sameng.ecommerce_graduation_project.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stepacademy.sameng.ecommerce_graduation_project.dtos.category.CategoryResponse;
import com.stepacademy.sameng.ecommerce_graduation_project.services.CategoryService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/categories")
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping
    public List<CategoryResponse> getAll() {
        return categoryService.getAll();
    }

    @GetMapping("/{id}")
    public CategoryResponse getById(@PathVariable Long id) {
        return categoryService.getById(id);
    }
}
