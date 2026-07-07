import Link from "next/link";
import { Landmark, Palette, Building2, CalendarDays } from "lucide-react";
import Reveal from "@/components/Reveal";

const ITEMS = [
  { href: "/events?type=museum", label: "박물관", icon: Landmark },
  { href: "/events?type=gallery", label: "미술관", icon: Palette },
  { href: "/events?type=architecture", label: "건축물", icon: Building2 },
  { href: "/events", label: "전시 일정", icon: CalendarDays },
];

export default function QuickMenu() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
      <Reveal>
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-4">
          {ITEMS.map(({ href, label, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              className="group flex flex-col items-center gap-3 bg-bg-elevated px-6 py-10 text-center transition-colors hover:bg-bg"
            >
              <Icon size={22} className="text-ink-soft transition-colors group-hover:text-accent" />
              <span className="text-sm text-ink">{label}</span>
            </Link>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
