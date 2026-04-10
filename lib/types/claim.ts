export type ClaimStatus = 
  | "draft"
  | "submitted" 
  | "under_review" 
  | "approved" 
  | "rejected"
  | "resubmitted"
  | "denied" 
  | "paid"
  | "withdrawn";

export type ClaimType = 
  | "medical"
  | "dental"
  | "vision"
  | "prescription"
  | "hospitalization";

export interface Claim {
  id: string;
  claimNumber: string;
  type: ClaimType;
  status: ClaimStatus;
  submittedDate: string;
  serviceDate: string;
  providerName: string;
  providerNPI?: string;
  diagnosis: string;
  diagnosisCode?: string;
  amountBilled: number;
  amountCovered: number;
  amountPaid: number;
  patientResponsibility: number;
  description: string;
  attachments: ClaimAttachment[];
  timeline: ClaimTimeline[];
  createdAt: string;
  updatedAt: string;
}

export interface ClaimAttachment {
  id: string;
  fileName: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  uploadedAt: string;
}

export interface ClaimTimeline {
  id: string;
  status: ClaimStatus;
  date: string;
  description: string;
  updatedBy?: string;
  team?: string;
  handlerName?: string;
  action?: string;
}

export interface ClaimFormData {
  type: ClaimType;
  serviceDate: string;
  providerName: string;
  providerNPI?: string;
  diagnosis: string;
  diagnosisCode?: string;
  amountBilled: number;
  description: string;
  attachments?: File[];
}
