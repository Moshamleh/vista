import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpLeft, Award, Bot, CheckCircle2, MessageCircle, Sparkles } from "lucide-react"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = {
  title: "فيستا باي لارا | ظهور الذكاء الاصطناعي والمواقع عالية الأداء في دبي",
  description:
    "Vista by Lara تبني ظهورا رقميا مدعوما بالبحث، مواقع عالية الأداء، وأنظمة نمو للشركات في دبي والإمارات والخليج.",
  alternates: {
    canonical: `${siteConfig.url}/ar`,
    languages: {
      "en-AE": siteConfig.url,
      "ar-AE": `${siteConfig.url}/ar`,
    },
  },
  openGraph: {
    title: "فيستا باي لارا | ظهور الذكاء الاصطناعي في دبي",
    description:
      "أنظمة نمو ومواقع عالية الأداء تساعد شركات الإمارات والخليج على الظهور أمام العملاء ومحركات البحث وأنظمة الذكاء الاصطناعي.",
    url: `${siteConfig.url}/ar`,
    type: "website",
    siteName: siteConfig.name,
    locale: "ar_AE",
    images: [siteConfig.ogImage],
  },
}

const services = [
  ["بناء العلامة التجارية", "هوية وتموضع ورسائل بصرية للشركات التي تحتاج إلى حضور فاخر وموثوق.", "/ar/services/branding"],
  ["المواقع عالية الأداء", "مواقع سريعة، قابلة للفهرسة، ومهيأة للتحويل في دبي والإمارات.", "/ar/services/websites"],
  ["تحسين SEO وAEO وGEO", "هندسة ظهور تجمع البحث التقليدي، الإجابات المباشرة، والذكاء الاصطناعي.", "/ar/services/seo-optimization"],
  ["تطوير Shopify", "متاجر تجارة إلكترونية مهيأة للأداء، المنتجات، الإعلانات، والتحويل.", "/ar/services/shopify-development-dubai"],
  ["الذكاء الاصطناعي التوليدي", "سير عمل وأدوات ومحتوى قابل للاسترجاع في إجابات الذكاء الاصطناعي.", "/ar/services/generative-ai"],
  ["التسويق الرقمي", "حملات وصفحات هبوط وتحليلات تساعد الشركات على جذب عملاء مؤهلين.", "/ar/services/digital-marketing"],
]

const knowledge = [
  ["مركز المعرفة", "موارد AI Visibility وGEO وAEO والثقة الرقمية.", "/ar/knowledge"],
  ["دليل AI Visibility", "لماذا لا توصي أنظمة الذكاء الاصطناعي بنشاطك التجاري؟", "/ar/knowledge/ai-visibility/why-ai-isnt-recommending-your-business"],
  ["قاموس المصطلحات", "تعريفات عربية لمصطلحات الذكاء الاصطناعي والبحث.", "/ar/knowledge/glossary"],
  ["خريطة الكيانات", "رسم معرفي يربط الخدمات والأدوات والأبحاث.", "/ar/entity-map"],
]

const faqs = [
  ["هل هذه نسخة عربية كاملة؟", "نعم. النسخة العربية تستخدم واجهة RTL، عناوين عربية، روابط عربية داخلية، وبيانات وصفية مخصصة للغة العربية."],
  ["هل الترجمة آلية؟", "لا. تمت صياغة النص العربي بأسلوب عربي مهني مناسب للشركات في الإمارات، مع الحفاظ على أسماء العلامات والمصطلحات التقنية عند الحاجة."],
  ["هل يمكن لمحركات البحث قراءة المحتوى العربي؟", "نعم. المحتوى العربي يظهر كنص HTML قابل للفهرسة، مع canonical وhreflang وmetadata وJSON-LD حيث يلزم."],
]

