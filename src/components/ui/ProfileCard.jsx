import { useEffect, useRef } from "react";

/**
 * ProfileCard — a bordered identity card with a subtle pointer-tracked
 * tilt, adapted from React Bits' Profile Card interaction pattern.
 *
 * Deliberate departure from the original: React Bits' ProfileCard is
 * built around a colorful holographic glare/shine layer under the
 * tilt. That's dropped entirely here — this portfolio's design rules
 * rule out glow effects and gradients, so only the restrained part of
 * the interaction (a small pointer-tracked 3D tilt, a few degrees at
 * most) is kept. No shine, no color, no glow.
 *
 * The tilt is capped low and eased with a CSS transition so it reads
 * as a quiet, premium detail rather than a toy. It's purely a hover
 * embellishment — every piece of content is visible and readable at
 * rest, with or without the animation running.
 */
export default function ProfileCard({
  name,
  role,
  availability,
  info,
  values,
  className = "",
}) {
  const cardRef = useRef(null);
  const prefersReducedMotionRef = useRef(false);

  useEffect(() => {
    prefersReducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  function handleMouseMove(event) {
    if (prefersReducedMotionRef.current || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    // Small, restrained tilt — a few degrees at most, not a showpiece.
    const maxTilt = 4;
    const rotateY = x * maxTilt * 2;
    const rotateX = -y * maxTilt * 2;

    cardRef.current.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }

  function handleMouseLeave() {
    if (!cardRef.current) return;
    cardRef.current.style.transform =
      "perspective(800px) rotateX(0deg) rotateY(0deg)";
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`border border-[var(--color-border)] p-8 transition-transform duration-200 ease-out will-change-transform ${className}`}
    >
      {/* Identity header: monogram + name/role */}
      <div className="flex items-center gap-4">
        <div
          aria-hidden="true"
          className="flex h-14 w-14 shrink-0 items-center justify-center border border-[var(--color-border)] text-sm font-medium tracking-tight text-[var(--color-ink)]"
        >
          TD
        </div>

        <div>
          <p className="text-base font-semibold tracking-[-0.01em] text-[var(--color-ink)]">
            {name}
          </p>
          <p className="text-sm text-[var(--color-ink-muted)]">{role}</p>
        </div>
      </div>

      {availability && (
        <div className="mt-6 flex items-center gap-2">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full bg-[var(--color-ink)]"
          />
          <span className="text-sm text-[var(--color-ink-muted)]">
            {availability}
          </span>
        </div>
      )}

      {info && info.length > 0 && (
        <div className="mt-8 border-t border-[var(--color-border)]">
          {info.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between border-b border-[var(--color-border)] py-4"
            >
              <span className="text-sm text-[var(--color-ink-muted)]">
                {item.label}
              </span>
              <span className="text-sm font-medium text-[var(--color-ink)]">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      )}

      {values && values.length > 0 && (
        <div className="mt-8">
          <p className="text-sm font-medium text-[var(--color-ink-muted)]">
            What I value
          </p>

          <ul className="mt-4 space-y-3">
            {values.map((value) => (
              <li
                key={value}
                className="text-sm leading-relaxed text-[var(--color-ink)] md:text-base"
              >
                {value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
