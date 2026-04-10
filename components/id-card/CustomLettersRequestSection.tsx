"use client";

import { FileText, Plane, Heart } from "lucide-react";
import { motion } from "framer-motion";
import type { CustomLetterType } from "@/features/id-card/id-card.types";

interface CustomLettersRequestSectionProps {
  onRequestLetter: (type: CustomLetterType) => void;
}

const letterTypes = [
  {
    type: "visa" as CustomLetterType,
    title: "Visa Letter",
    description: "Request visa letters, coverage confirmation letters, or other custom documentation.",
    icon: Plane,
    color: "bg-blue-50 border-blue-200 hover:bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    type: "coverage" as CustomLetterType,
    title: "Coverage Letter",
    description: "Request coverage confirmation letters for insurance verification.",
    icon: FileText,
    color: "bg-teal-50 border-teal-200 hover:bg-teal-100",
    iconColor: "text-teal-600",
  },
  {
    type: "treatment" as CustomLetterType,
    title: "Treatment Letter",
    description: "Request treatment authorization letters for medical procedures.",
    icon: Heart,
    color: "bg-purple-50 border-purple-200 hover:bg-purple-100",
    iconColor: "text-purple-600",
  },
];

export default function CustomLettersRequestSection({
  onRequestLetter,
}: CustomLettersRequestSectionProps) {
  return (
    <div className="card hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="px-5 py-3 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">
          Request Custom Letters
        </h2>
        <p className="text-[14px] text-gray-600 mt-0.5">
          Request visa letters, coverage confirmation letters, or other custom documentation
        </p>
      </div>

      {/* Cards Grid */}
      <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {letterTypes.map((letter, index) => {
          const Icon = letter.icon;
          
          return (
            <motion.button
              key={letter.type}
              onClick={() => onRequestLetter(letter.type)}
              className={`relative p-3 rounded-xl border-2 transition-all text-left focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ocean-mid ${letter.color}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Icon */}
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-2 ${letter.iconColor} bg-white/70 shadow-sm border border-white`}>
                <Icon className="w-[18px] h-[18px]" />
              </div>

              {/* Title */}
              <h3 className="text-[17px] font-semibold text-gray-900 mb-1.5">
                {letter.title}
              </h3>

              {/* Description */}
              <p className="text-[14px] text-gray-600 mb-2 leading-snug">
                {letter.description}
              </p>

              {/* Action hint */}
              <div className={`text-[14px] font-semibold ${letter.iconColor} flex items-center gap-1`}>
                Request Letter →
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
