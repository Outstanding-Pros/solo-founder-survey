import { google } from "googleapis";
import type {
  SurveyFormData,
  LandingFormData,
  LandingMiniSurveyData,
} from "@/types/survey";

function getSheets() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  return google.sheets({ version: "v4", auth });
}

function getTimestamp() {
  return new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });
}

export async function appendToSheet(data: SurveyFormData) {
  const sheets = getSheets();
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;

  const values = [
    [
      getTimestamp(),
      data.name || "",
      data.email || "",
      data.itemSelection,
      data.fmf,
      data.aiRejection,
      data.itemValidation,
      data.intervieweeRecruitment,
      data.channelFinding,
      data.mvpDevelopment,
      data.marketing,
      data.futureServiceInterest,
      data.wantInterview === "yes" ? "예" : "아니오",
      data.interviewContact || "",
      data.comments || "",
    ],
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: "A:O",
    valueInputOption: "RAW",
    requestBody: { values },
  });
}

const SOLUTION_LABELS: Record<string, string> = {
  ai_persona: "AI 고객 미리보기",
  data_ai_persona: "학습된 AI 고객",
  real_person: "진짜 고객 만나기",
};

export async function appendLandingForm(data: LandingFormData) {
  const sheets = getSheets();
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;

  const values = [
    [
      getTimestamp(),
      SOLUTION_LABELS[data.preferredSolution] || data.preferredSolution,
      data.email,
      data.currentStage || "",
      data.concern || "",
    ],
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: "landing!A:E",
    valueInputOption: "RAW",
    requestBody: { values },
  });
}

export async function appendLandingMiniSurvey(
  email: string,
  data: LandingMiniSurveyData
) {
  const sheets = getSheets();
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;

  const values = [
    [getTimestamp(), email, data.choiceReason || "", data.monthlyBudget || ""],
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: "landing-survey!A:D",
    valueInputOption: "RAW",
    requestBody: { values },
  });
}
