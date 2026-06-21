"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { getWhatsappLink } from "@/lib/site"

const WORKER_PREFIX = "https://vista-wa-nurture.vistabylara.workers.dev/wa/"

function getPageWhatsappLink(pathname: string) {
  const slug = pathname.match(/^\/services\/([^/?#]+)/)?.[1]
  return getWhatsappLink(slug)
}

export function TrackedWhatsappLinks() {
  const pathname = usePathname()

  useEffect(() => {
    const href = getPageWhatsappLink(pathname)

    const updateLinks = () => {
      document.querySelectorAll<HTMLAnchorElement>(`a[href^="${WORKER_PREFIX}"]`).forEach((link) => {
        link.href = href
      })
    }

    updateLinks()

    const observer = new MutationObserver(updateLinks)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => observer.disconnect()
  }, [pathname])

  return null
}
