import { LatLngTuple } from "leaflet";

interface IGeometry {
  type: string;
  coordinates: LatLngTuple;
}

interface ICategory {
  id: number;
  category: string;
}

export interface IAddress {
  uuid: number;
  year: number;
  loc_name?: string;
  status: string;
  score: number;
  match_type: string;
  match_addr: string;
  addr_type: string;
  geocoding: string;
  company_name: string;
  company_name_chinese?: string;
  business_description?: string;
  building_name?: string;
  arc_single?: string;
  categories: ICategory[];
  geometry: IGeometry;
}

declare module "leaflet" {
  export interface CircleMarkerOptions extends CircleMarkerOptions {
    metadata: Partial<IAddress>;
  }
}
