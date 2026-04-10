"use client";

import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helpText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helpText, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
    
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-[15px] font-medium text-gray-700 mb-1"
          >
            {label}
            {props.required && <span className="text-danger ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "input",
            error && "border-danger focus:ring-danger",
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-[15px] text-danger">{error}</p>
        )}
        {helpText && !error && (
          <p className="mt-1 text-[15px] text-gray-500">{helpText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
