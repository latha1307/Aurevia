import api from "./axios";

export const login = async (
  email: string,
  password: string
) => {
    const response = await api.post("/api/auth/login", {
        email,
        password
    });

    return response.data;
};

export const signup = async (
  name: string,
  email: string,
  password: string
) => {
    const response = await api.post("/api/auth/register", {
        name,
        email,
        password
    });
    return response.data;
}