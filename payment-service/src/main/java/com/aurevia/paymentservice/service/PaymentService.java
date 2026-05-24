package com.aurevia.paymentservice.service;

import com.aurevia.paymentservice.client.OrderClient;
import com.aurevia.paymentservice.dto.CreatePaymentRequest;
import com.aurevia.paymentservice.dto.UpdateOrderStatusRequest;
import com.aurevia.paymentservice.entity.Payment;
import com.aurevia.paymentservice.entity.PaymentStatus;
import com.aurevia.paymentservice.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;

    private final OrderClient orderClient;

    public Payment processPayment(
            CreatePaymentRequest request
    ) {

        Payment payment = new Payment();

        payment.setOrderId(request.getOrderId());
        payment.setUserEmail(request.getUserEmail());
        payment.setAmount(request.getAmount());

        // MOCK PAYMENT SUCCESS
        payment.setStatus(PaymentStatus.SUCCESS);

        payment.setTransactionId(
                UUID.randomUUID().toString()
        );

        payment.setCreatedAt(LocalDateTime.now());

        Payment savedPayment =
                paymentRepository.save(payment);

        // Update order status
        UpdateOrderStatusRequest orderRequest =
                new UpdateOrderStatusRequest();

        orderRequest.setStatus("CONFIRMED");

        orderClient.updateOrderStatus(
                request.getOrderId(),
                orderRequest
        );

        return savedPayment;
    }
}