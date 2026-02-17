"use client";

import { useForm } from "react-hook-form";
import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Keyboard } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import type { SurveyFormData, SubmitStatus } from "@/types/survey";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { SingleQuestion } from "@/components/ui/SingleQuestion";
import { AutoAdvanceRadio } from "@/components/ui/AutoAdvanceRadio";
import { NeonTextInput } from "@/components/ui/NeonTextInput";
import { NeonTextArea } from "@/components/ui/NeonTextArea";
import {
  DIFFICULTY_OPTIONS,
  SERVICE_INTEREST_OPTIONS,
  YES_NO_OPTIONS,
  TOTAL_QUESTIONS,
} from "@/lib/constants";

export function SwiperSurveyForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
    trigger,
    getValues,
  } = useForm<SurveyFormData>();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [canAdvance, setCanAdvance] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);

  const wantInterview = watch("wantInterview");
  const formValues = watch();

  // Map slide index to required form field
  const getSlideField = (index: number): keyof SurveyFormData | null => {
    const fields: (keyof SurveyFormData)[] = [
      "itemSelection",
      "fmf",
      "aiRejection",
      "itemValidation",
      "intervieweeRecruitment",
      "channelFinding",
      "mvpDevelopment",
      "marketing",
      "futureServiceInterest",
      "wantInterview",
    ];
    if (index < 10) return fields[index];
    if (wantInterview === "yes" && index === 10) return "interviewContact";
    return null; // last slide (optional fields)
  };

  // Control forward navigation: block if current question unanswered
  useEffect(() => {
    if (!swiperRef.current) return;
    const field = getSlideField(currentSlide);
    const isAnswered = !field || !!formValues[field];
    swiperRef.current.allowSlideNext = isAnswered;
    setCanAdvance(isAnswered);
  }, [currentSlide, formValues, wantInterview]);

  const goToNextSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.allowSlideNext = true;
      swiperRef.current.slideNext();
    }
  };

  // Prevent jumping to unanswered slides via pagination clicks
  const handleSlideChange = (swiper: SwiperType) => {
    const values = getValues();
    const totalSlideCount = wantInterview === "yes" ? 12 : 11;
    let maxReachable = totalSlideCount - 1;
    for (let i = 0; i < totalSlideCount; i++) {
      const fields: (keyof SurveyFormData)[] = [
        "itemSelection",
        "fmf",
        "aiRejection",
        "itemValidation",
        "intervieweeRecruitment",
        "channelFinding",
        "mvpDevelopment",
        "marketing",
        "futureServiceInterest",
        "wantInterview",
      ];
      let field: keyof SurveyFormData | null = null;
      if (i < 10) field = fields[i];
      else if (wantInterview === "yes" && i === 10) field = "interviewContact";

      if (field && !values[field]) {
        maxReachable = i;
        break;
      }
    }

    if (swiper.activeIndex > maxReachable) {
      swiper.slideTo(maxReachable);
      return;
    }
    setCurrentSlide(swiper.activeIndex);
  };

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
        if (swiperRef.current) {
          swiperRef.current.slideTo(0);
        }
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

  // Skip interview contact slide if not interested
  useEffect(() => {
    if (currentSlide === 10 && wantInterview === "no" && swiperRef.current) {
      swiperRef.current.slideNext();
    }
  }, [currentSlide, wantInterview]);

  const totalSlides = wantInterview === "yes" ? 12 : 11;

  return (
    <div className={`relative w-full h-screen${!canAdvance ? " nav-next-disabled" : ""}`}>
      {/* Status Messages */}
      {submitStatus === "success" && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 bg-neon-green/20 border-2 border-neon-green rounded-lg neon-border">
          <p className="text-neon-green font-semibold">
            설문이 성공적으로 제출되었습니다. 감사합니다!
          </p>
        </div>
      )}

      {submitStatus === "error" && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 bg-red-500/20 border-2 border-red-500 rounded-lg">
          <p className="text-red-500 font-semibold">
            제출 중 오류가 발생했습니다. 다시 시도해주세요.
          </p>
        </div>
      )}

      {/* Swiper */}
      <form onSubmit={handleSubmit(onSubmit)} className="h-full pt-16">
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={handleSlideChange}
          modules={[Pagination, Navigation, Keyboard]}
          spaceBetween={0}
          slidesPerView={1}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          navigation={true}
          keyboard={{
            enabled: true,
          }}
          allowTouchMove={false}
          className="h-full"
        >
          {/* Q1: 아이템 선정 */}
          <SwiperSlide>
            <SingleQuestion
              questionNumber={1}
              totalQuestions={TOTAL_QUESTIONS}
              title="아이템 선정 과정에서"
              subtitle="얼마나 자신이 있으신가요?"
              color="cyan"
            >
              <AutoAdvanceRadio
                options={DIFFICULTY_OPTIONS}
                registration={register("itemSelection", {
                  required: "필수 항목입니다",
                })}
                error={errors.itemSelection?.message}
                color="cyan"
                onSelect={goToNextSlide}
                fieldName="itemSelection"
                setValue={setValue}
              />
            </SingleQuestion>
          </SwiperSlide>

          {/* Q2: FMF */}
          <SwiperSlide>
            <SingleQuestion
              questionNumber={2}
              totalQuestions={TOTAL_QUESTIONS}
              title="FMF(Founder-Market Fit) 검증에 대해"
              subtitle="얼마나 자신있으신가요?"
              color="cyan"
            >
              <AutoAdvanceRadio
                options={DIFFICULTY_OPTIONS}
                registration={register("fmf", { required: "필수 항목입니다" })}
                error={errors.fmf?.message}
                color="cyan"
                onSelect={goToNextSlide}
                fieldName="fmf"
                setValue={setValue}
              />
            </SingleQuestion>
          </SwiperSlide>

          {/* Q3: AI 피드백 */}
          <SwiperSlide>
            <SingleQuestion
              questionNumber={3}
              totalQuestions={TOTAL_QUESTIONS}
              title="AI와 기획 시 AI의 피드백을"
              subtitle="받아들이는 것에 대해 어떠신가요?"
              color="cyan"
            >
              <AutoAdvanceRadio
                options={DIFFICULTY_OPTIONS}
                registration={register("aiRejection", {
                  required: "필수 항목입니다",
                })}
                error={errors.aiRejection?.message}
                color="cyan"
                onSelect={goToNextSlide}
                fieldName="aiRejection"
                setValue={setValue}
              />
            </SingleQuestion>
          </SwiperSlide>

          {/* Q4: 아이템 검증 */}
          <SwiperSlide>
            <SingleQuestion
              questionNumber={4}
              totalQuestions={TOTAL_QUESTIONS}
              title="아이템 검증 과정에 대해"
              subtitle="얼마나 자신있으신가요?"
              color="pink"
            >
              <AutoAdvanceRadio
                options={DIFFICULTY_OPTIONS}
                registration={register("itemValidation", {
                  required: "필수 항목입니다",
                })}
                error={errors.itemValidation?.message}
                color="pink"
                onSelect={goToNextSlide}
                fieldName="itemValidation"
                setValue={setValue}
              />
            </SingleQuestion>
          </SwiperSlide>

          {/* Q5: 인터뷰이 섭외 */}
          <SwiperSlide>
            <SingleQuestion
              questionNumber={5}
              totalQuestions={TOTAL_QUESTIONS}
              title="인터뷰이 섭외에 대해"
              subtitle="얼마나 자신있으신가요?"
              color="pink"
            >
              <AutoAdvanceRadio
                options={DIFFICULTY_OPTIONS}
                registration={register("intervieweeRecruitment", {
                  required: "필수 항목입니다",
                })}
                error={errors.intervieweeRecruitment?.message}
                color="pink"
                onSelect={goToNextSlide}
                fieldName="intervieweeRecruitment"
                setValue={setValue}
              />
            </SingleQuestion>
          </SwiperSlide>

          {/* Q6: 채널 찾기 */}
          <SwiperSlide>
            <SingleQuestion
              questionNumber={6}
              totalQuestions={TOTAL_QUESTIONS}
              title="잠재 고객이 있는 채널 찾기에 대해"
              subtitle="얼마나 자신있으신가요?"
              color="pink"
            >
              <AutoAdvanceRadio
                options={DIFFICULTY_OPTIONS}
                registration={register("channelFinding", {
                  required: "필수 항목입니다",
                })}
                error={errors.channelFinding?.message}
                color="pink"
                onSelect={goToNextSlide}
                fieldName="channelFinding"
                setValue={setValue}
              />
            </SingleQuestion>
          </SwiperSlide>

          {/* Q7: MVP 개발 */}
          <SwiperSlide>
            <SingleQuestion
              questionNumber={7}
              totalQuestions={TOTAL_QUESTIONS}
              title="MVP 개발 과정에 대해"
              subtitle="얼마나 자신있으신가요?"
              color="green"
            >
              <AutoAdvanceRadio
                options={DIFFICULTY_OPTIONS}
                registration={register("mvpDevelopment", {
                  required: "필수 항목입니다",
                })}
                error={errors.mvpDevelopment?.message}
                color="green"
                onSelect={goToNextSlide}
                fieldName="mvpDevelopment"
                setValue={setValue}
              />
            </SingleQuestion>
          </SwiperSlide>

          {/* Q8: 마케팅 */}
          <SwiperSlide>
            <SingleQuestion
              questionNumber={8}
              totalQuestions={TOTAL_QUESTIONS}
              title="마케팅(어떻게 알릴 것인가)에 대해"
              subtitle="얼마나 자신있으신가요?"
              color="yellow"
            >
              <AutoAdvanceRadio
                options={DIFFICULTY_OPTIONS}
                registration={register("marketing", {
                  required: "필수 항목입니다",
                })}
                error={errors.marketing?.message}
                color="yellow"
                onSelect={goToNextSlide}
                fieldName="marketing"
                setValue={setValue}
              />
            </SingleQuestion>
          </SwiperSlide>

          {/* Q9: 향후 서비스 관심 */}
          <SwiperSlide>
            <SingleQuestion
              questionNumber={9}
              totalQuestions={TOTAL_QUESTIONS}
              title="위 어려움을 해결하는 서비스가"
              subtitle="출시된다면, 이용할 의향이 있으신가요?"
              color="yellow"
            >
              <AutoAdvanceRadio
                options={SERVICE_INTEREST_OPTIONS}
                registration={register("futureServiceInterest", {
                  required: "필수 항목입니다",
                })}
                error={errors.futureServiceInterest?.message}
                color="yellow"
                onSelect={goToNextSlide}
                fieldName="futureServiceInterest"
                setValue={setValue}
              />
            </SingleQuestion>
          </SwiperSlide>

          {/* Q10: 인터뷰 희망 여부 */}
          <SwiperSlide>
            <SingleQuestion
              questionNumber={10}
              totalQuestions={TOTAL_QUESTIONS}
              title="심층 인터뷰에 참여하시겠어요?"
              subtitle="소정의 사례(스타벅스 기프티콘)를 드립니다"
              color="yellow"
            >
              <AutoAdvanceRadio
                options={YES_NO_OPTIONS}
                registration={register("wantInterview", {
                  required: "필수 항목입니다",
                })}
                error={errors.wantInterview?.message}
                color="yellow"
                onSelect={goToNextSlide}
                fieldName="wantInterview"
                setValue={setValue}
              />
            </SingleQuestion>
          </SwiperSlide>

          {/* Q11: 인터뷰 연락처 (조건부) */}
          {wantInterview === "yes" && (
            <SwiperSlide>
              <SingleQuestion
                questionNumber={11}
                totalQuestions={TOTAL_QUESTIONS}
                title="연락 가능한 이메일 또는 전화번호를"
                subtitle="남겨주세요"
                color="yellow"
              >
                <NeonTextInput
                  label="연락처"
                  placeholder="이메일 또는 전화번호"
                  registration={register("interviewContact", {
                    required: "연락처를 입력해주세요",
                  })}
                  error={errors.interviewContact?.message}
                  color="yellow"
                />
                <div className="mt-6 text-center">
                  <button
                    type="button"
                    onClick={async () => {
                      const valid = await trigger("interviewContact");
                      if (valid) goToNextSlide();
                    }}
                    className="px-8 py-3 bg-black border-2 border-neon-yellow text-neon-yellow text-lg font-bold rounded-lg hover:bg-neon-yellow hover:text-black transition-all neon-border"
                  >
                    다음
                  </button>
                </div>
              </SingleQuestion>
            </SwiperSlide>
          )}

          {/* 마지막: 추가 의견 + 제출 */}
          <SwiperSlide>
            <SingleQuestion
              questionNumber={TOTAL_QUESTIONS}
              totalQuestions={TOTAL_QUESTIONS}
              title="마지막으로"
              subtitle="추가 의견이 있다면 자유롭게 작성해주세요 (선택)"
              color="green"
            >
              <div className="space-y-6">
                <NeonTextInput
                  label="이름 (선택)"
                  placeholder="이름"
                  registration={register("name")}
                  color="green"
                />
                <NeonTextInput
                  label="이메일 (선택)"
                  type="email"
                  placeholder="email@example.com"
                  registration={register("email")}
                  color="green"
                />
                <NeonTextArea
                  label="추가 의견 (선택)"
                  placeholder="1인 창업 과정에서 겪은 어려움이나 추가로 전달하고 싶은 의견을 자유롭게 작성해주세요"
                  registration={register("comments")}
                  color="green"
                  rows={4}
                />
                <div className="text-center pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-12 py-4 bg-black border-2 border-neon-green text-neon-green text-xl font-bold rounded-lg hover:bg-neon-green hover:text-black transition-all neon-border disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "제출 중..." : "설문 제출"}
                  </button>
                </div>
              </div>
            </SingleQuestion>
          </SwiperSlide>
        </Swiper>
      </form>

      {/* Progress Indicator */}
      <div className="fixed bottom-8 left-8 text-gray-500 text-sm">
        <p>
          진행률: {currentSlide + 1} / {totalSlides}
        </p>
      </div>
    </div>
  );
}
