/**
 * ID Card Feature - Mock Data
 * ----------------------------
 * Mock data for ID card feature during development.
 * 
 * @module features/id-card/id-card.mock
 */

import type { Member, Document, MedicalDocument, AuthorizationLetter } from "./id-card.types";

/**
 * Mock member data
 */
export const MOCK_MEMBER: Member = {
  id: "MEM-2026-001",
  name: "Johnson",
  dob: "1990-03-15",
  policyNumber: "POL-123456",
  groupNumber: "GRP-789012",
  planName: "Premium Health Plus",
  planType: "PPO",
  effectiveDate: "2026-01-01",
  issueDate: "2025-12-15",
  phone: {
    member: "1-800-123-4567",
    provider: "1-800-234-5678",
  },
  address: "123 Main Street, Springfield, MA 01001",
  copays: {
    primaryCare: "$30",
    specialist: "$50",
    emergency: "$150",
    urgentCare: "$75",
  },
  dependents: [
    { id: "MEM-2026-002", name: "Anaha", relationship: "Spouse" },
    { id: "MEM-2026-003", name: "Zia Anaha", relationship: "Dependent" },
  ],
};

/**
 * Mock documents list
 */
export const MOCK_DOCUMENTS: Document[] = [
  {
    id: "1",
    name: "Member ID Card (Front & Back)",
    type: "pdf",
    size: "245 KB",
    uploadedAt: "2026-01-01",
    category: "ID Card",
  },
  {
    id: "2",
    name: "Policy Document 2026",
    type: "pdf",
    size: "1.2 MB",
    uploadedAt: "2026-01-01",
    category: "Policy",
  },
  {
    id: "3",
    name: "Benefits Summary",
    type: "pdf",
    size: "856 KB",
    uploadedAt: "2026-01-01",
    category: "Policy",
  },
  {
    id: "4",
    name: "Provider Network Directory",
    type: "pdf",
    size: "3.4 MB",
    uploadedAt: "2026-01-01",
    category: "Provider",
  },
  {
    id: "5",
    name: "Coverage & Exclusions",
    type: "pdf",
    size: "652 KB",
    uploadedAt: "2026-01-01",
    category: "Policy",
  },
];

/**
 * Mock medical history documents
 */
export const MOCK_MEDICAL_DOCUMENTS: MedicalDocument[] = [
  {
    id: "MED-001",
    name: "Lab Report - Blood Test",
    date: "2024-11-20",
    relatedTo: "CLM-2024-790",
    type: "Lab Report",
  },
  {
    id: "MED-002",
    name: "Prescription - Nov 2024",
    date: "2024-11-15",
    relatedTo: "CLM-2024-789",
    type: "Prescription",
  },
  {
    id: "MED-003",
    name: "Medical Report - Annual Checkup",
    date: "2024-10-10",
    relatedTo: "General",
    type: "Medical Report",
  },
  {
    id: "MED-004",
    name: "Discharge Summary",
    date: "2024-09-20",
    relatedTo: "CLM-2024-750",
    type: "Hospital",
  },
];

/**
 * Mock authorization letters
 */
export const MOCK_AUTHORIZATION_LETTERS: AuthorizationLetter[] = [
  {
    id: "AUTH-001",
    authNumber: "AUTH-2024-456",
    serviceType: "Physical Therapy",
    provider: "Wellness Therapy Center",
    effectiveDate: "2024-12-01",
    expiryDate: "2025-02-28",
    status: "Approved",
  },
  {
    id: "AUTH-002",
    authNumber: "AUTH-2024-455",
    serviceType: "MRI Scan",
    provider: "Advanced Imaging Center",
    effectiveDate: "2024-11-15",
    expiryDate: "2024-12-15",
    status: "Approved",
  },
];

