import { useEffect, useRef, useState } from 'react';
import { DEMO_NOTICE } from '../content.js';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

// Modal acessível: fecha com Esc ou clique no fundo, mantém o foco dentro
// do diálogo e devolve o foco ao elemento que o abriu.
export default function RegistrationModal({ onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const dialogRef = useRef(null);

  useEffect(() => {
    const opener = document.activeElement;
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.querySelector('input, button')?.focus();

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;
      const items = [...dialog.querySelectorAll(FOCUSABLE)];
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      if (opener instanceof HTMLElement) opener.focus();
    };
  }, [onClose]);

  useEffect(() => {
    if (submitted) dialogRef.current?.querySelector('button')?.focus();
  }, [submitted]);

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="registration-title"
        ref={dialogRef}
      >
        <button className="modal-close" onClick={onClose} aria-label="Fechar">
          ×
        </button>
        {submitted ? (
          <div className="success-state" role="status">
            <span>✓</span>
            <h3 id="registration-title">Inscrições em breve.</h3>
            <p>
              Este formulário ainda é demonstrativo: seus dados não foram
              enviados nem armazenados. Acompanhe as atualizações desta página
              para saber quando as inscrições abrirem.
            </p>
            <button className="text-button" onClick={onClose}>
              Voltar para a página
            </button>
          </div>
        ) : (
          <>
            <span className="eyebrow">Quero participar</span>
            <h2 id="registration-title">
              Reserve seu lugar
              <br />
              <em>na experiência.</em>
            </h2>
            <p>
              Deixe seu contato para receber novidades sobre a programação do
              evento.
            </p>
            <form onSubmit={handleSubmit}>
              <label htmlFor="registration-name">Nome</label>
              <input
                id="registration-name"
                name="name"
                autoComplete="name"
                maxLength={120}
                required
                placeholder="Seu nome completo"
              />
              <label htmlFor="registration-email">E-mail</label>
              <input
                id="registration-email"
                name="email"
                type="email"
                autoComplete="email"
                maxLength={254}
                required
                placeholder="voce@email.com"
              />
              <p className="form-notice">{DEMO_NOTICE}</p>
              <button className="form-submit" type="submit">
                Confirmar interesse <span>↗</span>
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
