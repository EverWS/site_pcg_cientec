import { useEffect, useMemo, useState } from 'react';

const navItems = [
  ['sobre', 'O evento'],
  ['programacao', 'Programação'],
  ['noticias', 'Atualizações'],
  ['feedback', 'Feedback'],
];

const highlights = [
  { icon: '◎', eyebrow: 'Propósito', title: 'Conhecimento que encontra contexto', text: 'Uma ponte entre a formação universitária e os desafios reais da sociedade, com espaço para testar ideias e compartilhar descobertas.' },
  { icon: '⌘', eyebrow: 'Interdisciplinaridade', title: 'Diferentes saberes, um mesmo movimento', text: 'Resultados dos projetos extensionistas se conectam em uma experiência que reúne ciência, criatividade, tecnologia e impacto social.' },
  { icon: '↗', eyebrow: 'Comunidade', title: 'Portas abertas para Joinville', text: 'Escolas e comunidade externa são convidadas a explorar, perguntar, experimentar e participar da construção do futuro.' },
];

const schedule = [
  { number: '01', time: 'Durante todo o evento', title: 'Exposição de projetos', text: 'Protótipos, simulações, pesquisas aplicadas e soluções desenvolvidas pelos acadêmicos.', tone: 'blue' },
  { number: '02', time: 'Atividades práticas', title: 'Workshops e oficinas', text: 'Experiências para visitantes e estudantes do ensino básico e médio das escolas convidadas.', tone: 'gold' },
  { number: '03', time: 'Programação de palco', title: 'Palestras e apresentações', text: 'Conversas sobre inovação, sustentabilidade, empreendedorismo e impactos sociais da tecnologia.', tone: 'orange' },
];

const news = [
  ['OUT 2026', 'Definição de workshops e palestras', 'A comissão organizadora está finalizando a grade oficial de atividades práticas e exposições.'],
  ['NOV 2026', 'Convite às escolas de Joinville', 'Começa o cronograma de visitas e convites oficiais às escolas do município para participação na mostra.'],
  ['03 DEZ 2026', 'Grande dia do evento', 'O CIENTEC abre suas portas para a comunidade e transforma teoria em experiências compartilhadas.'],
];

