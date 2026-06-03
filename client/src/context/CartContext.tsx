import React, { createContext, useContext } from 'react';
import type { Product } from '../types';
import { useApp } from '../contexts/AppContext';
import type { CartItem } from '../contexts/AppContext';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const app = useApp();

  const cartTotal = app.cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartCount = app.cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart: app.cart,
        addToCart: app.addToCart,
        removeFromCart: app.removeFromCart,
        updateQuantity: app.updateCartQuantity,
        clearCart: app.clearCart,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
