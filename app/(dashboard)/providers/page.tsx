"use client";

import { useState } from "react";
import {
  Search,
  MapPin,
  Star,
  Phone,
  Filter,
  Hospital,
  Stethoscope,
  Calendar,
  Clock,
  ChevronDown,
  X,
  Navigation,
  Award,
  CheckCircle,
  Building2,
  User,
  Activity,
  Globe,
} from "lucide-react";
import { formatPhone } from "@/lib/utils";
import { Button, Badge } from "@/components/ui";
import { StaggerContainer, StaggerItem } from "@/components/shared/StaggerAnimation";

// Enhanced mock data with hospitals
const mockHospitals = [
  {
    id: "h1",
    name: "Springfield General Hospital",
    type: "hospital" as const,
    category: "General Hospital",
    phone: "5551234567",
    address: { street: "789 Medical Center Drive", city: "Springfield", state: "IL", zipCode: "62701" },
    distance: 3.2,
    rating: 4.7,
    reviewCount: 2456,
    inNetwork: true,
    emergencyServices: true,
    beds: 450,
    specialties: ["Cardiology", "Oncology", "Neurology", "Orthopedics", "Pediatrics"],
    facilities: ["ICU", "Emergency Room", "Surgery Center", "Diagnostic Imaging"],
    hours: "24/7 Emergency Services",
    certifications: ["Joint Commission Accredited", "Trauma Level II"],
  },
  {
    id: "h2",
    name: "MediCare Specialty Center",
    type: "hospital" as const,
    category: "Specialty Hospital",
    phone: "5559876543",
    address: { street: "456 Healthcare Blvd", city: "Springfield", state: "IL", zipCode: "62702" },
    distance: 5.8,
    rating: 4.9,
    reviewCount: 1834,
    inNetwork: true,
    emergencyServices: false,
    beds: 180,
    specialties: ["Cardiology", "Orthopedics", "Sports Medicine"],
    facilities: ["Surgery Center", "Physical Therapy"],
    hours: "Mon-Sat: 7 AM - 8 PM",
    certifications: ["CARF Accredited"],
  },
];

// Enhanced mock data with doctors
const mockDoctors = [
  {
    id: "d1",
    name: "Dr. Denil M",
    specialty: "Cardiology",
    subSpecialty: "Interventional Cardiology",
    phone: "5551234567",
    hospitalName: "Springfield General Hospital",
    address: { street: "789 Medical Center Drive, Suite 400", city: "Springfield", state: "IL", zipCode: "62701" },
    distance: 3.2,
    rating: 4.9,
    reviewCount: 342,
    acceptingNewPatients: true,
    inNetwork: true,
    languages: ["English", "Spanish", "Hindi"],
    yearsOfExperience: 15,
    boardCertified: true,
    treatmentAreas: ["Heart Disease", "Coronary Artery Disease", "Heart Failure"],
    nextAvailable: "Tomorrow, 2:30 PM",
  },
  {
    id: "d2",
    name: "Dr. Dency Ch",
    specialty: "Orthopedic Surgery",
    subSpecialty: "Sports Medicine",
    phone: "5559876543",
    hospitalName: "MediCare Specialty Center",
    address: { street: "456 Healthcare Blvd, Suite 200", city: "Springfield", state: "IL", zipCode: "62702" },
    distance: 5.8,
    rating: 4.8,
    reviewCount: 289,
    acceptingNewPatients: true,
    inNetwork: true,
    languages: ["English", "Spanish", "French"],
    yearsOfExperience: 12,
    boardCertified: true,
    treatmentAreas: ["ACL Repair", "Joint Replacement", "Sports Injuries"],
    nextAvailable: "Feb 21, 10:00 AM",
  },
  {
    id: "d3",
    name: "Dr. Jolly Vargh",
    specialty: "Cardiology",
    subSpecialty: "Electrophysiology",
    phone: "5552468135",
    hospitalName: "Heart & Vascular Institute",
    address: { street: "321 Cardiac Way, 3rd Floor", city: "Springfield", state: "IL", zipCode: "62703" },
    distance: 4.5,
    rating: 4.9,
    reviewCount: 215,
    acceptingNewPatients: false,
    inNetwork: true,
    languages: ["English", "Mandarin"],
    yearsOfExperience: 18,
    boardCertified: true,
    treatmentAreas: ["Atrial Fibrillation", "Pacemaker Implantation", "Arrhythmia"],
    nextAvailable: "Not accepting new patients",
  },
];

const specialties = ["All Specialties", "Cardiology", "Orthopedic Surgery", "Neurology", "Oncology"];
const treatments = ["Heart Disease", "Joint Replacement", "Sports Injuries", "Diabetes Care"];

