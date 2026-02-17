import { ReactNode } from "react";

type SingleQuestionProps = {
  questionNumber: number;
  totalQuestions: number;
  title: string;
  subtitle?: string;
  color: "cyan" | "pink" | "green" | "yellow";
  children: ReactNode;
};

export function SingleQuestion({
  questionNumber,
  totalQuestions,
  title,
  subtitle,
  color,
  children,
}: SingleQuestionProps) {
  const colorClasses = {
    cyan: "text-neon-cyan",
    pink: "text-neon-pink",
    green: "text-neon-green",
    yellow: "text-neon-yellow",
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        <div className="mb-8 text-center">
          <div className="text-sm text-gray-500 mb-2">
            질문 {questionNumber} / {totalQuestions}
          </div>
          <h2
            className={`text-2xl md:text-4xl font-bold ${colorClasses[color]} neon-text mb-3`}
          >
            {title}
          </h2>
          {subtitle && (
            <p className="text-base md:text-lg text-gray-400">{subtitle}</p>
          )}
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
