package com.stepacademy.sameng.ecommerce_graduation_project.dtos.category;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class CategoryResponse {
    private Long id;
    private String name;
    private String imageUrl;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
