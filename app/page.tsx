"use client";

import { useForm } from "react-hook-form";
import { useState, useRef } from "react";
import Link from "next/link";
import type {
  LandingFormData,
  LandingMiniSurveyData,
  SolutionType,
  SubmitStatus,
} from "@/types/survey";

/* ──────────────────────────── Constants ──────────────────────────── */

const PAIN_CHECKS = [
  "유저 인터뷰가 중요한 건 알지만, 인터뷰이를 어디서 구해야 할지 모르겠다",
  "지인에게 부탁하자니 솔직한 답변을 기대하기 어렵다",
  "커뮤니티에 모집글을 올렸다가 삭제당하거나 무시당했다",
  "리서치 업체에 맡기고 싶지만, 수백만 원의 비용이 부담된다",
  "결국 '내 감'으로 제품을 만들고, 출시 후에야 고객 반응을 확인한다",
  "사업계획서에 '고객 검증' 항목을 어떻게 채울지 막막하다",
];

const OLD_METHODS = [
  {
    title: "지인 인터뷰",
    problem: "관계 때문에 솔직한 피드백 불가, 편향된 데이터",
  },
  {
    title: "커뮤니티 / SNS 모집",
    problem: "삭제 위험, 낮은 응답률, 스크리닝 불가",
  },
  {
    title: "리서치 업체 의뢰",
    problem: "FGI 6명에 300만원, 최소 2~4주 소요",
  },
];

const SOLUTIONS: {
  id: SolutionType;
  tag: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  color: "cyan" | "pink" | "green";
}[] = [
  {
    id: "ai_persona",
    tag: "가장 빠름 · 가장 저렴",
    title: "AI 고객 미리보기",
    tagline: "5분 만에 가상 고객과 대화 시작",
    description:
      "AI가 당신의 타겟 고객 페르소나를 생성합니다. 성별, 나이, 직업, 라이프스타일까지 설정하면 즉시 인터뷰를 시작할 수 있습니다.",
    features: [
      "설정 5분, 즉시 인터뷰 시작",
      "24시간 무제한 반복 가능",
      "AI 대화록 + 인사이트 자동 요약",
      "초기 가설 탐색, 빠른 방향 확인에 적합",
    ],
    color: "cyan",
  },
  {
    id: "data_ai_persona",
    tag: "가장 정확 · 데이터 기반",
    title: "학습된 AI 고객",
    tagline: "실제 데이터가 녹아든 AI, 더 정확한 답변",
    description:
      "실제 유저 인터뷰 수백 건의 데이터를 학습한 AI 페르소나입니다. 진짜 고객이 했던 말투, 불만, 숨겨진 니즈까지 반영합니다.",
    features: [
      "설정 10분, 즉시 인터뷰 시작",
      "실제 인터뷰 대비 1/5 이하 비용",
      "근거 데이터 출처 표시 + 인사이트 리포트",
      "기존 시장의 고객 이해 심화에 적합",
    ],
    color: "pink",
  },
  {
    id: "real_person",
    tag: "가장 확실 · 실제 고객의 목소리",
    title: "진짜 고객 만나기",
    tagline: "당신의 타겟 고객을 직접 매칭해드립니다",
    description:
      "원하는 특성에 맞는 실제 인터뷰이를 매칭해드립니다. 모집의 번거로움 없이, 준비된 사람과 바로 인터뷰하세요.",
    features: [
      "매칭 1~3일, 인터뷰 30~60분",
      "기존 업체 대비 저렴한 매칭 비용",
      "인터뷰 녹음/전사 + AI 분석 지원",
      "PMF 검증, 결제의사 확인에 적합",
    ],
    color: "green",
  },
];

const COMPARISON = [
  {
    label: "소요 시간",
    a: "5분 내 시작",
    b: "10분 내 시작",
    c: "1~3일",
  },
  { label: "비용", a: "최저", b: "중간", c: "최고" },
  { label: "응답 정확도", a: "★★☆☆☆", b: "★★★★☆", c: "★★★★★" },
  { label: "예상치 못한 발견", a: "낮음", b: "중간", c: "높음" },
  { label: "24시간 이용", a: "O", b: "O", c: "X" },
  { label: "반복 인터뷰", a: "무제한", b: "무제한", c: "추가 매칭 필요" },
];

