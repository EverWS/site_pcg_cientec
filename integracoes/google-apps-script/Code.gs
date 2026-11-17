/**
 * Recebe as mensagens do formulário "Conte para a gente" do site da
 * 1ª Mostra de Projetos CIENTEC - UFSC e as encaminha por e-mail.
 *
 * Publique este script logado na conta ufsc.cientec@gmail.com, como
 * "App da Web" (Executar como: Eu; Quem pode acessar: Qualquer pessoa).
 * Passo a passo em README.md, nesta mesma pasta.
 *
 * Nenhum dado é gravado em planilha: o script apenas envia o e-mail.
 */

const DESTINO = 'ufsc.cientec@gmail.com';
const ASSUNTO = 'Mensagem do site - 1ª Mostra de Projetos CIENTEC';

// Limites contra abuso (cota do Gmail gratuito: ~100 e-mails por dia).
const LIMITE_POR_EMAIL = 3; // mensagens por remetente na janela
const LIMITE_GLOBAL = 30; // mensagens no total na janela
const JANELA_SEGUNDOS = 60 * 60; // 1 hora

const TAMANHO = { name: 120, email: 254, message: 2000 };
const EMAIL_VALIDO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function doPost(e) {
  try {
    const dados = JSON.parse((e && e.postData && e.postData.contents) || '{}');

    // Campo-isca: preenchido só por robôs. Responde "ok" sem enviar nada.
    if (dados.website) return resposta({ ok: true });

    const nome = limpar(dados.name, TAMANHO.name);
    const email = limpar(dados.email, TAMANHO.email).toLowerCase();
    const mensagem = limpar(dados.message, TAMANHO.message, true);

    if (!nome || !EMAIL_VALIDO.test(email) || !mensagem) {
      return resposta({ ok: false, error: 'invalid' });
    }

    if (!dentroDoLimite(email)) {
      return resposta({ ok: false, error: 'rate_limited' });
    }

    MailApp.sendEmail({
      to: DESTINO,
      replyTo: email,
      name: 'Site da Mostra CIENTEC',
      subject: ASSUNTO + ' - ' + nome,
      body:
        'Nome: ' + nome + '\n' +
        'E-mail: ' + email + '\n\n' +
        mensagem + '\n\n' +
        '---\nEnviado pelo formulário do site. Use "Responder" para ' +
        'responder diretamente a quem escreveu.',
    });

    return resposta({ ok: true });
  } catch (erro) {
    console.error(erro);
    return resposta({ ok: false, error: 'server' });
  }
}

// Remove caracteres de controle e corta no tamanho máximo.
function limpar(valor, max, multilinha) {
  let texto = String(valor == null ? '' : valor);
  texto = multilinha
    ? texto.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    : texto.replace(/[\u0000-\u001F\u007F]/g, ' ');
  return texto.trim().slice(0, max);
}

// Contadores temporários no cache do script (expiram sozinhos).
function dentroDoLimite(email) {
  const trava = LockService.getScriptLock();
  trava.waitLock(5000);
  try {
    const cache = CacheService.getScriptCache();
    const chaveEmail = 'remetente:' + email;
    const porEmail = Number(cache.get(chaveEmail) || 0);
    const global = Number(cache.get('global') || 0);
    if (porEmail >= LIMITE_POR_EMAIL || global >= LIMITE_GLOBAL) return false;
    cache.put(chaveEmail, String(porEmail + 1), JANELA_SEGUNDOS);
    cache.put('global', String(global + 1), JANELA_SEGUNDOS);
    return true;
  } finally {
    trava.releaseLock();
  }
}

function resposta(objeto) {
  return ContentService.createTextOutput(JSON.stringify(objeto)).setMimeType(
    ContentService.MimeType.JSON
  );
}
