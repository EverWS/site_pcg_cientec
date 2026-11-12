import { readFileSync } from 'node:fs';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Lê o bloco "/*" de public/_headers (o mesmo arquivo usado pelo Cloudflare
// Pages) para que `npm run preview` reproduza a CSP de produção localmente.
// HSTS e upgrade-insecure-requests são omitidos porque o preview roda em HTTP.
function productionHeaders() {
  const headers = {};
  let inGlobalBlock = false;
  for (const line of readFileSync('public/_headers', 'utf8').split(/\r?\n/)) {
    if (!line.trim() || line.trimStart().startsWith('#')) continue;
    if (!/^\s/.test(line)) {
      inGlobalBlock = line.trim() === '/*';
      continue;
    }
    if (!inGlobalBlock) continue;
    const separator = line.indexOf(':');
    const name = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim();
    if (name === 'Strict-Transport-Security') continue;
    headers[name] = value.replace(/;\s*upgrade-insecure-requests/, '');
  }
  return headers;
}

export default defineConfig({
  plugins: [react()],
  preview: { headers: productionHeaders() },
});
