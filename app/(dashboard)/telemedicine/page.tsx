"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Video,
  Calendar,
  Clock,
  User,
  Phone,
  MessageSquare,
  CheckCircle,
  Star,
  ChevronRight,
  Stethoscope,
  Heart,
  Brain,
  Eye,
  Activity,
  Baby,
  Shield,
  AlertCircle,
  Download,
  FileText,
  Bone,
  Mic,
  MicOff,
  VideoOff,
  Pill,
  Smile,
  Glasses,
  Apple,
  Sparkles,
  Leaf,
  Lightbulb,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { StaggerContainer, StaggerItem } from "@/components/shared/StaggerAnimation";
import Modal from "@/components/shared/Modal";
import { telemedicineApi } from "@/features/telemedicine/telemedicine.api";
import { SPECIALTY_CATEGORIES, TIME_SLOTS } from "@/features/telemedicine/telemedicine.constants";
import type { Doctor, Appointment, ConsultationType } from "@/features/telemedicine/telemedicine.types";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Stethoscope,
  Heart,
  Brain,
  Eye,
  Activity,
  Baby,
  Shield,
  Bone,
  Smile,
  Glasses,
  Apple,
  Sparkles,
  Leaf,
  Lightbulb,
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

const getConsultationIcon = (type: ConsultationType) => {
  switch (type) {
    case "video":
      return Video;
    case "audio":
      return Phone;
    case "chat":
      return MessageSquare;
  }
};

