import React, { createContext, useContext, useEffect } from 'react';
import type { User, UserRole } from '../types';
import { useApp } from '../contexts/AppContext';
import { login as loginRequest, signup as signupRequest } from '../api/auth.api';
import { setToken, getToken, clearToken } from '../api/tokenStore';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role?: UserRole) => Promise<void>;
  logout: () => void;
  signup: (name: string, email: string, password: string) => Promise<void>;
  isAuthenticated: boolean;
  hasRole: (roles: UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const appContext = useApp();

  const buildUserFromResponse = (response: { id?: string; name?: string; email: string; role?: string }): User => {
    const safeEmail = response.email || '';
    return {
      id: response.id || `user-${Date.now()}`,
      name: response.name || safeEmail.split('@')[0] || 'Customer',
      email: safeEmail,
      role: (response.role as UserRole) || 'customer',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(safeEmail)}`,
      createdAt: new Date().toISOString(),
    };
  };

  const decodeJwtPayload = (token: string) => {
    const payloadBase64 = token.split('.')[1] || '';
    const base64 = payloadBase64.replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64.padEnd(base64.length + (4 - (base64.length % 4)) % 4, '=');
    const decoded = atob(padded);
    const utf8 = decodeURIComponent(decoded.split('').map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`).join(''));
    return JSON.parse(utf8);
  };

  const login = async (email: string, password: string, role?: UserRole) => {
    const response = await loginRequest(email, password);

    if (!response || !response.token) {
      throw new Error('Invalid login response');
    }

    setToken(response.token);

    const payloadJson = decodeJwtPayload(response.token);
    const emailFromToken = payloadJson.sub || response.email || email;
    const roleFromToken = (payloadJson.role || payloadJson.roles || response.role) as string;

    const userFromToken = buildUserFromResponse({
      id: response.id || payloadJson.id || undefined,
      name: response.name || payloadJson.name || emailFromToken,
      email: emailFromToken,
      role: roleFromToken,
    });

    if (role) {
      const allowedRoles = role === 'admin' ? ['admin', 'super_admin'] : [role];
      if (!allowedRoles.includes(userFromToken.role.toLowerCase())) {
        clearToken();
        throw new Error('Invalid role for this account');
      }
    }

    appContext.setUser(userFromToken);
  };

  const signup = async (name: string, email: string, password: string) => {
    const response = await signupRequest(name, email, password);
    const newUser = buildUserFromResponse({
      id: response.id,
      name: response.name || name,
      email,
      role: response.role,
    });
    // persist token and set user in context
    if (!response || !response.token) {
      throw new Error('Invalid signup response');
    }
    setToken(response.token);
    appContext.setUser(newUser);
  };

  const logout = () => {
    appContext.setUser(null);
    clearToken();
  };

  // On mount, if a token is present (e.g. after page refresh), decode it and restore user
  useEffect(() => {
    try {
      const t = getToken();
      if (t) {
        const payloadJson = decodeJwtPayload(t);
        const emailFromToken = payloadJson.sub || payloadJson.email || '';
        const roleFromToken = (payloadJson.role || payloadJson.roles || 'customer') as string;

        const userFromToken = buildUserFromResponse({
          id: payloadJson.id || undefined,
          name: payloadJson.name || emailFromToken,
          email: emailFromToken,
          role: roleFromToken,
        });

        appContext.setUser(userFromToken);
      }
    } catch (err) {
      // if token is invalid, clear it
      clearToken();
    }
    // run only once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hasRole = (roles: UserRole[]) => {
    return appContext.user ? roles.includes(appContext.user.role) : false;
  };

  return (
    <AuthContext.Provider value={{
      user: appContext.user,
      login,
      logout,
      signup,
      isAuthenticated: !!appContext.user,
      hasRole
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};