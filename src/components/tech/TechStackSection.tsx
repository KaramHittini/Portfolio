import { motion } from 'framer-motion';
import { techStack } from '../../data/tech';

const categoryColors: Record<string, string> = {
  'Frontend': '#c8f04f',
  'Backend & Systems': '#4fc8f0',
  'Database': '#f04fc8',
  'Tools': '#f0c84f',
  'Practices': '#c84ff0',
};

export default function TechStackSection() {
  return (
    <section
      id="tech"
      className="section"
      style={{ paddingTop: '8rem', paddingBottom: '8rem' }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <motion.p
          className="section-label"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          Tech Stack
        </motion.p>
        <motion.h2
          className="display-lg"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{ marginBottom: '4rem' }}
        >
          Tools of the trade
        </motion.h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '2rem',
          }}
        >
          {techStack.map((category, catIdx) => {
            const color = categoryColors[category.label] ?? 'var(--accent)';
            return (
              <motion.div
                key={category.label}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: catIdx * 0.08 }}
                style={{
                  background: 'var(--bg-glass)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  backdropFilter: 'blur(10px)',
                }}
              >
                {/* Category header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: color,
                      boxShadow: `0 0 8px ${color}`,
                      flexShrink: 0,
                    }}
                  />
                  <p
                    style={{
                      fontSize: '0.68rem',
                      fontWeight: 600,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: color,
                    }}
                  >
                    {category.label}
                  </p>
                </div>

                {/* Items */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {category.items.map((item, itemIdx) => (
                    <motion.span
                      key={item}
                      initial={{ opacity: 0, scale: 0.85 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.4,
                        delay: catIdx * 0.06 + itemIdx * 0.04,
                      }}
                      whileHover={{
                        color: color,
                        borderColor: color,
                        backgroundColor: `${color}15`,
                        scale: 1.05,
                      }}
                      style={{
                        display: 'inline-block',
                        fontSize: '0.8rem',
                        fontWeight: 500,
                        color: 'var(--text-secondary)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '8px',
                        padding: '0.35rem 0.8rem',
                        transition: 'all 0.2s ease',
                        cursor: 'default',
                      }}
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
