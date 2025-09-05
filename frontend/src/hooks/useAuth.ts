import { useState, useEffect } from 'react';
import { apiRequest, api } from '@/lib/api';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'Student' | 'Warden' | 'Admin';
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isLoading: true,
    isAuthenticated: false,
  });

  // Initialize auth state from localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
      try {
        const parsedUser = JSON.parse(user);
        console.log("useAuth: Loaded user from localStorage:", parsedUser);
        setAuthState({
          user: parsedUser,
          token,
          isLoading: false,
          isAuthenticated: true,
        });
      } catch (error) {
        // Invalid stored data, clear it
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));

      const response = await apiRequest(api.auth.signin, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      const { token, user } = response.data;
      console.log("useAuth: signIn response user:", user);

      // Normalize user role string
      const normalizedUser = {
        ...user,
        role: user.role.trim().charAt(0).toUpperCase() + user.role.trim().slice(1).toLowerCase()
      };

      // Store in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(normalizedUser));

      setAuthState({
        user: normalizedUser,
        token,
        isLoading: false,
        isAuthenticated: true,
      });

      return { success: true };
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Login failed'
      };
    }
  };

  const signOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuthState({
      user: null,
      token: null,
      isLoading: false,
      isAuthenticated: false,
    });
  };

  const updateUser = (userData: Partial<User>) => {
    if (authState.user) {
      const updatedUser = { ...authState.user, ...userData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setAuthState(prev => ({ ...prev, user: updatedUser }));
    }
  };

  return {
    ...authState,
    signIn,
    signOut,
    updateUser,
  };
};
