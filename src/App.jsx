import Navbar from "@/components/layout/Navbar";
import Hero from "@/sections/Hero";
import SelectedWork from "@/sections/SelectedWork";
import Services from "@/sections/Services";
import About from "@/sections/About";
import Skills from "@/sections/Skills";
import Contact from "@/sections/Contact";

export default function App() {
  return (
    <div className="min-h-screen bg-[var(--color-surface)] text-[var(--color-ink)]">
      <Navbar />

<main>
  <Hero />
  <SelectedWork />
  <Services />
  <About />
  <Skills />
  <Contact />
</main>
    </div>
  );
}
