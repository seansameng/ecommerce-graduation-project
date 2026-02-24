package com.stepacademy.sameng.ecommerce_graduation_project.services;

import java.time.format.DateTimeFormatter;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.stepacademy.sameng.ecommerce_graduation_project.dtos.user.UpdateProfileRequest;
import com.stepacademy.sameng.ecommerce_graduation_project.dtos.user.UserResponse;
import com.stepacademy.sameng.ecommerce_graduation_project.models.User;
import com.stepacademy.sameng.ecommerce_graduation_project.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserProfileServiceImpl implements UserProfileService {

    private final UserRepository userRepository;
    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ISO_LOCAL_DATE_TIME;

    @Override
    @Transactional(readOnly = true)
    public UserResponse getCurrentUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return toResponse(user);
    }

    @Override
    @Transactional
    public UserResponse updateCurrentUser(Long userId, UpdateProfileRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setFullName(request.getFullName());
        user.setPhoneNumber(request.getPhone());
        User saved = userRepository.save(user);
        return toResponse(saved);
    }

    @Override
    @Transactional
    public void changePassword(Long userId, String currentPassword, String newPassword) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        if (currentPassword == null || !currentPassword.equals(user.getPassword())) {
            throw new RuntimeException("Current password is incorrect");
        }
        user.setPassword(newPassword);
        userRepository.save(user);
    }

    private static UserResponse toResponse(User user) {
        String createdAt = user.getCreatedAt() != null ? user.getCreatedAt().format(FORMATTER) : null;
        return new UserResponse(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getPhoneNumber(),
                user.getRole() != null ? user.getRole().name() : null,
                user.getStatus() != null ? user.getStatus().name() : null,
                createdAt);
    }
}