const STAGE_OPTIONS = [
  "아이디어 단계 (아직 제품 없음)",
  "MVP / 프로토타입 있음",
  "이미 서비스 운영 중",
  "기타",
];

const REASON_OPTIONS = [
  "가격이 가장 중요해서",
  "속도가 가장 중요해서",
  "정확도/신뢰도가 가장 중요해서",
  "실제 사람의 반응이 중요해서",
];

const BUDGET_OPTIONS = [
  "0원 (무료만 사용)",
  "1~5만원",
  "5~15만원",
  "15~30만원",
  "30만원 이상",
];

/* ──────────────────────────── Color Map ──────────────────────────── */

const colorMap = {
  cyan: {
    text: "text-neon-cyan",
    border: "border-neon-cyan",
    bg: "bg-neon-cyan",
  },
  pink: {
    text: "text-neon-pink",
    border: "border-neon-pink",
    bg: "bg-neon-pink",
  },
  green: {
    text: "text-neon-green",
    border: "border-neon-green",
    bg: "bg-neon-green",
  },
};

/* ──────────────────────────── Component ──────────────────────────── */

export default function LandingPage() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<LandingFormData>();

  const miniForm = useForm<LandingMiniSurveyData>();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(null);
  const [miniSubmitted, setMiniSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const formRef = useRef<HTMLDivElement>(null);

  const selectedSolution = watch("preferredSolution");

  const scrollToForm = (solutionId: SolutionType) => {
    setValue("preferredSolution", solutionId);
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const onSubmit = async (data: LandingFormData) => {
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      const res = await fetch("/api/landing-vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSubmitStatus("success");
        setSubmittedEmail(data.email);
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onMiniSubmit = async (data: LandingMiniSurveyData) => {
    try {
      await fetch("/api/landing-vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "mini-survey",
          email: submittedEmail,
          data,
        }),
      });
    } catch {
      /* best-effort */
    }
    setMiniSubmitted(true);
  };

  return (
    <div className="min-h-screen pt-14">
      {/* ── Section 1: Hero ── */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-24 md:py-32">
        <h1 className="text-3xl md:text-5xl font-bold text-neon-cyan neon-text mb-6 leading-tight">
          인터뷰이 구하다
          <br />
          포기한 적 있으신가요?
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed mb-10">
          인터뷰이 모집부터 인사이트 도출까지,
          <br />
          당신의 상황에 맞는 유저 리서치 방법을 찾아보세요.
        </p>
        <button
          onClick={() =>
            document
              .getElementById("solutions")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="px-8 py-3 border-2 border-neon-cyan text-neon-cyan font-semibold rounded-lg hover:bg-neon-cyan hover:text-black transition-all"
        >
          내게 맞는 리서치 방법 찾기 ↓
        </button>
      </section>

      {/* ── Section 2: Pain Checklist ── */}
      <section className="max-w-3xl mx-auto px-6 pb-20">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
          혹시 이런 경험 있으신가요?
        </h2>
        <div className="space-y-3">
          {PAIN_CHECKS.map((text) => (
            <div
              key={text}
              className="flex items-start gap-3 p-4 border border-gray-800 rounded-lg bg-black/50"
            >
              <span className="text-neon-pink text-lg mt-0.5">&#9744;</span>
              <span className="text-gray-300">{text}</span>
            </div>
          ))}
        </div>
        <p className="text-center text-gray-500 mt-6">
          2개 이상 해당하신다면, 아래 솔루션이 도움이 될 수 있습니다.
        </p>
      </section>

      {/* ── Section 3: Old Methods ── */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-3">
          기존 방법의 한계
        </h2>
        <p className="text-gray-500 text-center mb-8">
          지금까지의 유저 리서치, 왜 어려웠을까요?
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          {OLD_METHODS.map((m) => (
            <div
              key={m.title}
              className="border border-red-500/30 bg-red-500/5 rounded-xl p-5"
            >
              <h3 className="text-white font-semibold mb-2">{m.title}</h3>
              <p className="text-red-400 text-sm">{m.problem}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-gray-400 mt-8">
          그래서 저희는{" "}
          <span className="text-white font-medium">
            상황과 예산에 맞는 3가지 유저 리서치 방법
          </span>
          을 준비하고 있습니다.
        </p>
      </section>

      {/* ── Section 4: Solutions ── */}
      <section id="solutions" className="max-w-5xl mx-auto px-6 pb-20">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-10">
          어떤 방식이 가장 끌리시나요?
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {SOLUTIONS.map((sol) => {
            const c = colorMap[sol.color];
            return (
              <div
                key={sol.id}
                className={`border-2 ${c.border} bg-black/50 rounded-xl p-6 flex flex-col transition-all hover:neon-border`}
              >
                <span
                  className={`inline-block text-xs ${c.text} border ${c.border} rounded-full px-3 py-1 mb-4 self-start`}
                >
                  {sol.tag}
                </span>
                <h3 className={`text-xl font-bold ${c.text} neon-text mb-1`}>
                  {sol.title}
                </h3>
                <p className="text-sm text-gray-400 mb-4">{sol.tagline}</p>
                <p className="text-gray-300 text-sm leading-relaxed mb-5">
                  {sol.description}
                </p>
                <ul className="space-y-2 mb-6 flex-1">
                  {sol.features.map((f) => (
                    <li
                      key={f}
                      className={`text-sm ${c.text} flex items-start gap-2`}
                    >
                      <span className="mt-1 text-xs">&#9654;</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => scrollToForm(sol.id)}
                  className={`w-full py-3 border-2 ${c.border} ${c.text} font-semibold rounded-lg hover:${c.bg} hover:text-black transition-all text-sm`}
                >
                  이 방식이 끌린다 →
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Section 5: Comparison Table ── */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold text-white text-center mb-8">
          한눈에 비교하기
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 pr-4 text-gray-500 font-medium">
                  비교 항목
                </th>
                <th className="py-3 px-3 text-neon-cyan font-semibold">
                  AI 미리보기
                </th>
                <th className="py-3 px-3 text-neon-pink font-semibold">
                  학습된 AI
                </th>
                <th className="py-3 px-3 text-neon-green font-semibold">
                  진짜 고객
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((row) => (
                <tr key={row.label} className="border-b border-gray-800/50">
                  <td className="py-3 pr-4 text-gray-400">{row.label}</td>
                  <td className="py-3 px-3 text-center text-gray-300">
                    {row.a}
                  </td>
                  <td className="py-3 px-3 text-center text-gray-300">
                    {row.b}
                  </td>
                  <td className="py-3 px-3 text-center text-gray-300">
                    {row.c}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Section 6: CTA Form ── */}
      <section ref={formRef} className="max-w-2xl mx-auto px-6 pb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-2">
          가장 끌리는 방식을 선택하고
        </h2>
        <p className="text-gray-500 text-center mb-10">
          얼리엑세스를 신청하세요
        </p>

        {submitStatus !== "success" ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Solution selection */}
            <div>
              <label className="block text-white font-medium mb-3">
                선호 솔루션 *
              </label>
              <div className="space-y-2">
                {SOLUTIONS.map((sol) => {
                  const c = colorMap[sol.color];
                  const isSelected = selectedSolution === sol.id;
                  return (
                    <label
                      key={sol.id}
                      className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        isSelected
                          ? `${c.border} ${c.bg} text-black font-semibold`
                          : `${c.border} bg-black/50 text-gray-300 hover:bg-black/70`
                      }`}
                    >
                      <input
                        type="radio"
                        value={sol.id}
                        {...register("preferredSolution", {
                          required: "솔루션을 선택해주세요",
                        })}
                        className="sr-only"
                      />
                      <span>{sol.title}</span>
                      <span
                        className={`text-xs ml-auto ${isSelected ? "text-black/60" : "text-gray-500"}`}
                      >
                        {sol.tagline}
                      </span>
                    </label>
                  );
                })}
              </div>
              {errors.preferredSolution && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.preferredSolution.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-white font-medium mb-2">
                이메일 *
              </label>
              <input
                type="email"
                placeholder="email@example.com"
                {...register("email", {
                  required: "이메일을 입력해주세요",
                })}
                className="w-full p-3 bg-black/50 border-2 border-neon-cyan rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan"
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Current stage */}
            <div>
              <label className="block text-white font-medium mb-2">
                현재 상황 (선택)
              </label>
              <select
                {...register("currentStage")}
                className="w-full p-3 bg-black/50 border-2 border-gray-700 rounded-lg text-white focus:outline-none focus:border-neon-cyan"
              >
                <option value="">선택해주세요</option>
                {STAGE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Concern */}
            <div>
              <label className="block text-white font-medium mb-2">
                유저 리서치 관련 가장 어려운 점 (선택)
              </label>
              <input
                type="text"
                placeholder="한 줄로 알려주세요"
                {...register("concern")}
                className="w-full p-3 bg-black/50 border-2 border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan"
              />
            </div>

            {/* Submit */}
            <div className="text-center pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-12 py-4 bg-black border-2 border-neon-cyan text-neon-cyan text-xl font-bold rounded-lg hover:bg-neon-cyan hover:text-black transition-all neon-border disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "제출 중..." : "얼리엑세스 신청하기"}
              </button>
            </div>

            {submitStatus === "error" && (
              <div className="text-center px-6 py-3 bg-red-500/20 border-2 border-red-500 rounded-lg">
                <p className="text-red-500 font-semibold">
                  제출 중 오류가 발생했습니다. 다시 시도해주세요.
                </p>
              </div>
            )}
          </form>
        ) : (
          /* ── Post-submit: Success + Mini Survey ── */
          <div className="space-y-8">
            <div className="text-center px-6 py-6 bg-neon-green/10 border-2 border-neon-green rounded-xl">
              <p className="text-neon-green text-xl font-bold mb-2">
                신청이 완료되었습니다!
              </p>
              <p className="text-gray-400">
                빠른 소식을 이메일로 전해드릴게요.
              </p>
            </div>

            {!miniSubmitted ? (
              <div>
                <p className="text-white font-medium text-center mb-6">
                  30초만 더! 2가지만 더 알려주시면 큰 도움이 됩니다.
                </p>
                <form
                  onSubmit={miniForm.handleSubmit(onMiniSubmit)}
                  className="space-y-6"
                >
                  {/* Q1: reason */}
                  <div>
                    <label className="block text-gray-300 mb-3">
                      선택한 옵션을 고른 가장 큰 이유는?
                    </label>
                    <div className="space-y-2">
                      {REASON_OPTIONS.map((opt) => (
                        <label
                          key={opt}
                          className="flex items-center gap-3 p-3 border border-gray-700 rounded-lg cursor-pointer hover:border-gray-500 transition-colors"
                        >
                          <input
                            type="radio"
                            value={opt}
                            {...miniForm.register("choiceReason")}
                            className="accent-neon-cyan"
                          />
                          <span className="text-gray-300 text-sm">{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Q2: budget */}
                  <div>
                    <label className="block text-gray-300 mb-3">
                      유저 리서치에 월 얼마까지 쓸 수 있으신가요?
                    </label>
                    <div className="space-y-2">
                      {BUDGET_OPTIONS.map((opt) => (
                        <label
                          key={opt}
                          className="flex items-center gap-3 p-3 border border-gray-700 rounded-lg cursor-pointer hover:border-gray-500 transition-colors"
                        >
                          <input
                            type="radio"
                            value={opt}
                            {...miniForm.register("monthlyBudget")}
                            className="accent-neon-cyan"
                          />
                          <span className="text-gray-300 text-sm">{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      className="px-8 py-3 border-2 border-neon-cyan text-neon-cyan font-semibold rounded-lg hover:bg-neon-cyan hover:text-black transition-all"
                    >
                      제출하기
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <p className="text-center text-gray-400">
                추가 설문까지 감사합니다!
              </p>
            )}
          </div>
        )}
      </section>

      {/* ── Final CTA: Survey ── */}
      <section className="text-center px-6 pb-24 pt-8 border-t border-gray-800/50">
        <p className="text-gray-500 mb-4">
          1인 창업 과정의 어려움에 대한 설문조사도 진행 중입니다
        </p>
        <Link
          href="/survey"
          className="inline-block px-10 py-4 border-2 border-neon-pink text-neon-pink text-lg font-bold rounded-lg hover:bg-neon-pink hover:text-black transition-all neon-border"
        >
          설문조사 참여하기 →
        </Link>
      </section>
    </div>
  );
}
