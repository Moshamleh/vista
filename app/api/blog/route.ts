import { Redis } from "@upstash/redis"
import { NextResponse } from "next/server"
import { getRequestToken, hasAllowedOrigin, hasValidToken } from "@/lib/request-security"
import { rateLimit } from "@/lib/rate-limit"

const MAX_BODY_BYTES = 64_000

type BlogPost = {
  slug: string
  title: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  date: string
  readTime: string
  metaTitle: string
  metaDescription: string
}

function getRedis() {
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN

  if (!url || !token) return null

  return new Redis({ url, token })
}

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : ""
}

function isSlug(value: string) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)
}

function validatePost(value: unknown): BlogPost | { error: string } {
  if (!value || typeof value !== "object") return { error: "Invalid JSON body." }

  const body = value as Partial<BlogPost>
  const post: BlogPost = {
    slug: clean(body.slug),
    title: clean(body.title),
    excerpt: clean(body.excerpt),
    content: clean(body.content),
    category: clean(body.category),
    tags: Array.isArray(body.tags) ? body.tags.filter((tag): tag is string => typeof tag === "string") : [],
    date: clean(body.date),
    readTime: clean(body.readTime),
    metaTitle: clean(body.metaTitle),
    metaDescription: clean(body.metaDescription),
  }

  if (!post.slug || !isSlug(post.slug)) return { error: "slug must be lowercase, hyphenated, and URL-safe." }
  if (!post.title) return { error: "title is required." }
  if (!post.excerpt) return { error: "excerpt is required." }
  if (!post.content) return { error: "content is required." }
  if (!post.category) return { error: "category is required." }
  if (!post.date) return { error: "date is required." }
  if (!post.readTime) return { error: "readTime is required." }
  if (!post.metaTitle) return { error: "metaTitle is required." }
  if (!post.metaDescription) return { error: "metaDescription is required." }

  return post
}

export async function GET(request: Request) {
  const limited = await rateLimit(request, {
    scope: "blog-read",
    limit: 180,
    windowSeconds: 10 * 60,
  })

  if (!limited.allowed) {
    return NextResponse.json(
      { error: "Too many blog requests. Please wait and try again." },
      { status: 429, headers: { "Retry-After": String(limited.retryAfter) } },
    )
  }

  try {
    const redis = getRedis()
    if (!redis) return NextResponse.json({ posts: [] })

    const posts = (await redis.get<BlogPost[]>("blog_posts")) || []
    return NextResponse.json({ posts })
  } catch (error) {
    console.error("Blog posts load failed", error)
    return NextResponse.json({ error: "Failed to load blog posts." }, { status: 500 })
  }
}

export async function POST(request: Request) {
  if (!hasAllowedOrigin(request)) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 })
  }

  const limited = await rateLimit(request, {
    scope: "blog-admin",
    limit: 20,
    windowSeconds: 10 * 60,
  })

  if (!limited.allowed) {
    return NextResponse.json(
      { error: "Too many publishing attempts. Please wait and try again." },
      { status: 429, headers: { "Retry-After": String(limited.retryAfter) } },
    )
  }

  const expectedToken = process.env.BLOG_ADMIN_TOKEN
  const token = getRequestToken(request)

  if (!expectedToken) {
    return NextResponse.json({ error: "Blog publishing is not configured." }, { status: 503 })
  }

  if (!hasValidToken(token, expectedToken)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 })
  }

  const contentLength = Number(request.headers.get("content-length") || 0)
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Submission is too large." }, { status: 413 })
  }

  const bodyText = await request.text().catch(() => "")
  if (!bodyText || bodyText.length > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 })
  }

  const body = (() => {
    try {
      return JSON.parse(bodyText)
    } catch {
      return null
    }
  })()
  const post = validatePost(body)

  if ("error" in post) {
    return NextResponse.json({ error: post.error }, { status: 400 })
  }

  const redis = getRedis()
  if (!redis) {
    return NextResponse.json({ error: "Blog storage is not configured." }, { status: 503 })
  }

  try {
    const posts = (await redis.get<BlogPost[]>("blog_posts")) || []
    const existing = posts.findIndex((item) => item.slug === post.slug)

    if (existing >= 0) {
      posts[existing] = post
    } else {
      posts.unshift(post)
    }

    await redis.set("blog_posts", posts)
  } catch (error) {
    console.error("Blog post save failed", error)
    return NextResponse.json({ error: "Failed to save blog post." }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
