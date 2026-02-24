package com.stepacademy.sameng.ecommerce_graduation_project.services;

import com.stepacademy.sameng.ecommerce_graduation_project.dtos.user.UpdateProfileRequest;
import com.stepacademy.sameng.ecommerce_graduation_project.dtos.user.UserResponse;

public interface UserProfileService {
    UserResponse getCurrentUser(Long userId);

    UserResponse updateCurrentUser(Long userId, UpdateProfileRequest request);
}
