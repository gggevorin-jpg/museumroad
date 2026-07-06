import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://museumroad.vercel.app"),
  title: {
    default: "뮤지엄로드 | 전국 박물관·미술관·건축물 안내",
    template: "%s",
  },
  description:
    "전국 박물관, 미술관, 건축물 정보를 한눈에. 지역별 문화공간과 진행 중인 전시 일정을 확인하세요.",
  openGraph: {
    title: "뮤지엄로드 | 전국 박물관·미술관·건축물 안내",
    description:
      "전국 박물관, 미술관, 건축물 정보를 한눈에. 지역별 문화공간과 진행 중인 전시 일정을 확인하세요.",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-ivory text-navy">
        {children}
      </body>
    </html>
  );
}
