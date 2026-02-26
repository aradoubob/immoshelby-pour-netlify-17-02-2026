import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { Property } from '../../types';
import { Button } from '../../components/Button';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { useLanguage } from '../../contexts/LanguageContext';
import ImageUploader from '../../components/ImageUploader';
import { uploadPropertyImages, deleteAllPropertyImages, dataUrlToFile } from '../../lib/storageHelpers';

export function PropertiesManagement() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const { language, t } = useLanguage();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const itemsPerPage = 10;

  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title_ro: '',
    description_ro: '',
    price: '',
    type: 'sale' as 'sale' | 'rent',
    category: 'apartment' as 'apartment' | 'house' | 'land' | 'commercial',
    surface: '',
    rooms: '',
    bathrooms: '',
    location_ro: '',
    city: '',
    imageUrls: [] as string[],
    features: [''],
    latitude: '',
    longitude: '',
    featured: false,
    status: 'available' as 'available' | 'sold' | 'rented',
  });

  useEffect(() => {
    loadProperties();
  }, [currentPage]);

  const loadProperties = async () => {
    try {
      setLoading(true);
      const from = (currentPage - 1) * itemsPerPage;
      const to = from + itemsPerPage - 1;

      const { data, error, count } = await supabase
        .from('properties')
        .select('id, title_ro, location_ro, price, type, category, surface, rooms, bathrooms, status, featured, image_urls, created_at', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(from, to);

      if (error) throw error;
      setProperties(data || []);
      setTotalCount(count || 0);
    } catch (error) {
      console.error('Error loading properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      let propertyId = editingProperty?.id;
      let uploadedImageUrls: string[] = [];

      if (!propertyId) {
        const { data: newProperty, error: insertError } = await supabase
          .from('properties')
          .insert([{
            title_ro: formData.title_ro,
            description_ro: formData.description_ro,
            price: parseFloat(formData.price),
            surface: parseFloat(formData.surface),
            rooms: parseInt(formData.rooms) || 0,
            bathrooms: parseInt(formData.bathrooms) || 0,
            type: formData.type,
            category: formData.category,
            location_ro: formData.location_ro,
            city: formData.city,
            latitude: formData.latitude ? parseFloat(formData.latitude) : null,
            longitude: formData.longitude ? parseFloat(formData.longitude) : null,
            features: formData.features.filter(f => f.trim() !== ''),
            featured: formData.featured,
            status: formData.status,
            image_urls: []
          }])
          .select()
          .single();

        if (insertError) throw insertError;
        propertyId = newProperty.id;
      }

      const dataUrlImages = formData.imageUrls.filter(url => url.startsWith('data:'));
      if (dataUrlImages.length > 0) {
        const imageFiles = await Promise.all(
          dataUrlImages.map((dataUrl, index) =>
            dataUrlToFile(dataUrl, `image-${index}.jpg`)
          )
        );

        uploadedImageUrls = await uploadPropertyImages(propertyId!, imageFiles);
      }

      const existingImageUrls = formData.imageUrls.filter(url => !url.startsWith('data:'));
      const allImageUrls = [...existingImageUrls, ...uploadedImageUrls];

      const propertyData = {
        title_ro: formData.title_ro,
        description_ro: formData.description_ro,
        price: parseFloat(formData.price),
        surface: parseFloat(formData.surface),
        rooms: parseInt(formData.rooms) || 0,
        bathrooms: parseInt(formData.bathrooms) || 0,
        type: formData.type,
        category: formData.category,
        location_ro: formData.location_ro,
        city: formData.city,
        latitude: formData.latitude ? parseFloat(formData.latitude) : null,
        longitude: formData.longitude ? parseFloat(formData.longitude) : null,
        features: formData.features.filter(f => f.trim() !== ''),
        featured: formData.featured,
        status: formData.status,
        image_urls: allImageUrls
      };

      const { error: updateError } = await supabase
        .from('properties')
        .update(propertyData)
        .eq('id', propertyId);

      if (updateError) throw updateError;

      if (editingProperty && editingProperty.image_urls) {
        const removedImages = editingProperty.image_urls.filter(
          url => !allImageUrls.includes(url)
        );
        if (removedImages.length > 0) {
          await deleteAllPropertyImages(removedImages);
        }
      }

      setShowForm(false);
      setEditingProperty(null);
      resetForm();
      await loadProperties();
    } catch (error) {
      console.error('Error saving property:', error);
      alert('Erreur lors de la sauvegarde de la propriété');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = async (propertyId: string) => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', propertyId)
        .single();

      if (error) throw error;
      if (!data) return;

      setEditingProperty(data);
      setFormData({
        title_ro: data.title_ro,
        description_ro: data.description_ro,
        price: data.price.toString(),
        type: data.type,
        category: data.category,
        surface: data.surface.toString(),
        rooms: data.rooms.toString(),
        bathrooms: data.bathrooms.toString(),
        location_ro: data.location_ro,
        city: data.city,
        imageUrls: data.image_urls || [],
        features: data.features.length > 0 ? data.features : [''],
        latitude: data.latitude?.toString() || '',
        longitude: data.longitude?.toString() || '',
        featured: data.featured,
        status: data.status,
      });
      setShowForm(true);
    } catch (error) {
      console.error('Error loading property details:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(language === 'fr' ? 'Êtes-vous sûr de vouloir supprimer cette propriété?' : 'Sigur doriți să ștergeți această proprietate?')) {
      return;
    }

    setDeleting(id);
    try {
      const property = properties.find(p => p.id === id);
      if (property?.image_urls && property.image_urls.length > 0) {
        await deleteAllPropertyImages(property.image_urls);
      }

      const { error } = await supabase.from('properties').delete().eq('id', id);
      if (error) throw error;

      setProperties(prev => prev.filter(p => p.id !== id));
      setTotalCount(prev => prev - 1);
    } catch (error) {
      console.error('Error deleting property:', error);
      alert('Erreur lors de la suppression');
    } finally {
      setDeleting(null);
    }
  };

  const resetForm = () => {
    setFormData({
      title_ro: '',
      description_ro: '',
      price: '',
      type: 'sale',
      category: 'apartment',
      surface: '',
      rooms: '',
      bathrooms: '',
      location_ro: '',
      city: '',
      imageUrls: [],
      features: [''],
      latitude: '',
      longitude: '',
      featured: false,
      status: 'available',
    });
  };

  const addFeatureField = () => {
    setFormData({ ...formData, features: [...formData.features, ''] });
  };

  const removeFeatureField = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{t.admin.properties}</h1>
        <Button
          onClick={() => {
            setEditingProperty(null);
            resetForm();
            setShowForm(true);
          }}
          className="flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>{t.admin.addProperty}</span>
        </Button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-lg p-8 max-w-4xl w-full my-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingProperty ? t.admin.editProperty : t.admin.addProperty}
              </h2>
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingProperty(null);
                  resetForm();
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 max-h-[70vh] overflow-y-auto pr-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Titlu (Română)
                </label>
                <input
                  type="text"
                  required
                  value={formData.title_ro}
                  onChange={(e) => setFormData({ ...formData, title_ro: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex: Apartament modern cu 3 camere în centru"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Traducerea automată în franceză și engleză va fi generată pentru vizitatori
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descriere (Română)
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.description_ro}
                  onChange={(e) => setFormData({ ...formData, description_ro: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Descrieți detaliat proprietatea..."
                />
                <p className="mt-1 text-sm text-gray-500">
                  Traducerea automată în franceză și engleză va fi generată pentru vizitatori
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Prix (€)</label>
                  <input
                    type="number"
                    required
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as 'sale' | 'rent' })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="sale">Vente</option>
                    <option value="rent">Location</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="apartment">Appartement</option>
                    <option value="house">Maison</option>
                    <option value="land">Terrain</option>
                    <option value="commercial">Commercial</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Surface (m²)</label>
                  <input
                    type="number"
                    required
                    step="0.01"
                    value={formData.surface}
                    onChange={(e) => setFormData({ ...formData, surface: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Chambres</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.rooms}
                    onChange={(e) => setFormData({ ...formData, rooms: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Salles de bain</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.bathrooms}
                    onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Locație (Română)
                </label>
                <input
                  type="text"
                  required
                  value={formData.location_ro}
                  onChange={(e) => setFormData({ ...formData, location_ro: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex: Strada Victoriei nr. 123, Sector 1"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Traducerea automată în franceză și engleză va fi generată pentru vizitatori
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ville</label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <ImageUploader
                images={formData.imageUrls}
                onChange={(images) => setFormData({ ...formData, imageUrls: images })}
                maxImages={25}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Caractéristiques</label>
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex space-x-2 mb-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => {
                        const newFeatures = [...formData.features];
                        newFeatures[index] = e.target.value;
                        setFormData({ ...formData, features: newFeatures });
                      }}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {formData.features.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeFeatureField(index)}
                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addFeatureField}
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  + Ajouter une caractéristique
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Latitude</label>
                  <input
                    type="number"
                    step="any"
                    value={formData.latitude}
                    onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Longitude</label>
                  <input
                    type="number"
                    step="any"
                    value={formData.longitude}
                    onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="mr-2"
                  />
                  <span className="text-sm font-medium text-gray-700">Propriété en vedette</span>
                </label>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="available">Disponible</option>
                    <option value="sold">Vendu</option>
                    <option value="rented">Loué</option>
                  </select>
                </div>
              </div>

              <div className="flex space-x-4 pt-4">
                <Button type="submit" className="flex-1" disabled={saving}>
                  {saving ? 'Enregistrement...' : t.admin.save}
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    setShowForm(false);
                    setEditingProperty(null);
                    resetForm();
                  }}
                  className="flex-1"
                  disabled={saving}
                >
                  {t.admin.cancel}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 gap-6">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
              <div className="flex items-start space-x-6">
                <div className="w-48 h-32 bg-gray-200 rounded-lg"></div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                    </div>
                    <div className="text-right">
                      <div className="h-8 bg-gray-200 rounded w-24 mb-2"></div>
                      <div className="flex space-x-2">
                        <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
                        <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {properties.map((property) => (
            <div key={property.id} className="bg-white rounded-lg shadow-md p-6 relative">
              {deleting === property.id && (
                <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center rounded-lg z-10">
                  <LoadingSpinner />
                </div>
              )}
              <div className="flex items-start space-x-6">
                <img
                  src={property.image_urls?.[0] || 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg'}
                  alt={property.title_ro}
                  className="w-48 h-32 object-cover rounded-lg"
                  loading="lazy"
                />

                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{property.title_ro}</h3>
                      <p className="text-gray-600 mb-2">{property.location_ro}</p>
                      <div className="flex space-x-4 text-sm text-gray-600">
                        <span>{property.surface} m²</span>
                        {property.rooms > 0 && <span>{property.rooms} chambres</span>}
                        <span className="capitalize">{property.type}</span>
                        {property.image_urls && property.image_urls.length > 0 && (
                          <span className="text-blue-600">{property.image_urls.length} images</span>
                        )}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600 mb-2">
                        €{property.price.toLocaleString()}
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(property.id)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg disabled:opacity-50"
                          disabled={deleting === property.id}
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(property.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg disabled:opacity-50"
                          disabled={deleting === property.id}
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {totalCount > itemsPerPage && (
        <div className="mt-8 flex justify-center items-center space-x-4">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Précédent
          </button>
          <span className="text-gray-700">
            Page {currentPage} sur {Math.ceil(totalCount / itemsPerPage)} ({totalCount} propriétés)
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(Math.ceil(totalCount / itemsPerPage), prev + 1))}
            disabled={currentPage >= Math.ceil(totalCount / itemsPerPage)}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Suivant
          </button>
        </div>
      )}
    </div>
  );
}
