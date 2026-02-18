export type Language = 'fr' | 'en' | 'ar';

export type PropertyStatus = 'available' | 'sold' | 'rented';

export interface Property {
  id: string;
  title_fr: string;
  title_en: string;
  title_ar: string;
  description_fr: string;
  description_en: string;
  description_ar: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image_url: string;
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
