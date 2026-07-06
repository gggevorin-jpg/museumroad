"use client";

import SectionHeading from "@/components/SectionHeading";
import PlaceCard from "@/components/PlaceCard";
import Carousel from "@/components/Carousel";
import { getFeaturedPlaces } from "@/lib/data";

export default function FeaturedPlaces() {
  const featured = getFeaturedPlaces();
  if (featured.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <SectionHeading
        badge="에디터 추천"
        title="지금 가볼 만한 추천 공간"
        subtitle="전국에서 꼭 한번쯤 들러볼 만한 상징적인 문화공간을 모았어요."
        align="left"
      />
      <Carousel
        items={featured}
        cardWidth={280}
        keyFor={(place) => place.id}
        renderItem={(place) => <PlaceCard place={place} />}
      />
    </section>
  );
}
