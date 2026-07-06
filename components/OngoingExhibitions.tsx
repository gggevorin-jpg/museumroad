"use client";

import Link from "next/link";
import { CalendarDays } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Carousel from "@/components/Carousel";
import { events, isOngoing, getPlaceById } from "@/lib/data";

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
    <section className="bg-white px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          badge="지금 만나는 전시"
          title="진행 중인 전시"
          subtitle="현재 관람할 수 있는 전국의 전시를 모았어요."
          align="left"
        />
        <Carousel
          items={ongoing}
          cardWidth={280}
          edgeFadeClassName="from-white"
          keyFor={({ event }) => `${event.placeId}-${event.title}`}
          renderItem={({ event, place }) => (
            <Link
              href={`/place/${event.placeId}`}
              className="flex h-full flex-col gap-2 rounded-xl border border-navy/10 p-5 transition hover:border-gold hover:shadow-md"
            >
              <span className="flex items-center gap-1 text-xs font-medium text-gold">
                <CalendarDays size={14} />
                {event.start} ~ {event.end}
              </span>
              <h3 className="font-bold text-navy">{event.title}</h3>
              <p className="text-sm text-navy/60">{place.name}</p>
            </Link>
          )}
        />
        <div className="mt-8 text-center">
          <Link
            href="/events"
            className="inline-block rounded-full border border-navy/20 px-6 py-2 text-sm font-semibold text-navy transition hover:border-gold hover:text-gold"
          >
            전체 전시 일정 보기
          </Link>
        </div>
      </div>
    </section>
  );
}
