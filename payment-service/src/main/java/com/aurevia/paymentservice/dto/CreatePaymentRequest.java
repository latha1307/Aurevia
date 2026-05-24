package com.aurevia.paymentservice.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class CreatePaymentRequest {

    private String orderId;

    private String userEmail;

    private BigDecimal amount;
}