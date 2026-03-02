import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SquaresBackground from './AntigravityBackground';
import SquareWipe from './SquareWipe';
import ParticleRain from './ParticleRain';

type Stage = 'intro' | 'wipe' | 'done';

export default function HeroSection() {
  const [stage, setStage] = useState<Stage>('intro');

  useEffect(() => {
    // Reduced from 2500ms to 1500ms
    const timer = setTimeout(() => setStage('wipe'), 1500);
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
              background: '#1a1a1a',
              zIndex: 50,
              overflow: 'hidden',
            }}
          >
            <SquaresBackground direction="diagonal" speed={0.5} />

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
                    className="display-xl"
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontWeight: 700,
                      color: '#ffffff',
                      // No glow effect
                      textShadow: 'none',
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

      {/* After wipe: particle rain fills screen */}
      <AnimatePresence>
        {stage === 'done' && <ParticleRain />}
      </AnimatePresence>

      {/* Spacer so page content starts after hero */}
      {stage !== 'done' && <div style={{ height: '100vh' }} />}
    </>
  );
}
