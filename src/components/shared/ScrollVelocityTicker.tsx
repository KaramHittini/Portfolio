import { motion } from "framer-motion";

const TEXT =
  "FRONT-END ENGINEER  ✦  SOFTWARE ENGINEER  ✦  KARAM HITTINI  ✦  AMMAN, JORDAN  ✦  ";
const REPEAT = 3;

function MarqueeText() {
  return (
    <div
      style={{
        overflow: "hidden",
        whiteSpace: "nowrap",
      }}
    >
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: "-100%" }}
        transition={{
          duration: 30,
          ease: "linear",
          repeat: Infinity,
        }}
        style={{
          display: "inline-flex",
        }}
      >
        {Array.from({ length: REPEAT }).map((_, i) => (
          <span key={i} style={{ paddingRight: "2rem", whiteSpace: "nowrap" }}>
            {TEXT}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function ScrollVelocityTicker() {
  return (
    <div
      style={{
        background: "#1a1a1a",
        color: "#f0f0f0",
        padding: "1.2rem 0",
        overflow: "hidden",
        fontFamily: "var(--font-display)",
        fontSize: "0.75rem",
        fontWeight: 600,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <MarqueeText />
    </div>
  );
}
