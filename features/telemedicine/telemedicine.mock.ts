/**
 * Telemedicine Feature - Mock Data
 * ---------------------------------------
 * Mock data for telemedicine feature during development.
 * 
 * Usage:
 * - Used when NEXT_PUBLIC_USE_MOCK=true
 * - Replace with real API calls in telemedicine.api.ts
 * 
 * Removal Instructions:
 * - Set NEXT_PUBLIC_USE_MOCK=false in .env.local
 * - This file can be deleted once backend is integrated
 * 
 * @module features/telemedicine/telemedicine.mock
 */

import type { Doctor, Appointment, Specialty } from "./telemedicine.types";
import { SPECIALTY_CATEGORIES } from "./telemedicine.constants";

/**
 * Mock specialties list
 */
export const MOCK_SPECIALTIES: Specialty[] = SPECIALTY_CATEGORIES.map(cat => ({
  id: cat.id,
  name: cat.name,
  icon: cat.icon,
  color: cat.color,
}));

/**
 * Mock doctors list for development
 */
export const MOCK_DOCTORS: Doctor[] = [
  {
    id: "1",
    name: "Dr. Sarah Mitchell",
    specialty: "Family Medicine",
    rating: 4.9,
    reviewCount: 342,
    availability: "Available Now",
    nextSlot: "Immediate",
    languages: ["English", "Spanish"],
    consultationFee: 45,
    isAvailableNow: true,
    averageWaitTime: "5 min",
    yearsOfExperience: 12,
    boardCertified: true,
    bio: "Dr. Mitchell specializes in family medicine with a focus on preventive care and chronic disease management.",
    hospital: {
      name: "Premium Health Center",
      address: "123 Medical Plaza, Healthcare District, City Center",
      phone: "+1-800-HEALTH-1",
    },
    reviews: [
      { name: "John D.", rating: 5, comment: "Excellent doctor, very professional and caring. Highly recommend!" },
      { name: "Sarah M.", rating: 5, comment: "Great experience, listened carefully and provided thorough guidance." },
      { name: "Michael P.", rating: 4, comment: "Very knowledgeable and friendly. Easy to follow consultation." },
    ],
  },
  {
    id: "2",
    name: "Dr. James Rodriguez",
    specialty: "Internal Medicine",
    rating: 4.8,
    reviewCount: 289,
    availability: "Available Now",
    nextSlot: "Immediate",
    languages: ["English", "Spanish", "Portuguese"],
    consultationFee: 50,
    isAvailableNow: true,
    averageWaitTime: "8 min",
    yearsOfExperience: 15,
    boardCertified: true,
    bio: "Board-certified internist with extensive experience in adult medicine and complex medical conditions.",
    hospital: {
      name: "Advanced Medical Institute",
      address: "456 Hospital Avenue, Medical Complex, Downtown",
      phone: "+1-800-MED-CARE",
    },
    reviews: [
      { name: "Emma R.", rating: 5, comment: "Dr. Rodriguez took time to explain everything clearly. Very thorough!" },
      { name: "David L.", rating: 5, comment: "Professional and attentive. Best consultation I've had." },
      { name: "Patricia K.", rating: 4, comment: "Good doctor, though a bit rushed. But still very competent." },
    ],
  },
  {
    id: "3",
    name: "Dr. Emily Chen",
    specialty: "Pediatrics",
    rating: 4.9,
    reviewCount: 412,
    availability: "Available at 2:00 PM",
    nextSlot: "Today at 2:00 PM",
    languages: ["English", "Mandarin"],
    consultationFee: 45,
    isAvailableNow: false,
    averageWaitTime: "10 min",
    yearsOfExperience: 10,
    boardCertified: true,
    bio: "Pediatrician dedicated to providing compassionate care for children from infancy through adolescence.",
    hospital: {
      name: "Children's Healthcare Hospital",
      address: "789 Pediatric Lane, Family Healthcare District",
      phone: "+1-800-KIDS-123",
    },
    reviews: [
      { name: "Amanda H.", rating: 5, comment: "Dr. Chen is wonderful with kids! Very patient and caring." },
      { name: "Robert T.", rating: 5, comment: "Excellent pediatrician. Really knows how to work with children." },
      { name: "Jennifer W.", rating: 5, comment: "Our daughter loves her! Highly recommend for all parents." },
    ],
  },
  {
    id: "4",
    name: "Dr. Michael Thompson",
    specialty: "Dermatology",
    rating: 4.7,
    reviewCount: 256,
    availability: "Available at 3:30 PM",
    nextSlot: "Today at 3:30 PM",
    languages: ["English"],
    consultationFee: 55,
    isAvailableNow: false,
    averageWaitTime: "12 min",
    yearsOfExperience: 18,
    boardCertified: true,
    bio: "Experienced dermatologist specializing in medical and cosmetic dermatology with a patient-centered approach.",
    hospital: {
      name: "Skin Wellness Center",
      address: "321 Dermatology Street, Beauty & Health Complex",
      phone: "+1-800-SKIN-911",
    },
    reviews: [
      { name: "Lisa V.", rating: 5, comment: "Fantastic dermatologist! Solved my skin issues in no time." },
      { name: "Christopher B.", rating: 4, comment: "Very professional and knowledgeable. Great results." },
      { name: "Nicole M.", rating: 4, comment: "Good expertise. Recommended several effective treatments." },
    ],
  },
  {
    id: "5",
    name: "Dr. Lisa Patel",
    specialty: "Cardiology",
    rating: 4.9,
    reviewCount: 387,
    availability: "Available Tomorrow",
    nextSlot: "Tomorrow at 10:00 AM",
    languages: ["English", "Hindi"],
    consultationFee: 65,
    isAvailableNow: false,
    averageWaitTime: "15 min",
    yearsOfExperience: 20,
    boardCertified: true,
    bio: "Cardiologist with expertise in preventive cardiology and heart disease management.",
    hospital: {
      name: "Heart Care Specialists",
      address: "654 Cardiac Plaza, Medical Heights",
      phone: "+1-800-HEART-99",
    },
    reviews: [
      { name: "Thomas S.", rating: 5, comment: "Dr. Patel is excellent! Very knowledgeable about heart health." },
      { name: "Margaret C.", rating: 5, comment: "Thorough examination and great follow-up care." },
      { name: "Victor G.", rating: 5, comment: "Best cardiologist I've seen. Highly recommend!" },
    ],
  },
  {
    id: "6",
    name: "Dr. Robert Johnson",
    specialty: "Mental Health",
    subSpecialty: "Psychiatry",
    rating: 4.8,
    reviewCount: 298,
    availability: "Available Now",
    nextSlot: "Immediate",
    languages: ["English"],
    consultationFee: 70,
    isAvailableNow: true,
    averageWaitTime: "6 min",
    yearsOfExperience: 16,
    boardCertified: true,
    bio: "Psychiatrist specializing in anxiety, depression, and stress management with a holistic approach.",
    hospital: {
      name: "Mental Wellness Institute",
      address: "987 Psychology Way, Mental Health District",
      phone: "+1-800-PSYCH-1",
    },
    reviews: [
      { name: "Kevin N.", rating: 5, comment: "Dr. Johnson really listened to my concerns. Very compassionate." },
      { name: "Rebecca F.", rating: 5, comment: "Excellent psychiatrist. Helped me through a difficult time." },
      { name: "Mark E.", rating: 4, comment: "Professional and supportive. Great mental health support." },
    ],
  },
];

