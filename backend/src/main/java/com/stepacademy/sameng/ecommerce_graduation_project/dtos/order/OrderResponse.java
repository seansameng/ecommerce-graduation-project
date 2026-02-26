package com.stepacademy.sameng.ecommerce_graduation_project.dtos.order;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import lombok.Data;

@Data
public class OrderResponse {
    private Long id;
    private Long userId;
    private String customerName;
    private String customerEmail;
    private String customerPhone;
    private String shippingAddress;
    private String paymentMethod;
    private Long paymentId;
    private String paymentStatus;
    private BigDecimal paymentAmount;
    private String paymentTransactionRef;
    private LocalDateTime paymentPaidAt;
    private LocalDateTime paymentCreatedAt;
    private String status;
    private BigDecimal subtotal;
    private BigDecimal total;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<OrderItemResponse> items;
}
