# CLAUDE.md — Site da 1ª Mostra de Projetos CIENTEC - UFSC

Landing page estática do evento "1ª Mostra de Projetos CIENTEC - UFSC"
(UFSC Joinville, 03/12/2026). O nome oficial fica em `EVENT_NAME` (`src/content.js`).
React 19 + Vite 8, sem backend. Deploy no Cloudflare Pages a partir de `dist/`.

## Comandos

- Instalar: `npm ci` (respeita o lockfile; não use `npm install` em CI/deploy).
- Desenvolvimento: `npm run dev` → http://localhost:5173
- Build: `npm run build` → `dist/`
- Preview com os cabeçalhos de produção (CSP): `npm run build && npm run preview`
  → http://localhost:4173 (o `vite.config.js` lê `public/_headers`).
- Formatar: `npm run format` (Prettier). Rode antes de commitar.

## Onde mexer

| Quero mudar… | Arquivo |
|---|---|
| Nome do evento, textos, datas, programação, notícias | `src/content.js` |
| Layout e seções da página | `src/App.jsx` |
| Modal de inscrição | `src/components/RegistrationModal.jsx` |
| Partículas do hero (canvas) | `src/components/ParticleField.jsx` |
| Contador e palavra rotativa | `src/components/Countdown.jsx`, `RotatingWord.jsx` |
| Efeitos de rolagem/ponteiro (reveal, trajetória, holofote, magnetismo) | `src/hooks/usePageEffects.js` |
| Cores, tipografia, responsividade | `src/styles.css` (tokens em `:root`) |
| Cabeçalhos HTTP / CSP | `public/_headers` |
| Logo e favicon | `public/assets/` (logo ≤ 1000 px, favicon ≤ 192 px) |

Ignore `dist/` e `node_modules/` em buscas: são gerados.

## Regras

1. **Versões fixas.** Dependências com versão exata em `package.json`; nunca
   `latest`, `^` ou `~`. Atualize de propósito e confira `npm audit`.
2. **Nada de segredo no front.** Tudo em `src/` vai para o navegador. Chaves de
   API ficam em Worker/Function do Cloudflare, nunca em `VITE_*`.
3. **CSP sem `unsafe-inline`.** Não use `<script>` inline, `dangerouslySetInnerHTML`
   nem `eval`. Ao adicionar um serviço externo, libere só o domínio necessário
   em `public/_headers` e teste com `npm run preview`.
4. **Formulários são demonstrativos.** Não enviam nem guardam dados e a
   interface diz isso (`DEMO_NOTICE`). Ao conectar um backend: remova o aviso,
   publique uma política de privacidade (LGPD), valide no servidor e adicione
   proteção anti-spam (ex.: Cloudflare Turnstile).
5. **Identidade "da teoria ao impacto".** Azul + tracejado/contorno = teoria;
   dourado + sólido/preenchido = impacto. Interações fazem essa passagem.
   Fontes: Bricolage Grotesque (títulos), Manrope (texto), DM Mono (rótulos).
6. **Movimento.** Toda animação nova precisa respeitar
   `prefers-reduced-motion` e só alterar `transform`/`opacity`/`translate`.
   `.reveal` usa `translate`; não use `transform` nela (conflita com `.tilt`).
7. **Acessibilidade.** Mantenha `aria-*`, foco do modal (Esc, trap, retorno de
   foco) e `label` em todos os campos.
8. Comentários e textos de interface em português.
