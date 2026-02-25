import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Home, TrendingUp, Clock } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useLanguage } from '../../contexts/LanguageContext';
import { LoadingSpinner } from '../../components/LoadingSpinner';

interface Stats {
  totalProperties: number;
  propertiesForSale: number;
  propertiesForRent: number;
}

export function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    totalProperties: 0,
    propertiesForSale: 0,
    propertiesForRent: 0,
  });
  const [loading, setLoading] = useState(true);
  const { language, t } = useLanguage();

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [propertiesRes, saleRes, rentRes] = await Promise.all([
        supabase.from('properties').select('*', { count: 'exact', head: true }),
        supabase.from('properties').select('*', { count: 'exact', head: true }).eq('type', 'sale'),
        supabase.from('properties').select('*', { count: 'exact', head: true }).eq('type', 'rent'),
      ]);

      setStats({
        totalProperties: propertiesRes.count || 0,
        propertiesForSale: saleRes.count || 0,
        propertiesForRent: rentRes.count || 0,
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">{t.admin.dashboard}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Building2 className="w-6 h-6 text-blue-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{stats.totalProperties}</div>
          <div className="text-sm text-gray-600">
            {language === 'fr' ? 'Propriétés totales' : 'Proprietăți totale'}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <Home className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{stats.propertiesForSale}</div>
          <div className="text-sm text-gray-600">{t.home.sale}</div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-orange-100 p-3 rounded-lg">
              <Home className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{stats.propertiesForRent}</div>
          <div className="text-sm text-gray-600">{t.home.rent}</div>
        </div>
      </div>

      <div className="max-w-xl mx-auto space-y-4">
        <Link
          to="/admin/properties"
          className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow block"
        >
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 p-4 rounded-lg">
              <Building2 className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">
                {t.admin.properties}
              </h2>
              <p className="text-gray-600">
                {language === 'fr'
                  ? 'Gérer vos propriétés'
                  : 'Gestionați proprietățile'}
              </p>
            </div>
          </div>
        </Link>

        <Link
          to="/admin/opening-hours"
          className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow block"
        >
          <div className="flex items-center space-x-4">
            <div className="bg-green-100 p-4 rounded-lg">
              <Clock className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">
                {language === 'fr' ? "Horaires d'ouverture" : 'Orele de deschidere'}
              </h2>
              <p className="text-gray-600">
                {language === 'fr'
                  ? "Gérer les horaires d'ouverture"
                  : 'Gestionați orele de deschidere'}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
