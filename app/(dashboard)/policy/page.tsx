"use client";

import { useState } from "react";
import {
  Download,
  Users,
  TrendingUp,
  AlertTriangle,
  Shield,
  HeartPulse,
  Stethoscope,
  Pill,
  Activity,
  Eye,
  Globe,
  Check,
  X,
  FileText,
  UserPlus,
  Hospital,
  Siren,
  Smile,
  Glasses,
} from "lucide-react";
import { Policy } from "@/lib/types";
import { formatCurrency, formatDate, calculatePercentage } from "@/lib/utils";
import { Button, Badge } from "@/components/ui";
import { StaggerContainer, StaggerItem } from "@/components/shared/StaggerAnimation";

// Mock policy data
const mockPolicy: Policy = {
  id: "1",
  policyNumber: "POL-123456",
  planName: "Premium Health Plus",
  planType: "PPO",
  status: "active",
  effectiveDate: "2026-01-01",
  renewalDate: "2026-12-31",
  premium: 450,
  deductible: 2000,
  deductibleUsed: 750,
  outOfPocketMax: 6000,
  outOfPocketUsed: 1200,
  coverages: [
    { id: "1", category: "Medical", description: "Inpatient & Outpatient", limit: 100000, used: 5000, copay: 30 },
    { id: "2", category: "Prescription", description: "Generic & Brand", limit: 10000, used: 1200, copay: 10 },
    { id: "3", category: "Dental", description: "Preventive & Restorative", limit: 2000, used: 450 },
    { id: "4", category: "Vision", description: "Eye Exams & Glasses", limit: 500, used: 150 },
  ],
  dependents: [
    {
      id: "1",
      firstName: "Jane",
      lastName: "Doe",
      relationship: "Spouse",
      dateOfBirth: "1992-05-15",
      memberId: "MEM-2024-002",
      status: "active",
    },
    {
      id: "2",
      firstName: "Emily",
      lastName: "Doe",
      relationship: "Daughter",
      dateOfBirth: "2018-08-22",
      memberId: "MEM-2024-003",
      status: "active",
    },
  ],
  documents: [
    {
      id: "1",
      name: "Policy Document 2024",
      type: "pdf",
      url: "#",
      uploadedAt: "2026-01-01",
    },
    {
      id: "2",
      name: "Benefits Summary",
      type: "pdf",
      url: "#",
      uploadedAt: "2026-01-01",
    },
  ],
  createdAt: "2024-01-01",
  updatedAt: "2024-01-01",
};

