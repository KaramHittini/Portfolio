import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Stack", href: "#tech" },
  { label: "Contact", href: "#contact" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4 },
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: { duration: 0.3 },
  },
};

export default function StaggeredNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  // Lock scroll while menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    setTimeout(() => {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }, 400);
  };

  return (
    <>
      {/* Hamburger Button — fixed top-right */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 0.6 }}
        onClick={() => setMenuOpen(!menuOpen)}
        onMouseEnter={() => setHovered("hamburger")}
        onMouseLeave={() => setHovered(null)}
        aria-label="Toggle navigation"
        style={{
          position: "fixed",
          top: "2rem",
          right: "2.5rem",
          zIndex: 200,
          background: "transparent",
          border: "none",
          cursor: "pointer",
          width: 36,
          height: 28,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "flex-end",
          padding: 0,
        }}
      >
        {/* Top line */}
        <motion.span
          animate={
            menuOpen
              ? { rotate: 45, y: 12, width: "100%" }
              : hovered === "hamburger"
                ? { rotate: 0, y: 0, width: "100%" }
                : { rotate: 0, y: 0, width: "100%" }
          }
          transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
          style={{
            display: "block",
            height: 2,
            width: "100%",
            borderRadius: 2,
            background: "var(--text-primary)",
            transformOrigin: "center",
          }}
        />
        {/* Middle line */}
        <motion.span
          animate={
            menuOpen
              ? { opacity: 0, x: -20 }
              : hovered === "hamburger"
                ? { x: -12, opacity: 1 }
                : { x: 0, opacity: 1 }
          }
          transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
          style={{
            display: "block",
            height: 2,
            width: "70%",
            borderRadius: 2,
            background: "var(--text-primary)",
          }}
        />
        {/* Bottom line */}
        <motion.span
          animate={
            menuOpen
              ? { rotate: -45, y: -12, width: "100%" }
              : hovered === "hamburger"
                ? { rotate: 0, y: 0, width: "100%" }
                : { rotate: 0, y: 0, width: "100%" }
          }
          transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
          style={{
            display: "block",
            height: 2,
            width: "100%",
            borderRadius: 2,
            background: "var(--text-primary)",
            transformOrigin: "center",
          }}
        />
      </motion.button>

      {/* Menu background overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setMenuOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0, 0, 0, 0.5)",
              backdropFilter: "blur(4px)",
              zIndex: 99,
            }}
          />
        )}
      </AnimatePresence>

      {/* Staggered Menu Panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ duration: 0.4 }}
            style={{
              position: "fixed",
              left: 0,
              top: 0,
              height: "100vh",
              width: "100%",
              maxWidth: "400px",
              backgroundColor: "#2a2a2a",
              zIndex: 100,
              display: "flex",
              flexDirection: "column",
              padding: "6rem 2rem 2rem 2rem",
              overflowY: "auto",
            }}
          >
            {/* Navigation links with stagger animation */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              {navLinks.map((link) => (
                <motion.div key={link.href} variants={itemVariants}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNav(e, link.href)}
                    onMouseEnter={() => setHovered(link.href)}
                    onMouseLeave={() => setHovered(null)}
                    style={{
                      display: "block",
                      fontSize: "clamp(1.8rem, 5vw, 2.5rem)",
                      fontWeight: 700,
                      fontFamily: "var(--font-serif)",
                      color:
                        hovered === link.href
                          ? "var(--accent)"
                          : "var(--text-primary)",
                      textDecoration: "none",
                      transition: "color 0.2s ease, text-shadow 0.2s ease",
                      textShadow:
                        hovered === link.href
                          ? `0 0 20px rgba(137, 41, 255, 0.3)`
                          : "none",
                      letterSpacing: "-0.02em",
                      lineHeight: 1.1,
                    }}
                  >
                    {link.label}
                  </a>
                </motion.div>
              ))}
            </motion.div>

            {/* Spacer */}
            <div style={{ flex: 1 }} />

            {/* Footer info */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
                paddingTop: "2rem",
                borderTop: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <motion.p
                variants={itemVariants}
                style={{
                  fontSize: "0.75rem",
                  color: "var(--text-muted)",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                Stay connected
              </motion.p>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                {[
                  { label: "Github", href: "https://github.com/karamhittini" },
                  {
                    label: "LinkedIn",
                    href: "https://linkedin.com/in/karamhittini",
                  },
                  {
                    label: "Instagram",
                    href: "https://instagram.com/karam.hittini",
                  },
                ].map((link) => (
                  <motion.a
                    key={link.href}
                    variants={itemVariants}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setHovered(link.href)}
                    onMouseLeave={() => setHovered(null)}
                    style={{
                      fontSize: "0.85rem",
                      color:
                        hovered === link.href
                          ? "var(--accent)"
                          : "var(--text-secondary)",
                      textDecoration: "none",
                      transition: "color 0.2s ease",
                    }}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
