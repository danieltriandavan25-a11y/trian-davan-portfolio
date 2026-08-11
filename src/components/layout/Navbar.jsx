import { useEffect, useState } from "react";
import Container from "@/components/layout/Container";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

/**
 * Navbar — Phase: navigation.
 * Left: name. Right: desktop links, or a hamburger trigger on mobile
 * that reveals a collapsible in-flow menu (no overlay, no
 * glassmorphism — stays consistent with the flat, editorial look).
 */
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Close the mobile menu on Escape for keyboard users.
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event) {
      if (event.key === "Escape") setIsOpen(false);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
      <Container className="flex h-16 items-center justify-between">
        <span className="text-sm font-medium tracking-tight text-[var(--color-ink)]">
          Trian Davan
        </span>

        {/* Desktop nav */}
        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Primary"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-[var(--color-ink-muted)] transition-colors hover:text-[var(--color-ink)]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile menu trigger */}
        <button
          type="button"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
          onClick={() => setIsOpen((prev) => !prev)}
          className="relative flex h-8 w-8 shrink-0 items-center justify-center border border-[var(--color-border)] md:hidden"
        >
          <span
            aria-hidden="true"
            className={cn(
              "absolute h-px w-4 bg-[var(--color-ink)] transition-transform duration-300 ease-out",
              isOpen ? "translate-y-0 rotate-45" : "-translate-y-[5px]"
            )}
          />
          <span
            aria-hidden="true"
            className={cn(
              "absolute h-px w-4 bg-[var(--color-ink)] transition-opacity duration-200 ease-out",
              isOpen && "opacity-0"
            )}
          />
          <span
            aria-hidden="true"
            className={cn(
              "absolute h-px w-4 bg-[var(--color-ink)] transition-transform duration-300 ease-out",
              isOpen ? "translate-y-0 -rotate-45" : "translate-y-[5px]"
            )}
          />
        </button>
      </Container>

      {/* Mobile menu */}
      <div
        id="mobile-nav"
        aria-hidden={!isOpen}
        className={cn(
          "grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out md:hidden",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <Container>
            <nav
              className="flex flex-col border-t border-[var(--color-border)] py-2"
              aria-label="Mobile"
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  tabIndex={isOpen ? 0 : -1}
                  onClick={closeMenu}
                  className="border-b border-[var(--color-border)] py-4 text-sm text-[var(--color-ink-muted)] transition-colors last:border-b-0 hover:text-[var(--color-ink)]"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </Container>
        </div>
      </div>
    </header>
  );
}
