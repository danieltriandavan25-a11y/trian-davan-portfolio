import Navbar from "@/components/layout/Navbar";
import Hero from "@/sections/Hero";
import SelectedWork from "@/sections/SelectedWork";
import Services from "@/sections/Services";
import About from "@/sections/About";
import Skills from "@/sections/Skills";
import Contact from "@/sections/Contact";
import Silk from "@/components/backgrounds/Silk";
import SplashCursor from "@/components/effects/SplashCursor";

export default function App() {
  return (
    <div className="relative min-h-screen bg-[var(--color-surface)] text-[var(--color-ink)]">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-50">
        <Silk
          speed={1.5}
          scale={1}
          color="#E6E6E6"
          noiseIntensity={0.35}
          rotation={0}
        />
      </div>

      <div className="relative z-10">
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

      <SplashCursor />
    </div>
  );
}
