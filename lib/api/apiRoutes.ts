/**
 * API Routes Configuration
 * ---------------------------------------
 * Centralized endpoint definitions for all API calls.
 * 
 * Usage:
 * - Import API_ROUTES to access typed endpoint paths
 * - Prevents hardcoded URLs throughout the codebase
 * 
 * Backend Integration:
 * - Update these routes to match your backend API structure
 * - Add new routes as features are added
 * 
 * @module lib/api/apiRoutes
 */

/**
 * Centralized API endpoint definitions
 * All endpoints are defined here to maintain consistency
 */
export const API_ROUTES = {
  /**
   * Authentication endpoints
   */
  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    REGISTER: "/auth/register",
    REFRESH: "/auth/refresh",
    PROFILE: "/auth/profile",
  },

  /**
   * Claims management endpoints
   */
  CLAIMS: {
    LIST: "/claims",
    DETAIL: (id: string) => `/claims/${id}`,
    CREATE: "/claims",
    UPDATE: (id: string) => `/claims/${id}`,
    DELETE: (id: string) => `/claims/${id}`,
    SUBMIT: "/claims/submit",
  },

  /**
   * Policy management endpoints
   */
  POLICY: {
    DETAILS: "/policy",
    COVERAGE: "/policy/coverage",
    DOCUMENTS: "/policy/documents",
    DEPENDENTS: "/policy/dependents",
  },

  /**
   * Provider directory endpoints
   */
  PROVIDERS: {
    SEARCH: "/providers/search",
    DETAIL: (id: string) => `/providers/${id}`,
    NEARBY: "/providers/nearby",
  },

  /**
   * Payments and billing endpoints
   */
  PAYMENTS: {
    HISTORY: "/payments/history",
    OVERVIEW: "/payments/overview",
    MAKE_PAYMENT: "/payments/create",
    DETAIL: (id: string) => `/payments/${id}`,
  },

  /**
   * Support and help endpoints
   */
  SUPPORT: {
    TICKETS: "/support/tickets",
    CREATE_TICKET: "/support/tickets",
    FAQ: "/support/faq",
    DETAIL: (id: string) => `/support/tickets/${id}`,
  },

  /**
   * Wellness and health tracking endpoints
   */
  WELLNESS: {
    METRICS: "/wellness/metrics",
    ARTICLES: "/wellness/articles",
    TELEMEDICINE: "/wellness/telemedicine",
    GOALS: "/wellness/goals",
  },

  /**
   * Dashboard and analytics endpoints
   */
  DASHBOARD: {
    STATS: "/dashboard/stats",
    RECENT_CLAIMS: "/dashboard/recent-claims",
    ALERTS: "/dashboard/alerts",
  },
} as const;

/**
 * Query parameter builder helper
 * 
 * @example
 * buildQueryParams({ page: 1, limit: 10, status: 'active' })
 * // Returns: "?page=1&limit=10&status=active"
 */
export const buildQueryParams = (params: Record<string, string | number | boolean>): string => {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : "";
};
