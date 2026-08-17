import Container from "@/components/layout/Container";
import TextReveal from "@/components/animations/TextReveal";
import ProjectCard from "@/components/ui/ProjectCard";
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
          {projects.map((project, index) => (
            <TextReveal key={project.number} delay={index * 80}>
              <ProjectCard project={project} />
            </TextReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}