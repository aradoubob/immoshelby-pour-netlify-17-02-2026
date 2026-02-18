/*
  # Restructure properties table for automatic translation
  
  ## Changes Made
  
  1. Modified Columns
    - `title_fr`, `description_fr`, `location_fr` - Made nullable (will be used as translation cache)
    
  2. New Columns
    - `title_en` (text, nullable) - English translation cache
    - `description_en` (text, nullable) - English translation cache
    - `location_en` (text, nullable) - English translation cache
    
  ## Important Notes
  
  - Romanian fields (title_ro, description_ro, location_ro) remain the primary source
  - French and English fields will be automatically populated by the translation system
  - This enables automatic translation while maintaining data integrity
  - Admin interface will only require Romanian input
*/

-- Add English translation cache columns
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'properties' AND column_name = 'title_en'
  ) THEN
    ALTER TABLE properties ADD COLUMN title_en text;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'properties' AND column_name = 'description_en'
  ) THEN
    ALTER TABLE properties ADD COLUMN description_en text;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'properties' AND column_name = 'location_en'
  ) THEN
    ALTER TABLE properties ADD COLUMN location_en text;
  END IF;
END $$;

-- Make French columns nullable (they will be translation cache)
ALTER TABLE properties ALTER COLUMN title_fr DROP NOT NULL;
ALTER TABLE properties ALTER COLUMN description_fr DROP NOT NULL;
ALTER TABLE properties ALTER COLUMN location_fr DROP NOT NULL;