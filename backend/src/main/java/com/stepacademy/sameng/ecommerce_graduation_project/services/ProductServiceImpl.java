package com.stepacademy.sameng.ecommerce_graduation_project.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.stepacademy.sameng.ecommerce_graduation_project.dtos.product.ProductRequest;
import com.stepacademy.sameng.ecommerce_graduation_project.dtos.product.ProductResponse;
import com.stepacademy.sameng.ecommerce_graduation_project.repository.ProductRepository;

import lombok.Builder;
import lombok.RequiredArgsConstructor;

@Service
@Builder
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    @Override
    public List<ProductResponse> getAll(String query, String category) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public ProductResponse getById(int id) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public ProductResponse createProduct(ProductRequest productRequest) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public ProductResponse updateProduct(int id, ProductRequest productRequest) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public void deleteProduct(int id) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

}
