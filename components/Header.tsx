"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { href: "/events", label: "전시 일정" },
  { href: "/partnership", label: "협업 제안" },
];

export default function Header({ overHero = false }: { overHero?: boolean }) {
  const [scrolled, setScrolled] = useState(!overHero);

  useEffect(() => {
    if (!overHero) return;
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [overHero]);

  const solid = !overHero || scrolled;

  return (
    <header
      className={`${overHero ? "fixed" : "sticky"} inset-x-0 top-0 z-50 transition-colors duration-500 ${
        solid
          ? "border-b border-line bg-bg/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
        <Link
          href="/"
          className={`font-serif text-lg tracking-tight transition-colors duration-500 ${
            solid ? "text-ink" : "text-bg"
          }`}
        >
          뮤지엄<span className="text-accent">로드</span>
        </Link>
        <nav
          className={`flex items-center gap-8 text-sm transition-colors duration-500 ${
            solid ? "text-ink-soft" : "text-bg/80"
          }`}
        >
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} className="link-underline">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
