package com.stepacademy.sameng.ecommerce_graduation_project.dtos.product;

@Data
public class ProductResponse {
    private int id;
    private String name;
    private Double price;
    private Integer stock;
    private String imageUrl;
    private String description;
    private String category;
}
