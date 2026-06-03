import api from "./axios";

export const addToCart = async (
  userEmail: string,
  productId: string,
  quantity: number
) => {
  const response = await api.post("/api/cart", {
    userEmail,
    productId,
    quantity,
  });

  return response.data;
};

export const getCart = async (userEmail: string) => {
  const response = await api.get(
    `/api/cart/${encodeURIComponent(userEmail)}`
  );

  return response.data;
};

export const removeCartItem = async (
  userEmail: string,
  productId: string
) => {
  const response = await api.delete(
    `/api/cart/${encodeURIComponent(userEmail)}/remove/${encodeURIComponent(productId)}`
  );

  return response.data;
};

export const updateCartQuantity = async (
  userEmail: string,
  productId: string,
  quantity: number
) => {
  const response = await api.put("/api/cart/quantity", {
    userEmail,
    productId,
    quantity,
  });

  return response.data;
};

export const clearCart = async (userEmail: string) => {
  const response = await api.delete(
    `/api/cart/clear/${encodeURIComponent(userEmail)}`
  );

  return response.data;
};