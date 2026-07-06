import Link from "next/link";
import ParticleBackground from "@/components/ParticleBackground";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-navy/10 bg-navy text-ivory/70">
      <ParticleBackground glow={false} />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 sm:px-6">
        <div className="text-lg font-bold text-ivory">
          뮤지엄<span className="text-gold">로드</span>
        </div>
        <p className="max-w-xl text-sm">
          전국 박물관·미술관·건축물 정보를 한눈에 모아보는 문화공간 안내 서비스입니다.
        </p>
        <div className="flex flex-wrap gap-4 text-sm">
          <Link href="/events" className="hover:text-gold transition-colors">
            전시 일정
          </Link>
          <Link href="/partnership" className="hover:text-gold transition-colors">
            협업 제안
          </Link>
        </div>
        <p className="text-xs text-ivory/40">© {new Date().getFullYear()} 뮤지엄로드</p>
      </div>
    </footer>
  );
}
