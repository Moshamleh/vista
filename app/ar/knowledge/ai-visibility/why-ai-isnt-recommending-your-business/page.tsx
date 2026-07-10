import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, CheckCircle2, MessageCircle, ShieldCheck, Sparkles } from "lucide-react"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { ReadingProgress } from "@/components/knowledge"
import { jsonLd } from "@/lib/json-ld"
import { siteConfig } from "@/lib/site"

const englishPath = "/knowledge/ai-visibility/why-ai-isnt-recommending-your-business"
const arabicPath = "/ar/knowledge/ai-visibility/why-ai-isnt-recommending-your-business"
const canonical = `${siteConfig.url}${arabicPath}`

export const metadata: Metadata = {
  title: "لماذا لا توصي أنظمة الذكاء الاصطناعي بنشاطك؟ دبي",
  description:
    "دليل عربي للشركات في دبي والإمارات لفهم AI Visibility وGEO وAEO وبناء الثقة الرقمية التي تساعد أنظمة الذكاء الاصطناعي على فهم النشاط والتوصية به.",
  keywords: [
    "ظهور الذكاء الاصطناعي دبي",
    "تحسين GEO الإمارات",
    "تحسين AEO دبي",
    "SEO عربي دبي",
    "AI Visibility UAE",
    "الثقة الرقمية",
    "البيانات المنظمة",
  ],
  alternates: {
    canonical,
    languages: {
      "en-AE": `${siteConfig.url}${englishPath}`,
      "ar-AE": canonical,
    },
  },
  openGraph: {
    title: "لماذا لا توصي أنظمة الذكاء الاصطناعي بنشاطك؟",
    description:
      "دليل Vista by Lara العربي لظهور الشركات في إجابات الذكاء الاصطناعي، الثقة الرقمية، والكيانات القابلة للفهم.",
    url: canonical,
    type: "article",
    siteName: siteConfig.name,
    locale: "ar_AE",
    images: [
      {
        url: `${siteConfig.url}${siteConfig.ogImage}`,
        width: 1200,
        height: 630,
        alt: "دليل ظهور الذكاء الاصطناعي من Vista by Lara",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "لماذا لا توصي أنظمة الذكاء الاصطناعي بنشاطك؟",
    description: "دليل عربي للشركات في دبي والإمارات حول AI Visibility وGEO وAEO.",
    images: [`${siteConfig.url}${siteConfig.ogImage}`],
  },
}

const toc = [
  ["executive-summary", "الملخص التنفيذي"],
  ["ai-summary", "ملخص الذكاء الاصطناعي"],
  ["introduction", "المقدمة"],
  ["section-1", "القسم 1: كيف يغيّر بحث الذكاء الاصطناعي اكتشاف العملاء"],
  ["section-2", "القسم 2: ما الذي تحتاجه أنظمة الذكاء الاصطناعي"],
  ["section-3", "القسم 3: نموذج Vista Recommendation Confidence"],
]

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
      areaServed: ["Dubai", "Abu Dhabi", "Sharjah", "UAE", "GCC"],
      sameAs: siteConfig.sameAs,
    },
    {
      "@type": "TechArticle",
      "@id": `${canonical}#article`,
      headline: "لماذا لا توصي أنظمة الذكاء الاصطناعي بنشاطك التجاري؟",
      description:
        "دليل عربي للشركات في دبي والإمارات لفهم أسباب غيابها عن توصيات الذكاء الاصطناعي وكيفية بناء الثقة الرقمية والكيانات الواضحة.",
      url: canonical,
      inLanguage: "ar-AE",
      author: { "@type": "Person", name: siteConfig.principal.name },
      publisher: { "@id": `${siteConfig.url}/#organization` },
      datePublished: "2026-06-30",
      dateModified: "2026-06-30",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "الرئيسية", item: `${siteConfig.url}/ar` },
        { "@type": "ListItem", position: 2, name: "مركز المعرفة", item: `${siteConfig.url}/ar/knowledge` },
        { "@type": "ListItem", position: 3, name: "ظهور الذكاء الاصطناعي", item: `${siteConfig.url}/ar/knowledge/ai-visibility` },
      ],
    },
  ],
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28 space-y-5">
      <h2 className="group font-heading text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
        <a href={`#${id}`} className="focus:outline-none focus:ring-2 focus:ring-accent">
          {title}
          <span className="mr-3 text-accent opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">#</span>
        </a>
      </h2>
      <div className="space-y-5 text-lg leading-9 text-foreground/82">{children}</div>
    </section>
  )
}

