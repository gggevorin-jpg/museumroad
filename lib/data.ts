import placesData from "@/data/places.json";
import eventsData from "@/data/events.json";
import type { Place, ExhibitionEvent, PlaceType } from "@/lib/types";

export const places = placesData as Place[];
export const events = eventsData as ExhibitionEvent[];

export const SIDO_LIST = [
  "서울특별시",
  "부산광역시",
  "대구광역시",
  "인천광역시",
  "광주광역시",
  "대전광역시",
  "울산광역시",
  "세종특별자치시",
  "경기도",
  "강원특별자치도",
  "충청북도",
  "충청남도",
  "전북특별자치도",
  "전라남도",
  "경상북도",
  "경상남도",
  "제주특별자치도",
];

export const TYPE_LABEL: Record<PlaceType, string> = {
  museum: "박물관",
  gallery: "미술관",
  architecture: "건축물",
};

export function slugifySido(sido: string): string {
  const map: Record<string, string> = {
    서울특별시: "seoul",
    부산광역시: "busan",
    대구광역시: "daegu",
    인천광역시: "incheon",
    광주광역시: "gwangju",
    대전광역시: "daejeon",
    울산광역시: "ulsan",
    세종특별자치시: "sejong",
    경기도: "gyeonggi",
    강원특별자치도: "gangwon",
    충청북도: "chungbuk",
    충청남도: "chungnam",
    전북특별자치도: "jeonbuk",
    전라남도: "jeonnam",
    경상북도: "gyeongbuk",
    경상남도: "gyeongnam",
    제주특별자치도: "jeju",
  };
  return map[sido] ?? sido;
}

export function sidoBySlug(slug: string): string | undefined {
  return SIDO_LIST.find((sido) => slugifySido(sido) === slug);
}

export function getPlaceById(id: string): Place | undefined {
  return places.find((p) => p.id === id);
}

export function getPlacesBySido(sido: string): Place[] {
  return places.filter((p) => p.sido === sido);
}

export function getFeaturedPlaces(): Place[] {
  return places.filter((p) => p.featured);
}

export function getEventsForPlace(placeId: string): ExhibitionEvent[] {
  return events.filter((e) => e.placeId === placeId);
}

export function isOngoing(event: ExhibitionEvent, today = new Date()): boolean {
  const start = new Date(event.start);
  const end = new Date(event.end);
  return start <= today && today <= end;
}

export function isUpcoming(event: ExhibitionEvent, today = new Date()): boolean {
  return new Date(event.start) > today;
}

export function naverMapUrl(name: string): string {
  return `https://map.naver.com/p/search/${encodeURIComponent(name)}`;
}

export function googleMapUrl(name: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name)}`;
}
