package com.stepacademy.sameng.ecommerce_graduation_project.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.stepacademy.sameng.ecommerce_graduation_project.models.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
