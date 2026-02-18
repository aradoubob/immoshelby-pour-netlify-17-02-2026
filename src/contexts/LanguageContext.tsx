import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Language } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  fr: {
    home: 'Accueil',
    properties: 'Propriétés',
    contact: 'Contact',
    admin: 'Administration',
    searchProperties: 'Rechercher des propriétés...',
    bedrooms: 'Chambres',
    bathrooms: 'Salles de bain',
    area: 'Surface',
    viewDetails: 'Voir détails',
    scheduleVisit: 'Planifier une visite',
    available: 'Disponible',
    sold: 'Vendu',
    rented: 'Loué',
    loading: 'Chargement...',
    error: 'Erreur',
    name: 'Nom',
    email: 'Email',
    phone: 'Téléphone',
    message: 'Message',
    submit: 'Envoyer',
    login: 'Connexion',
    logout: 'Déconnexion',
    password: 'Mot de passe',
    dashboard: 'Tableau de bord',
    addProperty: 'Ajouter une propriété',
    edit: 'Modifier',
    delete: 'Supprimer',
    save: 'Enregistrer',
    cancel: 'Annuler',
  },
  en: {
    home: 'Home',
    properties: 'Properties',
    contact: 'Contact',
    admin: 'Administration',
    searchProperties: 'Search properties...',
    bedrooms: 'Bedrooms',
    bathrooms: 'Bathrooms',
    area: 'Area',
    viewDetails: 'View details',
    scheduleVisit: 'Schedule a visit',
    available: 'Available',
    sold: 'Sold',
    rented: 'Rented',
    loading: 'Loading...',
    error: 'Error',
    name: 'Name',
    email: 'Email',
    phone: 'Phone',
    message: 'Message',
    submit: 'Submit',
    login: 'Login',
    logout: 'Logout',
    password: 'Password',
    dashboard: 'Dashboard',
    addProperty: 'Add property',
    edit: 'Edit',
    delete: 'Delete',
    save: 'Save',
    cancel: 'Cancel',
  },
  ar: {
    home: 'الرئيسية',
    properties: 'العقارات',
    contact: 'اتصل بنا',
    admin: 'الإدارة',
    searchProperties: 'البحث عن عقارات...',
    bedrooms: 'غرف النوم',
    bathrooms: 'الحمامات',
    area: 'المساحة',
    viewDetails: 'عرض التفاصيل',
    scheduleVisit: 'حجز موعد زيارة',
    available: 'متاح',
    sold: 'مباع',
    rented: 'مؤجر',
    loading: 'جارٍ التحميل...',
    error: 'خطأ',
    name: 'الاسم',
    email: 'البريد الإلكتروني',
    phone: 'الهاتف',
    message: 'الرسالة',
    submit: 'إرسال',
    login: 'تسجيل الدخول',
    logout: 'تسجيل الخروج',
    password: 'كلمة المرور',
    dashboard: 'لوحة التحكم',
    addProperty: 'إضافة عقار',
    edit: 'تعديل',
    delete: 'حذف',
    save: 'حفظ',
    cancel: 'إلغاء',
  },
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'fr';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
