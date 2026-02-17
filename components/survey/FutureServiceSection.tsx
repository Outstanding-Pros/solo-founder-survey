import { UseFormRegister, FieldErrors } from "react-hook-form";
import { RadioGroup } from "@/components/ui/RadioGroup";
import { SERVICE_INTEREST_OPTIONS } from "@/lib/constants";
import type { SurveyFormData } from "@/types/survey";

type FutureServiceSectionProps = {
  register: UseFormRegister<SurveyFormData>;
  errors: FieldErrors<SurveyFormData>;
};

export function FutureServiceSection({
  register,
  errors,
}: FutureServiceSectionProps) {
  return (
    <section>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        향후 서비스 출시
      </h2>
      <RadioGroup
        label="위 어려움을 해결하는 서비스가 출시된다면, 이용할 의향이 있으신가요?"
        options={SERVICE_INTEREST_OPTIONS}
        registration={register("futureServiceInterest", {
          required: "이 항목은 필수입니다",
        })}
        error={errors.futureServiceInterest?.message}
        required
      />
    </section>
  );
}
