import React, { useMemo } from "react";

const randomBetween = (min, max) => Math.random() * (max - min) + min;

const Particles = ({ count = 40 }) => {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      size: randomBetween(2, 5),
      x: randomBetween(0, 100),
      y: randomBetween(0, 100),
      duration: randomBetween(8, 20),
      delay: randomBetween(0, 10),
      opacity: randomBetween(0.15, 0.55),
      driftX: randomBetween(-30, 30),
      driftY: randomBetween(-40, -80),
    }));
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: "50%",
            background: "currentColor",
            opacity: p.opacity,
            animation: `particle-float ${p.duration}s ${p.delay}s ease-in-out infinite alternate`,
            "--drift-x": `${p.driftX}px`,
            "--drift-y": `${p.driftY}px`,
          }}
        />
      ))}
    </div>
  );
};

export default Particles;
