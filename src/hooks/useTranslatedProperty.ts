import { useState, useEffect } from 'react';
import { Property } from '../types';
import { translateProperty } from '../lib/translation';
import { useLanguage } from '../contexts/LanguageContext';

interface TranslatedProperty {
  title: string;
  description: string;
  location: string;
  isTranslating: boolean;
}

export function useTranslatedProperty(property: Property | null): TranslatedProperty {
  const { language } = useLanguage();
  const [translated, setTranslated] = useState<TranslatedProperty>({
    title: property?.title_ro || '',
    description: property?.description_ro || '',
    location: property?.location_ro || '',
    isTranslating: false,
  });

  useEffect(() => {
    if (!property) {
      setTranslated({
        title: '',
        description: '',
        location: '',
        isTranslating: false,
      });
      return;
    }

    if (language === 'ro') {
      setTranslated({
        title: property.title_ro,
        description: property.description_ro,
        location: property.location_ro,
        isTranslating: false,
      });
      return;
    }

    const fieldMap = {
      fr: {
        title: property.title_fr,
        description: property.description_fr,
        location: property.location_fr,
      },
      en: {
        title: property.title_en,
        description: property.description_en,
        location: property.location_en,
      },
    };

    const cached = fieldMap[language as 'fr' | 'en'];

    if (cached && cached.title && cached.description && cached.location) {
      setTranslated({
        title: cached.title,
        description: cached.description,
        location: cached.location,
        isTranslating: false,
      });
      return;
    }

    let isMounted = true;

    setTranslated((prev) => ({
      ...prev,
      isTranslating: true,
    }));

    translateProperty(property, language as 'fr' | 'en')
      .then((result) => {
        if (isMounted) {
          setTranslated({
            title: result.title,
            description: result.description,
            location: result.location,
            isTranslating: false,
          });
        }
      })
      .catch((error) => {
        console.error('Translation error:', error);
        if (isMounted) {
          setTranslated({
            title: property.title_ro,
            description: property.description_ro,
            location: property.location_ro,
            isTranslating: false,
          });
        }
      });

    return () => {
      isMounted = false;
    };
  }, [property, language]);

  return translated;
}

export function useTranslatedProperties(properties: Property[]): Map<string, TranslatedProperty> {
  const { language } = useLanguage();
  const [translations, setTranslations] = useState<Map<string, TranslatedProperty>>(new Map());

  useEffect(() => {
    if (language === 'ro') {
      const roTranslations = new Map<string, TranslatedProperty>();
      properties.forEach((property) => {
        roTranslations.set(property.id, {
          title: property.title_ro,
          description: property.description_ro,
          location: property.location_ro,
          isTranslating: false,
        });
      });
      setTranslations(roTranslations);
      return;
    }

    let isMounted = true;
    const newTranslations = new Map<string, TranslatedProperty>();

    properties.forEach((property) => {
      const cached =
        language === 'fr'
          ? {
              title: property.title_fr,
              description: property.description_fr,
              location: property.location_fr,
            }
          : {
              title: property.title_en,
              description: property.description_en,
              location: property.location_en,
            };

      if (cached.title && cached.description && cached.location) {
        newTranslations.set(property.id, {
          title: cached.title,
          description: cached.description,
          location: cached.location,
          isTranslating: false,
        });
      } else {
        newTranslations.set(property.id, {
          title: property.title_ro,
          description: property.description_ro,
          location: property.location_ro,
          isTranslating: true,
        });

        translateProperty(property, language as 'fr' | 'en').then((result) => {
          if (isMounted) {
            setTranslations((prev) => {
              const updated = new Map(prev);
              updated.set(property.id, {
                title: result.title,
                description: result.description,
                location: result.location,
                isTranslating: false,
              });
              return updated;
            });
          }
        });
      }
    });

    setTranslations(newTranslations);

    return () => {
      isMounted = false;
    };
  }, [properties, language]);

  return translations;
}
