package com.stepacademy.sameng.ecommerce_graduation_project.dtos.order;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class OrderItemResponse {
    private Long productId;
    private String productName;
    private String productImageUrl;
    private Integer quantity;
    private BigDecimal unitPrice;
    private BigDecimal lineTotal;
}
