import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Home } from './pages/Home';
import { PropertiesList } from './pages/PropertiesList';
import { PropertyDetails } from './pages/PropertyDetails';
import { Contact } from './pages/Contact';
import { Login } from './pages/admin/Login';
import { Dashboard } from './pages/admin/Dashboard';
import { PropertiesManagement } from './pages/admin/PropertiesManagement';

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="properties" element={<PropertiesList />} />
              <Route path="property/:id" element={<PropertyDetails />} />
              <Route path="contact" element={<Contact />} />
              <Route path="admin/login" element={<Login />} />
              <Route
                path="admin"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="admin/properties"
                element={
                  <ProtectedRoute>
                    <PropertiesManagement />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </AuthProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