/**
 * Mock upcoming appointments
 */
export const MOCK_UPCOMING_APPOINTMENTS: Appointment[] = [
  {
    id: "1",
    doctorId: "1",
    doctor: "Dr. Sarah Mitchell",
    specialty: "Family Medicine",
    date: "2026-02-20",
    time: "10:00 AM",
    type: "video",
    status: "scheduled",
    duration: 30,
    consultationFee: 45,
    meetingLink: "https://telemedicine.example.com/session/abc123",
  },
  {
    id: "2",
    doctorId: "3",
    doctor: "Dr. Emily Chen",
    specialty: "Pediatrics",
    date: "2026-02-22",
    time: "2:30 PM",
    type: "video",
    status: "scheduled",
    duration: 30,
    consultationFee: 45,
    meetingLink: "https://telemedicine.example.com/session/def456",
  },
];

/**
 * Mock past consultations
 */
export const MOCK_PAST_CONSULTATIONS: Appointment[] = [
  {
    id: "3",
    doctorId: "2",
    doctor: "Dr. James Rodriguez",
    specialty: "Internal Medicine",
    date: "2026-02-10",
    time: "11:00 AM",
    type: "video",
    status: "completed",
    duration: 25,
    prescription: true,
    notes: "Follow-up required in 2 weeks",
    consultationFee: 50,
  },
  {
    id: "4",
    doctorId: "1",
    doctor: "Dr. Sarah Mitchell",
    specialty: "Family Medicine",
    date: "2026-02-05",
    time: "3:00 PM",
    type: "video",
    status: "completed",
    duration: 30,
    prescription: false,
    consultationFee: 45,
  },
  {
    id: "5",
    doctorId: "4",
    doctor: "Dr. Michael Thompson",
    specialty: "Dermatology",
    date: "2026-01-28",
    time: "1:30 PM",
    type: "video",
    status: "completed",
    duration: 20,
    prescription: true,
    consultationFee: 55,
  },
];

