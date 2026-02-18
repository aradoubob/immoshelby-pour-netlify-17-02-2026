import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const LoadingSpinner: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      <p className="mt-4 text-gray-600">{t('loading')}</p>
    </div>
  );
};
