import { useCallback, useEffect, useMemo, useState } from 'react';
import RegistrationModal from './components/RegistrationModal.jsx';
import {
  DEMO_NOTICE,
  EVENT_DATE,
  highlights,
  navItems,
  news,
  schedule,
} from './content.js';

function getTimeLeft() {
  const difference = new Date(EVENT_DATE).getTime() - Date.now();
  if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(difference / 86400000),
    hours: Math.floor((difference / 3600000) % 24),
    minutes: Math.floor((difference / 60000) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [registrationOpen, setRegistrationOpen] = useState(false);
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const timer = window.setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (entry) =>
            entry.isIntersecting && entry.target.classList.add('is-visible'),
        ),
      { threshold: 0.12 },
    );
    const sectionObserver = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (entry) => entry.isIntersecting && setActiveSection(entry.target.id),
        ),
      { rootMargin: '-20% 0px -65% 0px', threshold: 0 },
    );
    document
      .querySelectorAll('.reveal')
      .forEach((element) => revealObserver.observe(element));
    document
      .querySelectorAll('main section[id]')
      .forEach((section) => sectionObserver.observe(section));
    return () => {
      revealObserver.disconnect();
      sectionObserver.disconnect();
    };
  }, []);

  const countdown = useMemo(
    () => [
      ['dias', timeLeft.days],
      ['horas', timeLeft.hours],
      ['min', timeLeft.minutes],
      ['seg', timeLeft.seconds],
    ],
    [timeLeft],
  );

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
      <header className="site-header">
        <a
          className="brand"
          href="#inicio"
          onClick={closeMenu}
          aria-label="CIENTEC, voltar ao início"
        >
          <span className="brand-mark">
            <img src="/assets/logo-cientec.png" alt="" />
          </span>
          <span className="brand-copy">
            <strong>CIENTEC</strong>
            <small>Da teoria ao impacto</small>
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
          <a
            className={activeSection === 'inicio' ? 'active' : ''}
            href="#inicio"
            onClick={closeMenu}
          >
            Início
          </a>
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
          <button className="nav-cta" onClick={openRegistration}>
            Quero participar <span>↗</span>
          </button>
        </nav>
      </header>

      <main>
        <section id="inicio" className="hero">
          <div className="hero-grid" />
          <div className="hero-content reveal is-visible">
            <div className="hero-kicker">
              <span className="pulse-dot" /> UFSC Joinville · ciência em
              movimento
            </div>
            <h1>
              Da teoria <em>ao impacto.</em>
            </h1>
            <p className="hero-lead">
              Uma experiência para descobrir como o conhecimento acadêmico pode
              ganhar forma, circular pela comunidade e transformar perguntas em
              possibilidades.
            </p>
            <div className="hero-actions">
              <button
                className="button button-primary"
                onClick={openRegistration}
              >
                Realizar inscrição <span>↗</span>
              </button>
              <a className="button button-ghost" href="#sobre">
                Explorar o evento <span>↓</span>
              </a>
            </div>
            <div className="hero-meta">
              <div>
                <span>Quando</span>
                <strong>03 dez. 2026</strong>
              </div>
              <div>
                <span>Onde</span>
                <strong>Joinville / SC</strong>
              </div>
              <div>
                <span>Para quem</span>
                <strong>Comunidade e escolas</strong>
              </div>
            </div>
          </div>
          <div
            className="hero-visual reveal is-visible"
            aria-label="Identidade visual do CIENTEC"
          >
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="logo-card">
              <img src="/assets/logo-cientec.png" alt="Logotipo CIENTEC" />
            </div>
            <div className="floating-note note-top">
              <span>01</span>
              <strong>Ciência</strong>
              <small>que se compartilha</small>
            </div>
            <div className="floating-note note-bottom">
              <span>+</span>
              <strong>Impacto</strong>
              <small>que se multiplica</small>
            </div>
          </div>
          <a className="scroll-cue" href="#sobre">
            <span>Scroll para explorar</span>
            <i>↓</i>
          </a>
        </section>

        <section
          className="countdown-strip"
          aria-label="Contagem regressiva para o evento"
        >
          <div className="countdown-intro">
            <span className="eyebrow">A próxima descoberta começa em</span>
            <strong>03.12.2026</strong>
          </div>
          <div className="countdown-values">
            {countdown.map(([label, value]) => (
              <div className="countdown-item" key={label}>
                <strong>{pad(value)}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="sobre" className="section section-light">
          <div className="section-heading reveal">
            <span className="eyebrow">O evento</span>
            <h2>
              Conhecimento ganha sentido <em>quando circula.</em>
            </h2>
            <p>
              O CIENTEC é uma iniciativa de integração do Campus de Joinville da
              UFSC. Em diálogo com o Bacharelado em Ciência e Tecnologia — uma
              formação multidisciplinar que combina engenharias, computação,
              empreendedorismo e inovação — o evento aproxima universidade,
              escolas, indústria e sociedade para transformar conhecimento em
              experiências e soluções possíveis.
            </p>
          </div>
          <div className="highlight-grid">
            {highlights.map((item, index) => (
              <article
                className="highlight-card reveal"
                style={{ '--delay': `${index * 100}ms` }}
                key={item.eyebrow}
              >
                <div className="card-icon">{item.icon}</div>
                <span className="eyebrow">{item.eyebrow}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <span className="card-line" />
              </article>
            ))}
          </div>
        </section>

        <section id="programacao" className="section section-dark">
          <div className="section-heading section-heading-split reveal">
            <div>
              <span className="eyebrow">Uma programação para experimentar</span>
              <h2>
                Veja, faça,
                <br />
                <em>converse.</em>
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
                className={`schedule-item ${item.tone} reveal`}
                style={{ '--delay': `${index * 100}ms` }}
                key={item.number}
              >
                <span className="schedule-number">{item.number}</span>
                <div>
                  <span className="eyebrow">{item.time}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
                <span className="arrow-circle">↗</span>
              </article>
            ))}
          </div>
        </section>

        <section id="noticias" className="section section-light news-section">
          <div className="section-heading section-heading-split reveal">
            <div>
              <span className="eyebrow">Diário de bordo</span>
              <h2>
                O que está <em>acontecendo.</em>
              </h2>
            </div>
            <span className="live-label">
              <i /> Atualizações do projeto
            </span>
          </div>
          <div className="news-grid">
            {news.map((item, index) => (
              <article
                className={`news-card reveal ${item.featured ? 'featured' : ''}`}
                style={{ '--delay': `${index * 100}ms` }}
                key={item.title}
              >
                <span className="news-date">{item.date}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <span className="news-arrow">↗</span>
              </article>
            ))}
          </div>
        </section>

        <section id="feedback" className="feedback-section">
          <div className="feedback-orb" />
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
              className="button button-primary"
              onClick={goToFeedbackForm}
            >
              Deixar feedback <span>↗</span>
            </button>
          </div>
          <div className="feedback-form-card reveal">
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
                  placeholder="O que você gostaria de encontrar no CIENTEC?"
                  rows="3"
                />
                <p className="form-notice">{DEMO_NOTICE}</p>
                <button className="form-submit" type="submit">
                  Enviar mensagem <span>↗</span>
                </button>
              </form>
            )}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-brand">
          <span className="brand-mark small">
            <img src="/assets/logo-cientec.png" alt="" />
          </span>
          <div>
            <strong>CIENTEC</strong>
            <span>Da teoria ao impacto</span>
          </div>
        </div>
        <p>
          Curso de Bacharelado em Ciência e Tecnologia
          <br />
          Universidade Federal de Santa Catarina · Centro Tecnológico de
          Joinville
        </p>
        <span className="footer-year">UFSC · 2026</span>
      </footer>

      {registrationOpen && <RegistrationModal onClose={closeRegistration} />}
    </div>
  );
}

export default App;
