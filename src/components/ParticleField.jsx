import { useEffect, useRef } from 'react';

// Cores da logo: azul (teoria, à esquerda) e dourado (impacto, à direita).
const THEORY = [94, 200, 238];
const IMPACT = [242, 183, 25];
const LINK_DISTANCE_SQ = 95 * 95;
const POINTER_RADIUS = 130;

function mix(t, alpha) {
  const [r, g, b] = THEORY.map((v, k) => Math.round(v + (IMPACT[k] - v) * t));
  return `rgba(${r},${g},${b},${alpha})`;
}

function smoothstep(edge0, edge1, x) {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

// Campo de "pixels" inspirado na logo: quadrados vazados e azuis à esquerda
// (teoria) atravessam a tela e chegam preenchidos e dourados (impacto).
// Pausa fora da tela, em aba oculta e respeita prefers-reduced-motion.
export default function ParticleField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    const pointer = { x: -9999, y: -9999 };
    let width = 0;
    let height = 0;
    let particles = [];
    let frame = 0;
    let inView = true;

    function spawn(x) {
      return {
        x,
        y: Math.random() * height,
        size: 2 + Math.random() * 4.5,
        speed: 0.12 + Math.random() * 0.42,
        phase: Math.random() * Math.PI * 2,
        vx: 0,
        vy: 0,
      };
    }

    function resize() {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(
        Math.min(120, Math.max(34, (width * height) / 13000)),
      );
      particles = Array.from({ length: count }, () =>
        spawn(Math.random() * width),
      );
      draw();
    }

    function step() {
      for (const p of particles) {
        p.phase += 0.012;
        p.x += p.speed + p.vx;
        p.y += Math.sin(p.phase) * 0.22 + p.vy;
        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const distSq = dx * dx + dy * dy;
        if (distSq < POINTER_RADIUS * POINTER_RADIUS) {
          const dist = Math.sqrt(distSq) || 1;
          const force = ((POINTER_RADIUS - dist) / POINTER_RADIUS) * 0.55;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }
        p.vx *= 0.92;
        p.vy *= 0.92;
        if (p.x > width + 12) Object.assign(p, spawn(-12));
        if (p.y < -12) p.y = height + 12;
        if (p.y > height + 12) p.y = -12;
      }
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i += 1) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j += 1) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < LINK_DISTANCE_SQ) {
            const t = Math.min(1, Math.max(0, (a.x + b.x) / 2 / width));
            ctx.strokeStyle = mix(t, (1 - distSq / LINK_DISTANCE_SQ) * 0.16);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      for (const p of particles) {
        const t = Math.min(1, Math.max(0, p.x / width));
        const filled = smoothstep(0.38, 0.72, t);
        const half = p.size / 2;
        if (filled < 1) {
          ctx.strokeStyle = mix(t, 0.6 * (1 - filled));
          ctx.strokeRect(p.x - half, p.y - half, p.size, p.size);
        }
        if (filled > 0) {
          ctx.fillStyle = mix(t, 0.8 * filled);
          ctx.fillRect(p.x - half, p.y - half, p.size, p.size);
        }
      }
    }

    function loop() {
      step();
      draw();
      frame = window.requestAnimationFrame(loop);
    }

    function start() {
      if (reducedMotion || frame || !inView || document.hidden) return;
      frame = window.requestAnimationFrame(loop);
    }

    function stop() {
      window.cancelAnimationFrame(frame);
      frame = 0;
    }

    function handlePointerMove(event) {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    }

    function handlePointerLeave() {
      pointer.x = -9999;
      pointer.y = -9999;
    }

    function handleVisibility() {
      if (document.hidden) stop();
      else start();
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    const viewObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) start();
      else stop();
    });
    viewObserver.observe(canvas);
    window.addEventListener('pointermove', handlePointerMove, {
      passive: true,
    });
    document.addEventListener('pointerleave', handlePointerLeave);
    document.addEventListener('visibilitychange', handleVisibility);
    resize();
    start();

    return () => {
      stop();
      resizeObserver.disconnect();
      viewObserver.disconnect();
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerleave', handlePointerLeave);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <canvas className="particle-field" ref={canvasRef} aria-hidden="true" />
  );
}
