package com.stepacademy.sameng.ecommerce_graduation_project.services;

import java.util.List;
import java.util.stream.Stream;

import org.springframework.stereotype.Service;

import com.stepacademy.sameng.ecommerce_graduation_project.dtos.product.ProductRequest;
import com.stepacademy.sameng.ecommerce_graduation_project.dtos.product.ProductResponse;
import com.stepacademy.sameng.ecommerce_graduation_project.models.Product;
import com.stepacademy.sameng.ecommerce_graduation_project.repository.ProductRepository;

import lombok.RequiredArgsConstructor;

@Service

@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    @Override
    public List<ProductResponse> getAll(String query, String category) {
        List<Product> products = (query == null || query.isBlank())
                ? productRepository.findAll()
                : productRepository.findByNameContaining(query);

        Stream<Product> stream = products.stream();
        if (category != null && !category.isBlank()) {
            stream = stream.filter(product -> product.getCategory() != null
                    && category.equalsIgnoreCase(product.getCategory().getName()));
        }

        return stream.map(this::toResponse).toList();
    }

    @Override
    public ProductResponse getById(int id) {
        Product product = productRepository.findById((long) id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        return toResponse(product);
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

    private ProductResponse toResponse(Product product) {
        ProductResponse response = new ProductResponse();
        response.setId(product.getId());
        response.setName(product.getName());
        response.setPrice(product.getPrice());
        response.setStock(product.getStock());
        response.setImageUrl(product.getImageUrl());
        response.setDescription(product.getDescription());
        if (product.getCategory() != null) {
            response.setCategory(product.getCategory().getName());
        }
        return response;
    }
}
