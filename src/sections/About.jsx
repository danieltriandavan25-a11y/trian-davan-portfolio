import Container from "@/components/layout/Container";

const INFO = [
  { label: "Based in", value: "Philippines" },
  { label: "Focus", value: "Web Development" },
  { label: "Currently", value: "Open to freelance work" },
];

const VALUES = [
  "Clean design",
  "Practical solutions",
  "Responsive experiences",
  "Continuous learning",
];

/**
 * About — Phase 5.
 * Two-column continuation of Hero: bio copy on the left, a compact
 * info grid + "What I value" list on the right. Same spacing rhythm,
 * borders, and typography tokens as Selected Work and Services.
 */
export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-24 md:py-32"
    >
      <Container>
        <div className="mb-12 md:mb-16">
          <p className="text-sm font-medium text-[var(--color-ink-muted)]">
            About
          </p>

          <h2
            id="about-heading"
            className="mt-4 max-w-2xl text-3xl font-semibold tracking-[-0.02em] text-[var(--color-ink)] md:text-4xl"
          >
            A little about me.
          </h2>
        </div>

        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          {/* Bio copy */}
          <div className="max-w-xl space-y-6">
            <p className="text-base leading-relaxed text-[var(--color-ink-muted)] md:text-lg">
              I&rsquo;m Trian, a web developer focused on building clean,
              practical, and thoughtful digital experiences.
            </p>
            <p className="text-base leading-relaxed text-[var(--color-ink-muted)] md:text-lg">
              I enjoy turning ideas into responsive websites and web
              applications, working across the frontend and backend to
              create products that are useful, reliable, and easy to use.
            </p>
          </div>

          {/* Info grid + values */}
          <div>
            <div className="border-t border-[var(--color-border)]">
              {INFO.map((item) => (
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

            <div className="mt-10">
              <p className="text-sm font-medium text-[var(--color-ink-muted)]">
                What I value
              </p>

              <ul className="mt-4 space-y-3">
                {VALUES.map((value) => (
                  <li
                    key={value}
                    className="text-sm leading-relaxed text-[var(--color-ink)] md:text-base"
                  >
                    {value}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
