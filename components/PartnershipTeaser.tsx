import Link from "next/link";
import { Building2, Handshake, MapPinned } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

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
    <section className="bg-ink px-4 py-24 text-bg sm:px-6 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            badge="Together"
            title="뮤지엄로드와 협업하기"
            subtitle="문화공간 등록부터 콘텐츠·지역 협력까지, 다양한 방식으로 함께할 수 있어요."
            theme="dark"
          />
        </Reveal>
        <div className="grid gap-10 sm:grid-cols-3">
          {CARDS.map(({ icon: Icon, title, desc }, i) => (
            <Reveal key={title} delay={i * 100} className="flex flex-col gap-3 border-t border-bg/15 pt-6">
              <Icon size={22} className="text-accent" />
              <h3 className="font-serif text-lg">{title}</h3>
              <p className="text-sm leading-6 text-bg/60">{desc}</p>
            </Reveal>
          ))}
        </div>
        <div className="mt-14 text-center">
          <Link
            href="/partnership"
            className="inline-block rounded-full border border-bg/30 px-7 py-2.5 text-sm text-bg transition hover:border-accent hover:text-accent"
          >
            협업 제안하기
          </Link>
        </div>
      </div>
    </section>
  );
}
