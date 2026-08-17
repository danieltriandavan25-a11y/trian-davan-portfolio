import { useEffect, useRef } from "react";

/**
 * SplashCursor — a subtle, monochrome cursor-trail effect for the
 * whole page, inspired by React Bits' Splash Cursor.
 *
 * Honest note on the source: the real React Bits Splash Cursor is a
 * full WebGL fluid simulation (a Navier-Stokes solver derived from
 * PavelDoGreat/WebGL-Fluid-Simulation) with colorful dye splats. That
 * isn't retrievable as literal source here, and pulling in a fluid-sim
 * dependency (or hand-porting one) would be a heavy, colorful effect
 * that directly conflicts with this project's "no unnecessary
 * dependencies" and "monochrome, subtle, premium" rules. So this is a
 * from-scratch reimplementation of the same *interaction idea*
 * (moving the pointer leaves a soft, fading trail) using a plain 2D
 * canvas instead of WebGL:
 * - Pointer movement spawns small soft-edged circles ("splashes") in
 *   a single ink-grayscale tone, capped in count.
 * - Each splash grows slightly and fades out over ~600ms, drawn with
 *   radial gradients only — no color, no screen/lighten blend modes,
 *   no bloom/blur filters.
 * - Spawn is distance-throttled (not spawned on every raw mousemove)
 *   so it reads as a refined trail, not a dense smear.
 *
 * The canvas is `fixed`, full-viewport, and always `pointer-events:
 * none`, so it can never intercept clicks, hovers, or form focus —
 * it sits purely as a visual layer above the page.
 *
 * Respects prefers-reduced-motion: when set, this component doesn't
 * attach any listeners or render a canvas at all (returns null).
 */
export default function SplashCursor() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    const MAX_SPLASHES = 40;
    const SPAWN_MIN_DISTANCE = 24; // px between spawns, keeps the trail sparse
    const LIFETIME_MS = 600;
    const MAX_RADIUS = 26;

    /** @type {{x:number,y:number,start:number}[]} */
    let splashes = [];
    let lastX = null;
    let lastY = null;
    let rafId = null;

    function spawnSplash(x, y) {
      if (splashes.length >= MAX_SPLASHES) splashes.shift();
      splashes.push({ x, y, start: performance.now() });
    }

    function handlePointerMove(event) {
      const x = event.clientX;
      const y = event.clientY;

      if (lastX === null) {
        lastX = x;
        lastY = y;
        spawnSplash(x, y);
        return;
      }

      const dx = x - lastX;
      const dy = y - lastY;
      if (Math.hypot(dx, dy) >= SPAWN_MIN_DISTANCE) {
        spawnSplash(x, y);
        lastX = x;
        lastY = y;
      }
    }

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });

    function tick() {
      const now = performance.now();
      ctx.clearRect(0, 0, width, height);

      splashes = splashes.filter((splash) => {
        const age = now - splash.start;
        if (age >= LIFETIME_MS) return false;

        const t = age / LIFETIME_MS; // 0 -> 1
        const radius = MAX_RADIUS * (0.3 + 0.7 * t);
        const opacity = 0.12 * (1 - t);

        const gradient = ctx.createRadialGradient(
          splash.x,
          splash.y,
          0,
          splash.x,
          splash.y,
          radius
        );
        gradient.addColorStop(0, `rgba(10, 10, 10, ${opacity})`);
        gradient.addColorStop(1, "rgba(10, 10, 10, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(splash.x, splash.y, radius, 0, Math.PI * 2);
        ctx.fill();

        return true;
      });

      rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      if (rafId) cancelAnimationFrame(rafId);
      ctx.clearRect(0, 0, width, height);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50"
    />
  );
}
