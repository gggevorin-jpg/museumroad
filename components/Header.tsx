import Link from "next/link";

const NAV_ITEMS = [
  { href: "/events", label: "전시 일정" },
  { href: "/partnership", label: "협업 제안" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-navy/10 bg-ivory/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="text-lg font-bold tracking-tight text-navy">
          뮤지엄<span className="text-gold">로드</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-navy/70">
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-gold transition-colors">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
