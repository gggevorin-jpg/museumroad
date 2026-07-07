import SectionHeading from "@/components/SectionHeading";
import RegionCarousel from "@/components/RegionCarousel";
import Reveal from "@/components/Reveal";

export default function RegionGrid() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
      <Reveal>
        <SectionHeading
          badge="Regions"
          title="17개 시도, 어디든 떠나보세요"
          subtitle="각 지역의 대표 공간을 만나보고, 화살표로 원하는 지역을 찾아보세요."
        />
      </Reveal>
      <Reveal delay={100}>
        <RegionCarousel />
      </Reveal>
    </section>
  );
}
