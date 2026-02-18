import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Home, Building2, Mail, Shield, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import type { Language } from '../types';

export const Layout: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { user, signOut } = useAuth();

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold text-blue-600">
              <Building2 size={28} />
              <span>Immobilier</span>
            </Link>

            <div className="flex items-center gap-6">
              <Link to="/" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
                <Home size={20} />
                <span>{t('home')}</span>
              </Link>
              <Link to="/properties" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
                <Building2 size={20} />
                <span>{t('properties')}</span>
              </Link>
              <Link to="/contact" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
                <Mail size={20} />
                <span>{t('contact')}</span>
              </Link>
              {user && (
                <Link to="/admin" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
                  <Shield size={20} />
                  <span>{t('admin')}</span>
                </Link>
              )}

              <div className="flex items-center gap-2 border-l pl-4">
                <Globe size={20} className="text-gray-600" />
                <button
                  onClick={() => handleLanguageChange('fr')}
                  className={`px-2 py-1 rounded ${language === 'fr' ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
                >
                  FR
                </button>
                <button
                  onClick={() => handleLanguageChange('en')}
                  className={`px-2 py-1 rounded ${language === 'en' ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
                >
                  EN
                </button>
                <button
                  onClick={() => handleLanguageChange('ar')}
                  className={`px-2 py-1 rounded ${language === 'ar' ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
                >
                  AR
                </button>
              </div>

              {user && (
                <button
                  onClick={signOut}
                  className="text-red-600 hover:text-red-700 font-medium"
                >
                  {t('logout')}
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>

      <footer className="bg-gray-800 text-white mt-16">
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-gray-400">
            © 2024 Immobilier. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};
