import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Building2, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn(email, password);
      navigate('/admin');
    } catch (err) {
      setError(language === 'fr' ? 'Email ou mot de passe invalide' : 'Email sau parolă invalidă');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <button
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-white hover:text-blue-100 mb-8 transition-colors duration-300 font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>{language === 'fr' ? 'Retour à l\'accueil' : 'Înapoi la pagina principală'}</span>
        </button>

        <div className="text-center mb-10">
          <div className="flex justify-center mb-6">
            <div className="bg-white p-5 rounded-full shadow-2xl">
              <Building2 className="w-14 h-14 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">ImmoShelby</h1>
          <p className="text-lg text-blue-100">
            {language === 'fr' ? 'Connexion administrateur' : 'Autentificare administrator'}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {language === 'fr' ? 'Email' : 'Email'}
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="admin@immoshelby.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {language === 'fr' ? 'Mot de passe' : 'Parolă'}
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <LogIn className="w-5 h-5" />
              <span>
                {loading
                  ? language === 'fr'
                    ? 'Connexion...'
                    : 'Se conectează...'
                  : language === 'fr'
                  ? 'Se connecter'
                  : 'Conectare'}
              </span>
            </button>
          </form>
        </div>

        <p className="text-center text-blue-100 text-sm mt-6">
          {language === 'fr'
            ? 'Accès réservé aux administrateurs'
            : 'Acces rezervat administratorilor'}
        </p>
      </div>
    </div>
  );
}
