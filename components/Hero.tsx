"use client";

import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { useState } from "react";
import { places, events, SIDO_LIST, isOngoing } from "@/lib/data";

const HERO_IMAGE =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/National_Museum_of_Korea%2C_Seoul_%282%29_%2840236586235%29.jpg/960px-National_Museum_of_Korea%2C_Seoul_%282%29_%2840236586235%29.jpg";

export default function Hero() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/events?q=${encodeURIComponent(q)}` : "/events");
  }

  const ongoingCount = events.filter((e) => isOngoing(e)).length;
  const stats = [
    { value: places.length, suffix: "곳", label: "등록 문화공간" },
    { value: SIDO_LIST.length, suffix: "개", label: "전국 시도" },
    { value: ongoingCount, suffix: "건", label: "진행 중 전시" },
  ];

  return (
    <section className="relative flex min-h-[85vh] flex-col justify-end overflow-hidden bg-ink">
      <img
        src={HERO_IMAGE}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-ink/55 to-ink" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 pb-14 pt-32 sm:px-6 sm:pb-20">
        <div className="flex flex-col items-start gap-6">
          <span className="text-xs tracking-[0.2em] text-bg/70">
            MUSEUM ROAD — CULTURAL SPACES OF KOREA
          </span>
          <h1 className="max-w-2xl font-serif text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-bg">
            오늘, 어떤 공간을
            <br />
            걸을까요
          </h1>
          <p className="max-w-md text-sm leading-7 text-bg/70 sm:text-base">
            전국의 박물관, 미술관, 건축물을 한 곳에서 천천히 둘러보세요.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-2 flex w-full max-w-xl items-center gap-2 rounded-full border border-bg/30 bg-ink/20 p-1.5 backdrop-blur-sm transition focus-within:border-accent"
          >
            <Search size={18} className="ml-3 shrink-0 text-bg/60" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="장소명, 지역, 전시명을 검색해보세요"
              className="w-full bg-transparent px-1 py-2.5 text-sm text-bg outline-none placeholder:text-bg/50"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-bg transition hover:brightness-110"
            >
              검색
            </button>
          </form>
        </div>

        <div className="grid grid-cols-3 border-t border-bg/20 pt-6">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col gap-1 px-2 text-center sm:text-left ${
                i > 0 ? "border-l border-bg/20" : ""
              }`}
            >
              <span className="font-serif text-3xl text-bg sm:text-4xl">
                {stat.value}
                <span className="text-accent">{stat.suffix}</span>
              </span>
              <span className="text-xs text-bg/60 sm:text-sm">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
