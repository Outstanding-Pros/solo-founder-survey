import { UseFormRegister, FieldErrors } from "react-hook-form";
import { StepSlide } from "../StepSlide";
import { NeonRadioGroup } from "@/components/ui/NeonRadioGroup";
import { NeonTextInput } from "@/components/ui/NeonTextInput";
import { NeonTextArea } from "@/components/ui/NeonTextArea";
import { DIFFICULTY_OPTIONS, SERVICE_INTEREST_OPTIONS } from "@/lib/constants";
import type { SurveyFormData } from "@/types/survey";

type Step4SlideProps = {
  register: UseFormRegister<SurveyFormData>;
  errors: FieldErrors<SurveyFormData>;
};

export function Step4Slide({ register, errors }: Step4SlideProps) {
  return (
    <StepSlide
      stepNumber={4}
      title="마케팅 & 마무리"
      subtitle="고객에게 다가가기"
      color="yellow"
    >
      <NeonRadioGroup
        label="마케팅(어떻게 알릴 것인가)에 대해 얼마나 자신있으신가요?"
        options={DIFFICULTY_OPTIONS}
        registration={register("marketing", {
          required: "이 항목은 필수입니다",
        })}
        error={errors.marketing?.message}
        color="yellow"
        required
      />

      <NeonRadioGroup
        label="위 어려움을 해결하는 서비스가 출시된다면, 이용할 의향이 있으신가요?"
        options={SERVICE_INTEREST_OPTIONS}
        registration={register("futureServiceInterest", {
          required: "이 항목은 필수입니다",
        })}
        error={errors.futureServiceInterest?.message}
        color="yellow"
        required
      />

      <div className="space-y-4 pt-4">
        <NeonTextInput
          label="이름 (선택사항)"
          placeholder="이름을 입력해주세요"
          registration={register("name")}
          error={errors.name?.message}
          color="yellow"
        />

        <NeonTextInput
          label="이메일 (선택사항)"
          type="email"
          placeholder="email@example.com"
          registration={register("email")}
          error={errors.email?.message}
          color="yellow"
        />

        <NeonTextArea
          label="추가 의견"
          placeholder="1인 창업 과정에서 겪은 어려움이나 추가로 전달하고 싶은 의견을 자유롭게 작성해주세요"
          registration={register("comments")}
          error={errors.comments?.message}
          color="yellow"
        />
      </div>
    </StepSlide>
  );
}
