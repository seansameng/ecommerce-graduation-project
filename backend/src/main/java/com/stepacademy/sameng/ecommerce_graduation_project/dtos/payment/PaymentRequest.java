package com.stepacademy.sameng.ecommerce_graduation_project.dtos.payment;

import java.math.BigDecimal;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class PaymentRequest {
    @NotNull(message = "Order ID is required")
    private Long orderId;

    @NotBlank(message = "Payment method is required")
    private String method;

    private BigDecimal amount;

    private String transactionRef;
}
