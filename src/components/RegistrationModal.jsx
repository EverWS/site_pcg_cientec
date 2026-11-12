import { useEffect, useRef, useState } from 'react';
import {
  CERTIFICATE_NOTE,
  PROGRAM_STATUS,
  REGISTRATION_ALL,
  program,
} from '../content.js';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

const registrable = program.filter((item) => item.url);

// Modal de inscrição em duas etapas: escolher entre a inscrição completa e as
// inscrições individuais; na segunda, listar os links por apresentação.
// Fecha com Esc ou clique no fundo, mantém o foco dentro do diálogo e
// devolve o foco ao elemento que o abriu.
export default function RegistrationModal({ onClose }) {
  const [step, setStep] = useState('choose');
  const dialogRef = useRef(null);
  const firstRender = useRef(true);

  useEffect(() => {
    const opener = document.activeElement;
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.querySelector('.choice')?.focus();

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

  // Ao trocar de etapa, leva o foco ao título e volta a rolagem ao topo.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    dialogRef.current.scrollTop = 0;
    dialogRef.current.querySelector('#registration-title')?.focus();
  }, [step]);

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <div
        className="modal modal-registration"
        role="dialog"
        aria-modal="true"
        aria-labelledby="registration-title"
        ref={dialogRef}
      >
        <button className="modal-close" onClick={onClose} aria-label="Fechar">
          ×
        </button>

        {step === 'choose' ? (
          <div className="modal-step" key="choose">
            <span className="eyebrow">Inscrições</span>
            <h2 id="registration-title" tabIndex={-1}>
              Como você quer
              <br />
              <em>participar?</em>
            </h2>
            <p className="modal-lead">
              As inscrições são feitas na plataforma da UFSC. {CERTIFICATE_NOTE}
            </p>

            <div className="choice-list">
              <a
                className="choice choice-all"
                href={REGISTRATION_ALL.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="choice-icon" aria-hidden="true">
                  ◎
                </span>
                <span className="choice-copy">
                  <strong>{REGISTRATION_ALL.title}</strong>
                  <span>{REGISTRATION_ALL.text}</span>
                  <small>Abre a inscrição na UFSC em nova aba</small>
                </span>
                <span className="choice-arrow" aria-hidden="true">
                  ↗
                </span>
              </a>

              <button
                type="button"
                className="choice"
                onClick={() => setStep('individual')}
              >
                <span className="choice-icon" aria-hidden="true">
                  ⌗
                </span>
                <span className="choice-copy">
                  <strong>Apresentações específicas</strong>
                  <span>
                    Escolha entre {registrable.length} apresentações e faça uma
                    inscrição para cada uma.
                  </span>
                  <small>Ver a lista de apresentações</small>
                </span>
                <span className="choice-arrow" aria-hidden="true">
                  →
                </span>
              </button>
            </div>
            <p className="form-notice">{PROGRAM_STATUS}</p>
          </div>
        ) : (
          <div className="modal-step" key="individual">
            <button
              type="button"
              className="modal-back"
              onClick={() => setStep('choose')}
            >
              <span aria-hidden="true">←</span> Voltar
            </button>
            <span className="eyebrow">Inscrição individual</span>
            <h2 id="registration-title" tabIndex={-1}>
              Escolha as
              <br />
              <em>apresentações.</em>
            </h2>
            <p className="modal-lead">
              Cada link abre a inscrição daquela apresentação na plataforma da
              UFSC, em nova aba. Inscreva-se em quantas quiser.
            </p>
            <ul className="registration-list">
              {registrable.map((item) => (
                <li key={item.id}>
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    <time>{item.start}</time>
                    <span className="registration-copy">
                      <strong>{item.title}</strong>
                      {item.detail && <span>{item.detail}</span>}
                    </span>
                    <span className="registration-cta">
                      Inscrever-se <span aria-hidden="true">↗</span>
                    </span>
                    <span className="sr-only"> (abre em nova aba)</span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="form-notice">
              {PROGRAM_STATUS} {CERTIFICATE_NOTE}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
