/**
 * Claims Feature - API Service
 * ---------------------------------------
 * API service for all claims-related operations.
 * 
 * Usage:
 * - Import claimsApi to interact with claims backend
 * - Automatically switches between mock and real API based on env
 * 
 * Backend Integration:
 * 1. Set NEXT_PUBLIC_USE_MOCK=false in .env.local
 * 2. Set NEXT_PUBLIC_API_URL to your backend URL
 * 3. Remove mock imports and functions
 * 4. Uncomment real API calls
 * 
 * @module features/claims/claims.api
 */

import { apiConfig } from "@/lib/api/apiConfig";
import { MOCK_CLAIMS, getMockClaimById, getMockCaseByClaimId, withdrawMockClaim, resubmitMockClaim } from "./claims.mock";
import type { 
  Claim, 
  ClaimsListParams, 
  ClaimsListResponse,
  SubmitClaimPayload,
  UpdateClaimPayload,
} from "./claims.types";

/**
 * Claims API Service
 * 
 * All claim-related API calls should go through this service.
 * Handles mock/real API switching automatically.
 */
export const claimsApi = {
  /**
   * Get list of claims
   * 
   * @param params - Query parameters for filtering/pagination
   * @returns Promise<ClaimsListResponse>
   * 
   * Backend Endpoint: GET /api/claims
   * Query Params: page, limit, status, type, startDate, endDate, search
   */
  getList: async (params: ClaimsListParams = {}): Promise<ClaimsListResponse> => {
    // MOCK MODE
    if (apiConfig.useMock) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      let filteredClaims = [...MOCK_CLAIMS];
      
      // Filter by status
      if (params.status && params.status !== "all") {
        filteredClaims = filteredClaims.filter((claim) => claim.status === params.status);
      }
      
      // Filter by type
      if (params.type && params.type !== "all") {
        filteredClaims = filteredClaims.filter((claim) => claim.type === params.type);
      }
      
      // Pagination
      const page = params.page || 1;
      const limit = params.limit || 10;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedClaims = filteredClaims.slice(startIndex, endIndex);
      
      return {
        claims: paginatedClaims,
        total: filteredClaims.length,
        page,
        limit,
        totalPages: Math.ceil(filteredClaims.length / limit),
      };
    }
    
    // REAL API MODE
    // Uncomment when backend is ready:
    /*
    const response = await apiClient.get<ClaimsListResponse>(
      API_ROUTES.CLAIMS.LIST,
      params
    );
    return response;
    */
    
    throw new Error("Real API not implemented yet");
  },

  /**
   * Get claim details by ID
   * 
   * @param id - Claim ID
   * @returns Promise<Claim>
   * 
   * Backend Endpoint: GET /api/claims/:id
   */
  getById: async (id: string): Promise<Claim> => {
    // MOCK MODE
    if (apiConfig.useMock) {
      const claim = getMockClaimById(id);
      if (!claim) {
        throw new Error("Claim not found");
      }
      return claim;
    }
    
    // REAL API MODE
    // Uncomment when backend is ready:
    /*
    const response = await apiClient.get<Claim>(
      API_ROUTES.CLAIMS.DETAIL(id)
    );
    return response;
    */
    
    throw new Error("Real API not implemented yet");
  },

  /**
   * Submit a new claim
   * 
   * @param data - Claim submission data
   * @returns Promise<Claim>
   * 
   * Backend Endpoint: POST /api/claims
   */
  submit: async (data: SubmitClaimPayload): Promise<Claim> => {
    // MOCK MODE
    if (apiConfig.useMock) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      const now = new Date().toISOString();
      const newClaim: Claim = {
        id: `CLM-${Date.now()}`,
        claimNumber: `CLM-${Date.now()}`,
        type: data.type,
        status: "submitted",
        submittedDate: now,
        serviceDate: data.serviceDate,
        providerName: data.providerName,
        providerNPI: data.providerNPI,
        diagnosis: data.diagnosis,
        diagnosisCode: data.diagnosisCode,
        amountBilled: data.amountBilled,
        amountCovered: 0,
        amountPaid: 0,
        patientResponsibility: 0,
        description: data.description,
        attachments: [],
        timeline: [
          {
            id: "tl1",
            status: "submitted",
            date: now,
            description: "Claim submitted successfully",
          },
        ],
        createdAt: now,
        updatedAt: now,
      };
      
      return newClaim;
    }
    
    // REAL API MODE
    // Uncomment when backend is ready:
    /*
    const response = await apiClient.post<Claim>(
      API_ROUTES.CLAIMS.SUBMIT,
      data
    );
    return response;
    */
    
    throw new Error("Real API not implemented yet");
  },

  /**
   * Update an existing claim
   * 
   * @param id - Claim ID
   * @param data - Update payload
   * @returns Promise<Claim>
   * 
   * Backend Endpoint: PUT /api/claims/:id
   */
  update: async (id: string, data: UpdateClaimPayload): Promise<Claim> => {
    // MOCK MODE
    if (apiConfig.useMock) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      const existingClaim = getMockClaimById(id);
      if (!existingClaim) {
        throw new Error("Claim not found");
      }
      
      const updatedClaim: Claim = {
        ...existingClaim,
        description: data.description ?? existingClaim.description,
        updatedAt: new Date().toISOString(),
      };

      return updatedClaim;
    }
    
    // REAL API MODE
    // Uncomment when backend is ready:
    /*
    const response = await apiClient.put<Claim>(
      API_ROUTES.CLAIMS.UPDATE(id),
      data
    );
    return response;
    */
    
    throw new Error("Real API not implemented yet");
  },

  /**
   * Delete a claim
   * 
   * @param id - Claim ID
   * @returns Promise<void>
   * 
   * Backend Endpoint: DELETE /api/claims/:id
   */
  delete: async (_id: string): Promise<void> => {
    // MOCK MODE
    if (apiConfig.useMock) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return;
    }
    
    // REAL API MODE
    // Uncomment when backend is ready:
    /*
    await apiClient.delete(API_ROUTES.CLAIMS.DELETE(id));
    */
    
    throw new Error("Real API not implemented yet");
  },

  /**
   * Get case details by claim ID
   * 
   * @param claimId - Claim ID
   * @returns Promise with case details or undefined
   * 
   * Backend Endpoint: GET /api/claims/:id/case
   */
  getCaseByClaimId: async (claimId: string) => {
    // MOCK MODE
    if (apiConfig.useMock) {
      return getMockCaseByClaimId(claimId);
    }
    
    // REAL API MODE
    // Uncomment when backend is ready:
    /*
    const response = await apiClient.get(
      API_ROUTES.CLAIMS.CASE(claimId)
    );
    return response;
    */
    
    throw new Error("Real API not implemented yet");
  },

  /**
   * Withdraw a claim
   *
   * @param id - Claim ID
   * @returns Promise<Claim>
   *
   * Backend Endpoint: POST /api/claims/:id/withdraw
   */
  withdraw: async (id: string): Promise<Claim> => {
    // MOCK MODE
    if (apiConfig.useMock) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return withdrawMockClaim(id);
    }

    // REAL API MODE
    // Uncomment when backend is ready:
    /*
    const response = await apiClient.post<Claim>(
      API_ROUTES.CLAIMS.WITHDRAW(id)
    );
    return response;
    */

    throw new Error("Real API not implemented yet");
  },

  /**
   * Resubmit a claim
   *
   * @param id - Claim ID
   * @returns Promise<Claim>
   *
   * Backend Endpoint: POST /api/claims/:id/resubmit
   */
  resubmit: async (id: string): Promise<Claim> => {
    // MOCK MODE
    if (apiConfig.useMock) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return resubmitMockClaim(id);
    }

    // REAL API MODE
    // Uncomment when backend is ready:
    /*
    const response = await apiClient.post<Claim>(
      API_ROUTES.CLAIMS.RESUBMIT(id)
    );
    return response;
    */

    throw new Error("Real API not implemented yet");
  },
};
