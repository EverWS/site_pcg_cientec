# CIENTEC — Da Teoria ao Impacto

Landing page do CIENTEC, evento do Campus de Joinville da UFSC que aproxima universidade, escolas, indústria e sociedade por meio de ciência, tecnologia e inovação.

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
  main.jsx                        # Ponto de entrada React
  styles.css                      # Identidade visual e responsividade
public/
  _headers                        # Cabeçalhos HTTP (CSP etc.) do Cloudflare Pages
  assets/                         # Logo e favicon do CIENTEC
vite.config.js                    # Plugin React e cabeçalhos do preview
```

## Recursos da página

- Navegação responsiva com menu mobile.
- Contagem regressiva para o evento.
- Animações de entrada e efeitos de interação.
- Modal de interesse em participar.
- Formulário de feedback com confirmação visual.
- Favicon e identidade visual baseados no logotipo fornecido.

## Observação

Os formulários são demonstrativos: não enviam nem armazenam dados, e a página
informa isso ao visitante. Antes de conectá-los a um serviço, publique uma
política de privacidade (LGPD), valide os dados no servidor e adicione proteção
anti-spam.

## Implantação

A página é implantada no Cloudflare Pages:

- Comando de build: `npm ci && npm run build`
- Diretório de saída: `dist`
- Node.js: 20.19 ou superior

O arquivo `public/_headers` é copiado para `dist/` e aplicado pelo Cloudflare.
