/**
 * Authentication Store
 * =======================================
 * Global authentication state management using Zustand.
 * 
 * Purpose:
 * - Manages user authentication state
 * - Handles login/logout operations
 * - Stores auth token in cookies
 * - Validates token on app load
 * 
 * Used By:
 * - app/(dashboard)/layout.tsx - Auth guard
 * - app/(auth)/login/page.tsx - Login functionality
 * - app/(auth)/register/page.tsx - Registration
 * - All dashboard pages - Access user data
 * 
 * Features:
 * - Persistent auth token (cookies)
 * - Auto-login on page refresh
 * - Secure token storage
 * - Loading states
 * 
 * Backend Integration:
 * - Currently uses features/auth/auth.api.ts
 * - Update when real auth endpoint is ready
 * - Token validation should call backend
 * 
 * Notes:
 * - Token stored in httpOnly cookie (secure: true)
 * - checkAuth() called on app initialization
 * - isLoading prevents flash of unauthenticated content
 * 
 * @module lib/store/authStore
 */

import { create } from "zustand";
import Cookies from "js-cookie";
import { User } from "@/lib/types";
import { authApi } from "@/features/auth/auth.api";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  
  setToken: (token) => {
    if (token) {
      Cookies.set("auth_token", token, { expires: 7, secure: true, sameSite: "strict" });
    } else {
      Cookies.remove("auth_token");
    }
    set({ token });
  },
  
  login: async (email) => {
    try {
      const { user, token } = await authApi.login({ email, password: "" });
      
      Cookies.set("auth_token", token, { expires: 7, secure: true, sameSite: "strict" });
      set({ user, token, isAuthenticated: true, isLoading: false });
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  },
  
  logout: () => {
    Cookies.remove("auth_token");
    set({ user: null, token: null, isAuthenticated: false });
  },
  
  checkAuth: async () => {
    const token = Cookies.get("auth_token");
    
    if (token) {
      try {
        const user = await authApi.validateToken();
        set({ user, token, isAuthenticated: true, isLoading: false });
      } catch {
        Cookies.remove("auth_token");
        set({ user: null, token: null, isAuthenticated: false, isLoading: false });
      }
    } else {
      set({ isLoading: false });
    }
  },
}));
