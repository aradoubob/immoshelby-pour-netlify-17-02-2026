/*
  # Add image_urls field to properties table

  1. Changes
    - Add image_urls column to store array of image URLs from Supabase Storage
    - Keep existing image_data field temporarily for migration purposes
    - Set default to empty array for new properties

  2. Migration Strategy
    - New properties will use image_urls only
    - Existing properties can be migrated gradually
    - After migration, image_data can be dropped in a future migration

  3. Important Notes
    - Each property can have up to 10 images
    - First image in array is the primary/featured image
    - URLs will be in format: [supabase-url]/storage/v1/object/public/property-images/properties/[property-id]/[image-name]
*/

-- Add image_urls column to properties table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'properties' AND column_name = 'image_urls'
  ) THEN
    ALTER TABLE properties ADD COLUMN image_urls text[] DEFAULT '{}';
  END IF;
END $$;

-- Create index on image_urls for faster queries
CREATE INDEX IF NOT EXISTS idx_properties_has_images ON properties ((array_length(image_urls, 1) > 0));