# CLAUDE.md — Site CIENTEC

Landing page estática do evento CIENTEC (UFSC Joinville, 03/12/2026).
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
| Textos, datas, programação, notícias | `src/content.js` |
| Layout e seções da página | `src/App.jsx` |
| Modal de inscrição | `src/components/RegistrationModal.jsx` |
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
5. **Acessibilidade.** Mantenha `aria-*`, foco do modal (Esc, trap, retorno de
   foco) e `label` em todos os campos.
6. Comentários e textos de interface em português.
