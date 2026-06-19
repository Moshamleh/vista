import { BrandMark } from "./brand-mark"
import { TypewriterWordmark } from "./typewriter-wordmark"

const COLUMNS = [
  {
    title: "Services",
    links: [
      { label: "Branding", href: "/#services" },
      { label: "Digital Products", href: "/#services" },
      { label: "Websites", href: "/#services" },
      { label: "Development", href: "/#services" },
      { label: "Generative AI", href: "/#services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/#about" },
      { label: "Work", href: "/#work" },
      { label: "Clients", href: "/#clients" },
      { label: "Careers", href: "mailto:hello@vista.global?subject=Careers%20at%20Vista" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Instagram", href: "https://www.instagram.com/vista.global" },
      { label: "LinkedIn", href: "https://www.linkedin.com/company/vista-global" },
      { label: "Dribbble", href: "https://dribbble.com/vista" },
      { label: "X / Twitter", href: "https://twitter.com/vistaglobal" },
      { label: "Behance", href: "https://www.behance.net/vista" },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <BrandMark />
              <TypewriterWordmark />
            </div>
            <p className="mt-6 max-w-xs text-base leading-relaxed text-muted-foreground">
              A Dubai-based branding and UX design agency building transformative digital experiences across the UAE and GCC.
            </p>
            <a
              href="mailto:hello@vista.global"
              className="mt-6 inline-block font-heading text-lg font-medium text-foreground underline-offset-4 hover:underline"
            >
              hello@vista.global
            </a>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target={link.href.startsWith("http") ? "_blank" : undefined}
                        rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                        className="text-base text-foreground/80 transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 text-sm text-muted-foreground sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Vista Global. All rights reserved.</p>
          <div className="flex gap-6" aria-label="Legal information">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
