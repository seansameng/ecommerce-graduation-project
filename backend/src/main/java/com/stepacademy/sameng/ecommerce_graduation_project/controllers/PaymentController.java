package com.stepacademy.sameng.ecommerce_graduation_project.controllers;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stepacademy.sameng.ecommerce_graduation_project.dtos.payment.PaymentRequest;
import com.stepacademy.sameng.ecommerce_graduation_project.dtos.payment.PaymentResponse;
import com.stepacademy.sameng.ecommerce_graduation_project.dtos.payment.PaymentStatusRequest;
import com.stepacademy.sameng.ecommerce_graduation_project.services.PaymentService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/payments")
public class PaymentController {

    private final PaymentService paymentService;

    @GetMapping
    public List<PaymentResponse> getAll() {
        return paymentService.getAll();
    }

    @GetMapping("/me")
    public List<PaymentResponse> getMine(Authentication authentication) {
        Long userId = (Long) authentication.getPrincipal();
        return paymentService.getForUser(userId);
    }

    @GetMapping("/{id}")
    public PaymentResponse getById(@PathVariable Long id) {
        return paymentService.getById(id);
    }

    @GetMapping("/order/{orderId}")
    public PaymentResponse getByOrderId(@PathVariable Long orderId) {
        return paymentService.getByOrderId(orderId);
    }

    @PostMapping
    public PaymentResponse create(@Valid @RequestBody PaymentRequest request) {
        return paymentService.create(request);
    }

    @PutMapping("/{id}/status")
    public PaymentResponse updateStatus(
            @PathVariable Long id,
            @Valid @RequestBody PaymentStatusRequest request) {
        return paymentService.updateStatus(id, request);
    }
}
