/**
 * Providers Feature - API Service
 * ---------------------------------------
 * API service for all provider-related operations.
 * 
 * Usage:
 * - Import providersApi to interact with providers backend
 * - Automatically switches between mock and real API based on env
 * 
 * Backend Integration:
 * 1. Set NEXT_PUBLIC_USE_MOCK=false in .env.local
 * 2. Set NEXT_PUBLIC_API_URL to your backend URL
 * 3. Remove mock imports and functions
 * 4. Uncomment real API calls
 * 
 * @module features/providers/providers.api
 */

import { apiConfig } from "@/lib/api/apiConfig";
import { MOCK_PROVIDERS } from "./providers.mock";
import type {
  Provider,
  ProviderSearchParams,
  ProviderSearchResponse,
} from "./providers.types";

/**
 * Providers API Service
 * 
 * All provider-related API calls should go through this service.
 * Handles mock/real API switching automatically.
 */
export const providersApi = {
  /**
   * Search providers
   * 
   * @param params - Search and filter parameters
   * @returns Promise<ProviderSearchResponse>
   * 
   * Backend Endpoint: GET /api/providers
   * Query Params: page, limit, search, type, specialty, inNetwork, acceptingNewPatients, location, distance
   */
  search: async (params: ProviderSearchParams = {}): Promise<ProviderSearchResponse> => {
    // MOCK MODE
    if (apiConfig.useMock) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      let filteredProviders = [...MOCK_PROVIDERS];
      
      // Filter by type
      if (params.type && params.type !== "all") {
        filteredProviders = filteredProviders.filter((provider) => provider.type === params.type);
      }
      
      // Filter by specialty
      if (params.specialty) {
        filteredProviders = filteredProviders.filter(
          (provider) =>
            provider.specialty?.toLowerCase().includes(params.specialty!.toLowerCase())
        );
      }
      
      // Filter by network status
      if (params.inNetwork !== undefined) {
        filteredProviders = filteredProviders.filter(
          (provider) => provider.inNetwork === params.inNetwork
        );
      }
      
      // Filter by accepting new patients
      if (params.acceptingNewPatients !== undefined) {
        filteredProviders = filteredProviders.filter(
          (provider) => provider.acceptingNewPatients === params.acceptingNewPatients
        );
      }
      
      // Filter by search term
      if (params.search) {
        const searchLower = params.search.toLowerCase();
        filteredProviders = filteredProviders.filter(
          (provider) =>
            provider.name.toLowerCase().includes(searchLower) ||
            provider.specialty?.toLowerCase().includes(searchLower)
        );
      }
      
      // Filter by distance
      if (params.distance && params.distance > 0) {
        filteredProviders = filteredProviders.filter(
          (provider) => (provider.distance || 0) <= params.distance!
        );
      }
      
      // Pagination
      const page = params.page || 1;
      const limit = params.limit || 12;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedProviders = filteredProviders.slice(startIndex, endIndex);
      
      return {
        providers: paginatedProviders,
        total: filteredProviders.length,
        page,
        limit,
        totalPages: Math.ceil(filteredProviders.length / limit),
      };
    }
    
    // REAL API MODE
    // Uncomment when backend is ready:
    /*
    const response = await apiClient.get<ProviderSearchResponse>(
      API_ROUTES.PROVIDERS.SEARCH,
      params
    );
    return response;
    */
    
    throw new Error("Real API not implemented yet");
  },

  /**
   * Get provider details by ID
   * 
   * @param id - Provider ID
   * @returns Promise<Provider>
   * 
   * Backend Endpoint: GET /api/providers/:id
   */
  getById: async (id: string): Promise<Provider> => {
    // MOCK MODE
    if (apiConfig.useMock) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      const provider = MOCK_PROVIDERS.find((p) => p.id === id);
      if (!provider) {
        throw new Error("Provider not found");
      }
      return provider;
    }
    
    // REAL API MODE
    // Uncomment when backend is ready:
    /*
    const response = await apiClient.get<Provider>(
      API_ROUTES.PROVIDERS.DETAIL(id)
    );
    return response;
    */
    
    throw new Error("Real API not implemented yet");
  },
};
