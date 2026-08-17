import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * MagicBento — a bordered card with a subtle cursor-tracked highlight,
 * adapted from React Bits' Magic Bento for this portfolio's monochrome
 * editorial design system.
 *
 * Deliberate departure from the original: React Bits' Magic Bento is
 * built around a colorful radial spotlight/glow per card, sometimes
 * with particle effects and border-color tinting. All of that is
 * dropped here — this portfolio's design rules rule out gradients,
 * glow, and color. What's kept is a single grayscale radial highlight
 * that follows the pointer within the card (a soft ink-tinted wash,
 * no blur/glow filter, no box-shadow), plus a border-color shift to
 * --color-ink on hover — the same hover language already used by the
 * Services CTA link.
 *
 * The highlight is purely decorative (aria-hidden) and never gates or
 * obscures content, so it introduces no keyboard/focus requirements
 * of its own beyond the card's own children.
 */
export default function MagicBento({ className = "", children, ...rest }) {
  const cardRef = useRef(null);
  const prefersReducedMotionRef = useRef(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    prefersReducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  function handleMouseMove(event) {
    if (prefersReducedMotionRef.current || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    cardRef.current.style.setProperty("--mx", `${x}%`);
    cardRef.current.style.setProperty("--my", `${y}%`);
  }

  function handleMouseEnter() {
    if (prefersReducedMotionRef.current) return;
    setIsHovering(true);
  }

  function handleMouseLeave() {
    setIsHovering(false);
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "group relative overflow-hidden border border-[var(--color-border)] transition-colors duration-200 ease-out hover:border-[var(--color-ink)]",
        className
      )}
      {...rest}
    >
      {/* Cursor-tracked highlight — grayscale wash only, no color/glow. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 ease-out"
        style={{
          opacity: isHovering ? 1 : 0,
          background:
            "radial-gradient(240px circle at var(--mx, 50%) var(--my, 50%), rgba(10, 10, 10, 0.05), transparent 70%)",
        }}
      />

      <div className="relative">{children}</div>
    </div>
  );
}
