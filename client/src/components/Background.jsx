import { useEffect, useRef } from "react";

const Background = () => {
  const canvasRef = useRef(null);
  const spotlightRef = useRef(null);
  const cursorRef = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const target = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMouseMove);

    const SPACING = 30;
    const BASE_R = 1.4;
    const GLOW_DIST = 160;
    const PUSH_DIST = 70;
    const PUSH_STR = 18;

    const draw = () => {
      // Smooth lerp
      mouse.current.x += (target.current.x - mouse.current.x) * 0.07;
      mouse.current.y += (target.current.y - mouse.current.y) * 0.07;

      const mx = mouse.current.x;
      const my = mouse.current.y;

      // Update spotlight & cursor DOM elements directly — no React re-renders
      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate(${mx}px, ${my}px)`;
      }
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${target.current.x - 6}px, ${target.current.y - 6}px)`;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cols = Math.ceil(canvas.width / SPACING) + 1;
      const rows = Math.ceil(canvas.height / SPACING) + 1;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const bx = i * SPACING;
          const by = j * SPACING;

          const dx = mx - bx;
          const dy = my - by;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Repulsion displacement
          const pushFactor = Math.max(0, 1 - dist / PUSH_DIST);
          const angle = Math.atan2(dy, dx);
          const push = pushFactor * PUSH_STR * (1 - pushFactor * 0.5);
          const x = bx - Math.cos(angle) * push;
          const y = by - Math.sin(angle) * push;

          const proximity = Math.max(0, 1 - dist / GLOW_DIST);
          const alpha = 0.1 + proximity * 0.9;
          const r = BASE_R + proximity * 3;

          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);

          if (proximity > 0.02) {
            // Shift hue: 265° violet → 185° cyan as proximity varies
            const hue = 265 - proximity * 80;
            const lightness = 55 + proximity * 25;
            ctx.fillStyle = `hsla(${hue}, 85%, ${lightness}%, ${alpha})`;

            // Glow shadow for bright dots
            if (proximity > 0.3) {
              ctx.shadowColor = `hsla(${hue}, 90%, 70%, ${proximity * 0.6})`;
              ctx.shadowBlur = r * 4;
            } else {
              ctx.shadowBlur = 0;
            }
          } else {
            ctx.fillStyle = `rgba(180, 180, 220, 0.1)`;
            ctx.shadowBlur = 0;
          }

          ctx.fill();
        }
      }

      ctx.shadowBlur = 0;
      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <>
      {/* Dot canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
      />

      {/* Radial spotlight that follows mouse */}
      <div
        ref={spotlightRef}
        className="fixed pointer-events-none"
        style={{
          zIndex: -1,
          top: 0,
          left: 0,
          width: "600px",
          height: "600px",
          marginLeft: "-300px",
          marginTop: "-300px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(124,58,237,0.07) 0%, rgba(99,102,241,0.04) 40%, transparent 70%)",
          willChange: "transform",
        }}
      />

      {/* Custom cursor dot */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none"
        style={{
          zIndex: 1,
          top: 0,
          left: 0,
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          background: "rgba(167,139,250,0.9)",
          boxShadow: "0 0 10px 3px rgba(139,92,246,0.6)",
          willChange: "transform",
          transition: "transform 0.05s linear",
          mixBlendMode: "screen",
        }}
      />
    </>
  );
};

export default Background;