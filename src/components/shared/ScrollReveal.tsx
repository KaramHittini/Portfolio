import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface ScrollRevealProps {
  children: string;
  className?: string;
  delay?: number;
}

// Splits text into words, each word animates in on scroll with blur
export default function ScrollReveal({ children, className = '', delay = 0 }: ScrollRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const words = children.split(' ');

  return (
    <span ref={ref} className={className} style={{ display: 'inline' }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0.08, filter: 'blur(6px)', y: 14 }}
          animate={
            inView
              ? { opacity: 1, filter: 'blur(0px)', y: 0 }
              : { opacity: 0.08, filter: 'blur(6px)', y: 14 }
          }
          transition={{
            duration: 0.55,
            delay: delay + i * 0.04,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          style={{ display: 'inline-block', marginRight: '0.28em' }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}
