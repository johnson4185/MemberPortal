/**
 * Policy Feature - Mock Data
 * ---------------------------------------
 * Mock data for policy feature during development.
 * 
 * Usage:
 * - Used when NEXT_PUBLIC_USE_MOCK=true
 * - Replace with real API calls in policy.api.ts
 * 
 * Removal Instructions:
 * - Set NEXT_PUBLIC_USE_MOCK=false in .env.local
 * - This file can be deleted once backend is integrated
 * 
 * @module features/policy/policy.mock
 */

import { Policy } from "./policy.types";

/**
 * Mock policy data for development
 */
export const MOCK_POLICY: Policy = {
  id: "POL-2024-001",
  policyNumber: "POL-2024-001",
  planName: "Premium Health Plan",
  planType: "Health",
  status: "active",
  effectiveDate: "2024-01-01",
  renewalDate: "2024-12-31",
  premium: 450.0,
  deductible: 1500.0,
  deductibleUsed: 750.0,
  outOfPocketMax: 5000.0,
  outOfPocketUsed: 1200.0,
  coverages: [
    {
      id: "cov1",
      category: "Medical",
      description: "Inpatient and outpatient medical services",
      limit: 100000,
      used: 5000,
      copay: 25,
    },
    {
      id: "cov2",
      category: "Prescription Drugs",
      description: "Generic and brand name medications",
      limit: 5000,
      used: 500,
      copay: 10,
    },
    {
      id: "cov3",
      category: "Dental",
      description: "Preventive and basic dental care",
      limit: 2000,
      used: 300,
      copay: 0,
    },
    {
      id: "cov4",
      category: "Vision",
      description: "Eye exams and corrective lenses",
      limit: 500,
      used: 150,
      copay: 15,
    },
    {
      id: "cov5",
      category: "Mental Health",
      description: "Counseling and therapy services",
      limit: 10000,
      used: 600,
      copay: 30,
    },
  ],
  dependents: [
    {
      id: "dep1",
      firstName: "Jane",
      lastName: "Doe",
      relationship: "Spouse",
      dateOfBirth: "1992-03-20",
      memberId: "MEM-DEP-001",
      status: "active",
    },
    {
      id: "dep2",
      firstName: "Alex",
      lastName: "Doe",
      relationship: "Child",
      dateOfBirth: "2015-06-10",
      memberId: "MEM-DEP-002",
      status: "active",
    },
  ],
  documents: [],
  createdAt: "2024-01-01",
  updatedAt: "2024-01-15",
};
