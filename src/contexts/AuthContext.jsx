// src/contexts/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('whatsgenai_user');
    const token = localStorage.getItem('whatsgenai_token');
    
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
    
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password);
      
      if (response.status === 'success') {
        const { user, token } = response.data;
        
        localStorage.setItem('whatsgenai_token', token);
        localStorage.setItem('whatsgenai_user', JSON.stringify(user));
        
        setUser(user);
        return { success: true };
      }
      
      return { success: false, error: 'Credenciais inválidas' };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Erro ao fazer login' 
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      
      if (response.status === 'success') {
        return { success: true };
      }
      
      return { success: false, error: 'Erro ao criar conta' };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Erro ao criar conta' 
      };
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const isAuthenticated = () => {
    return !!user && !!localStorage.getItem('whatsgenai_token');
  };

  const value = {
    user,
    loading,
    login,
    logout,
    register,
    isAuthenticated
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
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