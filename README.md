# CIENTEC — Da Teoria ao Impacto

Landing page do CIENTEC, evento do Campus de Joinville da UFSC que aproxima universidade, escolas, indústria e sociedade por meio de ciência, tecnologia e inovação.

## Stack

- React
- Vite
- CSS responsivo
- JavaScript moderno

## Como executar localmente

1. Instale as dependências:

   ```bash
   npm install
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

## Estrutura principal

```text
src/
  App.jsx       # Interface e interações da página
  main.jsx      # Ponto de entrada React
  styles.css    # Identidade visual e responsividade
public/assets/  # Logo e favicon do CIENTEC
```

## Recursos da página

- Navegação responsiva com menu mobile.
- Contagem regressiva para o evento.
- Animações de entrada e efeitos de interação.
- Modal de interesse em participar.
- Formulário de feedback com confirmação visual.
- Favicon e identidade visual baseados no logotipo fornecido.

## Observação

Os formulários são demonstrativos e ainda não estão conectados a um serviço de persistência ou envio de e-mails.
