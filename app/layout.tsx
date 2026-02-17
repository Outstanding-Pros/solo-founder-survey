import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "1인 창업가 설문조사",
  description: "1인 창업 과정에서 겪는 어려움에 대한 설문조사",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
