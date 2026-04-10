/**
 * Support Feature - Constants
 * ---------------------------------------
 * Constants and configuration for support feature.
 * 
 * Usage:
 * - Import constants instead of hardcoding values
 * - Centralizes all support-related constants
 * 
 * @module features/support/support.constants
 */

import { TicketPriority, TicketStatus, TicketCategory } from "./support.types";

/**
 * Ticket status labels
 */
export const TICKET_STATUS_LABELS: Record<TicketStatus, string> = {
  open: "Open",
  in_progress: "In Progress",
  waiting: "Waiting",
  resolved: "Resolved",
  closed: "Closed",
};

/**
 * Ticket status colors for badges
 */
export const TICKET_STATUS_COLORS: Record<TicketStatus, "success" | "warning" | "danger" | "info"> = {
  open: "info",
  in_progress: "warning",
  waiting: "warning",
  resolved: "success",
  closed: "info",
};

/**
 * Ticket priority labels
 */
export const TICKET_PRIORITY_LABELS: Record<TicketPriority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  urgent: "Urgent",
};

/**
 * Ticket priority colors for badges
 */
export const TICKET_PRIORITY_COLORS: Record<TicketPriority, "success" | "warning" | "danger" | "info"> = {
  low: "info",
  medium: "warning",
  high: "danger",
  urgent: "danger",
};

/**
 * Ticket category labels
 */
export const TICKET_CATEGORY_LABELS: Record<TicketCategory, string> = {
  policy: "Policy",
  claims: "Claims",
  billing: "Billing",
  technical: "Technical",
  general: "General",
};

/**
 * Ticket category options
 */
export const TICKET_CATEGORY_OPTIONS = [
  { label: "Policy", value: "policy" },
  { label: "Claims", value: "claims" },
  { label: "Billing", value: "billing" },
  { label: "Technical Support", value: "technical" },
  { label: "General Question", value: "general" },
];

/**
 * Ticket priority options
 */
export const TICKET_PRIORITY_OPTIONS = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
  { label: "Urgent", value: "urgent" },
];

/**
 * FAQ categories
 */
export const FAQ_CATEGORIES = [
  "All",
  "Claims",
  "Coverage",
  "Billing",
  "Policy",
  "Technical",
  "General",
];

/**
 * Support contact information
 */
export const SUPPORT_CONTACT = {
  phone: "+1 (800) 123-4567",
  email: "support@memberportal.com",
  hours: "Monday - Friday: 8:00 AM - 8:00 PM EST",
};

/**
 * Average response time (in hours)
 */
export const AVERAGE_RESPONSE_TIME = {
  low: 48,
  medium: 24,
  high: 12,
  urgent: 4,
};
