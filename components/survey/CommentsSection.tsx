import { UseFormRegister, FieldErrors } from "react-hook-form";
import { TextArea } from "@/components/ui/TextArea";
import type { SurveyFormData } from "@/types/survey";

type CommentsSectionProps = {
  register: UseFormRegister<SurveyFormData>;
  errors: FieldErrors<SurveyFormData>;
};

export function CommentsSection({ register, errors }: CommentsSectionProps) {
  return (
    <section>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">추가 의견</h2>
      <TextArea
        label="1인 창업 과정에서 겪은 어려움이나 추가로 전달하고 싶은 의견이 있다면 자유롭게 작성해주세요."
        placeholder="자유롭게 의견을 작성해주세요"
        registration={register("comments")}
        error={errors.comments?.message}
      />
    </section>
  );
}
