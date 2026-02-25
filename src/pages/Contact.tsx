import { Mail, Phone, Clock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useOpeningHours } from '../hooks/useOpeningHours';
import { LoadingSpinner } from '../components/LoadingSpinner';

export function Contact() {
  const { language } = useLanguage();
  const { openingHours, loading: hoursLoading } = useOpeningHours();

  const handleEmailClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.location.href = 'mailto:immoshelby@gmail.com';
  };

  const getPeriodLabel = (periodType: string) => {
    const labels = {
      weekdays: language === 'fr' ? 'Lundi - Vendredi' : 'Luni - Vineri',
      saturday: language === 'fr' ? 'Samedi' : 'Sâmbătă',
      sunday: language === 'fr' ? 'Dimanche' : 'Duminică',
    };
    return labels[periodType as keyof typeof labels] || periodType;
  };

  const formatTime = (time: string | null) => {
    if (!time) return '';
    return time.substring(0, 5);
  };

  const getClosedLabel = () => {
    return language === 'fr' ? 'Fermé' : 'Închis';
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
        <div className="flex items-center gap-3 mb-6">
          <Clock className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">
            {language === 'fr' ? "Horaires d'ouverture" : 'Program de lucru'}
          </h2>
        </div>

        {hoursLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="space-y-3 text-gray-600">
            {openingHours.map((hour) => (
              <div key={hour.id} className="flex justify-between items-center py-2">
                <span className="font-medium">{getPeriodLabel(hour.period_type)}</span>
                <span>
                  {hour.is_open && hour.opening_time && hour.closing_time
                    ? `${formatTime(hour.opening_time)} - ${formatTime(hour.closing_time)}`
                    : getClosedLabel()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
