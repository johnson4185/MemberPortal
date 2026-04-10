/**
 * Auth Feature - Constants
 * ---------------------------------------
 * Constants and configuration for authentication feature.
 * 
 * Usage:
 * - Import constants instead of hardcoding values
 * - Centralizes all auth-related constants
 * 
 * @module features/auth/auth.constants
 */

/**
 * Token storage key
 */
export const AUTH_TOKEN_KEY = "auth_token";

/**
 * User storage key
 */
export const AUTH_USER_KEY = "auth_user";

/**
 * Token expiry time (7 days in milliseconds)
 */
export const TOKEN_EXPIRY_TIME = 7 * 24 * 60 * 60 * 1000;

/**
 * Password minimum length
 */
export const PASSWORD_MIN_LENGTH = 8;

/**
 * Password requirements regex
 */
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;

/**
 * Email validation regex
 */
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Auth error messages
 */
export const AUTH_ERROR_MESSAGES = {
  INVALID_CREDENTIALS: "Invalid email or password",
  EMAIL_EXISTS: "An account with this email already exists",
  WEAK_PASSWORD: "Password must be at least 8 characters with uppercase, lowercase, and number",
  INVALID_EMAIL: "Please enter a valid email address",
  SESSION_EXPIRED: "Your session has expired. Please log in again",
  NETWORK_ERROR: "Network error. Please try again",
  UNAUTHORIZED: "Unauthorized access. Please log in",
};

/**
 * Protected routes that require authentication
 */
export const PROTECTED_ROUTES = [
  "/dashboard",
  "/claims",
  "/policy",
  "/payments",
  "/providers",
  "/wellness",
  "/support",
  "/settings",
];

/**
 * Public routes that don't require authentication
 */
export const PUBLIC_ROUTES = [
  "/",
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
];
