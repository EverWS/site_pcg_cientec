# Envio das mensagens do site (Google Apps Script)

O formulário "Conte para a gente" envia nome, e-mail e mensagem para um
script publicado na conta **ufsc.cientec@gmail.com**. O script manda um e-mail
para essa mesma caixa com "Responder para" apontando para quem escreveu.
Não é preciso API paga nem chave: o script usa o serviço `MailApp` da própria
conta Google (cota gratuita de cerca de 100 e-mails por dia).

## Publicar o script (uma vez)

1. Entre em <https://script.google.com> **logado em ufsc.cientec@gmail.com**.
2. **Novo projeto** → renomeie para `Mostra CIENTEC - formulário`.
3. Apague o conteúdo de `Código.gs` e cole o conteúdo de [`Code.gs`](Code.gs).
   Salve (Ctrl+S).
4. **Implantar → Nova implantação** → engrenagem → **App da Web**:
   - Descrição: `Formulário do site`
   - Executar como: **Eu (ufsc.cientec@gmail.com)**
   - Quem pode acessar: **Qualquer pessoa**
5. **Implantar** → **Autorizar acesso** → escolha a conta → em "O Google não
   verificou este app" clique em **Avançado → Acessar (não seguro)** (é o
   próprio script da conta) → **Permitir** (permissão de enviar e-mail).
6. Copie a **URL do app da Web** (termina em `/exec`).

## Ligar o site ao script

Cole a URL em `CONTACT_ENDPOINT`, em `src/content.js`, faça o build e publique.
Enquanto `CONTACT_ENDPOINT` estiver vazio, o site usa o plano B: abre o
aplicativo de e-mail do visitante.

## Testar

Envie uma mensagem pelo site e confira a caixa de entrada (e o spam) de
ufsc.cientec@gmail.com. Em script.google.com → **Execuções** aparecem erros,
se houver.

## Alterar o script depois

Edite o código e use **Implantar → Gerenciar implantações → editar (lápis) →
Versão: Nova versão → Implantar**. Assim a URL continua a mesma. Uma
"Nova implantação" gera outra URL, que teria de ser trocada no site.
