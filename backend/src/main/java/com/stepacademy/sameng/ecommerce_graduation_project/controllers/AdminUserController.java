package com.stepacademy.sameng.ecommerce_graduation_project.controllers;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stepacademy.sameng.ecommerce_graduation_project.dtos.user.UpdateRoleRequest;
import com.stepacademy.sameng.ecommerce_graduation_project.dtos.user.UpdateStatusRequest;
import com.stepacademy.sameng.ecommerce_graduation_project.dtos.user.UserResponse;
import com.stepacademy.sameng.ecommerce_graduation_project.services.AdminUserService;

@RestController
@RequestMapping("/api/admin/users")
public class AdminUserController {

    private final AdminUserService adminUserService;

    public AdminUserController(AdminUserService adminUserService) {
        this.adminUserService = adminUserService;
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<UserResponse> getAll() {
        return adminUserService.getAllUsers();
    }

    @PutMapping("/{id}/role")
    @PreAuthorize("hasRole('ADMIN')")
    public void updateRole(@PathVariable Long id, @RequestBody UpdateRoleRequest req) {
        adminUserService.updateRole(id, req);
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public void updateStatus(@PathVariable Long id, @RequestBody UpdateStatusRequest req) {
        adminUserService.updateStatus(id, req);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void delete(@PathVariable Long id) {
        adminUserService.deleteUser(id);
    }
}
