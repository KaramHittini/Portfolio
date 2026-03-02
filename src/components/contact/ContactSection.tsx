import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

export default function ContactSection() {
  const [focused, setFocused] = useState<string | null>(null);

  const inputStyle = (field: string): React.CSSProperties => ({
    width: '100%',
    background: focused === field ? 'rgba(137,41,255,0.05)' : 'rgba(255,255,255,0.03)',
    border: `1px solid ${focused === field ? 'rgba(137,41,255,0.4)' : 'var(--border-subtle)'}`,
    borderRadius: '12px',
    padding: '0.9rem 1.1rem',
    fontSize: '0.9rem',
    color: 'var(--text-primary)',
    outline: 'none',
    transition: 'all 0.25s ease',
    backdropFilter: 'blur(10px)',
    fontFamily: 'var(--font-sans)',
  });

  return (
    <section
      id="contact"
      className="section"
      style={{
        paddingTop: '8rem',
        paddingBottom: '8rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          width: '600px',
          height: '400px',
          background: 'radial-gradient(ellipse, rgba(137,41,255,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '640px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Heading — no label tag */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          style={{
            fontFamily: 'var(--font-serif)',
            fontWeight: 700,
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            letterSpacing: '-0.02em',
            marginBottom: '0.75rem',
            color: 'var(--text-primary)',
          }}
        >
          Let's Make It
          <br />
          <span style={{ color: 'var(--accent)' }}>Happen</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{
            color: 'var(--text-secondary)',
            fontSize: '0.95rem',
            lineHeight: 1.75,
            marginBottom: '3rem',
          }}
        >
          Have an exciting project, a collaboration idea, or just want to say hi?
          I'd love to hear from you.
        </motion.p>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="glass"
          style={{ borderRadius: '20px', padding: '2rem' }}
        >
          <form
            onSubmit={(e) => e.preventDefault()}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
          >
            <div>
              <label
                htmlFor="email"
                style={{
                  display: 'block',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  color: 'var(--text-muted)',
                  letterSpacing: '0.08em',
                  marginBottom: '0.4rem',
                  textTransform: 'uppercase',
                }}
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="your@email.com"
                style={inputStyle('email')}
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused(null)}
              />
            </div>

            <div>
              <label
                htmlFor="subject"
                style={{
                  display: 'block',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  color: 'var(--text-muted)',
                  letterSpacing: '0.08em',
                  marginBottom: '0.4rem',
                  textTransform: 'uppercase',
                }}
              >
                Subject
              </label>
              <input
                id="subject"
                type="text"
                placeholder="What's it about?"
                style={inputStyle('subject')}
                onFocus={() => setFocused('subject')}
                onBlur={() => setFocused(null)}
              />
            </div>

            <div>
              <label
                htmlFor="message"
                style={{
                  display: 'block',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  color: 'var(--text-muted)',
                  letterSpacing: '0.08em',
                  marginBottom: '0.4rem',
                  textTransform: 'uppercase',
                }}
              >
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                placeholder="Tell me about your project or idea..."
                style={{ ...inputStyle('message'), resize: 'none' }}
                onFocus={() => setFocused('message')}
                onBlur={() => setFocused(null)}
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                background: 'var(--accent)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '12px',
                padding: '0.85rem',
                fontSize: '0.9rem',
                fontWeight: 700,
                letterSpacing: '0.03em',
                cursor: 'inherit',
                fontFamily: 'var(--font-sans)',
              }}
            >
              <span>Send Message</span>
              <Send size={15} />
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
