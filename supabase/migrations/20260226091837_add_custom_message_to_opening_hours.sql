/*
  # Add custom message field to opening hours

  1. Changes
    - Add `custom_message` column to `opening_hours` table
    - This allows displaying custom text like "cu programare" (by appointment) instead of fixed hours
    - Particularly useful for Sunday or special cases

  2. Notes
    - When `custom_message` is set, it will be displayed instead of opening/closing times
    - Existing data is preserved
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'opening_hours' AND column_name = 'custom_message'
  ) THEN
    ALTER TABLE opening_hours ADD COLUMN custom_message text;
  END IF;
END $$;