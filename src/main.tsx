import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

console.log('Starting application...');

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('Root element not found!');
  throw new Error('Root element not found');
}

console.log('Root element found, rendering app...');

try {
  createRoot(rootElement).render(<App />);
  console.log('App rendered successfully');
} catch (error) {
  console.error('Error rendering app:', error);
  throw error;
}
