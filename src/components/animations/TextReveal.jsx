import { useEffect, useRef, useState } from "react";

/**
 * TextReveal
 *
 * A small, dependency-free "React Bits"-style animation: the wrapped
 * content fades in and rises a few pixels into place on mount (or
 * when it scrolls into view). Kept intentionally subtle — no bounce,
 * no stagger, no flashy easing — in line with the premium/minimal
 * design direction.
 *
 * Respects prefers-reduced-motion by skipping the animation entirely.
 */
export default function TextReveal({
  as: Tag = "div",
  delay = 0,
  className,
  children,
  ...rest
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
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

  return (
    <Tag
      ref={ref}
      className={className}
      {...rest}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(12px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
        transitionDelay: `${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </Tag>
  );
}
