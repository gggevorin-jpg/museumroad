import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-bg/10 bg-ink text-bg/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-20 sm:px-6">
        <div className="font-serif text-xl text-bg">
          뮤지엄<span className="text-accent">로드</span>
        </div>
        <p className="max-w-md text-sm leading-7">
          전국 박물관·미술관·건축물 정보를 한눈에 모아보는 문화공간 안내 서비스입니다.
        </p>
        <div className="flex flex-wrap gap-6 text-sm">
          <Link href="/events" className="link-underline">
            전시 일정
          </Link>
          <Link href="/partnership" className="link-underline">
            협업 제안
          </Link>
        </div>
        <p className="mt-6 text-xs text-bg/35">© {new Date().getFullYear()} 뮤지엄로드</p>
      </div>
    </footer>
  );
}
