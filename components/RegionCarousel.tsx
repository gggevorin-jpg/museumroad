"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
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

const BASE = buildShowcase();
const LOOP = [...BASE, ...BASE, ...BASE];
const VISIBLE = 4;
const CARD_WIDTH = 240;
const GAP = 16;
const STEP = CARD_WIDTH + GAP;
const AUTOPLAY_MS = 2000;

export default function RegionCarousel() {
  const [index, setIndex] = useState(BASE.length);
  const [animate, setAnimate] = useState(true);
  const pausedRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      if (!pausedRef.current) setIndex((i) => i + 1);
    }, AUTOPLAY_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // seamless loop: silently snap back into the middle copy once we drift into an outer copy
  useEffect(() => {
    if (index >= BASE.length * 2 || index < BASE.length) {
      const id = setTimeout(() => {
        setAnimate(false);
        setIndex((i) => BASE.length + (((i - BASE.length) % BASE.length) + BASE.length) % BASE.length);
      }, 700);
      return () => clearTimeout(id);
    }
  }, [index]);

  useEffect(() => {
    if (!animate) {
      const id = requestAnimationFrame(() => setAnimate(true));
      return () => cancelAnimationFrame(id);
    }
  }, [animate]);

  function go(delta: number) {
    setAnimate(true);
    setIndex((i) => i + delta);
  }

  const containerWidth = VISIBLE * CARD_WIDTH + (VISIBLE - 1) * GAP + 90;

  return (
    <div
      className="relative mx-auto"
      style={{ maxWidth: containerWidth }}
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-ivory to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-ivory to-transparent" />

      <div className="overflow-hidden">
        <div
          className={`flex ${animate ? "transition-transform duration-700 ease-out" : ""}`}
          style={{ gap: GAP, transform: `translateX(-${index * STEP - 45}px)` }}
        >
          {LOOP.map((item, i) => {
            const distance = i - index;
            const isDim = distance < 0 || distance >= VISIBLE;
            return (
              <Link
                key={`${item.slug}-${i}`}
                href={`/region/${item.slug}`}
                style={{ width: CARD_WIDTH, flexShrink: 0 }}
                className={`group relative overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-sm transition-opacity duration-700 ${
                  isDim ? "opacity-30" : "opacity-100"
                }`}
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
            );
          })}
        </div>
      </div>

      <button
        type="button"
        onClick={() => go(-1)}
        aria-label="이전 지역"
        className="absolute left-1 top-16 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-orange-500 text-white shadow-md transition hover:bg-orange-600"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        type="button"
        onClick={() => go(1)}
        aria-label="다음 지역"
        className="absolute right-1 top-16 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-orange-500 text-white shadow-md transition hover:bg-orange-600"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
