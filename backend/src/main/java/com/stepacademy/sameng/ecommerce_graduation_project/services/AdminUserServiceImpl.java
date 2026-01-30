package com.stepacademy.sameng.ecommerce_graduation_project.services;

import com.stepacademy.sameng.ecommerce_graduation_project.dtos.user.UserResponse;
import com.stepacademy.sameng.ecommerce_graduation_project.repository.UserRepository;
import com.stepacademy.sameng.ecommerce_graduation_project.dtos.user.UpdateRoleRequest;
import com.stepacademy.sameng.ecommerce_graduation_project.dtos.user.UpdateStatusRequest;
import com.stepacademy.sameng.ecommerce_graduation_project.models.Role;
import com.stepacademy.sameng.ecommerce_graduation_project.models.User;
import com.stepacademy.sameng.ecommerce_graduation_project.models.UserStatus;
import java.util.Locale;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class AdminUserServiceImpl implements AdminUserService {

    private final UserRepository userRepository;

    public AdminUserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public List<UserResponse> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(user -> new UserResponse(
                        user.getId(),
                        user.getFullName(),
                        user.getEmail(),
                        user.getPhoneNumber(),
                        user.getRole().name(),
                        user.getStatus().name(),
                        user.getCreatedAt() == null ? null : user.getCreatedAt().toString()))
                .toList();
    }

    @Override
    public void updateRole(Long userId, UpdateRoleRequest req) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Role newRole = Role.valueOf(req.role().trim().toUpperCase(Locale.ROOT));
        user.setRole(newRole);
        userRepository.save(user);
    }

    @Override
    public void updateStatus(Long userId, UpdateStatusRequest req) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        UserStatus newStatus = UserStatus.valueOf(req.status().trim().toUpperCase(Locale.ROOT));
        user.setStatus(newStatus);
        userRepository.save(user);
    }

    @Override
    public void deleteUser(Long userId) {
        if (!userRepository.existsById(userId)) {
            throw new RuntimeException("User not found");
        }
        userRepository.deleteById(userId);
    }
}
