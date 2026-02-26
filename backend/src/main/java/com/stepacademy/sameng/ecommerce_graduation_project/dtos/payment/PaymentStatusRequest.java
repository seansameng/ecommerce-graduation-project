package com.stepacademy.sameng.ecommerce_graduation_project.dtos.payment;

import java.time.LocalDateTime;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class PaymentStatusRequest {
    @NotBlank(message = "Payment status is required")
    private String status;

    private String transactionRef;

    private LocalDateTime paidAt;
}
