/**
 * Telemedicine Feature - Type Definitions
 * ---------------------------------------
 * TypeScript types and interfaces for telemedicine feature.
 * 
 * Usage:
 * - Import types from this file for type safety
 * - Extend base types as needed
 * 
 * Backend Integration:
 * - Update types to match backend API response structure
 * - Add new types as features are added
 * 
 * @module features/telemedicine/telemedicine.types
 */

/**
 * Consultation type
 */
export type ConsultationType = "video" | "audio" | "chat";

/**
 * Appointment status
 */
export type AppointmentStatus = "scheduled" | "completed" | "cancelled" | "in-progress";

/**
 * Specialty type
 */
export interface Specialty {
  id: string;
  name: string;
  icon: string;
  color: string;
  description?: string;
}

/**
 * Hospital/Clinic information
 */
export interface HospitalInfo {
  name: string;
  address: string;
  phone: string;
}

/**
 * Patient review
 */
export interface PatientReview {
  name: string;
  rating: number;
  comment: string;
}

/**
 * Doctor interface
 */
export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  subSpecialty?: string;
  rating: number;
  reviewCount: number;
  availability: string;
  nextSlot: string;
  languages: string[];
  consultationFee: number;
  image?: string;
  isAvailableNow: boolean;
  averageWaitTime: string;
  yearsOfExperience?: number;
  boardCertified?: boolean;
  bio?: string;
  hospital?: HospitalInfo;
  reviews?: PatientReview[];
}

/**
 * Appointment interface
 */
export interface Appointment {
  id: string;
  doctorId: string;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  type: ConsultationType;
  status: AppointmentStatus;
  duration: number;
  prescription?: boolean;
  notes?: string;
  consultationFee?: number;
  meetingLink?: string;
}

/**
 * Schedule appointment payload
 */
export interface ScheduleAppointmentPayload {
  doctorId: string;
  date: string;
  time: string;
  type: ConsultationType;
  duration?: number;
  notes?: string;
}

/**
 * Update appointment payload
 */
export interface UpdateAppointmentPayload {
  date?: string;
  time?: string;
  notes?: string;
}

/**
 * Doctors list query parameters
 */
export interface DoctorsListParams {
  specialty?: string;
  availability?: "now" | "today" | "all";
  language?: string;
  minRating?: number;
  maxFee?: number;
}

/**
 * Doctors list API response
 */
export interface DoctorsListResponse {
  doctors: Doctor[];
  total: number;
}

/**
 * Appointments list query parameters
 */
export interface AppointmentsListParams {
  status?: AppointmentStatus;
  startDate?: string;
  endDate?: string;
}

/**
 * Appointments list API response
 */
export interface AppointmentsListResponse {
  appointments: Appointment[];
  total: number;
}

/**
 * Consultation session
 */
export interface ConsultationSession {
  id: string;
  appointmentId: string;
  doctor: Doctor;
  startTime: string;
  endTime?: string;
  duration: number;
  status: "waiting" | "connected" | "ended";
  chatEnabled: boolean;
  recordingEnabled: boolean;
}
