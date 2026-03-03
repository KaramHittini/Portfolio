import { useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, useMotionValue } from 'framer-motion';

const TEXT = 'FRONT-END ENGINEER  ✦  SOFTWARE ENGINEER  ✦  KARAM HITTINI  ✦  AMMAN, JORDAN  ✦  ';
const REPEAT = 4;

function VelocityText({ baseVelocity = 2 }: { baseVelocity?: number }) {
  const x = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useSpring(scrollY, { stiffness: 100, damping: 30 });
  const textRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const dirMultiplier = baseVelocity < 0 ? -1 : 1;

  const velocityFactor = useTransform(scrollVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  useEffect(() => {
    let currentX = 0;

    const animate = () => {
      const el = textRef.current;
      if (!el) { rafRef.current = requestAnimationFrame(animate); return; }

      const segmentWidth = el.scrollWidth / REPEAT;
      const speed = baseVelocity + dirMultiplier * Math.abs(velocityFactor.get()) * 0.8;
      currentX -= speed;

      if (Math.abs(currentX) >= segmentWidth) {
        currentX += segmentWidth;
      }

      x.set(currentX);
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [baseVelocity, dirMultiplier, velocityFactor, x]);

  const repeated = Array.from({ length: REPEAT }, (_, i) => (
    <span key={i} style={{ paddingRight: '2rem' }}>{TEXT}</span>
  ));

  return (
    <div style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
      <motion.div
        ref={textRef}
        style={{ x, display: 'inline-flex' }}
      >
        {repeated}
        {repeated}
      </motion.div>
    </div>
  );
}

export default function ScrollVelocityTicker() {
  return (
    <div
      style={{
        background: '#2a2a2a',
        color: '#f0f0f0',
        padding: '0.9rem 0',
        overflow: 'hidden',
        fontFamily: 'var(--font-display)',
        fontSize: '0.75rem',
        fontWeight: 600,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        borderTop: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <VelocityText baseVelocity={1.5} />
    </div>
  );
}
