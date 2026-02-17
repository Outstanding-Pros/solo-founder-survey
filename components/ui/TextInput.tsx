import { UseFormRegisterReturn } from "react-hook-form";

type TextInputProps = {
  label: string;
  type?: "text" | "email";
  placeholder?: string;
  registration: UseFormRegisterReturn;
  error?: string;
  required?: boolean;
};

export function TextInput({
  label,
  type = "text",
  placeholder,
  registration,
  error,
  required = false,
}: TextInputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && "*"}
      </label>
      <input
        type={type}
        {...registration}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder={placeholder}
      />
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
