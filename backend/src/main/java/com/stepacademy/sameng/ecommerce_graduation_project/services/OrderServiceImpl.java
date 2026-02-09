package com.stepacademy.sameng.ecommerce_graduation_project.services;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.stepacademy.sameng.ecommerce_graduation_project.dtos.order.OrderRequest;
import com.stepacademy.sameng.ecommerce_graduation_project.dtos.order.OrderItemRequest;
import com.stepacademy.sameng.ecommerce_graduation_project.dtos.order.OrderItemResponse;
import com.stepacademy.sameng.ecommerce_graduation_project.dtos.order.OrderResponse;
import com.stepacademy.sameng.ecommerce_graduation_project.models.Order;
import com.stepacademy.sameng.ecommerce_graduation_project.models.OrderItem;
import com.stepacademy.sameng.ecommerce_graduation_project.models.Product;
import com.stepacademy.sameng.ecommerce_graduation_project.models.User;
import com.stepacademy.sameng.ecommerce_graduation_project.repository.OrderRepository;
import com.stepacademy.sameng.ecommerce_graduation_project.repository.ProductRepository;
import com.stepacademy.sameng.ecommerce_graduation_project.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    @Override
    @Transactional(readOnly = true)
    public List<OrderResponse> getAll() {
        return orderRepository.findAll().stream().map(this::toResponse).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public OrderResponse getById(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        return toResponse(order);
    }

    @Override
    @Transactional
    public OrderResponse createOrder(OrderRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Order order = Order.builder()
                .user(user)
                .orderCode(generateOrderCode())
                .customerName(valueOrFallback(request.getCustomerName(), user.getFullName()))
                .customerEmail(valueOrFallback(request.getCustomerEmail(), user.getEmail()))
                .customerPhone(valueOrFallback(request.getCustomerPhone(), user.getPhoneNumber()))
                .shippingAddress(request.getShippingAddress())
                .build();

        List<OrderItem> items = new ArrayList<>();
        BigDecimal subtotal = BigDecimal.ZERO;

        for (OrderItemRequest itemRequest : request.getItems()) {
            Product product = productRepository.findById(itemRequest.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));

            BigDecimal unitPrice = toMoney(product.getPrice());
            BigDecimal lineTotal = unitPrice.multiply(BigDecimal.valueOf(itemRequest.getQuantity()));

            OrderItem item = OrderItem.builder()
                    .order(order)
                    .product(product)
                    .quantity(itemRequest.getQuantity())
                    .unitPrice(unitPrice)
                    .lineTotal(lineTotal)
                    .build();

            items.add(item);
            subtotal = subtotal.add(lineTotal);
        }

        order.setItems(items);
        order.setSubtotal(subtotal);
        order.setTotal(subtotal);

        Order saved = orderRepository.save(order);
        return toResponse(saved);
    }

    private OrderResponse toResponse(Order order) {
        OrderResponse response = new OrderResponse();
        response.setId(order.getId());
        if (order.getUser() != null) {
            response.setUserId(order.getUser().getId());
        }
        response.setCustomerName(order.getCustomerName());
        response.setCustomerEmail(order.getCustomerEmail());
        response.setCustomerPhone(order.getCustomerPhone());
        response.setShippingAddress(order.getShippingAddress());
        if (order.getStatus() != null) {
            response.setStatus(order.getStatus().name());
        }
        response.setSubtotal(order.getSubtotal());
        response.setTotal(order.getTotal());
        response.setCreatedAt(order.getCreatedAt());
        response.setUpdatedAt(order.getUpdatedAt());

        List<OrderItemResponse> itemResponses = new ArrayList<>();
        for (OrderItem item : order.getItems()) {
            OrderItemResponse itemResponse = new OrderItemResponse();
            if (item.getProduct() != null) {
                itemResponse.setProductId(item.getProduct().getId());
                itemResponse.setProductName(item.getProduct().getName());
                itemResponse.setProductImageUrl(item.getProduct().getImageUrl());
            }
            itemResponse.setQuantity(item.getQuantity());
            itemResponse.setUnitPrice(item.getUnitPrice());
            itemResponse.setLineTotal(item.getLineTotal());
            itemResponses.add(itemResponse);
        }
        response.setItems(itemResponses);

        return response;
    }

    private static BigDecimal toMoney(Double value) {
        if (value == null) {
            return BigDecimal.ZERO;
        }
        return BigDecimal.valueOf(value);
    }

    private static String generateOrderCode() {
        return UUID.randomUUID().toString().replace("-", "").toUpperCase();
    }

    private static String valueOrFallback(String value, String fallback) {
        if (value == null || value.isBlank()) {
            return fallback;
        }
        return value;
    }
}
