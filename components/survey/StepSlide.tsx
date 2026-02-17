import { ReactNode } from "react";

type StepSlideProps = {
  stepNumber: number;
  title: string;
  subtitle?: string;
  children: ReactNode;
  color: "cyan" | "pink" | "green" | "yellow";
};

export function StepSlide({
  stepNumber,
  title,
  subtitle,
  children,
  color,
}: StepSlideProps) {
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
          <div
            className={`text-6xl md:text-8xl font-bold ${colorClasses[color]} neon-text mb-4`}
          >
            {String(stepNumber).padStart(2, "0")}
          </div>
          <h2 className={`text-3xl md:text-5xl font-bold ${colorClasses[color]} neon-text mb-2`}>
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg md:text-xl text-gray-400">{subtitle}</p>
          )}
        </div>
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
}
