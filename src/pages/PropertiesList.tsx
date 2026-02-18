import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { PropertyCard } from '../components/PropertyCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useLanguage } from '../contexts/LanguageContext';
import type { Property, TranslatedProperty } from '../types';

export const PropertiesList: React.FC = () => {
  const [properties, setProperties] = useState<TranslatedProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const { language, t } = useLanguage();

  useEffect(() => {
    loadProperties();
  }, [language]);

  const loadProperties = async () => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const translated = (data as Property[]).map(property => ({
        id: property.id,
        title: property[`title_${language}` as keyof Property] as string,
        description: property[`description_${language}` as keyof Property] as string,
        price: property.price,
        location: property.location,
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        area: property.area,
        image_url: property.image_url,
        status: property.status,
        created_at: property.created_at,
      }));

      setProperties(translated);
    } catch (error) {
      console.error('Error loading properties:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">{t('properties')}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map(property => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>

      {properties.length === 0 && (
        <p className="text-center text-gray-600 py-12">
          {language === 'fr' && 'Aucune propriété disponible'}
          {language === 'en' && 'No properties available'}
          {language === 'ar' && 'لا توجد عقارات متاحة'}
        </p>
      )}
    </div>
  );
};
