package com.aurevia.cartservice.service;

import com.aurevia.cartservice.client.InventoryClient;
import com.aurevia.cartservice.client.ProductClient;
import com.aurevia.cartservice.dto.AddToCartRequest;
import com.aurevia.cartservice.dto.InventoryResponse;
import com.aurevia.cartservice.dto.ProductResponse;
import com.aurevia.cartservice.dto.UpdateQuantityRequest;
import com.aurevia.cartservice.entity.Cart;
import com.aurevia.cartservice.entity.CartItem;
import com.aurevia.cartservice.repository.CartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;



@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final ProductClient productClient;

    private final InventoryClient inventoryClient;

    public Cart addToCart(
            AddToCartRequest request
    ) {
    
        ProductResponse product =
                productClient.getProduct(
                        request.getProductId()
                );
            
        InventoryResponse inventory =
                inventoryClient.getInventory(
                        request.getProductId()
                );
            
        if (inventory.getAvailableQuantity() < request.getQuantity()) {
            throw new RuntimeException(
                    "Insufficient stock"
            );
        }
    
        Cart cart = cartRepository
                .findByUserEmail(request.getUserEmail())
                .orElse(new Cart());
    
        cart.setUserEmail(request.getUserEmail());
    
        if (cart.getItems() == null) {
            cart.setItems(new ArrayList<>());
        }
    
        CartItem item = new CartItem();
    
        item.setProductId(product.getId());
    
        item.setProductName(product.getName());
    
        item.setPrice(product.getPrice());
    
        item.setQuantity(request.getQuantity());
    
        cart.getItems().add(item);
    
        BigDecimal total = cart.getItems()
                .stream()
                .map(i ->
                        i.getPrice().multiply(
                                BigDecimal.valueOf(i.getQuantity())
                        )
                )
                .reduce(BigDecimal.ZERO, BigDecimal::add);
            
        cart.setTotalPrice(total);
            
        return cartRepository.save(cart);
    }
    public Cart getCart(
            String userEmail
    ) {

        return cartRepository
                .findByUserEmail(userEmail)
                .orElseThrow(() ->
                        new RuntimeException("Cart not found"));
    }

    public void clearCart(String userEmail) {
    
            Cart cart = cartRepository.findByUserEmail(userEmail)
                    .orElseThrow(() -> new RuntimeException("Cart not found"));
    
            cart.getItems().clear();
            cart.setTotalPrice(BigDecimal.ZERO);
    
            cartRepository.save(cart);
        }
    
        public Cart removeItem(String userEmail, String productId) {
    
        Cart cart = cartRepository.findByUserEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("Cart not found"));
    
        cart.getItems().removeIf(item ->
                item.getProductId().equals(productId)
        );
    
        BigDecimal total = cart.getItems()
                .stream()
                .map(item -> item.getPrice()
                        .multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    
        cart.setTotalPrice(total);
    
        return cartRepository.save(cart);
    }

    public Cart updateQuantity(UpdateQuantityRequest request) {

        Cart cart = cartRepository.findByUserEmail(request.getUserEmail())
                .orElseThrow(() -> new RuntimeException("Cart not found"));
    
        for (CartItem item : cart.getItems()) {
    
            if (item.getProductId().equals(request.getProductId())) {
    
                item.setQuantity(request.getQuantity());
            }
        }
    
        BigDecimal total = cart.getItems()
                .stream()
                .map(item -> item.getPrice()
                        .multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    
        cart.setTotalPrice(total);
    
        return cartRepository.save(cart);
    }
}