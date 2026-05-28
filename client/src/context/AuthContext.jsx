import { createContext, useCallback, useEffect, useMemo, useState } from 'react';

import {
  getCurrentUserRequest,
  loginRequest,
  logoutRequest,
  registerRequest
} from '../services/authService.js';

export const AuthContext = createContext(null);

const readStoredUser = () => {
  try {
    const storedUser = sessionStorage.getItem('authUser');
    return storedUser ? JSON.parse(storedUser) : null;
  } catch {
    sessionStorage.removeItem('authUser');
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(readStoredUser);
  const [token, setToken] = useState(() => sessionStorage.getItem('accessToken'));
  const [isInitializing, setIsInitializing] = useState(Boolean(sessionStorage.getItem('accessToken')));

  const persistSession = useCallback(({ user: nextUser, token: nextToken }) => {
    sessionStorage.setItem('accessToken', nextToken);
    sessionStorage.setItem('authUser', JSON.stringify(nextUser));
    setToken(nextToken);
    setUser(nextUser);
  }, []);

  const clearSession = useCallback(() => {
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('authUser');
    setToken(null);
    setUser(null);
  }, []);

  const login = useCallback(
    async (credentials) => {
      const response = await loginRequest(credentials);

      if (response.success) {
        persistSession(response.data);
      }

      return response;
    },
    [persistSession]
  );

  const register = useCallback(
    async (payload) => {
      const response = await registerRequest(payload);

      if (response.success) {
        persistSession(response.data);
      }

      return response;
    },
    [persistSession]
  );

  const logout = useCallback(async () => {
    await logoutRequest();
    clearSession();
  }, [clearSession]);

  useEffect(() => {
    const hydrateUser = async () => {
      if (!token) {
        setIsInitializing(false);
        return;
      }

      const response = await getCurrentUserRequest();

      if (response.success) {
        const nextUser = response.data.user;
        sessionStorage.setItem('authUser', JSON.stringify(nextUser));
        setUser(nextUser);
      } else {
        clearSession();
      }

      setIsInitializing(false);
    };

    hydrateUser();
  }, [clearSession, token]);

  const value = useMemo(
    () => ({
      user,
      token,
      login,
      register,
      logout,
      clearSession,
      isInitializing,
      isAuthenticated: Boolean(token && user)
    }),
    [clearSession, isInitializing, login, logout, register, token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
