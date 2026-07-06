import Link from "next/link";
import { Building2, Handshake, MapPinned } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import ParticleBackground from "@/components/ParticleBackground";

const CARDS = [
  {
    icon: Building2,
    title: "문화공간 등록",
    desc: "운영 중인 박물관·미술관·건축물을 뮤지엄로드에 등록해보세요.",
  },
  {
    icon: Handshake,
    title: "콘텐츠 제휴",
    desc: "전시·행사 콘텐츠 제휴로 더 많은 방문객을 만나보세요.",
  },
  {
    icon: MapPinned,
    title: "지역 협력",
    desc: "지자체·관광기관과의 지역 문화 콘텐츠 협력을 제안합니다.",
  },
];

export default function PartnershipTeaser() {
  return (
    <section className="relative overflow-hidden bg-navy px-4 py-16 text-ivory sm:px-6">
      <ParticleBackground />
      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          badge="함께해요"
          title="뮤지엄로드와 협업하기"
          subtitle="문화공간 등록부터 콘텐츠·지역 협력까지, 다양한 방식으로 함께할 수 있어요."
          theme="dark"
        />
        <div className="grid gap-5 sm:grid-cols-3">
          {CARDS.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="flex flex-col gap-3 rounded-2xl border border-ivory/10 bg-ivory/5 p-6 backdrop-blur-sm"
            >
              <Icon size={28} className="text-gold" />
              <h3 className="font-bold">{title}</h3>
              <p className="text-sm text-ivory/60">{desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/partnership"
            className="inline-block rounded-full bg-gold px-6 py-2 text-sm font-semibold text-navy transition hover:brightness-110"
          >
            협업 제안하기
          </Link>
        </div>
      </div>
    </section>
  );
}
