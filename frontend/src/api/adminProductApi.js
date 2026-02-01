import api from "./axios";

export const getProducts = () => api.get("/admin/products");

export const createProduct = (data) => api.post("/admin/products", data);

export const updateProduct = (id, data) =>
    api.put(`/admin/products/${id}`, data);

export const deleteProductById = (id) =>
    api.delete(`/admin/products/${id}`);
