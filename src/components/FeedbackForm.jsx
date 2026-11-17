import { useRef, useState } from 'react';
import { CONTACT_EMAIL, CONTACT_ENDPOINT } from '../content.js';

const ERRORS = {
  invalid: 'Confira nome, e-mail e mensagem e tente de novo.',
  rate_limited:
    'Recebemos muitas mensagens agora. Tente novamente mais tarde ou escreva direto para o nosso e-mail.',
  default:
    'Não foi possível enviar agora. Tente novamente ou escreva direto para o nosso e-mail.',
};

// Abaixo deste tempo entre abrir e enviar, o envio é tratado como robô.
const MIN_FILL_MS = 2500;

// Plano B, usado enquanto CONTACT_ENDPOINT estiver vazio.
function openMailClient({ name, email, message }) {
  const params = new URLSearchParams({
    subject: `Mensagem da 1ª Mostra CIENTEC - ${name}`,
    body: `Nome: ${name}\nE-mail: ${email}\n\n${message}`,
  })
    .toString()
    .replace(/\+/g, '%20');
  window.location.href = `mailto:${CONTACT_EMAIL}?${params}`;
}

// Caixa "Conte para a gente": envia nome, e-mail e mensagem ao Google Apps
// Script da organização, que encaminha para CONTACT_EMAIL.
export default function FeedbackForm({ onOpenPrivacy }) {
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [error, setError] = useState('');
  const shownAt = useRef(Date.now());
  const formRef = useRef(null);

  function reset() {
    setStatus('idle');
    setError('');
    shownAt.current = Date.now();
    window.requestAnimationFrame(() => {
      const field = document.getElementById('feedback-name');
      field?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      field?.focus({ preventScroll: true });
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (status === 'sending') return;
    const data = new FormData(event.currentTarget);
    const payload = {
      name: String(data.get('name') || '').trim(),
      email: String(data.get('email') || '').trim(),
      message: String(data.get('message') || '').trim(),
      website: String(data.get('website') || ''),
    };

    // Robôs: campo-isca preenchido ou envio instantâneo. Finge sucesso.
    if (payload.website || Date.now() - shownAt.current < MIN_FILL_MS) {
      setStatus('sent');
      return;
    }

    if (!CONTACT_ENDPOINT) {
      openMailClient(payload);
      setStatus('sent');
      return;
    }

    setStatus('sending');
    setError('');
    try {
      // text/plain evita a pré-verificação CORS, que o Apps Script não atende.
      const response = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
        credentials: 'omit',
        referrerPolicy: 'no-referrer',
      });
      const result = await response.json();
      if (!result.ok) throw new Error(result.error || 'default');
      formRef.current?.reset();
      setStatus('sent');
    } catch (err) {
      setError(ERRORS[err.message] || ERRORS.default);
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div className="success-state" role="status">
        <span>✓</span>
        {CONTACT_ENDPOINT ? (
          <>
            <h3>Mensagem enviada!</h3>
            <p>
              Obrigado por escrever. Responderemos no e-mail que você informou.
            </p>
          </>
        ) : (
          <>
            <h3>Quase lá!</h3>
            <p>
              Confira a mensagem no seu aplicativo de e-mail e clique em enviar.
              Se ele não abrir, escreva para{' '}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
            </p>
          </>
        )}
        <button className="text-button" onClick={reset}>
          Escrever outra mensagem
        </button>
      </div>
    );
  }

  const sending = status === 'sending';

  return (
    <form ref={formRef} onSubmit={handleSubmit} aria-busy={sending}>
      <label htmlFor="feedback-name">Seu nome</label>
      <input
        id="feedback-name"
        name="name"
        autoComplete="name"
        required
        maxLength={120}
        placeholder="Como podemos chamar você?"
      />
      <label htmlFor="feedback-email">Seu e-mail</label>
      <input
        id="feedback-email"
        name="email"
        type="email"
        autoComplete="email"
        required
        maxLength={254}
        placeholder="Para respondermos a sua mensagem"
      />
      <label htmlFor="feedback-message">Sua mensagem</label>
      <textarea
        id="feedback-message"
        name="message"
        required
        maxLength={2000}
        placeholder="O que você gostaria de encontrar na mostra?"
        rows="3"
      />
      {/* Campo-isca invisível para pessoas; robôs costumam preenchê-lo. */}
      <div className="form-trap" aria-hidden="true">
        <label htmlFor="feedback-website">Não preencha</label>
        <input
          id="feedback-website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <p className="form-notice">
        Ao enviar, você concorda com o uso desses dados apenas para responder a
        sua mensagem.{' '}
        <button type="button" className="inline-link" onClick={onOpenPrivacy}>
          Aviso de privacidade
        </button>
      </p>
      {status === 'error' && (
        <p className="form-error" role="alert">
          {error} <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </p>
      )}
      <button className="form-submit" type="submit" disabled={sending}>
        {sending ? 'Enviando…' : 'Enviar mensagem'}{' '}
        <span aria-hidden="true">↗</span>
      </button>
    </form>
  );
}
