package com.aurevia.cartservice.controller;

import com.aurevia.cartservice.dto.AddToCartRequest;
import com.aurevia.cartservice.dto.UpdateQuantityRequest;
import com.aurevia.cartservice.entity.Cart;
import com.aurevia.cartservice.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @PostMapping
    public Cart addToCart(
            @RequestBody AddToCartRequest request
    ) {

        return cartService.addToCart(request);
    }

    @GetMapping("/{userEmail}")
    public Cart getCart(
            @PathVariable String userEmail
    ) {

        return cartService.getCart(userEmail);
    }

    @DeleteMapping("/clear/{userEmail}")
    public String clearCart(
            @PathVariable String userEmail
    ) {
        cartService.clearCart(userEmail);
        return "Cart cleared successfully";
    }

    @DeleteMapping("/{userEmail}/remove/{productId}")
    public Cart removeItem(
            @PathVariable String userEmail,
            @PathVariable String productId
    ) {

        return cartService.removeItem(userEmail, productId);
    }

    @PutMapping("/quantity")
    public Cart updateQuantity(
            @RequestBody UpdateQuantityRequest request
    ) {
    
        return cartService.updateQuantity(request);
    }
}