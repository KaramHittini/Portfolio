import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram, Mail } from 'lucide-react';

const socials = [
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/karamhittini',
    icon: Linkedin,
    color: '#0a66c2',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/karamhittini',
    icon: Github,
    color: '#e6edf3',
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/karamhittini',
    icon: Instagram,
    color: '#e1306c',
  },
  {
    label: 'Email',
    href: 'mailto:karam@example.com',
    icon: Mail,
    color: 'var(--accent)',
  },
];

export default function SocialLinks({ vertical = false }: { vertical?: boolean }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: vertical ? 'column' : 'row',
        gap: '1rem',
        alignItems: 'center',
      }}
    >
      {socials.map((s, i) => {
        const Icon = s.icon;
        return (
          <motion.a
            key={s.label}
            href={s.href}
            target={s.href.startsWith('mailto') ? undefined : '_blank'}
            rel="noopener noreferrer"
            aria-label={s.label}
            data-cursor-hover
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 4.5 + i * 0.08, duration: 0.4 }}
            whileHover={{ scale: 1.15 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
              borderRadius: '10px',
              background: 'var(--bg-glass)',
              border: '1px solid var(--border-subtle)',
              backdropFilter: 'blur(10px)',
              color: 'var(--text-muted)',
              transition: 'color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.color = s.color;
              el.style.borderColor = `${s.color}40`;
              el.style.boxShadow = `0 0 20px ${s.color}30`;
              el.style.background = `${s.color}10`;
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.color = 'var(--text-muted)';
              el.style.borderColor = 'var(--border-subtle)';
              el.style.boxShadow = 'none';
              el.style.background = 'var(--bg-glass)';
            }}
          >
            <Icon size={17} />
          </motion.a>
        );
      })}
    </div>
  );
}
