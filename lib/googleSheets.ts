import { google } from "googleapis";
import type { SurveyFormData } from "@/types/survey";

export async function appendToSheet(data: SurveyFormData) {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;

  const timestamp = new Date().toLocaleString("ko-KR", {
    timeZone: "Asia/Seoul",
  });

  const values = [
    [
      timestamp,
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
      data.comments || "",
    ],
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: "A:M",
    valueInputOption: "RAW",
    requestBody: {
      values,
    },
  });
}
