import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";
import EventsExplorer from "@/components/EventsExplorer";

export const metadata = {
  title: "전시 일정 | 뮤지엄로드",
  description: "전국 박물관·미술관에서 진행 중이거나 예정된 전시 일정을 확인하세요.",
};

export default function EventsPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <SectionHeading
            badge="전시 일정"
            title="지금, 그리고 곧 만날 전시"
            subtitle="지역·유형·키워드로 원하는 전시를 찾아보세요."
            align="left"
          />
          <Suspense fallback={<p className="text-navy/50">불러오는 중...</p>}>
            <EventsExplorer />
          </Suspense>
        </section>
      </main>
      <Footer />
    </>
  );
}
