import { useState } from 'react';
import { motion } from 'framer-motion';

// Social links with rotating text hover effect
const socials = [
  { label: 'GitHub', href: 'https://github.com/karamhittini' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/karamhittini' },
  { label: 'Instagram', href: 'https://instagram.com/karamhittini' },
];

const footerNavLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Stack', href: '#tech' },
  { label: 'Contact', href: '#contact' },
];

function SocialLink({ label, href }: { label: string; href: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        overflow: 'hidden',
        height: '1.1em',
        fontSize: '0.8rem',
        fontWeight: 500,
        letterSpacing: '0.05em',
        color: hovered ? 'var(--text-primary)' : 'var(--text-muted)',
        transition: 'color 0.2s ease',
        cursor: 'inherit',
        lineHeight: 1.1,
      }}
    >
      <motion.span
        animate={{ y: hovered ? '-100%' : '0%' }}
        transition={{ duration: 0.25, ease: [0.76, 0, 0.24, 1] }}
        style={{ display: 'block' }}
      >
        {label}
      </motion.span>
      <motion.span
        animate={{ y: hovered ? '-100%' : '0%' }}
        transition={{ duration: 0.25, ease: [0.76, 0, 0.24, 1] }}
        style={{ display: 'block', color: 'var(--accent)' }}
      >
        {label}
      </motion.span>
    </a>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      style={{
        borderTop: '1px solid var(--border-subtle)',
        padding: '4rem 6rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '2rem',
      }}
    >
      {/* Left: copyright + section nav */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
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
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            © {year} — All rights reserved
          </p>
        </div>

        {/* Section nav links */}
        <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'center', flexWrap: 'wrap' }}>
          {footerNavLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              style={{
                fontSize: '0.78rem',
                color: 'var(--text-muted)',
                transition: 'color 0.2s ease',
                cursor: 'inherit',
                display: 'flex',
                alignItems: 'center',
                gap: '1.2rem',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              {i > 0 && (
                <span style={{ color: 'var(--border-subtle)', marginRight: '-0.6rem', pointerEvents: 'none' }}>
                  |
                </span>
              )}
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* Right: social links (text only, separator lines, rotating hover) */}
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        {socials.map((s, i) => (
          <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            {i > 0 && (
              <span style={{ color: 'var(--border-subtle)', fontSize: '0.8rem', userSelect: 'none' }}>
                |
              </span>
            )}
            <SocialLink label={s.label} href={s.href} />
          </div>
        ))}
      </div>
    </motion.footer>
  );
}
