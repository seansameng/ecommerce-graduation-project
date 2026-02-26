package com.stepacademy.sameng.ecommerce_graduation_project.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.stepacademy.sameng.ecommerce_graduation_project.models.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    Optional<Payment> findByOrderId(Long orderId);

    boolean existsByOrderId(Long orderId);

    List<Payment> findByOrderUserIdOrderByCreatedAtDesc(Long userId);
}
