/**
 * Telemedicine Feature - Constants
 * ---------------------------------------
 * Constant values used throughout the telemedicine feature.
 * 
 * @module features/telemedicine/telemedicine.constants
 */

/**
 * Available time slots for appointments
 */
export const TIME_SLOTS = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
  "5:30 PM",
];

/**
 * Default consultation duration in minutes
 */
export const DEFAULT_CONSULTATION_DURATION = 30;

/**
 * Specialty categories with icons and colors
 */
export const SPECIALTY_CATEGORIES = [
  { id: "general", name: "General Practice", icon: "Stethoscope", color: "text-blue-500" },
  { id: "cardiology", name: "Cardiology", icon: "Heart", color: "text-red-500" },
  { id: "mental", name: "Mental Health", icon: "Lightbulb", color: "text-purple-500" },
  { id: "ophthalmology", name: "Ophthalmology", icon: "Glasses", color: "text-cyan-500" },
  { id: "dermatology", name: "Dermatology", icon: "Leaf", color: "text-orange-500" },
  { id: "pediatrics", name: "Pediatrics", icon: "Baby", color: "text-pink-500" },
  { id: "nutrition", name: "Nutrition", icon: "Apple", color: "text-yellow-500" },
  { id: "orthopedics", name: "Orthopedics", icon: "Bone", color: "text-teal-500" },
];

/**
 * Consultation type labels
 */
export const CONSULTATION_TYPE_LABELS: Record<string, string> = {
  video: "Video Call",
  audio: "Audio Call",
  chat: "Chat",
};

/**
 * Appointment status labels
 */
export const APPOINTMENT_STATUS_LABELS: Record<string, string> = {
  scheduled: "Scheduled",
  completed: "Completed",
  cancelled: "Cancelled",
  "in-progress": "In Progress",
};

/**
 * Appointment status colors
 */
export const APPOINTMENT_STATUS_COLORS: Record<string, string> = {
  scheduled: "pending",
  completed: "active",
  cancelled: "rejected",
  "in-progress": "under_review",
};
