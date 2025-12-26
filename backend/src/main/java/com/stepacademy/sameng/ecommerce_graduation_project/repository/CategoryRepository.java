package com.stepacademy.sameng.ecommerce_graduation_project.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.stepacademy.sameng.ecommerce_graduation_project.models.Category;

@Repository

public interface CategoryRepository extends JpaRepository<Category, Long> {
    Optional<Category> findByName(String name);

    boolean existsByName(String name);
}
