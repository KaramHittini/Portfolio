import type { Project } from '../../data/projects';
import { motion } from 'framer-motion';

interface Props {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: Props) {
  const cardContent = (
    <motion.article
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      style={{
        position: 'relative',
        flexShrink: 0,
        width: 'min(420px, 80vw)',
        borderRadius: '20px',
        overflow: 'hidden',
        border: '1px solid var(--border-subtle)',
        cursor: project.link ? 'pointer' : 'default',
        background: '#0d0d0d',
        boxShadow: '0 0 0 0 rgba(137, 41, 255, 0)',
        transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
      }}
      onHoverStart={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow = '0 0 40px -5px rgba(137, 41, 255, 0.25)';
        el.style.borderColor = 'rgba(137, 41, 255, 0.3)';
      }}
      onHoverEnd={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow = '0 0 0 0 rgba(137, 41, 255, 0)';
        el.style.borderColor = 'var(--border-subtle)';
      }}
      data-cursor-hover
    >
      {/* Image / Gradient Placeholder */}
      <div
        style={{
          height: '240px',
          background: project.gradient,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Real project image if available */}
        {project.image && (
          <motion.img
            src={project.image}
            alt={project.title}
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0.9,
            }}
          />
        )}

        {/* Overlay for gradient-image blend */}
        {project.image && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, transparent 60%, rgba(13,13,13,0.8) 100%)',
            }}
          />
        )}

        {/* Overlay grid (only when no image) */}
        {!project.image && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `
                linear-gradient(rgba(137,41,255,0.04) 1px, transparent 1px),
                linear-gradient(90deg, rgba(137,41,255,0.04) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
            }}
          />
        )}

        {/* Number (only when no image) */}
        {!project.image && (
          <div
            style={{
              position: 'absolute',
              bottom: '1rem',
              right: '1.25rem',
              fontFamily: 'var(--font-display)',
              fontSize: '5rem',
              fontWeight: 800,
              color: 'rgba(255,255,255,0.06)',
              lineHeight: 1,
              userSelect: 'none',
            }}
          >
            0{index + 1}
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.15rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              letterSpacing: '-0.01em',
            }}
          >
            {project.title}
          </h3>
          {project.link && (
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ color: 'var(--text-muted)', flexShrink: 0, marginTop: '2px' }}
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          )}
        </div>

        <p
          style={{
            fontSize: '0.85rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.7,
            marginBottom: '1.25rem',
          }}
        >
          {project.description}
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
          {project.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: '0.68rem',
                fontWeight: 500,
                color: 'var(--accent)',
                background: 'var(--accent-dim)',
                border: '1px solid rgba(137,41,255,0.2)',
                padding: '0.25rem 0.65rem',
                borderRadius: '100px',
                letterSpacing: '0.03em',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );

  if (project.link) {
    return (
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: 'block', textDecoration: 'none', cursor: 'inherit' }}
      >
        {cardContent}
      </a>
    );
  }

  return cardContent;
}
