import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, UserRole } from '../types';
import { mockUsers } from '../data/mockData';
import { useApp } from '../contexts/AppContext';

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
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Sync with AppContext on mount
    if (appContext.user) {
      setUser(appContext.user);
    }
  }, [appContext.user]);

  const login = async (email: string, _password: string, role?: UserRole) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    // Mock authentication
    let foundUser = mockUsers.find(u => u.email === email);
    
    // If admin login, ensure admin role
    if (role && (role === 'super_admin' || role === 'admin')) {
      foundUser = mockUsers.find(u => u.email === email && (u.role === 'super_admin' || u.role === 'admin'));
    }

    if (foundUser) {
      setUser(foundUser);
      appContext.setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const signup = async (name: string, email: string, _password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    const newUser: User = {
      id: `user${Date.now()}`,
      name,
      email,
      role: 'customer',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
      createdAt: new Date().toISOString()
    };

    setUser(newUser);
    appContext.setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    appContext.setUser(null);
    localStorage.removeItem('user');
  };

  const hasRole = (roles: UserRole[]) => {
    return user ? roles.includes(user.role) : false;
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