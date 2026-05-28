import axios from "axios";
import type { InternalAxiosRequestConfig, AxiosRequestHeaders } from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers = (config.headers ?? {}) as AxiosRequestHeaders;
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;