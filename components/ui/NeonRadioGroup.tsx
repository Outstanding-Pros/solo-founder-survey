import type { DifficultyOption } from "@/types/survey";
import { UseFormRegisterReturn } from "react-hook-form";

type NeonRadioGroupProps = {
  label: string;
  options: DifficultyOption[];
  registration: UseFormRegisterReturn;
  error?: string;
  required?: boolean;
  color?: "cyan" | "pink" | "green" | "yellow";
};

export function NeonRadioGroup({
  label,
  options,
  registration,
  error,
  required = false,
  color = "cyan",
}: NeonRadioGroupProps) {
  const colorClasses = {
    cyan: "text-neon-cyan border-neon-cyan",
    pink: "text-neon-pink border-neon-pink",
    green: "text-neon-green border-neon-green",
    yellow: "text-neon-yellow border-neon-yellow",
  };

  return (
    <div>
      <label className="block text-lg font-semibold text-white mb-4">
        {label} {required && <span className={colorClasses[color]}>*</span>}
      </label>
      <div className="space-y-3">
        {options.map((option) => (
          <label
            key={option.value}
            className={`flex items-center space-x-4 p-4 border-2 ${colorClasses[color]} bg-black/50 backdrop-blur-sm rounded-lg cursor-pointer hover:bg-black/70 transition-all hover:neon-border`}
          >
            <input
              type="radio"
              value={option.value}
              {...registration}
              className="w-5 h-5 accent-current"
              style={{ accentColor: `var(--neon-${color})` }}
            />
            <span className="text-white text-lg">{option.label}</span>
          </label>
        ))}
      </div>
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
}
