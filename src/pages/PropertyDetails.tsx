import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Bed, Bath, Maximize, MapPin, ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useLanguage } from '../contexts/LanguageContext';
import type { Property, TranslatedProperty } from '../types';

export const PropertyDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<TranslatedProperty | null>(null);
  const [loading, setLoading] = useState(true);
  const { language, t } = useLanguage();

  useEffect(() => {
    if (id) {
      loadProperty(id);
    }
  }, [id, language]);

  const loadProperty = async (propertyId: string) => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', propertyId)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        const prop = data as Property;
        setProperty({
          id: prop.id,
          title: prop[`title_${language}` as keyof Property] as string,
          description: prop[`description_${language}` as keyof Property] as string,
          price: prop.price,
          location: prop.location,
          bedrooms: prop.bedrooms,
          bathrooms: prop.bathrooms,
          area: prop.area,
          image_url: prop.image_url,
          status: prop.status,
          created_at: prop.created_at,
        });
      }
    } catch (error) {
      console.error('Error loading property:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!property) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-4">{t('error')}</p>
        <Link to="/properties" className="text-blue-600 hover:text-blue-700">
          {t('properties')}
        </Link>
      </div>
    );
  }

  const statusColors = {
    available: 'bg-green-100 text-green-800',
    sold: 'bg-red-100 text-red-800',
    rented: 'bg-yellow-100 text-yellow-800',
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Link
        to="/properties"
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
      >
        <ArrowLeft size={20} />
        {t('properties')}
      </Link>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-96">
          <img
            src={property.image_url}
            alt={property.title}
            className="w-full h-full object-cover"
          />
          <span className={`absolute top-4 right-4 px-4 py-2 rounded-full text-sm font-medium ${statusColors[property.status]}`}>
            {t(property.status)}
          </span>
        </div>

        <div className="p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{property.title}</h1>

          <div className="flex items-center gap-2 text-gray-600 mb-6">
            <MapPin size={20} />
            <span className="text-lg">{property.location}</span>
          </div>

          <div className="flex items-center gap-8 mb-8 text-gray-700">
            <div className="flex items-center gap-2">
              <Bed size={24} />
              <span className="text-lg">{property.bedrooms} {t('bedrooms')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Bath size={24} />
              <span className="text-lg">{property.bathrooms} {t('bathrooms')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Maximize size={24} />
              <span className="text-lg">{property.area}m²</span>
            </div>
          </div>

          <div className="border-t border-b py-6 mb-6">
            <p className="text-4xl font-bold text-blue-600">
              {property.price.toLocaleString()} DH
            </p>
          </div>

          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold mb-4">Description</h2>
            <p className="text-gray-700 leading-relaxed">{property.description}</p>
          </div>

          <div className="mt-8">
            <Link
              to="/contact"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors inline-block"
            >
              {t('scheduleVisit')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
