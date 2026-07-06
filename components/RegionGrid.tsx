import SectionHeading from "@/components/SectionHeading";
import RegionCarousel from "@/components/RegionCarousel";

export default function RegionGrid() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <SectionHeading
        badge="지역별 탐색"
        title="17개 시도, 어디든 떠나보세요"
        subtitle="각 지역의 대표 공간을 만나보고, 화살표로 원하는 지역을 찾아보세요."
      />
      <RegionCarousel />
    </section>
  );
}
