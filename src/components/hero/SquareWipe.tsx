import { motion } from 'framer-motion';

const RECT_COUNT = 10;

export default function SquareWipe({ onComplete }: { onComplete: () => void }) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        pointerEvents: 'none',
        zIndex: 20,
      }}
    >
      {Array.from({ length: RECT_COUNT }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ scaleY: 0, originY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{
            duration: 0.55,
            delay: i * 0.045,
            ease: [0.76, 0, 0.24, 1],
          }}
          onAnimationComplete={i === RECT_COUNT - 1 ? onComplete : undefined}
          style={{
            flex: 1,
            height: '100%',
            backgroundColor: '#080808',
            transformOrigin: 'top',
          }}
        />
      ))}
    </div>
  );
}
