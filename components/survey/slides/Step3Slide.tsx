import { UseFormRegister, FieldErrors } from "react-hook-form";
import { StepSlide } from "../StepSlide";
import { NeonRadioGroup } from "@/components/ui/NeonRadioGroup";
import { DIFFICULTY_OPTIONS } from "@/lib/constants";
import type { SurveyFormData } from "@/types/survey";

type Step3SlideProps = {
  register: UseFormRegister<SurveyFormData>;
  errors: FieldErrors<SurveyFormData>;
};

export function Step3Slide({ register, errors }: Step3SlideProps) {
  return (
    <StepSlide
      stepNumber={3}
      title="MVP 개발"
      subtitle="제품 개발과 출시"
      color="green"
    >
      <NeonRadioGroup
        label="MVP 개발 과정에 대해 얼마나 자신있으신가요?"
        options={DIFFICULTY_OPTIONS}
        registration={register("mvpDevelopment", {
          required: "이 항목은 필수입니다",
        })}
        error={errors.mvpDevelopment?.message}
        color="green"
        required
      />
    </StepSlide>
  );
}
