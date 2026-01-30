package com.stepacademy.sameng.ecommerce_graduation_project.services;

import java.util.List;

import com.stepacademy.sameng.ecommerce_graduation_project.dtos.user.UpdateRoleRequest;
import com.stepacademy.sameng.ecommerce_graduation_project.dtos.user.UpdateStatusRequest;
import com.stepacademy.sameng.ecommerce_graduation_project.dtos.user.UserResponse;

public interface AdminUserService {
    List<UserResponse> getAllUsers();

    void updateRole(Long userId, UpdateRoleRequest req);

    void updateStatus(Long userId, UpdateStatusRequest req);

    void deleteUser(Long userId);
}
