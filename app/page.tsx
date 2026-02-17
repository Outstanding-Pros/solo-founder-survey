import { SurveyForm } from "@/components/survey/SurveyForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <SurveyForm />
      </div>
    </main>
  );
}
