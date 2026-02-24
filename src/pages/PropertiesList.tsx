import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Search } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Property } from '../types';
import { PropertyCard } from '../components/PropertyCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useLanguage } from '../contexts/LanguageContext';

export function PropertiesList() {
  const location = useLocation();
  const type = location.pathname.includes('/sale') ? 'sale' : 'rent';
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');
  const { language, t } = useLanguage();

  useEffect(() => {
    loadProperties();
  }, [type]);

  useEffect(() => {
    filterAndSortProperties();
  }, [properties, searchTerm, categoryFilter, sortBy, language]);

  const loadProperties = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('status', 'available')
        .eq('type', type || 'sale')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProperties(data || []);
    } catch (error) {
      console.error('Error loading properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortProperties = () => {
    let filtered = [...properties];

    if (searchTerm) {
      filtered = filtered.filter((property) => {
        const searchLower = searchTerm.toLowerCase();
        return (
          property.title_ro.toLowerCase().includes(searchLower) ||
          property.location_ro.toLowerCase().includes(searchLower) ||
          property.city.toLowerCase().includes(searchLower) ||
          (property.title_fr && property.title_fr.toLowerCase().includes(searchLower)) ||
          (property.location_fr && property.location_fr.toLowerCase().includes(searchLower)) ||
          (property.title_en && property.title_en.toLowerCase().includes(searchLower)) ||
          (property.location_en && property.location_en.toLowerCase().includes(searchLower))
        );
      });
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter((property) => property.category === categoryFilter);
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'priceAsc':
          return a.price - b.price;
        case 'priceDesc':
          return b.price - a.price;
        case 'newest':
        default:
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });

    setFilteredProperties(filtered);
  };

  const pageTitle = type === 'sale' ? t.nav.sale : t.nav.rent;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">{pageTitle}</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={t.filters.search}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">{t.filters.all}</option>
            <option value="apartment">{t.filters.apartment}</option>
            <option value="house">{t.filters.house}</option>
            <option value="land">{t.filters.land}</option>
            <option value="commercial">{t.filters.commercial}</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="newest">{t.filters.newest}</option>
            <option value="priceAsc">{t.filters.priceAsc}</option>
            <option value="priceDesc">{t.filters.priceDesc}</option>
          </select>
        </div>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : filteredProperties.length > 0 ? (
        <>
          <div className="mb-4 text-gray-600">
            {filteredProperties.length} {filteredProperties.length === 1 ? 'propriété' : 'propriétés'}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <p>{t.common.noResults}</p>
        </div>
      )}
    </div>
  );
}
