/**
 * Payments Feature - Mock Data
 * ---------------------------------------
 * Mock data for payments feature during development.
 * 
 * Usage:
 * - Used when NEXT_PUBLIC_USE_MOCK=true
 * - Replace with real API calls in payments.api.ts
 * 
 * Removal Instructions:
 * - Set NEXT_PUBLIC_USE_MOCK=false in .env.local
 * - This file can be deleted once backend is integrated
 * 
 * @module features/payments/payments.mock
 */

import { BillingOverview, Payment, PaymentMethod } from "./payments.types";

/**
 * Mock billing overview for development
 */
export const MOCK_BILLING_OVERVIEW: BillingOverview = {
  totalDue: 450.0,
  lastPayment: 535.0,
  lastPaymentDate: "2026-01-15",
  nextPaymentDue: 535.0,
  nextPaymentDate: "2026-03-01",
  outstandingBalance: 0,
};

/**
 * Mock payment methods for development
 */
export const MOCK_PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "pm-001",
    type: "credit_card",
    last4: "4242",
    expiryMonth: 12,
    expiryYear: 2027,
    brand: "Visa",
    isDefault: true,
  },
  {
    id: "pm-002",
    type: "credit_card",
    last4: "8888",
    expiryMonth: 8,
    expiryYear: 2026,
    brand: "Mastercard",
    isDefault: false,
  },
  {
    id: "pm-003",
    type: "debit_card",
    last4: "1234",
    expiryMonth: 5,
    expiryYear: 2028,
    brand: "Visa",
    isDefault: false,
  },
];

/**
 * Mock billing address for development
 */
export const MOCK_BILLING_ADDRESS = {
  street: "123 Main Street, Apt 4B",
  city: "New York",
  state: "NY",
  zipCode: "10001",
  country: "United States",
};

/**
 * Mock auto-pay settings for development
 */
export const MOCK_AUTO_PAY_SETTINGS = {
  isEnabled: true,
  selectedMethodId: "pm-001",
};

/**
 * Mock payment history for development
 */
export const MOCK_PAYMENT_HISTORY: Payment[] = [
  {
    id: "PAY-003",
    invoiceNumber: "INV-2026-002",
    amount: 535.0,
    method: "credit_card",
    status: "completed",
    description: "Monthly Premium - January 2026",
    dueDate: "2026-01-01",
    paidDate: "2026-01-15",
    createdAt: "2025-12-15",
  },
  {
    id: "PAY-002",
    invoiceNumber: "INV-2025-012",
    amount: 450.0,
    method: "credit_card",
    status: "completed",
    description: "Monthly Premium - December 2025",
    dueDate: "2025-12-01",
    paidDate: "2025-12-05",
    createdAt: "2025-11-15",
  },
  {
    id: "PAY-001",
    invoiceNumber: "INV-2025-011",
    amount: 450.0,
    method: "credit_card",
    status: "completed",
    description: "Monthly Premium - November 2025",
    dueDate: "2025-11-01",
    paidDate: "2025-11-03",
    createdAt: "2025-10-15",
  },
];
