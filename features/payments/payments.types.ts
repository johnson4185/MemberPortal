/**
 * Payments Feature - Type Definitions
 * ---------------------------------------
 * TypeScript types and interfaces for payments feature.
 * 
 * Usage:
 * - Import types from this file for type safety
 * - Extend base types from lib/types as needed
 * 
 * Backend Integration:
 * - Update types to match backend API response structure
 * - Add new types as features are added
 * 
 * @module features/payments/payments.types
 */

// Re-export base types from global types
export type { Payment, BillingOverview } from "@/lib/types";

/**
 * Payment method type
 */
export type PaymentMethodType = "credit_card" | "debit_card" | "bank_account" | "paypal";

/**
 * Payment method
 */
export interface PaymentMethod {
  id: string;
  type: PaymentMethodType;
  last4: string;
  expiryMonth?: number;
  expiryYear?: number;
  brand?: string;
  isDefault: boolean;
}

/**
 * Payment history query parameters
 */
export interface PaymentHistoryParams {
  page?: number;
  limit?: number;
  startDate?: string;
  endDate?: string;
  status?: string;
}

/**
 * Payment history response
 */
export interface PaymentHistoryResponse {
  payments: import("@/lib/types").Payment[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * Make payment payload
 */
export interface MakePaymentPayload {
  amount: number;
  paymentMethodId: string;
  description?: string;
}

/**
 * Add payment method payload
 */
export interface AddPaymentMethodPayload {
  type: PaymentMethodType;
  cardNumber?: string;
  expiryMonth?: number;
  expiryYear?: number;
  cvv?: string;
  accountNumber?: string;
  routingNumber?: string;
}
