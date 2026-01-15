package com.stepacademy.sameng.ecommerce_graduation_project.services;

import com.stepacademy.sameng.ecommerce_graduation_project.dtos.product.ProductRequest;
import com.stepacademy.sameng.ecommerce_graduation_project.dtos.product.ProductResponse;
import com.stepacademy.sameng.ecommerce_graduation_project.models.Product;
import com.stepacademy.sameng.ecommerce_graduation_project.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    @Override
    public List<ProductResponse> getAll(String q, String category) {
        List<Product> products;

        if (q != null) {
            products = productRepository.findByNameContainingIgnoreCase(q);
        } else if (category != null) {
            products = productRepository.findByCategory(category);
        } else {
            products = productRepository.findAll();
        }

        return products.stream().map(this::map).toList();
    }

    @Override
    public ProductResponse getById(Long id) {
        Product p = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        return map(p);
    }

    @Override
    public ProductResponse create(ProductRequest r) {
        Product p = Product.builder()
                .name(r.getName())
                .price(r.getPrice())
                .stock(r.getStock())
                .imageUrl(r.getImageUrl())
                .description(r.getDescription())
                .category(r.getCategory())
                .build();
        return map(productRepository.save(p));
    }

    @Override
    public ProductResponse update(Long id, ProductRequest r) {
        Product p = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        p.setName(r.getName());
        p.setPrice(r.getPrice());
        p.setStock(r.getStock());
        p.setImageUrl(r.getImageUrl());
        p.setDescription(r.getDescription());
        p.setCategory(r.getCategory());

        return map(productRepository.save(p));
    }

    @Override
    public void delete(Long id) {
        productRepository.deleteById(id);
    }

    private ProductResponse map(Product p) {
        return ProductResponse.builder()
                .id(p.getId())
                .name(p.getName())
                .price(p.getPrice())
                .stock(p.getStock())
                .imageUrl(p.getImageUrl())
                .description(p.getDescription())
                .category(p.getCategory())
                .build();
    }
}
