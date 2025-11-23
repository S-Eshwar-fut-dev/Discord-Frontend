"use client";

import React from "react";
import { cn } from "@/lib/utils/cn";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-xs font-semibold uppercase text-[#b5bac1] mb-2">
            {label}
            {props.required && <span className="text-red-400 ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full px-3 py-2 bg-[#1e1f22] text-[#dbdee1] placeholder-[#87888c]",
            "border border-[#1e1f22] rounded-md",
            "focus:border-[#00a8fc] focus:outline-none focus:ring-0",
            "transition-colors",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            error && "border-red-400",
            className
          )}
          {...props}
        />
        {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
        {helperText && !error && (
          <p className="mt-2 text-xs text-[#87888c]">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
