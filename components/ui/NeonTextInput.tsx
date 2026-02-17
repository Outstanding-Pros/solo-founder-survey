import { UseFormRegisterReturn } from "react-hook-form";

type NeonTextInputProps = {
  label: string;
  type?: "text" | "email";
  placeholder?: string;
  registration: UseFormRegisterReturn;
  error?: string;
  color?: "cyan" | "pink" | "green" | "yellow";
};

export function NeonTextInput({
  label,
  type = "text",
  placeholder,
  registration,
  error,
  color = "cyan",
}: NeonTextInputProps) {
  const colorClasses = {
    cyan: "border-neon-cyan focus:border-neon-cyan",
    pink: "border-neon-pink focus:border-neon-pink",
    green: "border-neon-green focus:border-neon-green",
    yellow: "border-neon-yellow focus:border-neon-yellow",
  };

  return (
    <div>
      <label className="block text-lg font-semibold text-white mb-3">
        {label}
      </label>
      <input
        type={type}
        {...registration}
        className={`w-full px-4 py-3 bg-black/50 border-2 ${colorClasses[color]} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:neon-border transition-all`}
        placeholder={placeholder}
      />
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
}
