import { UseFormRegister, FieldErrors } from "react-hook-form";
import { RadioGroup } from "@/components/ui/RadioGroup";
import { DIFFICULTY_OPTIONS } from "@/lib/constants";
import type { SurveyFormData } from "@/types/survey";

type ItemSelectionSectionProps = {
  register: UseFormRegister<SurveyFormData>;
  errors: FieldErrors<SurveyFormData>;
};

export function ItemSelectionSection({
  register,
  errors,
}: ItemSelectionSectionProps) {
  return (
    <section>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        1. 아이템 선정
      </h2>
      <div className="space-y-6">
        <RadioGroup
          label="전반적인 아이템 선정 과정에서 얼마나 어려움을 느끼셨나요?"
          options={DIFFICULTY_OPTIONS}
          registration={register("itemSelection", {
            required: "이 항목은 필수입니다",
          })}
          error={errors.itemSelection?.message}
          required
        />

        <RadioGroup
          label="FMF(Founder-Market Fit) 검증에서 얼마나 어려움을 느끼셨나요?"
          options={DIFFICULTY_OPTIONS}
          registration={register("fmf", { required: "이 항목은 필수입니다" })}
          error={errors.fmf?.message}
          required
        />

        <RadioGroup
          label="AI와 기획한 내용을 AI가 부정하는 상황에서 얼마나 어려움을 느끼셨나요?"
          options={DIFFICULTY_OPTIONS}
          registration={register("aiRejection", {
            required: "이 항목은 필수입니다",
          })}
          error={errors.aiRejection?.message}
          required
        />
      </div>
    </section>
  );
}
