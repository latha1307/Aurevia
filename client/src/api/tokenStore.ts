const STORAGE_KEY = "aurevia_auth_token";

let token: string | null = null;

export const setToken = (t: string | null) => {
  token = t;
  try {
    if (t) localStorage.setItem(STORAGE_KEY, t);
    else localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    // ignore storage errors (e.g., SSR or privacy settings)
  }
};

export const getToken = () => {
  if (token) return token;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      token = stored;
      return token;
    }
  } catch (err) {
    // ignore
  }
  return null;
};

export const clearToken = () => {
  token = null;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    // ignore
  }
};

export default { setToken, getToken, clearToken };
