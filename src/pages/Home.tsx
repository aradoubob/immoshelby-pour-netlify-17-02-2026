import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { PropertyCard } from '../components/PropertyCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useLanguage } from '../contexts/LanguageContext';
import type { Property, TranslatedProperty } from '../types';

export const Home: React.FC = () => {
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
        .eq('status', 'available')
        .limit(6)
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
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 rounded-lg mb-12">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">
            {language === 'fr' && 'Trouvez votre propriété idéale'}
            {language === 'en' && 'Find your ideal property'}
            {language === 'ar' && 'اعثر على العقار المثالي'}
          </h1>
          <p className="text-xl mb-8">
            {language === 'fr' && 'Découvrez nos meilleures offres immobilières'}
            {language === 'en' && 'Discover our best real estate offers'}
            {language === 'ar' && 'اكتشف أفضل عروضنا العقارية'}
          </p>
          <Link
            to="/properties"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors inline-block"
          >
            {t('properties')}
          </Link>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-8">{t('properties')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {properties.length === 0 && (
          <p className="text-center text-gray-600 py-12">
            {language === 'fr' && 'Aucune propriété disponible pour le moment'}
            {language === 'en' && 'No properties available at the moment'}
            {language === 'ar' && 'لا توجد عقارات متاحة حاليًا'}
          </p>
        )}
      </section>
    </div>
  );
};
