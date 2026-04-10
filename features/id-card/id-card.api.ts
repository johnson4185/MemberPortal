/**
 * ID Card Feature - API Service
 * ----------------------------
 * API service layer for ID card operations.
 * Handles both mock and real API calls based on configuration.
 * 
 * @module features/id-card/id-card.api
 */

import type { Member, Document, MemberResponse, DocumentsResponse, MedicalDocument, MedicalDocumentsResponse, AuthorizationLetter, AuthorizationLettersResponse, CustomLetterRequest } from "./id-card.types";
import { MOCK_MEMBER, MOCK_DOCUMENTS, MOCK_MEDICAL_DOCUMENTS, MOCK_AUTHORIZATION_LETTERS } from "./id-card.mock";
import { apiConfig } from "@/lib/api/apiConfig";

/**
 * ID Card API Service
 */
const idCardApi = {
  /**
   * Get current member information
   */
  async getMember(): Promise<Member> {
    if (apiConfig.useMock) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      return MOCK_MEMBER;
    }

    try {
      const response = await fetch("/api/id-card/member");
      if (!response.ok) throw new Error("Failed to fetch member data");
      const data: MemberResponse = await response.json();
      return data.member;
    } catch (error) {
      console.error("Error fetching member:", error);
      throw error;
    }
  },

  /**
   * Get member's documents
   */
  async getDocuments(): Promise<Document[]> {
    if (apiConfig.useMock) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      return MOCK_DOCUMENTS;
    }

    try {
      const response = await fetch("/api/id-card/documents");
      if (!response.ok) throw new Error("Failed to fetch documents");
      const data: DocumentsResponse = await response.json();
      return data.documents;
    } catch (error) {
      console.error("Error fetching documents:", error);
      throw error;
    }
  },

  /**
   * Download a member ID card
   */
  async downloadMemberIdCard(memberId: string): Promise<Blob> {
    if (apiConfig.useMock) {
      // Simulate API delay and return a fake PDF
      await new Promise(resolve => setTimeout(resolve, 500));
      return new Blob(["Mock PDF content"], { type: "application/pdf" });
    }

    try {
      const response = await fetch(`/api/id-card/members/${memberId}/download`);
      if (!response.ok) throw new Error("Failed to download ID card");
      return await response.blob();
    } catch (error) {
      console.error("Error downloading ID card:", error);
      throw error;
    }
  },

  /**
   * Download a document
   */
  async downloadDocument(documentId: string): Promise<Blob> {
    if (apiConfig.useMock) {
      // Simulate API delay and return a fake PDF
      await new Promise(resolve => setTimeout(resolve, 500));
      return new Blob(["Mock PDF content"], { type: "application/pdf" });
    }

    try {
      const response = await fetch(`/api/id-card/documents/${documentId}/download`);
      if (!response.ok) throw new Error("Failed to download document");
      return await response.blob();
    } catch (error) {
      console.error("Error downloading document:", error);
      throw error;
    }
  },

  /**
   * Share member ID card (simulate share functionality)
   */
  async shareMemberId(memberId: string): Promise<{ shareUrl: string }> {
    if (apiConfig.useMock) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      return { shareUrl: `https://example.com/share/${memberId}` };
    }

    try {
      const response = await fetch(`/api/id-card/members/${memberId}/share`, {
        method: "POST",
      });
      if (!response.ok) throw new Error("Failed to share ID card");
      return await response.json();
    } catch (error) {
      console.error("Error sharing ID card:", error);
      throw error;
    }
  },

  /**
   * Print member ID card
   */
  async printMemberId(memberId: string): Promise<void> {
    if (apiConfig.useMock) {
      // Simulate print action
      window.print();
      return;
    }

    try {
      const response = await fetch(`/api/id-card/members/${memberId}/print`, {
        method: "POST",
      });
      if (!response.ok) throw new Error("Failed to print ID card");
      window.print();
    } catch (error) {
      console.error("Error printing ID card:", error);
      throw error;
    }
  },

  /**
   * Add member ID to Apple Wallet
   */
  async addToAppleWallet(memberId: string): Promise<void> {
    if (apiConfig.useMock) {
      // Simulate API delay and show alert
      await new Promise(resolve => setTimeout(resolve, 500));
      alert("Apple Wallet: ID card added successfully!\n(Mock - not actually added in development)");
      return;
    }

    try {
      const response = await fetch(`/api/id-card/members/${memberId}/apple-wallet`, {
        method: "POST",
      });
      if (!response.ok) throw new Error("Failed to add to Apple Wallet");
      alert("ID card added to Apple Wallet!");
    } catch (error) {
      console.error("Error adding to Apple Wallet:", error);
      throw error;
    }
  },

  /**
   * Add member ID to Google Wallet
   */
  async addToGoogleWallet(memberId: string): Promise<void> {
    if (apiConfig.useMock) {
      // Simulate API delay and show alert
      await new Promise(resolve => setTimeout(resolve, 500));
      alert("Google Wallet: ID card added successfully!\n(Mock - not actually added in development)");
      return;
    }

    try {
      const response = await fetch(`/api/id-card/members/${memberId}/google-wallet`, {
        method: "POST",
      });
      if (!response.ok) throw new Error("Failed to add to Google Wallet");
      alert("ID card added to Google Wallet!");
    } catch (error) {
      console.error("Error adding to Google Wallet:", error);
      throw error;
    }
  },
  
  /**
   * Get medical history documents
   */
  async getMedicalDocuments(): Promise<MedicalDocument[]> {
    if (apiConfig.useMock) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      return MOCK_MEDICAL_DOCUMENTS;
    }

    try {
      const response = await fetch("/api/id-card/medical-documents");
      if (!response.ok) throw new Error("Failed to fetch medical documents");
      const data: MedicalDocumentsResponse = await response.json();
      return data.documents;
    } catch (error) {
      console.error("Error fetching medical documents:", error);
      throw error;
    }
  },

  /**
   * Download a medical document
   */
  async downloadMedicalDocument(documentId: string): Promise<Blob> {
    if (apiConfig.useMock) {
      // Simulate API delay and return a fake PDF
      await new Promise(resolve => setTimeout(resolve, 500));
      return new Blob(["Mock Medical Document PDF content"], { type: "application/pdf" });
    }

    try {
      const response = await fetch(`/api/id-card/medical-documents/${documentId}/download`);
      if (!response.ok) throw new Error("Failed to download medical document");
      return await response.blob();
    } catch (error) {
      console.error("Error downloading medical document:", error);
      throw error;
    }
  },

  /**
   * Get authorization letters
   */
  async getAuthorizationLetters(): Promise<AuthorizationLetter[]> {
    if (apiConfig.useMock) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      return MOCK_AUTHORIZATION_LETTERS;
    }

    try {
      const response = await fetch("/api/id-card/authorization-letters");
      if (!response.ok) throw new Error("Failed to fetch authorization letters");
      const data: AuthorizationLettersResponse = await response.json();
      return data.authorizations;
    } catch (error) {
      console.error("Error fetching authorization letters:", error);
      throw error;
    }
  },

  /**
   * Download an authorization letter
   */
  async downloadAuthorizationLetter(authorizationId: string): Promise<Blob> {
    if (apiConfig.useMock) {
      // Simulate API delay and return a fake PDF
      await new Promise(resolve => setTimeout(resolve, 500));
      return new Blob(["Mock Authorization Letter PDF content"], { type: "application/pdf" });
    }

    try {
      const response = await fetch(`/api/id-card/authorization-letters/${authorizationId}/download`);
      if (!response.ok) throw new Error("Failed to download authorization letter");
      return await response.blob();
    } catch (error) {
      console.error("Error downloading authorization letter:", error);
      throw error;
    }
  },

  /**
   * Request a custom letter
   */
  async requestCustomLetter(request: CustomLetterRequest): Promise<{ success: boolean; message: string }> {
    if (apiConfig.useMock) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return {
        success: true,
        message: `Your ${request.type} letter request has been submitted successfully. You will receive it within 2-3 business days.`,
      };
    }

    try {
      const response = await fetch("/api/id-card/custom-letters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
      });
      if (!response.ok) throw new Error("Failed to request custom letter");
      return await response.json();
    } catch (error) {
      console.error("Error requesting custom letter:", error);
      throw error;
    }
  },
};

export default idCardApi;
