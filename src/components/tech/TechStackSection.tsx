import { motion } from 'framer-motion';
import { techStack, techIcons } from '../../data/tech';

export default function TechStackSection() {
  // Flatten all tech items into one big grid
  const allItems = techStack.flatMap((cat) => cat.items);

  return (
    <section
      id="tech"
      className="section"
      style={{ paddingTop: '8rem', paddingBottom: '8rem' }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Section label */}
        <motion.p
          className="section-label"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          Skills
        </motion.p>

        {/* Heading: "The Magic Behind" */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            marginBottom: '4rem',
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            letterSpacing: '-0.02em',
            lineHeight: 1,
            color: 'var(--text-primary)',
          }}
        >
          The Magic{' '}
          <span
            className="gradient-text-behind"
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontWeight: 700,
            }}
          >
            Behind
          </span>
        </motion.h2>

        {/* Tech grid — icon + name cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
            gap: '1rem',
          }}
        >
          {allItems.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              whileHover={{ y: -4, scale: 1.05 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.7rem',
                padding: '1.4rem 1rem',
                background: 'var(--bg-glass)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '14px',
                backdropFilter: 'blur(10px)',
                cursor: 'default',
                transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = `${item.color}50`;
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 24px ${item.color}25`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-subtle)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
              }}
            >
              {/* Icon */}
              <div
                style={{ width: 36, height: 36, flexShrink: 0 }}
                dangerouslySetInnerHTML={{
                  __html: techIcons[item.icon] ?? `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="${item.color}"/></svg>`,
                }}
              />
              {/* Name */}
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: 'var(--text-secondary)',
                  textAlign: 'center',
                  letterSpacing: '0.02em',
                }}
              >
                {item.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
