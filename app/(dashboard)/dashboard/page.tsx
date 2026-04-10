"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FileText,
  DollarSign,
  CheckCircle,
  Clock,
  Hospital,
  CreditCard,
  Calendar,
  AlertCircle,
  Car,
  Home,
  Plane,
  Bike,
  ShieldCheck,
  User,
} from "lucide-react";
import { formatCurrency, formatDate, cn } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";
import { StatCard } from "@/components/ui";
import { useAuthStore } from "@/lib/store/authStore";

// Mock data for dashboard
const mockStats = {
  activePolicies: 1,
  claimsApproved: 8,
  pendingClaims: 2,
  outstandingBalance: 0,
};

const mockActivePolicy = {
  policyNumber: "POL-2026-123456",
  memberName: "Johnc Vargh",
  memberId: "MEM-2026-7890",
  planType: "Gold Premium",
  premium: "$450/month",
  coverage: "Family",
  renewalDate: "Dec 31, 2026",
  status: "Active",
  groupNumber: "GRP-8901234",
};

const mockRecentClaims = [
  {
    id: "1",
    claimNumber: "CLM-2026-003",
    type: "Medical",
    provider: "Denil M",
    date: "02/10/2026",
    amount: 350.00,
    status: "under review",
  },
  {
    id: "2",
    claimNumber: "CLM-2026-002",
    type: "Dental",
    provider: "Dency Ch",
    date: "02/05/2026",
    amount: 150.00,
    status: "approved",
  },
  {
    id: "3",
    claimNumber: "CLM-2026-001",
    type: "Prescription",
    provider: "Jolly Vargh",
    date: "01/28/2026",
    amount: 85.00,
    status: "paid",
  },
];

const mockImportantAlerts = [
  {
    id: "1",
    icon: Calendar,
    title: "Annual wellness checkup due next month",
    date: "02/15/2026",
    color: "warning",
    badge: "Upcoming",
  },
  {
    id: "2",
    icon: DollarSign,
    title: "Premium payment due in 3 days",
    date: "02/13/2026",
    color: "danger",
    badge: "Action needed",
  },
];

const mockCoverageOverview = {
  deductible: {
    used: "$750.00",
    total: "$2,000.00",
    percentage: 37.5,
  },
  coverages: [
    { id: "1", type: "Medical", percentage: 80 },
    { id: "2", type: "Dental", percentage: 75 },
    { id: "3", type: "Vision", percentage: 50 },
    { id: "4", type: "Prescription", percentage: 90 },
  ],
};

