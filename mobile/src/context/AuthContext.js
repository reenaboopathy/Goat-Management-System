import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../api';
import { storage } from '../utils/storage';
import { STORAGE_KEYS } from '../constants/config';
import { initApiClient } from '../api/client';

const AuthContext = createContext({
  user: null,
  tenant: null,
  token: null,
  loading: true,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  refreshSession: async () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [tenant, setTenant] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    bootstrapSession();
  }, []);

  async function bootstrapSession() {
    try {
      await initApiClient();
      const savedToken = await storage.get(STORAGE_KEYS.AUTH_TOKEN);
      const savedUser = await storage.get(STORAGE_KEYS.USER_DATA);

      if (savedToken && savedUser) {
        setToken(savedToken);
        setUser(savedUser);
        setTenant(savedUser.tenant || { name: savedUser.farmName || 'Green Valley Farm' });
      }
    } catch (e) {
      console.warn('Session bootstrap error:', e);
    } finally {
      setLoading(false);
    }
  }

  async function login(farmId, username, password) {
    try {
      const response = await authApi.login(farmId, username, password);
      if (response && response.token) {
        await storage.set(STORAGE_KEYS.AUTH_TOKEN, response.token);
        await storage.set(STORAGE_KEYS.USER_DATA, { ...response.user, tenant: response.tenant });
        setToken(response.token);
        setUser(response.user);
        setTenant(response.tenant);
        return { success: true };
      }
      return { success: false, error: 'Invalid response from server' };
    } catch (err) {
      return { success: false, error: err.message || 'Login failed' };
    }
  }

  async function register(farmName, username, email, password) {
    try {
      const response = await authApi.register(farmName, username, email, password);
      if (response && response.token) {
        await storage.set(STORAGE_KEYS.AUTH_TOKEN, response.token);
        await storage.set(STORAGE_KEYS.USER_DATA, { ...response.user, tenant: response.tenant });
        setToken(response.token);
        setUser(response.user);
        setTenant(response.tenant);
        return { success: true };
      }
      return { success: false, error: 'Registration failed' };
    } catch (err) {
      return { success: false, error: err.message || 'Registration failed' };
    }
  }

  async function logout() {
    try {
      await storage.remove(STORAGE_KEYS.AUTH_TOKEN);
      await storage.remove(STORAGE_KEYS.USER_DATA);
      setToken(null);
      setUser(null);
      setTenant(null);
    } catch (err) {
      console.warn('Logout error:', err);
    }
  }

  async function refreshSession() {
    try {
      const res = await authApi.checkSession();
      if (res && res.user) {
        setUser(res.user);
        setTenant(res.tenant);
      }
    } catch {
      // ignore
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        tenant,
        token,
        loading,
        login,
        register,
        logout,
        refreshSession,
        isAuthenticated: Boolean(user),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
