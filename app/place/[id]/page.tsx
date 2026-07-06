import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, CalendarOff, Ticket, Phone, Bus, ParkingCircle, CalendarDays } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MapButtons from "@/components/MapButtons";
import {
  places,
  getPlaceById,
  getEventsForPlace,
  isOngoing,
  slugifySido,
  naverMapUrl,
  TYPE_LABEL,
} from "@/lib/data";

const GRADIENTS: Record<string, string> = {
  museum: "from-navy to-navy/70",
  gallery: "from-gold to-navy",
  architecture: "from-navy via-navy/80 to-gold/60",
};

export function generateStaticParams() {
  return places.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const place = getPlaceById(id);
  return {
    title: place ? `${place.name} | 뮤지엄로드` : "뮤지엄로드",
    description: place?.description,
  };
}

export default async function PlacePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const place = getPlaceById(id);
  if (!place) notFound();

  const placeEvents = getEventsForPlace(place.id);

  const infoRows = [
    { icon: Clock, label: "관람시간", value: place.hours },
    { icon: CalendarOff, label: "휴관일", value: place.closed },
    { icon: Ticket, label: "관람료", value: place.fee },
    place.phone
      ? { icon: Phone, label: "전화", value: place.phone, href: `tel:${place.phone}` }
      : null,
    { icon: Bus, label: "오시는 길", value: place.transit },
    { icon: ParkingCircle, label: "주차", value: place.parking },
  ].filter(Boolean) as { icon: typeof Clock; label: string; value: string; href?: string }[];

  return (
    <>
      <Header />
      <main className="flex-1">
        <div
          className={`flex h-56 items-end bg-gradient-to-br p-6 sm:h-72 ${GRADIENTS[place.type]}`}
        >
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-2">
            <span className="w-fit rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-navy">
              {TYPE_LABEL[place.type]}
            </span>
            <h1 className="text-2xl font-bold text-ivory sm:text-4xl">{place.name}</h1>
            <Link
              href={`/region/${slugifySido(place.sido)}`}
              className="w-fit text-sm text-ivory/70 hover:text-gold"
            >
              {place.sido}
            </Link>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <p className="mb-8 max-w-2xl text-navy/80">{place.description}</p>

          <div className="mb-8 grid gap-4 sm:grid-cols-2">
            {infoRows.map((row) => (
              <div key={row.label} className="flex items-start gap-3 rounded-xl border border-navy/10 p-4">
                <row.icon size={20} className="mt-0.5 shrink-0 text-gold" />
                <div>
                  <div className="text-xs font-semibold text-navy/50">{row.label}</div>
                  {row.href ? (
                    <a href={row.href} className="text-sm font-medium text-navy hover:text-gold">
                      {row.value}
                    </a>
                  ) : (
                    <div className="text-sm text-navy">{row.value}</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mb-12">
            <MapButtons name={place.name} />
          </div>

          {placeEvents.length > 0 && (
            <section className="mb-12">
              <h2 className="mb-4 text-lg font-bold text-navy">전시 일정</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {placeEvents.map((event) => (
                  <a
                    key={event.title}
                    href={event.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col gap-1 rounded-xl border border-navy/10 p-4 transition hover:border-gold hover:shadow-md"
                  >
                    <span
                      className={`flex w-fit items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
                        isOngoing(event) ? "bg-gold/15 text-gold" : "bg-navy/5 text-navy/50"
                      }`}
                    >
                      <CalendarDays size={12} />
                      {isOngoing(event) ? "진행 중" : "예정"}
                    </span>
                    <h3 className="font-semibold text-navy">{event.title}</h3>
                    <p className="text-xs text-navy/50">
                      {event.start} ~ {event.end}
                    </p>
                  </a>
                ))}
              </div>
            </section>
          )}

          {place.nearby.length > 0 && (
            <section>
              <h2 className="mb-4 text-lg font-bold text-navy">주변 맛집·카페·핫플</h2>
              <div className="grid gap-3 sm:grid-cols-3">
                {place.nearby.map((spot) => (
                  <a
                    key={spot.name}
                    href={naverMapUrl(spot.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col gap-1 rounded-xl border border-navy/10 p-4 transition hover:border-gold hover:shadow-md"
                  >
                    <span className="w-fit rounded-full bg-navy/5 px-2 py-0.5 text-xs font-semibold text-navy/60">
                      {spot.kind}
                    </span>
                    <h3 className="font-semibold text-navy">{spot.name}</h3>
                    <p className="text-xs text-navy/50">{spot.walk}</p>
                  </a>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
