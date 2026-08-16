import { useEffect, useRef, useState } from "react";

/**
 * SplitText
 *
 * A word-by-word variant of TextReveal: the wrapped text is split into
 * words that each fade in and rise a few pixels into place, staggered
 * ~30-40ms apart, once the element scrolls into view (or on mount).
 * Same dependency-free, IntersectionObserver-driven approach as
 * TextReveal — no animation library, no bounce, no flashy easing.
 *
 * Accessibility: the underlying text node is rendered in full for
 * screen readers (aria-hidden'd per-word spans just carry the visual
 * animation), so the heading is announced as one complete string.
 *
 * Respects prefers-reduced-motion by skipping the animation entirely.
 */
export default function SplitText({
  as: Tag = "div",
  text,
  delay = 0,
  wordDelay = 35,
  className,
  ...rest
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setReducedMotion(true);
      setIsVisible(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const words = text.split(" ");

  return (
    <Tag ref={ref} className={className} {...rest}>
      {/* Full text for screen readers / copy-paste; visual words hidden from AT. */}
      <span className="sr-only">{text}</span>

      <span aria-hidden="true">
        {words.map((word, index) => (
          <span
            key={`${word}-${index}`}
            style={{
              display: "inline-block",
              opacity: reducedMotion || isVisible ? 1 : 0,
              transform:
                reducedMotion || isVisible
                  ? "translateY(0)"
                  : "translateY(12px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
              transitionDelay: `${delay + index * wordDelay}ms`,
              willChange: "opacity, transform",
            }}
          >
            {word}
            {index < words.length - 1 ? "\u00A0" : ""}
          </span>
        ))}
      </span>
    </Tag>
  );
}
