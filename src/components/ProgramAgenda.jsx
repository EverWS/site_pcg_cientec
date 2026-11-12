import { useEffect, useState } from 'react';
import { EVENT_DAY, programFilters, programTypes } from '../content.js';

function toMinutes(hhmm) {
  const [hours, minutes] = hhmm.split(':').map(Number);
  return hours * 60 + minutes;
}

// Id da atividade em andamento, só no dia do evento e no horário de Brasília.
function findLiveActivity(items) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Sao_Paulo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date());
  const get = (type) => parts.find((part) => part.type === type)?.value;
  if (`${get('year')}-${get('month')}-${get('day')}` !== EVENT_DAY) return null;
  const now = Number(get('hour')) * 60 + Number(get('minute'));
  const live = items.find((item) => {
    const start = toMinutes(item.start);
    const end = item.end ? toMinutes(item.end) : start + 60;
    return now >= start && now < end;
  });
  return live?.id ?? null;
}

function matchesFilter(item, filter) {
  if (filter.withRegistration) return Boolean(item.url);
  if (filter.types) return filter.types.includes(item.type);
  return true;
}

// Agenda do dia com filtros. Atividades com `url` ganham o link de inscrição
// individual na plataforma da UFSC (abre em nova aba).
export default function ProgramAgenda({ items }) {
  const [filterId, setFilterId] = useState('todas');
  const [liveId, setLiveId] = useState(() => findLiveActivity(items));

  useEffect(() => {
    const timer = window.setInterval(
      () => setLiveId(findLiveActivity(items)),
      30000,
    );
    return () => window.clearInterval(timer);
  }, [items]);

  const activeFilter =
    programFilters.find((filter) => filter.id === filterId) ??
    programFilters[0];
  const visible = items.filter((item) => matchesFilter(item, activeFilter));

  return (
    <div className="agenda">
      <div
        className="agenda-filters"
        role="group"
        aria-label="Filtrar a programação"
      >
        {programFilters.map((filter) => (
          <button
            type="button"
            className="chip"
            aria-pressed={filter.id === filterId}
            onClick={() => setFilterId(filter.id)}
            key={filter.id}
          >
            {filter.label}
            <span className="chip-count">
              {items.filter((item) => matchesFilter(item, filter)).length}
            </span>
          </button>
        ))}
      </div>

      <ol className="agenda-list" key={filterId} aria-live="polite">
        {visible.map((item, index) => {
          const isLive = item.id === liveId;
          return (
            <li
              className={`agenda-item type-${item.type}${item.url ? ' has-registration' : ''}${isLive ? ' is-live' : ''}`}
              style={{ '--i': index }}
              key={item.id}
            >
              <div className="agenda-time">
                <time dateTime={`${EVENT_DAY}T${item.start}`}>
                  {item.start}
                </time>
                {item.end && <span>até {item.end}</span>}
              </div>
              <span className="agenda-dot" aria-hidden="true" />
              <div className="agenda-body">
                <span className="agenda-tag">
                  {programTypes[item.type]}
                  {isLive && (
                    <strong className="live-badge">Acontecendo agora</strong>
                  )}
                </span>
                <h3>{item.title}</h3>
                {item.detail && <p>{item.detail}</p>}
              </div>
              {item.url ? (
                <a
                  className="agenda-link"
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Inscrever-se <span aria-hidden="true">↗</span>
                  <span className="sr-only">
                    {' '}
                    em {item.title}
                    {item.detail ? `, ${item.detail}` : ''} (abre em nova aba)
                  </span>
                </a>
              ) : (
                item.type !== 'org' && (
                  <span className="agenda-open">Sem inscrição</span>
                )
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
