"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, children, disabled, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ocean-mid disabled:opacity-50 disabled:cursor-not-allowed";
    
    const variants = {
      primary: "bg-primary text-white hover:bg-primary-dark hover:shadow-md active:scale-95",
      secondary: "bg-card border border-border text-text-primary hover:bg-background hover:border-primary/50 active:scale-95",
      accent: "bg-accent text-white hover:bg-accent/90 hover:shadow-md active:scale-95",
      danger: "bg-danger text-white hover:bg-danger/90 hover:shadow-md active:scale-95",
      ghost: "bg-transparent hover:bg-background text-text-primary active:scale-95",
    };
    
    const sizes = {
      sm: "text-sm px-3 py-1.5 gap-1.5",
      md: "text-body px-4 py-2.5 gap-2",
      lg: "text-base px-6 py-3 gap-2",
    };
    
    return (
      <motion.div
        whileTap={{ scale: disabled || isLoading ? 1 : 0.97 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
        className="inline-block"
      >
        <button
          ref={ref}
          className={cn(
            baseStyles,
            variants[variant],
            sizes[size],
            isLoading && "cursor-wait",
            className
          )}
          disabled={disabled || isLoading}
          {...props}
        >
          {isLoading && (
            <Loader2 className="h-4 w-4 animate-spin" />
          )}
          {children}
        </button>
      </motion.div>
    );
  }
);

Button.displayName = "Button";

export default Button;
