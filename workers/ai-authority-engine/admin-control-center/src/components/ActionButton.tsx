import type { ButtonHTMLAttributes, ReactNode } from "react"

export function ActionButton({
  children,
  variant = "primary",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  readonly children: ReactNode
  readonly variant?: "primary" | "secondary" | "danger"
}) {
  const styles = {
    primary: "border-vista bg-vista text-white hover:bg-[#285f62]",
    secondary: "border-line bg-white text-slate-700 hover:bg-slate-50",
    danger: "border-red-200 bg-red-50 text-red-800 hover:bg-red-100"
  }
  return (
    <button
      type="button"
      {...props}
      className={`rounded-md border px-3 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50 ${styles[variant]} ${props.className ?? ""}`}
    >
      {children}
    </button>
  )
}
