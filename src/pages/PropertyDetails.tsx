import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Maximize, BedDouble, Bath, Check } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Property } from '../types';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslatedProperty } from '../hooks/useTranslatedProperty';

export function PropertyDetails() {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const { language, t } = useLanguage();
  const { title, description, location } = useTranslatedProperty(property);

  useEffect(() => {
    if (id) {
      loadProperty();
    }
  }, [id]);

  const loadProperty = async () => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;
      setProperty(data);
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900">{t.common.error}</h2>
        <p className="text-gray-600 mt-2">{t.common.noResults}</p>
      </div>
    );
  }

  const displayImages = property.image_urls && property.image_urls.length > 0 ? property.image_urls : property.images;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="mb-4">
            <img
              src={displayImages[selectedImage] || 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg'}
              alt={title}
              className="w-full h-[500px] object-cover rounded-lg shadow-lg"
            />
          </div>

          <div className="grid grid-cols-4 gap-2">
            {displayImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`border-2 rounded-lg overflow-hidden ${
                  selectedImage === index ? 'border-blue-600' : 'border-gray-200'
                }`}
              >
                <img src={image} alt={`${title} ${index + 1}`} className="w-full h-24 object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-2">
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
              {property.type === 'sale' ? t.home.sale : t.home.rent}
            </span>
            <span className="ml-2 text-gray-600">{t.property.category[property.category]}</span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>

          <div className="flex items-center text-gray-600 mb-6">
            <MapPin className="w-5 h-5 mr-2" />
            <span>{location}</span>
          </div>

          <div className="text-4xl font-bold text-blue-600 mb-6">
            €{property.price.toLocaleString()}
            {property.type === 'rent' && <span className="text-xl text-gray-600"> / {t.common.per} {language === 'fr' ? 'mois' : 'lună'}</span>}
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6 bg-gray-50 p-4 rounded-lg">
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <Maximize className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{property.surface}</div>
              <div className="text-sm text-gray-600">m²</div>
            </div>
            {property.rooms > 0 && (
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <BedDouble className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{property.rooms}</div>
                <div className="text-sm text-gray-600">{t.property.rooms}</div>
              </div>
            )}
            {property.bathrooms > 0 && (
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Bath className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{property.bathrooms}</div>
                <div className="text-sm text-gray-600">{t.property.bathrooms}</div>
              </div>
            )}
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3">{language === 'fr' ? 'Description' : 'Descriere'}</h2>
            <p className="text-gray-600 leading-relaxed">{description}</p>
          </div>

          {property.features.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3">{t.property.features}</h2>
              <div className="grid grid-cols-2 gap-2">
                {property.features.map((feature, index) => (
                  <div key={index} className="flex items-center text-gray-700">
                    <Check className="w-5 h-5 text-green-600 mr-2" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
