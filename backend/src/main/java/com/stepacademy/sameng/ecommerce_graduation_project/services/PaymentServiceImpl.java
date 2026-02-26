package com.stepacademy.sameng.ecommerce_graduation_project.services;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.stepacademy.sameng.ecommerce_graduation_project.dtos.payment.PaymentRequest;
import com.stepacademy.sameng.ecommerce_graduation_project.dtos.payment.PaymentResponse;
import com.stepacademy.sameng.ecommerce_graduation_project.dtos.payment.PaymentStatusRequest;
import com.stepacademy.sameng.ecommerce_graduation_project.models.Order;
import com.stepacademy.sameng.ecommerce_graduation_project.models.Payment;
import com.stepacademy.sameng.ecommerce_graduation_project.repository.OrderRepository;
import com.stepacademy.sameng.ecommerce_graduation_project.repository.PaymentRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;
    private final OrderRepository orderRepository;

    @Override
    @Transactional(readOnly = true)
    public List<PaymentResponse> getAll() {
        return paymentRepository.findAll().stream().map(this::toResponse).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<PaymentResponse> getForUser(Long userId) {
        return paymentRepository.findByOrderUserIdOrderByCreatedAtDesc(userId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public PaymentResponse getById(Long id) {
        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Payment not found"));
        return toResponse(payment);
    }

    @Override
    @Transactional(readOnly = true)
    public PaymentResponse getByOrderId(Long orderId) {
        Payment payment = paymentRepository.findByOrderId(orderId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Payment not found"));
        return toResponse(payment);
    }

    @Override
    @Transactional
    public PaymentResponse create(PaymentRequest request) {
        Order order = orderRepository.findById(request.getOrderId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Order not found"));

        if (paymentRepository.existsByOrderId(order.getId())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Payment already exists for this order");
        }

        BigDecimal amount = request.getAmount() != null ? request.getAmount() : order.getTotal();
        if (amount == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Payment amount is required");
        }

        Payment payment = new Payment();
        payment.setOrder(order);
        payment.setMethod(parseMethod(request.getMethod()));
        payment.setStatus(Payment.Status.PENDING);
        payment.setAmount(amount);

        if (request.getTransactionRef() != null && !request.getTransactionRef().isBlank()) {
            payment.setTransactionRef(request.getTransactionRef().trim());
        }

        return toResponse(paymentRepository.save(payment));
    }

    @Override
    @Transactional
    public PaymentResponse updateStatus(Long id, PaymentStatusRequest request) {
        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Payment not found"));

        Payment.Status status = parseStatus(request.getStatus());
        payment.setStatus(status);

        if (request.getTransactionRef() != null && !request.getTransactionRef().isBlank()) {
            payment.setTransactionRef(request.getTransactionRef().trim());
        }

        if (request.getPaidAt() != null) {
            payment.setPaidAt(request.getPaidAt());
        } else if (status == Payment.Status.SUCCESS && payment.getPaidAt() == null) {
            payment.setPaidAt(LocalDateTime.now());
        }

        return toResponse(paymentRepository.save(payment));
    }

    private PaymentResponse toResponse(Payment payment) {
        PaymentResponse response = new PaymentResponse();
        response.setId(payment.getId());
        if (payment.getOrder() != null) {
            response.setOrderId(payment.getOrder().getId());
        }
        if (payment.getMethod() != null) {
            response.setMethod(payment.getMethod().name());
        }
        if (payment.getStatus() != null) {
            response.setStatus(payment.getStatus().name());
        }
        response.setAmount(payment.getAmount());
        response.setTransactionRef(payment.getTransactionRef());
        response.setPaidAt(payment.getPaidAt());
        response.setCreatedAt(payment.getCreatedAt());
        return response;
    }

    private Payment.Method parseMethod(String value) {
        try {
            return Payment.Method.valueOf(value.trim().toUpperCase());
        } catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid payment method");
        }
    }

    private Payment.Status parseStatus(String value) {
        try {
            return Payment.Status.valueOf(value.trim().toUpperCase());
        } catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid payment status");
        }
    }
}
