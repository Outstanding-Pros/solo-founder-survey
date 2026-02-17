"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import type { SurveyFormData, SubmitStatus } from "@/types/survey";
import { Alert } from "@/components/ui/Alert";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { BasicInfoSection } from "./BasicInfoSection";
import { ItemSelectionSection } from "./ItemSelectionSection";
import { ItemValidationSection } from "./ItemValidationSection";
import { MVPSection } from "./MVPSection";
import { MarketingSection } from "./MarketingSection";
import { FutureServiceSection } from "./FutureServiceSection";
import { CommentsSection } from "./CommentsSection";

export function SurveyForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SurveyFormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(null);

  const onSubmit = async (data: SurveyFormData) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus("success");
        reset();
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Submit error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        1인 창업가 설문조사
      </h1>
      <p className="text-gray-600 mb-8">
        1인 창업 과정에서 겪는 어려움에 대한 설문조사입니다. 귀하의 솔직한
        답변은 더 나은 서비스 개발에 큰 도움이 됩니다.
      </p>

      {submitStatus === "success" && (
        <Alert
          type="success"
          message="설문이 성공적으로 제출되었습니다. 감사합니다!"
        />
      )}

      {submitStatus === "error" && (
        <Alert
          type="error"
          message="제출 중 오류가 발생했습니다. 다시 시도해주세요."
        />
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <BasicInfoSection register={register} errors={errors} />
        <ItemSelectionSection register={register} errors={errors} />
        <ItemValidationSection register={register} errors={errors} />
        <MVPSection register={register} errors={errors} />
        <MarketingSection register={register} errors={errors} />
        <FutureServiceSection register={register} errors={errors} />
        <CommentsSection register={register} errors={errors} />

        <div className="pt-6">
          <SubmitButton isSubmitting={isSubmitting} />
        </div>
      </form>
    </div>
  );
}
