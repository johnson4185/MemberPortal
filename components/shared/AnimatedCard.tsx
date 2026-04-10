/**
 * Animated Card Component
 * ===================================
 * Card with hover animation and optional click interaction
 * 
 * Usage:
 * <AnimatedCard onClick={handleClick}>
 *   <YourContent />
 * </AnimatedCard>
 */

"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";
import clsx from "clsx";

interface AnimatedCardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
}

export default function AnimatedCard({ 
  children, 
  className = "", 
  hoverable = true,
  ...props 
}: AnimatedCardProps) {
  return (
    <motion.div
      className={clsx(
        "bg-card rounded-xl shadow-sm border border-border p-6",
        "transition-all duration-250",
        hoverable && "cursor-pointer",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={
        hoverable
          ? {
              y: -4,
              boxShadow: "0 10px 20px rgba(0, 0, 0, 0.12)",
              transition: { duration: 0.2 },
            }
          : undefined
      }
      whileTap={hoverable ? { scale: 0.98 } : undefined}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
