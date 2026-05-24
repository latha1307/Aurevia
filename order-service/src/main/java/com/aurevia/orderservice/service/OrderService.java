package com.aurevia.orderservice.service;

import com.aurevia.orderservice.client.CartClient;
import com.aurevia.orderservice.client.InventoryClient;
import com.aurevia.orderservice.dto.CartItemResponse;
import com.aurevia.orderservice.dto.CartResponse;
import com.aurevia.orderservice.dto.ReduceStockRequest;
import com.aurevia.orderservice.dto.UpdateOrderStatusRequest;
import com.aurevia.orderservice.entity.Order;
import com.aurevia.orderservice.entity.OrderItem;
import com.aurevia.orderservice.entity.OrderStatus;
import com.aurevia.orderservice.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;

    private final CartClient cartClient;

    private final InventoryClient inventoryClient;

    public Order placeOrder(String userEmail) {

        CartResponse cart = cartClient.getCart(userEmail);

        if (cart.getItems() == null || cart.getItems().isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        // Reduce inventory
        for (CartItemResponse item : cart.getItems()) {

            ReduceStockRequest request = new ReduceStockRequest();

            request.setProductId(item.getProductId());
            request.setQuantity(item.getQuantity());

            inventoryClient.reduceStock(request);
        }

        // Create order
        Order order = new Order();

        order.setUserEmail(cart.getUserEmail());

        List<OrderItem> orderItems = cart.getItems()
                .stream()
                .map(item -> {

                    OrderItem orderItem = new OrderItem();

                    orderItem.setProductId(item.getProductId());
                    orderItem.setProductName(item.getProductName());
                    orderItem.setPrice(item.getPrice());
                    orderItem.setQuantity(item.getQuantity());

                    return orderItem;
                })
                .toList();

        order.setItems(orderItems);

        order.setTotalAmount(cart.getTotalPrice());

        order.setStatus(OrderStatus.PENDING);

        order.setCreatedAt(LocalDateTime.now());

        Order savedOrder = orderRepository.save(order);

        // Clear cart
        cartClient.clearCart(userEmail);

        return savedOrder;
    }

    public List<Order> getUserOrders(String userEmail) {

        return orderRepository.findByUserEmail(userEmail);
    }

    public Order getOrderById(String orderId) {

        return orderRepository.findById(orderId)
                .orElseThrow(() ->
                        new RuntimeException("Order not found"));
    }

    public Order updateOrderStatus(
            String orderId,
            UpdateOrderStatusRequest request
    ) {

        Order order = getOrderById(orderId);

        order.setStatus(
                OrderStatus.valueOf(request.getStatus())
        );

        return orderRepository.save(order);
    }
}