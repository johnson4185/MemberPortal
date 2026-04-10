/**
 * Wellness Feature - Type Definitions
 * ---------------------------------------
 * TypeScript types and interfaces for wellness feature.
 * 
 * Usage:
 * - Import types from this file for type safety
 * - Extend base types from lib/types as needed
 * 
 * Backend Integration:
 * - Update types to match backend API response structure
 * - Add new types as features are added
 * 
 * @module features/wellness/wellness.types
 */

// Re-export base types from global types
export type {
  WellnessMetric,
  WellnessArticle,
  TelemedicineProvider,
} from "@/lib/types";

/**
 * Wellness article category
 */
export type ArticleCategory =
  | "Sleep Health"
  | "Mental Health"
  | "Nutrition"
  | "Exercise"
  | "Preventive Care";

/**
 * Wellness articles search parameters
 */
export interface ArticlesSearchParams {
  category?: ArticleCategory | string;
  search?: string;
  page?: number;
  limit?: number;
}

/**
 * Wellness articles response
 */
export interface ArticlesSearchResponse {
  articles: import("@/lib/types").WellnessArticle[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * Update wellness metric payload
 */
export interface UpdateMetricPayload {
  value: number;
}

/**
 * Telemedicine appointment request
 */
export interface TelemedicineAppointmentRequest {
  providerId: string;
  date: string;
  time: string;
  reason: string;
}
