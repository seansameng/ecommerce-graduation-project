import api from "./axios";

export const createPayment = (data) => {
    return api.post("/payments", data);
};

export const updatePaymentStatus = (id, data) => {
    return api.put(`/payments/${id}/status`, data);
};

export const getPaymentByOrderId = (orderId) => {
    return api.get(`/payments/order/${orderId}`);
};
