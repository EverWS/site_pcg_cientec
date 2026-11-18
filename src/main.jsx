import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { CANONICAL_URL } from './content.js';
import './styles.css';

// Endereço de produção do Cloudflare Pages. Quem abri-lo é levado ao domínio
// oficial. As prévias (<id>.site-pcg-cientec.pages.dev) continuam abrindo.
const PAGES_HOST = 'site-pcg-cientec.pages.dev';

const outsideOfficialPage =
  CANONICAL_URL && window.location.hostname === PAGES_HOST;

if (outsideOfficialPage) {
  window.location.replace(CANONICAL_URL);
} else {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
