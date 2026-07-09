export type ArabicPageContent = {
  title: string
  eyebrow: string
  description: string
  sections: { title: string; body: string }[]
  cta: string
  related: { label: string; href: string }[]
}

const defaultSections = [
  {
    title: "ما الذي تقدمه Vista by Lara؟",
    body: "تقدم Vista by Lara أنظمة رقمية عالية الأداء للشركات في دبي والإمارات والخليج، تشمل الاستراتيجية، التصميم، التطوير، تحسين محركات البحث، تحسين الإجابات، تحسين الظهور في الذكاء الاصطناعي، ومسارات التحويل.",
  },
  {
    title: "لماذا هذا مهم للشركات في الإمارات؟",
    body: "المشترون في الإمارات يبحثون ويقارنون قبل التواصل. لذلك يجب أن يكون الموقع واضحا، قابلا للفهرسة، موثوقا، ومفهوما لمحركات البحث وأنظمة الذكاء الاصطناعي.",
  },
  {
    title: "كيف نربط التصميم بالنمو؟",
    body: "نربط الهوية، تجربة المستخدم، الأداء، المحتوى، البيانات المنظمة، الروابط الداخلية، والتحليلات في نظام واحد يساعد الناس والذكاء الاصطناعي على فهم النشاط التجاري.",
  },
]

const defaultRelated = [
  { label: "مركز المعرفة", href: "/ar/knowledge" },
  { label: "دليل ظهور الذكاء الاصطناعي", href: "/ar/knowledge/ai-visibility/why-ai-isnt-recommending-your-business" },
  { label: "لوحة الثقة", href: "/ar/trust" },
]

