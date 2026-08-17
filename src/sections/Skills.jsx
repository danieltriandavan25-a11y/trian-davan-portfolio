import Container from "@/components/layout/Container";
import TextReveal from "@/components/animations/TextReveal";
import LogoLoop, { BrandMark } from "@/components/ui/LogoLoop";
import {
  siReact,
  siJavascript,
  siHtml5,
  siCss,
  siTailwindcss,
  siFirebase,
  siGit,
  siGithub,
  siVite,
  siCloudinary,
} from "simple-icons/icons";

const TECH_LOGOS = [
  { icon: siReact, title: "React" },
  { icon: siJavascript, title: "JavaScript" },
  { icon: siHtml5, title: "HTML5" },
  { icon: siCss, title: "CSS3" },
  { icon: siTailwindcss, title: "Tailwind CSS" },
  { icon: siFirebase, title: "Firebase" },
  { icon: siGit, title: "Git" },
  { icon: siGithub, title: "GitHub" },
  { icon: siVite, title: "Vite" },
  { icon: siCloudinary, title: "Cloudinary" },
].map((tech) => ({
  title: tech.title,
  node: <BrandMark icon={tech.icon} />,
}));

const SKILL_CATEGORIES = [
  {
    category: "Frontend",
    technologies: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS", "Vite"],
    delay: 0,
  },
  {
    category: "Backend & Data",
    technologies: ["Firebase", "Firestore", "Cloudinary", "REST APIs"],
    delay: 80,
  },
  {
    category: "Tools & Deployment",
    technologies: ["Git", "GitHub", "Netlify", "VS Code"],
    delay: 160,
  },
];

/**
 * Skills — Phase 6.
 * A quick-scan technology overview organized into three full-width
 * category rows. Technologies render as bordered tags (matching the
 * tech-tag treatment in SelectedWork), not cards, bars, or ratings.
 */
export default function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="py-24 md:py-32"
    >
      <Container>
        <div className="mb-12 md:mb-16">
          <p className="text-sm font-medium text-[var(--color-ink-muted)]">
            Skills
          </p>

          <h2
            id="skills-heading"
            className="mt-4 max-w-2xl text-3xl font-semibold tracking-[-0.02em] text-[var(--color-ink)] md:text-4xl"
          >
            Tools I use to build.
          </h2>
        </div>

        <div>
          {SKILL_CATEGORIES.map((group) => (
            <TextReveal
              key={group.category}
              as="div"
              delay={group.delay}
              className="border-t border-[var(--color-border)] py-8 md:grid md:grid-cols-[200px_1fr] md:items-baseline md:gap-8 md:py-10"
            >
              <p className="text-sm font-medium text-[var(--color-ink-muted)]">
                {group.category}
              </p>

              <div className="mt-4 flex flex-wrap gap-2 md:mt-0">
                {group.technologies.map((technology) => (
                  <span
                    key={technology}
                    className="border border-[var(--color-border)] px-3 py-1 text-xs text-[var(--color-ink-muted)]"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </TextReveal>
          ))}
        </div>

        <TextReveal
          as="div"
          delay={240}
          className="mt-12 border-t border-[var(--color-border)] pt-8 md:mt-16 md:pt-10"
        >
          <p className="text-sm font-medium text-[var(--color-ink-muted)]">
            Technologies I work with
          </p>

          <div className="mt-6">
            <LogoLoop
              logos={TECH_LOGOS}
              speed={40}
              logoHeight={28}
              gap={48}
              pauseOnHover
              ariaLabel="Technologies I work with"
            />
          </div>
        </TextReveal>
      </Container>
    </section>
  );
}
