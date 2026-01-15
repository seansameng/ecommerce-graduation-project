package com.stepacademy.sameng.ecommerce_graduation_project.services;

import java.util.List;
import com.stepacademy.sameng.ecommerce_graduation_project.dtos.product.ProductRequest;
import com.stepacademy.sameng.ecommerce_graduation_project.dtos.product.ProductResponse;
import com.stepacademy.sameng.ecommerce_graduation_project.models.Product;
import com.stepacademy.sameng.ecommerce_graduation_project.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

public interface ProductService {
    List<ProductResponse> getAll(String query, String category);

    ProductResponse getById(int id);

    ProductResponse createProduct(ProductRequest productRequest);

    ProductResponse updateProduct(int id, ProductRequest productRequest);

    void deleteProduct(int id);

}
