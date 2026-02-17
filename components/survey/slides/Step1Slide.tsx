import { UseFormRegister, FieldErrors } from "react-hook-form";
import { StepSlide } from "../StepSlide";
import { NeonRadioGroup } from "@/components/ui/NeonRadioGroup";
import { DIFFICULTY_OPTIONS } from "@/lib/constants";
import type { SurveyFormData } from "@/types/survey";

type Step1SlideProps = {
  register: UseFormRegister<SurveyFormData>;
  errors: FieldErrors<SurveyFormData>;
};

export function Step1Slide({ register, errors }: Step1SlideProps) {
  return (
    <StepSlide
      stepNumber={1}
      title="아이템 선정"
      subtitle="FMF 검증과 AI 활용"
      color="cyan"
    >
      <NeonRadioGroup
        label="아이템 선정 과정에서 어느 정도 자신이 있으신가요?"
        options={DIFFICULTY_OPTIONS}
        registration={register("itemSelection", {
          required: "이 항목은 필수입니다",
        })}
        error={errors.itemSelection?.message}
        color="cyan"
        required
      />

      <NeonRadioGroup
        label="FMF(Founder-Market Fit) 검증에 대해 얼마나 자신있으신가요?"
        options={DIFFICULTY_OPTIONS}
        registration={register("fmf", { required: "이 항목은 필수입니다" })}
        error={errors.fmf?.message}
        color="cyan"
        required
      />

      <NeonRadioGroup
        label="AI와 기획 시 AI의 피드백을 받아들이는 것에 대해 어떠신가요?"
        options={DIFFICULTY_OPTIONS}
        registration={register("aiRejection", {
          required: "이 항목은 필수입니다",
        })}
        error={errors.aiRejection?.message}
        color="cyan"
        required
      />
    </StepSlide>
  );
}
