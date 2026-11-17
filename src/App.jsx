import { useCallback, useState } from 'react';
import Countdown from './components/Countdown.jsx';
import FeedbackForm from './components/FeedbackForm.jsx';
import ParticleField from './components/ParticleField.jsx';
import PrivacyModal from './components/PrivacyModal.jsx';
import ProgramAgenda from './components/ProgramAgenda.jsx';
import RegistrationModal from './components/RegistrationModal.jsx';
import RotatingWord from './components/RotatingWord.jsx';
import useCleanAnchors from './hooks/useCleanAnchors.js';
import usePageEffects from './hooks/usePageEffects.js';
import {
  CERTIFICATE_NOTE,
  FEEDBACK_FORM_URL,
  EVENT_DATE,
  EVENT_DATE_LABEL,
  EVENT_NAME,
  EVENT_PLACE,
  REGISTRATION_ALL,
  areas,
  heroWords,
  highlights,
  journey,
  navItems,
  news,
  program,
} from './content.js';

// Atraso escalonado das animações de entrada (variável CSS --delay).
const stagger = (index, step = 90) => ({ '--delay': `${index * step}ms` });

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [registrationOpen, setRegistrationOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);

  usePageEffects(setActiveSection);
  useCleanAnchors();

  const closeMenu = () => setMenuOpen(false);
  const closeRegistration = useCallback(() => setRegistrationOpen(false), []);
  const closePrivacy = useCallback(() => setPrivacyOpen(false), []);

  function openRegistration() {
    setRegistrationOpen(true);
    closeMenu();
  }

  return (
    <div className="app-shell">
      <a className="skip-link" href="#sobre">
        Pular para o conteúdo
      </a>

      <header className="site-header">
        <a
          className="brand"
          href="#inicio"
          onClick={closeMenu}
          aria-label={`${EVENT_NAME}, voltar ao início`}
        >
          <span className="brand-mark">
            <img src="/assets/logo-cientec.png" alt="" />
          </span>
          <span className="brand-copy">
            <strong>CIENTEC</strong>
            <small>1ª Mostra de Projetos · UFSC</small>
          </span>
        </a>
        <button
          className={`menu-toggle ${menuOpen ? 'is-open' : ''}`}
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
          aria-controls="main-nav"
        >
          <span />
          <span />
          <span />
        </button>
        <nav
          id="main-nav"
          className={menuOpen ? 'is-open' : ''}
          aria-label="Navegação principal"
        >
          {navItems.map(([id, label]) => (
            <a
              className={activeSection === id ? 'active' : ''}
              href={`#${id}`}
              key={id}
              onClick={closeMenu}
            >
              {label}
            </a>
          ))}
          <button className="nav-cta magnetic" onClick={openRegistration}>
            Quero participar <span aria-hidden="true">↗</span>
          </button>
        </nav>
        <span className="scroll-progress" aria-hidden="true" />
      </header>

      <main>
        <section id="inicio" className="hero">
          <ParticleField />
          <div className="hero-glow" aria-hidden="true" />

          <div className="hero-content">
            <p className="hero-kicker">
              <span className="pulse-dot" aria-hidden="true" />
              1ª edição · {EVENT_DATE_LABEL} · {EVENT_PLACE}
            </p>
            <h1 className="hero-title">
              <span className="line">
                <span>1ª Mostra</span>
              </span>{' '}
              <span className="line">
                <span>de Projetos</span>
              </span>{' '}
              <span className="line line-brand">
                <span>
                  CIENTEC<span className="sr-only"> -</span> <small>UFSC</small>
                </span>
              </span>
            </h1>
            <p className="hero-tagline">
              <span className="sr-only">Da teoria ao impacto.</span>
              <span aria-hidden="true">
                Da teoria ao <RotatingWord words={heroWords} />
              </span>
            </p>
            <p className="hero-lead">
              Projetos de estudantes do Campus de Joinville saem do papel e
              encontram a comunidade: protótipos, experimentos e soluções para
              ver de perto, perguntar e experimentar.
            </p>
            <div className="hero-actions">
              <button
                className="button button-primary magnetic"
                onClick={openRegistration}
              >
                Realizar inscrição <span aria-hidden="true">↗</span>
              </button>
              <a className="button button-ghost" href="#programacao">
                Ver programação <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="hero-axis" />
            <div className="orbit orbit-theory" />
            <div className="orbit orbit-impact" />
            <div className="logo-disc">
              <img src="/assets/logo-cientec.png" alt="" />
            </div>
            <div className="floating-note note-theory">
              <span>01 · teoria</span>
              <strong>Ciência</strong>
              <small>que se pergunta</small>
            </div>
            <div className="floating-note note-impact">
              <span>02 · impacto</span>
              <strong>Comunidade</strong>
              <small>que se transforma</small>
            </div>
          </div>

          <div className="hero-footer">
            <dl className="hero-meta">
              <div>
                <dt>Quando</dt>
                <dd>{EVENT_DATE_LABEL}, 8:30h às 18:30h</dd>
              </div>
              <div>
                <dt>Onde</dt>
                <dd>Joinville / SC</dd>
              </div>
              <div>
                <dt>Para quem</dt>
                <dd>Comunidade e escolas</dd>
              </div>
            </dl>
            <Countdown target={EVENT_DATE} label="Contagem regressiva" />
          </div>
        </section>

        <section className="marquee" aria-label="Áreas presentes na mostra">
          <ul className="marquee-track">
            {[...areas, ...areas].map((area, index) => (
              <li key={`${area}-${index}`} aria-hidden={index >= areas.length}>
                {area}
              </li>
            ))}
          </ul>
        </section>

        <section id="sobre" className="section section-light">
          <div className="section-heading section-heading-split reveal">
            <div>
              <span className="eyebrow">A mostra</span>
              <h2>
                Conhecimento ganha sentido <em>quando circula.</em>
              </h2>
            </div>
            <p>
              A {EVENT_NAME} é uma iniciativa de integração do Campus de
              Joinville. Em diálogo com o Bacharelado em Ciência e Tecnologia,
              ela aproxima universidade, escolas, indústria e sociedade para
              transformar conhecimento em experiências e soluções possíveis.
            </p>
          </div>
          <div className="highlight-grid">
            {highlights.map((item, index) => (
              <article
                className={`highlight-card spotlight tilt reveal tone-${item.tone}`}
                style={stagger(index)}
                key={item.eyebrow}
              >
                <div className="card-icon" aria-hidden="true">
                  {item.icon}
                </div>
                <span className="eyebrow">{item.eyebrow}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <span className="card-line" aria-hidden="true" />
              </article>
            ))}
          </div>
        </section>

        <section id="trajetoria" className="section section-dark journey">
          <div className="blueprint" aria-hidden="true" />
          <div className="section-heading section-heading-split reveal">
            <div>
              <span className="eyebrow">Trajetória de um projeto</span>
              <h2>
                Do traço tracejado
                <br />
                <em>ao mundo real.</em>
              </h2>
            </div>
            <p>
              Cada projeto exposto percorreu um caminho. Role a página e
              acompanhe a ideia deixando de ser rascunho para virar impacto.
            </p>
          </div>
          <div className="journey-track">
            <span className="journey-line" aria-hidden="true">
              <span className="journey-line-fill" />
            </span>
            <ol className="journey-steps">
              {journey.map((item, index) => (
                <li
                  className="journey-step reveal"
                  style={stagger(index, 120)}
                  key={item.step}
                >
                  <span className="journey-node" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="eyebrow">{item.step}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="programacao" className="section section-light">
          <div className="section-heading section-heading-split reveal">
            <div>
              <span className="eyebrow">Programação · {EVENT_DATE_LABEL}</span>
              <h2>
                Um dia inteiro de <em>teoria em movimento.</em>
              </h2>
            </div>
            <p>
              Das 8:30h às 18:30h: apresentações de TCC, projetos de extensão,
              momento cultural e roda de conversa com egressos.
            </p>
          </div>

          <aside className="agenda-callout reveal" aria-label="Inscrições">
            <div>
              <span className="eyebrow">Certificado de horas</span>
              <p>
                {CERTIFICATE_NOTE} Inscreva-se no dia inteiro de uma vez ou
                escolha apresentações específicas na lista abaixo.
              </p>
            </div>
            <div className="agenda-callout-actions">
              <a
                className="button button-primary magnetic"
                href={REGISTRATION_ALL.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Inscrever-se em todas <span aria-hidden="true">↗</span>
                <span className="sr-only"> (abre em nova aba)</span>
              </a>
              <button
                type="button"
                className="button button-ghost"
                onClick={openRegistration}
              >
                Ver opções de inscrição
              </button>
            </div>
          </aside>

          <div className="agenda-wrap reveal">
            <ProgramAgenda items={program} />
          </div>
        </section>

        <section id="noticias" className="section section-paper">
          <div className="section-heading section-heading-split reveal">
            <div>
              <span className="eyebrow">Diário de bordo</span>
              <h2>
                O que está <em>acontecendo.</em>
              </h2>
            </div>
            <span className="live-label">
              <i aria-hidden="true" /> Atualizações do projeto
            </span>
          </div>
          <ol className="news-timeline">
            {news.map((item, index) => (
              <li
                className={`news-card spotlight reveal ${item.featured ? 'featured' : ''}`}
                style={stagger(index, 110)}
                key={item.title}
              >
                <span className="news-dot" aria-hidden="true" />
                <span className="news-date">{item.date}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="feedback" className="feedback-section">
          <div className="feedback-orb" aria-hidden="true" />
          <div className="feedback-content reveal">
            <span className="eyebrow">Sua voz faz parte</span>
            <h2>
              Depois de conhecer,
              <br />
              <em>conte para a gente.</em>
            </h2>
            <p>
              Uma boa experiência também se constrói ouvindo quem participa.
              Compartilhe sua impressão e ajude a orientar as próximas edições.
            </p>
            <a
              className="button button-dark magnetic"
              href={FEEDBACK_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Deixar feedback <span aria-hidden="true">↗</span>
              <span className="sr-only"> (abre o formulário em nova aba)</span>
            </a>
          </div>
          <div className="feedback-form-card reveal" style={stagger(1, 120)}>
            <FeedbackForm onOpenPrivacy={() => setPrivacyOpen(true)} />
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p className="footer-wordmark" aria-hidden="true">
          CIENTEC
        </p>
        <div className="footer-row">
          <div className="footer-brand">
            <span className="brand-mark small">
              <img src="/assets/logo-cientec.png" alt="" />
            </span>
            <div>
              <strong>{EVENT_NAME}</strong>
              <span>Da teoria ao impacto</span>
            </div>
          </div>
          <p>
            Curso de Bacharelado em Ciência e Tecnologia
            <br />
            Universidade Federal de Santa Catarina · Centro Tecnológico de
            Joinville
          </p>
          <div className="footer-links">
            <button
              type="button"
              className="footer-top"
              onClick={() => setPrivacyOpen(true)}
            >
              Aviso de privacidade
            </button>
            <a className="footer-top" href="#inicio">
              Voltar ao topo <span aria-hidden="true">↑</span>
            </a>
          </div>
        </div>
      </footer>

      {registrationOpen && <RegistrationModal onClose={closeRegistration} />}
      {privacyOpen && <PrivacyModal onClose={closePrivacy} />}
    </div>
  );
}

export default App;
