package com.stepacademy.sameng.ecommerce_graduation_project.services;

@Services
public interface AuthService {
    void register(RegisterRequest request);

    void login(LoginRequest request);
}
