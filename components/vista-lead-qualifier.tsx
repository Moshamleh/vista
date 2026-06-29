"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { getWhatsappLink } from "@/lib/site"

const WORKER_URL = "https://vista-lead-qualifier.vistabylara.workers.dev/chat"
const WHATSAPP_GENERAL = getWhatsappLink("general")

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

    const addMsg = (text: string, type: "user" | "bot") => {
      const message = document.createElement("div")
      message.className = `vlq-msg ${type}`
      message.textContent = text
      msgs.insertBefore(message, typing)
    }

    const send = async () => {
      const msg = input.value.trim()
      if (!msg) return

      input.value = ""
      addMsg(msg, "user")
      history.push({ role: "user", content: msg })
      typing.style.display = "flex"
      msgs.scrollTop = msgs.scrollHeight

      try {
        const response = await fetch(WORKER_URL, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ message: msg, history: history.length ? history : [] }),
        })

        const data = (await response.json()) as {
          reply?: string
          qualified?: boolean
          whatsapp?: string
        }

        typing.style.display = "none"

        const replyText = data.reply
        if (!replyText) {
          // No fabricated/fallback AI content
          return
        }

        addMsg(replyText, "bot")
        history.push({ role: "assistant", content: replyText })

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
          link.rel = "noopener"
          link.textContent = "Continue on WhatsApp ->"
          msgs.appendChild(link)
        }

      } catch {
        typing.style.display = "none"
        // Minimal non-AI error message (no hardcoded assistant reply)
        addMsg("Could not reach the assistant right now. Please try again.", "bot")
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
      <style
        dangerouslySetInnerHTML={{
          __html: `
.vlq{position:fixed;bottom:24px;right:24px;z-index:9999;font-family:'Space Grotesk',sans-serif}
.vlq-btn{width:56px;height:56px;border-radius:50%;background:rgba(0,229,255,0.1);border:1px solid rgba(0,229,255,0.4);color:#00e5ff;font-size:24px;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 0 24px rgba(0,229,255,0.2);transition:all .3s}
.vlq-btn:hover{background:rgba(0,229,255,0.2);transform:scale(1.05)}
.vlq-box{position:absolute;bottom:70px;right:0;width:320px;background:#0a0a0a;border:1px solid rgba(255,255,255,0.08);border-radius:16px;overflow:hidden;display:none;flex-direction:column;box-shadow:0 32px 64px rgba(0,0,0,0.6)}
.vlq-box.open{display:flex}
.vlq-head{padding:14px 16px;background:rgba(0,229,255,0.06);border-bottom:1px solid rgba(255,255,255,0.06);display:flex;align-items:center;gap:10px}
.vlq-head-dot{width:8px;height:8px;border-radius:50%;background:#00e5ff;box-shadow:0 0 6px rgba(0,229,255,0.8)}
.vlq-head-text{font-size:13px;font-weight:500;color:rgba(255,255,255,0.9)}
.vlq-head-sub{font-size:11px;color:rgba(255,255,255,0.4)}
.vlq-msgs{padding:14px;display:flex;flex-direction:column;gap:10px;max-height:280px;overflow-y:auto;scroll-behavior:smooth}
.vlq-msg{max-width:85%;padding:9px 13px;border-radius:12px;font-size:13px;line-height:1.5}
.vlq-msg.bot{background:rgba(255,255,255,0.05);color:rgba(255,255,255,0.85);border-bottom-left-radius:4px;align-self:flex-start}
.vlq-msg.user{background:rgba(0,229,255,0.1);color:rgba(255,255,255,0.9);border-bottom-right-radius:4px;align-self:flex-end;border:1px solid rgba(0,229,255,0.2)}
.vlq-wa{display:block;margin:4px 0;padding:10px 14px;background:rgba(37,211,102,0.1);border:1px solid rgba(37,211,102,0.3);border-radius:10px;color:#25d366;font-size:13px;font-weight:500;text-decoration:none;text-align:center;transition:all .2s}
.vlq-wa:hover{background:rgba(37,211,102,0.2)}
.vlq-options{display:grid;gap:8px;margin-top:2px}
.vlq-option{display:flex;align-items:center;justify-content:center;width:100%;padding:10px 12px;border-radius:10px;border:1px solid rgba(0,229,255,0.25);background:rgba(0,229,255,0.08);color:#00e5ff;font-size:13px;font-weight:500;text-decoration:none;cursor:pointer;font-family:inherit;transition:all .2s}
.vlq-option:hover{background:rgba(0,229,255,0.16);border-color:rgba(0,229,255,0.45)}
.vlq-option.whatsapp{border-color:rgba(37,211,102,0.35);background:rgba(37,211,102,0.1);color:#25d366}
.vlq-option.whatsapp:hover{background:rgba(37,211,102,0.2)}
.vlq-browse{display:none;grid-template-columns:1fr 1fr;gap:8px}
.vlq-browse.open{display:grid}
.vlq-link{display:flex;align-items:center;justify-content:center;min-height:36px;border-radius:9px;border:1px solid rgba(255,255,255,0.08);background:rgba(255,255,255,0.04);color:rgba(255,255,255,0.82);font-size:12px;font-weight:500;text-decoration:none;transition:all .2s}
.vlq-link:hover{border-color:rgba(0,229,255,0.35);color:#00e5ff;background:rgba(0,229,255,0.08)}
.vlq-input-row{padding:10px;border-top:1px solid rgba(255,255,255,0.06);display:flex;gap:8px}
.vlq-input{flex:1;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:8px 12px;color:#fff;font-size:13px;font-family:inherit;outline:none}
.vlq-input:focus{border-color:rgba(0,229,255,0.3)}
.vlq-send{width:36px;height:36px;border-radius:8px;background:rgba(0,229,255,0.1);border:1px solid rgba(0,229,255,0.3);color:#00e5ff;cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center;transition:all .2s;flex-shrink:0}
.vlq-send:hover{background:rgba(0,229,255,0.2)}
.vlq-typing{display:none;align-self:flex-start;padding:9px 13px;background:rgba(255,255,255,0.05);border-radius:12px;border-bottom-left-radius:4px}
.vlq-typing span{display:inline-block;width:6px;height:6px;border-radius:50%;background:rgba(255,255,255,0.4);margin:0 2px;animation:vlq-bounce .9s infinite}
.vlq-typing span:nth-child(2){animation-delay:.15s}
.vlq-typing span:nth-child(3){animation-delay:.3s}
@keyframes vlq-bounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-6px)}}
          `,
        }}
      />
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
              <a className="vlq-option whatsapp" href={WHATSAPP_GENERAL} target="_blank" rel="noopener">
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
            <input className="vlq-input" id="vlqInput" placeholder="Type your message..." />
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
