"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CalendarDays, Search } from "lucide-react";
import { events, places, isOngoing, isUpcoming, SIDO_LIST, TYPE_LABEL } from "@/lib/data";
import type { PlaceType } from "@/lib/types";

type Status = "all" | "ongoing" | "upcoming";

export default function EventsExplorer() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [sido, setSido] = useState(searchParams.get("sido") ?? "all");
  const [status, setStatus] = useState<Status>((searchParams.get("status") as Status) ?? "all");
  const [type, setType] = useState((searchParams.get("type") as PlaceType | "all") ?? "all");

  const rows = useMemo(() => {
    return events
      .map((event) => ({ event, place: places.find((p) => p.id === event.placeId) }))
      .filter((row): row is { event: (typeof events)[number]; place: NonNullable<(typeof row)["place"]> } => !!row.place)
      .filter(({ event, place }) => {
        if (sido !== "all" && place.sido !== sido) return false;
        if (type !== "all" && place.type !== type) return false;
        if (status === "ongoing" && !isOngoing(event)) return false;
        if (status === "upcoming" && !isUpcoming(event)) return false;
        if (query.trim()) {
          const q = query.trim().toLowerCase();
          if (
            !event.title.toLowerCase().includes(q) &&
            !place.name.toLowerCase().includes(q) &&
            !place.sido.toLowerCase().includes(q)
          ) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => a.event.start.localeCompare(b.event.start));
  }, [query, sido, status, type]);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4">
        <div className="flex items-center gap-2 rounded-full border border-navy/15 bg-white px-4 py-2">
          <Search size={18} className="text-navy/40" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="전시명, 장소명, 지역으로 검색"
            className="w-full bg-transparent text-sm text-navy outline-none placeholder:text-navy/40"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {(["all", "ongoing", "upcoming"] as Status[]).map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                status === s
                  ? "bg-navy text-ivory"
                  : "border border-navy/15 text-navy/60 hover:border-gold hover:text-gold"
              }`}
            >
              {s === "all" ? "전체" : s === "ongoing" ? "진행 중" : "예정"}
            </button>
          ))}
          <span className="mx-1 w-px self-stretch bg-navy/10" />
          {(["all", "museum", "gallery", "architecture"] as (PlaceType | "all")[]).map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                type === t
                  ? "bg-gold text-navy"
                  : "border border-navy/15 text-navy/60 hover:border-gold hover:text-gold"
              }`}
            >
              {t === "all" ? "전체 유형" : TYPE_LABEL[t]}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSido("all")}
            className={`rounded-full px-3 py-1 text-xs font-medium transition ${
              sido === "all"
                ? "bg-navy text-ivory"
                : "border border-navy/10 text-navy/50 hover:border-gold hover:text-gold"
            }`}
          >
            전국
          </button>
          {SIDO_LIST.map((s) => (
            <button
              key={s}
              onClick={() => setSido(s)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                sido === s
                  ? "bg-navy text-ivory"
                  : "border border-navy/10 text-navy/50 hover:border-gold hover:text-gold"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {rows.length === 0 ? (
        <p className="py-20 text-center text-navy/50">조건에 맞는 전시가 없습니다.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rows.map(({ event, place }) => (
            <Link
              key={`${event.placeId}-${event.title}`}
              href={`/place/${place.id}`}
              className="flex flex-col gap-2 rounded-xl border border-navy/10 bg-white p-5 transition hover:border-gold hover:shadow-md"
            >
              <span
                className={`flex w-fit items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
                  isOngoing(event) ? "bg-gold/15 text-gold" : "bg-navy/5 text-navy/50"
                }`}
              >
                <CalendarDays size={12} />
                {isOngoing(event) ? "진행 중" : "예정"} · {event.start} ~ {event.end}
              </span>
              <h3 className="font-bold text-navy">{event.title}</h3>
              <p className="text-sm text-navy/60">
                {place.name} · {place.sido}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
