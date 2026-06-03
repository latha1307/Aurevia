let token: string | null = null;

export const setToken = (t: string | null) => {
  token = t;
};

export const getToken = () => token;

export const clearToken = () => {
  token = null;
};

export default { setToken, getToken, clearToken };
