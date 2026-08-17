import Container from "@/components/layout/Container";
import TextReveal from "@/components/animations/TextReveal";
import MagicBento from "@/components/ui/MagicBento";

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
 * Services — Phase 4 (Stage 2: Magic Bento).
 * What I offer, laid out as an asymmetric bento grid: the first
 * service as a full-width, slightly more spacious hero card, with
 * the remaining three underneath as a three-across row that stacks
 * to a single column on mobile. Cards use MagicBento for a subtle
 * grayscale cursor-tracked highlight. Numbers, thin borders, and
 * category tags carry over from the original editorial system.
 * Closes with a simple text CTA pointing to #contact.
 */
export default function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="pt-24 pb-16 md:pt-32 md:pb-20"
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

        <div className="border-t border-[var(--color-border)] pt-8 md:pt-10">
          {/* Hero card — first service, slightly more spacious, full width */}
          <TextReveal as="article" delay={0}>
            <MagicBento className="p-6 md:p-10">
              <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-8">
                <div className="flex gap-6 md:gap-8">
                  <span className="text-sm text-[var(--color-ink-faint)]">
                    {SERVICES[0].number}
                  </span>

                  <div>
                    <h3 className="text-2xl font-semibold tracking-[-0.01em] text-[var(--color-ink)] md:text-3xl">
                      {SERVICES[0].title}
                    </h3>

                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--color-ink-muted)] md:text-base">
                      {SERVICES[0].description}
                    </p>
                  </div>
                </div>

                <span className="inline-flex w-fit items-center self-start border border-[var(--color-border)] px-3 py-1 text-xs text-[var(--color-ink-muted)]">
                  {SERVICES[0].category}
                </span>
              </div>
            </MagicBento>
          </TextReveal>

          {/* Remaining three services — three-across row, stacks on mobile */}
          <div className="mt-6 grid grid-cols-1 gap-6 md:mt-8 md:grid-cols-3">
            {SERVICES.slice(1).map((service, index) => (
              <TextReveal key={service.number} as="article" delay={(index + 1) * 80}>
                <MagicBento className="flex h-full flex-col p-6 md:p-8">
                  <span className="text-sm text-[var(--color-ink-faint)]">
                    {service.number}
                  </span>

                  <h3 className="mt-3 text-xl font-semibold tracking-[-0.01em] text-[var(--color-ink)]">
                    {service.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink-muted)]">
                    {service.description}
                  </p>

                  <span className="mt-6 inline-flex w-fit items-center self-start border border-[var(--color-border)] px-3 py-1 text-xs text-[var(--color-ink-muted)]">
                    {service.category}
                  </span>
                </MagicBento>
              </TextReveal>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start gap-2 md:mt-16">
          <p className="text-sm text-[var(--color-ink-muted)]">
            Have something specific in mind?
          </p>

          <a
            href="#contact"
            className="border border-[var(--color-border)] px-4 py-1.5 text-sm font-medium text-[var(--color-ink)] transition-colors hover:border-[var(--color-ink)]"
          >
            Let&rsquo;s work together →
          </a>
        </div>
      </Container>
    </section>
  );
}
