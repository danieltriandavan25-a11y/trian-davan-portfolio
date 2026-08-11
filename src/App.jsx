import Navbar from "@/components/layout/Navbar";
import Hero from "@/sections/Hero";
import SelectedWork from "@/sections/SelectedWork";
import Services from "@/sections/Services";
import About from "@/sections/About";

export default function App() {
  return (
    <div className="min-h-screen bg-[var(--color-surface)] text-[var(--color-ink)]">
      <Navbar />

<main>
  <Hero />
  <SelectedWork />
  <Services />
  <About />

  {/* Skills, How I Work, Contact
      are added in later phases. */}
</main>
    </div>
  );
}
