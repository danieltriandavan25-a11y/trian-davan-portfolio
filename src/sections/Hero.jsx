import Container from "@/components/layout/Container";
import TextReveal from "@/components/animations/TextReveal";

/**
 * Hero — Phase 2.
 * First section on the page: name/role eyebrow, headline, supporting
 * copy, two CTAs, and an availability indicator. White background,
 * strong typography, generous whitespace — no imagery, no gradients.
 */
export default function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="py-24 md:py-32">
      <Container className="flex flex-col items-start">
        <p className="text-sm font-medium tracking-tight text-[var(--color-ink-muted)]">
          Trian Davan — Web Developer
        </p>

        <TextReveal
          as="h1"
          id="hero-heading"
          delay={80}
          className="mt-6 max-w-3xl text-4xl font-semibold tracking-[-0.02em] leading-[1.1] text-[var(--color-ink)] md:text-6xl"
        >
          Building thoughtful websites and web experiences.
        </TextReveal>

        <TextReveal
          as="p"
          delay={160}
          className="mt-6 max-w-xl text-base leading-relaxed text-[var(--color-ink-muted)] md:text-lg"
        >
          I design and build modern, responsive websites and web
          applications for individuals, businesses, and organizations —
          clean, functional, and built to last.
        </TextReveal>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <a
            href="#work"
            className="inline-flex items-center justify-center border border-[var(--color-ink)] bg-[var(--color-ink)] px-6 py-3 text-sm font-medium text-[var(--color-surface)] transition-colors hover:bg-[var(--color-ink-muted)] hover:border-[var(--color-ink-muted)]"
          >
            View My Work
          </a>

          <a
            href="#contact"
            className="inline-flex items-center justify-center border border-[var(--color-border)] px-6 py-3 text-sm font-medium text-[var(--color-ink)] transition-colors hover:border-[var(--color-ink)]"
          >
            Let&rsquo;s Work Together
          </a>
        </div>

        <div className="mt-12 flex items-center gap-2">
          <span
            aria-hidden="true"
            className="h-2 w-2 rounded-full bg-[var(--color-ink)]"
          />
          <span className="text-sm text-[var(--color-ink-muted)]">
            Available for freelance work
          </span>
        </div>
      </Container>
    </section>
  );
}
