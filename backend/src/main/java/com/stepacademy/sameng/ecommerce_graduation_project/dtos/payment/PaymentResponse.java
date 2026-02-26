package com.stepacademy.sameng.ecommerce_graduation_project.dtos.payment;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import lombok.Data;

@Data
public class PaymentResponse {
    private Long id;
    private Long orderId;
    private String method;
    private String status;
    private BigDecimal amount;
    private String transactionRef;
    private LocalDateTime paidAt;
    private LocalDateTime createdAt;
}
