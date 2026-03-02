import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

// Shuffle text animation hook
function useShuffleText(text: string, trigger: boolean) {
  const [displayed, setDisplayed] = useState(text);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

  useEffect(() => {
    if (!trigger) return;
    let frame = 0;
    const totalFrames = 24;
    const interval = setInterval(() => {
      frame++;
      setDisplayed(
        text
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' ';
            if (i < (frame / totalFrames) * text.length) return char;
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );
      if (frame >= totalFrames) clearInterval(interval);
    }, 35);
    return () => clearInterval(interval);
  }, [trigger, text]);

  return displayed;
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const quoteInView = useInView(quoteRef, { once: true, margin: '-100px' });
  const shuffledQuote = useShuffleText('"If it works don\'t touch it"', quoteInView);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section"
      style={{ paddingTop: '10rem', paddingBottom: '10rem' }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Label */}
        <motion.p
          className="section-label"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          About
        </motion.p>

        {/* Heading */}
        <motion.h2
          className="display-lg"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{ marginBottom: '2.5rem', color: 'var(--text-primary)' }}
        >
          Building things that
          <br />
          <span style={{ color: 'var(--accent)' }}>matter</span>
          <span style={{ color: 'var(--text-muted)' }}>.</span>
        </motion.h2>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            fontSize: '1.05rem',
            lineHeight: 1.85,
            color: 'var(--text-secondary)',
            maxWidth: '600px',
            marginBottom: '3rem',
          }}
        >
          I'm a software engineer passionate about crafting immersive digital experiences —
          from AI-powered platforms that detect emotion in real time, to Unreal Engine games
          that blur the line between story and fear. I care deeply about clean architecture,
          thoughtful UI, and systems that perform beautifully under pressure.
          <br /><br />
          When I'm not shipping features, you'll find me exploring game design theory,
          experimenting with generative AI, or overthinking whether that animation curve
          should be 0.76 or 0.78.
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
          style={{
            height: '1px',
            background: 'var(--border-subtle)',
            transformOrigin: 'left',
            marginBottom: '3rem',
          }}
        />

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <p
            ref={quoteRef}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
              fontWeight: 600,
              color: 'var(--accent)',
              letterSpacing: '-0.02em',
              fontVariantNumeric: 'tabular-nums',
              minHeight: '1.2em',
            }}
          >
            {shuffledQuote}
          </p>
          <p
            style={{
              marginTop: '0.75rem',
              fontSize: '0.78rem',
              color: 'var(--text-muted)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            — Engineering Principle
          </p>
        </motion.div>
      </div>
    </section>
  );
}
