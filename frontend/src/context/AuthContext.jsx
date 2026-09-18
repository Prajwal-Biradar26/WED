import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('wedding_user_data');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => localStorage.getItem('wedding_auth_token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      if (token) {
        try {
          const res = await authService.getMe();
          if (res.data?.success) {
            setUser(res.data.data);
            localStorage.setItem('wedding_user_data', JSON.stringify(res.data.data));
          }
        } catch (err) {
          console.error('Session expired:', err);
          logout();
        }
      }
      setLoading(false);
    };

    verifyUser();
  }, [token]);

  const login = async (email, password) => {
    const res = await authService.login({ email, password });
    if (res.data?.success) {
      const { token: newToken, ...userData } = res.data.data;
      setToken(newToken);
      setUser(userData);
      localStorage.setItem('wedding_auth_token', newToken);
      localStorage.setItem('wedding_user_data', JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, message: res.data?.message || 'Login failed' };
  };

  const register = async (formData) => {
    const res = await authService.register(formData);
    if (res.data?.success) {
      const { token: newToken, ...userData } = res.data.data;
      setToken(newToken);
      setUser(userData);
      localStorage.setItem('wedding_auth_token', newToken);
      localStorage.setItem('wedding_user_data', JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, message: res.data?.message || 'Registration failed' };
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('wedding_auth_token');
    localStorage.removeItem('wedding_user_data');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
