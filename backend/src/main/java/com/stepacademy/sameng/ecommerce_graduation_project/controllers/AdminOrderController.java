package com.stepacademy.sameng.ecommerce_graduation_project.controllers;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stepacademy.sameng.ecommerce_graduation_project.dtos.order.OrderResponse;
import com.stepacademy.sameng.ecommerce_graduation_project.dtos.order.OrderStatusRequest;
import com.stepacademy.sameng.ecommerce_graduation_project.services.OrderService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin/orders")
public class AdminOrderController {

    private final OrderService orderService;

    @PutMapping("/{id}/status")
    public OrderResponse updateStatus(@PathVariable Long id, @Valid @RequestBody OrderStatusRequest request) {
        return orderService.updateStatus(id, request);
    }
}
