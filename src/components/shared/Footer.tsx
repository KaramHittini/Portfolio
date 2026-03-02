import { motion } from 'framer-motion';
import SocialLinks from './SocialLinks';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      style={{
        borderTop: '1px solid var(--border-subtle)',
        padding: '2.5rem 6rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.5rem',
      }}
    >
      <div>
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '1.1rem',
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em',
          }}
        >
          Karam Hittini<span style={{ color: 'var(--accent)' }}>.</span>
        </p>
        <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
          © {year} — All rights reserved
        </p>
      </div>

      <SocialLinks />

      <p
        style={{
          fontSize: '0.75rem',
          color: 'var(--text-muted)',
          letterSpacing: '0.05em',
        }}
      >
        Built with React & Framer Motion
      </p>
    </motion.footer>
  );
}
