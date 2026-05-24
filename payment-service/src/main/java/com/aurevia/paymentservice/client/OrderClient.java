package com.aurevia.paymentservice.client;

import com.aurevia.paymentservice.dto.UpdateOrderStatusRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "ORDER-SERVICE")
public interface OrderClient {

    @PutMapping("/api/orders/{orderId}/status")
    void updateOrderStatus(
            @PathVariable String orderId,
            @RequestBody UpdateOrderStatusRequest request
    );
}