import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ArrowUpLeft, CheckCircle2, MessageCircle, Sparkles } from "lucide-react"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { getArabicPage } from "@/lib/i18n/arabic-pages"
import { jsonLd } from "@/lib/json-ld"
import { siteConfig } from "@/lib/site"

type ArabicCatchAllPageProps = {
  params: Promise<{ slug?: string[] }>
}

function getPath(slug?: string[]) {
  return `/${(slug || []).join("/")}`.replace(/\/$/, "") || "/"
}

export async function generateMetadata({ params }: ArabicCatchAllPageProps): Promise<Metadata> {
  const { slug } = await params
  const sourcePath = getPath(slug)
  const page = getArabicPage(sourcePath)
  const canonical = `${siteConfig.url}/ar${sourcePath === "/" ? "" : sourcePath}`

  return {
    title: `${page.title} | Vista by Lara`,
    description: page.description,
    keywords: [
      "فيستا باي لارا",
      "تصميم مواقع دبي",
      "شركة تسويق رقمي دبي",
      "SEO دبي",
      "ظهور الذكاء الاصطناعي الإمارات",
      "تحسين GEO الإمارات",
      "تحسين AEO دبي",
      "Shopify دبي",
      "Google Ads دبي",
    ],
    alternates: {
      canonical,
      languages: {
        "en-AE": `${siteConfig.url}${sourcePath === "/" ? "" : sourcePath}`,
        "ar-AE": canonical,
      },
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: canonical,
      type: "website",
      siteName: siteConfig.name,
      locale: "ar_AE",
      images: [siteConfig.ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [siteConfig.ogImage],
    },
  }
}

export default async function ArabicCatchAllPage({ params }: ArabicCatchAllPageProps) {
  const { slug } = await params
  const sourcePath = getPath(slug)
  const page = getArabicPage(sourcePath)
  const canonical = `${siteConfig.url}/ar${sourcePath === "/" ? "" : sourcePath}`
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: page.title,
    description: page.description,
    url: canonical,
    inLanguage: "ar-AE",
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main lang="ar-AE" dir="rtl" className="text-right">
        <section className="relative overflow-hidden bg-[#030408] px-5 pb-20 pt-32 sm:px-8 sm:pb-28 sm:pt-40">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:4.5rem_4.5rem]" />
            <div className="absolute left-[6%] top-[-10%] h-[520px] w-[520px] rounded-full bg-accent/10 blur-[130px]" />
            <div className="absolute bottom-[-14%] right-[-5%] h-[580px] w-[580px] rounded-full bg-indigo-500/10 blur-[150px]" />
          </div>

          <div className="relative mx-auto max-w-7xl">
            <Link
              href={sourcePath}
              hrefLang="en-AE"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-accent"
            >
              <ArrowLeft className="h-4 w-4" />
              النسخة الإنجليزية
            </Link>

            <div className="mt-10 grid gap-10 lg:grid-cols-[0.72fr_0.28fr] lg:items-stretch">
              <section className="rounded-[2rem] border border-accent/15 bg-[#05070d]/92 p-8 shadow-[0_45px_120px_-75px_rgba(87,217,255,0.55)] sm:p-12 lg:p-16">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">{page.eyebrow}</p>
                <h1 className="mt-5 max-w-5xl font-heading text-4xl font-semibold leading-tight text-foreground sm:text-6xl">
                  {page.title}
                </h1>
                <p className="mt-6 max-w-4xl text-xl leading-9 text-muted-foreground">{page.description}</p>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={siteConfig.whatsapp}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 font-heading text-sm font-semibold text-background transition-transform hover:scale-[1.02]"
                  >
                    <MessageCircle className="h-4 w-4" />
                    {page.cta}
                  </a>
                  <Link
                    href="/ar/knowledge/ai-visibility/why-ai-isnt-recommending-your-business"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-accent/30 px-6 font-heading text-sm font-semibold text-accent transition-colors hover:bg-accent/10"
                  >
                    دليل ظهور الذكاء الاصطناعي
                    <ArrowUpLeft className="h-4 w-4" />
                  </Link>
                </div>
              </section>

              <aside className="rounded-[2rem] border border-border/60 bg-[#0d111f] p-7">
                <Sparkles className="h-6 w-6 text-accent" />
                <h2 className="mt-5 font-heading text-2xl font-semibold text-foreground">روابط مرتبطة</h2>
                <div className="mt-5 grid gap-3">
                  {page.related.map((item) => (
                    <Link key={item.href} href={item.href} className="rounded-2xl border border-border/50 bg-background/35 px-4 py-3 text-sm text-foreground/82 hover:border-accent/40 hover:text-accent">
                      {item.label}
                    </Link>
                  ))}
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="bg-[#0a0a0a] px-5 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-3">
            {page.sections.map((section, index) => (
              <article key={section.title} className="min-h-[280px] rounded-3xl border border-border/60 bg-[#0d111f] p-7">
                <span className="font-mono text-xs text-muted-foreground/70">0{index + 1}</span>
                <CheckCircle2 className="mt-6 h-5 w-5 text-accent" aria-hidden="true" />
                <h2 className="mt-5 font-heading text-2xl font-semibold text-foreground">{section.title}</h2>
                <p className="mt-4 text-base leading-8 text-muted-foreground">{section.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-[#05070d] px-5 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-7xl rounded-[2rem] border border-accent/15 bg-accent/10 p-8 sm:p-10">
            <h2 className="font-heading text-4xl font-semibold text-foreground">كيف ترتبط هذه الصفحة بمنصة المعرفة؟</h2>
            <p className="mt-5 max-w-4xl text-lg leading-9 text-muted-foreground">
              كل صفحة عربية ترتبط بمركز المعرفة، خريطة الكيانات، الخدمات، والأدوات حتى تكون تجربة المستخدم واضحة، وتكون العلاقات الدلالية مفهومة لمحركات البحث وأنظمة الذكاء الاصطناعي.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                ["الكيانات", "توضيح العلاقة بين الشركة، الخدمات، التقنيات، المدن، والمحتوى."],
                ["الثقة", "إظهار الخبرة والتحديثات والروابط الداخلية والبيانات المنظمة."],
                ["التحويل", "توجيه المستخدم نحو واتساب، التدقيق اليدوي، أو الموارد المناسبة."],
              ].map(([title, body]) => (
                <article key={title} className="rounded-2xl border border-border/50 bg-background/35 p-5">
                  <h3 className="font-heading text-xl font-semibold text-foreground">{title}</h3>
                  <p className="mt-3 leading-7 text-muted-foreground">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#0a0a0a] px-5 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-7xl">
            <h2 className="font-heading text-4xl font-semibold text-foreground">أسئلة شائعة</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <article className="rounded-2xl border border-border/50 bg-[#0d111f] p-5">
                <h3 className="font-heading text-xl font-semibold text-foreground">هل هذه الصفحة عربية بالكامل؟</h3>
                <p className="mt-3 leading-7 text-muted-foreground">
                  نعم. النص، العناوين، الأزرار، الروابط، البيانات الوصفية، واتجاه الصفحة مصممة للغة العربية.
                </p>
              </article>
              <article className="rounded-2xl border border-border/50 bg-[#0d111f] p-5">
                <h3 className="font-heading text-xl font-semibold text-foreground">هل الصفحة قابلة للفهرسة؟</h3>
                <p className="mt-3 leading-7 text-muted-foreground">
                  نعم. المحتوى يظهر كنص HTML عربي مع canonical وhreflang وبيانات منظمة قابلة للقراءة.
                </p>
              </article>
            </div>
          </div>
        </section>
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
      <SiteFooter />
    </div>
  )
}
