export interface Property {
  id: string;
  title_ro: string;
  title_fr?: string;
  title_en?: string;
  description_ro: string;
  description_fr?: string;
  description_en?: string;
  price: number;
  type: 'sale' | 'rent';
  category: 'apartment' | 'house' | 'land' | 'commercial';
  surface: number;
  rooms: number;
  bathrooms: number;
  location_ro: string;
  location_fr?: string;
  location_en?: string;
  city: string;
  images: string[];
  image_urls?: string[];
  features: string[];
  latitude?: number;
  longitude?: number;
  featured: boolean;
  status: 'available' | 'sold' | 'rented';
  created_at: string;
  updated_at: string;
}

export interface AdminProfile {
  id: string;
  email: string;
  full_name: string;
  role: 'admin' | 'super_admin';
  created_at: string;
}

export type Language = 'fr' | 'ro' | 'en';
