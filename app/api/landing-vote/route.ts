import { NextResponse } from "next/server";
import { appendLandingForm, appendLandingMiniSurvey } from "@/lib/googleSheets";
import type { LandingFormData, LandingMiniSurveyData } from "@/types/survey";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type } = body;

    if (type === "mini-survey") {
      const { email, data } = body as {
        type: string;
        email: string;
        data: LandingMiniSurveyData;
      };
      await appendLandingMiniSurvey(email, data);
    } else {
      const data = body as LandingFormData;
      await appendLandingForm(data);
    }

    return NextResponse.json({ message: "제출 성공" }, { status: 200 });
  } catch (error) {
    console.error("Error submitting landing data:", error);
    return NextResponse.json(
      { message: "제출 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
