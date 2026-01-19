package com.stepacademy.sameng.ecommerce_graduation_project.services;

import java.util.List;

import com.stepacademy.sameng.ecommerce_graduation_project.dtos.product.ProductRequest;
import com.stepacademy.sameng.ecommerce_graduation_project.dtos.product.ProductResponse;

public interface ProductService {
    List<ProductResponse> getAll(String query, String category);

    ProductResponse getById(Long id);

    ProductResponse createProduct(ProductRequest productRequest);

    ProductResponse updateProduct(Long id, ProductRequest productRequest);

    void deleteProduct(Long id);

}
