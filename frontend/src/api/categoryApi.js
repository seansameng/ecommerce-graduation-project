import api from "./api";

export const getCategories = () => api.get("/api/categories");
export const getCategoryById = (id) => api.get(`/api/categories/${id}`);
