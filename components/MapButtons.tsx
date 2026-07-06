import { naverMapUrl, googleMapUrl } from "@/lib/data";

export default function MapButtons({ name }: { name: string }) {
  return (
    <div className="flex flex-wrap gap-3">
      <a
        href={naverMapUrl(name)}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full bg-[#03c75a] px-5 py-2 text-sm font-semibold text-white transition hover:brightness-95"
      >
        네이버지도로 보기
      </a>
      <a
        href={googleMapUrl(name)}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full border border-navy/20 px-5 py-2 text-sm font-semibold text-navy transition hover:border-gold hover:text-gold"
      >
        구글지도로 보기
      </a>
    </div>
  );
}
