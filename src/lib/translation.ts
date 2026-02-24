import { supabase } from './supabase';

interface TranslationCache {
  [key: string]: string;
}

const translationCache: TranslationCache = {};

const CACHE_KEY_PREFIX = 'translation_cache_';

function getCacheKey(text: string, targetLang: string): string {
  return `${CACHE_KEY_PREFIX}${targetLang}_${text.substring(0, 50)}`;
}

function getFromLocalCache(text: string, targetLang: string): string | null {
  const key = getCacheKey(text, targetLang);
  return translationCache[key] || localStorage.getItem(key);
}

function saveToLocalCache(text: string, targetLang: string, translation: string): void {
  const key = getCacheKey(text, targetLang);
  translationCache[key] = translation;
  try {
    localStorage.setItem(key, translation);
  } catch (e) {
    console.warn('Failed to save to localStorage:', e);
  }
}

export async function translateText(
  text: string,
  targetLang: 'fr' | 'en',
  sourceLang: string = 'ro'
): Promise<string> {
  if (!text || text.trim() === '') {
    return text;
  }

  const cached = getFromLocalCache(text, targetLang);
  if (cached) {
    return cached;
  }

  try {
    const response = await fetch('https://libretranslate.de/translate', {
      method: 'POST',
      body: JSON.stringify({
        q: text,
        source: sourceLang,
        target: targetLang,
        format: 'text',
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error('Translation failed');
    }

    const data = await response.json();
    const translation = data.translatedText;

    saveToLocalCache(text, targetLang, translation);

    return translation;
  } catch (error) {
    console.error('Translation error:', error);
    return text;
  }
}

export async function translateProperty(
  property: any,
  targetLang: 'fr' | 'en'
): Promise<any> {
  const titleKey = `title_${targetLang}`;
  const descriptionKey = `description_${targetLang}`;
  const locationKey = `location_${targetLang}`;

  if (property[titleKey] && property[descriptionKey] && property[locationKey]) {
    return {
      title: property[titleKey],
      description: property[descriptionKey],
      location: property[locationKey],
    };
  }

  const [title, description, location] = await Promise.all([
    translateText(property.title_ro, targetLang),
    translateText(property.description_ro, targetLang),
    translateText(property.location_ro, targetLang),
  ]);

  return { title, description, location };
}

export async function batchTranslateProperties(
  properties: any[],
  targetLang: 'fr' | 'en'
): Promise<Map<string, any>> {
  const translations = new Map<string, any>();

  await Promise.all(
    properties.map(async (property) => {
      const translated = await translateProperty(property, targetLang);
      translations.set(property.id, translated);
    })
  );

  return translations;
}
