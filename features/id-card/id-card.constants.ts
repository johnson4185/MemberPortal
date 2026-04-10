/**
 * ID Card Feature - Constants
 * ---------------------------
 * Configuration constants for ID card feature.
 * 
 * @module features/id-card/id-card.constants
 */

/**
 * Document categories
 */
export const DOCUMENT_CATEGORIES = [
  "ID Card",
  "Policy",
  "Provider",
] as const;

/**
 * Plan types
 */
export const PLAN_TYPES = [
  "PPO",
  "HMO",
  "EPO",
  "HDHP",
] as const;

/**
 * Relationship types for dependents
 */
export const RELATIONSHIP_TYPES = [
  "Spouse",
  "Dependent",
  "Domestic Partner",
] as const;

/**
 * Copay types
 */
export const COPAY_LABELS = {
  primaryCare: "PCP",
  specialist: "Spec",
  emergency: "ER",
  urgentCare: "Urgent",
} as const;
