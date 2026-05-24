package com.aurevia.paymentservice.repository;

import com.aurevia.paymentservice.entity.Payment;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PaymentRepository
        extends MongoRepository<Payment, String> {
}