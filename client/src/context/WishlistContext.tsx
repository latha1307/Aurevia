import React, { createContext, useContext } from 'react';
import type { Product } from '../types';
import { useApp } from '../contexts/AppContext';

interface WishlistContextType {
  wishlist: string[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (product: Product) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const app = useApp();

  const addToWishlist = (product: Product) => {
    app.addToWishlist(product.id);
  };

  const toggleWishlist = (product: Product) => {
    if (app.isInWishlist(product.id)) {
      app.removeFromWishlist(product.id);
    } else {
      app.addToWishlist(product.id);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist: app.wishlist,
        addToWishlist,
        removeFromWishlist: app.removeFromWishlist,
        isInWishlist: app.isInWishlist,
        toggleWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }
  return context;
};
