package com.stepacademy.sameng.ecommerce_graduation_project.dtos.order;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class OrderStatusRequest {
    @NotBlank(message = "Order status is required")
    private String status;
}
