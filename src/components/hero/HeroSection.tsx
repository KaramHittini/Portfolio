import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AntigravityParticles from './AntigravityParticles';
import SquareWipe from './SquareWipe';
import ParticleRain from './ParticleRain';

type Stage = 'intro' | 'wipe' | 'done';

export default function HeroSection() {
  const [stage, setStage] = useState<Stage>('intro');

  // Progress the animation stages
  useEffect(() => {
    const timer = setTimeout(() => setStage('wipe'), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Disable scrolling during intro/wipe animation
  useEffect(() => {
    if (stage !== 'done') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [stage]);

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
              background: '#0d0d0d',
              zIndex: 50,
              overflow: 'hidden',
            }}
          >
            {/* Antigravity particle effect during intro */}
            <AntigravityParticles />

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
