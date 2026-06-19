const COLUMNS = [
  {
    title: "Services",
    links: ["Branding", "Digital Products", "Websites", "Development", "Generative AI"],
  },
  {
    title: "Company",
    links: ["About", "Work", "Clients", "Blog", "Careers"],
  },
  {
    title: "Connect",
    links: ["Instagram", "LinkedIn", "Dribbble", "X / Twitter", "Behance"],
  },
]

export function SiteFooter() {
  return (
    <footer id="blog" className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="relative inline-flex h-7 w-7 items-center justify-center">
                <span className="absolute inset-0 rounded-full border-2 border-foreground" />
                <span className="absolute inset-0 rounded-full bg-foreground [clip-path:inset(0_50%_0_0)]" />
              </span>
              <span className="font-heading text-2xl font-medium tracking-tight text-foreground">
                vista <span className="text-muted-foreground">by lara</span>
              </span>
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
                    <li key={link}>
                      <a
                        href="#"
                        className="text-base text-foreground/80 transition-colors hover:text-foreground"
                      >
                        {link}
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
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground">
              Privacy
            </a>
            <a href="#" className="hover:text-foreground">
              Terms
            </a>
            <a href="#" className="hover:text-foreground">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
