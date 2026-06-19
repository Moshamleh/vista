"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { BrandMark } from "./brand-mark"
import { TypewriterWordmark } from "./typewriter-wordmark"

const NAV = [
  { label: "Work", href: "/#work" },
  { label: "Clients", href: "/#clients" },
  { label: "Services", href: "/#services" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/#about" },
]

function Logo() {
  return (
    <a href="/" className="flex items-center gap-2.5" aria-label="Vista by Lara home">
      <BrandMark priority />
      <TypewriterWordmark />
    </a>
  )
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between px-5 transition-all duration-300 sm:px-8 ${
          scrolled
            ? "my-3 rounded-full border border-accent/20 bg-background/80 py-2.5 backdrop-blur-2xl shadow-[0_24px_80px_-54px_rgba(87,217,255,0.28)]"
            : "py-5"
        }`}
      >
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-9 md:flex">
          {NAV.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-foreground/70 transition-colors hover:text-accent"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="/#contact"
            className="hidden rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-background transition-transform hover:scale-[1.03] hover:bg-accent/90 md:inline-flex"
          >
            Contact
          </a>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            aria-label="Mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mx-4 overflow-hidden rounded-3xl border border-accent/20 bg-[#0b1020]/95 backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col p-4">
              {NAV.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-base font-medium text-foreground/80 transition-colors hover:bg-accent/10 hover:text-accent"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="/#contact"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-full bg-accent px-6 py-3 text-center text-base font-medium text-background shadow-[0_20px_60px_-48px_rgba(87,217,255,0.55)]"
              >
                Contact
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
