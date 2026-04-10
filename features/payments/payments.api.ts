/**
 * Payments Feature - API Service
 * ---------------------------------------
 * API service for all payments-related operations.
 * 
 * Usage:
 * - Import paymentsApi to interact with payments backend
 * - Automatically switches between mock and real API based on env
 * 
 * Backend Integration:
 * 1. Set NEXT_PUBLIC_USE_MOCK=false in .env.local
 * 2. Set NEXT_PUBLIC_API_URL to your backend URL
 * 3. Remove mock imports and functions
 * 4. Uncomment real API calls
 * 
 * @module features/payments/payments.api
 */

import { apiConfig } from "@/lib/api/apiConfig";
import { MOCK_BILLING_OVERVIEW, MOCK_PAYMENT_HISTORY } from "./payments.mock";
import type {
  BillingOverview,
  Payment,
  PaymentHistoryParams,
  PaymentHistoryResponse,
  MakePaymentPayload,
} from "./payments.types";

/**
 * Payments API Service
 * 
 * All payment-related API calls should go through this service.
 * Handles mock/real API switching automatically.
 */
export const paymentsApi = {
  /**
   * Get billing overview
   * 
   * @returns Promise<BillingOverview>
   * 
   * Backend Endpoint: GET /api/payments/overview
   */
  getOverview: async (): Promise<BillingOverview> => {
    // MOCK MODE
    if (apiConfig.useMock) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return MOCK_BILLING_OVERVIEW;
    }
    
    // REAL API MODE
    // Uncomment when backend is ready:
    /*
    const response = await apiClient.get<BillingOverview>(
      API_ROUTES.PAYMENTS.OVERVIEW
    );
    return response;
    */
    
    throw new Error("Real API not implemented yet");
  },

  /**
   * Get payment history
   * 
   * @param params - Query parameters for filtering/pagination
   * @returns Promise<PaymentHistoryResponse>
   * 
   * Backend Endpoint: GET /api/payments/history
   * Query Params: page, limit, startDate, endDate, status
   */
  getHistory: async (params: PaymentHistoryParams = {}): Promise<PaymentHistoryResponse> => {
    // MOCK MODE
    if (apiConfig.useMock) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      let filteredPayments = [...MOCK_PAYMENT_HISTORY];
      
      // Filter by status
      if (params.status && params.status !== "all") {
        filteredPayments = filteredPayments.filter((payment) => payment.status === params.status);
      }
      
      // Pagination
      const page = params.page || 1;
      const limit = params.limit || 10;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedPayments = filteredPayments.slice(startIndex, endIndex);
      
      return {
        payments: paginatedPayments,
        total: filteredPayments.length,
        page,
        limit,
        totalPages: Math.ceil(filteredPayments.length / limit),
      };
    }
    
    // REAL API MODE
    // Uncomment when backend is ready:
    /*
    const response = await apiClient.get<PaymentHistoryResponse>(
      API_ROUTES.PAYMENTS.HISTORY,
      params
    );
    return response;
    */
    
    throw new Error("Real API not implemented yet");
  },

  /**
   * Get payment details by ID
   * 
   * @param id - Payment ID
   * @returns Promise<Payment>
   * 
   * Backend Endpoint: GET /api/payments/:id
   */
  getById: async (id: string): Promise<Payment> => {
    // MOCK MODE
    if (apiConfig.useMock) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      const payment = MOCK_PAYMENT_HISTORY.find((p) => p.id === id);
      if (!payment) {
        throw new Error("Payment not found");
      }
      return payment;
    }
    
    // REAL API MODE
    // Uncomment when backend is ready:
    /*
    const response = await apiClient.get<Payment>(
      API_ROUTES.PAYMENTS.DETAIL(id)
    );
    return response;
    */
    
    throw new Error("Real API not implemented yet");
  },

  /**
   * Make a payment
   * 
   * @param data - Payment data
   * @returns Promise<Payment>
   * 
   * Backend Endpoint: POST /api/payments
   * Body: MakePaymentPayload
   */
  makePayment: async (data: MakePaymentPayload): Promise<Payment> => {
    // MOCK MODE
    if (apiConfig.useMock) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      const now = new Date().toISOString();
      const newPayment: Payment = {
        id: `PAY-${Date.now()}`,
        invoiceNumber: `INV-${Date.now()}`,
        amount: data.amount,
        method: "credit_card",
        status: "completed",
        description: data.description || "Payment",
        dueDate: now,
        paidDate: now,
        createdAt: now,
      };
      
      return newPayment;
    }
    
    // REAL API MODE
    // Uncomment when backend is ready:
    /*
    const response = await apiClient.post<Payment>(
      API_ROUTES.PAYMENTS.MAKE_PAYMENT,
      data
    );
    return response;
    */
    
    throw new Error("Real API not implemented yet");
  },

  /**
   * Download payment receipt
   * 
   * @param id - Payment ID
   * @returns Promise<Blob>
   * 
   * Backend Endpoint: GET /api/payments/:id/receipt
   */
  downloadReceipt: async (_id: string): Promise<Blob> => {
    // MOCK MODE
    if (apiConfig.useMock) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      // Return a mock PDF blob
      return new Blob(["Mock receipt"], { type: "application/pdf" });
    }
    
    // REAL API MODE
    // Uncomment when backend is ready:
    /*
    const response = await apiClient.get<Blob>(
      API_ROUTES.PAYMENTS.DOWNLOAD_RECEIPT(id),
      {},
      { responseType: 'blob' }
    );
    return response;
    */
    
    throw new Error("Real API not implemented yet");
  },
};
