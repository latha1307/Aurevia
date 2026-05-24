package com.aurevia.paymentservice.controller;

import com.aurevia.paymentservice.dto.CreatePaymentRequest;
import com.aurevia.paymentservice.entity.Payment;
import com.aurevia.paymentservice.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping
    public Payment processPayment(
            @RequestBody CreatePaymentRequest request
    ) {

        return paymentService.processPayment(request);
    }
}