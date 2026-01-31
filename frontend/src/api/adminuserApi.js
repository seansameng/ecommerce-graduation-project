import api from "./axios";

export const getUsers = () => api.get("/admin/users");

export const updateUserRole = (id, role) =>
    api.put(`/admin/users/${id}/role`, { role });

export const updateUserStatus = (id, status) =>
    api.put(`/admin/users/${id}/status`, { status });

export const deleteUser = (id) =>
    api.delete(`/admin/users/${id}`);
