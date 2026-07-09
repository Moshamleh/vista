"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type ShinyButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

export function ShinyButton({ className, ...props }: ShinyButtonProps) {
  return <button className={cn("shiny-button", className)} {...props} />
}

type ShinyLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement>

export function ShinyLink({ className, ...props }: ShinyLinkProps) {
  return <a className={cn("shiny-button", className)} {...props} />
}
