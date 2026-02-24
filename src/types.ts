export interface Property {
  id: string;
  title_ro: string;
  description_ro: string;
  location_ro: string;
  title_fr?: string | null;
  description_fr?: string | null;
  location_fr?: string | null;
  title_en?: string | null;
  description_en?: string | null;
  location_en?: string | null;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image_url: string;
  created_at?: string;
}

export type Language = 'ro' | 'fr' | 'en';
