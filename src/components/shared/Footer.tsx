import { useState } from "react";
import { motion } from "framer-motion";

// Social links
const socials = [
  { label: "Github", href: "https://github.com/karamhittini" },
  { label: "LinkedIn", href: "https://linkedin.com/in/karamhittini" },
  { label: "Instagram", href: "https://instagram.com/karam.hittini" },
];

const footerNavLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Stack", href: "#tech" },
  { label: "Contact", href: "#contact" },
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
        display: "inline-flex",
        alignItems: "center",
        gap: "0.25rem",
        position: "relative",
        fontSize: "0.85rem",
        fontWeight: 500,
        letterSpacing: "0.04em",
        color: hovered ? "#ffffff" : "var(--text-secondary)",
        transition: "color 0.2s ease",
        cursor: "inherit",
        paddingBottom: "2px",
        overflow: "hidden",
      }}
    >
      {/* Label text */}
      <span>{label}</span>

      {/* Arrow: hidden by default, animates in from bottom-left → top-right on hover */}
      <motion.span
        initial={false}
        animate={
          hovered ? { x: 0, y: 0, opacity: 1 } : { x: -6, y: 6, opacity: 0 }
        }
        transition={{ duration: 0.25, ease: [0.76, 0, 0.24, 1] }}
        style={{
          display: "inline-block",
          fontSize: "0.75rem",
          lineHeight: 1,
        }}
      >
        ↗
      </motion.span>

      {/* Underline that animates left → right */}
      <motion.span
        initial={false}
        animate={{ scaleX: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: "1px",
          width: "100%",
          background: "linear-gradient(90deg, var(--accent), #C084FC)",
          transformOrigin: "left center",
          display: "block",
        }}
      />
    </a>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      style={{
        borderTop: "1px solid var(--border-subtle)",
        padding: "5rem 4rem",
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        alignItems: "start",
        gap: "3rem",
        backgroundColor: "#050505",
      }}
    >
      {/* Left: copyright + section nav */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.2rem",
          justifySelf: "center",
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "1.1rem",
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
            }}
          >
            Karam Hittini<span style={{ color: "var(--accent)" }}>.</span>
          </p>
          <p
            style={{
              fontSize: "0.75rem",
              color: "var(--text-muted)",
              marginTop: "0.25rem",
            }}
          >
            © {year} — All rights reserved
          </p>
        </div>

        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          {footerNavLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              style={{
                fontSize: "0.78rem",
                color: "var(--text-muted)",
                transition: "color 0.2s ease",
                cursor: "inherit",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--text-primary)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--text-muted)")
              }
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* Center dot */}
      <div
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "var(--accent)",
          marginTop: "0.6rem",
          opacity: 0.5,
        }}
      />

      {/* Right: social links — stacked vertically */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.85rem",
          justifySelf: "center",
        }}
      >
        {socials.map((s) => (
          <SocialLink key={s.label} label={s.label} href={s.href} />
        ))}
      </div>
    </motion.footer>
  );
}
