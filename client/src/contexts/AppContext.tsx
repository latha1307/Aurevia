import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { Product, User } from "../types";
import {
  addToCart as addToCartApi,
  getCart as getCartApi,
  removeCartItem as removeCartItemApi,
  updateCartQuantity as updateCartQuantityApi,
  clearCart as clearCartApi,
} from "../api/cart.api";
import { getProductById } from "../api/product.api";
export type { User, UserRole } from "../types";

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  variant?: string;
}

interface BackendCartItem {
  productId: string;
  productName: string;
  price: number | string;
  quantity: number;
}

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  cart: CartItem[];
  addToCart: (item: CartItem | Product, quantity?: number) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  updateCartQuantity: (id: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  wishlist: string[];
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const DEFAULT_CART_IMAGE = "https://via.placeholder.com/300?text=Product+Image";

const buildCartItemFromBackend = async (
  item: BackendCartItem
): Promise<CartItem> => {
  let image = DEFAULT_CART_IMAGE;

  try {
    const product = await getProductById(item.productId);
    if (product) {
      if (product.images?.length) {
        image = product.images[0];
      } else if (product.image) {
        image = product.image;
      }
    }
  } catch (error) {
    console.error("Failed to load product image for cart item:", error);
  }

  return {
    id: item.productId,
    productId: item.productId,
    name: item.productName,
    price: Number(item.price),
    quantity: item.quantity || 1,
    imageUrl: image,
    variant: "",
  };
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    if (user?.email) {
      const loadCart = async () => {
        try {
          const response = await getCartApi(user.email);
          const items = response?.items ?? [];
          const normalizedCart = await Promise.all(
            items.map((cartItem: BackendCartItem) =>
              buildCartItemFromBackend(cartItem)
            )
          );

          setCart(normalizedCart);
        } catch (error) {
          console.error("Failed to load cart from backend:", error);
          setCart([]);
        }
      };

      loadCart();
    } else {
      setCart([]);
      setWishlist([]);
    }
  }, [user?.email]);

  const normalizeCartItem = (
    item: CartItem | Product,
    quantity = 1
  ): CartItem => {
    if ("productId" in item && "quantity" in item) {
      return {
        ...item,
        id: item.productId,
      };
    }

    return {
      id: item.id,
      productId: item.id,
      name: item.name,
      price: item.price,
      quantity,
      imageUrl: item.imageUrl,
      variant: "",
    };
  };

  const addToCart = async (
    item: CartItem | Product,
    quantity = 1
  ): Promise<void> => {
    const cartItem = normalizeCartItem(item, quantity);

    setCart((prev) => {
      const existing = prev.find((i) => i.productId === cartItem.productId);
      if (existing) {
        return prev.map((i) =>
          i.productId === cartItem.productId
            ? { ...i, quantity: i.quantity + cartItem.quantity }
            : i
        );
      }
      return [...prev, cartItem];
    });

    if (user?.email) {
      try {
        await addToCartApi(user.email, cartItem.productId, cartItem.quantity);
      } catch (error) {
        console.error("Failed to sync addToCart with backend:", error);
      }
    }
  };

  const removeFromCart = async (id: string): Promise<void> => {
    setCart((prev) => prev.filter((item) => item.productId !== id));

    if (user?.email) {
      try {
        await removeCartItemApi(user.email, id);
      } catch (error) {
        console.error("Failed to sync removeFromCart with backend:", error);
      }
    }
  };

  const updateCartQuantity = async (
    id: string,
    quantity: number
  ): Promise<void> => {
    if (quantity <= 0) {
      await removeFromCart(id);
      return;
    }

    setCart((prev) =>
      prev.map((item) =>
        item.productId === id ? { ...item, quantity } : item
      )
    );

    if (user?.email) {
      try {
        await updateCartQuantityApi(user.email, id, quantity);
      } catch (error) {
        console.error("Failed to sync updateCartQuantity with backend:", error);
      }
    }
  };

  const clearCart = async (): Promise<void> => {
    setCart([]);

    if (user?.email) {
      try {
        await clearCartApi(user.email);
      } catch (error) {
        console.error("Failed to sync clearCart with backend:", error);
      }
    }
  };

  const addToWishlist = (productId: string) => {
    setWishlist((prev) => {
      if (!prev.includes(productId)) {
        return [...prev, productId];
      }
      return prev;
    });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist((prev) => prev.filter((id) => id !== productId));
  };

  const isInWishlist = (productId: string) => {
    return wishlist.includes(productId);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
}
