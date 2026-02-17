import { UseFormRegister, FieldErrors } from "react-hook-form";
import { TextInput } from "@/components/ui/TextInput";
import type { SurveyFormData } from "@/types/survey";

type BasicInfoSectionProps = {
  register: UseFormRegister<SurveyFormData>;
  errors: FieldErrors<SurveyFormData>;
};

export function BasicInfoSection({ register, errors }: BasicInfoSectionProps) {
  return (
    <section>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">기본 정보</h2>
      <div className="space-y-4">
        <TextInput
          label="이름 (선택)"
          placeholder="이름을 입력해주세요"
          registration={register("name")}
          error={errors.name?.message}
        />
        <TextInput
          label="이메일 (선택)"
          type="email"
          placeholder="email@example.com"
          registration={register("email")}
          error={errors.email?.message}
        />
      </div>
    </section>
  );
}
