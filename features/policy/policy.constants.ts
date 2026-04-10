/**
 * Policy Feature - Constants
 * ---------------------------------------
 * Constants and configuration for policy feature.
 * 
 * Usage:
 * - Import constants instead of hardcoding values
 * - Centralizes all policy-related constants
 * 
 * @module features/policy/policy.constants
 */

/**
 * Policy status labels
 */
export const POLICY_STATUS_LABELS: Record<string, string> = {
  active: "Active",
  inactive: "Inactive",
  suspended: "Suspended",
  cancelled: "Cancelled",
  pending: "Pending",
};

/**
 * Policy status colors for badges
 */
export const POLICY_STATUS_COLORS: Record<string, "success" | "warning" | "danger" | "info"> = {
  active: "success",
  inactive: "info",
  suspended: "warning",
  cancelled: "danger",
  pending: "warning",
};

/**
 * Plan type labels
 */
export const PLAN_TYPE_LABELS: Record<string, string> = {
  Health: "Health Insurance",
  Dental: "Dental Insurance",
  Vision: "Vision Insurance",
  Life: "Life Insurance",
  Disability: "Disability Insurance",
};

/**
 * Relationship options for dependents
 */
export const DEPENDENT_RELATIONSHIPS = [
  { label: "Spouse", value: "Spouse" },
  { label: "Child", value: "Child" },
  { label: "Partner", value: "Partner" },
  { label: "Parent", value: "Parent" },
  { label: "Other", value: "Other" },
];

/**
 * Coverage categories
 */
export const COVERAGE_CATEGORIES = [
  "Medical",
  "Prescription Drugs",
  "Dental",
  "Vision",
  "Mental Health",
  "Preventive Care",
  "Emergency Services",
  "Hospitalization",
];

/**
 * Document types
 */
export const POLICY_DOCUMENT_TYPES = [
  { label: "Policy Document", value: "policy" },
  { label: "Coverage Summary", value: "coverage" },
  { label: "ID Card", value: "id_card" },
  { label: "Benefit Details", value: "benefits" },
  { label: "Terms and Conditions", value: "terms" },
];
