package com.stepacademy.sameng.ecommerce_graduation_project.controllers;

import org.springframework.web.bind.annotation.PostMapping;

import com.stepacademy.sameng.ecommerce_graduation_project.dtos.ApiResponse;
import com.stepacademy.sameng.ecommerce_graduation_project.dtos.LoginRequest;

import io.swagger.v3.oas.annotations.parameters.RequestBody;

public class AuthController {
    // AuthController implementation goes here
    @PostMapping("/login")
    public ApiResponse login(@RequestBody LoginRequest loginRequest) {
        // Authentication logic goes here
        return ApiResponse.success("Login successful", null);
    }

    @PostMapping("/register")
    public ApiResponse register(@RequestBody LoginRequest registerRequest) {
        // Registration logic goes here
        return ApiResponse.success("Registration successful", null);

    }
}