/**
 * Get mock doctor by ID
 */
export const getMockDoctorById = (id: string): Doctor | undefined => {
  return MOCK_DOCTORS.find((doctor) => doctor.id === id);
};

/**
 * Get mock appointment by ID
 */
export const getMockAppointmentById = (id: string): Appointment | undefined => {
  const allAppointments = [...MOCK_UPCOMING_APPOINTMENTS, ...MOCK_PAST_CONSULTATIONS];
  return allAppointments.find((appointment) => appointment.id === id);
};

/**
 * Filter mock doctors by specialty
 */
export const filterMockDoctorsBySpecialty = (specialty: string): Doctor[] => {
  if (!specialty) return MOCK_DOCTORS;
  
  return MOCK_DOCTORS.filter((doctor) => 
    doctor.specialty.toLowerCase().includes(specialty.toLowerCase()) ||
    (specialty === "General Practice" && doctor.specialty.includes("Family"))
  );
};

/**
 * Get available doctors (mock)
 */
export const getMockAvailableDoctors = (): Doctor[] => {
  return MOCK_DOCTORS.filter((doctor) => doctor.isAvailableNow);
};

/**
 * Schedule appointment (mock)
 */
let nextAppointmentId = 100;
export const scheduleMockAppointment = (payload: {
  doctorId: string;
  date: string;
  time: string;
  type: "video" | "audio" | "chat";
  duration?: number;
}): Appointment => {
  const doctor = getMockDoctorById(payload.doctorId);
  
  if (!doctor) {
    throw new Error("Doctor not found");
  }

  const newAppointment: Appointment = {
    id: (nextAppointmentId++).toString(),
    doctorId: payload.doctorId,
    doctor: doctor.name,
    specialty: doctor.specialty,
    date: payload.date,
    time: payload.time,
    type: payload.type,
    status: "scheduled",
    duration: payload.duration || 30,
    consultationFee: doctor.consultationFee,
    meetingLink: `https://telemedicine.example.com/session/${Date.now()}`,
  };

  MOCK_UPCOMING_APPOINTMENTS.push(newAppointment);
  return newAppointment;
};

/**
 * Update appointment (mock)
 */
export const updateMockAppointment = (
  id: string,
  updates: { date?: string; time?: string; notes?: string }
): Appointment => {
  const index = MOCK_UPCOMING_APPOINTMENTS.findIndex((apt) => apt.id === id);
  
  if (index === -1) {
    throw new Error("Appointment not found");
  }

  MOCK_UPCOMING_APPOINTMENTS[index] = {
    ...MOCK_UPCOMING_APPOINTMENTS[index],
    ...updates,
  };

  return MOCK_UPCOMING_APPOINTMENTS[index];
};

/**
 * Cancel appointment (mock)
 */
export const cancelMockAppointment = (id: string): void => {
  const index = MOCK_UPCOMING_APPOINTMENTS.findIndex((apt) => apt.id === id);
  
  if (index !== -1) {
    MOCK_UPCOMING_APPOINTMENTS.splice(index, 1);
  }
};
