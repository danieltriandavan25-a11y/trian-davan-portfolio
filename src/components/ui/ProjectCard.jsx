import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * ProjectCard — Selected Work, Stage 1 (Premium Interactive Selected
 * Work).
 *
 * Carries over the exact original row markup (number, image, title,
 * description, tech tags, link/"Private project" label) and adds
 * three restrained interactions on top of it:
 *
 * 1. Image hover/focus — the same subtle scale the original had
 *    (bumped slightly, 1.02 -> 1.03, still well inside the requested
 *    1.02-1.04 range), now driven by CSS group-hover/group-focus-within
 *    so it also works for keyboard users, not just mouse hover.
 *
 * 2. Overlay reveal — a solid, monochrome ink-toned panel that slides
 *    up over the bottom of the image on hover/focus, restating the
 *    project title and technology list. This is deliberately NOT new
 *    information: the same title and technologies are always visible,
 *    unconditionally, in the content below the image. The overlay is
 *    a premium preview surface, not a place where information hides.
 *    For prefers-reduced-motion, the overlay is never shown — the
 *    "static, simple version" for those users is just the existing
 *    always-visible content below, unchanged from before this stage.
 *
 * 3. Cursor label ("VIEW ->") — a small pointer-tracked pill that
 *    follows the mouse while it's over the image. This is a from-
 *    scratch, isolated interaction local to this component, not an
 *    extension of SplashCursor — SplashCursor is a page-wide, always-
 *    on trail effect with its own architecture, and grafting a
 *    project-local hover label onto it would mean threading hover
 *    state through an unrelated global component for a single
 *    section's benefit. Position tracking writes directly to the
 *    label's own DOM style (no React re-renders per mouse move), the
 *    same direct-style-mutation pattern already used by ProfileCard
 *    and MagicBento.
 *
 *    Important honesty rule: the cursor label ONLY renders when the
 *    project actually has a real `href`. A project with no link
 *    (private projects, both current entries) never shows an
 *    actionable "VIEW" cursor, because there's nothing to view -
 *    showing it anyway would be a false affordance.
 *
 * When a project has a real href, the entire image becomes the
 * anchor (in addition to the existing "View project ->" text link
 * below it), so the "VIEW" cursor promise is truthful and keyboard
 * users can Tab directly to a focusable, navigable element that
 * triggers the same overlay reveal via :focus-within.
 *
 * Pointer tracking for the cursor label is skipped entirely for
 * prefers-reduced-motion and for devices without a fine pointer
 * (touch), so mobile/reduced-motion users simply never see it - they
 * already have the same information via the always-visible content
 * and the semantic link below.
 */
export default function ProjectCard({ project }) {
  const imageWrapperRef = useRef(null);
  const cursorRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const container = imageWrapperRef.current;
    const cursor = cursorRef.current;
    if (!container || !cursor) return;

    const isFinePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;
    if (!isFinePointer) return;

    function handleMove(event) {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    }

    container.addEventListener("mousemove", handleMove);
    return () => container.removeEventListener("mousemove", handleMove);
  }, [reducedMotion]);

  const hasLink = Boolean(project.href);
  const techList = project.technologies?.join(" \u00B7 ");
  const ImageWrapperTag = hasLink ? "a" : "div";
  const imageWrapperProps = hasLink
    ? { href: project.href }
    : {};

  return (
    <article className="grid gap-6 border-b border-[var(--color-border)] py-8 md:grid-cols-[80px_1fr_auto] md:items-start md:gap-8 md:py-10">
      <span className="text-sm text-[var(--color-ink-faint)]">
        {project.number}
      </span>

      <div>
        {project.image && (
          <ImageWrapperTag
            ref={imageWrapperRef}
            {...imageWrapperProps}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="group relative mb-6 block aspect-[16/10] overflow-hidden rounded-lg border border-[var(--color-border)]"
          >
            <img
              src={project.image}
              alt={`${project.title} interface preview`}
              className={cn(
                "h-full w-full object-cover",
                !reducedMotion &&
                  "transition-transform duration-500 ease-out group-hover:scale-[1.03] group-focus-within:scale-[1.03]"
              )}
            />

            {/* Overlay reveal — restates title + technologies already shown below; never new information. */}
            <div
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-[var(--color-ink)] px-5 py-4 opacity-0 transition-[transform,opacity] duration-300 ease-out",
                !reducedMotion &&
                  "group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100"
              )}
            >
              <p className="text-sm font-medium text-[var(--color-surface)]">
                {project.title}
              </p>
              {techList && (
                <p className="mt-1 text-xs text-[var(--color-surface)] opacity-70">
                  {techList}
                </p>
              )}
            </div>

            {/* Cursor label — only rendered when there's a real link to view. */}
            {hasLink && (
              <span
                ref={cursorRef}
                aria-hidden="true"
                className={cn(
                  "pointer-events-none absolute left-0 top-0 z-10 hidden items-center gap-1 whitespace-nowrap border border-[var(--color-surface)] bg-[var(--color-ink)] px-3 py-1.5 text-xs font-medium text-[var(--color-surface)] opacity-0 transition-opacity duration-200 ease-out md:inline-flex",
                  isHovering && !reducedMotion && "opacity-100"
                )}
                style={{ transform: "translate3d(-9999px, -9999px, 0)" }}
              >
                VIEW <span aria-hidden="true">&rarr;</span>
              </span>
            )}
          </ImageWrapperTag>
        )}

        <h3 className="text-xl font-semibold tracking-[-0.01em] text-[var(--color-ink)] md:text-2xl">
          {project.title}
        </h3>

        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--color-ink-muted)] md:text-base">
          {project.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.technologies.map((technology) => (
            <span
              key={technology}
              className="border border-[var(--color-border)] px-3 py-1 text-xs text-[var(--color-ink-muted)]"
            >
              {technology}
            </span>
          ))}
        </div>
      </div>

      {project.href ? (
        <a
          href={project.href}
          className="text-sm font-medium text-[var(--color-ink-muted)] transition-colors hover:text-[var(--color-ink)] md:pt-1"
        >
          View project &rarr;
        </a>
      ) : (
        <span className="text-sm font-medium text-[var(--color-ink-faint)] md:pt-1">
          Private project
        </span>
      )}
    </article>
  );
}
