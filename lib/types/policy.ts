export type PolicyStatus = "active" | "inactive" | "suspended" | "expired";

export interface Policy {
  id: string;
  policyNumber: string;
  planName: string;
  planType: string;
  status: PolicyStatus;
  effectiveDate: string;
  renewalDate: string;
  premium: number;
  deductible: number;
  deductibleUsed: number;
  outOfPocketMax: number;
  outOfPocketUsed: number;
  coverages: Coverage[];
  dependents: Dependent[];
  documents: PolicyDocument[];
  createdAt: string;
  updatedAt: string;
}

export interface Coverage {
  id: string;
  category: string;
  description: string;
  limit: number;
  used: number;
  copay?: number;
  coinsurance?: number;
}

export interface Dependent {
  id: string;
  firstName: string;
  lastName: string;
  relationship: string;
  dateOfBirth: string;
  memberId: string;
  status: "active" | "inactive";
}

export interface PolicyDocument {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadedAt: string;
}
