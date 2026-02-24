/*
  # Create Properties Table

  1. New Tables
    - `properties`
      - `id` (uuid, primary key) - Unique identifier for each property
      - `title_fr` (text) - Property title in French
      - `title_ro` (text) - Property title in Romanian
      - `description_fr` (text) - Detailed description in French
      - `description_ro` (text) - Detailed description in Romanian
      - `price` (numeric) - Property price
      - `type` (text) - Property type: 'sale' or 'rent'
      - `category` (text) - Category: 'apartment', 'house', 'land', 'commercial'
      - `surface` (numeric) - Surface area in square meters
      - `rooms` (integer) - Number of rooms
      - `bathrooms` (integer) - Number of bathrooms
      - `location_fr` (text) - Location in French
      - `location_ro` (text) - Location in Romanian
      - `city` (text) - City name
      - `images` (jsonb) - Array of image URLs
      - `features` (jsonb) - Array of property features
      - `latitude` (numeric) - GPS latitude
      - `longitude` (numeric) - GPS longitude
      - `featured` (boolean) - Featured property flag
      - `status` (text) - Status: 'available', 'sold', 'rented'
      - `created_at` (timestamptz) - Creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on `properties` table
    - Add policy for public read access to available properties
    - Add policy for admin full access
*/

CREATE TABLE IF NOT EXISTS properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_fr text NOT NULL,
  title_ro text NOT NULL,
  description_fr text NOT NULL,
  description_ro text NOT NULL,
  price numeric NOT NULL,
  type text NOT NULL CHECK (type IN ('sale', 'rent')),
  category text NOT NULL CHECK (category IN ('apartment', 'house', 'land', 'commercial')),
  surface numeric NOT NULL,
  rooms integer DEFAULT 0,
  bathrooms integer DEFAULT 0,
  location_fr text NOT NULL,
  location_ro text NOT NULL,
  city text NOT NULL,
  images jsonb DEFAULT '[]'::jsonb,
  features jsonb DEFAULT '[]'::jsonb,
  latitude numeric,
  longitude numeric,
  featured boolean DEFAULT false,
  status text DEFAULT 'available' CHECK (status IN ('available', 'sold', 'rented')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view available properties"
  ON properties
  FOR SELECT
  USING (status = 'available');

CREATE POLICY "Admins can insert properties"
  ON properties
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can update properties"
  ON properties
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admins can delete properties"
  ON properties
  FOR DELETE
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_properties_type ON properties(type);
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status);
CREATE INDEX IF NOT EXISTS idx_properties_featured ON properties(featured);
CREATE INDEX IF NOT EXISTS idx_properties_city ON properties(city);