/*
  # Add trigger to automatically delete images on property deletion

  1. Purpose
    - Automatically clean up property images from storage when a property is deleted
    - Prevents orphaned files from accumulating in storage

  2. Implementation
    - Create a function to delete all images associated with a property
    - Create a trigger that fires BEFORE a property is deleted
    - The trigger will handle image cleanup automatically

  3. Important Notes
    - This uses Supabase's storage.delete() function
    - Runs before deletion to ensure image_urls are still accessible
    - Continues with property deletion even if some images fail to delete
*/

-- Create function to delete property images from storage
CREATE OR REPLACE FUNCTION delete_property_images()
RETURNS TRIGGER AS $$
DECLARE
  image_url text;
  image_path text;
BEGIN
  -- Loop through each image URL in the old record
  IF OLD.image_urls IS NOT NULL THEN
    FOREACH image_url IN ARRAY OLD.image_urls
    LOOP
      -- Extract the path from the full URL
      -- URL format: https://[project].supabase.co/storage/v1/object/public/property-images/[path]
      image_path := regexp_replace(image_url, '^.*/property-images/', '');
      
      -- Delete the image from storage (silently fail if image doesn't exist)
      BEGIN
        PERFORM storage.delete('property-images', image_path);
      EXCEPTION WHEN OTHERS THEN
        -- Log error but continue (don't block property deletion)
        RAISE NOTICE 'Failed to delete image: %', image_path;
      END;
    END LOOP;
  END IF;
  
  RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to run before property deletion
DROP TRIGGER IF EXISTS trigger_delete_property_images ON properties;
CREATE TRIGGER trigger_delete_property_images
  BEFORE DELETE ON properties
  FOR EACH ROW
  EXECUTE FUNCTION delete_property_images();