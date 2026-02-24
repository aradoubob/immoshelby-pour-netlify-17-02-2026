import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home, Building2, Globe } from 'lucide-react';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { supabase } from './lib/supabase';
import { Property } from './types';
import { useTranslatedProperty } from './hooks/useTranslatedProperty';

function PropertyCard({ property }: { property: Property }) {
  const translated = useTranslatedProperty(property);

  const firstImage = property.images && Array.isArray(property.images) && property.images.length > 0
    ? property.images[0]
    : '/placeholder.jpg';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <img
        src={firstImage}
        alt={translated.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {translated.isTranslating ? '...' : translated.title}
        </h3>
        <p className="text-gray-600 mb-2">
          {translated.isTranslating ? '...' : translated.location}
        </p>
        <p className="text-gray-700 mb-4 line-clamp-3">
          {translated.isTranslating ? '...' : translated.description}
        </p>
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>{property.rooms} chambres</span>
          <span>{property.bathrooms} salles de bain</span>
          <span>{property.surface} m²</span>
        </div>
        <div className="mt-4 text-2xl font-bold text-blue-600">
          €{Number(property.price).toLocaleString()}
        </div>
      </div>
    </div>
  );
}

function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <Globe className="w-5 h-5 text-gray-600" />
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as 'ro' | 'fr' | 'en')}
        className="px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="ro">Română</option>
        <option value="fr">Français</option>
        <option value="en">English</option>
      </select>
    </div>
  );
}

function HomePage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProperties() {
      try {
        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .eq('status', 'available')
          .order('created_at', { ascending: false })
          .limit(20);

        if (error) {
          console.error('Error fetching properties:', error);
          setProperties([]);
        } else {
          setProperties(data || []);
        }
      } catch (error) {
        console.error('Error fetching properties:', error);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProperties();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-xl text-gray-600">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
      {properties.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <p className="text-xl text-gray-600">Aucune propriété disponible</p>
        </div>
      )}
    </div>
  );
}

function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.jpg" alt="Logo" className="h-10 w-10 rounded-full" />
            <span className="text-2xl font-bold text-blue-600">Imobiliare</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              to="/"
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <Home className="w-5 h-5" />
              <span>Accueil</span>
            </Link>
            <LanguageSelector />
          </nav>
        </div>
      </div>
    </header>
  );
}

function AppContent() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