type SearchMode = "provider" | "hospital" | "treatment";

export default function ProvidersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchMode, setSearchMode] = useState<SearchMode>("provider");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Specialties");
  const [selectedTreatment, setSelectedTreatment] = useState("");
  const [inNetworkOnly, setInNetworkOnly] = useState(true);
  const [acceptingNewOnly, setAcceptingNewOnly] = useState(false);
  const [sortBy, setSortBy] = useState<"distance" | "rating">("distance");
  const [showFilters, setShowFilters] = useState(false);

  // Filter logic
  const filteredDoctors = mockDoctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.hospitalName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = selectedSpecialty === "All Specialties" || doctor.specialty === selectedSpecialty;
    const matchesTreatment =
      !selectedTreatment || doctor.treatmentAreas.some((t) => t.toLowerCase().includes(selectedTreatment.toLowerCase()));
    const matchesNetwork = !inNetworkOnly || doctor.inNetwork;
    const matchesAccepting = !acceptingNewOnly || doctor.acceptingNewPatients;
    return matchesSearch && matchesSpecialty && matchesTreatment && matchesNetwork && matchesAccepting;
  });

  const filteredHospitals = mockHospitals.filter((hospital) => {
    const matchesSearch =
      hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hospital.specialties.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesSpecialty = selectedSpecialty === "All Specialties" || hospital.specialties.includes(selectedSpecialty);
    const matchesNetwork = !inNetworkOnly || hospital.inNetwork;
    return matchesSearch && matchesSpecialty && matchesNetwork;
  });

  const sortedDoctors = [...filteredDoctors].sort((a, b) =>
    sortBy === "distance" ? a.distance - b.distance : b.rating - a.rating
  );

  const sortedHospitals = [...filteredHospitals].sort((a, b) =>
    sortBy === "distance" ? a.distance - b.distance : b.rating - a.rating
  );

  const results = searchMode === "hospital" ? sortedHospitals : sortedDoctors;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Find Healthcare Providers</h1>
        <p className="text-[16px] text-gray-600 mt-1">
          Search for in-network doctors, hospitals, and healthcare facilities near you
        </p>
      </div>

      <div className="card">
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => {
              setSearchMode("provider");
              setSearchQuery("");
              setSelectedTreatment("");
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-[15px] font-medium transition-all ${
              searchMode === "provider"
                ? "bg-primary text-white shadow-sm"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Stethoscope className="w-4 h-4" />
            Find Doctors
          </button>
          <button
            onClick={() => {
              setSearchMode("hospital");
              setSearchQuery("");
              setSelectedTreatment("");
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-[15px] font-medium transition-all ${
              searchMode === "hospital"
                ? "bg-primary text-white shadow-sm"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Building2 className="w-4 h-4" />
            Find Hospitals
          </button>
          <button
            onClick={() => {
              setSearchMode("treatment");
              setSearchQuery("");
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-[15px] font-medium transition-all ${
              searchMode === "treatment"
                ? "bg-primary text-white shadow-sm"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Activity className="w-4 h-4" />
            Search by Treatment
          </button>
        </div>

        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder={
                searchMode === "hospital"
                  ? "Search hospitals by name or specialty..."
                  : searchMode === "treatment"
                  ? "Search by condition or treatment..."
                  : "Search by doctor name, specialty, or hospital..."
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-10 pr-10"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
          <Button variant="primary" className="px-8">
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </div>

        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-[15px] font-medium text-gray-700 hover:text-gray-900"
            >
              <Filter className="w-4 h-4" />
              Filters & Sort
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
            </button>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={inNetworkOnly}
                  onChange={(e) => setInNetworkOnly(e.target.checked)}
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <span className="text-[15px] text-gray-700">In-network only</span>
              </label>

              {searchMode === "provider" && (
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={acceptingNewOnly}
                    onChange={(e) => setAcceptingNewOnly(e.target.checked)}
                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <span className="text-[15px] text-gray-700">Accepting new patients</span>
                </label>
              )}
            </div>
          </div>

          {showFilters && (
            <StaggerContainer className="pt-3 border-t border-gray-200 space-y-3">
              <StaggerItem>
                <div>
                  <label className="block text-[14px] font-medium text-gray-700 mb-2">Specialty</label>
                  <div className="flex flex-wrap gap-2">
                    {specialties.map((specialty) => (
                      <button
                        key={specialty}
                        onClick={() => setSelectedSpecialty(specialty)}
                        className={`px-3 py-1.5 rounded-full text-[14px] transition-colors ${
                          selectedSpecialty === specialty
                            ? "bg-primary text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {specialty}
                      </button>
                    ))}
                  </div>
                </div>
              </StaggerItem>

              {searchMode === "treatment" && (
                <StaggerItem>
                  <div>
                    <label className="block text-[14px] font-medium text-gray-700 mb-2">
                      Common Treatments & Conditions
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {treatments.map((treatment) => (
                        <button
                          key={treatment}
                          onClick={() => setSelectedTreatment(treatment === selectedTreatment ? "" : treatment)}
                          className={`px-3 py-1.5 rounded-full text-[14px] transition-colors ${
                            selectedTreatment === treatment
                              ? "bg-success text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {treatment}
                        </button>
                      ))}
                    </div>
                  </div>
                </StaggerItem>
              )}

              <StaggerItem>
                <div>
                  <label className="block text-[14px] font-medium text-gray-700 mb-2">Sort by</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSortBy("distance")}
                      className={`px-4 py-2 rounded-lg text-[14px] transition-colors ${
                        sortBy === "distance"
                          ? "bg-primary text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      Distance
                    </button>
                    <button
                      onClick={() => setSortBy("rating")}
                      className={`px-4 py-2 rounded-lg text-[14px] transition-colors ${
                        sortBy === "rating" ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      Rating
                    </button>
                  </div>
                </div>
              </StaggerItem>
            </StaggerContainer>
          )}
        </div>
      </div>

      <div className="card">
        <div className="bg-gradient-to-br from-primary/5 to-ocean-bright/10 rounded-lg h-64 flex items-center justify-center border border-primary/10">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-primary mx-auto mb-3" />
            <p className="text-lg font-semibold text-gray-900">Interactive Map View</p>
            <p className="text-[15px] text-gray-600 mt-1">Provider locations will be displayed on the map</p>
            <Button variant="primary" size="sm" className="mt-3">
              <Navigation className="w-4 h-4 mr-2" />
              Enable Location
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            {results.length} {searchMode === "hospital" ? "Hospitals" : "Providers"} Found
          </h2>
          <span className="text-[15px] text-gray-600">
            Sorted by {sortBy === "distance" ? "Distance" : "Rating"}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {searchMode === "hospital"
            ? sortedHospitals.map((hospital) => (
                <StaggerItem key={hospital.id}>
                  <div className="card hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-primary to-ocean-bright rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-sm">
                        <Building2 className="w-10 h-10" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-bold text-gray-900 mb-1">{hospital.name}</h3>
                            <p className="text-[15px] text-gray-600 mb-2">{hospital.category}</p>
                            <div className="flex items-center gap-4 flex-wrap">
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-warning fill-warning" />
                                <span className="font-semibold text-gray-900">{hospital.rating}</span>
                                <span className="text-[14px] text-gray-600">({hospital.reviewCount} reviews)</span>
                              </div>
                              <div className="flex items-center gap-1 text-[14px] text-gray-600">
                                <MapPin className="w-4 h-4" />
                                {hospital.distance} miles away
                              </div>
                              {hospital.emergencyServices && (
                                <Badge className="bg-danger-light text-danger border border-danger/20">
                                  24/7 Emergency
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            {hospital.inNetwork && (
                              <Badge variant="status" status="active">
                                In Network
                              </Badge>
                            )}
                            <span className="text-[13px] text-gray-600">{hospital.beds} beds</span>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <p className="text-[14px] text-gray-600 flex items-start gap-2">
                              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                              {hospital.address.street}, {hospital.address.city}, {hospital.address.state}{" "}
                              {hospital.address.zipCode}
                            </p>
                          </div>

                          <div>
                            <p className="text-[13px] font-medium text-gray-700 mb-1.5">Specialties:</p>
                            <div className="flex flex-wrap gap-1.5">
                              {hospital.specialties.map((specialty) => (
                                <span
                                  key={specialty}
                                  className="px-2.5 py-1 bg-primary/10 text-primary rounded-full text-[12px] font-medium"
                                >
                                  {specialty}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3 text-[13px]">
                            <div className="flex items-start gap-2">
                              <Clock className="w-4 h-4 text-gray-500 mt-0.5" />
                              <div>
                                <span className="font-medium text-gray-700">Hours:</span>
                                <span className="text-gray-600 ml-1">{hospital.hours}</span>
                              </div>
                            </div>
                            <div className="flex items-start gap-2">
                              <Award className="w-4 h-4 text-gray-500 mt-0.5" />
                              <div>
                                <span className="font-medium text-gray-700">Certifications:</span>
                                <span className="text-gray-600 ml-1">{hospital.certifications[0]}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-3 mt-4 pt-4 border-t border-gray-200">
                          <Button variant="primary" size="sm" className="flex-1">
                            <Hospital className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                          <Button variant="secondary" size="sm" className="flex-1">
                            <Phone className="w-4 h-4 mr-2" />
                            {formatPhone(hospital.phone)}
                          </Button>
                          <Button variant="secondary" size="sm" className="flex-1">
                            <Navigation className="w-4 h-4 mr-2" />
                            Get Directions
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))
            : sortedDoctors.map((doctor) => (
                <StaggerItem key={doctor.id}>
                  <div className="card hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-primary to-ocean-bright rounded-xl flex items-center justify-center text-white text-2xl font-bold flex-shrink-0 shadow-sm">
                        {doctor.name.split(" ")[1]?.charAt(0)}
                        {doctor.name.split(" ")[0]?.charAt(2)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-bold text-gray-900 mb-0.5">{doctor.name}</h3>
                            <p className="text-[15px] font-medium text-gray-700">{doctor.specialty}</p>
                            {doctor.subSpecialty && (
                              <p className="text-[14px] text-gray-600">{doctor.subSpecialty}</p>
                            )}
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            {doctor.inNetwork && (
                              <Badge variant="status" status="active">
                                In Network
                              </Badge>
                            )}
                            {doctor.boardCertified && (
                              <Badge className="bg-ocean-bright/10 text-primary border border-primary/20">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Board Certified
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center gap-4 flex-wrap text-[14px]">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-warning fill-warning" />
                              <span className="font-semibold text-gray-900">{doctor.rating}</span>
                              <span className="text-gray-600">({doctor.reviewCount} reviews)</span>
                            </div>
                            <div className="flex items-center gap-1 text-gray-600">
                              <MapPin className="w-4 h-4" />
                              {doctor.distance} miles away
                            </div>
                            <div className="flex items-center gap-1 text-gray-600">
                              <Award className="w-4 h-4" />
                              {doctor.yearsOfExperience} years exp.
                            </div>
                          </div>

                          <div className="flex items-start gap-2 text-[14px]">
                            <Building2 className="w-4 h-4 text-gray-500 mt-0.5" />
                            <div>
                              <p className="font-medium text-gray-900">{doctor.hospitalName}</p>
                              <p className="text-gray-600">
                                {doctor.address.street}, {doctor.address.city}
                              </p>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div className="flex items-start gap-2 text-[13px]">
                              <Calendar className="w-4 h-4 text-gray-500 mt-0.5" />
                              <div>
                                <span className="font-medium text-gray-700">Next Available:</span>
                                <span
                                  className={`ml-1 ${
                                    doctor.acceptingNewPatients ? "text-success font-medium" : "text-gray-600"
                                  }`}
                                >
                                  {doctor.nextAvailable}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-start gap-2 text-[13px]">
                              <Globe className="w-4 h-4 text-gray-500 mt-0.5" />
                              <div>
                                <span className="font-medium text-gray-700">Languages:</span>
                                <span className="text-gray-600 ml-1">{doctor.languages.slice(0, 2).join(", ")}</span>
                              </div>
                            </div>
                          </div>

                          {(searchMode === "treatment" || selectedTreatment) && doctor.treatmentAreas.length > 0 && (
                            <div>
                              <p className="text-[13px] font-medium text-gray-700 mb-1.5">Treatment Areas:</p>
                              <div className="flex flex-wrap gap-1.5">
                                {doctor.treatmentAreas.slice(0, 4).map((treatment) => (
                                  <span
                                    key={treatment}
                                    className="px-2.5 py-1 bg-success/10 text-success rounded-full text-[12px] font-medium"
                                  >
                                    {treatment}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {doctor.acceptingNewPatients ? (
                            <Badge className="bg-green-50 text-success border border-success/20">
                              <CheckCircle className="w-3.5 h-3.5 mr-1" />
                              Accepting New Patients
                            </Badge>
                          ) : (
                            <Badge className="bg-gray-100 text-gray-600">Not Accepting New Patients</Badge>
                          )}
                        </div>

                        <div className="flex gap-3 mt-4 pt-4 border-t border-gray-200">
                          <Button variant="primary" size="sm" className="flex-1">
                            <User className="w-4 h-4 mr-2" />
                            View Profile
                          </Button>
                          {doctor.acceptingNewPatients && (
                            <Button variant="secondary" size="sm" className="flex-1">
                              <Calendar className="w-4 h-4 mr-2" />
                              Book Appointment
                            </Button>
                          )}
                          <Button variant="secondary" size="sm" className="flex-1">
                            <Phone className="w-4 h-4 mr-2" />
                            Call
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
        </div>

        {results.length === 0 && (
          <div className="card py-12 text-center">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Results Found</h3>
            <p className="text-gray-600">
              Try adjusting your filters or search terms to find what you're looking for
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
