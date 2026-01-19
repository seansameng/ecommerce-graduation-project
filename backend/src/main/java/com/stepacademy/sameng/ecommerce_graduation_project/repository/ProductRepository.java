package com.stepacademy.sameng.ecommerce_graduation_project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.stepacademy.sameng.ecommerce_graduation_project.models.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategoryId(Long categoryId);



    List<Product> findByNameContaining(String name);
}
