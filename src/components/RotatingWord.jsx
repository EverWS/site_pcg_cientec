import { useEffect, useState } from 'react';

// Alterna palavras com animação de entrada. Com prefers-reduced-motion,
// fica parada na última palavra. É decorativo: o texto acessível fica no pai.
export default function RotatingWord({ words, interval = 2400 }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIndex(words.length - 1);
      return undefined;
    }
    const timer = window.setInterval(
      () => setIndex((current) => (current + 1) % words.length),
      interval,
    );
    return () => window.clearInterval(timer);
  }, [words, interval]);

  return (
    <span className="rotating-word" aria-hidden="true">
      <span className="rotating-word-inner" key={words[index]}>
        {words[index]}
      </span>
    </span>
  );
}
