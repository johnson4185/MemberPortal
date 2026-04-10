/**
 * ID Card Feature - Type Definitions
 * -----------------------------------
 * TypeScript types and interfaces for ID card and documents feature.
 * 
 * @module features/id-card/id-card.types
 */

/**
 * Member contact information
 */
export interface MemberContact {
  member: string;
  provider: string;
}

/**
 * Member copay information
 */
export interface MemberCopays {
  primaryCare: string;
  specialist: string;
  emergency: string;
  urgentCare: string;
}

/**
 * Member dependent information
 */
export interface Dependent {
  id: string;
  name: string;
  relationship: string;
}

/**
 * Member information
 */
export interface Member {
  id: string;
  name: string;
  dob: string;
  policyNumber: string;
  groupNumber: string;
  planName: string;
  planType: string;
  effectiveDate: string;
  issueDate: string;
  phone: MemberContact;
  address: string;
  copays: MemberCopays;
  dependents: Dependent[];
}

/**
 * Document category type
 */
export type DocumentCategory = "ID Card" | "Policy" | "Provider";

/**
 * Document information
 */
export interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedAt: string;
  category: DocumentCategory;
}

/**
 * Member information response
 */
export interface MemberResponse {
  member: Member;
}

/**
 * Documents list response
 */
export interface DocumentsResponse {
  documents: Document[];
  total: number;
}

/**
 * Medical document type
 */
export type MedicalDocumentType = "Lab Report" | "Prescription" | "Medical Report" | "Hospital" | "Other";

/**
 * Medical history document
 */
export interface MedicalDocument {
  id: string;
  name: string;
  date: string;
  relatedTo: string;
  type: MedicalDocumentType;
}

/**
 * Authorization status type
 */
export type AuthorizationStatus = "Approved" | "Pending" | "Expired" | "Rejected";

/**
 * Authorization letter
 */
export interface AuthorizationLetter {
  id: string;
  authNumber: string;
  serviceType: string;
  provider: string;
  effectiveDate: string;
  expiryDate: string;
  status: AuthorizationStatus;
}

/**
 * Custom letter type
 */
export type CustomLetterType = "visa" | "coverage" | "treatment";

/**
 * Custom letter request
 */
export interface CustomLetterRequest {
  type: CustomLetterType;
  purpose?: string;
  additionalInfo?: string;
}

/**
 * Medical documents response
 */
export interface MedicalDocumentsResponse {
  documents: MedicalDocument[];
  total: number;
}

/**
 * Authorization letters response
 */
export interface AuthorizationLettersResponse {
  authorizations: AuthorizationLetter[];
  total: number;
}
