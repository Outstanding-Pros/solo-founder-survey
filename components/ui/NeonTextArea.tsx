import { UseFormRegisterReturn } from "react-hook-form";

type NeonTextAreaProps = {
  label: string;
  placeholder?: string;
  rows?: number;
  registration: UseFormRegisterReturn;
  error?: string;
  color?: "cyan" | "pink" | "green" | "yellow";
};

export function NeonTextArea({
  label,
  placeholder,
  rows = 5,
  registration,
  error,
  color = "cyan",
}: NeonTextAreaProps) {
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
      <textarea
        {...registration}
        rows={rows}
        className={`w-full px-4 py-3 bg-black/50 border-2 ${colorClasses[color]} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:neon-border transition-all resize-none`}
        placeholder={placeholder}
      />
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
}
