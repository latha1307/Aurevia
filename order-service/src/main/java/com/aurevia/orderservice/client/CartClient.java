package com.aurevia.orderservice.client;

import com.aurevia.orderservice.dto.CartResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "CART-SERVICE")
public interface CartClient {

    @GetMapping("/api/cart/{userEmail}")
    CartResponse getCart(
            @PathVariable String userEmail
    );

    @DeleteMapping("/api/cart/clear/{userEmail}")
    void clearCart(
            @PathVariable String userEmail
    );
}