const pages: Record<string, ArabicPageContent> = {
  "/about": {
    title: "من نحن",
    eyebrow: "Vista by Lara في دبي",
    description: "Vista by Lara استشارة رقمية تقودها لارا إيروس فارباكتيان لبناء الهوية، المواقع، أنظمة النمو، وظهور الذكاء الاصطناعي للشركات في الإمارات والخليج.",
    sections: [
      { title: "رؤية الشركة", body: "نحوّل الموقع من واجهة تعريفية إلى أصل معرفي قابل للفهم من العملاء ومحركات البحث وأنظمة الذكاء الاصطناعي." },
      { title: "الخبرة", body: "نجمع بين التصميم الراقي، هندسة الواجهات، SEO، AEO، GEO، التجارة الإلكترونية، والتحويل الرقمي." },
      { title: "السوق", body: "نخدم شركات دبي وأبوظبي والشارقة والخليج التي تحتاج إلى لغة مؤسسية واضحة وحضور رقمي قابل للقياس." },
    ],
    cta: "تحدث إلى الفريق",
    related: defaultRelated,
  },
  "/services": {
    title: "خدماتنا الرقمية في دبي والإمارات",
    eyebrow: "الخدمات",
    description: "خدمات استراتيجية وتصميم وتطوير وتسويق رقمي تساعد الشركات على الظهور أمام العملاء ومحركات البحث وأنظمة الذكاء الاصطناعي.",
    sections: defaultSections,
    cta: "اطلب جلسة تقنية",
    related: [
      { label: "تصميم المواقع", href: "/ar/services/websites" },
      { label: "تحسين SEO", href: "/ar/services/seo-optimization" },
      { label: "الذكاء الاصطناعي", href: "/ar/services/generative-ai" },
      { label: "وكلاء الذكاء الاصطناعي", href: "/ar/services/uae-ai-agent" },
      { label: "إعلانات جوجل", href: "/ar/services/google-ads-dubai" },
      { label: "إعلانات ميتا", href: "/ar/services/meta-ads-dubai" },
    ],
  },
  "/services/branding": {
    title: "بناء العلامة التجارية في دبي",
    eyebrow: "العلامة التجارية",
    description: "نصمم أنظمة هوية وتموضع ورسائل بصرية للشركات التي تحتاج إلى حضور فاخر، واضح، ومتسق في السوق الإماراتي.",
    sections: [
      { title: "استراتيجية العلامة", body: "نحدد التموضع، الجمهور، الرسالة، النبرة، ومعايير الاستخدام حتى تصبح العلامة قابلة للتذكر والثقة." },
      { title: "النظام البصري", body: "نصمم الشعار، الألوان، الخطوط، الإرشادات، وتطبيقات الهوية على الموقع والقنوات الرقمية." },
      { title: "الهوية القابلة للنمو", body: "نربط الهوية بالمحتوى، صفحات الهبوط، تجربة المستخدم، والتحويل حتى لا تبقى الهوية مجرد شكل بصري." },
    ],
    cta: "ابدأ مشروع هوية",
    related: defaultRelated,
  },
  "/services/websites": {
    title: "مواقع عالية الأداء للشركات في دبي",
    eyebrow: "المواقع الإلكترونية",
    description: "نصمم ونطور مواقع سريعة، قابلة للفهرسة، ومهيأة للتحويل للشركات في الإمارات والخليج.",
    sections: [
      { title: "تصميم موجه للتحويل", body: "نبني الصفحات حول نية المستخدم، وضوح العرض، الثقة، وسهولة اتخاذ القرار." },
      { title: "بنية تقنية قوية", body: "نركز على الأداء، Core Web Vitals، الوصول، البيانات المنظمة، وتجربة الهاتف المحمول." },
      { title: "جاهزية للبحث والذكاء الاصطناعي", body: "نجهز العناوين، المحتوى، الروابط الداخلية، وSchema حتى يكون الموقع مفهوما لمحركات البحث والذكاء الاصطناعي." },
    ],
    cta: "ناقش موقعك الجديد",
    related: [
      { label: "خدمات SEO", href: "/ar/services/seo-optimization" },
      { label: "دليل AI Visibility", href: "/ar/knowledge/ai-visibility" },
      { label: "أداة التقييم", href: "/ar/tools/ai-visibility-score" },
    ],
  },
  "/services/development": {
    title: "تطوير برمجي ومنصات رقمية",
    eyebrow: "التطوير",
    description: "تطوير واجهات وتطبيقات وتكاملات ومنصات قابلة للتوسع للشركات التي تحتاج إلى بنية رقمية موثوقة.",
    sections: defaultSections,
    cta: "اطلب مراجعة تقنية",
    related: defaultRelated,
  },
  "/services/digital-products": {
    title: "تصميم المنتجات الرقمية وتجربة المستخدم",
    eyebrow: "UX/UI",
    description: "تصميم منصات وتطبيقات ولوحات تحكم تساعد مستخدمي الإمارات والخليج على الفهم والمقارنة واتخاذ القرار بسرعة.",
    sections: defaultSections,
    cta: "ابدأ تصميم المنتج",
    related: defaultRelated,
  },
  "/services/generative-ai": {
    title: "حلول الذكاء الاصطناعي التوليدي",
    eyebrow: "الذكاء الاصطناعي",
    description: "استراتيجيات وأدوات ذكاء اصطناعي تساعد الشركات على الأتمتة، تحسين المحتوى، وبناء حضور قابل للاسترجاع في إجابات الذكاء الاصطناعي.",
    sections: defaultSections,
    cta: "ناقش حلول الذكاء الاصطناعي",
    related: [
      { label: "فهرس الذكاء الاصطناعي", href: "/ar/ai" },
      { label: "خريطة الكيانات", href: "/ar/entity-map" },
      { label: "مركز المعرفة", href: "/ar/knowledge" },
    ],
  },
  "/services/uae-ai-agent": {
    title: "وكلاء الذكاء الاصطناعي في الإمارات للعقارات والقطاعات الخدمية",
    eyebrow: "خدمة وكلاء الذكاء الاصطناعي",
    description: "تصمم Vista by Lara وكلاء ذكاء اصطناعي للشركات في دبي والإمارات لمساعدة فرق العقارات والعيادات والمطاعم والتجزئة والخدمات على الرد بسرعة، تأهيل العملاء، وتحويل الاستفسارات الجادة إلى محادثات قابلة للإغلاق.",
    sections: [
      {
        title: "وكيل عقاري ذكي في دبي",
        body: "يساعد الوكيل العقاري الذكي الوسطاء والمطورين على تأهيل المشترين والمستأجرين حسب الميزانية، المنطقة، نوع العقار، وقت الشراء أو الإيجار، وتفضيلات المعاينة قبل أن يتدخل فريق المبيعات.",
      },
      {
        title: "تأهيل العملاء قبل المتابعة",
        body: "بدلا من الرد اليدوي على كل رسالة، يجمع الوكيل الذكي تفاصيل الاستفسار من الموقع وواتساب وصفحات الهبوط والحملات الإعلانية، ثم يوجه العميل المناسب إلى الفريق المناسب.",
      },
      {
        title: "قطاعات متعددة في الإمارات",
        body: "يمكن تطبيق نفس المنهجية على العيادات، المطاعم، المتاجر الإلكترونية، خدمات الصيانة، التعليم، الضيافة، والخدمات المهنية مع قواعد محادثة مختلفة لكل قطاع.",
      },
    ],
    cta: "اطلب تدقيق وكيل ذكاء اصطناعي",
    related: [
      { label: "حلول الذكاء الاصطناعي", href: "/ar/services/generative-ai" },
      { label: "التسويق الرقمي", href: "/ar/services/digital-marketing" },
      { label: "مركز ظهور الذكاء الاصطناعي", href: "/ar/knowledge/ai-visibility" },
    ],
  },
  "/services/seo-optimization": {
    title: "تحسين SEO وAEO وGEO في دبي",
    eyebrow: "تحسين الظهور",
    description: "تحسين تقني ومحتوى وهيكلة معرفية تساعد الشركات على الظهور في Google وإجابات الذكاء الاصطناعي.",
    sections: defaultSections,
    cta: "اطلب تدقيق الظهور",
    related: [
      { label: "قاموس المصطلحات", href: "/ar/knowledge/glossary" },
      { label: "AI Visibility Hub", href: "/ar/knowledge/ai-visibility" },
      { label: "خريطة الكيانات", href: "/ar/entity-map" },
    ],
  },
  "/services/seo-services-dubai": {
    title: "خدمات SEO في دبي",
    eyebrow: "SEO دبي",
    description: "خدمات تحسين محركات البحث للشركات في دبي، تشمل التدقيق التقني، المحتوى، الروابط الداخلية، البيانات المنظمة، والظهور المحلي.",
    sections: defaultSections,
    cta: "احجز تدقيق SEO",
    related: defaultRelated,
  },
  "/services/web-design-dubai": {
    title: "تصميم مواقع دبي",
    eyebrow: "تصميم المواقع",
    description: "تصميم مواقع احترافية للشركات في دبي مع تجربة مستخدم واضحة، لغة عربية وإنجليزية، وبنية مهيأة للفهرسة.",
    sections: defaultSections,
    cta: "ابدأ تصميم موقعك",
    related: defaultRelated,
  },
  "/services/web-development-dubai": {
    title: "تطوير مواقع دبي",
    eyebrow: "تطوير المواقع",
    description: "تطوير مواقع وتطبيقات ويب سريعة وآمنة وقابلة للتوسع للشركات في دبي والإمارات.",
    sections: defaultSections,
    cta: "اطلب خطة تطوير",
    related: defaultRelated,
  },
  "/services/ecommerce-development-dubai": {
    title: "تطوير التجارة الإلكترونية في دبي",
    eyebrow: "التجارة الإلكترونية",
    description: "متاجر ومنصات بيع مهيأة للأداء، التحويل، SEO، وتجربة العملاء في الإمارات والخليج.",
    sections: defaultSections,
    cta: "ناقش متجرك الإلكتروني",
    related: defaultRelated,
  },
  "/services/shopify-development-dubai": {
    title: "تطوير Shopify في دبي",
    eyebrow: "Shopify",
    description: "تطوير متاجر Shopify للشركات في الإمارات مع تحسين السرعة، صفحات المنتجات، الفهرسة، ومسارات الشراء.",
    sections: defaultSections,
    cta: "طور متجر Shopify",
    related: [
      { label: "Google Ads", href: "/ar/google-ads-dubai" },
      { label: "مركز البيانات", href: "/ar/datasets" },
      { label: "أدوات النمو", href: "/ar/tools" },
    ],
  },
  "/services/ui-ux-design-dubai": {
    title: "تصميم UI/UX في دبي",
    eyebrow: "تجربة المستخدم",
    description: "تصميم واجهات وتجارب مستخدم تساعد العملاء في الإمارات على الفهم، المقارنة، واتخاذ القرار بسرعة.",
    sections: defaultSections,
    cta: "ابدأ مشروع UX",
    related: defaultRelated,
  },
  "/services/ai-ecommerce": {
    title: "التجارة الإلكترونية بالذكاء الاصطناعي",
    eyebrow: "AI E-commerce",
    description: "أنظمة تجارة إلكترونية تستخدم الذكاء الاصطناعي لتحسين المحتوى، التوصيات، التحويل، ورؤية المنتجات.",
    sections: defaultSections,
    cta: "اكتشف فرص التجارة الذكية",
    related: defaultRelated,
  },
  "/services/digital-marketing": {
    title: "التسويق الرقمي في دبي",
    eyebrow: "التسويق الرقمي",
    description: "استراتيجيات تسويق رقمية للشركات التي تحتاج إلى نمو قابل للقياس عبر البحث، المحتوى، الحملات، والتحويل.",
    sections: defaultSections,
    cta: "اطلب خطة نمو",
    related: defaultRelated,
  },
  "/services/google-ads-dubai": {
    title: "إدارة إعلانات جوجل في دبي",
    eyebrow: "Google Ads",
    description: "إدارة إعلانات جوجل للشركات في دبي والإمارات مع إعداد GA4 وGoogle Tag Manager وتتبع التحويلات وصفحات الهبوط وتحسين جودة العملاء المحتملين وتوثيق نمو المبيعات.",
    sections: [
      {
        title: "إدارة حملات البحث وPerformance Max",
        body: "نبني الحملات حول نية البحث في دبي والإمارات، ونربط الكلمات المفتاحية وصفحات الهبوط والميزانية والتحويلات حتى لا يتحول الإنفاق إلى زيارات غير مؤهلة.",
      },
      {
        title: "إعداد التطبيق والتحويلات",
        body: "للتطبيقات والمواقع، نحدد أحداث التثبيت والتسجيل والشراء والاشتراك والنماذج وواتساب والمكالمات حتى تكون الحملة قابلة للقياس والتحسين.",
      },
      {
        title: "تقرير نمو قابل للتوثيق",
        body: "نربط بيانات الإعلانات بجودة العملاء المحتملين وملاحظات المبيعات ونتائج الأعمال الموثقة حتى يمكن استخدامها في التقارير الداخلية أو مواد إعلامية عند توفر أرقام مؤكدة.",
      },
    ],
    cta: "اطلب تدقيق إعلانات جوجل",
    related: [
      { label: "إعلانات ميتا", href: "/ar/services/meta-ads-dubai" },
      { label: "التسويق الرقمي", href: "/ar/services/digital-marketing" },
      { label: "وكلاء الذكاء الاصطناعي", href: "/ar/services/uae-ai-agent" },
    ],
  },
  "/services/meta-ads-dubai": {
    title: "إدارة إعلانات ميتا في دبي",
    eyebrow: "Meta Ads",
    description: "إدارة إعلانات فيسبوك وإنستغرام في دبي مع Meta Pixel وConversions API وإعلانات واتساب ونماذج العملاء المحتملين وحملات التطبيقات وتقارير نمو المبيعات.",
    sections: [
      {
        title: "إعلانات فيسبوك وإنستغرام",
        body: "نخطط الحملات حسب الجمهور والقطاع والرسالة الإبداعية، مع اختبارات للريلز والصور والكروسل والعروض وصفحات الهبوط ومسارات واتساب.",
      },
      {
        title: "Pixel وConversions API",
        body: "نضبط أحداث Meta Pixel وCAPI مثل المشاهدة، العميل المحتمل، الشراء، الحجز، النقر على واتساب، وأحداث التطبيق المهمة لرفع دقة القياس.",
      },
      {
        title: "إثبات جودة العملاء والمبيعات",
        body: "نفرق بين عدد العملاء الخام والعملاء المؤهلين عبر إجابات النماذج ومحادثات واتساب وملاحظات فريق المبيعات ونتائج النمو الموثقة.",
      },
    ],
    cta: "اطلب تدقيق إعلانات ميتا",
    related: [
      { label: "إعلانات جوجل", href: "/ar/services/google-ads-dubai" },
      { label: "التسويق الرقمي", href: "/ar/services/digital-marketing" },
      { label: "مركز ظهور الذكاء الاصطناعي", href: "/ar/knowledge/ai-visibility" },
    ],
  },
  "/services/maintenance-management": {
    title: "إدارة صيانة المواقع والأنظمة",
    eyebrow: "الصيانة",
    description: "متابعة تقنية مستمرة للمواقع والمنصات لضمان الأداء، الأمان، الفهرسة، وتحديثات المحتوى.",
    sections: defaultSections,
    cta: "اطلب خطة صيانة",
    related: defaultRelated,
  },
  "/industries": {
    title: "القطاعات التي نخدمها في الإمارات",
    eyebrow: "القطاعات",
    description: "خبرة رقمية موجهة لقطاعات العطور، التجزئة، العقار، الضيافة، الرعاية الصحية، والخدمات المهنية في الإمارات والخليج.",
    sections: defaultSections,
    cta: "اختر قطاعك",
    related: defaultRelated,
  },
  "/blog": {
    title: "مدونة ومعرفة Vista by Lara",
    eyebrow: "المعرفة",
    description: "تحليلات حول SEO وAEO وGEO، الذكاء الاصطناعي، المواقع عالية الأداء، والثقة الرقمية للشركات في الإمارات والخليج.",
    sections: defaultSections,
    cta: "اقرأ دليل الظهور في الذكاء الاصطناعي",
    related: defaultRelated,
  },
  "/knowledge": {
    title: "مركز المعرفة في Vista by Lara",
    eyebrow: "منصة المعرفة",
    description: "موارد بحثية حول ظهور الذكاء الاصطناعي، GEO، AEO، SEO، الثقة الرقمية، البيانات المنظمة، والنمو الرقمي في الإمارات.",
    sections: [
      { title: "محتوى قابل للفهم من الذكاء الاصطناعي", body: "كل مورد معرفي يحتوي على ملخص تنفيذي، ملخص للذكاء الاصطناعي، كيانات واضحة، روابط داخلية، وبيانات منظمة." },
      { title: "علاقات دلالية بين الصفحات", body: "نربط الخدمات، الأدوات، الأبحاث، المصطلحات، ودراسات الحالة حتى لا تبقى أي صفحة معزولة." },
      { title: "منصة تتطور باستمرار", body: "تتم مراجعة الموارد وتحديثها مع تطور البحث، GEO، AEO، وأنظمة الإجابة بالذكاء الاصطناعي." },
    ],
    cta: "استكشف مركز المعرفة",
    related: [
      { label: "خريطة الكيانات", href: "/ar/entity-map" },
      { label: "مركز الأبحاث", href: "/ar/research" },
      { label: "فهرس الذكاء الاصطناعي", href: "/ar/ai" },
    ],
  },
  "/knowledge/ai-visibility": {
    title: "مركز ظهور الذكاء الاصطناعي",
    eyebrow: "AI Visibility",
    description: "الصفحة الرئيسية لكل موارد Vista by Lara حول ظهور الذكاء الاصطناعي، الثقة الرقمية، GEO، AEO، الكيانات، والخرائط المعرفية.",
    sections: defaultSections,
    cta: "اقرأ الدليل الرئيسي",
    related: [
      { label: "الدليل الرئيسي", href: "/ar/knowledge/ai-visibility/why-ai-isnt-recommending-your-business" },
      { label: "أداة التقييم", href: "/ar/tools/ai-visibility-score" },
      { label: "قاموس المصطلحات", href: "/ar/knowledge/glossary" },
    ],
  },
  "/knowledge/glossary": {
    title: "قاموس ظهور الذكاء الاصطناعي",
    eyebrow: "المصطلحات",
    description: "قاموس عربي للمصطلحات الأساسية في AI Visibility وGEO وAEO وEntity SEO والبيانات المنظمة والبحث الدلالي.",
    sections: defaultSections,
    cta: "تصفح المصطلحات",
    related: defaultRelated,
  },
  "/knowledge/timeline": {
    title: "الخط الزمني للمعرفة",
    eyebrow: "التحديثات",
    description: "سجل لتطور موضوعات AI Visibility وتحديثات البحث والذكاء الاصطناعي وإصدارات موارد Vista by Lara.",
    sections: defaultSections,
    cta: "استعرض الخط الزمني",
    related: defaultRelated,
  },
  "/tools": {
    title: "مختبر أدوات الذكاء الاصطناعي",
    eyebrow: "الأدوات",
    description: "مختبر أدوات للتدقيق في SEO وGEO وAI Visibility والكيانات والبيانات المنظمة والتحويل والتجارة الإلكترونية.",
    sections: defaultSections,
    cta: "استعرض الأدوات",
    related: defaultRelated,
  },
  "/tools/ai-visibility-score": {
    title: "درجة ظهور الذكاء الاصطناعي",
    eyebrow: "أداة قريبا",
    description: "أداة قادمة لقياس جاهزية النشاط التجاري للظهور في إجابات الذكاء الاصطناعي بناء على البيانات المنظمة، الثقة الرقمية، المحتوى، الروابط، والسلطة.",
    sections: defaultSections,
    cta: "اطلب تدقيقا يدويا",
    related: defaultRelated,
  },
  "/entity-map": {
    title: "خريطة الكيانات في Vista",
    eyebrow: "الرسم المعرفي",
    description: "خريطة تربط خدمات Vista by Lara وGoogle Ads وShopify وGA4 وCRO وAI Visibility ودبي والأبحاث والأدوات والبيانات.",
    sections: defaultSections,
    cta: "استكشف الرسم المعرفي",
    related: defaultRelated,
  },
  "/research": {
    title: "مركز الأبحاث",
    eyebrow: "الأبحاث",
    description: "مركز أبحاث Vista by Lara لبيانات Google Ads وShopify وAI Visibility وGEO وCRO في الإمارات والخليج.",
    sections: defaultSections,
    cta: "استعرض الأبحاث",
    related: defaultRelated,
  },
  "/datasets": {
    title: "سجل البيانات",
    eyebrow: "Datasets",
    description: "سجل بيانات للمعايير المستقبلية مثل تكلفة Google Ads في الإمارات، أداء Shopify، Core Web Vitals، وتكرار الاستشهاد في الذكاء الاصطناعي.",
    sections: defaultSections,
    cta: "افتح سجل البيانات",
    related: defaultRelated,
  },
  "/trust": {
    title: "لوحة الثقة",
    eyebrow: "EEAT",
    description: "لوحة تعرض إشارات الثقة والجوائز والخبرة ودراسات الحالة والأبحاث والمعلومات التجارية الموثقة في Vista by Lara.",
    sections: defaultSections,
    cta: "راجع إشارات الثقة",
    related: defaultRelated,
  },
  "/ai": {
    title: "فهرس وكلاء الذكاء الاصطناعي",
    eyebrow: "AI Agent Index",
    description: "خريطة مخصصة لأنظمة الذكاء الاصطناعي لاكتشاف خدمات Vista by Lara وواجهات API والأدوات والمعرفة وطرق التواصل.",
    sections: defaultSections,
    cta: "افتح فهرس الذكاء الاصطناعي",
    related: defaultRelated,
  },
  "/case-studies": {
    title: "سجل الهندسة ودراسات الحالة",
    eyebrow: "السجل",
    description: "ملفات عمل وتقارير تقنية توضح كيف تبني Vista by Lara البنية الرقمية، التحويل، والظهور القابل للقياس.",
    sections: defaultSections,
    cta: "استعرض السجل",
    related: defaultRelated,
  },
  "/clients": {
    title: "عملاء Vista by Lara",
    eyebrow: "العملاء",
    description: "ثقة عملاء وشركات في الإمارات والخليج احتاجوا إلى هوية، مواقع، تجارة إلكترونية، وظهور رقمي أقوى.",
    sections: defaultSections,
    cta: "تحدث عن مشروعك",
    related: defaultRelated,
  },
  "/pricing": {
    title: "الأسعار ونطاقات المشاريع",
    eyebrow: "الأسعار",
    description: "نطاقات أسعار واضحة لمشاريع الهوية، المواقع، التطوير، SEO، وظهور الذكاء الاصطناعي في الإمارات.",
    sections: defaultSections,
    cta: "اطلب تقديرا مناسبا",
    related: defaultRelated,
  },
  "/contact": {
    title: "تواصل مع Vista by Lara",
    eyebrow: "التواصل",
    description: "تواصل مع فريق Vista by Lara في دبي لمناقشة موقع، هوية، منصة، SEO، أو مشروع ظهور في الذكاء الاصطناعي.",
    sections: defaultSections,
    cta: "تواصل عبر واتساب",
    related: defaultRelated,
  },
  "/careers": {
    title: "الوظائف في Vista by Lara",
    eyebrow: "الوظائف",
    description: "فرص للمهنيين الذين يريدون العمل على التصميم، التطوير، الذكاء الاصطناعي، وتسويق النمو في الإمارات والخليج.",
    sections: defaultSections,
    cta: "أرسل اهتمامك",
    related: defaultRelated,
  },
  "/privacy": {
    title: "سياسة الخصوصية",
    eyebrow: "قانوني",
    description: "توضح هذه الصفحة كيف تتعامل Vista by Lara مع بيانات التواصل، الاستفسارات، والتحليلات بطريقة مسؤولة.",
    sections: defaultSections,
    cta: "راسل الفريق",
    related: defaultRelated,
  },
  "/terms": {
    title: "الشروط والأحكام",
    eyebrow: "قانوني",
    description: "شروط استخدام موقع Vista by Lara والمعلومات العامة حول الخدمات والمحتوى والاستفسارات.",
    sections: defaultSections,
    cta: "اطلب توضيحا",
    related: defaultRelated,
  },
  "/cookies": {
    title: "سياسة ملفات تعريف الارتباط",
    eyebrow: "قانوني",
    description: "معلومات حول استخدام ملفات تعريف الارتباط والتحليلات لتحسين تجربة الموقع وقياس الأداء.",
    sections: defaultSections,
    cta: "تواصل معنا",
    related: defaultRelated,
  },
}

