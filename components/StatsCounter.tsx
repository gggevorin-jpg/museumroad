import { places, events, SIDO_LIST } from "@/lib/data";
import { isOngoing } from "@/lib/data";

export default function StatsCounter() {
  const ongoingCount = events.filter((e) => isOngoing(e)).length;
  const stats = [
    { label: "등록 문화공간", value: places.length, suffix: "곳" },
    { label: "전국 시도", value: SIDO_LIST.length, suffix: "개" },
    { label: "진행 중 전시", value: ongoingCount, suffix: "건" },
  ];

  return (
    <section className="mx-auto -mt-10 max-w-5xl px-4 sm:px-6">
      <div className="grid grid-cols-3 gap-4 rounded-2xl bg-white p-6 shadow-lg">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center gap-1 text-center">
            <span className="text-2xl font-bold text-navy sm:text-4xl">
              {stat.value}
              <span className="text-gold">{stat.suffix}</span>
            </span>
            <span className="text-xs text-navy/50 sm:text-sm">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
