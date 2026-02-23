package com.stepacademy.sameng.ecommerce_graduation_project.dtos.product;

import com.stepacademy.sameng.ecommerce_graduation_project.models.ProductStatus;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ProductRequest {
    @NotBlank(message = "Name is required")
    private String name;
    @Min(value = 0, message = "Price must be non-negative")
    private double price;
    @Min(value = 0, message = "Stock must be non-negative")
    private int stock;
    private String description;
    private String imageUrl;

    @NotBlank(message = "SKU is required")
    private String sku;

    @NotNull(message = "Status is required")
    private ProductStatus status;

    @NotBlank(message = "Category is required")
    private String category;
}
