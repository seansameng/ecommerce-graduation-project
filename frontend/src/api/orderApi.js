import api from "./axios";

export const createOrder = (data) => {
    return api.post("/orders", data);
};

export const getOrders = () => {
    return api.get("/orders");
};

export const getMyOrders = () => {
    return api.get("/orders/me");
};

export const getOrderById = (id) => {
    return api.get(`/orders/${id}`);
};

export const updateOrderStatus = (id, status) => {
    return api.put(`/admin/orders/${id}/status`, { status });
};
