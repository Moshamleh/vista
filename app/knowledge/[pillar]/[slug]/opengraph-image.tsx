import { ImageResponse } from "next/og"

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

type OpenGraphImageProps = {
  params: Promise<{ pillar: string; slug: string }>
}

export default async function OpenGraphImage({ params }: OpenGraphImageProps) {
  const { slug } = await params
  const title = slug.replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase())

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#07111a",
          color: "#f5f7fb",
          padding: 72,
          fontFamily: "Arial",
        }}
      >
        <div style={{ color: "#57d9ff", fontSize: 28, letterSpacing: 4, textTransform: "uppercase" }}>Vista AI Knowledge Platform</div>
        <div style={{ fontSize: 62, lineHeight: 1.06, maxWidth: 980 }}>{title}</div>
        <div style={{ color: "#c8d3df", fontSize: 26 }}>Dubai | UAE | GCC AI Visibility Infrastructure</div>
      </div>
    ),
    size,
  )
}
