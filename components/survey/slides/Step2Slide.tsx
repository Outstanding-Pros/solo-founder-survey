import { UseFormRegister, FieldErrors } from "react-hook-form";
import { StepSlide } from "../StepSlide";
import { NeonRadioGroup } from "@/components/ui/NeonRadioGroup";
import { DIFFICULTY_OPTIONS } from "@/lib/constants";
import type { SurveyFormData } from "@/types/survey";

type Step2SlideProps = {
  register: UseFormRegister<SurveyFormData>;
  errors: FieldErrors<SurveyFormData>;
};

export function Step2Slide({ register, errors }: Step2SlideProps) {
  return (
    <StepSlide
      stepNumber={2}
      title="아이템 검증"
      subtitle="인터뷰이 섭외와 채널 찾기"
      color="pink"
    >
      <NeonRadioGroup
        label="아이템 검증 과정에 대해 얼마나 자신있으신가요?"
        options={DIFFICULTY_OPTIONS}
        registration={register("itemValidation", {
          required: "이 항목은 필수입니다",
        })}
        error={errors.itemValidation?.message}
        color="pink"
        required
      />

      <NeonRadioGroup
        label="인터뷰이 섭외에 대해 얼마나 자신있으신가요?"
        options={DIFFICULTY_OPTIONS}
        registration={register("intervieweeRecruitment", {
          required: "이 항목은 필수입니다",
        })}
        error={errors.intervieweeRecruitment?.message}
        color="pink"
        required
      />

      <NeonRadioGroup
        label="잠재 고객이 있는 채널 찾기에 대해 얼마나 자신있으신가요?"
        options={DIFFICULTY_OPTIONS}
        registration={register("channelFinding", {
          required: "이 항목은 필수입니다",
        })}
        error={errors.channelFinding?.message}
        color="pink"
        required
      />
    </StepSlide>
  );
}
