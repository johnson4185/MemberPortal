/**
 * Claims Feature - Type Definitions
 * ---------------------------------------
 * TypeScript types and interfaces for claims feature.
 * 
 * Usage:
 * - Import types from this file for type safety
 * - Extend base types from lib/types as needed
 * 
 * Backend Integration:
 * - Update types to match backend API response structure
 * - Add new types as features are added
 * 
 * @module features/claims/claims.types
 */

// Re-export base types from global types
export type {
  Claim,
  ClaimStatus,
  ClaimType,
  ClaimAttachment,
  ClaimTimeline,
  ClaimFormData,
} from "@/lib/types/claim";

/**
 * Claims list query parameters
 */
export interface ClaimsListParams {
  page?: number;
  limit?: number;
  status?: string;
  type?: string;
  startDate?: string;
  endDate?: string;
  search?: string;
}

/**
 * Claims list API response
 */
export interface ClaimsListResponse {
  claims: import("@/lib/types/claim").Claim[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * Claim submission payload
 */
export interface SubmitClaimPayload {
  type: import("@/lib/types/claim").ClaimType;
  serviceDate: string;
  providerName: string;
  providerNPI?: string;
  diagnosis: string;
  diagnosisCode?: string;
  amountBilled: number;
  description: string;
  attachments?: string[]; // File URLs after upload
}

/**
 * Claim update payload
 */
export interface UpdateClaimPayload {
  description?: string;
  attachments?: string[];
}
