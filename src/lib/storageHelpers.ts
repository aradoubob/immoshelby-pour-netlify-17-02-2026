import { supabase } from './supabase';

const BUCKET_NAME = 'property-images';

export interface UploadImageResult {
  url: string;
  path: string;
}

export async function uploadPropertyImage(
  propertyId: string,
  file: File,
  index: number
): Promise<UploadImageResult> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}_${index}.${fileExt}`;
  const filePath = `properties/${propertyId}/${fileName}`;

  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (error) {
    throw new Error(`Failed to upload image: ${error.message}`);
  }

  const { data: urlData } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(data.path);

  return {
    url: urlData.publicUrl,
    path: data.path
  };
}

export async function uploadPropertyImages(
  propertyId: string,
  files: File[]
): Promise<string[]> {
  const uploadPromises = files.map((file, index) =>
    uploadPropertyImage(propertyId, file, index)
  );

  const results = await Promise.all(uploadPromises);
  return results.map(result => result.url);
}

export async function deletePropertyImage(imagePath: string): Promise<void> {
  const path = imagePath.split('/storage/v1/object/public/property-images/')[1];

  if (!path) {
    throw new Error('Invalid image path');
  }

  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .remove([path]);

  if (error) {
    throw new Error(`Failed to delete image: ${error.message}`);
  }
}

export async function deleteAllPropertyImages(imageUrls: string[]): Promise<void> {
  const deletionPromises = imageUrls.map(url => deletePropertyImage(url));
  await Promise.all(deletionPromises);
}

export async function dataUrlToFile(dataUrl: string, fileName: string): Promise<File> {
  const response = await fetch(dataUrl);
  const blob = await response.blob();
  return new File([blob], fileName, { type: blob.type });
}

export function extractPathFromUrl(url: string): string | null {
  const match = url.match(/\/storage\/v1\/object\/public\/property-images\/(.+)$/);
  return match ? match[1] : null;
}

export function getImageThumbnailUrl(url: string, width: number = 200, height: number = 200): string {
  const path = extractPathFromUrl(url);
  if (!path) return url;

  return `${supabase.storage.from(BUCKET_NAME).getPublicUrl(path).data.publicUrl}?width=${width}&height=${height}`;
}
