"use client";

import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { useState } from "react";

export default function Hero() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/events?q=${encodeURIComponent(q)}` : "/events");
  }

  return (
    <section className="bg-navy px-4 py-20 text-center sm:px-6 sm:py-28">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6">
        <span className="rounded-full bg-gold/15 px-4 py-1 text-sm font-semibold text-gold">
          전국 문화공간 안내
        </span>
        <h1 className="text-3xl font-bold text-ivory sm:text-5xl">
          박물관·미술관·건축물,
          <br />
          한 곳에서 찾아보세요
        </h1>
        <p className="text-sm text-ivory/60 sm:text-base">
          전국 17개 시도의 문화공간과 진행 중인 전시 일정을 뮤지엄로드에서 확인하세요.
        </p>
        <form
          onSubmit={handleSubmit}
          className="mt-2 flex w-full max-w-xl items-center gap-2 rounded-full bg-ivory p-2 shadow-lg"
        >
          <Search size={20} className="ml-3 shrink-0 text-navy/40" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="장소명, 지역, 전시명을 검색해보세요"
            className="w-full bg-transparent px-1 py-2 text-sm text-navy outline-none placeholder:text-navy/40"
          />
          <button
            type="submit"
            className="shrink-0 rounded-full bg-gold px-5 py-2 text-sm font-semibold text-navy transition hover:brightness-110"
          >
            검색
          </button>
        </form>
      </div>
    </section>
  );
}