export default function ArabicKnowledgeArticlePage() {
  return (
    <div className="min-h-screen bg-background">
      <ReadingProgress />
      <SiteHeader />
      <main lang="ar-AE" dir="rtl" className="mx-auto max-w-7xl px-5 pb-20 pt-32 text-right sm:px-8 sm:pb-28 sm:pt-40">
        <Link href={englishPath} hrefLang="en-AE" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-accent">
          <ArrowLeft className="h-4 w-4" />
          النسخة الإنجليزية
        </Link>

        <article className="mt-10">
          <header className="overflow-hidden rounded-[2rem] border border-accent/15 bg-[#05070d] p-8 shadow-[0_45px_120px_-75px_rgba(87,217,255,0.55)] sm:p-12 lg:p-16">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">دليل AI Visibility في دبي والإمارات</p>
            <h1 className="mt-5 max-w-5xl font-heading text-4xl font-semibold leading-tight text-foreground sm:text-6xl">
              لماذا لا توصي أنظمة الذكاء الاصطناعي بنشاطك التجاري؟
            </h1>
            <p className="mt-6 max-w-4xl text-xl leading-9 text-muted-foreground">
              الدليل الكامل لعام 2026 لفهم الظهور في الذكاء الاصطناعي، الثقة الرقمية، وتحسين الظهور في الإجابات التوليدية للشركات في دبي والإمارات والخليج.
            </p>
            <div className="mt-8 grid gap-3 text-sm text-foreground/78 sm:grid-cols-2 lg:grid-cols-4">
              <span className="rounded-2xl border border-border/50 bg-background/35 p-4">الكاتب: Vista by Lara</span>
              <span className="rounded-2xl border border-border/50 bg-background/35 p-4">وقت القراءة: 40 دقيقة</span>
              <span className="rounded-2xl border border-border/50 bg-background/35 p-4">آخر تحديث: 30 يونيو 2026</span>
              <span className="rounded-2xl border border-border/50 bg-background/35 p-4">المستوى: متقدم</span>
            </div>
          </header>

          <div className="mt-6 rounded-2xl border border-accent/20 bg-accent/10 p-5 text-sm text-foreground/86 sm:flex sm:items-center sm:gap-4">
            <CheckCircle2 className="mb-3 h-5 w-5 text-accent sm:mb-0" />
            <div>
              <p className="font-semibold text-foreground">آخر تحديث: 30 يونيو 2026</p>
              <p className="mt-1 text-muted-foreground">تتم مراجعة هذا المورد وتحديثه مع تطور تقنيات البحث والذكاء الاصطناعي.</p>
            </div>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[0.28fr_0.72fr]">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <nav aria-label="فهرس المقال" className="rounded-3xl border border-accent/15 bg-[#0d111f] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">المحتويات</p>
                <ol className="mt-4 space-y-3">
                  {toc.map(([id, label]) => (
                    <li key={id}>
                      <a href={`#${id}`} className="text-sm leading-6 text-muted-foreground transition-colors hover:text-accent">
                        {label}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>

            <div className="space-y-8">
              <section id="executive-summary" className="scroll-mt-28 rounded-3xl border border-accent/20 bg-accent/10 p-7 sm:p-9">
                <div className="flex items-center gap-3 text-accent">
                  <ShieldCheck className="h-5 w-5" />
                  <h2 className="font-heading text-2xl font-semibold">الملخص التنفيذي</h2>
                </div>
                <p className="mt-5 text-lg leading-9 text-foreground/86">
                  يعتقد كثير من أصحاب الأعمال أن الظهور في نتائج البحث التقليدية يعني تلقائيا أن أدوات الذكاء الاصطناعي ستوصي بشركتهم. لكن أنظمة الذكاء الاصطناعي تعتمد على إشارات أوسع: وضوح الكيان، اتساق المعلومات، الثقة الرقمية، جودة المحتوى، البيانات المنظمة، والروابط بين المصادر.
                </p>
              </section>

              <section id="ai-summary" className="scroll-mt-28 rounded-3xl border border-border/60 bg-[#0d111f] p-7 sm:p-9">
                <div className="flex items-center gap-3 text-accent">
                  <Sparkles className="h-5 w-5" />
                  <h2 className="font-heading text-2xl font-semibold">ملخص الذكاء الاصطناعي</h2>
                </div>
                <p className="mt-5 text-lg leading-9 text-foreground/86">
                  تبني أدوات الذكاء الاصطناعي إجاباتها من المعلومات التي تستطيع تفسيرها بثقة. الشركات ذات الهوية الواضحة، المعلومات المتسقة، المحتوى المفيد، وإشارات الثقة القوية تكون أسهل في الوصف والتوصية.
                </p>
              </section>

              <div className="rounded-3xl border border-accent/10 bg-[#0d111f] p-7 shadow-[0_30px_70px_-48px_rgba(87,217,255,0.18)] sm:p-10">
                <div className="space-y-12">
                  <Section id="introduction" title="المقدمة">
                    <p>يتغير البحث. بدلا من كتابة كلمات مفتاحية قصيرة، يسأل الناس اليوم أسئلة كاملة مثل: من يبني مواقع Shopify عالية الأداء في دبي؟ أو أي وكالة تفهم AI Visibility؟</p>
                    <p>بدلا من إظهار قائمة روابط فقط، تقدم أنظمة الذكاء الاصطناعي إجابات مختصرة تجمع معلومات من مصادر متعددة. لذلك لم يعد الترتيب وحده كافيا؛ يجب أن يكون حضورك الرقمي واضحا، متسقا، ومدعوما بأدلة يمكن فهمها.</p>
                  </Section>

                  <Section id="section-1" title="القسم 1: كيف يغيّر بحث الذكاء الاصطناعي اكتشاف العملاء">
                    <p>في البحث التقليدي، كان المستخدم يقارن النتائج بنفسه. أما في البحث المدعوم بالذكاء الاصطناعي، فيتوقع المستخدم إجابة مركبة أو قائمة مختصرة. هذا يعني أن النظام يصبح وسيطا بين العميل والسوق.</p>
                    <p>إذا كانت شركتك غير واضحة أو لا تحتوي على محتوى منظم، قد يوصي النظام بمنافس أكثر وضوحا حتى لو لم يكن أفضل فعليا. لذلك تصبح قابلية الفهم جزءا من الثقة.</p>
                  </Section>

                  <Section id="section-2" title="القسم 2: ما الذي تحتاجه أنظمة الذكاء الاصطناعي قبل وصف نشاطك">
                    <p>تحتاج أنظمة الذكاء الاصطناعي إلى وصف واضح للخدمات، معلومات شركة متسقة، محتوى تعليمي مفيد، مراجع موثوقة، هيكل موقع منطقي، بيانات وصفية دقيقة، وبيانات منظمة توضّح الكيانات والعلاقات.</p>
                    <p>كلما كان النشاط أسهل في الفهم، أصبح أسهل في الوصف من قبل الإنسان والآلة. الجملة العامة مثل “نصمم تجارب رقمية” أقل وضوحا من وصف يحدد الخدمة، السوق، الجمهور، والنتيجة.</p>
                  </Section>

                  <Section id="section-3" title="القسم 3: نموذج Vista Recommendation Confidence">
                    <p>نموذج Vista Recommendation Confidence هو إطار تعليمي خاص بـ Vista by Lara. لا يمثل خوارزمية رسمية لأي مزود ذكاء اصطناعي، بل يساعد الشركات على تقييم جاهزيتها للفهم والتوصية.</p>
                    <ul className="list-disc space-y-3 pr-6 text-foreground/82">
                      <li>وضوح الكيان: هل يمكن تحديد من أنتم وماذا تقدمون وأين تعملون؟</li>
                      <li>الأساس التقني: هل الموقع سريع، قابل للوصول، ومنظم؟</li>
                      <li>الثقة الرقمية: هل المعلومات متسقة وموثوقة عبر المصادر؟</li>
                      <li>السلطة الموضوعية: هل نشرتم محتوى عميقا ومفيدا حول مجالكم؟</li>
                      <li>العلاقات المعرفية: هل ترتبط الخدمات والمقالات والأدلة داخليا بوضوح؟</li>
                      <li>ثقة التوصية: هل توجد أدلة كافية لوصف النشاط بثقة؟</li>
                    </ul>
                  </Section>
                </div>
              </div>

              <section className="rounded-3xl border border-accent/20 bg-accent/10 p-7 sm:p-9">
                <h2 className="font-heading text-3xl font-semibold text-foreground">هل تريد معرفة سبب ضعف ظهورك في الذكاء الاصطناعي؟</h2>
                <p className="mt-4 text-lg leading-8 text-foreground/82">
                  اطلب تدقيق AI Visibility يدوي لمراجعة الكيان، البيانات المنظمة، الثقة الرقمية، المحتوى، والروابط الداخلية.
                </p>
                <a href={siteConfig.whatsapp} className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 font-heading text-sm font-semibold text-background">
                  <MessageCircle className="h-4 w-4" />
                  اطلب التقييم عبر واتساب
                </a>
              </section>
            </div>
          </div>
        </article>
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
      <SiteFooter />
    </div>
  )
}
