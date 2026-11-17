import { useRef } from 'react';
import { PRIVACY_UPDATED, privacySections } from '../content.js';
import useDialog from '../hooks/useDialog.js';

// Aviso de privacidade (LGPD) do formulário de contato.
export default function PrivacyModal({ onClose }) {
  const dialogRef = useRef(null);
  useDialog(dialogRef, onClose, '.modal-close');

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <div
        className="modal modal-privacy"
        role="dialog"
        aria-modal="true"
        aria-labelledby="privacy-title"
        ref={dialogRef}
      >
        <button className="modal-close" onClick={onClose} aria-label="Fechar">
          ×
        </button>
        <span className="eyebrow">LGPD</span>
        <h2 id="privacy-title">
          Aviso de
          <br />
          <em>privacidade.</em>
        </h2>
        <p className="modal-lead">
          Como tratamos os dados enviados pelo formulário de contato deste site,
          conforme a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).
        </p>
        <dl className="privacy-list">
          {privacySections.map((section) => (
            <div key={section.title}>
              <dt>{section.title}</dt>
              <dd>{section.text}</dd>
            </div>
          ))}
        </dl>
        <p className="form-notice">Atualizado em {PRIVACY_UPDATED}.</p>
      </div>
    </div>
  );
}
