package com.stepacademy.sameng.ecommerce_graduation_project.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.Authentication;

import com.stepacademy.sameng.ecommerce_graduation_project.dtos.order.OrderRequest;
import com.stepacademy.sameng.ecommerce_graduation_project.dtos.order.OrderResponse;
import com.stepacademy.sameng.ecommerce_graduation_project.services.OrderService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @GetMapping
    public List<OrderResponse> getAll() {
        return orderService.getAll();
    }

    @GetMapping("/me")
    public List<OrderResponse> getMine(Authentication authentication) {
        Long userId = (Long) authentication.getPrincipal();
        return orderService.getForUser(userId);
    }

    @GetMapping("/{id}")
    public OrderResponse getById(@PathVariable Long id) {
        return orderService.getById(id);
    }

    @PostMapping
    public OrderResponse create(@Valid @RequestBody OrderRequest request) {
        return orderService.createOrder(request);
    }
}
