export type DifficultyLevel = "1" | "2" | "3" | "4" | "5";

export type SurveyFormData = {
  name: string;
  email: string;
  itemSelection: DifficultyLevel;
  fmf: DifficultyLevel;
  aiRejection: DifficultyLevel;
  itemValidation: DifficultyLevel;
  intervieweeRecruitment: DifficultyLevel;
  channelFinding: DifficultyLevel;
  mvpDevelopment: DifficultyLevel;
  marketing: DifficultyLevel;
  futureServiceInterest: DifficultyLevel;
  wantInterview: "yes" | "no";
  interviewContact: string;
  comments: string;
};

export type DifficultyOption = {
  value: DifficultyLevel;
  label: string;
};

export type SubmitStatus = "success" | "error" | null;

export type SolutionType = "ai_persona" | "data_ai_persona" | "real_person";

export type LandingFormData = {
  preferredSolution: SolutionType;
  email: string;
  currentStage: string;
  concern: string;
};

export type LandingMiniSurveyData = {
  choiceReason: string;
  monthlyBudget: string;
};
