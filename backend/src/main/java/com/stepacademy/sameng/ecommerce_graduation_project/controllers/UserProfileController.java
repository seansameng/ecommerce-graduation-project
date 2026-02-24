package com.stepacademy.sameng.ecommerce_graduation_project.controllers;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stepacademy.sameng.ecommerce_graduation_project.dtos.user.UpdateProfileRequest;
import com.stepacademy.sameng.ecommerce_graduation_project.dtos.user.UserResponse;
import com.stepacademy.sameng.ecommerce_graduation_project.services.UserProfileService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserProfileController {

    private final UserProfileService userProfileService;

    @GetMapping("/me")
    public UserResponse getMe(Authentication authentication) {
        Long userId = (Long) authentication.getPrincipal();
        return userProfileService.getCurrentUser(userId);
    }

    @PutMapping("/me")
    public UserResponse updateMe(
            Authentication authentication,
            @Valid @RequestBody UpdateProfileRequest request) {
        Long userId = (Long) authentication.getPrincipal();
        return userProfileService.updateCurrentUser(userId, request);
    }

}
