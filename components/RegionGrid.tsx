import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import { SIDO_LIST, slugifySido, getPlacesBySido } from "@/lib/data";

export default function RegionGrid() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <SectionHeading
        badge="지역별 탐색"
        title="17개 시도, 어디든 떠나보세요"
        subtitle="지역을 선택하면 해당 시도의 박물관·미술관·건축물 목록을 볼 수 있어요."
      />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {SIDO_LIST.map((sido) => {
          const count = getPlacesBySido(sido).length;
          return (
            <Link
              key={sido}
              href={`/region/${slugifySido(sido)}`}
              className="flex flex-col gap-1 rounded-xl border border-navy/10 bg-white p-4 transition hover:border-gold hover:shadow-md"
            >
              <span className="font-semibold text-navy">{sido}</span>
              <span className="text-xs text-navy/50">{count}곳</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
