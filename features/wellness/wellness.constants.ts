/**
 * Wellness Feature - Constants
 * ---------------------------------------
 * Constants and configuration for wellness feature.
 * 
 * Usage:
 * - Import constants instead of hardcoding values
 * - Centralizes all wellness-related constants
 * 
 * @module features/wellness/wellness.constants
 */

/**
 * Wellness metric types
 */
export const METRIC_TYPES = {
  STEPS: "steps",
  WATER: "water",
  SLEEP: "sleep",
  ACTIVE_MINUTES: "active_minutes",
  WEIGHT: "weight",
  HEART_RATE: "heart_rate",
  CALORIES: "calories",
};

/**
 * Wellness metric icons
 */
export const METRIC_ICONS: Record<string, string> = {
  steps: "activity",
  water: "droplet",
  sleep: "moon",
  active_minutes: "zap",
  weight: "trending-down",
  heart_rate: "heart",
  calories: "flame",
};

/**
 * Wellness metric colors
 */
export const METRIC_COLORS: Record<string, string> = {
  steps: "primary",
  water: "blue",
  sleep: "indigo",
  active_minutes: "orange",
  weight: "green",
  heart_rate: "red",
  calories: "yellow",
};

/**
 * Article categories
 */
export const ARTICLE_CATEGORIES = [
  "All",
  "Sleep Health",
  "Mental Health",
  "Nutrition",
  "Exercise",
  "Preventive Care",
];

/**
 * Article category filter options
 */
export const ARTICLE_CATEGORY_FILTERS = [
  { label: "All Articles", value: "All" },
  { label: "Sleep Health", value: "Sleep Health" },
  { label: "Mental Health", value: "Mental Health" },
  { label: "Nutrition", value: "Nutrition" },
  { label: "Exercise", value: "Exercise" },
  { label: "Preventive Care", value: "Preventive Care" },
];

/**
 * Wellness articles pagination defaults
 */
export const ARTICLES_PER_PAGE = 9;

/**
 * Telemedicine specialties
 */
export const TELEMEDICINE_SPECIALTIES = [
  "Primary Care",
  "Mental Health",
  "Pediatrics",
  "Dermatology",
  "Urgent Care",
];

/**
 * Telemedicine availability status
 */
export const AVAILABILITY_STATUS: Record<string, string> = {
  AVAILABLE_NOW: "Available Now",
  TODAY: "Available Today",
  WEEK: "Available This Week",
  UNAVAILABLE: "Currently Unavailable",
};

/**
 * Wellness goals
 */
export const DEFAULT_WELLNESS_GOALS = {
  steps: 10000,
  water: 8,
  sleep: 8,
  active_minutes: 60,
  weight: 0,
  heart_rate: 70,
  calories: 2000,
};
