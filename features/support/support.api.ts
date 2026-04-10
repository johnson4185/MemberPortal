/**
 * Support Feature - API Service
 * ---------------------------------------
 * API service for all support-related operations.
 * 
 * Usage:
 * - Import supportApi to interact with support backend
 * - Automatically switches between mock and real API based on env
 * 
 * Backend Integration:
 * 1. Set NEXT_PUBLIC_USE_MOCK=false in .env.local
 * 2. Set NEXT_PUBLIC_API_URL to your backend URL
 * 3. Remove mock imports and functions
 * 4. Uncomment real API calls
 * 
 * @module features/support/support.api
 */

import { apiConfig } from "@/lib/api/apiConfig";
import { MOCK_FAQS, MOCK_SUPPORT_TICKETS } from "./support.mock";
import type {
  FAQ,
  SupportTicket,
  FAQSearchParams,
  CreateTicketPayload,
  UpdateTicketPayload,
  AddTicketMessagePayload,
} from "./support.types";

/**
 * Support API Service
 * 
 * All support-related API calls should go through this service.
 * Handles mock/real API switching automatically.
 */
export const supportApi = {
  /**
   * Get FAQs list
   * 
   * @param params - Search parameters
   * @returns Promise<FAQ[]>
   * 
   * Backend Endpoint: GET /api/support/faqs
   * Query Params: category, search
   */
  getFAQs: async (params: FAQSearchParams = {}): Promise<FAQ[]> => {
    // MOCK MODE
    if (apiConfig.useMock) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      let filteredFAQs = [...MOCK_FAQS];
      
      // Filter by category
      if (params.category && params.category !== "All") {
        filteredFAQs = filteredFAQs.filter((faq) => faq.category === params.category);
      }
      
      // Filter by search term
      if (params.search) {
        const searchLower = params.search.toLowerCase();
        filteredFAQs = filteredFAQs.filter(
          (faq) =>
            faq.question.toLowerCase().includes(searchLower) ||
            faq.answer.toLowerCase().includes(searchLower)
        );
      }
      
      return filteredFAQs;
    }
    
    // REAL API MODE
    // Uncomment when backend is ready:
    /*
    const response = await apiClient.get<FAQ[]>(
      API_ROUTES.SUPPORT.FAQS,
      params
    );
    return response;
    */
    
    throw new Error("Real API not implemented yet");
  },

  /**
   * Get support tickets list
   * 
   * @returns Promise<SupportTicket[]>
   * 
   * Backend Endpoint: GET /api/support/tickets
   */
  getTickets: async (): Promise<SupportTicket[]> => {
    // MOCK MODE
    if (apiConfig.useMock) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return MOCK_SUPPORT_TICKETS;
    }
    
    // REAL API MODE
    // Uncomment when backend is ready:
    /*
    const response = await apiClient.get<SupportTicket[]>(
      API_ROUTES.SUPPORT.TICKETS
    );
    return response;
    */
    
    throw new Error("Real API not implemented yet");
  },

  /**
   * Get support ticket details by ID
   * 
   * @param id - Ticket ID
   * @returns Promise<SupportTicket>
   * 
   * Backend Endpoint: GET /api/support/tickets/:id
   */
  getTicketById: async (id: string): Promise<SupportTicket> => {
    // MOCK MODE
    if (apiConfig.useMock) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      const ticket = MOCK_SUPPORT_TICKETS.find((t) => t.id === id);
      if (!ticket) {
        throw new Error("Ticket not found");
      }
      return ticket;
    }
    
    // REAL API MODE
    // Uncomment when backend is ready:
    /*
    const response = await apiClient.get<SupportTicket>(
      API_ROUTES.SUPPORT.TICKET_DETAIL(id)
    );
    return response;
    */
    
    throw new Error("Real API not implemented yet");
  },

  /**
   * Create a new support ticket
   * 
   * @param data - Ticket data
   * @returns Promise<SupportTicket>
   * 
   * Backend Endpoint: POST /api/support/tickets
   * Body: CreateTicketPayload
   */
  createTicket: async (data: CreateTicketPayload): Promise<SupportTicket> => {
    // MOCK MODE
    if (apiConfig.useMock) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      const now = new Date().toISOString();
      const newTicket: SupportTicket = {
        id: `TKT-${Date.now()}`,
        ticketNumber: `TKT-${Date.now()}`,
        subject: data.subject,
        category: data.category,
        priority: data.priority,
        status: "open",
        description: data.description,
        messages: [],
        createdAt: now,
        updatedAt: now,
      };
      
      return newTicket;
    }
    
    // REAL API MODE
    // Uncomment when backend is ready:
    /*
    const response = await apiClient.post<SupportTicket>(
      API_ROUTES.SUPPORT.CREATE_TICKET,
      data
    );
    return response;
    */
    
    throw new Error("Real API not implemented yet");
  },

  /**
   * Update a support ticket
   * 
   * @param id - Ticket ID
   * @param data - Update payload
   * @returns Promise<SupportTicket>
   * 
   * Backend Endpoint: PUT /api/support/tickets/:id
   * Body: UpdateTicketPayload
   */
  updateTicket: async (id: string, data: UpdateTicketPayload): Promise<SupportTicket> => {
    // MOCK MODE
    if (apiConfig.useMock) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      const existingTicket = MOCK_SUPPORT_TICKETS.find((t) => t.id === id);
      if (!existingTicket) {
        throw new Error("Ticket not found");
      }
      const updatedTicket: SupportTicket = {
        ...existingTicket,
        status: data.status ?? existingTicket.status,
        priority: data.priority ?? existingTicket.priority,
        updatedAt: new Date().toISOString(),
      };
      
      return updatedTicket;
    }
    
    // REAL API MODE
    // Uncomment when backend is ready:
    /*
    const response = await apiClient.put<SupportTicket>(
      API_ROUTES.SUPPORT.UPDATE_TICKET(id),
      data
    );
    return response;
    */
    
    throw new Error("Real API not implemented yet");
  },

  /**
   * Add a message to a support ticket
   * 
   * @param ticketId - Ticket ID
   * @param data - Message payload
   * @returns Promise<SupportTicket>
   * 
   * Backend Endpoint: POST /api/support/tickets/:id/messages
   * Body: AddTicketMessagePayload
   */
  addTicketMessage: async (
    ticketId: string,
    _data: AddTicketMessagePayload
  ): Promise<SupportTicket> => {
    // MOCK MODE
    if (apiConfig.useMock) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      const existingTicket = MOCK_SUPPORT_TICKETS.find((t) => t.id === ticketId);
      if (!existingTicket) {
        throw new Error("Ticket not found");
      }
      
      return {
        ...existingTicket,
        updatedAt: new Date().toISOString(),
      };
    }
    
    // REAL API MODE
    // Uncomment when backend is ready:
    /*
    const response = await apiClient.post<SupportTicket>(
      API_ROUTES.SUPPORT.ADD_MESSAGE(ticketId),
      data
    );
    return response;
    */
    
    throw new Error("Real API not implemented yet");
  },
};
