import { NextResponse } from "next/server"
import { blogPosts } from "@/lib/blog"

type CoverRouteProps = {
  params: Promise<{ slug: string }>
}

function escapeSvg(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

function stripExtension(slug: string) {
  return slug.replace(/\.svg$/i, "")
}

function wrapWords(text: string, maxChars: number, maxLines: number) {
  const words = text.split(/\s+/u)
  const lines: string[] = []
  let line = ""

  for (const word of words) {
    const next = line ? `${line} ${word}` : word
    if (next.length > maxChars && line) {
      lines.push(line)
      line = word
    } else {
      line = next
    }

    if (lines.length === maxLines - 1) break
  }

  if (line && lines.length < maxLines) lines.push(line)
  return lines
}

export async function GET(_: Request, { params }: CoverRouteProps) {
  const { slug } = await params
  const post = blogPosts.find((item) => item.slug === stripExtension(slug))

  if (!post) {
    return new NextResponse("Not found", { status: 404 })
  }

  const titleLines = wrapWords(post.title, 30, 3)
  const hubLines = wrapWords(post.hub ?? post.category, 42, 2)
  const keyword = post.retrievalKeywords?.[0] ?? post.category
  const lineHeight = 76

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="700" viewBox="0 0 1400 700" role="img" aria-labelledby="title desc">
  <title id="title">${escapeSvg(post.title)}</title>
  <desc id="desc">${escapeSvg(post.imageAlt ?? post.excerpt)}</desc>
  <defs>
    <radialGradient id="a" cx="82%" cy="12%" r="74%">
      <stop offset="0" stop-color="#57d9ff" stop-opacity=".36"/>
      <stop offset=".38" stop-color="#7a5cff" stop-opacity=".14"/>
      <stop offset="1" stop-color="#030408" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="b" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#06111f"/>
      <stop offset=".48" stop-color="#030408"/>
      <stop offset="1" stop-color="#100914"/>
    </linearGradient>
    <linearGradient id="c" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0" stop-color="#d6b45f"/>
      <stop offset=".55" stop-color="#57d9ff"/>
      <stop offset="1" stop-color="#c77dff"/>
    </linearGradient>
  </defs>
  <rect width="1400" height="700" fill="url(#b)"/>
  <rect width="1400" height="700" fill="url(#a)"/>
  <path d="M105 132h410m-286 80h442m-512 80h340m531-154h242m-312 78h264m-412 78h370M165 552h492m130 0h426" stroke="#57d9ff" stroke-opacity=".16" stroke-width="2"/>
  <g fill="none" stroke="#d6b45f" stroke-opacity=".24" stroke-width="2">
    <circle cx="1085" cy="346" r="156"/>
    <circle cx="1085" cy="346" r="104"/>
    <path d="M929 346h312M1085 190v312"/>
  </g>
  <g fill="#57d9ff" fill-opacity=".78">
    <circle cx="929" cy="346" r="6"/>
    <circle cx="1241" cy="346" r="6"/>
    <circle cx="1085" cy="190" r="6"/>
    <circle cx="1085" cy="502" r="6"/>
  </g>
  <rect x="72" y="70" width="160" height="2" fill="url(#c)"/>
  <text x="72" y="122" fill="#57d9ff" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="700" letter-spacing="4">${escapeSvg(post.category.toUpperCase())}</text>
  ${titleLines
    .map((line, index) => `<text x="72" y="${250 + index * lineHeight}" fill="#f5f7fb" font-family="Arial, Helvetica, sans-serif" font-size="64" font-weight="700">${escapeSvg(line)}</text>`)
    .join("")}
  <text x="72" y="522" fill="#d6b45f" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="700">${escapeSvg(keyword)}</text>
  ${hubLines
    .map((line, index) => `<text x="72" y="${576 + index * 34}" fill="#b7c0d5" font-family="Arial, Helvetica, sans-serif" font-size="24">${escapeSvg(line)}</text>`)
    .join("")}
  <text x="1110" y="612" fill="#d6b45f" font-family="Georgia, serif" font-size="54" font-weight="700">V</text>
  <text x="1160" y="606" fill="#f5f7fb" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="700" letter-spacing="3">VISTA</text>
  <text x="1163" y="636" fill="#9aa7bd" font-family="Arial, Helvetica, sans-serif" font-size="17" letter-spacing="3">BY LARA</text>
</svg>`

  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  })
}
