/**
 * Providers Feature - Type Definitions
 * ---------------------------------------
 * TypeScript types and interfaces for providers feature.
 * 
 * Usage:
 * - Import types from this file for type safety
 * - Extend base types from lib/types as needed
 * 
 * Backend Integration:
 * - Update types to match backend API response structure
 * - Add new types as features are added
 * 
 * @module features/providers/providers.types
 */

// Re-export base types from global types
export type { Provider } from "@/lib/types";

/**
 * Provider type
 */
export type ProviderType = "primary_care" | "specialist" | "hospital" | "urgent_care" | "pharmacy";

/**
 * Provider search parameters
 */
export interface ProviderSearchParams {
  page?: number;
  limit?: number;
  search?: string;
  type?: ProviderType | string;
  specialty?: string;
  inNetwork?: boolean;
  acceptingNewPatients?: boolean;
  location?: string;
  distance?: number;
}

/**
 * Provider search response
 */
export interface ProviderSearchResponse {
  providers: import("@/lib/types").Provider[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
