package com.stepacademy.sameng.ecommerce_graduation_project.dtos.category;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonAlias;

@Data
public class CategoryRequest {
    @NotBlank(message = "Name is required")
    private String name;

    @JsonAlias("image_url")
    private String imageUrl;
}
