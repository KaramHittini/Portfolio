import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram } from 'lucide-react';

const socials = [
  {
    label: 'GitHub',
    href: 'https://github.com/karamhittini',
    Icon: Github,
    glow: '#8929FF',
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/karamhittini',
    Icon: Linkedin,
    glow: '#8929FF',
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/karamhittini',
    Icon: Instagram,
    glow: '#8929FF',
  },
];

export default function SocialSidebar() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2.5, duration: 0.6, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        bottom: '2rem',
        left: '2rem',
        zIndex: 9990,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
      }}
    >
      {socials.map((s) => (
        <motion.a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label}
          whileHover={{ scale: 1.15 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 42,
            height: 42,
            borderRadius: '12px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            color: 'var(--text-muted)',
            cursor: 'inherit',
            transition: 'color 0.2s ease, box-shadow 0.25s ease, border-color 0.25s ease, background 0.25s ease',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.color = '#C084FC';
            el.style.borderColor = 'rgba(137,41,255,0.5)';
            el.style.boxShadow = '0 0 20px rgba(137,41,255,0.5), 0 0 40px rgba(137,41,255,0.2)';
            el.style.background = 'rgba(137,41,255,0.1)';
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.color = 'var(--text-muted)';
            el.style.borderColor = 'rgba(255,255,255,0.08)';
            el.style.boxShadow = 'none';
            el.style.background = 'rgba(255,255,255,0.04)';
          }}
        >
          <s.Icon size={18} />
        </motion.a>
      ))}

      {/* Vertical line below icons */}
      <div
        style={{
          width: 1,
          height: 60,
          background: 'linear-gradient(to bottom, var(--text-muted), transparent)',
          margin: '0.25rem auto 0',
        }}
      />
    </motion.div>
  );
}
