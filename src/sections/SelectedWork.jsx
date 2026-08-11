import Container from "@/components/layout/Container";
import { projects } from "@/data/projects";

export default function SelectedWork() {
  return (
    <section
      id="work"
      aria-labelledby="selected-work-heading"
      className="py-24 md:py-32"
    >
      <Container>
        <div className="mb-12 md:mb-16">
          <p className="text-sm font-medium text-[var(--color-ink-muted)]">
            Selected Work
          </p>

          <h2
            id="selected-work-heading"
            className="mt-4 max-w-2xl text-3xl font-semibold tracking-[-0.02em] text-[var(--color-ink)] md:text-4xl"
          >
            A selection of things I&apos;ve built.
          </h2>
        </div>

        <div className="border-t border-[var(--color-border)]">
          {projects.map((project) => (
            <article
              key={project.number}
              className="grid gap-6 border-b border-[var(--color-border)] py-8 md:grid-cols-[80px_1fr_auto] md:items-start md:gap-8 md:py-10"
            >
              <span className="text-sm text-[var(--color-ink-faint)]">
                {project.number}
              </span>

              <div>
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

              <a
                href={project.href}
                className="text-sm font-medium text-[var(--color-ink-muted)] transition-colors hover:text-[var(--color-ink)] md:pt-1"
              >
                View project →
              </a>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}