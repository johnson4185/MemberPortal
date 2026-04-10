/**
 * Auth Feature - API Service
 * ---------------------------------------
 * API service for all authentication-related operations.
 * 
 * Usage:
 * - Import authApi to interact with auth backend
 * - Automatically switches between mock and real API based on env
 * 
 * Backend Integration:
 * 1. Set NEXT_PUBLIC_USE_MOCK=false in .env.local
 * 2. Set NEXT_PUBLIC_API_URL to your backend URL
 * 3. Remove mock imports and functions
 * 4. Uncomment real API calls
 * 
 * @module features/auth/auth.api
 */

import { apiConfig } from "@/lib/api/apiConfig";
import { MOCK_USERS, MOCK_TOKEN, getMockUserByEmail } from "./auth.mock";
import type {
  User,
  LoginCredentials,
  RegisterData,
  AuthResponse,
  PasswordResetRequest,
  PasswordResetConfirm,
} from "./auth.types";

/**
 * Auth API Service
 * 
 * All authentication-related API calls should go through this service.
 * Handles mock/real API switching automatically.
 */
export const authApi = {
  /**
   * Login user
   * 
   * @param credentials - Email and password
   * @returns Promise<AuthResponse>
   * 
   * Backend Endpoint: POST /api/auth/login
   * Body: { email, password }
   */
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    // MOCK MODE
    if (apiConfig.useMock) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      const user = getMockUserByEmail(credentials.email);
      if (!user) {
        throw new Error("Invalid credentials");
      }
      
      return {
        user,
        token: MOCK_TOKEN + "-" + Date.now(),
      };
    }
    
    // REAL API MODE
    // Uncomment when backend is ready:
    /*
    const response = await apiClient.post<AuthResponse>(
      API_ROUTES.AUTH.LOGIN,
      credentials
    );
    return response;
    */
    
    throw new Error("Real API not implemented yet");
  },

  /**
   * Register new user
   * 
   * @param data - Registration data
   * @returns Promise<AuthResponse>
   * 
   * Backend Endpoint: POST /api/auth/register
   * Body: RegisterData
   */
  register: async (data: RegisterData): Promise<AuthResponse> => {
    // MOCK MODE
    if (apiConfig.useMock) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      const newUser: User = {
        id: Date.now().toString(),
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone || "",
        dateOfBirth: data.dateOfBirth || "",
        address: {
          street: "",
          city: "",
          state: "",
          zipCode: "",
          country: "USA",
        },
        memberId: `MEM-${Date.now()}`,
        policyNumber: `POL-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      return {
        user: newUser,
        token: MOCK_TOKEN + "-" + Date.now(),
      };
    }
    
    // REAL API MODE
    // Uncomment when backend is ready:
    /*
    const response = await apiClient.post<AuthResponse>(
      API_ROUTES.AUTH.REGISTER,
      data
    );
    return response;
    */
    
    throw new Error("Real API not implemented yet");
  },

  /**
   * Validate authentication token
   * 
   * @returns Promise<User>
   * 
   * Backend Endpoint: GET /api/auth/validate
   * Headers: Authorization: Bearer {token}
   */
  validateToken: async (): Promise<User> => {
    // MOCK MODE
    if (apiConfig.useMock) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      return MOCK_USERS["Johncy@gmail.com"];
    }
    
    // REAL API MODE
    // Uncomment when backend is ready:
    /*
    const response = await apiClient.get<User>(
      API_ROUTES.AUTH.VALIDATE
    );
    return response;
    */
    
    throw new Error("Real API not implemented yet");
  },

  /**
   * Request password reset
   * 
   * @param data - Email address
   * @returns Promise<void>
   * 
   * Backend Endpoint: POST /api/auth/forgot-password
   * Body: { email }
   */
  requestPasswordReset: async (_data: PasswordResetRequest): Promise<void> => {
    // MOCK MODE
    if (apiConfig.useMock) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return;
    }
    
    // REAL API MODE
    // Uncomment when backend is ready:
    /*
    await apiClient.post(
      API_ROUTES.AUTH.FORGOT_PASSWORD,
      data
    );
    */
    
    throw new Error("Real API not implemented yet");
  },

  /**
   * Confirm password reset
   * 
   * @param data - Reset token and new password
   * @returns Promise<void>
   * 
   * Backend Endpoint: POST /api/auth/reset-password
   * Body: { token, newPassword }
   */
  confirmPasswordReset: async (_data: PasswordResetConfirm): Promise<void> => {
    // MOCK MODE
    if (apiConfig.useMock) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return;
    }
    
    // REAL API MODE
    // Uncomment when backend is ready:
    /*
    await apiClient.post(
      API_ROUTES.AUTH.RESET_PASSWORD,
      data
    );
    */
    
    throw new Error("Real API not implemented yet");
  },

  /**
   * Logout user
   * 
   * @returns Promise<void>
   * 
   * Backend Endpoint: POST /api/auth/logout
   */
  logout: async (): Promise<void> => {
    // MOCK MODE
    if (apiConfig.useMock) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      return;
    }
    
    // REAL API MODE
    // Uncomment when backend is ready:
    /*
    await apiClient.post(API_ROUTES.AUTH.LOGOUT);
    */
    
    throw new Error("Real API not implemented yet");
  },
};
