/**
 * Policy Feature - Type Definitions
 * ---------------------------------------
 * TypeScript types and interfaces for policy feature.
 * 
 * Usage:
 * - Import types from this file for type safety
 * - Extend base types from lib/types as needed
 * 
 * Backend Integration:
 * - Update types to match backend API response structure
 * - Add new types as features are added
 * 
 * @module features/policy/policy.types
 */

// Re-export base types from global types
export type { Policy, Coverage, Dependent } from "@/lib/types";

/**
 * Policy update payload
 */
export interface UpdatePolicyPayload {
  planName?: string;
  premium?: number;
}

/**
 * Add dependent payload
 */
export interface AddDependentPayload {
  firstName: string;
  lastName: string;
  relationship: string;
  dateOfBirth: string;
}

/**
 * Update dependent payload
 */
export interface UpdateDependentPayload {
  firstName?: string;
  lastName?: string;
  relationship?: string;
  dateOfBirth?: string;
  status?: "active" | "inactive";
}
