import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Stack', href: '#tech' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Lock scroll while menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    setTimeout(() => {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }, 400);
  };

  const toggleMenu = () => setMenuOpen((o) => !o);

  return (
    <>
      {/* Hamburger Button — fixed top-right */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 0.6 }}
        onClick={toggleMenu}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label="Toggle navigation"
        style={{
          position: 'fixed',
          top: '2rem',
          right: '2.5rem',
          zIndex: 200,
          background: 'transparent',
          border: 'none',
          cursor: 'inherit',
          width: 36,
          height: 28,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          padding: 0,
        }}
      >
        {/* Top line */}
        <motion.span
          animate={
            menuOpen
              ? { rotate: 45, y: 12, width: '100%' }
              : hovered
              ? { rotate: 0, y: 0, width: '100%' }
              : { rotate: 0, y: 0, width: '100%' }
          }
          transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
          style={{
            display: 'block',
            height: 2,
            width: '100%',
            borderRadius: 2,
            background: 'var(--text-primary)',
            transformOrigin: 'center',
          }}
        />
        {/* Middle line */}
        <motion.span
          animate={
            menuOpen
              ? { opacity: 0, x: -20 }
              : hovered
              ? { x: -12, opacity: 1 }
              : { x: 0, opacity: 1 }
          }
          transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
          style={{
            display: 'block',
            height: 2,
            width: '70%',
            borderRadius: 2,
            background: 'var(--accent)',
          }}
        />
        {/* Bottom line */}
        <motion.span
          animate={
            menuOpen
              ? { rotate: -45, y: -12, width: '100%' }
              : hovered
              ? { rotate: 0, y: 0, width: '100%' }
              : { rotate: 0, y: 0, width: '85%' }
          }
          transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
          style={{
            display: 'block',
            height: 2,
            width: '85%',
            borderRadius: 2,
            background: 'var(--text-primary)',
            transformOrigin: 'center',
          }}
        />
      </motion.button>

      {/* Full-screen overlay menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: 'inset(0% 0% 100% 100%)', opacity: 0 }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
            exit={{ clipPath: 'inset(0% 0% 100% 100%)', opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 150,
              background: 'rgba(28, 28, 36, 0.97)',
              backdropFilter: 'blur(20px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'center',
              paddingLeft: '8rem',
              paddingBottom: '4rem',
            }}
          >
            <nav>
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.07, ease: [0.76, 0, 0.24, 1] }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => handleNav(e, link.href)}
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      letterSpacing: '-0.03em',
                      lineHeight: 1.1,
                      marginBottom: '0.4rem',
                      transition: 'color 0.2s ease',
                      textAlign: 'left',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                  >
                    {link.label}
                  </a>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
