package com.stepacademy.sameng.ecommerce_graduation_project.controllers;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.stepacademy.sameng.ecommerce_graduation_project.dtos.auth.ApiResponse;
import com.stepacademy.sameng.ecommerce_graduation_project.dtos.auth.LoginRequest;
import com.stepacademy.sameng.ecommerce_graduation_project.dtos.auth.RegisterRequest;
import com.stepacademy.sameng.ecommerce_graduation_project.services.AuthService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    // AuthController implementation goes here
    @PostMapping("/login")
    public ApiResponse login(@Valid @RequestBody LoginRequest loginRequest) {
        // Authentication logic goes here
        authService.login(loginRequest);

        return ApiResponse.success("Login successful", null);
    }

    @PostMapping("/register")
    public ApiResponse register(@Valid @RequestBody RegisterRequest registerRequest) {
        // Registration logic goes here
        authService.register(registerRequest);
        return ApiResponse.success("Registration successful", null);

    }
}
