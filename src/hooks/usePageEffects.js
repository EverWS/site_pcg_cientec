import { useEffect } from 'react';

// Efeitos de página que só mexem em classes e variáveis CSS (sem estado React,
// sem re-render): revelação ao rolar, seção ativa, barra de progresso,
// trajetória acesa conforme a rolagem, holofote nos cartões, inclinação 3D,
// botões magnéticos e paralaxe do hero. Tudo é compatível com a CSP, pois
// usa a API CSSOM (style.setProperty), e não atributos style inline no HTML.
export default function usePageEffects(onSectionChange) {
  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    const finePointer = window.matchMedia(
      '(hover: hover) and (pointer: fine)',
    ).matches;
    const header = document.querySelector('.site-header');
    const hero = document.querySelector('.hero');
    const journey = document.getElementById('trajetoria');
    const journeyTrack = journey?.querySelector('.journey-track');
    const journeySteps = journey
      ? [...journey.querySelectorAll('.journey-step')]
      : [];

    // Revelação ao entrar na tela.
    const revealObserver = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );
    document
      .querySelectorAll('.reveal')
      .forEach((element) => revealObserver.observe(element));

    // Seção ativa no menu.
    const sectionObserver = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (entry) => entry.isIntersecting && onSectionChange(entry.target.id),
        ),
      { rootMargin: '-35% 0px -60% 0px', threshold: 0 },
    );
    document
      .querySelectorAll('main section[id]')
      .forEach((section) => sectionObserver.observe(section));

    // Rolagem: barra de progresso, cabeçalho compacto e trajetória.
    let scrollFrame = 0;
    function updateScroll() {
      scrollFrame = 0;
      const max = root.scrollHeight - window.innerHeight;
      root.style.setProperty(
        '--scroll',
        max > 0 ? (window.scrollY / max).toFixed(4) : '0',
      );
      header?.classList.toggle('is-scrolled', window.scrollY > 24);

      if (journeyTrack) {
        const rect = journeyTrack.getBoundingClientRect();
        const span = Math.max(rect.height, window.innerHeight * 0.45);
        const progress = Math.min(
          1,
          Math.max(0, (window.innerHeight * 0.78 - rect.top) / span),
        );
        journey.style.setProperty('--journey', progress.toFixed(3));
        const last = journeySteps.length - 1;
        journeySteps.forEach((step, index) =>
          step.classList.toggle('is-lit', progress >= index / last - 0.001),
        );
      }
    }
    function requestScrollUpdate() {
      if (!scrollFrame)
        scrollFrame = window.requestAnimationFrame(updateScroll);
    }
    updateScroll();
    window.addEventListener('scroll', requestScrollUpdate, { passive: true });
    window.addEventListener('resize', requestScrollUpdate);

    // Ponteiro: holofote, inclinação, magnetismo e paralaxe.
    let pointerFrame = 0;
    let lastEvent = null;
    let magnetTarget = null;
    function updatePointer() {
      pointerFrame = 0;
      const event = lastEvent;
      if (!event) return;
      const target = event.target instanceof Element ? event.target : null;

      const spotlight = target?.closest('.spotlight');
      if (spotlight) {
        const rect = spotlight.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        spotlight.style.setProperty('--mx', `${x}px`);
        spotlight.style.setProperty('--my', `${y}px`);
        if (spotlight.classList.contains('tilt') && !reducedMotion) {
          spotlight.style.setProperty(
            '--ry',
            `${((x / rect.width - 0.5) * 7).toFixed(2)}deg`,
          );
          spotlight.style.setProperty(
            '--rx',
            `${((0.5 - y / rect.height) * 7).toFixed(2)}deg`,
          );
        }
      }

      if (reducedMotion) return;

      const magnet = target?.closest('.magnetic');
      if (magnetTarget && magnetTarget !== magnet) {
        magnetTarget.style.setProperty('--tx', '0px');
        magnetTarget.style.setProperty('--ty', '0px');
      }
      magnetTarget = magnet;
      if (magnet) {
        const rect = magnet.getBoundingClientRect();
        const dx = event.clientX - (rect.left + rect.width / 2);
        const dy = event.clientY - (rect.top + rect.height / 2);
        magnet.style.setProperty('--tx', `${(dx * 0.22).toFixed(1)}px`);
        magnet.style.setProperty('--ty', `${(dy * 0.3).toFixed(1)}px`);
      }

      if (hero) {
        const rect = hero.getBoundingClientRect();
        if (event.clientY < rect.bottom) {
          hero.style.setProperty(
            '--px',
            ((event.clientX / window.innerWidth - 0.5) * 2).toFixed(3),
          );
          hero.style.setProperty(
            '--py',
            (((event.clientY - rect.top) / rect.height - 0.5) * 2).toFixed(3),
          );
        }
      }
    }
    function handlePointerMove(event) {
      lastEvent = event;
      if (!pointerFrame)
        pointerFrame = window.requestAnimationFrame(updatePointer);
    }
    function handlePointerOut(event) {
      const card =
        event.target instanceof Element ? event.target.closest('.tilt') : null;
      if (card && !card.contains(event.relatedTarget)) {
        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--ry', '0deg');
      }
    }
    if (finePointer) {
      document.addEventListener('pointermove', handlePointerMove, {
        passive: true,
      });
      document.addEventListener('pointerout', handlePointerOut);
    }

    return () => {
      revealObserver.disconnect();
      sectionObserver.disconnect();
      window.cancelAnimationFrame(scrollFrame);
      window.cancelAnimationFrame(pointerFrame);
      window.removeEventListener('scroll', requestScrollUpdate);
      window.removeEventListener('resize', requestScrollUpdate);
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerout', handlePointerOut);
    };
  }, [onSectionChange]);
}
