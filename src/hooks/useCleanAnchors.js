import { useEffect } from 'react';

// Links internos (#sobre, #programacao…) rolam até a seção sem gravar o "#"
// na barra de endereço. Se a página abrir já com um "#", rola até a seção e
// limpa o endereço. O foco vai para a seção, para teclado e leitores de tela.
export default function useCleanAnchors() {
  useEffect(() => {
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    function goTo(id, smooth) {
      const target = document.getElementById(id);
      if (!target) return false;
      target.scrollIntoView({
        behavior: smooth && !reducedMotion ? 'smooth' : 'instant',
        block: 'start',
      });
      if (!target.hasAttribute('tabindex'))
        target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
      return true;
    }

    function handleClick(event) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }
      const link = event.target.closest?.('a[href^="#"]');
      if (!link) return;
      const id = decodeURIComponent(link.getAttribute('href').slice(1));
      if (id && goTo(id, true)) event.preventDefault();
    }

    if (window.location.hash) {
      const id = decodeURIComponent(window.location.hash.slice(1));
      const { pathname, search } = window.location;
      window.history.replaceState(null, '', pathname + search);
      goTo(id, false);
    }

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);
}
