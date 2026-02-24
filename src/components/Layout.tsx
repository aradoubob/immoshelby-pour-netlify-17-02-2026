import { ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Phone, LogOut, Languages, Menu, X, Settings, Facebook } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { language, setLanguage } = useLanguage();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const toggleLanguage = () => {
    const nextLang = language === 'ro' ? 'en' : language === 'en' ? 'fr' : 'ro';
    setLanguage(nextLang);
  };

  const handleEmailClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.location.href = 'mailto:immoshelby@gmail.com';
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center space-x-1.5">
              <div className="h-16 flex items-center py-2">
                <img
                  src="/logo.jpg"
                  alt="ImmoShelby"
                  className="h-full w-auto object-contain"
                />
              </div>
              <span className="text-xl lg:text-2xl font-bold text-gray-800">ImmoShelby</span>
            </Link>

            <nav className="hidden md:flex space-x-3 lg:space-x-5 xl:space-x-6">
              <Link
                to="/"
                className="text-sm lg:text-base text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium whitespace-nowrap"
              >
                {language === 'ro' ? 'Acasă' : language === 'en' ? 'Home' : 'Accueil'}
              </Link>
              <Link
                to="/sale"
                className="text-sm lg:text-base text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium whitespace-nowrap"
              >
                {language === 'ro' ? 'De vânzare' : language === 'en' ? 'For Sale' : 'À vendre'}
              </Link>
              <Link
                to="/rent"
                className="text-sm lg:text-base text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium whitespace-nowrap"
              >
                {language === 'ro' ? 'De închiriat' : language === 'en' ? 'For Rent' : 'À louer'}
              </Link>
              <Link
                to="/contact"
                className="text-sm lg:text-base text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium whitespace-nowrap"
              >
                Contact
              </Link>
            </nav>

            <div className="flex items-center space-x-3 lg:space-x-4">
              <div className="hidden lg:flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <Phone className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-600">+40 786 322 385</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <a
                    href="mailto:immoshelby@gmail.com"
                    onClick={handleEmailClick}
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    immoshelby@gmail.com
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <a
                    href="https://www.facebook.com/share/1XARfE655c/?mibextid=wwXIfr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white p-1.5 rounded-md hover:bg-gray-100 transition-colors border border-black"
                  >
                    <Facebook className="w-5 h-5 text-blue-600 fill-blue-600" />
                  </a>
                  <a
                    href="https://www.instagram.com/immoshelby?igsh=MXh4ZTdyNzZrMHdwdQ%3D%3D&utm_source=qr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white p-1.5 rounded-md hover:bg-gray-100 transition-colors border border-black"
                  >
                    <svg viewBox="0 0 24 24" className="w-5 h-5">
                      <path
                        fill="url(#instagram-gradient)"
                        d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153.509.5.902 1.105 1.153 1.772.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772c-.5.508-1.105.902-1.772 1.153-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 100 10 5 5 0 000-10zm6.5-.25a1.25 1.25 0 10-2.5 0 1.25 1.25 0 002.5 0zM12 9a3 3 0 110 6 3 3 0 010-6z"
                      />
                      <defs>
                        <linearGradient id="instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                          <stop offset="0%" style={{ stopColor: '#fdf497' }} />
                          <stop offset="5%" style={{ stopColor: '#fdf497' }} />
                          <stop offset="45%" style={{ stopColor: '#fd5949' }} />
                          <stop offset="60%" style={{ stopColor: '#d6249f' }} />
                          <stop offset="90%" style={{ stopColor: '#285AEB' }} />
                        </linearGradient>
                      </defs>
                    </svg>
                  </a>
                  <a
                    href="https://www.tiktok.com/@immo.shelby?_t=ZN-8t3eRSuCIQY&_r=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white p-1.5 rounded-md hover:bg-gray-100 transition-colors border border-black"
                  >
                    <svg viewBox="0 0 24 24" className="w-5 h-5">
                      <path
                        fill="black"
                        d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"
                      />
                    </svg>
                  </a>
                </div>
              </div>

              <button
                onClick={toggleLanguage}
                className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors duration-200 font-semibold"
              >
                <Languages className="w-4 h-4" />
                <span className="uppercase text-sm">{language}</span>
              </button>

              {user ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-600"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              ) : (
                <Link
                  to="/admin/login"
                  className="flex items-center space-x-1 text-gray-600 hover:text-blue-600"
                  title="Administration"
                >
                  <Settings className="w-5 h-5" />
                  <span className="hidden lg:inline">Admin</span>
                </Link>
              )}

              <button
                className="md:hidden text-gray-600"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col space-y-4">
                <Link
                  to="/"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {language === 'ro' ? 'Acasă' : language === 'en' ? 'Home' : 'Accueil'}
                </Link>
                <Link
                  to="/sale"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {language === 'ro' ? 'De vânzare' : language === 'en' ? 'For Sale' : 'À vendre'}
                </Link>
                <Link
                  to="/rent"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {language === 'ro' ? 'De închiriat' : language === 'en' ? 'For Rent' : 'À louer'}
                </Link>
                <Link
                  to="/contact"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
                <div className="pt-4 border-t border-gray-200">
                  <span className="text-sm text-gray-600 block">+40 786 322 385</span>
                  <a
                    href="mailto:immoshelby@gmail.com"
                    onClick={handleEmailClick}
                    className="text-sm text-gray-600 hover:text-blue-600 block"
                  >
                    immoshelby@gmail.com
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      <main>{children}</main>

      <footer className="bg-gray-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">ImmoShelby</h3>
              <p className="text-gray-400">
                {language === 'ro'
                  ? 'Partenerul tău de încredere în imobiliare din România.'
                  : language === 'en'
                  ? 'Your trusted real estate partner in Romania.'
                  : 'Votre partenaire immobilier de confiance en Roumanie.'}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <div className="space-y-2 text-gray-400">
                <span className="block">+40 786 322 385</span>
                <a
                  href="mailto:immoshelby@gmail.com"
                  onClick={handleEmailClick}
                  className="block hover:text-white transition-colors"
                >
                  immoshelby@gmail.com
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">
                {language === 'ro' ? 'Urmărește-ne' : language === 'en' ? 'Follow us' : 'Suivez-nous'}
              </h3>
              <div className="flex space-x-4">
                <a
                  href="https://www.facebook.com/share/1XARfE655c/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Facebook className="w-6 h-6" />
                </a>
                <a
                  href="https://www.instagram.com/immoshelby?igsh=MXh4ZTdyNzZrMHdwdQ%3D%3D&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="w-6 h-6">
                    <path
                      fill="currentColor"
                      d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153.509.5.902 1.105 1.153 1.772.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772c-.5.508-1.105.902-1.772 1.153-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 100 10 5 5 0 000-10zm6.5-.25a1.25 1.25 0 10-2.5 0 1.25 1.25 0 002.5 0zM12 9a3 3 0 110 6 3 3 0 010-6z"
                    />
                  </svg>
                </a>
                <a
                  href="https://www.tiktok.com/@immo.shelby?_t=ZN-8t3eRSuCIQY&_r=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="w-6 h-6">
                    <path
                      fill="currentColor"
                      d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
            <p>
              &copy; {new Date().getFullYear()} ImmoShelby.{' '}
              {language === 'ro' ? 'Toate drepturile rezervate' : language === 'en' ? 'All rights reserved' : 'Tous droits réservés'}.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
