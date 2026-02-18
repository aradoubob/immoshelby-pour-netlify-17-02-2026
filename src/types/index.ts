export type Language = 'fr' | 'en' | 'ar';

export type PropertyStatus = 'available' | 'sold' | 'rented';

export interface Property {
  id: string;
  title_fr: string;
  title_en: string;
  title_ro?: string;
  description_fr: string;
  description_en: string;
  description_ro?: string;
  price: number;
  location_fr: string;
  location_en: string;
  location_ro?: string;
  city: string;
  rooms: number;
  bathrooms: number;
  surface: number;
  images: string[];
  type: 'sale' | 'rent';
  category: 'apartment' | 'house' | 'land' | 'commercial';
  features?: string[];
  status: PropertyStatus;
  created_at: string;
}

export interface TranslatedProperty {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image_url: string;
  status: PropertyStatus;
  created_at: string;
}

export interface ScheduleRequest {
  id?: string;
  property_id: string;
  visitor_name: string;
  visitor_email: string;
  visitor_phone: string;
  preferred_date: string;
  message?: string;
  created_at?: string;
}
