package com.stepacademy.sameng.ecommerce_graduation_project.dtos.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data

public class RegisterRequest {

    private String lastName;
    @NotBlank(message = "Full Name is required")
    private String fullName;
    @NotBlank(message = "Phone Number is required")
    private String phoneNumber;

    @NotBlank(message = "Email is required")
    @Email(message = "Email is Invalid")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters long")
    private String password;

}
