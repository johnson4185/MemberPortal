"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Share2, Printer, Wallet, Plus } from "lucide-react";
import { Button } from "@/components/ui";
import type { Member } from "@/features/id-card/id-card.types";

interface MembersCarouselProps {
  primaryMember: Member;
  onDownload: (memberId: string, memberName: string) => void;
  onShare: () => void;
  onPrint: () => void;
  onAddToAppleWallet: (memberId: string) => void;
  onAddToGoogleWallet: (memberId: string) => void;
}

export function MembersCarousel({
  primaryMember,
  onDownload,
  onShare,
  onPrint,
  onAddToAppleWallet,
  onAddToGoogleWallet,
}: MembersCarouselProps) {
  // Combine primary member with dependents
  const allMembers = [
    {
      id: primaryMember.id,
      name: primaryMember.name,
      relationship: "Primary",
      isPrimary: true,
      member: primaryMember,
    },
    ...primaryMember.dependents.map((dep) => ({
      ...dep,
      relationship: dep.relationship,
      isPrimary: false,
      member: primaryMember,
    })),
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentMemberData = allMembers[currentIndex];
  const currentMember = currentMemberData.member;

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.85,
      filter: "blur(10px)",
      rotate: direction > 0 ? 8 : -8,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      rotate: 0,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.85,
      filter: "blur(10px)",
      rotate: direction < 0 ? 8 : -8,
    }),
  };

  const [direction, setDirection] = useState(0);

  return (
    <div className="card hover:shadow-lg transition-shadow" style={{ overflow: "visible" }}>
      {/* Header */}
      <div className="px-5 py-3 border-b border-border">
        <h2 className="text-xl font-semibold text-gray-900">Member ID Cards</h2>
        <p className="text-[14px] text-gray-600 mt-0.5">Digital insurance cards for all family members</p>
      </div>
      
      {/* Member Tabs - Top Selection */}
      <div className="px-5 py-3 border-b border-border flex items-center gap-2 overflow-x-auto">
        {allMembers.map((member, index) => (
          <motion.button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`px-4 py-2.5 rounded-lg font-semibold text-[15px] whitespace-nowrap transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ocean-mid ${
              index === currentIndex
                ? "bg-primary text-white shadow-sm"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={index === currentIndex ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            <span className="text-[13px] font-mono mr-1.5 opacity-80">{member.id.split("-")[2]?.substring(0, 2) || "ID"}</span>
            {member.name}
          </motion.button>
        ))}
      </div>

      {/* Carousel Content - Centered Card */}
      <div className="px-5 py-6 flex flex-col items-center">
        {/* Card with Animation - Fixed Width */}
        <div className="w-full max-w-[480px] relative h-[280px] mb-5" style={{ perspective: "800px", perspectiveOrigin: "center" }}>
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { 
                  type: "spring", 
                  stiffness: 280, 
                  damping: 28,
                  mass: 0.5
                },
                opacity: { 
                  duration: 0.4, 
                  ease: [0.4, 0.0, 0.2, 1]
                },
                scale: { 
                  duration: 0.5, 
                  ease: [0.34, 1.26, 0.64, 1]
                },
                filter: {
                  duration: 0.3,
                  ease: "easeInOut"
                },
                rotate: {
                  duration: 0.5,
                  ease: [0.4, 0.0, 0.2, 1]
                }
              }}
              className="absolute inset-0"
            >
              {/* Health Insurance Card - Credit Card Style */}
              <motion.div 
                className="bg-gradient-to-br from-ocean-base via-ocean-mid to-ocean-dark text-white rounded-2xl p-4 h-full flex flex-col justify-between"
                style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}
                whileHover={{ 
                  scale: 1.03,
                  y: -5,
                  boxShadow: "0 30px 80px rgba(0,0,0,0.4)",
                  transition: { 
                    duration: 0.3,
                    ease: [0.4, 0.0, 0.2, 1]
                  }
                }}
                animate={{
                  y: [0, -4, 0],
                  boxShadow: [
                    "0 20px 60px rgba(0,0,0,0.3)",
                    "0 25px 65px rgba(0,0,0,0.35)",
                    "0 20px 60px rgba(0,0,0,0.3)"
                  ]
                }}
                transition={{
                  y: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatType: "reverse"
                  },
                  boxShadow: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatType: "reverse"
                  }
                }}
              >
                {/* Header Section */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-base font-bold">⊕</span>
                    </div>
                    <div>
                      <div className="text-[14px] font-bold">MemberConnect</div>
                      <div className="text-[10px] text-ocean-glow">HEALTH INSURANCE</div>
                    </div>
                  </div>
                </div>

                {/* Main Content Section */}
                <div className="space-y-2 flex-1">
                  {/* Member Name */}
                  <div>
                    <div className="text-[10px] text-ocean-glow/70 uppercase tracking-wide font-semibold">Member Name</div>
                    <div className="text-[14px] font-bold mt-0.5">{currentMemberData.name}</div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <div className="text-[10px] text-ocean-glow/70 uppercase tracking-wide font-semibold">Policy Number</div>
                      <div className="text-[14px] font-semibold mt-0.5 font-mono">{currentMember.policyNumber}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-ocean-glow/70 uppercase tracking-wide font-semibold">Group #</div>
                      <div className="text-[14px] font-semibold mt-0.5 font-mono">{currentMember.groupNumber}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-ocean-glow/70 uppercase tracking-wide font-semibold">Plan Type</div>
                      <div className="text-[14px] font-semibold mt-0.5">{currentMember.planType}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-ocean-glow/70 uppercase tracking-wide font-semibold">Effective Date</div>
                      <div className="text-[14px] font-semibold mt-0.5 font-mono">{currentMember.effectiveDate}</div>
                    </div>
                  </div>
                </div>

                {/* Footer Section - ID & QR */}
                <div className="flex items-center justify-between pt-2.5 border-t border-white/20">
                  <div className="flex flex-col">
                    <div className="text-[10px] text-ocean-glow uppercase tracking-wide font-semibold">Member ID</div>
                    <div className="text-[14px] font-bold font-mono mt-0.5">{currentMemberData.id}</div>
                  </div>
                  <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center border border-white/20 flex-shrink-0">
                    <div className="text-xs font-semibold text-center text-ocean-glow">QR</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Action Buttons - Below Card */}
        <div className="w-full max-w-[480px] flex items-center justify-center gap-2">
          {/* Primary Actions */}
          <Button
            variant="secondary"
            onClick={() => onDownload(currentMemberData.id, currentMemberData.name)}
            className="flex items-center justify-center gap-1.5 px-3 py-2 text-[13px] font-medium h-9"
          >
            <Download className="w-3.5 h-3.5" />
            Download
          </Button>
          <Button
            variant="secondary"
            onClick={onShare}
            className="flex items-center justify-center gap-1.5 px-3 py-2 text-[13px] font-medium h-9"
          >
            <Share2 className="w-3.5 h-3.5" />
            Share
          </Button>
          <Button
            variant="secondary"
            onClick={onPrint}
            className="flex items-center justify-center gap-1.5 px-3 py-2 text-[13px] font-medium h-9"
          >
            <Printer className="w-3.5 h-3.5" />
            Print
          </Button>

          {/* Divider */}
          <div className="w-px h-6 bg-gray-300"></div>

          {/* Wallet Buttons */}
          <Button
            variant="secondary"
            onClick={() => onAddToAppleWallet(currentMemberData.id)}
            className="flex items-center justify-center gap-1.5 px-3 py-2 text-[13px] font-medium h-9"
          >
            <Plus className="w-3.5 h-3.5" />
            <svg className="w-4 h-4" viewBox="0 0 384 512" fill="currentColor">
              <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
            </svg>
            Apple
          </Button>
          <Button
            variant="secondary"
            onClick={() => onAddToGoogleWallet(currentMemberData.id)}
            className="flex items-center justify-center gap-1.5 px-3 py-2 text-[13px] font-medium h-9"
          >
            <Plus className="w-3.5 h-3.5" />
            <Wallet className="w-4 h-4" />
            Google
          </Button>
        </div>

        {/* Indicators/Dots */}
        {allMembers.length > 1 && (
          <div className="flex justify-center gap-1.5 mt-3">
            {allMembers.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ocean-mid ${
                  index === currentIndex
                    ? "bg-primary"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                animate={{
                  width: index === currentIndex ? "8px" : "6px",
                  height: index === currentIndex ? "8px" : "6px",
                  scale: index === currentIndex ? 1 : 0.9,
                }}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.8 }}
                transition={{ 
                  duration: 0.3,
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
