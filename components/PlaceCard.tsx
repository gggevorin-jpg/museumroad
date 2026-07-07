import Link from "next/link";
import { MapPin } from "lucide-react";
import type { Place } from "@/lib/types";
import { TYPE_LABEL } from "@/lib/data";

const TYPE_TINT: Record<Place["type"], string> = {
  museum: "bg-cat-museum",
  gallery: "bg-cat-gallery",
  architecture: "bg-cat-architecture",
};

export default function PlaceCard({ place }: { place: Place }) {
  return (
    <Link href={`/place/${place.id}`} className="group flex flex-col">
      <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
        {place.image ? (
          <img
            src={place.image}
            alt={place.name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <div
            className={`absolute inset-0 flex items-center justify-center ${TYPE_TINT[place.type]}`}
          >
            <span className="font-serif text-6xl text-bg/40">{place.name.charAt(0)}</span>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1.5 pt-4">
        <span className="text-[11px] tracking-[0.15em] text-ink-soft uppercase">
          {TYPE_LABEL[place.type]}
        </span>
        <h3 className="font-serif text-lg text-ink transition-colors group-hover:text-accent">
          {place.name}
        </h3>
        <p className="flex items-center gap-1 text-xs text-ink-soft">
          <MapPin size={12} />
          {place.sido}
        </p>
        <p className="line-clamp-2 text-sm leading-6 text-ink-soft">{place.description}</p>
      </div>
    </Link>
  );
}
