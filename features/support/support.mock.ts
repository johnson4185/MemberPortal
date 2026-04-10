/**
 * Support Feature - Mock Data
 * ---------------------------------------
 * Mock data for support feature during development.
 * 
 * Usage:
 * - Used when NEXT_PUBLIC_USE_MOCK=true
 * - Replace with real API calls in support.api.ts
 * 
 * Removal Instructions:
 * - Set NEXT_PUBLIC_USE_MOCK=false in .env.local
 * - This file can be deleted once backend is integrated
 * 
 * @module features/support/support.mock
 */

import { FAQ, SupportTicket } from "./support.types";

/**
 * Mock FAQs list for development
 */
export const MOCK_FAQS: FAQ[] = [
  {
    id: "1",
    category: "Claims",
    question: "How do I submit a claim?",
    answer:
      'You can submit a claim by clicking the "Submit New Claim" button on the Claims page. Fill out the required information and upload any supporting documents.',
    views: 245,
  },
  {
    id: "2",
    category: "Claims",
    question: "How long does claim processing take?",
    answer:
      "Most claims are processed within 5-7 business days. Complex claims may take up to 14 days.",
    views: 189,
  },
  {
    id: "3",
    category: "Coverage",
    question: "What services are covered under my plan?",
    answer:
      "Your coverage includes medical, dental, vision, prescription drugs, and mental health services. Please review your policy details for specific coverage information.",
    views: 312,
  },
  {
    id: "4",
    category: "Billing",
    question: "Can I change my payment method?",
    answer:
      'Yes, you can update your payment method in the Payments section under "Payment Methods".',
    views: 156,
  },
];

/**
 * Mock support tickets list for development
 */
export const MOCK_SUPPORT_TICKETS: SupportTicket[] = [
  {
    id: "TKT-001",
    ticketNumber: "TKT-001",
    subject: "Question about deductible",
    category: "policy",
    priority: "medium",
    status: "open",
    description: "I would like to know more about my deductible and how it works.",
    messages: [],
    createdAt: "2024-01-20",
    updatedAt: "2024-01-20",
  },
  {
    id: "TKT-002",
    ticketNumber: "TKT-002",
    subject: "Update payment information",
    category: "billing",
    priority: "high",
    status: "resolved",
    description: "Need to update my payment method on file.",
    messages: [],
    createdAt: "2024-01-15",
    updatedAt: "2024-01-16",
    resolvedAt: "2024-01-16",
  },
];
