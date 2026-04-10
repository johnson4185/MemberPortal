/**
 * Policy Feature - API Service
 * ---------------------------------------
 * API service for all policy-related operations.
 * 
 * Usage:
 * - Import policyApi to interact with policy backend
 * - Automatically switches between mock and real API based on env
 * 
 * Backend Integration:
 * 1. Set NEXT_PUBLIC_USE_MOCK=false in .env.local
 * 2. Set NEXT_PUBLIC_API_URL to your backend URL
 * 3. Remove mock imports and functions
 * 4. Uncomment real API calls
 * 
 * @module features/policy/policy.api
 */

import { apiConfig } from "@/lib/api/apiConfig";
import { MOCK_POLICY } from "./policy.mock";
import type {
  Policy,
  UpdatePolicyPayload,
  AddDependentPayload,
  UpdateDependentPayload,
} from "./policy.types";

/**
 * Policy API Service
 * 
 * All policy-related API calls should go through this service.
 * Handles mock/real API switching automatically.
 */
export const policyApi = {
  /**
   * Get current policy details
   * 
   * @returns Promise<Policy>
   * 
   * Backend Endpoint: GET /api/policy
   */
  get: async (): Promise<Policy> => {
    // MOCK MODE
    if (apiConfig.useMock) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return MOCK_POLICY;
    }
    
    // REAL API MODE
    // Uncomment when backend is ready:
    /*
    const response = await apiClient.get<Policy>(
      API_ROUTES.POLICY.GET
    );
    return response;
    */
    
    throw new Error("Real API not implemented yet");
  },

  /**
   * Update policy details
   * 
   * @param data - Update payload
   * @returns Promise<Policy>
   * 
   * Backend Endpoint: PUT /api/policy
   * Body: UpdatePolicyPayload
   */
  update: async (data: UpdatePolicyPayload): Promise<Policy> => {
    // MOCK MODE
    if (apiConfig.useMock) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      return {
        ...MOCK_POLICY,
        ...data,
        updatedAt: new Date().toISOString(),
      };
    }
    
    // REAL API MODE
    // Uncomment when backend is ready:
    /*
    const response = await apiClient.put<Policy>(
      API_ROUTES.POLICY.UPDATE,
      data
    );
    return response;
    */
    
    throw new Error("Real API not implemented yet");
  },

  /**
   * Add a dependent to the policy
   * 
   * @param data - Dependent information
   * @returns Promise<Policy>
   * 
   * Backend Endpoint: POST /api/policy/dependents
   * Body: AddDependentPayload
   */
  addDependent: async (data: AddDependentPayload): Promise<Policy> => {
    // MOCK MODE
    if (apiConfig.useMock) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      const newDependent = {
        id: `dep${Date.now()}`,
        ...data,
        memberId: `MEM-DEP-${Date.now()}`,
        status: "active" as const,
      };
      
      return {
        ...MOCK_POLICY,
        dependents: [...MOCK_POLICY.dependents, newDependent],
        updatedAt: new Date().toISOString(),
      };
    }
    
    // REAL API MODE
    // Uncomment when backend is ready:
    /*
    const response = await apiClient.post<Policy>(
      API_ROUTES.POLICY.ADD_DEPENDENT,
      data
    );
    return response;
    */
    
    throw new Error("Real API not implemented yet");
  },

  /**
   * Update a dependent
   * 
   * @param dependentId - Dependent ID
   * @param data - Update payload
   * @returns Promise<Policy>
   * 
   * Backend Endpoint: PUT /api/policy/dependents/:id
   * Body: UpdateDependentPayload
   */
  updateDependent: async (
    dependentId: string,
    data: UpdateDependentPayload
  ): Promise<Policy> => {
    // MOCK MODE
    if (apiConfig.useMock) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      const updatedDependents = MOCK_POLICY.dependents.map((dep) =>
        dep.id === dependentId ? { ...dep, ...data } : dep
      );
      
      return {
        ...MOCK_POLICY,
        dependents: updatedDependents,
        updatedAt: new Date().toISOString(),
      };
    }
    
    // REAL API MODE
    // Uncomment when backend is ready:
    /*
    const response = await apiClient.put<Policy>(
      API_ROUTES.POLICY.UPDATE_DEPENDENT(dependentId),
      data
    );
    return response;
    */
    
    throw new Error("Real API not implemented yet");
  },

  /**
   * Remove a dependent from the policy
   * 
   * @param dependentId - Dependent ID
   * @returns Promise<Policy>
   * 
   * Backend Endpoint: DELETE /api/policy/dependents/:id
   */
  removeDependent: async (dependentId: string): Promise<Policy> => {
    // MOCK MODE
    if (apiConfig.useMock) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      const filteredDependents = MOCK_POLICY.dependents.filter(
        (dep) => dep.id !== dependentId
      );
      
      return {
        ...MOCK_POLICY,
        dependents: filteredDependents,
        updatedAt: new Date().toISOString(),
      };
    }
    
    // REAL API MODE
    // Uncomment when backend is ready:
    /*
    const response = await apiClient.delete<Policy>(
      API_ROUTES.POLICY.REMOVE_DEPENDENT(dependentId)
    );
    return response;
    */
    
    throw new Error("Real API not implemented yet");
  },
};
