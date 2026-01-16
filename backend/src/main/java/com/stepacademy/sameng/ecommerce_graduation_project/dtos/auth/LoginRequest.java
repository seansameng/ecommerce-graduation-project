package com.stepacademy.sameng.ecommerce_graduation_project.dtos.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data

public class LoginRequest {

    @NotBlank(message = "Full Name is required")
    private String fullName;
    @Email(message = "Email is Invalid")
    @NotBlank(message = "Email is required")

    private String email;
    @NotBlank(message = "Password is required")
    private String password;
}
