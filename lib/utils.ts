import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Restrict input to numbers only and limit to a given length (default: 10)
export const handleNumericInput = (
  e: React.ChangeEvent<HTMLInputElement>,
  field: any,
  maxLength = 10,
) => {
  const numericValue = e.target.value.replace(/\D/g, ""); // remove non-digits
  if (numericValue.length <= maxLength) {
    field.onChange(numericValue);
  }
};

// Prevent certain invalid keys like e, +, -, and .
export const preventInvalidKeys = (
  e: React.KeyboardEvent<HTMLInputElement>,
) => {
  const invalidKeys = ["e", "E", "+", "-", "."];
  if (invalidKeys.includes(e.key)) {
    e.preventDefault();
  }
};
