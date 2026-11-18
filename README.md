# 1ª Mostra de Projetos CIENTEC - UFSC

Landing page da 1ª Mostra de Projetos CIENTEC - UFSC, evento do Campus de Joinville da UFSC que aproxima universidade, escolas, indústria e sociedade por meio de ciência, tecnologia e inovação.

## Stack

- React
- Vite
- CSS responsivo
- JavaScript moderno

## Como executar localmente

1. Instale as dependências (versões travadas pelo `package-lock.json`):

   ```bash
   npm ci
   ```

2. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

3. Abra o endereço exibido pelo Vite, normalmente `http://localhost:5173`.

## Build de produção

```bash
npm run build
npm run preview
```

O `npm run preview` aplica os mesmos cabeçalhos de segurança de produção
(definidos em `public/_headers`), então serve para conferir a CSP localmente.

## Estrutura principal

```text
src/
  App.jsx                         # Seções e interações da página
  content.js                      # Textos, datas, programação e notícias
  components/RegistrationModal.jsx # Modal de inscrição acessível
  components/FeedbackForm.jsx     # Caixa de mensagem (envio pelo Apps Script)
  components/PrivacyModal.jsx     # Aviso de privacidade (LGPD)
  hooks/useDialog.js              # Foco, Esc e rolagem dos modais
  main.jsx                        # Ponto de entrada React
  styles.css                      # Identidade visual e responsividade
public/
  _headers                        # Cabeçalhos HTTP (CSP etc.) do Cloudflare Pages
  assets/                         # Logo e favicon do CIENTEC
integracoes/google-apps-script/   # Script que envia as mensagens por e-mail
vite.config.js                    # Plugin React e cabeçalhos do preview
```

## Recursos da página

- Navegação responsiva com menu mobile.
- Contagem regressiva para o evento.
- Animações de entrada e efeitos de interação.
- Programação do dia com filtros e destaque da atividade em andamento.
- Inscrição pela plataforma da UFSC: em todas as apresentações ou em cada uma.
- Botão "Deixar feedback" que abre o questionário no Google Forms.
- Caixa de mensagem (nome, e-mail e mensagem) enviada direto do site para
  `ufsc.cientec@gmail.com`, com aviso de privacidade (LGPD).
- Favicon e identidade visual baseados no logotipo fornecido.

## Observação

O site não tem backend próprio. A caixa de mensagem envia os dados a um
Google Apps Script publicado na conta `ufsc.cientec@gmail.com`, que os
encaminha por e-mail com "Responder para" o remetente; nada é armazenado.
Configuração em [`integracoes/google-apps-script/README.md`](integracoes/google-apps-script/README.md):
cole a URL do script em `CONTACT_ENDPOINT` (`src/content.js`). Com a constante
vazia, o envio cai no plano B e abre o aplicativo de e-mail do visitante.
A CSP em `public/_headers` libera `script.google.com` e
`script.googleusercontent.com` em `connect-src`.

## Implantação

A página é publicada no Cloudflare Pages (projeto `site-pcg-cientec`), a
partir da branch `main`:

- Comando de build: `npm ci && npm run build`
- Diretório dos arquivos: `dist`
- Node.js: 20.19 ou superior

O arquivo `public/_headers` é copiado para `dist/` e aplicado pelo Cloudflare.

## Domínio oficial

O endereço oficial é `https://mostra.cientec.joinville.ufsc.br/`, um CNAME no
DNS da UFSC (SeTIC) apontando para `site-pcg-cientec.pages.dev`.

- Com `CANONICAL_URL` preenchido em `src/content.js`, quem abrir
  `site-pcg-cientec.pages.dev` é redirecionado para o domínio oficial. As
  prévias de branch (`<id>.site-pcg-cientec.pages.dev`) não são redirecionadas.
  Só preencha depois que o domínio aparecer como "Active" no painel do Pages.
- Os links internos não gravam `#seção` na barra de endereço.
- `frame-ancestors`, em `public/_headers`, ainda permite exibir o site num
  iframe do WordPress da CIENTEC (`cientec.joinville.ufsc.br` e
  `cientec.paginas.ufsc.br`).
