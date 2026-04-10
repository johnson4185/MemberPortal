/**
 * Claims Feature - Constants
 * ---------------------------------------
 * Constants and configuration for claims feature.
 * 
 * Usage:
 * - Import constants instead of hardcoding values
 * - Centralizes all claim-related constants
 * 
 * @module features/claims/claims.constants
 */

import { ClaimStatus, ClaimType } from "./claims.types";

/**
 * Claim status display labels
 */
export const CLAIM_STATUS_LABELS: Record<ClaimStatus, string> = {
  draft: "Draft",
  submitted: "Submitted",
  under_review: "Under Review",
  approved: "Approved",
  denied: "Denied",
  rejected: "Rejected",
  resubmitted: "Resubmitted",
  paid: "Paid",
  withdrawn: "Withdrawn",
};

/**
 * Claim type display labels
 */
export const CLAIM_TYPE_LABELS: Record<ClaimType, string> = {
  medical: "Medical",
  dental: "Dental",
  vision: "Vision",
  prescription: "Prescription",
  hospitalization: "Hospitalization",
};

/**
 * Claim status colors for badges
 */
export const CLAIM_STATUS_COLORS: Record<ClaimStatus, "success" | "warning" | "danger" | "info"> = {
  draft: "info",
  submitted: "info",
  under_review: "warning",
  approved: "success",
  denied: "danger",
  rejected: "danger",
  resubmitted: "info",
  paid: "success",
  withdrawn: "info",
};

/**
 * Allowed file types for claim attachments
 */
export const ALLOWED_ATTACHMENT_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "application/pdf",
];

/**
 * Maximum file size for attachments (5MB)
 */
export const MAX_ATTACHMENT_SIZE = 5 * 1024 * 1024;

/**
 * Maximum number of attachments per claim
 */
export const MAX_ATTACHMENTS = 10;

/**
 * Claim pagination defaults
 */
export const CLAIMS_PER_PAGE = 10;

/**
 * Claim status filter options
 */
export const CLAIM_STATUS_FILTERS = [
  { label: "All Claims", value: "all" },
  { label: "Submitted", value: "submitted" },
  { label: "Under Review", value: "under_review" },
  { label: "Approved", value: "approved" },
  { label: "Denied", value: "denied" },
  { label: "Withdrawn", value: "withdrawn" },
  { label: "Paid", value: "paid" },
];

/**
 * Claim type filter options
 */
export const CLAIM_TYPE_FILTERS = [
  { label: "All Types", value: "all" },
  { label: "Medical", value: "medical" },
  { label: "Dental", value: "dental" },
  { label: "Vision", value: "vision" },
  { label: "Prescription", value: "prescription" },
  { label: "Hospitalization", value: "hospitalization" },
];
