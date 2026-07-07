import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { events, isOngoing, getPlaceById } from "@/lib/data";

function formatDay(dateStr: string) {
  const d = new Date(dateStr);
  return {
    day: d.getDate(),
    month: d.toLocaleDateString("ko-KR", { month: "short" }),
  };
}

export default function OngoingExhibitions() {
  const ongoing = events
    .filter((e) => isOngoing(e))
    .slice(0, 12)
    .map((e) => ({ event: e, place: getPlaceById(e.placeId) }))
    .filter(
      (item): item is { event: (typeof events)[number]; place: NonNullable<typeof item.place> } =>
        !!item.place
    );

  if (ongoing.length === 0) return null;

  return (
    <section className="bg-bg-elevated px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <SectionHeading
            badge="Now Showing"
            title="진행 중인 전시"
            subtitle="현재 관람할 수 있는 전국의 전시를 모았어요."
            align="left"
          />
        </Reveal>

        <div className="flex flex-col border-t border-line">
          {ongoing.map(({ event, place }, i) => {
            const { day, month } = formatDay(event.start);
            return (
              <Reveal key={`${event.placeId}-${event.title}`} delay={i * 40}>
                <Link
                  href={`/place/${event.placeId}`}
                  className="group flex items-center gap-6 border-b border-line px-2 py-6 transition-colors hover:bg-bg sm:gap-10 sm:px-4"
                >
                  <div className="flex w-14 shrink-0 flex-col items-center leading-none sm:w-16">
                    <span className="font-serif text-3xl text-ink sm:text-4xl">{day}</span>
                    <span className="mt-1 text-[11px] tracking-widest text-ink-soft uppercase">
                      {month}
                    </span>
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <h3 className="truncate font-serif text-lg text-ink sm:text-xl">
                      {event.title}
                    </h3>
                    <p className="text-xs text-ink-soft sm:text-sm">
                      {place.name} · {place.sido}
                    </p>
                  </div>
                  <ArrowRight
                    size={18}
                    className="shrink-0 -translate-x-2 text-ink-soft opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-accent group-hover:opacity-100"
                  />
                </Link>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link href="/events" className="link-underline text-sm text-ink">
            전체 전시 일정 보기
          </Link>
        </div>
      </div>
    </section>
  );
}
