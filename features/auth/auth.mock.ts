/**
 * Auth Feature - Mock Data
 * ---------------------------------------
 * Mock data for authentication feature during development.
 * 
 * Usage:
 * - Used when NEXT_PUBLIC_USE_MOCK=true
 * - Replace with real API calls in auth.api.ts
 * 
 * Removal Instructions:
 * - Set NEXT_PUBLIC_USE_MOCK=false in .env.local
 * - This file can be deleted once backend is integrated
 * 
 * @module features/auth/auth.mock
 */

import { User } from "./auth.types";

/**
 * Mock users for development
 */
export const MOCK_USERS: Record<string, User> = {
  "Johncy@gmail.com": {
    id: "1",
    email: "Johncy@gmail.com",
    firstName: "Johnc",
    lastName: "Vargh",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1990-01-15",
    address: {
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA",
    },
    memberId: "MEM-2026-001",
    policyNumber: "POL-2026-001",
    createdAt: "2020-01-15",
    updatedAt: new Date().toISOString(),
  },
};

/**
 * Mock JWT token
 */
export const MOCK_TOKEN = "mock-jwt-token-12345";

/**
 * Get mock user by email
 */
export const getMockUserByEmail = (email: string): User | undefined => {
  return MOCK_USERS[email] || MOCK_USERS["Johncy@gmail.com"];
};
