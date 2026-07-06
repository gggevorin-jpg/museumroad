export type PlaceType = "museum" | "gallery" | "architecture";

export interface NearbySpot {
  kind: string;
  name: string;
  walk: string;
}

export interface Place {
  id: string;
  type: PlaceType;
  name: string;
  sido: string;
  address: string;
  phone: string;
  website: string;
  hours: string;
  closed: string;
  fee: string;
  transit: string;
  parking: string;
  description: string;
  nearby: NearbySpot[];
  featured: boolean;
}

export interface ExhibitionEvent {
  placeId: string;
  title: string;
  start: string;
  end: string;
  url: string;
}
