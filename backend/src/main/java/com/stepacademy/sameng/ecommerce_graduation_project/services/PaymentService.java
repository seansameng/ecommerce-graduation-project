package com.stepacademy.sameng.ecommerce_graduation_project.services;

import java.util.List;

import com.stepacademy.sameng.ecommerce_graduation_project.dtos.payment.PaymentRequest;
import com.stepacademy.sameng.ecommerce_graduation_project.dtos.payment.PaymentResponse;
import com.stepacademy.sameng.ecommerce_graduation_project.dtos.payment.PaymentStatusRequest;

public interface PaymentService {
    List<PaymentResponse> getAll();

    List<PaymentResponse> getForUser(Long userId);

    PaymentResponse getById(Long id);

    PaymentResponse getByOrderId(Long orderId);

    PaymentResponse create(PaymentRequest request);

    PaymentResponse updateStatus(Long id, PaymentStatusRequest request);
}
