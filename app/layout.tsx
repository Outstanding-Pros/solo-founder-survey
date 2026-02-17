import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { GNB } from "@/components/GNB";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Outstanding Pros",
  description: "1인 창업가를 위한 유저 리서치 솔루션",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={spaceGrotesk.className}>
        <GNB />
        {children}
      </body>
    </html>
  );
}
