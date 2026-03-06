import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface Experience {
  year: string;
  title: string;
  description: string;
  image?: string;
  companyLinks?: { text: string; href: string }[];
}

const experiences: Experience[] = [
  {
    year: "2024",
    title: "A New Start",
    description: "Started my coding career.",
  },
  {
    year: "2025",
    title: "The Grind",
    description:
      "Started experimenting, looking, and practicing different principles. Had my first internship as a Front-End Engineer at",
    companyLinks: [
      { text: "OpenInnovation", href: "https://openinnovation.co" },
    ],
  },
  {
    year: "2026",
    title: "Lift-Off",
    description: "Started doing official projects.",
  },
];

export default function ExperienceSection() {
  const [hoveredYear, setHoveredYear] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate scroll progress within the section
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateProgress = () => {
      const rect = container.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const sectionBottom = sectionTop + rect.height;
      const currentScroll = window.scrollY;

      if (currentScroll < sectionTop) {
        setScrollProgress(0);
      } else if (currentScroll > sectionBottom) {
        setScrollProgress(1);
      } else {
        const progress =
          (currentScroll - sectionTop) / (sectionBottom - sectionTop);
        setScrollProgress(Math.max(0, Math.min(1, progress)));
      }
    };

    window.addEventListener("scroll", updateProgress);
    updateProgress();

    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  // Calculate star position based on scroll progress
  const starPosition = scrollProgress * 100;

  return (
    <section
      ref={containerRef}
      className="py-20"
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        paddingLeft: "1rem",
        paddingRight: "1rem",
      }}
    >
      {/* Section heading */}
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
          fontWeight: 600,
          color: "var(--text-primary)",
          marginBottom: "4rem",
          letterSpacing: "-0.01em",
        }}
      >
        Experience & History
      </motion.h3>

      {/* Timeline container */}
      <div
        style={{
          position: "relative",
          paddingLeft: "3rem",
        }}
      >
        {/* Vertical timeline line */}
        <div
          style={{
            position: "absolute",
            left: "0.75rem",
            top: 0,
            bottom: 0,
            width: "1px",
            background:
              "linear-gradient(to bottom, var(--accent), transparent)",
          }}
        />

        {/* Animated star marker */}
        <motion.div
          style={{
            position: "absolute",
            left: "-0.35rem",
            top: `${starPosition}%`,
            transform: "translateY(-50%)",
            fontSize: "1.5rem",
            zIndex: 10,
            textShadow: `0 0 20px rgba(137, 41, 255, 0.6)`,
            filter: "drop-shadow(0 0 10px rgba(137, 41, 255, 0.4))",
          }}
          transition={{ type: "spring", stiffness: 100, damping: 30 }}
        >
          ⭐
        </motion.div>

        {/* Experience items */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {experiences.map((exp, idx) => (
            <div key={exp.year}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                onMouseEnter={() => setHoveredYear(exp.year)}
                onMouseLeave={() => setHoveredYear(null)}
                style={{
                  display: "flex",
                  gap: "1.5rem",
                  alignItems: "flex-start",
                  padding: "1.5rem 0",
                }}
              >
                {/* Year and content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  {/* Year badge */}
                  <motion.div
                    style={{
                      marginBottom: "0.5rem",
                    }}
                    animate={{
                      color:
                        hoveredYear === exp.year
                          ? "var(--accent)"
                          : "var(--text-secondary)",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <span
                      style={{
                        fontWeight: 700,
                        fontSize: "1rem",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {exp.year}
                    </span>
                  </motion.div>

                  {/* Title with gradient fill effect on hover */}
                  <motion.h4
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: "1.4rem",
                      marginBottom: "0.75rem",
                      letterSpacing: "-0.01em",
                      background:
                        hoveredYear === exp.year
                          ? "linear-gradient(90deg, var(--accent) 0%, var(--accent-2) 100%)"
                          : "linear-gradient(90deg, var(--text-primary) 0%, var(--text-primary) 100%)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor:
                        hoveredYear === exp.year ? "transparent" : "inherit",
                      backgroundSize: "200% 100%",
                    }}
                    animate={{
                      backgroundPosition:
                        hoveredYear === exp.year ? ["100% 0", "0% 0"] : "0% 0",
                    }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    {exp.title}
                  </motion.h4>

                  {/* Description with optional links */}
                  <motion.p
                    style={{
                      fontSize: "1rem",
                      lineHeight: 1.6,
                      color: "var(--text-secondary)",
                      transition: "color 0.3s ease",
                    }}
                    animate={{
                      opacity:
                        hoveredYear === null || hoveredYear === exp.year
                          ? 1
                          : 0.4,
                      color:
                        hoveredYear === exp.year
                          ? "var(--text-primary)"
                          : "var(--text-secondary)",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {exp.description}
                    {exp.companyLinks &&
                      exp.companyLinks.map((link, idx2) => (
                        <span key={idx2}>
                          {idx2 === 0 ? " " : " "}
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              color: "var(--accent)",
                              textDecoration: "none",
                              fontWeight: 600,
                              borderBottom:
                                hoveredYear === exp.year
                                  ? "2px solid var(--accent)"
                                  : "1px solid transparent",
                              transition: "border-color 0.3s ease",
                              paddingBottom: "2px",
                            }}
                          >
                            {link.text}
                          </a>
                        </span>
                      ))}
                  </motion.p>
                </div>

                {/* Image placeholder - fades in on hover */}
                {exp.image && (
                  <motion.div
                    style={{
                      width: "120px",
                      height: "120px",
                      borderRadius: "12px",
                      overflow: "hidden",
                      flexShrink: 0,
                      background: "var(--bg-surface)",
                      border: "1px solid var(--border-subtle)",
                    }}
                    animate={{
                      opacity:
                        hoveredYear === null || hoveredYear === exp.year
                          ? 1
                          : 0,
                      x: hoveredYear === exp.year ? 0 : 20,
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <img
                      src={exp.image}
                      alt={exp.year}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </motion.div>
                )}
              </motion.div>

              {/* Horizontal divider between items (except after last item) */}
              {idx < experiences.length - 1 && (
                <div
                  style={{
                    height: "1px",
                    background: "var(--border-subtle)",
                    marginLeft: "0",
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
