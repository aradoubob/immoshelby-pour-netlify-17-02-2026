import { Link } from 'react-router-dom';
import { MapPin, Maximize, BedDouble, Bath, Euro } from 'lucide-react';
import { Property } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslatedProperty } from '../hooks/useTranslatedProperty';

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const { language } = useLanguage();
  const { title, location } = useTranslatedProperty(property);
  const mainImage = property.images[0] || 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg';

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105">
      <div className="relative h-64">
        <img
          src={mainImage}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {property.type === 'sale'
            ? language === 'fr'
              ? 'De vânzare'
              : 'De vânzare'
            : language === 'fr'
            ? 'De închiriat'
            : 'De închiriat'}
        </div>
        {property.featured && (
          <div className="absolute top-4 left-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Featured
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">{title}</h3>

        <div className="flex items-center text-gray-600 mb-4">
          <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
          <span className="text-sm line-clamp-1">{location}</span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-sm">
            {property.rooms > 0 && (
              <div className="flex items-center space-x-1">
                <BedDouble className="w-5 h-5 text-blue-600" />
                <span>{property.rooms}</span>
              </div>
            )}
            {property.bathrooms > 0 && (
              <div className="flex items-center space-x-1">
                <Bath className="w-5 h-5 text-blue-600" />
                <span>{property.bathrooms}</span>
              </div>
            )}
            <div className="flex items-center space-x-1">
              <Maximize className="w-5 h-5 text-blue-600" />
              <span>{property.surface}m²</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <Euro className="w-5 h-5 text-blue-600" />
            <span className="text-xl font-bold text-gray-800">
              {property.price.toLocaleString()}{' '}
              {property.type === 'rent'
                ? language === 'fr'
                  ? '/mois'
                  : '/lună'
                : ''}
            </span>
          </div>
          <Link
            to={`/property/${property.id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
          >
            {language === 'fr' ? 'Voir détails' : 'Vezi detalii'}
          </Link>
        </div>
      </div>
    </div>
  );
}
