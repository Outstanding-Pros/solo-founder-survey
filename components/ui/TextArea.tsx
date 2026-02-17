import { UseFormRegisterReturn } from "react-hook-form";

type TextAreaProps = {
  label: string;
  placeholder?: string;
  rows?: number;
  registration: UseFormRegisterReturn;
  error?: string;
  required?: boolean;
};

export function TextArea({
  label,
  placeholder,
  rows = 5,
  registration,
  error,
  required = false,
}: TextAreaProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && "*"}
      </label>
      <textarea
        {...registration}
        rows={rows}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder={placeholder}
      />
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
