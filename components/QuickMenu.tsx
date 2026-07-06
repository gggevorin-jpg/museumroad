import Link from "next/link";
import { Landmark, Palette, Building2, CalendarDays } from "lucide-react";

const ITEMS = [
  { href: "/events?type=museum", label: "박물관", icon: Landmark },
  { href: "/events?type=gallery", label: "미술관", icon: Palette },
  { href: "/events?type=architecture", label: "건축물", icon: Building2 },
  { href: "/events", label: "전시 일정", icon: CalendarDays },
];

export default function QuickMenu() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {ITEMS.map(({ href, label, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            className="flex flex-col items-center gap-3 rounded-2xl border border-navy/10 bg-white p-6 text-center transition hover:-translate-y-1 hover:shadow-md"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-navy/5 text-navy">
              <Icon size={24} />
            </span>
            <span className="text-sm font-semibold text-navy">{label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
