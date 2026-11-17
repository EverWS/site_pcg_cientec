import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { CANONICAL_URL } from './content.js';
import './styles.css';

// Aberto direto no endereço workers.dev (fora do iframe do WordPress):
// leva o visitante ao endereço oficial em vez de mostrar o do Worker.
const outsideOfficialPage =
  CANONICAL_URL &&
  window.top === window.self &&
  window.location.hostname.endsWith('.workers.dev');

if (outsideOfficialPage) {
  window.location.replace(CANONICAL_URL);
} else {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
