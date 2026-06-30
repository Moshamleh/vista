"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { getWhatsappLink } from "@/lib/site"

const WHATSAPP_GENERAL = getWhatsappLink("general")
const MAX_MESSAGE_LENGTH = 1_000
const MAX_HISTORY_ITEMS = 12

export function VistaLeadQualifier() {
  const [ready, setReady] = useState(false)

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

      try {
        const response = await fetch("/api/lead-qualifier", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ message: msg, history: history.length ? history : [] }),
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
        if (!replyText) {
          // No fabricated/fallback AI content
          return
        }

        addMsg(replyText, "bot")
        history.push({ role: "assistant", content: replyText })
        history = history.slice(-MAX_HISTORY_ITEMS)

        // Recommend WhatsApp directly when qualified
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
          link.textContent = "Continue on WhatsApp ->"
          msgs.appendChild(link)
        }

      } catch {
        typing.style.display = "none"
        // Minimal non-AI error message (no hardcoded assistant reply)
        addMsg("Could not reach the assistant right now. Please try again.", "bot")
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
  }, [ready])

  if (!ready) return null

  return (
    <>
      <div className="vlq" id="vlq">
        <div className="vlq-box" id="vlqBox">
          <div className="vlq-head">
            <div className="vlq-head-dot" />
            <div>
              <div className="vlq-head-text">Vista Assistant</div>
              <div className="vlq-head-sub">Usually replies in under 1 hour</div>
            </div>
          </div>
          <div className="vlq-msgs" id="vlqMsgs">
            <div className="vlq-msg bot">
              Hi! I&apos;m Vista&apos;s AI assistant. I&apos;d love to help you start a project. What are you looking
              to build - a brand, website, app, or something else?
            </div>
            <div className="vlq-options">
              <a className="vlq-option whatsapp" href={WHATSAPP_GENERAL} target="_blank" rel="noopener noreferrer">
                Contact directly on WhatsApp
              </a>
              <button className="vlq-option" id="vlqBrowse" type="button">
                Browse the website
              </button>
              <div className="vlq-browse" id="vlqBrowseMenu">
                <Link className="vlq-link" href="/services">Services</Link>
                <Link className="vlq-link" href="/industries">Industries</Link>
                <Link className="vlq-link" href="/work">Work</Link>
                <Link className="vlq-link" href="/pricing">Pricing</Link>
                <Link className="vlq-link" href="/blog">Blog</Link>
                <Link className="vlq-link" href="/contact">Contact</Link>
              </div>
            </div>
            <div className="vlq-typing" id="vlqTyping">
              <span />
              <span />
              <span />
            </div>
          </div>
          <div className="vlq-input-row">
            <input className="vlq-input" id="vlqInput" placeholder="Type your message..." maxLength={MAX_MESSAGE_LENGTH} />
            <button className="vlq-send" id="vlqSend" type="button" aria-label="Send message">
              -&gt;
            </button>
          </div>
        </div>
        <button className="vlq-btn" id="vlqToggle" type="button" aria-label="Open Vista Assistant">
          AI
        </button>
      </div>
    </>
  )
}
