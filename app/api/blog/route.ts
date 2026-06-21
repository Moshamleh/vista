import { Redis } from "@upstash/redis"
import { NextResponse } from "next/server"

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

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

export async function GET() {
  try {
    const posts = (await redis.get<BlogPost[]>("blog_posts")) || []
    return NextResponse.json({ posts })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const expectedToken = "vista-blog-secret-2026"
  const token = request.headers.get("x-auth-token")

  if (!expectedToken || token !== expectedToken) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 })
  }

  const body = await request.json().catch(() => null)
  const post = validatePost(body)

  if ("error" in post) {
    return NextResponse.json({ error: post.error }, { status: 400 })
  }
  const posts = (await redis.get<BlogPost[]>("blog_posts")) || []
  const existing = posts.findIndex((item) => item.slug === post.slug)

  if (existing >= 0) {
    posts[existing] = post
  } else {
    posts.unshift(post)
  }

  await redis.set("blog_posts", posts)

  return NextResponse.json({ ok: true })
}
