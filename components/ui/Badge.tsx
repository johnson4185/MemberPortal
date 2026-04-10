"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "success" | "warning" | "danger" | "info" | "neutral" | "primary" | "status";
  status?: string; // For status variant
  className?: string;
  animated?: boolean;
}

export default function Badge({ children, variant = "neutral", status, className, animated = false }: BadgeProps) {
  // Map status strings to badge variants
  const getStatusVariant = (statusValue?: string) => {
    if (!statusValue) return "badge-neutral";
    
    const statusLower = statusValue.toLowerCase();
    
    if (statusLower === "paid") {
      return "badge-paid";
    }
    if (statusLower === "approved" || statusLower === "active" || statusLower === "completed") {
      return "badge-success";
    }
    if (statusLower === "pending" || statusLower === "under_review" || statusLower === "processing") {
      return "badge-warning";
    }
    if (statusLower === "rejected" || statusLower === "denied" || statusLower === "cancelled" || statusLower === "inactive") {
      return "badge-danger";
    }
    if (statusLower === "withdrawn") {
      return "badge-neutral";
    }
    
    return "badge-info";
  };
  
  const variants = {
    success: "badge-success",
    warning: "badge-warning",
    danger: "badge-danger",
    info: "badge-info",
    neutral: "badge-neutral",
    primary: "bg-primary/10 text-primary border border-primary/20",
    status: getStatusVariant(status),
  };
  
  const Component = animated ? motion.span : "span";
  const animationProps = animated ? {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.2 }
  } : {};

  return (
    <Component
      className={cn(
        "badge",
        variants[variant],
        className
      )}
      {...animationProps}
    >
      {children}
    </Component>
  );
}
