export type ProviderType = 
  | "primary_care"
  | "specialist"
  | "hospital"
  | "urgent_care"
  | "pharmacy"
  | "lab"
  | "imaging";

export interface Provider {
  id: string;
  name: string;
  type: ProviderType;
  specialty?: string;
  npi: string;
  phone: string;
  email?: string;
  address: ProviderAddress;
  distance?: number;
  rating?: number;
  reviewCount?: number;
  acceptingNewPatients: boolean;
  inNetwork: boolean;
  languages: string[];
  hours?: ProviderHours;
}

export interface ProviderAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface ProviderHours {
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
  sunday?: string;
}

export interface ProviderSearchFilters {
  type?: ProviderType;
  specialty?: string;
  inNetwork?: boolean;
  acceptingNewPatients?: boolean;
  distance?: number;
  zipCode?: string;
}
