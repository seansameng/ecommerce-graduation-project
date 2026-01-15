package com.stepacademy.sameng.ecommerce_graduation_project.repository;

import java.util.List;

import com.stepacademy.sameng.ecommerce_graduation_project.models.Product;

public interface ProductRepository {
    List<Product> findByCategory(int  categoryId);

    List<Product> findByNameContaining(String name);
}
