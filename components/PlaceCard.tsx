import Link from "next/link";
import { MapPin } from "lucide-react";
import type { Place } from "@/lib/types";
import { TYPE_LABEL } from "@/lib/data";

const GRADIENTS: Record<Place["type"], string> = {
  museum: "from-navy to-navy/70",
  gallery: "from-gold to-navy",
  architecture: "from-navy via-navy/80 to-gold/60",
};

export default function PlaceCard({ place }: { place: Place }) {
  return (
    <Link
      href={`/place/${place.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-sm transition hover:shadow-lg"
    >
      <div
        className={`flex h-36 items-end bg-gradient-to-br p-4 ${GRADIENTS[place.type]}`}
      >
        <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-navy">
          {TYPE_LABEL[place.type]}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-bold text-navy group-hover:text-gold transition-colors">
          {place.name}
        </h3>
        <p className="flex items-center gap-1 text-xs text-navy/50">
          <MapPin size={14} />
          {place.sido}
        </p>
        <p className="line-clamp-2 text-sm text-navy/70">{place.description}</p>
      </div>
    </Link>
  );
}
