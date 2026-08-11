import Container from "@/components/layout/Container";

const SERVICES = [
  {
    number: "01",
    title: "Website Development",
    description:
      "Responsive, modern websites for businesses, organizations, and personal brands.",
    category: "Design & Build",
  },
  {
    number: "02",
    title: "Web Application Development",
    description:
      "Interactive web applications with authentication, databases, real-time features, and custom functionality.",
    category: "Full-Stack",
  },
  {
    number: "03",
    title: "UI & Frontend Development",
    description:
      "Clean, responsive interfaces focused on usability, performance, accessibility, and mobile experience.",
    category: "Frontend",
  },
  {
    number: "04",
    title: "Website Improvements",
    description:
      "Redesigns, responsiveness fixes, performance improvements, bug fixes, and new features for existing websites.",
    category: "Maintenance",
  },
];

/**
 * Services — Phase 4.
 * Numbered editorial list of what I offer, styled to match the
 * Selected Work section (numbers, thin borders, generous whitespace).
 * Closes with a simple text CTA pointing to #contact.
 */
export default function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="py-24 md:py-32"
    >
      <Container>
        <div className="mb-12 md:mb-16">
          <p className="text-sm font-medium text-[var(--color-ink-muted)]">
            Services
          </p>

          <h2
            id="services-heading"
            className="mt-4 max-w-2xl text-3xl font-semibold tracking-[-0.02em] text-[var(--color-ink)] md:text-4xl"
          >
            What I can build for you.
          </h2>
        </div>

        <div className="border-t border-[var(--color-border)]">
          {SERVICES.map((service) => (
            <article
              key={service.number}
              className="grid gap-6 border-b border-[var(--color-border)] py-8 md:grid-cols-[80px_1fr_auto] md:items-start md:gap-8 md:py-10"
            >
              <span className="text-sm text-[var(--color-ink-faint)]">
                {service.number}
              </span>

              <div>
                <h3 className="text-xl font-semibold tracking-[-0.01em] text-[var(--color-ink)] md:text-2xl">
                  {service.title}
                </h3>

                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--color-ink-muted)] md:text-base">
                  {service.description}
                </p>
              </div>

              <span className="border border-[var(--color-border)] px-3 py-1 text-xs text-[var(--color-ink-muted)] md:pt-1 md:mt-1 inline-flex items-center self-start">
                {service.category}
              </span>
            </article>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start gap-2 md:mt-16">
          <p className="text-sm text-[var(--color-ink-muted)]">
            Have something specific in mind?
          </p>

          <a
            href="#contact"
            className="text-sm font-medium text-[var(--color-ink)] transition-colors hover:text-[var(--color-ink-muted)]"
          >
            Let&rsquo;s work together →
          </a>
        </div>
      </Container>
    </section>
  );
}
