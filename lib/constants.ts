import type { DifficultyOption } from "@/types/survey";

export const DIFFICULTY_OPTIONS: DifficultyOption[] = [
  { value: "1", label: "매우 자신있음" },
  { value: "2", label: "약간 자신있음" },
  { value: "3", label: "보통" },
  { value: "4", label: "약간 어려움" },
  { value: "5", label: "매우 어려움" },
];

export const SERVICE_INTEREST_OPTIONS: DifficultyOption[] = [
  { value: "1", label: "전혀 없음" },
  { value: "2", label: "별로 없음" },
  { value: "3", label: "보통" },
  { value: "4", label: "어느 정도 있음" },
  { value: "5", label: "매우 있음" },
];

export const YES_NO_OPTIONS = [
  { value: "yes", label: "네, 인터뷰에 참여하고 싶습니다" },
  { value: "no", label: "아니요, 괜찮습니다" },
];

export const TOTAL_QUESTIONS = 11;
