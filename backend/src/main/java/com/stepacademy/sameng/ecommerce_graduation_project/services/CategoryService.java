package com.stepacademy.sameng.ecommerce_graduation_project.services;

import java.util.List;

import com.stepacademy.sameng.ecommerce_graduation_project.dtos.category.CategoryRequest;
import com.stepacademy.sameng.ecommerce_graduation_project.dtos.category.CategoryResponse;

public interface CategoryService {
    List<CategoryResponse> getAll();

    CategoryResponse getById(Long id);

    CategoryResponse create(CategoryRequest request);

    CategoryResponse update(Long id, CategoryRequest request);

    void delete(Long id);
}
