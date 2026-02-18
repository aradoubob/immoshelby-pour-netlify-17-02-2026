import React from 'react';
import { Link } from 'react-router-dom';
import { Bed, Bath, Maximize } from 'lucide-react';
import type { TranslatedProperty } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface PropertyCardProps {
  property: TranslatedProperty;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const { t } = useLanguage();

  const statusColors = {
    available: 'bg-green-100 text-green-800',
    sold: 'bg-red-100 text-red-800',
    rented: 'bg-yellow-100 text-yellow-800',
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <div className="relative h-48">
        <img
          src={property.image_url}
          alt={property.title}
          className="w-full h-full object-cover"
        />
        <span className={`absolute top-2 right-2 px-3 py-1 rounded-full text-sm font-medium ${statusColors[property.status]}`}>
          {t(property.status)}
        </span>
      </div>

      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{property.title}</h3>
        <p className="text-gray-600 mb-3 line-clamp-2">{property.description}</p>

        <div className="flex items-center gap-4 mb-3 text-gray-700">
          <div className="flex items-center gap-1">
            <Bed size={18} />
            <span>{property.bedrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath size={18} />
            <span>{property.bathrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Maximize size={18} />
            <span>{property.area}m²</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-blue-600">
            {property.price.toLocaleString()} DH
          </span>
          <Link
            to={`/property/${property.id}`}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            {t('viewDetails')} →
          </Link>
        </div>
      </div>
    </div>
  );
};
