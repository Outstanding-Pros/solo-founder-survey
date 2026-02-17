import { UseFormRegister, FieldErrors } from "react-hook-form";
import { RadioGroup } from "@/components/ui/RadioGroup";
import { DIFFICULTY_OPTIONS } from "@/lib/constants";
import type { SurveyFormData } from "@/types/survey";

type MarketingSectionProps = {
  register: UseFormRegister<SurveyFormData>;
  errors: FieldErrors<SurveyFormData>;
};

export function MarketingSection({ register, errors }: MarketingSectionProps) {
  return (
    <section>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">4. 마케팅</h2>
      <RadioGroup
        label="마케팅(어떻게 알릴 것인가)에서 얼마나 어려움을 느끼셨나요?"
        options={DIFFICULTY_OPTIONS}
        registration={register("marketing", {
          required: "이 항목은 필수입니다",
        })}
        error={errors.marketing?.message}
        required
      />
    </section>
  );
}
