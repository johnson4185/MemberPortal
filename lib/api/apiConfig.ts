/**
 * API Configuration
 * ---------------------------------------
 * Centralized configuration for all API calls.
 * 
 * Usage:
 * - Import apiConfig to access base URL and settings
 * - Toggle mock mode via environment variable
 * 
 * Backend Integration:
 * - Update NEXT_PUBLIC_API_URL in .env.local
 * - Set NEXT_PUBLIC_USE_MOCK=false to use real API
 * 
 * @module lib/api/apiConfig
 */

/**
 * API Configuration Object
 */
export const apiConfig = {
  /**
   * Base URL for API requests
   * Defaults to localhost:3001 if not provided
   */
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api",

  /**
   * Whether to use mock data instead of real API
   * Controlled by NEXT_PUBLIC_USE_MOCK environment variable
   */
  useMock: process.env.NEXT_PUBLIC_USE_MOCK === "true",

  /**
   * Request timeout in milliseconds
   */
  timeout: 30000,

  /**
   * Default headers for all requests
   */
  headers: {
    "Content-Type": "application/json",
  },

  /**
   * API version prefix (if applicable)
   */
  apiVersion: "v1",
} as const;

/**
 * Helper to check if app is in mock mode
 */
export const isUsingMockData = () => apiConfig.useMock;

/**
 * Helper to get full API URL with version
 */
export const getApiUrl = (endpoint: string) => {
  return `${apiConfig.baseURL}/${endpoint}`;
};
