"use client";

import Link from "next/link";
import Carousel from "@/components/Carousel";
import { SIDO_LIST, slugifySido, getPlacesBySido, TYPE_LABEL } from "@/lib/data";
import type { Place } from "@/lib/types";

interface ShowcaseItem {
  sido: string;
  slug: string;
  count: number;
  place: Place;
}

const TYPE_TINT: Record<Place["type"], string> = {
  museum: "bg-cat-museum",
  gallery: "bg-cat-gallery",
  architecture: "bg-cat-architecture",
};

function buildShowcase(): ShowcaseItem[] {
  return SIDO_LIST.map((sido) => {
    const places = getPlacesBySido(sido);
    const place =
      places.find((p) => p.featured && p.image) ??
      places.find((p) => p.image) ??
      places.find((p) => p.featured) ??
      places[0];
    return { sido, slug: slugifySido(sido), count: places.length, place };
  }).filter((item): item is ShowcaseItem => !!item.place);
}

const ITEMS = buildShowcase();

export default function RegionCarousel() {
  return (
    <Carousel
      items={ITEMS}
      cardWidth={230}
      autoplayMs={3200}
      keyFor={(item) => item.slug}
      renderItem={(item) => (
        <Link
          href={`/region/${item.slug}`}
          className="group relative block aspect-[3/4] w-full overflow-hidden rounded-sm"
        >
          {item.place.image ? (
            <img
              src={item.place.image}
              alt={item.place.name}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.04]"
            />
          ) : (
            <div
              className={`absolute inset-0 flex items-center justify-center ${
                TYPE_TINT[item.place.type]
              }`}
            >
              <span className="font-serif text-7xl text-bg/40">{item.sido.charAt(0)}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-4">
            <span className="text-[11px] tracking-[0.15em] uppercase text-bg/60">
              {TYPE_LABEL[item.place.type]}
            </span>
            <span className="font-serif text-xl text-bg">{item.sido}</span>
            <span className="text-xs text-bg/60">{item.count}곳</span>
          </div>
        </Link>
      )}
    />
  );
}