const industryNames: Record<string, string> = {
  fragrance: "قطاع العطور",
  retail: "قطاع التجزئة",
  "building-maintenance": "قطاع صيانة المباني",
  "ecommerce-shopify": "التجارة الإلكترونية وShopify",
  "real-estate-property": "العقارات والأصول",
  "hospitality-fnb": "الضيافة والمطاعم",
  "clinics-healthcare": "العيادات والرعاية الصحية",
  "professional-services": "الخدمات المهنية",
  "luxury-lifestyle": "الفخامة ونمط الحياة",
}

export function getArabicPage(path: string): ArabicPageContent {
  const normalized = path === "" ? "/" : path
  if (pages[normalized]) return pages[normalized]

  const industryMatch = normalized.match(/^\/industries\/([^/]+)/)
  if (industryMatch) {
    const name = industryNames[industryMatch[1]] || "قطاع متخصص"
    return {
      title: `${name} في الإمارات`,
      eyebrow: "حلول قطاعية",
      description: `حلول رقمية موجهة إلى ${name} في دبي والإمارات، تشمل الهوية، المواقع، تحسين الظهور، وتجربة المستخدم.`,
      sections: defaultSections,
      cta: "ناقش احتياجات القطاع",
      related: defaultRelated,
    }
  }

  if (/^\/blog\/([^/]+)/.test(normalized)) {
    return {
      title: "مقالة معرفة من Vista by Lara",
      eyebrow: "المدونة",
      description: "نسخة عربية مهيأة للقراءة والفهرسة من محتوى Vista by Lara حول الذكاء الاصطناعي، SEO، AEO، GEO، والبنية الرقمية في الإمارات.",
      sections: defaultSections,
      cta: "اقرأ المزيد من المعرفة",
      related: defaultRelated,
    }
  }

  if (/^\/case-studies\/([^/]+)/.test(normalized)) {
    return {
      title: "دراسة حالة من Vista by Lara",
      eyebrow: "سجل الهندسة",
      description: "نسخة عربية من دراسة حالة توضح العمل التقني، سياق السوق، والنتائج الرقمية ضمن مشاريع Vista by Lara.",
      sections: defaultSections,
      cta: "اطلب جلسة تقنية",
      related: defaultRelated,
    }
  }

  return {
    title: "Vista by Lara بالعربية",
    eyebrow: "نسخة عربية",
    description: "صفحة عربية من Vista by Lara للشركات في دبي والإمارات والخليج، مهيأة للقراءة من المستخدمين ومحركات البحث وأنظمة الذكاء الاصطناعي.",
    sections: defaultSections,
    cta: "تواصل مع الفريق",
    related: defaultRelated,
  }
}
