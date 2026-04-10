/**
 * Wellness Feature - API Service
 * ---------------------------------------
 * API service for all wellness-related operations.
 * 
 * Usage:
 * - Import wellnessApi to interact with wellness backend
 * - Automatically switches between mock and real API based on env
 * 
 * Backend Integration:
 * 1. Set NEXT_PUBLIC_USE_MOCK=false in .env.local
 * 2. Set NEXT_PUBLIC_API_URL to your backend URL
 * 3. Remove mock imports and functions
 * 4. Uncomment real API calls
 * 
 * @module features/wellness/wellness.api
 */

import { apiConfig } from "@/lib/api/apiConfig";
import {
  MOCK_WELLNESS_METRICS,
  MOCK_WELLNESS_ARTICLES,
  MOCK_TELEMEDICINE_PROVIDERS,
} from "./wellness.mock";
import type {
  WellnessMetric,
  WellnessArticle,
  TelemedicineProvider,
  ArticlesSearchParams,
  ArticlesSearchResponse,
  UpdateMetricPayload,
  TelemedicineAppointmentRequest,
} from "./wellness.types";

/**
 * Wellness API Service
 * 
 * All wellness-related API calls should go through this service.
 * Handles mock/real API switching automatically.
 */
export const wellnessApi = {
  /**
   * Get wellness metrics
   * 
   * @returns Promise<WellnessMetric[]>
   * 
   * Backend Endpoint: GET /api/wellness/metrics
   */
  getMetrics: async (): Promise<WellnessMetric[]> => {
    // MOCK MODE
    if (apiConfig.useMock) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return MOCK_WELLNESS_METRICS;
    }
    
    // REAL API MODE
    // Uncomment when backend is ready:
    /*
    const response = await apiClient.get<WellnessMetric[]>(
      API_ROUTES.WELLNESS.METRICS
    );
    return response;
    */
    
    throw new Error("Real API not implemented yet");
  },

  /**
   * Update a wellness metric
   * 
   * @param metricId - Metric ID
   * @param data - Update payload
   * @returns Promise<WellnessMetric>
   * 
   * Backend Endpoint: PUT /api/wellness/metrics/:id
   * Body: UpdateMetricPayload
   */
  updateMetric: async (metricId: string, data: UpdateMetricPayload): Promise<WellnessMetric> => {
    // MOCK MODE
    if (apiConfig.useMock) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      const metric = MOCK_WELLNESS_METRICS.find((m) => m.id === metricId);
      if (!metric) {
        throw new Error("Metric not found");
      }
      
      return {
        ...metric,
        value: data.value,
      };
    }
    
    // REAL API MODE
    // Uncomment when backend is ready:
    /*
    const response = await apiClient.put<WellnessMetric>(
      API_ROUTES.WELLNESS.UPDATE_METRIC(metricId),
      data
    );
    return response;
    */
    
    throw new Error("Real API not implemented yet");
  },

  /**
   * Get wellness articles
   * 
   * @param params - Search and filter parameters
   * @returns Promise<ArticlesSearchResponse>
   * 
   * Backend Endpoint: GET /api/wellness/articles
   * Query Params: category, search, page, limit
   */
  getArticles: async (params: ArticlesSearchParams = {}): Promise<ArticlesSearchResponse> => {
    // MOCK MODE
    if (apiConfig.useMock) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      let filteredArticles = [...MOCK_WELLNESS_ARTICLES];
      
      // Filter by category
      if (params.category && params.category !== "All") {
        filteredArticles = filteredArticles.filter(
          (article) => article.category === params.category
        );
      }
      
      // Filter by search term
      if (params.search) {
        const searchLower = params.search.toLowerCase();
        filteredArticles = filteredArticles.filter(
          (article) =>
            article.title.toLowerCase().includes(searchLower) ||
            article.excerpt.toLowerCase().includes(searchLower)
        );
      }
      
      // Pagination
      const page = params.page || 1;
      const limit = params.limit || 9;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedArticles = filteredArticles.slice(startIndex, endIndex);
      
      return {
        articles: paginatedArticles,
        total: filteredArticles.length,
        page,
        limit,
        totalPages: Math.ceil(filteredArticles.length / limit),
      };
    }
    
    // REAL API MODE
    // Uncomment when backend is ready:
    /*
    const response = await apiClient.get<ArticlesSearchResponse>(
      API_ROUTES.WELLNESS.ARTICLES,
      params
    );
    return response;
    */
    
    throw new Error("Real API not implemented yet");
  },

  /**
   * Get article details by slug
   * 
   * @param slug - Article slug
   * @returns Promise<WellnessArticle>
   * 
   * Backend Endpoint: GET /api/wellness/articles/:slug
   */
  getArticleBySlug: async (slug: string): Promise<WellnessArticle> => {
    // MOCK MODE
    if (apiConfig.useMock) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      const article = MOCK_WELLNESS_ARTICLES.find((a) => a.slug === slug);
      if (!article) {
        throw new Error("Article not found");
      }
      return article;
    }
    
    // REAL API MODE
    // Uncomment when backend is ready:
    /*
    const response = await apiClient.get<WellnessArticle>(
      API_ROUTES.WELLNESS.ARTICLE_DETAIL(slug)
    );
    return response;
    */
    
    throw new Error("Real API not implemented yet");
  },

  /**
   * Get telemedicine providers
   * 
   * @returns Promise<TelemedicineProvider[]>
   * 
   * Backend Endpoint: GET /api/wellness/telemedicine
   */
  getTelemedicineProviders: async (): Promise<TelemedicineProvider[]> => {
    // MOCK MODE
    if (apiConfig.useMock) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return MOCK_TELEMEDICINE_PROVIDERS;
    }
    
    // REAL API MODE
    // Uncomment when backend is ready:
    /*
    const response = await apiClient.get<TelemedicineProvider[]>(
      API_ROUTES.WELLNESS.TELEMEDICINE
    );
    return response;
    */
    
    throw new Error("Real API not implemented yet");
  },

  /**
   * Request telemedicine appointment
   * 
   * @param data - Appointment request data
   * @returns Promise<void>
   * 
   * Backend Endpoint: POST /api/wellness/telemedicine/appointments
   * Body: TelemedicineAppointmentRequest
   */
  requestAppointment: async (_data: TelemedicineAppointmentRequest): Promise<void> => {
    // MOCK MODE
    if (apiConfig.useMock) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return;
    }
    
    // REAL API MODE
    // Uncomment when backend is ready:
    /*
    await apiClient.post(
      API_ROUTES.WELLNESS.REQUEST_APPOINTMENT,
      data
    );
    */
    
    throw new Error("Real API not implemented yet");
  },
};
