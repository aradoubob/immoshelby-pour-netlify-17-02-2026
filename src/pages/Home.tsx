import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Property } from '../types';
import { PropertyCard } from '../components/PropertyCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useLanguage } from '../contexts/LanguageContext';

export function Home() {
  const [saleProperties, setSaleProperties] = useState<Property[]>([]);
  const [rentProperties, setRentProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();

  useEffect(() => {
    loadFeaturedProperties();
  }, []);

  const loadFeaturedProperties = async () => {
    try {
      const { data: saleData, error: saleError } = await supabase
        .from('properties')
        .select('*')
        .eq('status', 'available')
        .eq('type', 'sale')
        .order('created_at', { ascending: false })
        .limit(4);

      if (saleError) throw saleError;
      setSaleProperties(saleData || []);

      const { data: rentData, error: rentError } = await supabase
        .from('properties')
        .select('*')
        .eq('status', 'available')
        .eq('type', 'rent')
        .order('created_at', { ascending: false })
        .limit(4);

      if (rentError) throw rentError;
      setRentProperties(rentData || []);
    } catch (error) {
      console.error('Error loading properties:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="relative h-[600px]">
        <img
          src="https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="ImmoShelby"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl font-bold mb-6">ImmoShelby</h1>
            <p className="text-xl mb-8">
              {language === 'fr'
                ? 'Vous cherchez la maison parfaite? ImmoShelby vous rapproche de votre rêve!'
                : 'Cauți casa perfectă? ImmoShelby te aduce mai aproape de visul tău!'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/sale"
                className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-700 transition-colors"
              >
                {language === 'fr' ? 'Propriétés à vendre' : 'Proprietăți de vânzare'}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/rent"
                className="inline-flex items-center justify-center bg-white text-blue-600 px-8 py-3 rounded-lg text-lg hover:bg-gray-100 transition-colors"
              >
                {language === 'fr' ? 'Propriétés à louer' : 'Proprietăți de închiriat'}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <section className="relative py-16">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt=""
            className="w-full h-full object-cover filter blur-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              {language === 'fr' ? 'Propriétés Recommandées' : 'Proprietăți Recomandate'}
            </h2>
            <p className="text-gray-200">
              {language === 'fr'
                ? 'Découvrez les propriétés de vente les plus récentes et exclusives'
                : 'Descoperiți cele mai noi și mai exclusive proprietăți de vânzare'}
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <LoadingSpinner />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {saleProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
              {saleProperties.length === 0 && (
                <div className="col-span-full text-center py-12 text-gray-200">
                  {language === 'fr'
                    ? 'Aucune propriété disponible pour le moment'
                    : 'Nicio proprietate disponibilă momentan'}
                </div>
              )}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/sale"
              className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-700 transition-colors"
            >
              {language === 'fr'
                ? 'Voir toutes les propriétés à vendre'
                : 'Vezi toate proprietățile de vânzare'}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="relative py-16">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt=""
            className="w-full h-full object-cover filter blur-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              {language === 'fr'
                ? 'Propriétés de location recommandées'
                : 'Proprietăți de închiriat recomandate'}
            </h2>
            <p className="text-gray-200">
              {language === 'fr'
                ? 'Découvrez les propriétés de location les plus récentes et exclusives'
                : 'Descoperiți cele mai noi și mai exclusive proprietăți de închiriat'}
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <LoadingSpinner />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {rentProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
              {rentProperties.length === 0 && (
                <div className="col-span-full text-center py-12 text-gray-200">
                  {language === 'fr'
                    ? 'Aucune propriété disponible pour le moment'
                    : 'Nicio proprietate disponibilă momentan'}
                </div>
              )}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/rent"
              className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-700 transition-colors"
            >
              {language === 'fr'
                ? 'Voir toutes les propriétés à louer'
                : 'Vezi toate proprietățile de închiriat'}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
