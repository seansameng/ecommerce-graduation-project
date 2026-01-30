package com.stepacademy.sameng.ecommerce_graduation_project.dtos.user;

public record UserResponse(
        Long id,
        String fullName,
        String email,
        String phone,
        String role,
        String status,
        String createdAt) {
}
