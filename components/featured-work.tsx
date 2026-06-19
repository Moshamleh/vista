"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { Reveal } from "@/components/reveal"

const WORK = [
  {
    title: "Oasis Living",
    category: "E-commerce · Brand & Web · Dubai",
    image: "/work-oasis.jpg",
    imageClassName: "object-cover",
    span: "lg:col-span-7",
  },
  {
    title: "Al Safa Grill",
    category: "Hospitality · Brand & App · Dubai Marina",
    image: "/work-restaurant.png",
    imageClassName: "object-cover",
    span: "lg:col-span-5",
  },
  {
    title: "Palm Horizon Properties",
    category: "Real Estate · Web Platform · Business Bay",
    image: "/work-realestate.png",
    imageClassName: "bg-[#0f1321] object-contain p-6 sm:p-10",
    span: "lg:col-span-5",
  },
  {
    title: "Arabian Cloud Solutions",
    category: "Technology · Product Design · Dubai Internet City",
    image: "/work-cloud.png",
    imageClassName: "object-cover",
    span: "lg:col-span-7",
  },
]

function WorkCard({ item, index }: { item: (typeof WORK)[number]; index: number }) {
  return (
    <Reveal delay={(index % 2) * 0.08} className={item.span}>
      <motion.a
        href="#work"
        whileHover="hover"
        className="group block overflow-hidden rounded-[2rem] border border-border/20 bg-[#10131d] transition-all duration-300 hover:-translate-y-1 hover:border-accent/30"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <motion.div
            variants={{ hover: { scale: 1.05 } }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src={item.image || "/placeholder.svg"}
              alt={item.title}
              fill
              className={item.imageClassName}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
        </div>
        <div className="flex items-center justify-between gap-4 px-6 py-6">
          <div>
            <h3 className="font-heading text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
              {item.title}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground/70">{item.category}</p>
          </div>
          <motion.span
            variants={{ hover: { rotate: 45, backgroundColor: "var(--foreground)", color: "var(--background)" } }}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-accent/30 text-accent transition-colors duration-300"
          >
            <ArrowUpRight className="h-5 w-5" />
          </motion.span>
        </div>
      </motion.a>
    </Reveal>
  )
}

export function FeaturedWork() {
  return (
    <section id="work" className="mx-auto max-w-7xl px-5 py-28 sm:px-8 sm:py-36">
      <Reveal className="mb-14 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">Selected work</p>
          <h2 className="mt-6 max-w-2xl font-heading text-4xl font-medium leading-tight tracking-tight text-foreground sm:text-6xl">
            Work that moves brands forward
          </h2>
        </div>
        <a
          href="#work"
          className="inline-flex items-center gap-2 self-start text-base font-medium text-foreground sm:self-end"
        >
          <span className="border-b border-foreground/30 pb-0.5 transition-colors hover:border-foreground">
            All projects
          </span>
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </Reveal>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {WORK.map((item, i) => (
          <WorkCard key={item.title} item={item} index={i} />
        ))}
      </div>
    </section>
  )
}
