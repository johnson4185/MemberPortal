/**
 * API Client
 * ---------------------------------------
 * Centralized HTTP client for all API requests.
 * Handles authentication, error handling, and request/response interceptors.
 * 
 * Usage:
 * - Import apiClient to make HTTP requests
 * - Automatically attaches auth token from cookies
 * - Handles errors globally
 * 
 * Backend Integration:
 * - Configure base URL in apiConfig.ts
 * - Update interceptors as needed for your backend
 * 
 * @module lib/api/apiClient
 */

import Cookies from "js-cookie";
import { apiConfig } from "./apiConfig";

/**
 * API Error Response Type
 */
export interface ApiError {
  message: string;
  code?: string;
  status?: number;
  details?: unknown;
}

/**
 * API Response Wrapper Type
 */
export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  success: boolean;
}

/**
 * Request configuration options
 */
interface RequestConfig extends RequestInit {
  params?: Record<string, string | number | boolean>;
}

/**
 * Custom API Client Class
 * Wraps fetch API with additional functionality
 */
class ApiClient {
  private baseURL: string;
  private timeout: number;

  constructor() {
    this.baseURL = apiConfig.baseURL;
    this.timeout = apiConfig.timeout;
  }

  /**
   * Get authorization token from cookies
   */
  private getAuthToken(): string | null {
    return Cookies.get("auth_token") || null;
  }

  /**
   * Build full URL with query parameters
   */
  private buildUrl(endpoint: string, params?: Record<string, string | number | boolean>): string {
    const url = `${this.baseURL}${endpoint}`;

    if (!params) return url;

    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, String(value));
      }
    });

    return `${url}?${queryParams.toString()}`;
  }

  /**
   * Get default headers including auth token
   */
  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      ...apiConfig.headers,
    };

    const token = this.getAuthToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return headers;
  }

  /**
   * Handle API errors consistently
   */
  private async handleError(response: Response): Promise<never> {
    let errorMessage = "An error occurred";
    let errorDetails = {};

    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
      errorDetails = errorData;
    } catch {
      // If parsing fails, use status text
      errorMessage = response.statusText || errorMessage;
    }

    const error: ApiError = {
      message: errorMessage,
      status: response.status,
      details: errorDetails,
    };

    // Log error in development
    if (process.env.NODE_ENV === "development") {
      console.error("API Error:", error);
    }

    throw error;
  }

  /**
   * Generic request handler
   */
  private async request<T>(
    endpoint: string,
    config: RequestConfig = {}
  ): Promise<ApiResponse<T>> {
    const { params, ...fetchConfig } = config;

    // Build URL with params
    const url = this.buildUrl(endpoint, params);

    // Merge headers
    const headers = {
      ...this.getHeaders(),
      ...fetchConfig.headers,
    };

    // Create abort controller for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...fetchConfig,
        headers,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Handle non-OK responses
      if (!response.ok) {
        await this.handleError(response);
      }

      // Parse response
      const data = await response.json();

      return {
        data,
        success: true,
      };
    } catch (error) {
      clearTimeout(timeoutId);

      // Handle timeout
      if (error instanceof Error && error.name === "AbortError") {
        throw {
          message: "Request timeout",
          status: 408,
        } as ApiError;
      }

      throw error;
    }
  }

  /**
   * GET request
   */
  async get<T>(endpoint: string, params?: Record<string, string | number | boolean>): Promise<T> {
    const response = await this.request<T>(endpoint, {
      method: "GET",
      params,
    });
    return response.data;
  }

  /**
   * POST request
   */
  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    const response = await this.request<T>(endpoint, {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
    return response.data;
  }

  /**
   * PUT request
   */
  async put<T>(endpoint: string, data?: unknown): Promise<T> {
    const response = await this.request<T>(endpoint, {
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    });
    return response.data;
  }

  /**
   * PATCH request
   */
  async patch<T>(endpoint: string, data?: unknown): Promise<T> {
    const response = await this.request<T>(endpoint, {
      method: "PATCH",
      body: data ? JSON.stringify(data) : undefined,
    });
    return response.data;
  }

  /**
   * DELETE request
   */
  async delete<T>(endpoint: string): Promise<T> {
    const response = await this.request<T>(endpoint, {
      method: "DELETE",
    });
    return response.data;
  }
}

/**
 * Singleton API client instance
 * Use this throughout the application for all API calls
 */
export const apiClient = new ApiClient();
