import type { DifficultyOption } from "@/types/survey";
import { UseFormRegisterReturn, UseFormSetValue } from "react-hook-form";
import type { SurveyFormData } from "@/types/survey";

type AutoAdvanceRadioProps = {
  options: DifficultyOption[] | { value: string; label: string }[];
  registration: UseFormRegisterReturn;
  error?: string;
  color?: "cyan" | "pink" | "green" | "yellow";
  onSelect: () => void;
  fieldName: keyof SurveyFormData;
  setValue: UseFormSetValue<SurveyFormData>;
};

export function AutoAdvanceRadio({
  options,
  registration,
  error,
  color = "cyan",
  onSelect,
  fieldName,
  setValue,
}: AutoAdvanceRadioProps) {
  const colorClasses = {
    cyan: "text-neon-cyan border-neon-cyan",
    pink: "text-neon-pink border-neon-pink",
    green: "text-neon-green border-neon-green",
    yellow: "text-neon-yellow border-neon-yellow",
  };

  const handleChange = (value: string) => {
    setValue(fieldName, value as any);
    setTimeout(() => {
      onSelect();
    }, 300);
  };

  return (
    <div>
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
              onChange={() => handleChange(option.value)}
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
