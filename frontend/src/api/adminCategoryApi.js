import api from "./axios";

export const getCategories = () => api.get("/admin/categories");
export const createCategory = (data) => api.post("/admin/categories", data);
export const updateCategory = (id, data) => api.put(`/admin/categories/${id}`, data);
export const deleteCategoryById = (id) => api.delete(`/admin/categories/${id}`);
