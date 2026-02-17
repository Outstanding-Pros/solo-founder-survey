import type { DifficultyOption } from "@/types/survey";

export const DIFFICULTY_OPTIONS: DifficultyOption[] = [
  { value: "1", label: "전혀 어렵지 않음" },
  { value: "2", label: "약간 어려움" },
  { value: "3", label: "보통" },
  { value: "4", label: "많이 어려움" },
  { value: "5", label: "매우 어려움" },
];

export const SERVICE_INTEREST_OPTIONS: DifficultyOption[] = [
  { value: "1", label: "전혀 없음" },
  { value: "2", label: "별로 없음" },
  { value: "3", label: "보통" },
  { value: "4", label: "어느 정도 있음" },
  { value: "5", label: "매우 있음" },
];
