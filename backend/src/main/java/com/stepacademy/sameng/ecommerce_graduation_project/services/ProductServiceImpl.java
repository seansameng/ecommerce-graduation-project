package com.stepacademy.sameng.ecommerce_graduation_project.services;

import java.util.List;
import java.util.stream.Stream;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.stepacademy.sameng.ecommerce_graduation_project.dtos.product.ProductRequest;
import com.stepacademy.sameng.ecommerce_graduation_project.dtos.product.ProductResponse;
import com.stepacademy.sameng.ecommerce_graduation_project.models.Category;
import com.stepacademy.sameng.ecommerce_graduation_project.models.Product;
import com.stepacademy.sameng.ecommerce_graduation_project.repository.CategoryRepository;
import com.stepacademy.sameng.ecommerce_graduation_project.repository.ProductRepository;

import lombok.RequiredArgsConstructor;

@Service

@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    @Override
    @Transactional(readOnly = true)
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
    public ProductResponse getById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        return toResponse(product);
    }

    @Override
    public ProductResponse createProduct(ProductRequest productRequest) {
        Category category = resolveCategory(productRequest.getCategory());

        Product product = Product.builder()
                .name(productRequest.getName())
                .price(productRequest.getPrice())
                .stock(productRequest.getStock())
                .description(productRequest.getDescription())
                .imageUrl(productRequest.getImageUrl())
                .category(category)
                .build();

        return toResponse(productRepository.save(product));
    }

    @Override
    public ProductResponse updateProduct(Long id, ProductRequest productRequest) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found"));

        Category category = resolveCategory(productRequest.getCategory());

        product.setName(productRequest.getName());
        product.setPrice(productRequest.getPrice());
        product.setStock(productRequest.getStock());
        product.setDescription(productRequest.getDescription());
        product.setImageUrl(productRequest.getImageUrl());
        product.setCategory(category);

        return toResponse(productRepository.save(product));
    }

    @Override
    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found");
        }
        productRepository.deleteById(id);
    }

    private Category resolveCategory(String categoryName) {
        if (categoryName == null || categoryName.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Category is required");
        }
        return categoryRepository.findByNameIgnoreCase(categoryName)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Category not found"));
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
