/**
 * Support Feature - Type Definitions
 * ---------------------------------------
 * TypeScript types and interfaces for support feature.
 * 
 * Usage:
 * - Import types from this file for type safety
 * - Extend base types from lib/types as needed
 * 
 * Backend Integration:
 * - Update types to match backend API response structure
 * - Add new types as features are added
 * 
 * @module features/support/support.types
 */

// Re-export base types from global types
export type { FAQ, SupportTicket } from "@/lib/types";

/**
 * Support ticket priority
 */
export type TicketPriority = "low" | "medium" | "high" | "urgent";

/**
 * Support ticket status
 */
export type TicketStatus = "open" | "in_progress" | "waiting" | "resolved" | "closed";

/**
 * Support ticket category
 */
export type TicketCategory = "policy" | "claims" | "billing" | "technical" | "general";

/**
 * FAQ search parameters
 */
export interface FAQSearchParams {
  category?: string;
  search?: string;
}

/**
 * Create ticket payload
 */
export interface CreateTicketPayload {
  subject: string;
  category: TicketCategory;
  priority: TicketPriority;
  description: string;
}

/**
 * Update ticket payload
 */
export interface UpdateTicketPayload {
  status?: TicketStatus;
  priority?: TicketPriority;
}

/**
 * Ticket message
 */
export interface TicketMessage {
  id: string;
  ticketId: string;
  sender: "user" | "support";
  message: string;
  attachments?: string[];
  createdAt: string;
}

/**
 * Add ticket message payload
 */
export interface AddTicketMessagePayload {
  message: string;
  attachments?: string[];
}
