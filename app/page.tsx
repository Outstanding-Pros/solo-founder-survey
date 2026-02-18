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
  "내 가설이 맞는지 검증하고 싶은데, 물어볼 타겟 고객이 없다",
  "지인 피드백만으로는 PMF를 찾았다고 확신할 수 없다",
  "커뮤니티에 인터뷰 모집글을 올렸다가 삭제당하거나 무시당했다",
  "고객 검증 없이 감으로 만든 제품이 시장에서 외면받았다",
];

const OLD_METHODS = [
  {
    title: "지인 인터뷰",
    problem: "긍정 편향으로 가설이 검증된 것처럼 착각, PMF 판단 왜곡",
  },
  {
    title: "커뮤니티 / SNS 모집",
    problem: "타겟 스크리닝 불가, 내 고객이 아닌 사람의 피드백으로 방향 오판",
  },
  {
    title: "인터뷰이 매칭 서비스",
    problem: "건당 평균 1.5만원 + 사례비 별도, 가설 피봇할 때마다 비용 누적",
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
    title: "가상 AI 페르소나",
    tagline: "아이디어 단계에서 가설을 빠르게 스크리닝",
    description:
      "타겟 고객의 특성을 설정하면 AI가 페르소나를 생성합니다. 본격적인 검증 전에 가설의 방향성을 빠르게 점검해보세요.",
    features: [
      "설정 5분, 즉시 가설 테스트 시작",
      "24시간 무제한 반복 — 피봇할 때마다 재검증",
      "AI 대화록 + 인사이트 자동 요약",
      "초기 가설 탐색, 방향성 확인에 적합",
    ],
    color: "cyan",
  },
  {
    id: "data_ai_persona",
    tag: "가장 정확 · 데이터 기반",
    title: "학습된 AI 고객",
    tagline: "실제 고객 데이터로 학습된 AI, 가설을 더 정밀하게 검증",
    description:
      "실제 유저 인터뷰 수백 건을 학습한 AI입니다. 진짜 고객의 말투, 불만, 숨겨진 니즈를 기반으로 가설의 허점을 짚어줍니다.",
    features: [
      "설정 10분, 즉시 검증 시작",
      "매칭 서비스 대비 1/5 이하 비용",
      "근거 데이터 출처 표시 + 인사이트 리포트",
      "가설 정밀 검증, 시장 니즈 파악에 적합",
    ],
    color: "pink",
  },
  {
    id: "real_person",
    tag: "가장 확실 · 실제 고객의 목소리",
    title: "진짜 잠재 고객 만나기",
    tagline: "PMF 확인은 결국 진짜 고객의 반응으로",
    description:
      "타겟 조건에 맞는 실제 잠재 고객을 매칭해드립니다. 결제 의사와 진짜 반응을 직접 확인하고, PMF에 확신을 더하세요.",
    features: [
      "매칭 1~3일, 인터뷰 30~60분",
      "시중 매칭 서비스(건당 1.5만원) 대비 저렴한 비용",
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
  { label: "비용", a: "무료~소액", b: "건당 수천원대", c: "건당 1.5만원 + 사례비" },
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
  const [showModal, setShowModal] = useState(false);
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
        setShowModal(true);
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
      <section className="flex flex-col items-center justify-center text-center px-6 py-28 md:py-40">
        <h1 className="text-3xl md:text-5xl font-bold text-neon-cyan neon-text mb-6 leading-tight">
          내 아이디어, 진짜 고객이
          <br />
          원하는 게 맞을까?
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed mb-6">
          PMF를 찾기 전에 고객 검증부터.
          <br />
          신규 서비스를 위한 빠르고 가벼운 유저 리서치 솔루션.
        </p>
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {["#초기창업가", "#신사업", "#0to1", "#신규기능"].map((tag) => (
            <span
              key={tag}
              className="text-sm text-neon-cyan/70 border border-neon-cyan/30 rounded-full px-3 py-1"
            >
              {tag}
            </span>
          ))}
        </div>
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
      <section className="max-w-3xl mx-auto px-6 pb-32">
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
      <section className="max-w-4xl mx-auto px-6 pb-32">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-3">
          기존 방법의 한계
        </h2>
        <p className="text-gray-500 text-center mb-8">
          가설 검증을 위한 기존 방법, 왜 초기 창업가에겐 안 맞을까요?
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
            빠르게 가설을 검증하고 PMF에 다가갈 수 있는 3가지 방법
          </span>
          을 준비하고 있습니다.
        </p>
      </section>

      {/* ── Section 4: Solutions ── */}
      <section id="solutions" className="max-w-5xl mx-auto px-6 pb-32">
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
      <section className="max-w-4xl mx-auto px-6 pb-32">
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
                  AI 페르소나
                </th>
                <th className="py-3 px-3 text-neon-pink font-semibold">
                  학습된 AI
                </th>
                <th className="py-3 px-3 text-neon-green font-semibold">
                  잠재 고객
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
      <section ref={formRef} className="max-w-2xl mx-auto px-6 pb-32">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-2">
          가장 끌리는 방식을 선택하고
        </h2>
        <p className="text-gray-500 text-center mb-10">
          얼리엑세스를 신청하세요
        </p>

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

        {/* ── Success Modal ── */}
        {showModal && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
            onClick={() => setShowModal(false)}
          >
            <div
              className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-gray-950 border border-neon-green/40 rounded-2xl p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors text-xl"
              >
                &#10005;
              </button>

              <div className="text-center mb-8">
                <p className="text-neon-green text-2xl font-bold mb-2">
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
                            <span className="text-gray-300 text-sm">
                              {opt}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

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
                            <span className="text-gray-300 text-sm">
                              {opt}
                            </span>
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
          </div>
        )}
      </section>

      {/* ── Final CTA: Survey ── */}
      <section className="px-6 py-24 md:py-32 border-t border-neon-pink/20 bg-gradient-to-b from-black via-neon-pink/[0.03] to-black">
        <div className="max-w-2xl mx-auto text-center">
          <span className="inline-block text-xs text-neon-pink border border-neon-pink/40 rounded-full px-4 py-1 mb-6">
            3분 소요 · 익명 참여
          </span>
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 leading-tight">
            1인 창업, 가장 어려운 순간은
            <br />
            <span className="text-neon-pink neon-text">언제였나요?</span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-4 max-w-xl mx-auto">
            아이템 선정부터 MVP 개발, 마케팅까지
            <br />
            1인 창업자가 겪는 어려움에 대한 설문조사를 진행하고 있습니다.
          </p>
          <p className="text-gray-500 text-sm mb-10">
            여러분의 경험이 더 나은 창업 환경을 만드는 데 큰 도움이 됩니다.
          </p>
          <Link
            href="/survey"
            className="inline-block px-12 py-4 border-2 border-neon-pink text-neon-pink text-lg font-bold rounded-lg hover:bg-neon-pink hover:text-black transition-all neon-border"
          >
            설문조사 참여하기 →
          </Link>
        </div>
      </section>
    </div>
  );
}
