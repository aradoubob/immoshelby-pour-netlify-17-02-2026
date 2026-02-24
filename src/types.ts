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
  rooms: number;
  bathrooms: number;
  surface: number;
  images?: any;
  city: string;
  type: 'sale' | 'rent';
  category: 'apartment' | 'house' | 'land' | 'commercial';
  status?: string;
  featured?: boolean;
  created_at?: string;
}

export type Language = 'ro' | 'fr' | 'en';
