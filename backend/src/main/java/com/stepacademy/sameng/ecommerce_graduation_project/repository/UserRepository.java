package com.stepacademy.sameng.ecommerce_graduation_project.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.stepacademy.sameng.ecommerce_graduation_project.models.User;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);
}
