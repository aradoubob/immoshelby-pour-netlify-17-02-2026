import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Calendar, Users } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export const Dashboard: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">{t('dashboard')}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/admin/properties"
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center gap-4">
            <Building2 className="text-blue-600" size={48} />
            <div>
              <h2 className="text-2xl font-bold">{t('properties')}</h2>
              <p className="text-gray-600">Gérer les propriétés</p>
            </div>
          </div>
        </Link>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-4">
            <Calendar className="text-green-600" size={48} />
            <div>
              <h2 className="text-2xl font-bold">Rendez-vous</h2>
              <p className="text-gray-600">Voir les demandes</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-4">
            <Users className="text-purple-600" size={48} />
            <div>
              <h2 className="text-2xl font-bold">Clients</h2>
              <p className="text-gray-600">Gérer les contacts</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
