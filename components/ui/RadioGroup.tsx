import type { DifficultyOption } from "@/types/survey";
import { UseFormRegisterReturn } from "react-hook-form";

type RadioGroupProps = {
  label: string;
  options: DifficultyOption[];
  registration: UseFormRegisterReturn;
  error?: string;
  required?: boolean;
};

export function RadioGroup({
  label,
  options,
  registration,
  error,
  required = false,
}: RadioGroupProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-3">
        {label} {required && "*"}
      </label>
      <div className="space-y-2">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center space-x-3 p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer"
          >
            <input
              type="radio"
              value={option.value}
              {...registration}
              className="w-4 h-4 text-blue-600"
            />
            <span className="text-gray-700">{option.label}</span>
          </label>
        ))}
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
