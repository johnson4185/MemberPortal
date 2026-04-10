"use client";

import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { TrendingUp, ArrowUp, CheckCircle } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  subtitle?: string;
  highlightedValue?: string; // For displaying a prominent highlighted amount
  badge?: string; // For displaying a small badge
  color?: "blue" | "green" | "amber" | "teal" | "red";
  className?: string;
  delay?: number;
  onClick?: () => void;
  compact?: boolean;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  subtitle,
  highlightedValue,
  badge,
  color = "blue",
  className,
  delay = 0,
  onClick,
  compact = false,
}: StatCardProps) {
  const colorStyles = {
    blue: {
      bar: "bg-gradient-to-r from-ocean-base to-ocean-bright",
      iconBg: "bg-ocean-mist",
      iconColor: "text-ocean-base",
    },
    green: {
      bar: "bg-gradient-to-r from-success to-[#34d399]",
      iconBg: "bg-success-light",
      iconColor: "text-success",
    },
    amber: {
      bar: "bg-gradient-to-r from-warning to-[#fbbf24]",
      iconBg: "bg-warning-light",
      iconColor: "text-warning",
    },
    teal: {
      bar: "bg-gradient-to-r from-teal to-[#22d3ee]",
      iconBg: "bg-teal-light",
      iconColor: "text-teal",
    },
    red: {
      bar: "bg-gradient-to-r from-danger to-[#f43f5e]",
      iconBg: "bg-danger-light",
      iconColor: "text-danger",
    },
  };
  
  const styles = colorStyles[color];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: "easeOut" }}
      whileHover={{ translateY: -3, boxShadow: "0 8px 32px rgba(2,14,26,.14)" }}
      onClick={onClick}
      className={cn(
        "relative bg-card border border-border rounded-xl shadow-card overflow-hidden",
        "transition-all duration-250",
        onClick && "cursor-pointer hover:shadow-lg",
        className
      )}
    >
      {/* Top Color Bar */}
      <div className={cn("h-[2px] w-full rounded-t-xl", styles.bar)} />
      
      {/* Content */}
      <div className={cn(compact ? "p-3" : "p-4", "flex items-start justify-between gap-3")}>
        {/* Left: Stats */}
        <div className="flex-1">
          {subtitle && !trend && !highlightedValue && (
            <div className="text-[14px] text-gray-600 font-medium mb-1.5">{subtitle}</div>
          )}
          {badge && (
            <div className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-ocean-mist text-ocean-base text-[11px] font-bold uppercase tracking-wide mb-1.5">
              {badge}
            </div>
          )}
          <div className="text-[15px] text-gray-600 font-medium mb-1">{title}</div>
          {highlightedValue && (
            <div className="text-[24px] font-extrabold bg-gradient-to-r from-ocean-base to-ocean-bright bg-clip-text text-transparent leading-none tracking-tight mb-0.5">
              {highlightedValue}
            </div>
          )}
          <div className={cn(
            "leading-none tracking-tight font-bold",
            highlightedValue ? "text-[15px] text-gray-600" : "text-[20px] text-gray-900"
          )}>
            {value}
          </div>
          {(trend) && (
            <div className="mt-2.5 text-[14px] font-medium flex items-center gap-1">
              {trend && trend.isPositive && (
                <>
                  <ArrowUp className="w-3.5 h-3.5 text-success" />
                  <span className="text-success">+{trend.value}% vs last month</span>
                </>
              )}
              {trend && !trend.isPositive && (
                <>
                  <CheckCircle className="w-3.5 h-3.5 text-success" />
                  <span className="text-text-soft">Coverage current</span>
                </>
              )}
            </div>
          )}
        </div>
        
        {/* Right: Icon */}
        <div className={cn(
          compact ? "w-8 h-8" : "w-9 h-9",
          "rounded-lg flex items-center justify-center flex-shrink-0",
          styles.iconBg,
          styles.iconColor
        )}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
    </motion.div>
  );
}
