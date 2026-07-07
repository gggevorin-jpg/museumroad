import Link from "next/link";
import { MapPin } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import PlaceCard from "@/components/PlaceCard";
import Reveal from "@/components/Reveal";
import { getFeaturedPlaces, TYPE_LABEL } from "@/lib/data";

export default function FeaturedPlaces() {
  const featured = getFeaturedPlaces();
  if (featured.length === 0) return null;

  const [lead, ...rest] = featured;

  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
      <Reveal>
        <SectionHeading
          badge="Editor's Pick"
          title="지금 가볼 만한 추천 공간"
          subtitle="전국에서 꼭 한번쯤 들러볼 만한 상징적인 문화공간을 모았어요."
          align="left"
        />
      </Reveal>

      <div className="grid gap-x-8 gap-y-12 lg:grid-cols-2">
        <Reveal className="lg:row-span-2">
          <Link href={`/place/${lead.id}`} className="group flex flex-col">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm sm:aspect-[16/11]">
              {lead.image ? (
                <img
                  src={lead.image}
                  alt={lead.name}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.03]"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-cat-museum">
                  <span className="font-serif text-8xl text-bg/40">{lead.name.charAt(0)}</span>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2 pt-5">
              <span className="text-[11px] tracking-[0.15em] text-ink-soft uppercase">
                {TYPE_LABEL[lead.type]}
              </span>
              <h3 className="font-serif text-2xl text-ink transition-colors group-hover:text-accent sm:text-3xl">
                {lead.name}
              </h3>
              <p className="flex items-center gap-1 text-sm text-ink-soft">
                <MapPin size={13} />
                {lead.sido}
              </p>
              <p className="max-w-lg text-sm leading-7 text-ink-soft">{lead.description}</p>
            </div>
          </Link>
        </Reveal>

        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2">
          {rest.slice(0, 4).map((place, i) => (
            <Reveal key={place.id} delay={i * 80}>
              <PlaceCard place={place} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
