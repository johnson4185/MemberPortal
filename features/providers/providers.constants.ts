/**
 * Providers Feature - Constants
 * ---------------------------------------
 * Constants and configuration for providers feature.
 * 
 * Usage:
 * - Import constants instead of hardcoding values
 * - Centralizes all provider-related constants
 * 
 * @module features/providers/providers.constants
 */

/**
 * Provider type labels
 */
export const PROVIDER_TYPE_LABELS: Record<string, string> = {
  primary_care: "Primary Care",
  specialist: "Specialist",
  hospital: "Hospital",
  urgent_care: "Urgent Care",
  pharmacy: "Pharmacy",
};

/**
 * Provider type filter options
 */
export const PROVIDER_TYPE_FILTERS = [
  { label: "All Types", value: "all" },
  { label: "Primary Care", value: "primary_care" },
  { label: "Specialist", value: "specialist" },
  { label: "Hospital", value: "hospital" },
  { label: "Urgent Care", value: "urgent_care" },
  { label: "Pharmacy", value: "pharmacy" },
];

/**
 * Specialty options
 */
export const SPECIALTY_OPTIONS = [
  "Family Medicine",
  "Internal Medicine",
  "Pediatrics",
  "Cardiology",
  "Dermatology",
  "Orthopedics",
  "General Dentistry",
  "Psychiatry",
  "Obstetrics & Gynecology",
  "Ophthalmology",
  "Multi-Specialty",
];

/**
 * Network status labels
 */
export const NETWORK_STATUS_LABELS = {
  true: "In Network",
  false: "Out of Network",
};

/**
 * Network status colors
 */
export const NETWORK_STATUS_COLORS: Record<string, "success" | "warning"> = {
  true: "success",
  false: "warning",
};

/**
 * Distance filter options (in miles)
 */
export const DISTANCE_FILTERS = [
  { label: "Any Distance", value: 0 },
  { label: "Within 5 miles", value: 5 },
  { label: "Within 10 miles", value: 10 },
  { label: "Within 25 miles", value: 25 },
  { label: "Within 50 miles", value: 50 },
];

/**
 * Providers pagination defaults
 */
export const PROVIDERS_PER_PAGE = 12;

/**
 * Map default center (New York City)
 */
export const MAP_DEFAULT_CENTER = {
  lat: 40.7128,
  lng: -74.0060,
};

/**
 * Map default zoom level
 */
export const MAP_DEFAULT_ZOOM = 12;