export default function PolicyPage() {
  const policy = mockPolicy;
  
  const now = new Date("2026-02-18");
  const renewalDate = new Date(policy.renewalDate);
  const daysToRenewal = Math.max(
    0,
    Math.ceil((renewalDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  );

  const members = [
    {
      id: "1",
      name: "Johnson",
      relationship: "Policy Holder · Self",
      status: "active",
      initials: "JO",
      memberId: "MEM-2026-001",
    },
    {
      id: "2",
      name: "Anaha",
      relationship: "Spouse · 1992-05-15",
      status: "active",
      initials: "AN",
      memberId: "MEM-2026-002",
    },
    {
      id: "3",
      name: "Zia Anaha",
      relationship: "Dependent · 2018-08-22",
      status: "active",
      initials: "ZA",
      memberId: "MEM-2026-003",
    },
  ];

  const initialRiders = [
    {
      id: "critical",
      name: "Critical Illness",
      description: "Lump-sum on diagnosis of cancer, stroke, heart attack",
      coverage: "$50,000",
      waiting: "90 days",
      copay: "—",
      status: "active",
      price: "+$30/mo",
      monthlyCost: 30,
      icon: HeartPulse,
      color: "text-purple-600 bg-purple-50",
    },
    {
      id: "maternity",
      name: "Maternity Plus",
      description: "Pre-natal, delivery, and 30-day newborn care",
      coverage: "$30,000",
      waiting: "12 months",
      copay: "10%",
      status: "active",
      price: "+$35/mo",
      monthlyCost: 35,
      icon: HeartPulse,
      color: "text-rose-600 bg-rose-50",
    },
    {
      id: "global",
      name: "Global Emergency",
      description: "Worldwide emergency, evacuation & repatriation",
      coverage: "Unlimited",
      waiting: "None",
      copay: "0%",
      status: "active",
      price: "+$20/mo",
      monthlyCost: 20,
      icon: Globe,
      color: "text-sky-600 bg-sky-50",
    },
  ];

  const initialAvailableRiders = [
    {
      id: "mental",
      name: "Mental Wellness",
      description: "Therapy, psychiatric consultations & inpatient mental care",
      coverage: "$10,000",
      waiting: "30 days",
      copay: "10%",
      status: "inactive",
      price: "+$18/mo",
      monthlyCost: 18,
      icon: Activity,
      color: "text-emerald-600 bg-emerald-50",
    },
    {
      id: "accident",
      name: "Personal Accident",
      description: "Accidental death, permanent & temporary disability cover",
      coverage: "$100,000",
      waiting: "None",
      copay: "—",
      status: "inactive",
      price: "+$12/mo",
      monthlyCost: 12,
      icon: AlertTriangle,
      color: "text-amber-600 bg-amber-50",
    },
  ];

  const [activeRiders, setActiveRiders] = useState(initialRiders);
  const [availableRiders, setAvailableRiders] = useState(initialAvailableRiders);

  const addRider = (id: string) => {
    const rider = availableRiders.find((item) => item.id === id);
    if (!rider) return;
    setAvailableRiders((prev) => prev.filter((item) => item.id !== id));
    setActiveRiders((prev) => [...prev, { ...rider, status: "active" }]);
  };

  const removeRider = (id: string) => {
    const rider = activeRiders.find((item) => item.id === id);
    if (!rider) return;
    setActiveRiders((prev) => prev.filter((item) => item.id !== id));
    setAvailableRiders((prev) => [...prev, { ...rider, status: "inactive" }]);
  };

  const utilization = [
    { id: "outpatient", name: "Outpatient", used: 9000, limit: 50000, icon: Stethoscope, color: "from-primary to-ocean-bright", iconColor: "bg-primary/10 text-primary" },
    { id: "inpatient", name: "Inpatient", used: 8200, limit: 200000, icon: Hospital, color: "from-danger to-rose-400", iconColor: "bg-rose-50 text-danger" },
    { id: "pharmacy", name: "Pharmacy", used: 9150, limit: 15000, icon: Pill, color: "from-success to-emerald-400", iconColor: "bg-green-50 text-success" },
    { id: "diagnostics", name: "Diagnostics", used: 4400, limit: 20000, icon: Activity, color: "from-purple-600 to-violet-400", iconColor: "bg-purple-50 text-purple-600" },
    { id: "dental", name: "Dental", used: 2400, limit: 5000, icon: Smile, color: "from-warning to-amber-400", iconColor: "bg-amber-50 text-warning" },
    { id: "optical", name: "Optical", used: 600, limit: 2000, icon: Glasses, color: "from-teal to-cyan-400", iconColor: "bg-cyan-50 text-teal" },
  ];

  const benefits = [
    { id: "outpatient", name: "Outpatient", annual: "$50,000", perVisit: "$500", copay: "10%", icon: Stethoscope },
    { id: "inpatient", name: "Inpatient", annual: "$200,000", perVisit: "—", copay: "5%", icon: Hospital },
    { id: "emergency", name: "Emergency", annual: "Unlimited", perVisit: "—", copay: "0%", icon: Siren },
    { id: "diagnostics", name: "Diagnostics", annual: "$20,000", perVisit: "$1,000", copay: "15%", icon: Activity },
    { id: "pharmacy", name: "Pharmacy", annual: "$15,000", perVisit: "$300", copay: "20%", icon: Pill },
    { id: "dental", name: "Dental", annual: "$5,000", perVisit: "$500", copay: "25%", icon: Smile },
    { id: "optical", name: "Optical", annual: "$2,000", perVisit: "$400", copay: "30%", icon: Glasses },
  ];

  const coveredItems = [
    "Preventive care & wellness visits",
    "Specialist consultations",
    "Hospitalization & surgery",
    "Emergency room visits",
    "Mental health services",
    "Telemedicine consultations",
    "Physical therapy",
  ];

  const excludedItems = [
    "Cosmetic procedures",
    "Experimental treatments",
    "Pre-existing (first 6 months)",
    "Infertility treatments",
    "Weight loss surgery",
  ];

  const riderCostTotal = activeRiders.reduce((sum, rider) => sum + rider.monthlyCost, 0);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Policy & Coverage</h1>
          <p className="text-[16px] text-gray-600 mt-1">
            View your coverage, benefits, and policy documents
          </p>
        </div>
        <Button variant="secondary" size="sm">
          <Download className="w-4 h-4 mr-2" />
          Download PDF
        </Button>
      </div>

      <StaggerContainer className="space-y-3">
        {(daysToRenewal <= 30 || true) && (
          <StaggerItem>
            <div className="card border border-danger/30 bg-danger-light/30">
              <div className="flex items-center justify-between px-3 h-5">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-md bg-danger-light text-danger flex items-center justify-center">
                    <TrendingUp className="w-3 h-3" />
                  </div>
                  <p className="text-[13px] font-bold text-danger leading-tight">
                    Your policy renews in {daysToRenewal} days — on {formatDate(policy.renewalDate, "long")}
                    <span className="font-semibold"> (Demo: banner shows only when renewal is within 30 days)</span>.
                  </p>
                </div>
                <Button variant="danger" size="sm" className="h-5 px-2 text-[11px]">
                  Renew Early
                </Button>
              </div>
            </div>
          </StaggerItem>
        )}

        <StaggerItem>
          <div className="card overflow-hidden bg-gradient-to-br from-ocean-base via-ocean-mid to-ocean-dark text-white">
            <div className="p-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-2">
                <div className="text-[12px] uppercase tracking-[0.2em] text-ocean-glow">Active Policy</div>
                <div className="text-2xl font-bold tracking-tight">{policy.policyNumber}</div>
                <div className="text-[14px] text-ocean-glow/80">
                  {policy.planName} · {policy.planType} · Tier 1 Network
                </div>
                <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-[13px] text-ocean-glow/90 sm:grid-cols-4">
                  <div>
                    <div className="uppercase text-[11px] tracking-widest text-ocean-glow/60">Effective Date</div>
                    <div className="font-semibold">{formatDate(policy.effectiveDate, "long")}</div>
                  </div>
                  <div>
                    <div className="uppercase text-[11px] tracking-widest text-ocean-glow/60">Renewal Date</div>
                    <div className="font-semibold">{formatDate(policy.renewalDate, "long")}</div>
                  </div>
                  <div>
                    <div className="uppercase text-[11px] tracking-widest text-ocean-glow/60">Monthly Premium</div>
                    <div className="font-semibold">{formatCurrency(policy.premium)}</div>
                  </div>
                  <div>
                    <div className="uppercase text-[11px] tracking-widest text-ocean-glow/60">Members Covered</div>
                    <div className="font-semibold">{members.length} members</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge
                  variant="status"
                  status={policy.status}
                  className="bg-white text-success border border-success/30"
                >
                  {policy.status}
                </Badge>
                <Button variant="secondary" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </div>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Riders & Add-ons</h2>
              <p className="text-[14px] text-gray-600">
                {activeRiders.length} active · Additional cost: {formatCurrency(riderCostTotal)}/mo
              </p>
            </div>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="card overflow-hidden">
            <div className="grid grid-cols-1 gap-0">
              <div className="hidden md:grid grid-cols-7 text-[12px] uppercase tracking-widest text-gray-400 px-5 py-2.5 bg-gray-50">
                <div>Rider</div>
                <div>Coverage</div>
                <div>Waiting</div>
                <div>Co-pay</div>
                <div>Status</div>
                <div className="text-right">Price</div>
                <div className="text-right">Action</div>
              </div>
              {[...activeRiders, ...availableRiders].map((rider) => {
                const Icon = rider.icon;
                const isActive = rider.status === "active";
                return (
                  <div key={rider.id} className="grid grid-cols-1 md:grid-cols-7 gap-2 px-5 py-3 border-t border-border">
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${rider.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{rider.name}</div>
                        <div className="text-[12px] text-gray-600">{rider.description}</div>
                      </div>
                    </div>
                    <div className="text-[13px] text-gray-700 md:self-center">{rider.coverage}</div>
                    <div className="text-[13px] text-gray-700 md:self-center">{rider.waiting}</div>
                    <div className="text-[13px] text-gray-700 md:self-center">{rider.copay}</div>
                    <div className="md:self-center">
                      <span className={`inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${isActive ? "bg-white text-success border-success/30" : "bg-white text-gray-500 border-gray-200"}`}>
                        {isActive ? "Active" : "Not added"}
                      </span>
                    </div>
                    <div className="md:self-center text-right text-[13px]">
                      <span className="font-semibold text-gray-900">{rider.price}</span>
                    </div>
                    <div className="md:self-center text-right">
                      {isActive ? (
                        <Button variant="secondary" size="sm" onClick={() => removeRider(rider.id)}>
                          Remove
                        </Button>
                      ) : (
                        <Button variant="primary" size="sm" onClick={() => addRider(rider.id)}>
                          Add
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Coverage Utilization</h2>
              <p className="text-[14px] text-gray-600">Year to date</p>
            </div>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {utilization.map((item) => {
              const Icon = item.icon;
              const percent = calculatePercentage(item.used, item.limit);
              return (
                <div key={item.id} className="card p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${item.iconColor}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[13px] font-semibold text-gray-500">{percent}%</span>
                  </div>
                  <div>
                    <div className="text-[15px] font-semibold text-gray-900">{item.name}</div>
                    <div className="text-[13px] text-gray-600">
                      {formatCurrency(item.used)} of {formatCurrency(item.limit)} used
                    </div>
                  </div>
                  <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                    <div className={`h-2 rounded-full bg-gradient-to-r ${item.color}`} style={{ width: `${percent}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            <div className="card lg:col-span-2">
              <div className="px-5 py-3 border-b border-border">
                <h2 className="text-xl font-semibold text-gray-900">Benefits & Limits</h2>
                <p className="text-[14px] text-gray-600">Per category, per year</p>
              </div>
              <div className="divide-y divide-border">
                <div className="hidden md:grid grid-cols-4 text-[12px] uppercase tracking-widest text-gray-400 px-5 py-2.5">
                  <div>Benefit</div>
                  <div className="text-right">Annual Limit</div>
                  <div className="text-right">Per Visit</div>
                  <div className="text-right">Co-pay</div>
                </div>
                {benefits.map((benefit) => {
                  const Icon = benefit.icon;
                  return (
                    <div key={benefit.id} className="grid grid-cols-1 md:grid-cols-4 gap-2 px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-gray-100 text-gray-700 flex items-center justify-center">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="font-medium text-gray-900">{benefit.name}</span>
                      </div>
                      <div className="text-right text-[14px] text-gray-700">{benefit.annual}</div>
                      <div className="text-right text-[14px] text-gray-700">{benefit.perVisit}</div>
                      <div className="text-right text-[14px] text-gray-700">{benefit.copay}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="space-y-3">
              <div className="card">
                <div className="px-5 py-3 border-b border-border">
                  <h3 className="text-[15px] font-semibold text-success">What's Covered</h3>
                </div>
                <div className="px-5 py-3 space-y-2.5">
                  {coveredItems.map((item) => (
                    <div key={item} className="flex items-center gap-3 text-[14px] text-gray-700">
                      <span className="w-5 h-5 rounded-md bg-green-50 text-success flex items-center justify-center">
                        <Check className="w-3 h-3" />
                      </span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="card">
                <div className="px-5 py-3 border-b border-border">
                  <h3 className="text-[15px] font-semibold text-danger">Exclusions</h3>
                </div>
                <div className="px-5 py-3 space-y-2.5">
                  {excludedItems.map((item) => (
                    <div key={item} className="flex items-center gap-3 text-[14px] text-gray-700">
                      <span className="w-5 h-5 rounded-md bg-rose-50 text-danger flex items-center justify-center">
                        <X className="w-3 h-3" />
                      </span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <div className="card">
              <div className="px-4 py-2.5 border-b border-border">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-semibold text-gray-900">Enrolled Members</h2>
                </div>
              </div>
              <div className="px-4 py-2.5 space-y-2">
                {members.map((member) => (
                  <div key={member.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center text-[11px] font-semibold">
                        {member.initials}
                      </div>
                      <div>
                        <div className="text-[14px] font-semibold text-gray-900">{member.name}</div>
                        <div className="text-[12px] text-gray-600">{member.relationship}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="h-7 px-2 text-[11px]">
                        View ID
                      </Button>
                      <span className="text-[11px] font-medium text-success bg-green-50 px-2 py-0.5 rounded-full">
                        Active
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <div className="px-4 py-2.5 border-b border-border">
                <h2 className="text-xl font-semibold text-gray-900">Policy Documents</h2>
              </div>
              <div className="px-4 py-2.5 space-y-2">
                {policy.documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                        <FileText className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-[14px] font-semibold text-gray-900">{doc.name}</div>
                        <div className="text-[12px] text-gray-600">Uploaded {formatDate(doc.uploadedAt, "long")}</div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="h-7 px-2 text-[11px]">
                      <Download className="w-3.5 h-3.5 mr-1.5" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </StaggerItem>
      </StaggerContainer>
    </div>
  );
}
