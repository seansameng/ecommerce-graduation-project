package com.stepacademy.sameng.ecommerce_graduation_project.controllers;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stepacademy.sameng.ecommerce_graduation_project.dtos.ApiResponse;
import com.stepacademy.sameng.ecommerce_graduation_project.dtos.LoginRequest;
import com.stepacademy.sameng.ecommerce_graduation_project.dtos.RegisterRequest;    
import com.stepacademy.sameng.ecommerce_graduation_project.services.AuthService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;
import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    // AuthController implementation goes here
    @PostMapping("/login")
    public ApiResponse login(@RequestBody LoginRequest loginRequest) {
        // Authentication logic goes here
        authService.login(loginRequest);

        return ApiResponse.success("Login successful", null);
    }

    @PostMapping("/register")
    public ApiResponse register(@RequestBody RegisterRequest registerRequest) {
        // Registration logic goes here
        authService.register(registerRequest);
        return ApiResponse.success("Registration successful", null);

    }
}
