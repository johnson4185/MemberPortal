/**
 * Telemedicine Feature - API Service
 * ---------------------------------------
 * API service for all telemedicine-related operations.
 * 
 * Usage:
 * - Import telemedicineApi to interact with telemedicine backend
 * - Automatically switches between mock and real API based on env
 * 
 * Backend Integration:
 * 1. Set NEXT_PUBLIC_USE_MOCK=false in .env.local
 * 2. Set NEXT_PUBLIC_API_URL to your backend URL
 * 3. Remove mock imports and functions
 * 4. Uncomment real API calls
 * 
 * @module features/telemedicine/telemedicine.api
 */

import { apiConfig } from "@/lib/api/apiConfig";
import {
  MOCK_DOCTORS,
  MOCK_SPECIALTIES,
  MOCK_UPCOMING_APPOINTMENTS,
  MOCK_PAST_CONSULTATIONS,
  getMockDoctorById,
  getMockAppointmentById,
  filterMockDoctorsBySpecialty,
  scheduleMockAppointment,
  updateMockAppointment,
  cancelMockAppointment,
} from "./telemedicine.mock";
import type {
  Doctor,
  Appointment,
  Specialty,
  DoctorsListParams,
  DoctorsListResponse,
  AppointmentsListParams,
  AppointmentsListResponse,
  ScheduleAppointmentPayload,
  UpdateAppointmentPayload,
  ConsultationSession,
} from "./telemedicine.types";

/**
 * Telemedicine API Service
 * 
 * All telemedicine-related API calls should go through this service.
 * Handles mock/real API switching automatically.
 */
