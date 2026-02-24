package com.stepacademy.sameng.ecommerce_graduation_project.services;

import java.util.List;

import com.stepacademy.sameng.ecommerce_graduation_project.dtos.order.OrderRequest;
import com.stepacademy.sameng.ecommerce_graduation_project.dtos.order.OrderResponse;

public interface OrderService {
    List<OrderResponse> getAll();

    List<OrderResponse> getForUser(Long userId);

    OrderResponse getById(Long id);

    OrderResponse createOrder(OrderRequest request);
}
