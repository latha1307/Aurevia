package com.aurevia.paymentservice.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Document(collection = "payments")
public class Payment {

    @Id
    private String id;

    private String orderId;

    private String userEmail;

    private BigDecimal amount;

    private PaymentStatus status;

    private String transactionId;

    private LocalDateTime createdAt;
}