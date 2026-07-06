"use client";

import { useState } from "react";
import PlaceCard from "@/components/PlaceCard";
import type { Place, PlaceType } from "@/lib/types";
import { TYPE_LABEL } from "@/lib/data";

const FILTERS: { label: string; value: PlaceType | "all" }[] = [
  { label: "전체", value: "all" },
  { label: TYPE_LABEL.museum, value: "museum" },
  { label: TYPE_LABEL.gallery, value: "gallery" },
  { label: TYPE_LABEL.architecture, value: "architecture" },
];

export default function RegionPlaceList({ places }: { places: Place[] }) {
  const [filter, setFilter] = useState<PlaceType | "all">("all");
  const filtered = filter === "all" ? places : places.filter((p) => p.type === filter);

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              filter === f.value
                ? "bg-navy text-ivory"
                : "border border-navy/15 text-navy/60 hover:border-gold hover:text-gold"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
      {filtered.length === 0 ? (
        <p className="py-20 text-center text-navy/50">해당 조건의 장소가 없습니다.</p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      )}
    </div>
  );
}
