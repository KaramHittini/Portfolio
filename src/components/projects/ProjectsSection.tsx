import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { projects } from '../../data/projects';
import ProjectCard from './ProjectCard';

export default function ProjectsSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollYRef = useRef(0);
  const xRef = useRef(0);
  const velocityRef = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY;
      lastScrollY = currentY;
      scrollYRef.current = currentY;
      // scrolling down → move cards to the right (+x), up → left
      velocityRef.current += delta * 0.8;
    };

    const animate = () => {
      // Apply inertia
      xRef.current += velocityRef.current;
      velocityRef.current *= 0.92; // damping

      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(${xRef.current}px)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section
      id="projects"
      className="section"
      style={{
        overflow: 'hidden',
        paddingTop: '8rem',
        paddingBottom: '8rem',
      }}
    >
      {/* Label + Heading */}
      <div style={{ marginBottom: '4rem' }}>
        <motion.p
          className="section-label"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          Selected Work
        </motion.p>
        <motion.h2
          className="display-lg"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Projects
        </motion.h2>
      </div>

      {/* Scrolling track */}
      <div
        style={{
          overflow: 'visible',
          position: 'relative',
        }}
      >
        <div
          ref={trackRef}
          style={{
            display: 'flex',
            gap: '1.5rem',
            willChange: 'transform',
          }}
        >
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              style={{
                // Slight vertical variation for organic feel
                marginTop: i % 2 === 0 ? '0px' : '32px',
              }}
            >
              <ProjectCard project={project} index={i} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
