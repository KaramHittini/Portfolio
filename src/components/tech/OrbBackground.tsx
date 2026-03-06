// Animated orb background component
// Based on reactbits.dev/backgrounds/orb concept

export default function OrbBackground() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        zIndex: 0,
      }}
    >
      {/* Orb 1 - top right */}
      <div
        style={{
          position: "absolute",
          top: "-20%",
          right: "-10%",
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(circle, rgba(137, 41, 255, 0.15) 0%, rgba(137, 41, 255, 0) 70%)",
          borderRadius: "50%",
          filter: "blur(40px)",
          animation: "float 20s ease-in-out infinite",
        }}
      />

      {/* Orb 2 - bottom left */}
      <div
        style={{
          position: "absolute",
          bottom: "-30%",
          left: "-5%",
          width: "400px",
          height: "400px",
          background:
            "radial-gradient(circle, rgba(110, 0, 207, 0.1) 0%, rgba(110, 0, 207, 0) 70%)",
          borderRadius: "50%",
          filter: "blur(40px)",
          animation: "float 25s ease-in-out infinite reverse",
        }}
      />

      {/* Orb 3 - center top, slight right */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          right: "15%",
          width: "350px",
          height: "350px",
          background:
            "radial-gradient(circle, rgba(192, 132, 252, 0.08) 0%, rgba(192, 132, 252, 0) 70%)",
          borderRadius: "50%",
          filter: "blur(40px)",
          animation: "float 30s ease-in-out infinite",
        }}
      />

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0);
          }
          33% {
            transform: translate(30px, -30px);
          }
          66% {
            transform: translate(-20px, 30px);
          }
        }
      `}</style>
    </div>
  );
}
