import api from "./axios";

export const getProducts = async (
  page = 0,
  size = 15
) => {

  const response = await api.get(
    `/api/products?page=${page}&size=${size}`
  );

  return response.data;
};

export const getProductById = async (id: string) => {

  const response = await api.get(`/api/products/${id}`);
  return response.data;
};

export const getProductsByCategory = async (
  category: string,
  page = 0,
  size = 15
) => {
  const response = await api.get(
    `/api/products/category/${category}?page=${page}&size=${size}`
  );
  return response.data;
};