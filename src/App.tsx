import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home, Building2, Globe, Search, MapPin, Bed, Bath, Square } from 'lucide-react';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { supabase } from './lib/supabase';
import { Property } from './types';
import { useTranslatedProperty } from './hooks/useTranslatedProperty';

function PropertyCard({ property }: { property: Property }) {
  const translated = useTranslatedProperty(property);

  const firstImage = property.images && Array.isArray(property.images) && property.images.length > 0
    ? property.images[0]
    : 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800';

  const typeLabels = { sale: 'Vente', rent: 'Location' };
  const categoryLabels = { apartment: 'Appartement', house: 'Maison', land: 'Terrain', commercial: 'Commercial' };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative">
        <img
          src={firstImage}
          alt={translated.title}
          className="w-full h-56 object-cover"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full shadow-lg">
            {typeLabels[property.type]}
          </span>
          <span className="px-3 py-1 bg-green-600 text-white text-xs font-semibold rounded-full shadow-lg">
            {categoryLabels[property.category]}
          </span>
        </div>
        {property.featured && (
          <div className="absolute top-3 right-3">
            <span className="px-3 py-1 bg-yellow-500 text-white text-xs font-semibold rounded-full shadow-lg">
              Featured
            </span>
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
          {translated.isTranslating ? '...' : translated.title}
        </h3>
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
          <span className="text-sm line-clamp-1">
            {translated.isTranslating ? '...' : translated.location}
          </span>
        </div>
        <p className="text-gray-700 mb-4 text-sm line-clamp-2 min-h-[2.5rem]">
          {translated.isTranslating ? '...' : translated.description}
        </p>
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4 pb-4 border-b border-gray-200">
          <div className="flex items-center gap-1">
            <Bed className="w-4 h-4" />
            <span>{property.rooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="w-4 h-4" />
            <span>{property.bathrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Square className="w-4 h-4" />
            <span>{property.surface}m²</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-blue-600">
            €{Number(property.price).toLocaleString()}
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors">
            Voir détails
          </button>
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

function HeroSection() {
  const { language } = useLanguage();

  const heroText = {
    ro: {
      title: 'Găsește casa visurilor tale',
      subtitle: 'Explorează cele mai bune proprietăți din România',
      search: 'Caută proprietăți...',
    },
    fr: {
      title: 'Trouvez la maison de vos rêves',
      subtitle: 'Explorez les meilleures propriétés de Roumanie',
      search: 'Rechercher des propriétés...',
    },
    en: {
      title: 'Find Your Dream Home',
      subtitle: 'Explore the best properties in Romania',
      search: 'Search properties...',
    },
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 mb-8">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {heroText[language].title}
          </h1>
          <p className="text-xl mb-8 text-blue-100">
            {heroText[language].subtitle}
          </p>
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={heroText[language].search}
              className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-900 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function HomePage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'sale' | 'rent'>('all');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'apartment' | 'house' | 'land' | 'commercial'>('all');

  useEffect(() => {
    async function fetchProperties() {
      try {
        let query = supabase
          .from('properties')
          .select('*')
          .eq('status', 'available')
          .order('created_at', { ascending: false })
          .limit(20);

        if (filter !== 'all') {
          query = query.eq('type', filter);
        }

        if (categoryFilter !== 'all') {
          query = query.eq('category', categoryFilter);
        }

        const { data, error } = await query;

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
  }, [filter, categoryFilter]);

  if (loading) {
    return (
      <>
        <HeroSection />
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-xl text-gray-600">Chargement...</div>
        </div>
      </>
    );
  }

  return (
    <>
      <HeroSection />
      <div className="container mx-auto px-4 pb-12">
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={() => setFilter('all')}
            className={`px-5 py-2 rounded-lg font-semibold transition-colors ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Toutes
          </button>
          <button
            onClick={() => setFilter('sale')}
            className={`px-5 py-2 rounded-lg font-semibold transition-colors ${
              filter === 'sale'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            À vendre
          </button>
          <button
            onClick={() => setFilter('rent')}
            className={`px-5 py-2 rounded-lg font-semibold transition-colors ${
              filter === 'rent'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            À louer
          </button>

          <div className="ml-auto flex gap-3">
            <button
              onClick={() => setCategoryFilter('all')}
              className={`px-5 py-2 rounded-lg font-semibold transition-colors ${
                categoryFilter === 'all'
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Tous types
            </button>
            <button
              onClick={() => setCategoryFilter('apartment')}
              className={`px-5 py-2 rounded-lg font-semibold transition-colors ${
                categoryFilter === 'apartment'
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Appartements
            </button>
            <button
              onClick={() => setCategoryFilter('house')}
              className={`px-5 py-2 rounded-lg font-semibold transition-colors ${
                categoryFilter === 'house'
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Maisons
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
    </>
  );
}

function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/logo.jpg"
              alt="Logo Imobiliare"
              className="w-14 h-14 object-cover rounded-xl shadow-lg group-hover:shadow-xl transition-shadow"
            />
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Imobiliare
            </span>
          </Link>
          <nav className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors font-semibold group"
            >
              <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">Accueil</span>
            </Link>
            <LanguageSelector />
          </nav>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Imobiliare</h3>
            <p className="text-gray-400">
              Votre partenaire de confiance pour trouver la propriété idéale en Roumanie.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Liens rapides</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/" className="hover:text-white transition-colors">Accueil</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">À propos</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="text-gray-400 space-y-2">
              <p>Email: contact@imobiliare.ro</p>
              <p>Téléphone: +40 123 456 789</p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; 2026 Imobiliare. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}

function AppContent() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
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
