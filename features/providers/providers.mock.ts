/**
 * Providers Feature - Mock Data
 * ---------------------------------------
 * Mock data for providers feature during development.
 * 
 * Usage:
 * - Used when NEXT_PUBLIC_USE_MOCK=true
 * - Replace with real API calls in providers.api.ts
 * 
 * Removal Instructions:
 * - Set NEXT_PUBLIC_USE_MOCK=false in .env.local
 * - This file can be deleted once backend is integrated
 * 
 * @module features/providers/providers.mock
 */

import { Provider } from "./providers.types";

/**
 * Mock providers list for development
 */
export const MOCK_PROVIDERS: Provider[] = [
  {
    id: "PRV-001",
    name: "Dr. Sarah Johnson",
    type: "primary_care",
    specialty: "Family Medicine",
    npi: "1234567890",
    phone: "+1 (555) 234-5678",
    address: {
      street: "123 Medical Plaza",
      city: "New York",
      state: "NY",
      zipCode: "10001",
    },
    rating: 4.8,
    acceptingNewPatients: true,
    inNetwork: true,
    languages: ["English", "Spanish"],
    distance: 2.3,
  },
  {
    id: "PRV-002",
    name: "City Medical Center",
    type: "hospital",
    specialty: "Multi-Specialty",
    npi: "2345678901",
    phone: "+1 (555) 345-6789",
    address: {
      street: "456 Healthcare Ave",
      city: "New York",
      state: "NY",
      zipCode: "10002",
    },
    rating: 4.5,
    acceptingNewPatients: true,
    inNetwork: true,
    languages: ["English"],
    distance: 3.7,
  },
  {
    id: "PRV-003",
    name: "Dr. Michael Chen",
    type: "specialist",
    specialty: "Cardiology",
    npi: "3456789012",
    phone: "+1 (555) 456-7890",
    address: {
      street: "789 Heart Center",
      city: "New York",
      state: "NY",
      zipCode: "10003",
    },
    rating: 4.9,
    acceptingNewPatients: false,
    inNetwork: true,
    languages: ["English", "Mandarin"],
    distance: 4.2,
  },
  {
    id: "PRV-004",
    name: "Bright Smile Dental",
    type: "specialist",
    specialty: "General Dentistry",
    npi: "4567890123",
    phone: "+1 (555) 567-8901",
    address: {
      street: "321 Dental Plaza",
      city: "New York",
      state: "NY",
      zipCode: "10004",
    },
    rating: 4.6,
    acceptingNewPatients: true,
    inNetwork: true,
    languages: ["English"],
    distance: 1.8,
  },
];
