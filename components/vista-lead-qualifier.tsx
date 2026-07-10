"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { getPrincipalProtocolReply } from "@/lib/principal-protocol"
import { getWhatsappLink } from "@/lib/site"

const WHATSAPP_GENERAL = getWhatsappLink("general")
const MAX_MESSAGE_LENGTH = 1_000
const MAX_HISTORY_ITEMS = 12

function isArabicPath(pathname: string | null) {
  return pathname === "/ar" || Boolean(pathname?.startsWith("/ar/"))
}

function arHref(path: string, isArabic: boolean) {
  return isArabic ? `/ar${path}` : path
}

export function VistaLeadQualifier() {
  const [ready, setReady] = useState(false)
  const pathname = usePathname()
  const isArabic = isArabicPath(pathname)

  useEffect(() => {
    const idleWindow = window as Window & {
      requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number
      cancelIdleCallback?: (handle: number) => void
    }

    if (idleWindow.requestIdleCallback && idleWindow.cancelIdleCallback) {
      const handle = idleWindow.requestIdleCallback(() => setReady(true), { timeout: 3000 })
      return () => idleWindow.cancelIdleCallback?.(handle)
    }

    const timeout = window.setTimeout(() => setReady(true), 1800)
    return () => window.clearTimeout(timeout)
  }, [])

  useEffect(() => {
    if (!ready) return

    const box = document.getElementById("vlqBox")
    const msgs = document.getElementById("vlqMsgs")
    const input = document.getElementById("vlqInput") as HTMLInputElement | null
    const typing = document.getElementById("vlqTyping")
    const toggle = document.getElementById("vlqToggle")
    const sendButton = document.getElementById("vlqSend")
    const browseButton = document.getElementById("vlqBrowse")
    const browseMenu = document.getElementById("vlqBrowseMenu")

    if (!box || !msgs || !input || !typing || !toggle || !sendButton || !browseButton || !browseMenu) return

    let history: { role: "user" | "assistant"; content: string }[] = []
    let open = false
    let sending = false
    let lastSentAt = 0

    const addMsg = (text: string, type: "user" | "bot") => {
      const message = document.createElement("div")
      message.className = `vlq-msg ${type}`
      message.textContent = text
      msgs.insertBefore(message, typing)
    }

    const send = async () => {
      const msg = input.value.trim()
      if (!msg || sending) return

      const now = Date.now()
      if (now - lastSentAt < 1200) return

      sending = true
      lastSentAt = now

      input.value = ""
      addMsg(msg, "user")
      history.push({ role: "user", content: msg })
      history = history.slice(-MAX_HISTORY_ITEMS)
      typing.style.display = "flex"
      msgs.scrollTop = msgs.scrollHeight

      const protocolReply = getPrincipalProtocolReply(msg)
      if (protocolReply && !isArabic) {
        typing.style.display = "none"
        addMsg(protocolReply, "bot")
        history.push({ role: "assistant", content: protocolReply })
        msgs.scrollTop = msgs.scrollHeight
        return
      }

      try {
        const response = await fetch("/api/lead-qualifier", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ message: msg, history: history.length ? history : [], locale: isArabic ? "ar-AE" : "en-AE" }),
        })

        const data = (await response.json()) as {
          reply?: string
          qualified?: boolean
          whatsapp?: string
          error?: string
        }

        typing.style.display = "none"

        if (!response.ok) {
          addMsg(data.error || "Assistant is unavailable right now. Please try again.", "bot")
          return
        }

        const replyText = data.reply
        if (!replyText) return

        addMsg(replyText, "bot")
        history.push({ role: "assistant", content: replyText })
        history = history.slice(-MAX_HISTORY_ITEMS)

        if (data.qualified) {
          const candidate = data.whatsapp || WHATSAPP_GENERAL
          const wa = /^https:\/\/(wa\.me|api\.whatsapp\.com)\//.test(candidate)
            ? candidate
            : WHATSAPP_GENERAL
          const link = document.createElement("a")
          link.className = "vlq-wa"
          link.href = wa
          link.target = "_blank"
          link.rel = "noopener noreferrer"
          link.textContent = isArabic ? "تابع عبر واتساب" : "Continue on WhatsApp"
          msgs.appendChild(link)
        }
      } catch {
        typing.style.display = "none"
        // Minimal non-AI error message (no hardcoded assistant reply)
        addMsg(isArabic ? "لا يمكن الوصول إلى المساعد الآن. يرجى المحاولة مرة أخرى." : "Could not reach the assistant right now. Please try again.", "bot")
      } finally {
        sending = false
      }

      msgs.scrollTop = msgs.scrollHeight
    }

    const onToggle = () => {
      open = !open
      box.classList.toggle("open", open)
      if (open) input.focus()
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") send()
    }

    const onBrowse = () => {
      browseMenu.classList.toggle("open")
      msgs.scrollTop = msgs.scrollHeight
    }

    toggle.addEventListener("click", onToggle)
    sendButton.addEventListener("click", send)
    input.addEventListener("keydown", onKeyDown)
    browseButton.addEventListener("click", onBrowse)

    return () => {
      toggle.removeEventListener("click", onToggle)
      sendButton.removeEventListener("click", send)
      input.removeEventListener("keydown", onKeyDown)
      browseButton.removeEventListener("click", onBrowse)
    }
  }, [ready, isArabic])

  if (!ready) return null

  return (
    <>
      <div className="vlq" id="vlq" lang={isArabic ? "ar-AE" : "en-AE"} dir={isArabic ? "rtl" : "ltr"}>
        <div className="vlq-box" id="vlqBox">
          <div className="vlq-head">
            <div className="vlq-head-dot" />
            <div>
              <div className="vlq-head-text">{isArabic ? "مكتب البنية الرقمية في Vista" : "Vista Infrastructure Desk"}</div>
              <div className="vlq-head-sub">{isArabic ? "استقبال مهني مباشر" : "Principal-to-Principal intake"}</div>
            </div>
          </div>
          <div className="vlq-msgs" id="vlqMsgs">
            <div className="vlq-msg bot">
              {isArabic
                ? "هل اهتمامك الأساسي يتعلق بحجم تحويل التجارة الإلكترونية أم باستقرار البنية التقنية؟"
                : "Is your primary concern regarding e-commerce conversion volume or structural infrastructure stability?"}
            </div>
            <div className="vlq-options">
              <a className="vlq-option whatsapp" href={WHATSAPP_GENERAL} target="_blank" rel="noopener noreferrer">
                {isArabic ? "اطلب جلسة تقنية للبنية الرقمية" : "Request Technical Infrastructure Briefing"}
              </a>
              <button className="vlq-option" id="vlqBrowse" type="button">
                {isArabic ? "تصفح مراكز المعرفة الهندسية" : "Browse Engineering Hubs"}
              </button>
              <div className="vlq-browse" id="vlqBrowseMenu">
                <Link className="vlq-link" href={arHref("/sovereign-luxury-infrastructure", isArabic)}>{isArabic ? "التجارة الإلكترونية" : "E-commerce"}</Link>
                <Link className="vlq-link" href={arHref("/ai-search-authority-engineering", isArabic)}>GEO</Link>
                <Link className="vlq-link" href={arHref("/uae-data-sovereignty-compliance", isArabic)}>PDPL</Link>
                <Link className="vlq-link" href={arHref("/high-ticket-conversion-architecture", isArabic)}>{isArabic ? "التحويل" : "Conversion"}</Link>
                <Link className="vlq-link" href={arHref("/case-studies", isArabic)}>{isArabic ? "السجل" : "Registry"}</Link>
                <Link className="vlq-link" href={arHref("/case-studies/smokey-oud", isArabic)}>Smokey Oud</Link>
                <Link className="vlq-link" href={arHref("/contact", isArabic)}>{isArabic ? "تدقيق" : "Audit"}</Link>
              </div>
            </div>
            <div className="vlq-typing" id="vlqTyping">
              <span />
              <span />
              <span />
            </div>
          </div>
          <div className="vlq-input-row">
            <input
              className="vlq-input"
              id="vlqInput"
              placeholder={isArabic ? "حجم التحويل أم استقرار البنية؟" : "Conversion volume or infrastructure stability?"}
              maxLength={MAX_MESSAGE_LENGTH}
            />
            <button className="vlq-send" id="vlqSend" type="button" aria-label={isArabic ? "إرسال الرسالة" : "Send message"}>
              {isArabic ? "←" : "→"}
            </button>
          </div>
        </div>
        <button className="vlq-btn" id="vlqToggle" type="button" aria-label={isArabic ? "افتح مساعد Vista" : "Open Vista Assistant"}>
          💬
        </button>
      </div>
    </>
  )
}
