import { UseFormRegister, FieldErrors } from "react-hook-form";
import { RadioGroup } from "@/components/ui/RadioGroup";
import { DIFFICULTY_OPTIONS } from "@/lib/constants";
import type { SurveyFormData } from "@/types/survey";

type ItemValidationSectionProps = {
  register: UseFormRegister<SurveyFormData>;
  errors: FieldErrors<SurveyFormData>;
};

export function ItemValidationSection({
  register,
  errors,
}: ItemValidationSectionProps) {
  return (
    <section>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        2. 아이템 검증
      </h2>
      <div className="space-y-6">
        <RadioGroup
          label="전반적인 아이템 검증 과정에서 얼마나 어려움을 느끼셨나요?"
          options={DIFFICULTY_OPTIONS}
          registration={register("itemValidation", {
            required: "이 항목은 필수입니다",
          })}
          error={errors.itemValidation?.message}
          required
        />

        <RadioGroup
          label="인터뷰이 섭외에서 얼마나 어려움을 느끼셨나요?"
          options={DIFFICULTY_OPTIONS}
          registration={register("intervieweeRecruitment", {
            required: "이 항목은 필수입니다",
          })}
          error={errors.intervieweeRecruitment?.message}
          required
        />

        <RadioGroup
          label="잠재 고객이 있는 채널 찾기에서 얼마나 어려움을 느끼셨나요?"
          options={DIFFICULTY_OPTIONS}
          registration={register("channelFinding", {
            required: "이 항목은 필수입니다",
          })}
          error={errors.channelFinding?.message}
          required
        />
      </div>
    </section>
  );
}
