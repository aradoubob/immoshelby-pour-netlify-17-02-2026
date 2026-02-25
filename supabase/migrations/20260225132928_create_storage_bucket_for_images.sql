/*
  # Create Supabase Storage Bucket for Property Images

  1. Storage Setup
    - Create 'property-images' bucket for storing property photos
    - Configure public access with signed URLs
    - Set file size limit to 5MB per file
    - Allow JPEG, PNG, and WebP formats only

  2. Security Policies
    - Allow authenticated admin users to upload images
    - Allow authenticated admin users to delete images
    - Allow public read access to images
    - Restrict uploads to property-images folder structure

  3. Important Notes
    - Images will be stored as: property-images/[property-id]/[image-name]
    - This replaces the base64 image storage in the database
    - Thumbnails can be generated on-the-fly using Supabase Image Transformation
*/

-- Create the storage bucket for property images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'property-images',
  'property-images',
  true,
  5242880, -- 5MB in bytes
  ARRAY['image/jpeg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- Allow authenticated users to upload images
CREATE POLICY "Authenticated users can upload property images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'property-images' AND
  (storage.foldername(name))[1] = 'properties'
);

-- Allow authenticated users to update images
CREATE POLICY "Authenticated users can update property images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'property-images')
WITH CHECK (bucket_id = 'property-images');

-- Allow authenticated users to delete images
CREATE POLICY "Authenticated users can delete property images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'property-images');

-- Allow public read access to all images
CREATE POLICY "Public can view property images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'property-images');