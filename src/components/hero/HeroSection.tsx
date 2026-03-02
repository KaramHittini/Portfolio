import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AntigravityBackground from './AntigravityBackground';
import SquareWipe from './SquareWipe';

type Stage = 'intro' | 'wipe' | 'done';

export default function HeroSection() {
  const [stage, setStage] = useState<Stage>('intro');

  useEffect(() => {
    // Start the wipe after 2.5s (name has faded in, been visible for a moment)
    const timer = setTimeout(() => setStage('wipe'), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Full-screen hero — shown during intro + wipe */}
      <AnimatePresence>
        {stage !== 'done' && (
          <motion.section
            exit={{ opacity: 1 }}
            style={{
              position: 'fixed',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#080808',
              zIndex: 50,
              overflow: 'hidden',
            }}
          >
            <AntigravityBackground />

            {/* Hero name */}
            <AnimatePresence>
              {stage === 'intro' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
                  style={{
                    position: 'relative',
                    zIndex: 10,
                    textAlign: 'center',
                    userSelect: 'none',
                  }}
                >
                  <h1
                    className="display-xl glow-text"
                    style={{
                      background: 'linear-gradient(135deg, #f0f0f0 0%, #a0a0a0 50%, #f0f0f0 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    Karam Hittini
                  </h1>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Square Wipe */}
            {stage === 'wipe' && (
              <SquareWipe onComplete={() => setStage('done')} />
            )}
          </motion.section>
        )}
      </AnimatePresence>

      {/* After wipe: name + title appear top-left within main flow */}
      <AnimatePresence>
        {stage === 'done' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            style={{
              position: 'fixed',
              top: '2rem',
              left: '2.5rem',
              zIndex: 99,
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '1.1rem',
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
                lineHeight: 1.2,
              }}
            >
              Karam Hittini
            </p>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 400,
                fontSize: '0.72rem',
                color: 'var(--text-secondary)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginTop: '0.15rem',
              }}
            >
              Software Engineer
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer so page content starts after hero */}
      {stage !== 'done' && <div style={{ height: '100vh' }} />}
    </>
  );
}
