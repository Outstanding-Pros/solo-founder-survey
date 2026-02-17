import { UseFormRegister, FieldErrors } from "react-hook-form";
import { RadioGroup } from "@/components/ui/RadioGroup";
import { DIFFICULTY_OPTIONS } from "@/lib/constants";
import type { SurveyFormData } from "@/types/survey";

type MVPSectionProps = {
  register: UseFormRegister<SurveyFormData>;
  errors: FieldErrors<SurveyFormData>;
};

export function MVPSection({ register, errors }: MVPSectionProps) {
  return (
    <section>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">3. MVP 개발</h2>
      <RadioGroup
        label="MVP 개발 과정에서 얼마나 어려움을 느끼셨나요?"
        options={DIFFICULTY_OPTIONS}
        registration={register("mvpDevelopment", {
          required: "이 항목은 필수입니다",
        })}
        error={errors.mvpDevelopment?.message}
        required
      />
    </section>
  );
}