function getTimeLeft() {
  const difference = new Date('2026-12-03T09:00:00-03:00').getTime() - Date.now();
  if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return { days: Math.floor(difference / 86400000), hours: Math.floor((difference / 3600000) % 24), minutes: Math.floor((difference / 60000) % 60), seconds: Math.floor((difference / 1000) % 60) };
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [registrationOpen, setRegistrationOpen] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const timer = window.setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')), { threshold: 0.12 });
    const sectionObserver = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && setActiveSection(entry.target.id)), { rootMargin: '-20% 0px -65% 0px', threshold: 0 });
    document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
    document.querySelectorAll('main section[id]').forEach((section) => sectionObserver.observe(section));
    return () => { revealObserver.disconnect(); sectionObserver.disconnect(); };
  }, []);

  const countdown = useMemo(() => [['dias', timeLeft.days], ['horas', timeLeft.hours], ['min', timeLeft.minutes], ['seg', timeLeft.seconds]], [timeLeft]);

  function closeMenu() { setMenuOpen(false); }
  function handleRegistration(event) { event.preventDefault(); setRegistered(true); }
  function handleFeedback(event) { event.preventDefault(); setFeedbackSent(true); }

  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand" href="#inicio" onClick={closeMenu} aria-label="CIENTEC, voltar ao início">
          <span className="brand-mark"><img src="/assets/logo-cientec.png" alt="" /></span>
          <span className="brand-copy"><strong>CIENTEC</strong><small>Da teoria ao impacto</small></span>
        </a>
        <button className={`menu-toggle ${menuOpen ? 'is-open' : ''}`} onClick={() => setMenuOpen((open) => !open)} aria-label="Abrir menu" aria-expanded={menuOpen}><span /><span /><span /></button>
        <nav className={menuOpen ? 'is-open' : ''} aria-label="Navegação principal">
          <a className={activeSection === 'inicio' ? 'active' : ''} href="#inicio" onClick={closeMenu}>Início</a>
          {navItems.map(([id, label]) => <a className={activeSection === id ? 'active' : ''} href={`#${id}`} key={id} onClick={closeMenu}>{label}</a>)}
          <button className="nav-cta" onClick={() => { setRegistrationOpen(true); closeMenu(); }}>Quero participar <span>↗</span></button>
        </nav>
      </header>

      <main>
        <section id="inicio" className="hero">
          <div className="hero-grid" />
          <div className="hero-content reveal is-visible">
            <div className="hero-kicker"><span className="pulse-dot" /> UFSC Joinville · ciência em movimento</div>
            <h1>Da teoria <em>ao impacto.</em></h1>
            <p className="hero-lead">Uma experiência para descobrir como o conhecimento acadêmico pode ganhar forma, circular pela comunidade e transformar perguntas em possibilidades.</p>
            <div className="hero-actions"><button className="button button-primary" onClick={() => setRegistrationOpen(true)}>Realizar inscrição <span>↗</span></button><a className="button button-ghost" href="#sobre">Explorar o evento <span>↓</span></a></div>
            <div className="hero-meta"><div><span>Quando</span><strong>03 dez. 2026</strong></div><div><span>Onde</span><strong>Joinville / SC</strong></div><div><span>Para quem</span><strong>Comunidade e escolas</strong></div></div>
          </div>
          <div className="hero-visual reveal is-visible" aria-label="Identidade visual do CIENTEC">
            <div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="logo-card"><img src="/assets/logo-cientec.png" alt="Logotipo CIENTEC" /></div>
            <div className="floating-note note-top"><span>01</span><strong>Ciência</strong><small>que se compartilha</small></div><div className="floating-note note-bottom"><span>+</span><strong>Impacto</strong><small>que se multiplica</small></div>
          </div>
          <a className="scroll-cue" href="#sobre"><span>Scroll para explorar</span><i>↓</i></a>
        </section>

        <section className="countdown-strip" aria-label="Contagem regressiva para o evento"><div className="countdown-intro"><span className="eyebrow">A próxima descoberta começa em</span><strong>03.12.2026</strong></div><div className="countdown-values">{countdown.map(([label, value]) => <div className="countdown-item" key={label}><strong>{pad(value)}</strong><span>{label}</span></div>)}</div></section>

        <section id="sobre" className="section section-light"><div className="section-heading reveal"><span className="eyebrow">O evento</span><h2>Conhecimento ganha sentido <em>quando circula.</em></h2><p>O CIENTEC é uma iniciativa de integração do Campus de Joinville da UFSC. Em diálogo com o Bacharelado em Ciência e Tecnologia — uma formação multidisciplinar que combina engenharias, computação, empreendedorismo e inovação — o evento aproxima universidade, escolas, indústria e sociedade para transformar conhecimento em experiências e soluções possíveis.</p></div><div className="highlight-grid">{highlights.map((item, index) => <article className="highlight-card reveal" style={{ '--delay': `${index * 100}ms` }} key={item.eyebrow}><div className="card-icon">{item.icon}</div><span className="eyebrow">{item.eyebrow}</span><h3>{item.title}</h3><p>{item.text}</p><span className="card-line" /></article>)}</div></section>

        <section id="programacao" className="section section-dark"><div className="section-heading section-heading-split reveal"><div><span className="eyebrow">Uma programação para experimentar</span><h2>Veja, faça,<br /><em>converse.</em></h2></div><p>Três caminhos para sair da posição de espectador e entrar na conversa sobre ciência, tecnologia e futuro.</p></div><div className="schedule-list">{schedule.map((item, index) => <article className={`schedule-item ${item.tone} reveal`} style={{ '--delay': `${index * 100}ms` }} key={item.number}><span className="schedule-number">{item.number}</span><div><span className="eyebrow">{item.time}</span><h3>{item.title}</h3><p>{item.text}</p></div><span className="arrow-circle">↗</span></article>)}</div></section>

        <section id="noticias" className="section section-light news-section"><div className="section-heading section-heading-split reveal"><div><span className="eyebrow">Diário de bordo</span><h2>O que está <em>acontecendo.</em></h2></div><span className="live-label"><i /> Atualizações do projeto</span></div><div className="news-grid">{news.map(([date, title, text], index) => <article className={`news-card reveal ${index === 2 ? 'featured' : ''}`} style={{ '--delay': `${index * 100}ms` }} key={title}><span className="news-date">{date}</span><h3>{title}</h3><p>{text}</p><span className="news-arrow">↗</span></article>)}</div></section>

        <section id="feedback" className="feedback-section"><div className="feedback-orb" /><div className="feedback-content reveal"><span className="eyebrow">Sua voz faz parte</span><h2>Depois de conhecer,<br /><em>conte para a gente.</em></h2><p>Uma boa experiência também se constrói ouvindo quem participa. Compartilhe sua impressão e ajude a orientar as próximas edições.</p><button className="button button-primary" onClick={() => setFeedbackSent(false)}>Deixar feedback <span>↗</span></button></div><div className="feedback-form-card reveal">{feedbackSent ? <div className="success-state"><span>✓</span><h3>Obrigado por participar.</h3><p>Seu feedback foi registrado nesta experiência demonstrativa.</p><button className="text-button" onClick={() => setFeedbackSent(false)}>Enviar outro feedback</button></div> : <form onSubmit={handleFeedback}><label htmlFor="feedback-name">Seu nome <span>opcional</span></label><input id="feedback-name" placeholder="Como podemos chamar você?" /><label htmlFor="feedback-message">Sua mensagem</label><textarea id="feedback-message" required placeholder="O que você gostaria de encontrar no CIENTEC?" rows="3" /><button className="form-submit" type="submit">Enviar mensagem <span>↗</span></button></form>}</div></section>
      </main>

      <footer className="site-footer"><div className="footer-brand"><span className="brand-mark small"><img src="/assets/logo-cientec.png" alt="" /></span><div><strong>CIENTEC</strong><span>Da teoria ao impacto</span></div></div><p>Curso de Bacharelado em Ciência e Tecnologia<br />Universidade Federal de Santa Catarina · Centro Tecnológico de Joinville</p><span className="footer-year">UFSC · 2026</span></footer>

      {registrationOpen && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setRegistrationOpen(false)}><div className="modal" role="dialog" aria-modal="true" aria-labelledby="registration-title"><button className="modal-close" onClick={() => setRegistrationOpen(false)} aria-label="Fechar">×</button>{registered ? <div className="success-state"><span>✓</span><h3>Inscrição recebida.</h3><p>Perfeito! Este protótipo já registrou seu interesse no CIENTEC.</p><button className="text-button" onClick={() => setRegistrationOpen(false)}>Voltar para a página</button></div> : <><span className="eyebrow">Quero participar</span><h2 id="registration-title">Reserve seu lugar<br /><em>na experiência.</em></h2><p>Deixe seu contato para receber novidades sobre a programação do evento.</p><form onSubmit={handleRegistration}><label htmlFor="registration-name">Nome</label><input id="registration-name" required placeholder="Seu nome completo" /><label htmlFor="registration-email">E-mail</label><input id="registration-email" required type="email" placeholder="voce@email.com" /><button className="form-submit" type="submit">Confirmar interesse <span>↗</span></button></form></>}</div></div>}
    </div>
  );
}

export default App;
