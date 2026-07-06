import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";
import { Building2, Handshake, MapPinned, Mail } from "lucide-react";

export const metadata = {
  title: "협업 제안 | 뮤지엄로드",
  description: "문화공간 등록, 콘텐츠 제휴, 지역 협력을 뮤지엄로드와 함께해보세요.",
};

const CONTACT_EMAIL = "gggevorin@gmail.com";

const CARDS = [
  {
    icon: Building2,
    title: "문화공간 등록",
    desc: "운영 중인 박물관·미술관·건축물을 뮤지엄로드에 등록하고 더 많은 방문객에게 소개하세요.",
    subject: "[뮤지엄로드] 문화공간 등록 문의",
  },
  {
    icon: Handshake,
    title: "콘텐츠 제휴",
    desc: "전시·행사 콘텐츠를 함께 소개하는 제휴를 제안합니다. 전시 홍보와 방문객 유입에 도움을 드려요.",
    subject: "[뮤지엄로드] 콘텐츠 제휴 문의",
  },
  {
    icon: MapPinned,
    title: "지역 협력",
    desc: "지자체·관광기관과 함께 지역 문화 콘텐츠를 확산하는 협력을 제안합니다.",
    subject: "[뮤지엄로드] 지역 협력 문의",
  },
];

export default function PartnershipPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <SectionHeading
            badge="함께해요"
            title="뮤지엄로드와 협업 제안하기"
            subtitle="문화공간 등록부터 콘텐츠·지역 협력까지, 이메일로 편하게 문의해주세요."
          />
          <div className="grid gap-6 sm:grid-cols-3">
            {CARDS.map(({ icon: Icon, title, desc, subject }) => (
              <div
                key={title}
                className="flex flex-col gap-4 rounded-2xl border border-navy/10 bg-white p-6"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-navy/5 text-navy">
                  <Icon size={24} />
                </span>
                <h3 className="font-bold text-navy">{title}</h3>
                <p className="flex-1 text-sm text-navy/60">{desc}</p>
                <a
                  href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`}
                  className="flex w-fit items-center gap-2 rounded-full bg-gold px-5 py-2 text-sm font-semibold text-navy transition hover:brightness-110"
                >
                  <Mail size={16} />
                  문의하기
                </a>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
