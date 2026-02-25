import { Mail, Phone } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function Contact() {
  const { language } = useLanguage();

  const handleEmailClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.location.href = 'mailto:immoshelby@gmail.com';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {language === 'fr' ? 'Contactez-nous' : 'Contactați-ne'}
        </h1>
        <p className="text-xl text-gray-600">
          {language === 'fr'
            ? "Nous sommes là pour vous aider à trouver votre propriété idéale"
            : "Suntem aici pentru a vă ajuta să găsiți proprietatea ideală"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-100 p-4 rounded-full">
              <Mail className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Email</h3>
          <a
            href="mailto:immoshelby@gmail.com"
            onClick={handleEmailClick}
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            immoshelby@gmail.com
          </a>
        </div>

        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-100 p-4 rounded-full">
              <Phone className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {language === 'fr' ? 'Téléphone' : 'Telefon'}
          </h3>
          <span className="text-gray-600">+40 786 322 385</span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {language === 'fr' ? 'Horaires d\'ouverture' : 'Program de lucru'}
        </h2>
        <div className="space-y-3 text-gray-600">
          <div className="flex justify-between">
            <span className="font-medium">
              {language === 'fr' ? 'Lundi - Vendredi' : 'Luni - Vineri'}
            </span>
            <span>09:00 - 18:00</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">
              {language === 'fr' ? 'Samedi' : 'Sâmbătă'}
            </span>
            <span>10:00 - 14:00</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">
              {language === 'fr' ? 'Dimanche' : 'Duminică'}
            </span>
            <span>{language === 'fr' ? 'Fermé' : 'Închis'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
