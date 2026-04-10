/**
 * Payments Feature - Constants
 * ---------------------------------------
 * Constants and configuration for payments feature.
 * 
 * Usage:
 * - Import constants instead of hardcoding values
 * - Centralizes all payment-related constants
 * 
 * @module features/payments/payments.constants
 */

/**
 * Payment status labels
 */
export const PAYMENT_STATUS_LABELS: Record<string, string> = {
  pending: "Pending",
  completed: "Completed",
  failed: "Failed",
  refunded: "Refunded",
  cancelled: "Cancelled",
};

/**
 * Payment status colors for badges
 */
export const PAYMENT_STATUS_COLORS: Record<string, "success" | "warning" | "danger" | "info"> = {
  pending: "warning",
  completed: "success",
  failed: "danger",
  refunded: "info",
  cancelled: "danger",
};

/**
 * Payment method labels
 */
export const PAYMENT_METHOD_LABELS: Record<string, string> = {
  credit_card: "Credit Card",
  debit_card: "Debit Card",
  bank_account: "Bank Account",
  paypal: "PayPal",
  check: "Check",
  cash: "Cash",
};

/**
 * Payment method icons
 */
export const PAYMENT_METHOD_ICONS: Record<string, string> = {
  credit_card: "credit-card",
  debit_card: "credit-card",
  bank_account: "building",
  paypal: "paypal",
  check: "file-text",
  cash: "dollar-sign",
};

/**
 * Card brand colors
 */
export const CARD_BRAND_COLORS: Record<string, string> = {
  visa: "#1A1F71",
  mastercard: "#EB001B",
  amex: "#006FCF",
  discover: "#FF6000",
};

/**
 * Payment pagination defaults
 */
export const PAYMENTS_PER_PAGE = 10;

/**
 * Payment status filter options
 */
export const PAYMENT_STATUS_FILTERS = [
  { label: "All Payments", value: "all" },
  { label: "Completed", value: "completed" },
  { label: "Pending", value: "pending" },
  { label: "Failed", value: "failed" },
  { label: "Refunded", value: "refunded" },
];

/**
 * Payment method type options
 */
export const PAYMENT_METHOD_TYPE_OPTIONS = [
  { label: "Credit Card", value: "credit_card" },
  { label: "Debit Card", value: "debit_card" },
  { label: "Bank Account", value: "bank_account" },
  { label: "PayPal", value: "paypal" },
];