export default function DashboardPage() {
  const { user } = useAuthStore();
  
  return (
    <div className="space-y-4">
      {/* Active Policy - ID Card Design */}
      <div className="animate-[fadeUp_0.45s_0.05s_ease_both]">
        <div className="relative bg-gradient-to-br from-ocean-bright/40 via-ocean-base/30 to-ocean-bright/35 rounded-xl shadow-lg overflow-hidden border border-ocean-bright/20">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-[0.08]">
            <div className="absolute top-0 right-0 w-48 h-48 bg-ocean-bright rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-ocean-bright rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
          </div>
          
          <div className="relative p-4">
            {/* Header */}
            <div className="flex items-start justify-between mb-3.5">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 bg-ocean-base/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-ocean-dark" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="font-dm-sans text-[16px] sm:text-[17px] font-bold text-ocean-dark">Active Policy</h3>
                  <p className="text-[12px] text-ocean-mid mt-0.5">Policy Information</p>
                </div>
              </div>
              <Link href={ROUTES.POLICY}>
                <button className="text-[13px] bg-ocean-base/15 hover:bg-ocean-base/25 text-ocean-dark font-medium px-3 py-1.5 rounded-lg transition-all duration-200">
                  View Details
                </button>
              </Link>
            </div>
            
            {/* Card Content */}
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3.5 border border-ocean-bright/20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {/* Left Column */}
                <div className="space-y-2.5">
                  <div>
                    <p className="text-[12px] text-ocean-mid mb-0.5">Member Name</p>
                    <p className="text-[15px] sm:text-[16px] font-bold text-ocean-dark">{mockActivePolicy.memberName}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <p className="text-[11px] text-ocean-mid mb-0.5">Member ID</p>
                      <p className="text-[13px] sm:text-[14px] font-semibold text-ocean-dark">{mockActivePolicy.memberId}</p>
                    </div>
                    <div>
                      <p className="text-[11px] text-ocean-mid mb-0.5">Group No.</p>
                      <p className="text-[13px] sm:text-[14px] font-semibold text-ocean-dark">{mockActivePolicy.groupNumber}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-[12px] text-ocean-mid mb-0.5">Plan Type</p>
                    <p className="text-[14px] sm:text-[15px] font-semibold text-ocean-dark">{mockActivePolicy.planType}</p>
                  </div>
                </div>
                
                {/* Right Column */}
                <div className="space-y-2.5">
                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <p className="text-[11px] text-ocean-mid mb-0.5">Coverage</p>
                      <p className="text-[13px] sm:text-[14px] font-semibold text-ocean-dark">{mockActivePolicy.coverage}</p>
                    </div>
                    <div>
                      <p className="text-[11px] text-ocean-mid mb-0.5">Status</p>
                      <span className="inline-flex bg-success text-white text-[11px] sm:text-[12px] font-bold px-2 py-0.5 rounded">
                        {mockActivePolicy.status}
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-[12px] text-ocean-mid mb-0.5">Policy Number</p>
                    <p className="text-[13px] sm:text-[14px] font-semibold text-ocean-dark font-mono">{mockActivePolicy.policyNumber}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <p className="text-[11px] text-ocean-mid mb-0.5">Premium</p>
                      <p className="text-[13px] sm:text-[14px] font-semibold text-ocean-dark">{mockActivePolicy.premium}</p>
                    </div>
                    <div>
                      <p className="text-[11px] text-ocean-mid mb-0.5">Renewal Date</p>
                      <p className="text-[13px] sm:text-[14px] font-semibold text-ocean-dark">{mockActivePolicy.renewalDate}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="animate-[fadeUp_0.45s_0.1s_ease_both]">
        <h3 className="font-dm-sans text-section-title text-text-primary font-semibold mb-3">Quick Actions</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Link href={ROUTES.CLAIM_NEW}>
            <motion.div
              whileHover={{ 
                translateY: -3, 
                borderColor: "rgb(14, 165, 216)",
                boxShadow: "0 4px 24px rgba(14,92,138,.18)"
              }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="bg-card border border-border rounded-xl p-4 text-center cursor-pointer shadow-card transition-all flex flex-col items-center gap-2"
            >
              <motion.div
                whileHover={{ 
                  background: "linear-gradient(135deg, rgb(14, 92, 138), rgb(14, 165, 216))",
                  color: "#ffffff"
                }}
                transition={{ duration: 0.25 }}
                className="w-[44px] h-[44px] rounded-[12px] bg-ocean-mist border border-border flex items-center justify-center text-ocean-base transition-all"
              >
                <FileText className="w-[18px] h-[18px]" />
              </motion.div>
              <div>
                <div className="font-dm-sans text-[15px] font-semibold text-text-primary">Submit Claim</div>
                <p className="text-[13px] text-text-soft mt-0.5">File a new claim</p>
              </div>
            </motion.div>
          </Link>
          
          <Link href={ROUTES.POLICY}>
            <motion.div
              whileHover={{ 
                translateY: -3, 
                borderColor: "rgb(14, 165, 216)",
                boxShadow: "0 4px 24px rgba(14,92,138,.18)"
              }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="bg-card border border-border rounded-xl p-4 text-center cursor-pointer shadow-card transition-all flex flex-col items-center gap-2"
            >
              <motion.div
                whileHover={{ 
                  background: "linear-gradient(135deg, rgb(14, 92, 138), rgb(14, 165, 216))",
                  color: "#ffffff"
                }}
                transition={{ duration: 0.25 }}
                className="w-[44px] h-[44px] rounded-[12px] bg-ocean-mist border border-border flex items-center justify-center text-ocean-base transition-all"
              >
                <CreditCard className="w-[18px] h-[18px]" />
              </motion.div>
              <div>
                <div className="font-dm-sans text-[15px] font-semibold text-text-primary">View ID Card</div>
                <p className="text-[13px] text-text-soft mt-0.5">Access digital card</p>
              </div>
            </motion.div>
          </Link>
          
          <Link href={ROUTES.PROVIDERS}>
            <motion.div
              whileHover={{ 
                translateY: -3, 
                borderColor: "rgb(14, 165, 216)",
                boxShadow: "0 4px 24px rgba(14,92,138,.18)"
              }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="bg-card border border-border rounded-xl p-4 text-center cursor-pointer shadow-card transition-all flex flex-col items-center gap-2"
            >
              <motion.div
                whileHover={{ 
                  background: "linear-gradient(135deg, rgb(14, 92, 138), rgb(14, 165, 216))",
                  color: "#ffffff"
                }}
                transition={{ duration: 0.25 }}
                className="w-[44px] h-[44px] rounded-[12px] bg-ocean-mist border border-border flex items-center justify-center text-ocean-base transition-all"
              >
                <Hospital className="w-[18px] h-[18px]" />
              </motion.div>
              <div>
                <div className="font-dm-sans text-[15px] font-semibold text-text-primary">Find Provider</div>
                <p className="text-[13px] text-text-soft mt-0.5">Search network doctors</p>
              </div>
            </motion.div>
          </Link>
          
          <Link href={ROUTES.PAYMENTS}>
            <motion.div
              whileHover={{ 
                translateY: -3, 
                borderColor: "rgb(14, 165, 216)",
                boxShadow: "0 4px 24px rgba(14,92,138,.18)"
              }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="bg-card border border-border rounded-xl p-4 text-center cursor-pointer shadow-card transition-all flex flex-col items-center gap-2"
            >
              <motion.div
                whileHover={{ 
                  background: "linear-gradient(135deg, rgb(14, 92, 138), rgb(14, 165, 216))",
                  color: "#ffffff"
                }}
                transition={{ duration: 0.25 }}
                className="w-[44px] h-[44px] rounded-[12px] bg-ocean-mist border border-border flex items-center justify-center text-ocean-base transition-all"
              >
                <DollarSign className="w-[18px] h-[18px]" />
              </motion.div>
              <div>
                <div className="font-dm-sans text-[15px] font-semibold text-text-primary">Pay Premium</div>
                <p className="text-[13px] text-text-soft mt-0.5">Make a payment</p>
              </div>
            </motion.div>
          </Link>
        </div>
      </div>
      
      {/* Important Alerts */}
      <div className="animate-[fadeUp_0.45s_0.15s_ease_both]">
        <div className="bg-card border border-border rounded-xl shadow-card overflow-hidden">
          <div className="flex items-center gap-2 px-5 pt-3.5 pb-2.5 border-b border-border">
            <AlertCircle className="w-4 h-4 text-warning flex-shrink-0" strokeWidth={2} />
            <h3 className="font-dm-sans text-section-title text-text-primary font-semibold">Important Alerts</h3>
          </div>
          
          {mockImportantAlerts.map((alert, index) => (
            <div
              key={alert.id}
              className={cn(
                "flex items-center gap-3 sm:gap-3.5 px-5 py-3 transition-colors hover:bg-surface-alt cursor-default",
                index !== mockImportantAlerts.length - 1 && "border-b border-border"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
                alert.color === "warning" && "bg-warning-light",
                alert.color === "danger" && "bg-danger-light"
              )}>
                <alert.icon className={cn(
                  "w-4 h-4",
                  alert.color === "warning" && "text-warning",
                  alert.color === "danger" && "text-danger"
                )} />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-[15px] font-medium text-text-primary">{alert.title}</p>
                <p className="text-[14px] text-text-soft mt-0.5">{alert.date}</p>
              </div>
              
              <span className={cn(
                "text-[12px] sm:text-[13px] font-semibold px-2 sm:px-2.5 py-1 rounded-full whitespace-nowrap flex-shrink-0",
                alert.color === "warning" && "bg-warning-light text-warning",
                alert.color === "danger" && "bg-danger-light text-danger"
              )}>
                {alert.badge}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Two Column Layout - Recent Claims and Coverage Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 animate-[fadeUp_0.45s_0.2s_ease_both]">
        {/* Recent Claims */}
        <div className="bg-card border border-border rounded-xl shadow-card overflow-hidden">
          <div className="flex items-center justify-between px-5 pt-3 pb-2">
            <h3 className="font-dm-sans text-section-title text-text-primary font-semibold">Recent Claims</h3>
            <Link href={ROUTES.CLAIMS}>
              <button className="text-[14px] sm:text-[15px] text-ocean-base hover:text-ocean-bright transition-all duration-200 font-medium flex items-center gap-1 px-2.5 py-1.5 rounded-lg hover:bg-ocean-mist">
                View All <span className="text-[15px] sm:text-[16px]">→</span>
              </button>
            </Link>
          </div>
          
          <div className="px-5 pb-3">
            {mockRecentClaims.map((claim, index) => (
              <div
                key={claim.id}
                className={cn(
                  "flex items-center gap-2.5 sm:gap-3.5 py-2 sm:py-2.5 px-0 border-border cursor-pointer transition-all duration-150 hover:bg-surface-alt hover:-mx-5 hover:px-5",
                  index !== mockRecentClaims.length - 1 && "border-b"
                )}
              >
                <div className={cn(
                  "w-2 h-2 rounded-full flex-shrink-0",
                  claim.status === "under review" && "bg-warning",
                  claim.status === "approved" && "bg-success",
                  claim.status === "paid" && "bg-ocean-bright"
                )} />
                <div className="flex-1 min-w-0">
                  <p className="text-[15px] font-bold text-[#0a0f14] truncate">{claim.claimNumber}</p>
                  <p className="text-[14px] text-text-soft mt-0.5 truncate">{claim.type} • {claim.date}</p>
                </div>
                <p className="text-[15px] font-bold text-[#0a0f14] mr-2 flex-shrink-0">{formatCurrency(claim.amount)}</p>
                <span className={cn(
                  "text-[12px] sm:text-[13px] font-semibold px-2 sm:px-2.5 py-1 rounded-full whitespace-nowrap flex-shrink-0",
                  claim.status === "under review" && "bg-warning-light text-warning",
                  claim.status === "approved" && "bg-success-light text-success",
                  claim.status === "paid" && "bg-teal-light text-teal"
                )}>
                  {claim.status}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Coverage Overview */}
        <div className="bg-card border border-border rounded-xl shadow-card overflow-hidden">
          <div className="flex items-center justify-between px-5 pt-3 pb-2">
            <h3 className="font-dm-sans text-section-title text-text-primary font-semibold">Coverage Overview</h3>
          </div>
          
          <div className="px-5 pt-2 pb-4 space-y-3">
            {/* Deductible */}
            <div>
              <div className="flex items-center justify-between mb-2 flex-wrap gap-1">
                <span className="text-[14px] sm:text-[15px] text-text-mid font-semibold">Deductible</span>
                <span className="text-[13px] sm:text-[14px] text-ocean-base font-bold">{mockCoverageOverview.deductible.used} / {mockCoverageOverview.deductible.total}</span>
              </div>
              <div className="h-2 bg-ocean-mist rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-ocean-base to-ocean-bright transition-all duration-500"
                  style={{ width: `${mockCoverageOverview.deductible.percentage}%` }}
                />
              </div>
            </div>
            
            {/* Coverage Cards Grid */}
            <div className="grid grid-cols-2 gap-2.5">
              {mockCoverageOverview.coverages.map((coverage) => (
                <div
                  key={coverage.id}
                  className="bg-surface-alt rounded-[10px] p-3 border border-border transition-all duration-200 hover:border-ocean-bright hover:bg-ocean-mist hover:-translate-y-0.5 cursor-default"
                >
                  <p className="text-[13px] sm:text-[14px] text-ocean-base mb-1 font-medium">{coverage.type}</p>
                  <p className="text-[20px] sm:text-[22px] font-dm-sans font-extrabold text-ocean-base leading-none tracking-tight mb-0.5">
                    {coverage.percentage}%
                  </p>
                  <p className="text-[12px] sm:text-[13px] text-text-soft mt-0.5">Coverage</p>
                </div>
              ))}
            </div>
            
            {/* View Full Policy Details Button */}
            <div className="pt-0">
              <Link href={ROUTES.POLICY}>
                <button className="w-full bg-ocean-mist border border-border text-ocean-base text-[14px] sm:text-[15px] font-medium py-2.5 rounded-[9px] transition-all duration-250 hover:bg-gradient-to-r hover:from-ocean-base hover:to-ocean-bright hover:text-white hover:border-transparent hover:shadow-[0_4px_24px_rgba(14,92,138,.18)]">
                  View Full Policy Details
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Complete Your Protection */}
      <div className="animate-[fadeUp_0.45s_0.25s_ease_both]">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-dm-sans text-section-title text-text-primary font-semibold">Complete Your Protection</h3>
          <Link href="#">
            <button className="text-[14px] text-ocean-base hover:text-ocean-bright transition-colors font-medium">
              View All
            </button>
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {/* Travel Insurance */}
          <Link href="#">
            <motion.div
              whileHover={{ 
                translateY: -3, 
                borderColor: "rgb(14, 165, 216)",
                boxShadow: "0 4px 24px rgba(14,92,138,.18)"
              }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative bg-card border border-border rounded-xl p-4 cursor-pointer shadow-card transition-all min-h-[100px] overflow-hidden"
            >
              <div className="relative z-10">
                <h4 className="font-dm-sans text-[14px] sm:text-[15px] font-semibold text-text-primary mb-1">Travel</h4>
                <p className="text-[12px] text-text-soft">Protect your trips</p>
              </div>
              <div className="absolute -bottom-10 -right-12">
                <Image
                  src="/airplane.png"
                  alt=""
                  width={170}
                  height={170}
                  className="object-contain opacity-90 pointer-events-none select-none"
                  draggable={false}
                  unoptimized
                />
              </div>
            </motion.div>
          </Link>
          
          {/* Home Insurance */}
          <Link href="#">
            <motion.div
              whileHover={{ 
                translateY: -3, 
                borderColor: "rgb(14, 165, 216)",
                boxShadow: "0 4px 24px rgba(14,92,138,.18)"
              }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative bg-card border border-border rounded-xl p-4 cursor-pointer shadow-card transition-all min-h-[100px] overflow-hidden"
            >
              <div className="relative z-10">
                <h4 className="font-dm-sans text-[14px] sm:text-[15px] font-semibold text-text-primary mb-1">Home</h4>
                <p className="text-[12px] text-text-soft">Secure your home</p>
              </div>
              <div className="absolute -bottom-12 -right-12">
                <Image
                  src="/house.png"
                  alt=""
                  width={200}
                  height={200}
                  className="object-contain opacity-90 pointer-events-none select-none"
                  draggable={false}
                  unoptimized
                />
              </div>
            </motion.div>
          </Link>
          
          {/* Car Insurance */}
          <Link href="#">
            <motion.div
              whileHover={{ 
                translateY: -3, 
                borderColor: "rgb(14, 165, 216)",
                boxShadow: "0 4px 24px rgba(14,92,138,.18)"
              }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative bg-card border border-border rounded-xl p-4 cursor-pointer shadow-card transition-all min-h-[100px] overflow-hidden"
            >
              <div className="relative z-10">
                <h4 className="font-dm-sans text-[14px] sm:text-[15px] font-semibold text-text-primary mb-1">Car</h4>
                <p className="text-[12px] text-text-soft">Auto coverage</p>
              </div>
              <div className="absolute -bottom-12 -right-12">
                <Image
                  src="/car.png"
                  alt=""
                  width={200}
                  height={200}
                  className="object-contain opacity-90 pointer-events-none select-none"
                  draggable={false}
                  unoptimized
                />
              </div>
            </motion.div>
          </Link>
          
          {/* Bike Insurance */}
          <Link href="#">
            <motion.div
              whileHover={{ 
                translateY: -3, 
                borderColor: "rgb(14, 165, 216)",
                boxShadow: "0 4px 24px rgba(14,92,138,.18)"
              }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative bg-card border border-border rounded-xl p-4 cursor-pointer shadow-card transition-all min-h-[100px] overflow-hidden"
            >
              <div className="relative z-10">
                <h4 className="font-dm-sans text-[14px] sm:text-[15px] font-semibold text-text-primary mb-1">Bike</h4>
                <p className="text-[12px] text-text-soft">Two-wheeler cover</p>
              </div>
              <div className="absolute -bottom-10 -right-12">
                <Image
                  src="/bike.png"
                  alt=""
                  width={170}
                  height={170}
                  className="object-contain opacity-90 pointer-events-none select-none"
                  draggable={false}
                  unoptimized
                />
              </div>
            </motion.div>
          </Link>
          
          {/* Life Insurance */}
          <Link href="#">
            <motion.div
              whileHover={{ 
                translateY: -3, 
                borderColor: "rgb(14, 165, 216)",
                boxShadow: "0 4px 24px rgba(14,92,138,.18)"
              }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative bg-card border border-border rounded-xl p-4 cursor-pointer shadow-card transition-all min-h-[100px] overflow-hidden"
            >
              <div className="relative z-10">
                <h4 className="font-dm-sans text-[14px] sm:text-[15px] font-semibold text-text-primary mb-1">Life</h4>
                <p className="text-[12px] text-text-soft">Family protection</p>
              </div>
              <div className="absolute -bottom-10 -right-12">
                <Image
                  src="/Lifecard.png"
                  alt=""
                  width={170}
                  height={170}
                  className="object-contain opacity-90 pointer-events-none select-none"
                  draggable={false}
                  unoptimized
                />
              </div>
            </motion.div>
          </Link>
        </div>
      </div>
    </div>
  );
}
