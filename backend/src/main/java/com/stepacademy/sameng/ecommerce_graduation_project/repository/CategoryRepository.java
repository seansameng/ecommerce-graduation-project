package com.stepacademy.sameng.ecommerce_graduation_project.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.stepacademy.sameng.ecommerce_graduation_project.models.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    Optional<Category> findByNameIgnoreCase(String name);
}
