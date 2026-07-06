"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  keyFor: (item: T, index: number) => string;
  cardWidth?: number;
  visible?: number;
  gap?: number;
  autoplayMs?: number;
  edgeFadeClassName?: string;
}

export default function Carousel<T>({
  items,
  renderItem,
  keyFor,
  cardWidth = 240,
  visible = 4,
  gap = 16,
  autoplayMs = 2000,
  edgeFadeClassName = "from-ivory",
}: CarouselProps<T>) {
  const BASE = items;
  const STEP = cardWidth + gap;
  const loopable = BASE.length > visible;
  const LOOP = loopable ? [...BASE, ...BASE, ...BASE] : BASE;
  const [index, setIndex] = useState(loopable ? BASE.length : 0);
  const [animate, setAnimate] = useState(true);
  const pausedRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!loopable) return;
    timerRef.current = setInterval(() => {
      if (!pausedRef.current) setIndex((i) => i + 1);
    }, autoplayMs);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [loopable, autoplayMs]);

  useEffect(() => {
    if (!loopable) return;
    if (index >= BASE.length * 2 || index < BASE.length) {
      const id = setTimeout(() => {
        setAnimate(false);
        setIndex(
          (i) => BASE.length + (((i - BASE.length) % BASE.length) + BASE.length) % BASE.length
        );
      }, 700);
      return () => clearTimeout(id);
    }
  }, [index, BASE.length, loopable]);

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

  if (BASE.length === 0) return null;

  const containerWidth = visible * cardWidth + (visible - 1) * gap + (loopable ? 90 : 0);
  const offsetX = loopable ? index * STEP - 45 : 0;

  return (
    <div
      className="relative mx-auto"
      style={{ maxWidth: containerWidth }}
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
    >
      {loopable && (
        <>
          <div
            className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r ${edgeFadeClassName} to-transparent`}
          />
          <div
            className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l ${edgeFadeClassName} to-transparent`}
          />
        </>
      )}

      <div className="overflow-hidden">
        <div
          className={`flex ${animate ? "transition-transform duration-700 ease-out" : ""}`}
          style={{ gap, transform: `translateX(-${offsetX}px)` }}
        >
          {LOOP.map((item, i) => {
            const distance = i - index;
            const isDim = loopable && (distance < 0 || distance >= visible);
            return (
              <div
                key={keyFor(item, i)}
                style={{ width: cardWidth, flexShrink: 0 }}
                className={`transition-opacity duration-700 ${isDim ? "opacity-30" : "opacity-100"}`}
              >
                {renderItem(item, i % BASE.length)}
              </div>
            );
          })}
        </div>
      </div>

      {loopable && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="이전"
            className="absolute left-1 top-16 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-orange-500 text-white shadow-md transition hover:bg-orange-600"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="다음"
            className="absolute right-1 top-16 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-orange-500 text-white shadow-md transition hover:bg-orange-600"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}
    </div>
  );
}
