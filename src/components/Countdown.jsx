import { useEffect, useState } from 'react';

function getTimeLeft(target) {
  const difference = new Date(target).getTime() - Date.now();
  if (difference <= 0) return null;
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

// Contador com estado próprio: só ele re-renderiza a cada segundo, não a
// página inteira. Cada dígito que muda entra com uma animação curta.
export default function Countdown({ target, label }) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(target));

  useEffect(() => {
    const timer = window.setInterval(
      () => setTimeLeft(getTimeLeft(target)),
      1000,
    );
    return () => window.clearInterval(timer);
  }, [target]);

  if (!timeLeft) {
    return (
      <div className="countdown is-live">
        <span className="eyebrow">{label}</span>
        <strong className="countdown-live">A mostra começou!</strong>
      </div>
    );
  }

  const items = [
    ['dias', timeLeft.days],
    ['horas', timeLeft.hours],
    ['min', timeLeft.minutes],
    ['seg', timeLeft.seconds],
  ];

  return (
    <div className="countdown">
      <span className="eyebrow">{label}</span>
      <p className="sr-only">Faltam {timeLeft.days} dias para a mostra.</p>
      <div className="countdown-values" aria-hidden="true">
        {items.map(([unit, value]) => (
          <div className="countdown-item" key={unit}>
            <span className="countdown-digit">
              <strong key={value}>{pad(value)}</strong>
            </span>
            <span className="countdown-unit">{unit}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
