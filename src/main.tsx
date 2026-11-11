import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
// Bundled locally by Vite, so the built site makes no font requests to a CDN.
import '@fontsource/fredoka/latin-500.css';
import '@fontsource/fredoka/latin-600.css';
import '@fontsource/fredoka/latin-700.css';
import './styles.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
