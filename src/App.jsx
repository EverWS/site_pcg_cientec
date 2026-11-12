import { useCallback, useState } from 'react';
import Countdown from './components/Countdown.jsx';
import ParticleField from './components/ParticleField.jsx';
import RegistrationModal from './components/RegistrationModal.jsx';
import RotatingWord from './components/RotatingWord.jsx';
import usePageEffects from './hooks/usePageEffects.js';
import {
  DEMO_NOTICE,
  EVENT_DATE,
  EVENT_DATE_LABEL,
  EVENT_NAME,
  EVENT_PLACE,
  areas,
  heroWords,
  highlights,
  journey,
  navItems,
  news,
  schedule,
} from './content.js';

// Atraso escalonado das animações de entrada (variável CSS --delay).
const stagger = (index, step = 90) => ({ '--delay': `${index * step}ms` });

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [registrationOpen, setRegistrationOpen] = useState(false);
  const [feedbackSent, setFeedbackSent] = useState(false);

  usePageEffects(setActiveSection);

  const closeMenu = () => setMenuOpen(false);
  const closeRegistration = useCallback(() => setRegistrationOpen(false), []);

  function openRegistration() {
    setRegistrationOpen(true);
    closeMenu();
  }

  function goToFeedbackForm() {
    setFeedbackSent(false);
    // Aguarda o formulário ser renderizado antes de rolar e focar.
    window.requestAnimationFrame(() => {
      const field = document.getElementById('feedback-message');
      field?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      field?.focus({ preventScroll: true });
    });
  }

  function handleFeedback(event) {
    event.preventDefault();
    setFeedbackSent(true);
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
              <a className="button button-ghost" href="#trajetoria">
                Conhecer a mostra <span aria-hidden="true">↓</span>
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
                <dd>{EVENT_DATE_LABEL}</dd>
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
              <span className="eyebrow">Uma programação para experimentar</span>
              <h2>
                Veja, faça, <em>converse.</em>
              </h2>
            </div>
            <p>
              Três caminhos para sair da posição de espectador e entrar na
              conversa sobre ciência, tecnologia e futuro.
            </p>
          </div>
          <div className="schedule-list">
            {schedule.map((item, index) => (
              <article
                className={`schedule-item tone-${item.tone} reveal`}
                style={stagger(index)}
                key={item.number}
              >
                <span className="schedule-number">{item.number}</span>
                <div>
                  <span className="eyebrow">{item.time}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
                <span className="arrow-circle" aria-hidden="true">
                  ↗
                </span>
              </article>
            ))}
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
            <button
              className="button button-dark magnetic"
              onClick={goToFeedbackForm}
            >
              Deixar feedback <span aria-hidden="true">↗</span>
            </button>
          </div>
          <div className="feedback-form-card reveal" style={stagger(1, 120)}>
            {feedbackSent ? (
              <div className="success-state" role="status">
                <span>✓</span>
                <h3>Obrigado pelo interesse.</h3>
                <p>
                  Este formulário ainda é demonstrativo: sua mensagem não foi
                  enviada nem armazenada.
                </p>
                <button className="text-button" onClick={goToFeedbackForm}>
                  Enviar outro feedback
                </button>
              </div>
            ) : (
              <form onSubmit={handleFeedback}>
                <label htmlFor="feedback-name">
                  Seu nome <span>opcional</span>
                </label>
                <input
                  id="feedback-name"
                  name="name"
                  autoComplete="name"
                  maxLength={120}
                  placeholder="Como podemos chamar você?"
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
                <p className="form-notice">{DEMO_NOTICE}</p>
                <button className="form-submit" type="submit">
                  Enviar mensagem <span aria-hidden="true">↗</span>
                </button>
              </form>
            )}
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
          <a className="footer-top" href="#inicio">
            Voltar ao topo <span aria-hidden="true">↑</span>
          </a>
        </div>
      </footer>

      {registrationOpen && <RegistrationModal onClose={closeRegistration} />}
    </div>
  );
}

export default App;
