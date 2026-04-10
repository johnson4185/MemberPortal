export type TicketStatus = "open" | "in_progress" | "waiting" | "resolved" | "closed";
export type TicketPriority = "low" | "medium" | "high" | "urgent";
export type TicketCategory = 
  | "billing"
  | "claims"
  | "policy"
  | "technical"
  | "general";

export interface SupportTicket {
  id: string;
  ticketNumber: string;
  subject: string;
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  description: string;
  attachments?: TicketAttachment[];
  messages: TicketMessage[];
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
}

export interface TicketAttachment {
  id: string;
  fileName: string;
  fileUrl: string;
  fileType: string;
  uploadedAt: string;
}

export interface TicketMessage {
  id: string;
  ticketId: string;
  message: string;
  isStaff: boolean;
  senderName: string;
  createdAt: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  views: number;
}

export interface TicketFormData {
  subject: string;
  category: TicketCategory;
  priority: TicketPriority;
  description: string;
  attachments?: File[];
}
