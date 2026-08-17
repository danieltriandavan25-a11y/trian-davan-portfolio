import { useEffect, useLayoutEffect, useRef, useState } from "react";

/**
 * LogoLoop — continuous horizontal logo marquee.
 *
 * Reimplemented against React Bits' documented prop API and behavior
 * (https://reactbits.dev/animations/logo-loop) since the literal
 * source file wasn't retrievable here; verified behavior:
 * - speed is in pixels per second, driven by requestAnimationFrame
 *   (not a fixed-duration CSS keyframe), so it stays constant
 *   regardless of how many logos are passed in.
 * - the logo sequence is measured and duplicated as many times as
 *   needed to seamlessly cover the container at any viewport width.
 * - pauseOnHover stops the animation on hover (matches "set speed to
 *   0 on hover" from the real prop table).
 * - fadeOut/fadeOutColor and scaleOnHover are supported but default
 *   off, since this project's design rules avoid gradients and
 *   decorative flourishes unless explicitly asked for.
 *
 * Respects prefers-reduced-motion by not animating at all.
 */
export default function LogoLoop({
  logos,
  speed = 40,
  direction = "left",
  logoHeight = 28,
  gap = 40,
  pauseOnHover = true,
  fadeOut = false,
  fadeOutColor = "var(--color-surface)",
  scaleOnHover = false,
  ariaLabel = "Technology logos",
  className = "",
}) {
  const containerRef = useRef(null);
  const sequenceRef = useRef(null);
  const trackRef = useRef(null);
  const offsetRef = useRef(0);
  const isHoveredRef = useRef(false);
  const prefersReducedMotionRef = useRef(false);

  const [sequenceWidth, setSequenceWidth] = useState(0);
  const [copies, setCopies] = useState(2);

  // Measure one sequence's width and how many copies are needed to
  // seamlessly fill the container at the current viewport width.
  useLayoutEffect(() => {
    const container = containerRef.current;
    const sequence = sequenceRef.current;
    if (!container || !sequence) return;

    function measure() {
      const seqWidth = sequence.getBoundingClientRect().width;
      const containerWidth = container.getBoundingClientRect().width;
      if (seqWidth > 0) {
        setSequenceWidth(seqWidth);
        setCopies(Math.max(2, Math.ceil(containerWidth / seqWidth) + 1));
      }
    }

    measure();

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(container);
    resizeObserver.observe(sequence);

    return () => resizeObserver.disconnect();
  }, [logos, gap, logoHeight]);

  useEffect(() => {
    prefersReducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  // requestAnimationFrame loop: constant px/sec regardless of how
  // many logos are rendered, wraps seamlessly at one sequence width.
  useEffect(() => {
    if (prefersReducedMotionRef.current) return;
    if (!sequenceWidth) return;

    let frameId;
    let lastTime = performance.now();

    function tick(now) {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      const currentSpeed = pauseOnHover && isHoveredRef.current ? 0 : speed;
      offsetRef.current += currentSpeed * dt;

      if (offsetRef.current >= sequenceWidth) {
        offsetRef.current -= sequenceWidth;
      }

      if (trackRef.current) {
        const x =
          direction === "left" ? -offsetRef.current : offsetRef.current;
        trackRef.current.style.transform = `translateX(${x}px)`;
      }

      frameId = requestAnimationFrame(tick);
    }

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [sequenceWidth, speed, direction, pauseOnHover]);

  const sequences = Array.from({ length: copies });

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => {
        isHoveredRef.current = true;
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false;
      }}
    >
      {/* Screen-reader-only list — the animated track below is
          hidden from assistive tech to avoid announcing duplicated,
          constantly-moving content. */}
      <span className="sr-only">
        {ariaLabel}: {logos.map((logo) => logo.title).join(", ")}
      </span>

      <div
        ref={trackRef}
        aria-hidden="true"
        className="flex w-max will-change-transform"
        style={{ gap: `${gap}px` }}
      >
        {sequences.map((_, copyIndex) => (
          <div
            key={copyIndex}
            ref={copyIndex === 0 ? sequenceRef : undefined}
            className="flex shrink-0 items-center"
            style={{ gap: `${gap}px` }}
          >
            {logos.map((logo, logoIndex) => (
              <span
                key={`${copyIndex}-${logoIndex}`}
                className={`flex shrink-0 items-center justify-center text-[var(--color-ink-muted)] transition-transform duration-300 ${
                  scaleOnHover ? "hover:scale-110" : ""
                }`}
                style={{ height: logoHeight }}
              >
                {logo.node}
              </span>
            ))}
          </div>
        ))}
      </div>

      {fadeOut && (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 w-16"
            style={{
              background: `linear-gradient(to right, ${fadeOutColor}, transparent)`,
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 w-16"
            style={{
              background: `linear-gradient(to left, ${fadeOutColor}, transparent)`,
            }}
          />
        </>
      )}
    </div>
  );
}

/**
 * BrandMark — renders a single simple-icons brand path as an inline
 * SVG using currentColor, so it inherits the monochrome ink-muted
 * color set on its wrapper in LogoLoop above.
 */
export function BrandMark({ icon, size = 28 }) {
  return (
    <svg
      role="img"
      aria-hidden="true"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
    >
      <path d={icon.path} />
    </svg>
  );
}
