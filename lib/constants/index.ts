import { ClaimStatus, ClaimType } from "../types";

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
  CLAIMS: "/claims",
  CLAIM_NEW: "/claims/new",
  CLAIM_DETAIL: (id: string) => `/claims/${id}`,
  POLICY: "/policy",
  PROVIDERS: "/providers",
  ID_CARD: "/id-card",
  TELEMEDICINE: "/telemedicine",
  PAYMENTS: "/payments",
  SUPPORT: "/support",
  WELLNESS: "/wellness",
  SETTINGS: "/settings",
} as const;

export const CLAIM_STATUSES: { label: string; value: ClaimStatus }[] = [
  { label: "All Claims", value: "draft" as ClaimStatus },
  { label: "Submitted", value: "submitted" },
  { label: "Under Review", value: "under_review" },
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" },
  { label: "Withdrawn", value: "withdrawn" },
  { label: "Paid", value: "paid" },
];

export const CLAIM_TYPES: { label: string; value: ClaimType }[] = [
  { label: "Medical", value: "medical" },
  { label: "Dental", value: "dental" },
  { label: "Vision", value: "vision" },
  { label: "Prescription", value: "prescription" },
  { label: "Hospitalization", value: "hospitalization" },
];

export const STATES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY",
];

export const PHONE_REGEX = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
export const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
export const ZIP_CODE_REGEX = /^\d{5}(-\d{4})?$/;