export default function ArabicHomePage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main lang="ar-AE" dir="rtl" className="text-right">
        <section className="relative overflow-hidden bg-[#030408] px-5 pb-20 pt-32 sm:px-8 sm:pb-28 sm:pt-40">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:4.5rem_4.5rem]" />
            <div className="absolute left-[5%] top-[-10%] h-[560px] w-[560px] rounded-full bg-accent/10 blur-[130px]" />
            <div className="absolute bottom-[-14%] right-[-5%] h-[640px] w-[640px] rounded-full bg-indigo-500/10 blur-[150px]" />
          </div>

          <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <div className="mb-6 flex flex-wrap gap-2.5">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/20 bg-accent/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent">
                  <Award className="h-3.5 w-3.5" />
                  الفائزة بجائزة Noble Business 2025
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/5 bg-white/[0.035] px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
                  SEO / AEO / GEO دبي
                </span>
              </div>

              <h1 className="max-w-5xl font-heading text-4xl font-extrabold leading-tight text-foreground sm:text-6xl lg:text-[5rem]">
                ظهور مدعوم بالبحث، مواقع عالية الأداء، وأنظمة نمو للشركات التي تريد أن يكتشفها الناس والذكاء الاصطناعي.
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-9 text-muted-foreground sm:text-xl">
                تساعد Vista by Lara شركات دبي والإمارات والخليج على بناء حضور رقمي واضح، موثوق، وقابل للفهرسة من خلال AI Visibility وSEO وAEO وGEO وتصميم المواقع عالية الأداء.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a href={siteConfig.whatsapp} className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-accent px-8 text-base font-semibold text-background shadow-[0_24px_60px_rgba(87,217,255,0.28)]">
                  <MessageCircle className="h-4 w-4" />
                  تحدث إلى خبير
                </a>
                <Link href="/ar/knowledge/ai-visibility/why-ai-isnt-recommending-your-business" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.025] px-8 text-base font-semibold text-foreground/82 hover:border-accent/35 hover:bg-accent/10 hover:text-accent">
                  اقرأ دليل AI Visibility
                  <ArrowUpLeft className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="relative min-h-[420px] overflow-hidden rounded-[2rem] border border-accent/15 bg-[#05070d] p-6 shadow-[0_45px_120px_-75px_rgba(87,217,255,0.55)]">
              <div className="absolute right-6 top-6 z-10 rounded-2xl border border-white/10 bg-black/35 px-4 py-3 backdrop-blur-xl">
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                  <Bot className="h-4 w-4" />
                  جاهز للذكاء الاصطناعي
                </p>
              </div>
              <iframe
                src="/robot-frame?v=real-spline-robot"
                title="روبوت Vista by Lara ثلاثي الأبعاد"
                className="h-[460px] w-full border-0 bg-[#030408] brightness-110 contrast-110"
                loading="eager"
                allow="autoplay; fullscreen; xr-spatial-tracking"
              />
            </div>
          </div>
        </section>

        <section className="bg-[#0a0a0a] px-5 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-7xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">الخدمات</p>
            <h2 className="mt-4 max-w-4xl font-heading text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
              أنظمة رقمية مترابطة للظهور، الثقة، والتحويل في سوق الإمارات.
            </h2>
            <div className="mt-10 grid gap-px border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-3">
              {services.map(([title, description, href], index) => (
                <Link key={title} href={href} className="group min-h-[260px] border border-white/10 bg-[#0a0a0a] p-6 transition-colors hover:border-accent/40 hover:bg-[#0d111f]">
                  <span className="font-mono text-xs text-muted-foreground/70">0{index + 1}</span>
                  <h3 className="mt-8 font-heading text-2xl font-semibold text-foreground group-hover:text-accent">{title}</h3>
                  <p className="mt-5 text-base leading-8 text-muted-foreground">{description}</p>
                  <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                    عرض الخدمة
                    <ArrowUpLeft className="h-4 w-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#05070d] px-5 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-7xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">المعرفة</p>
            <h2 className="mt-4 max-w-4xl font-heading text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
              منصة معرفة قابلة للفهرسة، مبنية للناس ومحركات الذكاء الاصطناعي.
            </h2>
            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {knowledge.map(([title, description, href]) => (
                <Link key={title} href={href} className="rounded-3xl border border-border/60 bg-[#0d111f] p-6 transition-colors hover:border-accent/40">
                  <CheckCircle2 className="h-5 w-5 text-accent" />
                  <h3 className="mt-5 font-heading text-2xl font-semibold text-foreground">{title}</h3>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">{description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#0a0a0a] px-5 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">
            {["خريطة كيانات", "مركز أبحاث", "واجهة API معرفية"].map((title, index) => (
              <article key={title} className="rounded-3xl border border-accent/15 bg-[#0d111f] p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">0{index + 1}</p>
                <h2 className="mt-4 font-heading text-3xl font-semibold text-foreground">{title}</h2>
                <p className="mt-4 leading-8 text-muted-foreground">
                  {index === 0 && "نربط الخدمات، الأدوات، المدن، التقنيات، المصطلحات، ودراسات الحالة في رسم معرفي واحد."}
                  {index === 1 && "نجهز مسارا للأبحاث الأصلية والبيانات والمنهجيات القابلة للاستشهاد."}
                  {index === 2 && "ن expose بيانات منظمة قابلة للقراءة من أنظمة الذكاء الاصطناعي عبر endpoints واضحة."}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-[#05070d] px-5 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-7xl rounded-[2rem] border border-accent/15 bg-accent/10 p-8 sm:p-10">
            <h2 className="font-heading text-4xl font-semibold text-foreground">أسئلة شائعة</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {faqs.map(([q, a]) => (
                <article key={q} className="rounded-2xl border border-border/50 bg-background/35 p-5">
                  <h3 className="font-heading text-xl font-semibold text-foreground">{q}</h3>
                  <p className="mt-3 leading-7 text-muted-foreground">{a}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
