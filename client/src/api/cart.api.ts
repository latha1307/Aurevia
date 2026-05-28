import api from "./axios";

export const addToCart = async (
  data: any
) => {

  const response = await api.post(
    "/api/cart",
    data
  );

  return response.data;
};

export const getCart = async (
  userEmail: string
) => {

  const response = await api.get(
    `/api/cart/${userEmail}`
  );

  return response.data;
};

export const removeCartItem = async (
  userEmail: string,
  productId: string
) => {

  const response = await api.delete(
    `/api/cart/${userEmail}/${productId}`
  );

  return response.data;
};