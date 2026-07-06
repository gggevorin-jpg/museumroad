import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";
import RegionPlaceList from "@/components/RegionPlaceList";
import { SIDO_LIST, slugifySido, sidoBySlug, getPlacesBySido } from "@/lib/data";

export function generateStaticParams() {
  return SIDO_LIST.map((sido) => ({ slug: slugifySido(sido) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sido = sidoBySlug(slug);
  return {
    title: sido ? `${sido} 박물관·미술관·건축물 | 뮤지엄로드` : "뮤지엄로드",
    description: sido ? `${sido}의 박물관, 미술관, 건축물 정보를 확인하세요.` : undefined,
  };
}

export default async function RegionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sido = sidoBySlug(slug);
  if (!sido) notFound();

  const places = getPlacesBySido(sido);

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <SectionHeading
            badge="지역별 탐색"
            title={sido}
            subtitle={`${sido}에 등록된 문화공간 ${places.length}곳을 소개합니다.`}
            align="left"
          />
          <RegionPlaceList places={places} />
        </section>
      </main>
      <Footer />
    </>
  );
}
