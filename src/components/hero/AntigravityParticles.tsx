import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
  size: number;
  opacity: number;
  rgb: string;
}

const COLORS = [
  '137, 41, 255',
  '192, 132, 252',
  '110, 0, 207',
  '200, 160, 255',
  '240, 240, 255',
];

export default function AntigravityParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    const init = () => {
      const count = Math.floor((canvas.width * canvas.height) / 9000);
      particlesRef.current = Array.from({ length: count }, () => {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        return {
          x,
          y,
          vx: (Math.random() - 0.5) * 0.4,
          vy: -(Math.random() * 0.6 + 0.15), // drift upward
          baseX: x,
          baseY: y,
          size: Math.random() * 2.5 + 0.5,
          opacity: Math.random() * 0.55 + 0.2,
          rgb: COLORS[Math.floor(Math.random() * COLORS.length)],
        };
      });
    };

    const REPEL_RADIUS = 120;
    const REPEL_STRENGTH = 4.5;
    const DAMPING = 0.94;
    const GRAVITY_BACK = 0.02;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      particlesRef.current.forEach((p) => {
        // Cursor repel
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < REPEL_RADIUS && dist > 0) {
          const force = (REPEL_RADIUS - dist) / REPEL_RADIUS;
          p.vx += (dx / dist) * force * REPEL_STRENGTH;
          p.vy += (dy / dist) * force * REPEL_STRENGTH;
        }

        // Drift upward + damping
        p.vy -= 0.012; // continuous upward float
        p.vx *= DAMPING;
        p.vy *= DAMPING;

        p.x += p.vx;
        p.y += p.vy;

        // Gentle pull back toward base X (horizontal centering)
        p.vx += (p.baseX - p.x) * GRAVITY_BACK * 0.15;

        // Wrap top/bottom
        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.baseY = p.y;
          p.baseX = Math.random() * canvas.width;
          p.x = p.baseX;
        }
        if (p.y > canvas.height + 10) {
          p.y = -10;
          p.baseY = p.y;
        }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;

        // Draw
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.rgb}, ${p.opacity})`;
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', resize);
    resize();
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#0d0d0d',
      }}
    />
  );
}
