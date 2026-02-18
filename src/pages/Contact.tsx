import React, { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Button } from '../components/Button';
import { useLanguage } from '../contexts/LanguageContext';

export const Contact: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const { error } = await supabase.from('schedule').insert([
        {
          property_id: '00000000-0000-0000-0000-000000000000',
          visitor_name: formData.name,
          visitor_email: formData.email,
          visitor_phone: formData.phone,
          preferred_date: new Date().toISOString(),
          message: formData.message,
        },
      ]);

      if (error) throw error;

      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(t('error'));
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">{t('contact')}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6">
            {t('contact')}
          </h2>

          {success && (
            <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-6">
              Message envoyé avec succès!
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">{t('name')}</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">{t('email')}</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">{t('phone')}</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">{t('message')}</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>

            <Button type="submit" disabled={submitting} className="w-full">
              {submitting ? t('loading') : t('submit')}
            </Button>
          </form>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start gap-4">
              <Mail className="text-blue-600 mt-1" size={24} />
              <div>
                <h3 className="font-bold mb-2">{t('email')}</h3>
                <p className="text-gray-600">contact@immobilier.ma</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start gap-4">
              <Phone className="text-blue-600 mt-1" size={24} />
              <div>
                <h3 className="font-bold mb-2">{t('phone')}</h3>
                <p className="text-gray-600">+212 5XX-XXXXXX</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start gap-4">
              <MapPin className="text-blue-600 mt-1" size={24} />
              <div>
                <h3 className="font-bold mb-2">Adresse</h3>
                <p className="text-gray-600">Casablanca, Maroc</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