export default function TelemedicinePage() {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState<Appointment[]>([]);
  const [pastConsultations, setPastConsultations] = useState<Appointment[]>([]);
  const [isVideoCallOpen, setIsVideoCallOpen] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);
  const [isReportPreviewOpen, setIsReportPreviewOpen] = useState(false);
  const [isPrescriptionPreviewOpen, setIsPrescriptionPreviewOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [selectedReportConsultation, setSelectedReportConsultation] = useState<Appointment | null>(null);
  const [selectedPrescriptionConsultation, setSelectedPrescriptionConsultation] = useState<Appointment | null>(null);
  const [isDoctorProfileOpen, setIsDoctorProfileOpen] = useState(false);
  const [selectedDoctorForProfile, setSelectedDoctorForProfile] = useState<Doctor | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");

  // Load initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [doctorsRes, upcomingRes, pastRes] = await Promise.all([
          telemedicineApi.getDoctors(),
          telemedicineApi.getUpcomingAppointments(),
          telemedicineApi.getPastConsultations(),
        ]);
        setDoctors(doctorsRes.doctors);
        setUpcomingAppointments(upcomingRes);
        setPastConsultations(pastRes);
      } catch (error) {
        console.error("Failed to load telemedicine data:", error);
      }
    };
    fetchData();
  }, []);

  // Filter doctors when specialty changes
  useEffect(() => {
    const fetchDoctorsBySpecialty = async () => {
      try {
        if (selectedSpecialty) {
          const response = await telemedicineApi.getDoctors({ specialty: selectedSpecialty });
          setDoctors(response.doctors);
        } else {
          const [doctorsRes, upcomingRes, pastRes] = await Promise.all([
            telemedicineApi.getDoctors(),
            telemedicineApi.getUpcomingAppointments(),
            telemedicineApi.getPastConsultations(),
          ]);
          setDoctors(doctorsRes.doctors);
          setUpcomingAppointments(upcomingRes);
          setPastConsultations(pastRes);
        }
      } catch (error) {
        console.error("Failed to load doctors:", error);
      }
    };
    fetchDoctorsBySpecialty();
  }, [selectedSpecialty]);

  const handleStartConsultation = (doctor?: Doctor) => {
    if (doctor) {
      setSelectedDoctor(doctor);
    } else {
      // Use first available doctor for instant care
      const availableDoctor = doctors.find(d => d.isAvailableNow);
      setSelectedDoctor(availableDoctor || doctors[0]);
    }
    setIsVideoCallOpen(true);
  };

  const handleSchedule = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsScheduleOpen(true);
    setScheduledDate("");
    setScheduledTime("");
  };

  const handleConfirmSchedule = async () => {
    if (selectedDoctor && scheduledDate && scheduledTime) {
      try {
        const newAppointment = await telemedicineApi.scheduleAppointment({
          doctorId: selectedDoctor.id,
          date: scheduledDate,
          time: scheduledTime,
          type: "video",
          duration: 30,
        });
        setUpcomingAppointments([...upcomingAppointments, newAppointment]);
        setIsScheduleOpen(false);
        setScheduledDate("");
        setScheduledTime("");
      } catch (error) {
        console.error("Failed to schedule appointment:", error);
        alert("Failed to schedule appointment. Please try again.");
      }
    }
  };

  const handleReschedule = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setScheduledDate(appointment.date);
    setScheduledTime(appointment.time);
    setIsRescheduleOpen(true);
  };

  const handleConfirmReschedule = async () => {
    if (selectedAppointment && scheduledDate && scheduledTime) {
      try {
        const updatedAppointment = await telemedicineApi.updateAppointment(
          selectedAppointment.id,
          { date: scheduledDate, time: scheduledTime }
        );
        const updatedAppointments = upcomingAppointments.map((apt) =>
          apt.id === selectedAppointment.id ? updatedAppointment : apt
        );
        setUpcomingAppointments(updatedAppointments);
        setIsRescheduleOpen(false);
        setSelectedAppointment(null);
      } catch (error) {
        console.error("Failed to reschedule appointment:", error);
        alert("Failed to reschedule appointment. Please try again.");
      }
    }
  };

  const handleCancelAppointment = async (appointmentId: string) => {
    try {
      await telemedicineApi.cancelAppointment(appointmentId);
      setUpcomingAppointments(upcomingAppointments.filter((apt) => apt.id !== appointmentId));
      setIsRescheduleOpen(false);
    } catch (error) {
      console.error("Failed to cancel appointment:", error);
      alert("Failed to cancel appointment. Please try again.");
    }
  };

  const handleEndCall = () => {
    setIsVideoCallOpen(false);
    setSelectedDoctor(null);
    setIsMuted(false);
    setIsVideoOff(false);
  };

  const handleOpenReportPreview = (consultation: Appointment) => {
    setSelectedReportConsultation(consultation);
    setIsReportPreviewOpen(true);
  };

  const handleDownloadReport = () => {
    if (selectedReportConsultation) {
      const element = document.createElement("a");
      const file = new Blob([`Report for ${selectedReportConsultation.doctor}\n\nDate: ${selectedReportConsultation.date}\nNotes: ${selectedReportConsultation.notes || "N/A"}`], {
        type: "text/plain",
      });
      element.href = URL.createObjectURL(file);
      element.download = `report-${selectedReportConsultation.id}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  };

  const handleOpenPrescriptionPreview = (consultation: Appointment) => {
    setSelectedPrescriptionConsultation(consultation);
    setIsPrescriptionPreviewOpen(true);
  };

  const handleDownloadPrescription = () => {
    if (selectedPrescriptionConsultation) {
      const element = document.createElement("a");
      const file = new Blob([`PRESCRIPTION\n${"=".repeat(50)}\n\nPatient Prescription\n\nDoctor: ${selectedPrescriptionConsultation.doctor}\nSpecialty: ${selectedPrescriptionConsultation.specialty}\nDate: ${selectedPrescriptionConsultation.date}\n\n${"=".repeat(50)}\n\nMedications:\n1. [Medication Name] - [Dosage]\n2. [Medication Name] - [Dosage]\n3. [Medication Name] - [Dosage]\n\nInstructions:\n- Take as prescribed\n- Do not exceed recommended dosage\n- Consult doctor if side effects occur\n\n${"=".repeat(50)}`], {
        type: "text/plain",
      });
      element.href = URL.createObjectURL(file);
      element.download = `prescription-${selectedPrescriptionConsultation.id}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-text-primary">Telemedicine</h1>
        <p className="text-text-soft mt-1.5 text-[16px]">
          Connect with healthcare providers from the comfort of your home
        </p>
      </div>

      {/* Appointments Section */}
      <div className="card">
        <div className="border-b border-gray-200 mb-4">
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`pb-3 px-1 relative text-[15px] font-medium transition-colors ${
                activeTab === "upcoming" ? "text-primary" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Upcoming Appointments
              {activeTab === "upcoming" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab("past")}
              className={`pb-3 px-1 relative text-[15px] font-medium transition-colors ${
                activeTab === "past" ? "text-primary" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Past Consultations
              {activeTab === "past" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          </div>
        </div>

        {activeTab === "upcoming" && (
          <div className="space-y-3">
            {upcomingAppointments.length > 0 ? (
              upcomingAppointments.map((appointment) => {
                const Icon = getConsultationIcon(appointment.type);
                return (
                  <StaggerItem key={appointment.id}>
                    <div className="border border-gray-200 rounded-lg p-4 hover:border-primary/50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Icon className="w-6 h-6 text-primary" />
                          </div>

                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1">{appointment.doctor}</h3>
                            <p className="text-[14px] text-gray-600 mb-2">{appointment.specialty}</p>
                            <div className="flex items-center gap-4 text-[13px] text-gray-600">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {formatDate(appointment.date)}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {appointment.time} ({appointment.duration} min)
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                          <Badge variant="status" status="pending">
                            Scheduled
                          </Badge>
                          <div className="flex gap-2">
                            <Button 
                              variant="primary" 
                              size="sm"
                              onClick={() => {
                                const doctor = doctors.find(d => d.id === appointment.doctorId);
                                if (doctor) handleStartConsultation(doctor);
                              }}
                            >
                              Join Call
                            </Button>
                            <Button 
                              variant="secondary" 
                              size="sm"
                              onClick={() => handleReschedule(appointment)}
                            >
                              Reschedule
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </StaggerItem>
                );
              })
            ) : (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-600">No upcoming appointments</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "past" && (
          <div className="space-y-2">
            {pastConsultations.length > 0 ? (
              pastConsultations.map((consultation) => {
                const Icon = getConsultationIcon(consultation.type);
                return (
                  <StaggerItem key={consultation.id}>
                    <div className="border border-gray-200 rounded-lg p-3">
                      <div className="flex items-center justify-between gap-3">
                        {/* Left: Doctor Icon + Info */}
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Icon className="w-5 h-5 text-blue-600" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-[15px] font-semibold text-gray-900 truncate">{consultation.doctor}</p>
                            <p className="text-[14px] text-gray-600">{consultation.specialty}</p>
                            <p className="text-[14px] text-gray-500">{formatDate(consultation.date)} • {consultation.time}</p>
                          </div>
                        </div>

                        {/* Right: Status Badge + Action Buttons */}
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <Badge 
                            variant="status" 
                            status="active"
                            className="text-xs h-6 whitespace-nowrap"
                          >
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Completed
                          </Badge>
                          <div className="flex gap-1">
                            <Button 
                              size="sm"
                              variant="secondary"
                              onClick={() => handleOpenReportPreview(consultation)}
                              className="h-8 px-2 text-[11px]"
                            >
                              <FileText className="w-3.5 h-3.5" />
                            </Button>
                            {consultation.prescription && (
                              <Button 
                                size="sm"
                                variant="secondary"
                                onClick={() => handleOpenPrescriptionPreview(consultation)}
                                className="h-8 px-2 text-[11px]"
                              >
                                <Pill className="w-3.5 h-3.5" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </StaggerItem>
                );
              })
            ) : (
              <div className="text-center py-6">
                <FileText className="w-8 h-8 text-gray-300 mx-auto mb-1" />
                <p className="text-[14px] text-gray-600">No past consultations</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Quick Connect Banner */}
      <StaggerContainer>
        <StaggerItem>
          <div className="card overflow-hidden bg-gradient-to-br from-ocean-base via-ocean-mid to-ocean-dark text-white">
            <div className="p-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-2 flex-1">
                <div className="text-[12px] uppercase tracking-[0.2em] text-ocean-glow">Instant Care</div>
                <div className="text-2xl font-bold tracking-tight">Need Medical Advice Now?</div>
                <div className="text-[14px] text-ocean-glow/80">
                  Connect with a board-certified doctor in minutes. No appointment needed.
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="bg-white text-primary hover:bg-gray-50"
                    onClick={() => handleStartConsultation()}
                  >
                    <Video className="w-4 h-4 mr-2" />
                    Start Consultation
                  </Button>
                  <div className="flex items-center gap-2 text-[13px] text-ocean-glow/90">
                    <CheckCircle className="w-4 h-4" />
                    <span>2 doctors available now</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Video className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </StaggerItem>
      </StaggerContainer>

      {/* Specialties */}
      <div className="card">
        <h2 className="text-lg font-semibold text-text-primary mb-4">Browse by Specialty</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {SPECIALTY_CATEGORIES.map((specialty) => {
            const Icon = iconMap[specialty.icon];
            return (
              <button
                key={specialty.name}
                onClick={() => setSelectedSpecialty(selectedSpecialty === specialty.name ? "" : specialty.name)}
                className={`p-3 rounded-xl border-2 transition-all hover:shadow-md ${
                  selectedSpecialty === specialty.name
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center mb-2">
                  <Icon className={`w-5 h-5 ${specialty.color}`} />
                </div>
                <h3 className="font-semibold text-text-primary text-[14px]">{specialty.name}</h3>
              </button>
            );
          })}
        </div>
      </div>

      {/* Available Doctors */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-text-primary">
              Available Doctors
              {selectedSpecialty && (
                <span className="text-xs font-normal text-gray-500 ml-2">
                  · {doctors.length} {selectedSpecialty} specialists
                </span>
              )}
            </h2>
            {selectedSpecialty && (
              <button
                onClick={() => setSelectedSpecialty("")}
                className="text-xs text-primary hover:underline mt-1"
              >
                Clear filter
              </button>
            )}
          </div>
          <button onClick={() => setSelectedSpecialty("")} className="text-[15px] text-primary font-medium hover:underline flex items-center gap-1">
            View All
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <>
            {doctors.map((doctor) => (
              <StaggerItem key={doctor.id}>
                <div 
                  onClick={() => {
                    setSelectedDoctorForProfile(doctor);
                    setIsDoctorProfileOpen(true);
                  }}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-lg hover:border-primary/50 transition-all cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    {/* Left: Profile */}
                    <div className="relative flex-shrink-0">
                      <div className="w-14 h-14 bg-gradient-to-br from-primary to-ocean-bright rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {doctor.name.split(" ")[0]?.charAt(0)}
                        {doctor.name.split(" ")[1]?.charAt(0)}
                      </div>
                      {doctor.isAvailableNow && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                      )}
                    </div>

                    {/* Middle: Doctor Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-text-primary text-[15px] truncate">{doctor.name}</h3>
                        {doctor.isAvailableNow && (
                          <span className="text-[10px] bg-green-100 text-green-700 px-2 py-1 rounded whitespace-nowrap font-medium">
                            Online
                          </span>
                        )}
                      </div>
                      
                      <p className="text-text-soft mb-3 truncate text-[14px]">{doctor.specialty}</p>

                      <div className="flex items-center gap-2 text-[14px] mb-3 text-gray-600">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-warning fill-warning" />
                          <span className="font-semibold text-gray-900">{doctor.rating}</span>
                          <span className="text-gray-500">({doctor.reviewCount})</span>
                        </div>
                        <span className="text-gray-300">•</span>
                        <div className="flex items-center gap-1 text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>{doctor.averageWaitTime} wait</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                        <p className="text-[13px] text-gray-600">
                          <span className="font-medium">Next: </span>
                          {doctor.nextSlot}
                        </p>
                        <span className="text-[15px] font-bold text-primary">${doctor.consultationFee}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom: Actions */}
                  <div className="flex gap-2 mt-4" onClick={(e) => e.stopPropagation()}>
                    {doctor.isAvailableNow ? (
                      <Button 
                        variant="primary" 
                        size="sm"
                        onClick={() => handleStartConsultation(doctor)}
                        className="flex-1 h-9 text-[13px]"
                      >
                        <Video className="w-4 h-4 mr-1" />
                        Connect Now
                      </Button>
                    ) : (
                      <Button 
                        variant="secondary" 
                        size="sm"
                        onClick={() => handleSchedule(doctor)}
                        className="flex-1 h-9 text-[13px]"
                      >
                        <Calendar className="w-4 h-4 mr-1" />
                        Schedule
                      </Button>
                    )}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </>
        </div>
        
        {doctors.length === 0 && selectedSpecialty && (
          <div className="text-center py-12">
            <Stethoscope className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No {selectedSpecialty} specialists available
            </h3>
            <p className="text-gray-600 mb-4">
              Try selecting a different specialty or browse all available doctors
            </p>
            <Button variant="secondary" onClick={() => setSelectedSpecialty("")}>
              View All Doctors
            </Button>
          </div>
        )}
      </div>

      {/* Doctor Profile Modal */}
      {isDoctorProfileOpen && selectedDoctorForProfile && (
        <Modal isOpen={isDoctorProfileOpen} onClose={() => setIsDoctorProfileOpen(false)} title="" size="lg">
          <div className="space-y-6">
            {/* Doctor Header */}
            <div className="flex items-start gap-6 pb-6 border-b border-gray-200">
              <div className="relative flex-shrink-0">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-ocean-bright rounded-full flex items-center justify-center text-white font-bold text-2xl">
                  {selectedDoctorForProfile.name.split(" ")[0]?.charAt(0)}
                  {selectedDoctorForProfile.name.split(" ")[1]?.charAt(0)}
                </div>
                {selectedDoctorForProfile.isAvailableNow && (
                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-3 border-white rounded-full" />
                )}
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-text-primary mb-1">{selectedDoctorForProfile.name}</h1>
                <p className="text-[15px] text-text-soft mb-3">{selectedDoctorForProfile.specialty}</p>
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-warning fill-warning" />
                    <span className="font-semibold text-text-primary text-[14px]">{selectedDoctorForProfile.rating}</span>
                    <span className="text-text-soft text-[14px]">({selectedDoctorForProfile.reviewCount} reviews)</span>
                  </div>
                </div>
                {selectedDoctorForProfile.isAvailableNow && (
                  <span className="inline-block text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                    ✓ Online Now
                  </span>
                )}
              </div>
            </div>

            {/* Doctor Details */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 uppercase font-semibold mb-2">Consultation Fee</p>
                <p className="text-2xl font-bold text-primary">${selectedDoctorForProfile.consultationFee}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 uppercase font-semibold mb-2">Avg. Wait Time</p>
                <p className="text-xl font-bold text-text-primary">{selectedDoctorForProfile.averageWaitTime}</p>
              </div>
            </div>

            {/* Experience & Qualifications */}
            <div>
              <h2 className="text-lg font-semibold text-text-primary mb-3">Experience & Qualifications</h2>
              <div className="space-y-2 text-[14px] text-gray-700">
                <p>• <span className="font-medium">License:</span> Medical License #ML-{selectedDoctorForProfile.id.toUpperCase()}</p>
                <p>• <span className="font-medium">Experience:</span> 12+ years in {selectedDoctorForProfile.specialty}</p>
                <p>• <span className="font-medium">Education:</span> MD from prestigious medical institute</p>
                <p>• <span className="font-medium">Certifications:</span> Board certified, Continuing Medical Education</p>
              </div>
            </div>

            {/* Hospital/Clinic */}
            <div>
              <h2 className="text-lg font-semibold text-text-primary mb-3">Hospital & Clinic</h2>
              <div className="p-4 border border-gray-200 rounded-lg">
                <p className="text-[15px] font-semibold text-text-primary mb-2">{selectedDoctorForProfile.hospital?.name || "N/A"}</p>
                <p className="text-[14px] text-text-soft mb-3">{selectedDoctorForProfile.hospital?.address || "N/A"}</p>
                <p className="text-[14px] text-gray-500">📞 {selectedDoctorForProfile.hospital?.phone || "N/A"}</p>
              </div>
            </div>

            {/* Reviews */}
            <div>
              <h2 className="text-lg font-semibold text-text-primary mb-3">Patient Reviews</h2>
              <div className="space-y-3">
                {(selectedDoctorForProfile.reviews || []).map((review, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-text-primary text-[13px]">{review.name}</span>
                      <div className="flex gap-0.5">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 text-warning fill-warning" />
                        ))}
                      </div>
                    </div>
                    <p className="text-[13px] text-text-soft">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              {selectedDoctorForProfile.isAvailableNow ? (
                <>
                  <Button 
                    variant="primary" 
                    className="flex-1 h-11 text-[15px]"
                    onClick={() => {
                      handleStartConsultation(selectedDoctorForProfile);
                      setIsDoctorProfileOpen(false);
                    }}
                  >
                    <Video className="w-5 h-5 mr-2" />
                    Connect Now
                  </Button>
                  <Button 
                    variant="secondary" 
                    className="flex-1 h-11 text-[15px]"
                    onClick={() => {
                      handleSchedule(selectedDoctorForProfile);
                      setIsDoctorProfileOpen(false);
                    }}
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Schedule
                  </Button>
                </>
              ) : (
                <Button 
                  variant="primary" 
                  className="w-full h-11 text-[15px]"
                  onClick={() => {
                    handleSchedule(selectedDoctorForProfile);
                    setIsDoctorProfileOpen(false);
                  }}
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Schedule Appointment
                </Button>
              )}
            </div>
          </div>
        </Modal>
      )}

      {/* How It Works */}
      <div className="card bg-gradient-to-br from-gray-50 to-white">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">How Telemedicine Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Calendar className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">1. Choose & Schedule</h3>
            <p className="text-[14px] text-gray-600">
              Select a doctor and pick a time that works for you, or connect instantly
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Video className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">2. Connect Securely</h3>
            <p className="text-[14px] text-gray-600">
              Join your video consultation from any device with a secure connection
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <FileText className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">3. Get Care & Prescriptions</h3>
            <p className="text-[14px] text-gray-600">
              Receive diagnosis, treatment plans, and prescriptions sent to your pharmacy
            </p>
          </div>
        </div>
      </div>

      {/* Video Call Modal */}
      <Modal isOpen={isVideoCallOpen} onClose={handleEndCall} title="">
        <div className="bg-gray-900 rounded-xl overflow-hidden">
          {/* Video Feed */}
          <div className="relative aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {selectedDoctor?.name || "Doctor"}
                </h3>
                <p className="text-gray-400">{selectedDoctor?.specialty || "Specialist"}</p>
                <div className="mt-4 flex items-center justify-center gap-2">
                  <div className="w-3 h-3 bg-success rounded-full animate-pulse" />
                  <span className="text-green-400 text-sm">Connected</span>
                </div>
              </div>
            </div>
            
            {/* Self Video (Picture in Picture) */}
            <div className="absolute bottom-4 right-4 w-32 h-24 bg-gray-700 rounded-lg overflow-hidden border-2 border-white/20">
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-ocean-mid to-ocean-dark">
                {isVideoOff ? (
                  <VideoOff className="w-8 h-8 text-white/60" />
                ) : (
                  <User className="w-8 h-8 text-white/60" />
                )}
              </div>
            </div>

            {/* Call Duration */}
            <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
              <span className="text-white text-sm font-medium">00:00</span>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-gray-800 p-6">
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${
                  isMuted ? "bg-danger hover:bg-danger/80" : "bg-gray-700 hover:bg-gray-600"
                }`}
              >
                {isMuted ? (
                  <MicOff className="w-6 h-6 text-white" />
                ) : (
                  <Mic className="w-6 h-6 text-white" />
                )}
              </button>

              <button
                onClick={() => setIsVideoOff(!isVideoOff)}
                className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${
                  isVideoOff ? "bg-danger hover:bg-danger/80" : "bg-gray-700 hover:bg-gray-600"
                }`}
              >
                {isVideoOff ? (
                  <VideoOff className="w-6 h-6 text-white" />
                ) : (
                  <Video className="w-6 h-6 text-white" />
                )}
              </button>

              <button
                onClick={handleEndCall}
                className="w-14 h-14 bg-danger hover:bg-danger/80 rounded-full flex items-center justify-center transition-colors"
              >
                <Phone className="w-6 h-6 text-white transform rotate-135" />
              </button>

              <button className="w-14 h-14 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors">
                <MessageSquare className="w-6 h-6 text-white" />
              </button>
            </div>

            <p className="text-center text-gray-400 text-sm mt-4">
              Consultation Fee: ${selectedDoctor?.consultationFee || 0}
            </p>
          </div>
        </div>
      </Modal>

      {/* Schedule Appointment Modal */}
      <Modal 
        isOpen={isScheduleOpen} 
        onClose={() => setIsScheduleOpen(false)} 
        title="Schedule Appointment"
      >
        <div className="space-y-4">
          {selectedDoctor && (
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-ocean-bright rounded-full flex items-center justify-center text-white text-lg font-bold">
                {selectedDoctor.name.split(" ")[1]?.charAt(0)}
                {selectedDoctor.name.split(" ")[0]?.charAt(2)}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">{selectedDoctor.name}</h4>
                <p className="text-sm text-gray-600">{selectedDoctor.specialty}</p>
                <p className="text-sm text-primary font-medium mt-1">
                  ${selectedDoctor.consultationFee} consultation
                </p>
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Date
            </label>
            <input
              type="date"
              value={scheduledDate}
              onChange={(e) => setScheduledDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Time
            </label>
            <select
              value={scheduledTime}
              onChange={(e) => setScheduledTime(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Choose a time slot</option>
              {TIME_SLOTS.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-700">
                You&apos;ll receive a confirmation email with a link to join the video consultation.
              </p>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              variant="secondary"
              className="flex-1"
              onClick={() => setIsScheduleOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              className="flex-1"
              onClick={handleConfirmSchedule}
              disabled={!scheduledDate || !scheduledTime}
            >
              Confirm Booking
            </Button>
          </div>
        </div>
      </Modal>

      {/* Reschedule Appointment Modal */}
      <Modal 
        isOpen={isRescheduleOpen} 
        onClose={() => setIsRescheduleOpen(false)} 
        title="Reschedule Appointment"
      >
        <div className="space-y-4">
          {selectedAppointment && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-1">Current Appointment</h4>
              <p className="text-sm text-gray-600">{selectedAppointment.doctor}</p>
              <p className="text-sm text-gray-600">
                {formatDate(selectedAppointment.date)} at {selectedAppointment.time}
              </p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Date
            </label>
            <input
              type="date"
              value={scheduledDate}
              onChange={(e) => setScheduledDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Time
            </label>
            <select
              value={scheduledTime}
              onChange={(e) => setScheduledTime(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Choose a time slot</option>
              {TIME_SLOTS.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              variant="danger"
              className="flex-1"
              onClick={() => {
                if (selectedAppointment) {
                  handleCancelAppointment(selectedAppointment.id);
                  setIsRescheduleOpen(false);
                }
              }}
            >
              Cancel Appointment
            </Button>
            <Button
              variant="primary"
              className="flex-1"
              onClick={handleConfirmReschedule}
              disabled={!scheduledDate || !scheduledTime}
            >
              Reschedule
            </Button>
          </div>
        </div>
      </Modal>

      {/* Report Preview Modal */}
      <Modal 
        isOpen={isReportPreviewOpen} 
        onClose={() => {
          setIsReportPreviewOpen(false);
          setSelectedReportConsultation(null);
        }} 
        title="Consultation Report"
      >
        {selectedReportConsultation && (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-lg p-6">
              <div className="space-y-4">
                {/* Header */}
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Medical Consultation Report</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Date of Consultation</p>
                      <p className="font-semibold text-gray-900">{formatDate(selectedReportConsultation.date)}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Time</p>
                      <p className="font-semibold text-gray-900">{selectedReportConsultation.time}</p>
                    </div>
                  </div>
                </div>

                {/* Doctor Information */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">Physician</h4>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="font-semibold text-gray-900">{selectedReportConsultation.doctor}</p>
                    <p className="text-sm text-gray-600">{selectedReportConsultation.specialty}</p>
                  </div>
                </div>

                {/* Consultation Details */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">Consultation Details</h4>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Duration</p>
                      <p className="font-medium text-gray-900">{selectedReportConsultation.duration} minutes</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Type</p>
                      <p className="font-medium text-gray-900 capitalize">{selectedReportConsultation.type} Consultation</p>
                    </div>
                    {selectedReportConsultation.notes && (
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Notes</p>
                        <div className="bg-white border border-gray-200 rounded p-2">
                          <p className="text-sm text-gray-700">{selectedReportConsultation.notes}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Follow-up */}
                {selectedReportConsultation.notes && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                    <p className="text-sm font-medium text-amber-900">📌 Follow-up Required</p>
                    <p className="text-xs text-amber-800 mt-1">{selectedReportConsultation.notes}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                variant="secondary"
                className="flex-1"
                onClick={() => {
                  setIsReportPreviewOpen(false);
                  setSelectedReportConsultation(null);
                }}
              >
                Close
              </Button>
              <Button
                variant="primary"
                className="flex-1"
                onClick={handleDownloadReport}
              >
                <Download className="w-4 h-4 mr-2" />
                Download Report
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Prescription Preview Modal */}
      <Modal 
        isOpen={isPrescriptionPreviewOpen} 
        onClose={() => {
          setIsPrescriptionPreviewOpen(false);
          setSelectedPrescriptionConsultation(null);
        }} 
        title="Prescription"
      >
        {selectedPrescriptionConsultation && (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-lg p-6">
              <div className="space-y-4">
                {/* Header */}
                <div className="border-b-2 border-purple-200 pb-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Prescription</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Date Of Issue</p>
                      <p className="font-semibold text-gray-900">{formatDate(selectedPrescriptionConsultation.date)}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Time</p>
                      <p className="font-semibold text-gray-900">{selectedPrescriptionConsultation.time}</p>
                    </div>
                  </div>
                </div>

                {/* Prescribing Doctor */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">Prescribed By</h4>
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                    <p className="font-semibold text-gray-900">{selectedPrescriptionConsultation.doctor}</p>
                    <p className="text-sm text-gray-600">{selectedPrescriptionConsultation.specialty}</p>
                  </div>
                </div>

                {/* Medications */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">Medications</h4>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3">
                    <div className="border-l-4 border-purple-500 pl-3 py-1">
                      <p className="text-sm font-medium text-gray-900">Medication Name</p>
                      <p className="text-xs text-gray-600">Dosage & Instructions</p>
                    </div>
                    <div className="border-l-4 border-purple-500 pl-3 py-1">
                      <p className="text-sm font-medium text-gray-900">Medication Name</p>
                      <p className="text-xs text-gray-600">Dosage & Instructions</p>
                    </div>
                    <div className="border-l-4 border-purple-500 pl-3 py-1">
                      <p className="text-sm font-medium text-gray-900">Medication Name</p>
                      <p className="text-xs text-gray-600">Dosage & Instructions</p>
                    </div>
                  </div>
                </div>

                {/* Important Notes */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-sm font-medium text-red-900">⚠️ Important</p>
                  <ul className="text-xs text-red-800 mt-2 space-y-1 ml-4 list-disc">
                    <li>Take medications as prescribed only</li>
                    <li>Do not exceed recommended dosage</li>
                    <li>Consult doctor if side effects occur</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                variant="secondary"
                className="flex-1"
                onClick={() => {
                  setIsPrescriptionPreviewOpen(false);
                  setSelectedPrescriptionConsultation(null);
                }}
              >
                Close
              </Button>
              <Button
                variant="primary"
                className="flex-1"
                onClick={handleDownloadPrescription}
              >
                <Download className="w-4 h-4 mr-2" />
                Download Prescription
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
