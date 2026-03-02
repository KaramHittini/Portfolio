import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Don't render custom cursor on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let raf: number;
    let isHovering = false;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onMouseEnterClickable = () => { isHovering = true; };
    const onMouseLeaveClickable = () => { isHovering = false; };

    const addHoverListeners = () => {
      const clickables = document.querySelectorAll<HTMLElement>(
        'a, button, [role="button"], input, textarea, label, select, [data-cursor-hover]'
      );
      clickables.forEach((el) => {
        el.addEventListener('mouseenter', onMouseEnterClickable);
        el.addEventListener('mouseleave', onMouseLeaveClickable);
      });
      return clickables;
    };

    let clickables = addHoverListeners();

    // Re-scan periodically for dynamically added elements
    const rescanInterval = setInterval(() => {
      clickables.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterClickable);
        el.removeEventListener('mouseleave', onMouseLeaveClickable);
      });
      clickables = addHoverListeners();
    }, 2000);

    const animate = () => {
      // Lerp ring towards mouse
      const lerp = 0.1;
      ringX += (mouseX - ringX) * lerp;
      ringY += (mouseY - ringY) * lerp;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px) scale(${isHovering ? 1.6 : 1})`;
        ringRef.current.style.opacity = isHovering ? '0.6' : '1';
      }

      raf = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove);
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(raf);
      clearInterval(rescanInterval);
    };
  }, []);

  return (
    <>
      {/* Dot — instant */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: 'var(--accent)',
          pointerEvents: 'none',
          zIndex: 9999,
          willChange: 'transform',
          mixBlendMode: 'difference',
        }}
      />
      {/* Ring — lagged */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: '1.5px solid var(--accent)',
          pointerEvents: 'none',
          zIndex: 9998,
          willChange: 'transform',
          transition: 'opacity 0.2s ease, scale 0.15s ease',
          mixBlendMode: 'difference',
        }}
      />
    </>
  );
}