export const telemedicineApi = {
  /**
   * Get list of specialties
   * 
   * @returns Promise<Specialty[]>
   * 
   * Backend Endpoint: GET /api/telemedicine/specialties
   */
  getSpecialties: async (): Promise<Specialty[]> => {
    // MOCK MODE
    if (apiConfig.useMock) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return MOCK_SPECIALTIES;
    }

    // REAL API MODE
    // const response = await fetch(`${apiConfig.baseUrl}/api/telemedicine/specialties`, {
    //   method: "GET",
    //   headers: apiConfig.headers,
    // });
    // return response.json();
    
    return MOCK_SPECIALTIES;
  },

  /**
   * Get list of doctors
   * 
   * @param params - Query parameters for filtering
   * @returns Promise<DoctorsListResponse>
   * 
   * Backend Endpoint: GET /api/telemedicine/doctors
   * Query Params: specialty, availability, language, minRating, maxFee
   */
  getDoctors: async (params: DoctorsListParams = {}): Promise<DoctorsListResponse> => {
    // MOCK MODE
    if (apiConfig.useMock) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      let filteredDoctors = [...MOCK_DOCTORS];

      // Filter by specialty
      if (params.specialty) {
        filteredDoctors = filterMockDoctorsBySpecialty(params.specialty);
      }

      // Filter by availability
      if (params.availability === "now") {
        filteredDoctors = filteredDoctors.filter((d) => d.isAvailableNow);
      }

      // Filter by language
      if (params.language) {
        filteredDoctors = filteredDoctors.filter((d) =>
          d.languages.some((lang) => lang.toLowerCase() === params.language?.toLowerCase())
        );
      }

      // Filter by rating
      if (params.minRating) {
        filteredDoctors = filteredDoctors.filter((d) => d.rating >= params.minRating!);
      }

      // Filter by fee
      if (params.maxFee) {
        filteredDoctors = filteredDoctors.filter((d) => d.consultationFee <= params.maxFee!);
      }

      return {
        doctors: filteredDoctors,
        total: filteredDoctors.length,
      };
    }

    // REAL API MODE
    // const queryParams = new URLSearchParams(params as any);
    // const response = await fetch(`${apiConfig.baseUrl}/api/telemedicine/doctors?${queryParams}`, {
    //   method: "GET",
    //   headers: apiConfig.headers,
    // });
    // return response.json();
    
    return {
      doctors: MOCK_DOCTORS,
      total: MOCK_DOCTORS.length,
    };
  },

  /**
   * Get doctor by ID
   * 
   * @param id - Doctor ID
   * @returns Promise<Doctor>
   * 
   * Backend Endpoint: GET /api/telemedicine/doctors/:id
   */
  getDoctorById: async (id: string): Promise<Doctor> => {
    // MOCK MODE
    if (apiConfig.useMock) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const doctor = getMockDoctorById(id);
      if (!doctor) {
        throw new Error("Doctor not found");
      }
      return doctor;
    }

    // REAL API MODE
    // const response = await fetch(`${apiConfig.baseUrl}/api/telemedicine/doctors/${id}`, {
    //   method: "GET",
    //   headers: apiConfig.headers,
    // });
    // if (!response.ok) throw new Error("Doctor not found");
    // return response.json();
    
    const doctor = getMockDoctorById(id);
    if (!doctor) throw new Error("Doctor not found");
    return doctor;
  },

  /**
   * Get list of appointments
   * 
   * @param params - Query parameters for filtering
   * @returns Promise<AppointmentsListResponse>
   * 
   * Backend Endpoint: GET /api/telemedicine/appointments
   * Query Params: status, startDate, endDate
   */
  getAppointments: async (params: AppointmentsListParams = {}): Promise<AppointmentsListResponse> => {
    // MOCK MODE
    if (apiConfig.useMock) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      let appointments = [...MOCK_UPCOMING_APPOINTMENTS, ...MOCK_PAST_CONSULTATIONS];

      // Filter by status
      if (params.status) {
        appointments = appointments.filter((apt) => apt.status === params.status);
      }

      // Filter by date range
      if (params.startDate) {
        appointments = appointments.filter((apt) => apt.date >= params.startDate!);
      }
      if (params.endDate) {
        appointments = appointments.filter((apt) => apt.date <= params.endDate!);
      }

      return {
        appointments,
        total: appointments.length,
      };
    }

    // REAL API MODE
    // const queryParams = new URLSearchParams(params as any);
    // const response = await fetch(`${apiConfig.baseUrl}/api/telemedicine/appointments?${queryParams}`, {
    //   method: "GET",
    //   headers: apiConfig.headers,
    // });
    // return response.json();
    
    return {
      appointments: [...MOCK_UPCOMING_APPOINTMENTS, ...MOCK_PAST_CONSULTATIONS],
      total: MOCK_UPCOMING_APPOINTMENTS.length + MOCK_PAST_CONSULTATIONS.length,
    };
  },

  /**
   * Get upcoming appointments
   * 
   * @returns Promise<Appointment[]>
   * 
   * Backend Endpoint: GET /api/telemedicine/appointments/upcoming
   */
  getUpcomingAppointments: async (): Promise<Appointment[]> => {
    // MOCK MODE
    if (apiConfig.useMock) {
      await new Promise((resolve) => setTimeout(resolve, 400));
      return [...MOCK_UPCOMING_APPOINTMENTS];
    }

    // REAL API MODE
    // const response = await fetch(`${apiConfig.baseUrl}/api/telemedicine/appointments/upcoming`, {
    //   method: "GET",
    //   headers: apiConfig.headers,
    // });
    // return response.json();
    
    return [...MOCK_UPCOMING_APPOINTMENTS];
  },

  /**
   * Get past consultations
   * 
   * @returns Promise<Appointment[]>
   * 
   * Backend Endpoint: GET /api/telemedicine/appointments/past
   */
  getPastConsultations: async (): Promise<Appointment[]> => {
    // MOCK MODE
    if (apiConfig.useMock) {
      await new Promise((resolve) => setTimeout(resolve, 400));
      return [...MOCK_PAST_CONSULTATIONS];
    }

    // REAL API MODE
    // const response = await fetch(`${apiConfig.baseUrl}/api/telemedicine/appointments/past`, {
    //   method: "GET",
    //   headers: apiConfig.headers,
    // });
    // return response.json();
    
    return [...MOCK_PAST_CONSULTATIONS];
  },

  /**
   * Get appointment by ID
   * 
   * @param id - Appointment ID
   * @returns Promise<Appointment>
   * 
   * Backend Endpoint: GET /api/telemedicine/appointments/:id
   */
  getAppointmentById: async (id: string): Promise<Appointment> => {
    // MOCK MODE
    if (apiConfig.useMock) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const appointment = getMockAppointmentById(id);
      if (!appointment) {
        throw new Error("Appointment not found");
      }
      return appointment;
    }

    // REAL API MODE
    // const response = await fetch(`${apiConfig.baseUrl}/api/telemedicine/appointments/${id}`, {
    //   method: "GET",
    //   headers: apiConfig.headers,
    // });
    // if (!response.ok) throw new Error("Appointment not found");
    // return response.json();
    
    const appointment = getMockAppointmentById(id);
    if (!appointment) throw new Error("Appointment not found");
    return appointment;
  },

  /**
   * Schedule new appointment
   * 
   * @param payload - Appointment details
   * @returns Promise<Appointment>
   * 
   * Backend Endpoint: POST /api/telemedicine/appointments
   * Body: { doctorId, date, time, type, duration, notes }
   */
  scheduleAppointment: async (payload: ScheduleAppointmentPayload): Promise<Appointment> => {
    // MOCK MODE
    if (apiConfig.useMock) {
      await new Promise((resolve) => setTimeout(resolve, 800));
      return scheduleMockAppointment(payload);
    }

    // REAL API MODE
    // const response = await fetch(`${apiConfig.baseUrl}/api/telemedicine/appointments`, {
    //   method: "POST",
    //   headers: apiConfig.headers,
    //   body: JSON.stringify(payload),
    // });
    // if (!response.ok) throw new Error("Failed to schedule appointment");
    // return response.json();
    
    return scheduleMockAppointment(payload);
  },

  /**
   * Update appointment
   * 
   * @param id - Appointment ID
   * @param payload - Updated appointment details
   * @returns Promise<Appointment>
   * 
   * Backend Endpoint: PATCH /api/telemedicine/appointments/:id
   * Body: { date?, time?, notes? }
   */
  updateAppointment: async (id: string, payload: UpdateAppointmentPayload): Promise<Appointment> => {
    // MOCK MODE
    if (apiConfig.useMock) {
      await new Promise((resolve) => setTimeout(resolve, 600));
      return updateMockAppointment(id, payload);
    }

    // REAL API MODE
    // const response = await fetch(`${apiConfig.baseUrl}/api/telemedicine/appointments/${id}`, {
    //   method: "PATCH",
    //   headers: apiConfig.headers,
    //   body: JSON.stringify(payload),
    // });
    // if (!response.ok) throw new Error("Failed to update appointment");
    // return response.json();
    
    return updateMockAppointment(id, payload);
  },

  /**
   * Cancel appointment
   * 
   * @param id - Appointment ID
   * @returns Promise<void>
   * 
   * Backend Endpoint: DELETE /api/telemedicine/appointments/:id
   */
  cancelAppointment: async (id: string): Promise<void> => {
    // MOCK MODE
    if (apiConfig.useMock) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      cancelMockAppointment(id);
      return;
    }

    // REAL API MODE
    // const response = await fetch(`${apiConfig.baseUrl}/api/telemedicine/appointments/${id}`, {
    //   method: "DELETE",
    //   headers: apiConfig.headers,
    // });
    // if (!response.ok) throw new Error("Failed to cancel appointment");
    
    cancelMockAppointment(id);
  },

  /**
   * Start consultation session
   * 
   * @param appointmentId - Appointment ID
   * @returns Promise<ConsultationSession>
   * 
   * Backend Endpoint: POST /api/telemedicine/consultations/start
   * Body: { appointmentId }
   */
  startConsultation: async (appointmentId: string): Promise<ConsultationSession> => {
    // MOCK MODE
    if (apiConfig.useMock) {
      await new Promise((resolve) => setTimeout(resolve, 700));
      
      const appointment = getMockAppointmentById(appointmentId);
      const doctor = appointment ? getMockDoctorById(appointment.doctorId) : undefined;
      
      if (!appointment || !doctor) {
        throw new Error("Appointment or doctor not found");
      }

      return {
        id: `session-${Date.now()}`,
        appointmentId,
        doctor,
        startTime: new Date().toISOString(),
        duration: appointment.duration,
        status: "connected",
        chatEnabled: true,
        recordingEnabled: false,
      };
    }

    // REAL API MODE
    // const response = await fetch(`${apiConfig.baseUrl}/api/telemedicine/consultations/start`, {
    //   method: "POST",
    //   headers: apiConfig.headers,
    //   body: JSON.stringify({ appointmentId }),
    // });
    // if (!response.ok) throw new Error("Failed to start consultation");
    // return response.json();
    
    throw new Error("Not implemented");
  },

  /**
   * End consultation session
   * 
   * @param sessionId - Session ID
   * @returns Promise<void>
   * 
   * Backend Endpoint: POST /api/telemedicine/consultations/:sessionId/end
   */
  endConsultation: async (_sessionId: string): Promise<void> => {
    // MOCK MODE
    if (apiConfig.useMock) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return;
    }

    // REAL API MODE
    // const response = await fetch(`${apiConfig.baseUrl}/api/telemedicine/consultations/${sessionId}/end`, {
    //   method: "POST",
    //   headers: apiConfig.headers,
    // });
    // if (!response.ok) throw new Error("Failed to end consultation");
    
    return;
  },
};
