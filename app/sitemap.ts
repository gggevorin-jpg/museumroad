import type { MetadataRoute } from "next";
import { places, SIDO_LIST, slugifySido } from "@/lib/data";

const BASE_URL = "https://museumroad.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = ["", "/events", "/partnership"].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
  }));

  const regionRoutes: MetadataRoute.Sitemap = SIDO_LIST.map((sido) => ({
    url: `${BASE_URL}/region/${slugifySido(sido)}`,
    lastModified: new Date(),
  }));

  const placeRoutes: MetadataRoute.Sitemap = places.map((place) => ({
    url: `${BASE_URL}/place/${place.id}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...regionRoutes, ...placeRoutes];
}
