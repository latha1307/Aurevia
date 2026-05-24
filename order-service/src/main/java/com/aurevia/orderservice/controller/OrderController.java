package com.aurevia.orderservice.controller;

import com.aurevia.orderservice.dto.UpdateOrderStatusRequest;
import com.aurevia.orderservice.entity.Order;
import com.aurevia.orderservice.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping("/place/{userEmail}")
    public Order placeOrder(
            @PathVariable String userEmail
    ) {

        return orderService.placeOrder(userEmail);
    }

    @GetMapping("/user/{userEmail}")
    public List<Order> getUserOrders(
            @PathVariable String userEmail
    ) {

        return orderService.getUserOrders(userEmail);
    }

    @GetMapping("/{orderId}")
    public Order getOrderById(
            @PathVariable String orderId
    ) {

        return orderService.getOrderById(orderId);
    }

    @PutMapping("/{orderId}/status")
    public Order updateOrderStatus(
            @PathVariable String orderId,
            @RequestBody UpdateOrderStatusRequest request
    ) {

        return orderService.updateOrderStatus(orderId, request);
    }
}