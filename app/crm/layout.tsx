import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Vista CRM",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
}

export default function CrmLayout({ children }: { children: React.ReactNode }) {
  return children
}
