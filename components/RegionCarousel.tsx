"use client";

import Link from "next/link";
import { MapPin } from "lucide-react";
import Carousel from "@/components/Carousel";
import { SIDO_LIST, slugifySido, getPlacesBySido, TYPE_LABEL } from "@/lib/data";
import type { Place } from "@/lib/types";

interface ShowcaseItem {
  sido: string;
  slug: string;
  count: number;
  place: Place;
}

const GRADIENTS = [
  "from-navy to-navy/70",
  "from-gold to-navy",
  "from-navy via-navy/80 to-gold/60",
  "from-navy to-gold/50",
];

function buildShowcase(): ShowcaseItem[] {
  return SIDO_LIST.map((sido) => {
    const places = getPlacesBySido(sido);
    const place = places.find((p) => p.featured) ?? places[0];
    return { sido, slug: slugifySido(sido), count: places.length, place };
  }).filter((item): item is ShowcaseItem => !!item.place);
}

const ITEMS = buildShowcase();

export default function RegionCarousel() {
  return (
    <Carousel
      items={ITEMS}
      keyFor={(item) => item.slug}
      renderItem={(item, i) => (
        <Link
          href={`/region/${item.slug}`}
          className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-sm"
        >
          <div
            className={`flex h-32 flex-col justify-between bg-gradient-to-br p-3 ${
              GRADIENTS[i % GRADIENTS.length]
            }`}
          >
            <span className="w-fit rounded-full bg-white/90 px-2 py-0.5 text-[11px] font-semibold text-navy">
              {TYPE_LABEL[item.place.type]}
            </span>
            <span className="text-xs font-medium text-ivory/80">대표 · {item.place.name}</span>
          </div>
          <div className="flex flex-col gap-1 p-3">
            <span className="font-bold text-navy group-hover:text-gold transition-colors">
              {item.sido}
            </span>
            <span className="flex items-center gap-1 text-xs text-navy/50">
              <MapPin size={12} />
              {item.count}곳
            </span>
          </div>
        </Link>
      )}
    />
  );
}
