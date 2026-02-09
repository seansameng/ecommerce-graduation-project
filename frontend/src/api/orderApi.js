import api from "./axios";

export const createOrder = (data) => {
    return api.post("/orders", data);
};

export const getOrders = () => {
    return api.get("/orders");
};

export const getOrderById = (id) => {
    return api.get(`/orders/${id}`);
};

