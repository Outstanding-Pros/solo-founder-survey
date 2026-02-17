import { NextResponse } from "next/server";
import { appendToSheet } from "@/lib/googleSheets";
import type { SurveyFormData } from "@/types/survey";

export async function POST(request: Request) {
  try {
    const data: SurveyFormData = await request.json();
    await appendToSheet(data);

    return NextResponse.json(
      { message: "설문이 성공적으로 제출되었습니다." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error submitting survey:", error);
    return NextResponse.json(
      { message: "설문 제출 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
