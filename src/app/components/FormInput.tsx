import React from "react";
import { type FieldError } from "react-hook-form";

type FormInputProps = {
  label: string;
  error?: FieldError;
  isSubmitting: boolean;
  providerType?: "hostel" | "private";
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, providerType, isSubmitting, ...props }, ref) => {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <label className="block mb-2">
          {label} {props.required && "*"}
        </label>
        <input
          ref={ref}
          {...props}
          disabled={isSubmitting}
          className={`${error ? "border-red-500" : "border-transparent"} w-full px-4 py-3 rounded-xl bg-input-background border focus:border-primary focus:outline-none transition-colors`}
        />
        {error && <span className="text-sm text-red-500">{error.message}</span>}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
