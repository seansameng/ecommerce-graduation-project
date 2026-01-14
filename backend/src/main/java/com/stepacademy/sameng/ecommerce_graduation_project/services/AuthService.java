package com.stepacademy.sameng.ecommerce_graduation_project.services;

import org.springframework.stereotype.Service;

import com.stepacademy.sameng.ecommerce_graduation_project.dtos.LoginRequest;
import com.stepacademy.sameng.ecommerce_graduation_project.dtos.RegisterRequest;

@Service
public interface AuthService {
    void register(RegisterRequest request);

    void login(LoginRequest request);
}
