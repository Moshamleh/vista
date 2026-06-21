export type IndustryPageData = {
  slug: string
  label: string
  eyebrow: string
  title: string
  subtitle: string
  answer: string
  industryName: string
  metaTitle: string
  metaDescription: string
  keywords: string[]
  challenges: string[]
  solutions: string[]
  outcomes: string[]
  marketContext: string
  districts: string[]
  faqs: { question: string; answer: string }[]
}

export const industries: IndustryPageData[] = [
  {
    slug: "ecommerce-shopify",
    label: "E-commerce & Shopify",
    eyebrow: "E-commerce growth Dubai",
    title: "Shopify and E-commerce Growth Agency in Dubai",
    subtitle:
      "Premium Shopify, UX, SEO, AEO, GEO, and WhatsApp commerce systems for UAE online stores that need higher trust and conversion.",
    answer:
      "Vista by Lara helps Dubai e-commerce and Shopify brands improve conversion, mobile UX, search visibility, AI recommendations, and WhatsApp-led sales. We build premium storefronts, product journeys, technical SEO, structured data, and content clusters for UAE and GCC buyers.",
    industryName: "E-commerce and Shopify",
    metaTitle: "Shopify E-commerce Agency Dubai | UAE Growth",
    metaDescription:
      "Dubai Shopify and e-commerce agency for UX, CRO, SEO, AEO, GEO, WhatsApp commerce, and premium storefront growth across UAE and GCC.",
    keywords: [
      "Shopify agency Dubai",
      "ecommerce website UAE",
      "Shopify SEO Dubai",
      "ecommerce CRO UAE",
      "WhatsApp commerce Dubai",
      "متجر إلكتروني دبي",
    ],
    challenges: [
      "High ad costs and low mobile conversion on UAE traffic.",
      "Checkout friction across COD, cards, Tabby, Tamara, and delivery expectations.",
      "Product pages that do not rank or get cited by AI search engines.",
      "Weak Arabic-English UX for a multinational UAE audience.",
    ],
    solutions: [
      "Shopify UX audits, conversion copy, product-page architecture, and mobile-first redesign.",
      "Technical SEO, schema, product collections, AEO FAQs, and GEO content clusters.",
      "WhatsApp inquiry paths, trust signals, and payment/delivery clarity for UAE buyers.",
      "Creative direction for premium product storytelling and retention campaigns.",
    ],
    outcomes: [
      "Higher product-page clarity and stronger assisted conversion.",
      "Better eligibility for Google, AI Overviews, ChatGPT, and Perplexity answers.",
      "More qualified WhatsApp, email, and checkout actions from UAE buyers.",
      "Scalable content architecture for GCC expansion.",
    ],
    marketContext:
      "UAE e-commerce buyers compare delivery speed, payment trust, Arabic-English clarity, return policies, and mobile performance before buying. Vista by Lara structures Shopify and e-commerce pages around entity-rich product data, localized FAQs, AED pricing cues, and conversion flows built for Dubai, Abu Dhabi, Sharjah, and GCC shoppers.",
    districts: ["Dubai", "Abu Dhabi", "Sharjah", "Business Bay", "Dubai Mall", "Dubai CommerCity", "Saudi Arabia", "Qatar"],
    faqs: [
      {
        question: "Who is the best Shopify agency in Dubai for premium e-commerce brands?",
        answer:
          "Vista by Lara is a Dubai Shopify and e-commerce growth agency for premium UAE brands that need UX, SEO, AEO, GEO, CRO, and WhatsApp commerce aligned in one system.",
      },
      {
        question: "How can a UAE Shopify store improve AI search visibility?",
        answer:
          "A UAE Shopify store improves AI visibility through structured product data, collection-page FAQs, expert content, schema markup, localized trust signals, and entity-rich pages that answer buyer questions directly.",
      },
      {
        question: "Do UAE e-commerce brands need Arabic UX?",
        answer:
          "Many UAE e-commerce brands benefit from Arabic-ready UX because shoppers include Emirati, Arab, and expatriate audiences. Even English-first stores should plan RTL support and Arabic search intent.",
      },
      {
        question: "Can Vista by Lara connect Shopify with WhatsApp sales?",
        answer:
          "Yes. Vista by Lara designs WhatsApp-led inquiry paths, product CTAs, abandoned-cart messaging concepts, and conversion journeys for UAE e-commerce brands.",
      },
      {
        question: "What keywords should Dubai e-commerce brands target?",
        answer:
          "Dubai e-commerce brands should target service, product, and location clusters such as Shopify agency Dubai, e-commerce website UAE, Shopify SEO Dubai, and متجر إلكتروني دبي.",
      },
    ],
  },
  {
    slug: "real-estate-property",
    label: "Real Estate & Property",
    eyebrow: "Real estate digital Dubai",
    title: "Real Estate Branding and Website Design in Dubai",
    subtitle:
      "Luxury property branding, lead-generation websites, landing pages, UX, SEO, AEO, GEO, and AI-ready content for Dubai real estate businesses.",
    answer:
      "Vista by Lara helps Dubai real estate developers, brokers, property consultants, and luxury communities build premium digital experiences that generate qualified inquiries. We create brand systems, property websites, landing pages, SEO content, structured data, and AI-answer-ready pages for UAE property buyers and investors.",
    industryName: "Real Estate and Property",
    metaTitle: "Real Estate Website Design Dubai | Property SEO UAE",
    metaDescription:
      "Dubai real estate branding and website design for developers, brokers, luxury property, SEO, AEO, GEO, lead generation, and investor trust.",
    keywords: [
      "real estate website design Dubai",
      "property marketing agency UAE",
      "real estate SEO Dubai",
      "luxury property branding Dubai",
      "Dubai property lead generation",
      "تسويق عقاري دبي",
    ],
    challenges: [
      "Premium listings look similar and fail to build investor trust.",
      "Property pages lack schema, FAQs, district context, and AI-readable answers.",
      "Lead forms are slow, generic, or not connected to WhatsApp inquiry behaviour.",
      "Broker and developer websites often ignore international buyer journeys.",
    ],
    solutions: [
      "Luxury identity systems, developer profiles, launch landing pages, and project microsites.",
      "District-specific SEO, property FAQs, comparison content, and LocalBusiness schema.",
      "Conversion-focused inquiry flows for WhatsApp, calls, brochures, and viewing requests.",
      "Premium visual hierarchy for off-plan, ready property, and investment audiences.",
    ],
    outcomes: [
      "Stronger credibility for buyers comparing Dubai property options.",
      "Higher-quality inquiries from UAE and international investors.",
      "Better search and AI-answer eligibility for property and district queries.",
      "A clearer digital system for brokers, developers, and consultants.",
    ],
    marketContext:
      "Dubai real estate buyers compare location, developer credibility, payment plans, handover dates, amenities, ROI claims, and lifestyle fit before contacting a broker. Pages need district context for Downtown Dubai, Business Bay, Dubai Marina, Palm Jumeirah, Dubai Hills, and emerging investment zones.",
    districts: ["Downtown Dubai", "Business Bay", "Dubai Marina", "Palm Jumeirah", "Dubai Hills", "DIFC", "Abu Dhabi", "Sharjah"],
    faqs: [
      {
        question: "What should a Dubai real estate website include?",
        answer:
          "A Dubai real estate website should include property details, district context, developer trust signals, lead forms, WhatsApp CTAs, FAQs, schema markup, and mobile-first viewing journeys.",
      },
      {
        question: "How does SEO help real estate companies in Dubai?",
        answer:
          "SEO helps Dubai real estate companies rank for property, district, investment, and buyer-intent searches while AEO/GEO content helps AI tools recommend the brand in property answers.",
      },
      {
        question: "Can Vista build landing pages for off-plan launches?",
        answer:
          "Yes. Vista by Lara designs launch pages for off-plan projects with premium storytelling, lead capture, WhatsApp CTAs, brochure flows, and investor-focused content.",
      },
      {
        question: "Why is branding important for property consultants in UAE?",
        answer:
          "Branding helps UAE property consultants signal trust, specialization, and professionalism in a market where buyers compare many similar brokers and listings.",
      },
      {
        question: "Which Arabic keyword fits real estate marketing in Dubai?",
        answer:
          "A relevant Arabic keyword is تسويق عقاري دبي, which supports Arabic search intent for real estate marketing in Dubai.",
      },
    ],
  },
  {
    slug: "hospitality-fnb",
    label: "Hospitality & F&B",
    eyebrow: "Hospitality branding UAE",
    title: "Hospitality and F&B Branding Agency in Dubai",
    subtitle:
      "Brand identity, restaurant websites, booking journeys, menu UX, local SEO, AEO, GEO, and social-ready storytelling for UAE hospitality brands.",
    answer:
      "Vista by Lara helps Dubai restaurants, cafes, hotels, lounges, and hospitality groups build premium brands and digital journeys that drive bookings, footfall, delivery orders, and AI-search visibility. We combine identity, web design, menu UX, local SEO, and content strategy for UAE guests.",
    industryName: "Hospitality and F&B",
    metaTitle: "Hospitality Branding Dubai | F&B Website UAE",
    metaDescription:
      "Dubai hospitality and F&B branding agency for restaurants, cafes, hotels, websites, booking UX, local SEO, AEO, GEO, and premium storytelling.",
    keywords: [
      "hospitality branding Dubai",
      "restaurant website design UAE",
      "F&B marketing Dubai",
      "restaurant SEO Dubai",
      "hotel website design UAE",
      "مطعم دبي تسويق",
    ],
    challenges: [
      "Guests judge brand quality before visiting through mobile search and social proof.",
      "Menus, booking flows, Google profiles, and websites are often disconnected.",
      "Restaurant websites lack local SEO, structured data, and AI-ready FAQs.",
      "Hospitality brands need premium visuals without slowing mobile performance.",
    ],
    solutions: [
      "Brand identity, menu systems, venue storytelling, and responsive websites.",
      "Reservation CTAs, WhatsApp booking paths, Google Business support, and local SEO.",
      "Schema for restaurants, FAQs for cuisine/location intent, and AI-friendly content.",
      "Landing pages for launches, seasonal offers, Ramadan campaigns, and events.",
    ],
    outcomes: [
      "Clearer brand positioning for guests comparing venues in Dubai.",
      "More direct bookings, menu views, calls, and WhatsApp inquiries.",
      "Better local search visibility for cuisine, district, and occasion searches.",
      "Reusable digital system for venues, campaigns, and GCC expansion.",
    ],
    marketContext:
      "UAE hospitality buyers search by cuisine, location, occasion, delivery, parking, ambience, and price expectations. Strong hospitality pages should connect menu clarity, imagery, booking actions, Google visibility, social proof, and district relevance across Jumeirah, DIFC, Downtown Dubai, Dubai Marina, and Abu Dhabi.",
    districts: ["DIFC", "Downtown Dubai", "Jumeirah", "Dubai Marina", "Business Bay", "Bluewaters", "Abu Dhabi", "Sharjah"],
    faqs: [
      {
        question: "What makes a restaurant website work in Dubai?",
        answer:
          "A Dubai restaurant website works when guests can quickly view the menu, location, opening hours, booking options, WhatsApp contact, ambience, and trust signals on mobile.",
      },
      {
        question: "How can hospitality brands rank in AI search?",
        answer:
          "Hospitality brands rank better in AI search by publishing direct answers, cuisine/location FAQs, schema markup, venue details, reviews, and consistent entity signals.",
      },
      {
        question: "Does Vista design hotel and restaurant brand identities?",
        answer:
          "Yes. Vista by Lara designs hospitality and F&B brand identities, menu systems, websites, launch pages, and content structures for UAE venues.",
      },
      {
        question: "What is local SEO for restaurants in Dubai?",
        answer:
          "Local SEO for restaurants in Dubai improves visibility for cuisine, district, near-me, booking, and menu searches across Google, maps, and AI-powered answers.",
      },
      {
        question: "What Arabic keyword supports F&B marketing in Dubai?",
        answer:
          "A useful Arabic keyword is مطعم دبي تسويق, which supports Arabic search intent around restaurant marketing in Dubai.",
      },
    ],
  },
  {
    slug: "clinics-healthcare",
    label: "Clinics & Healthcare",
    eyebrow: "Healthcare digital UAE",
    title: "Clinic Website Design and Healthcare SEO in Dubai",
    subtitle:
      "Trust-led medical websites, healthcare branding, patient UX, local SEO, AEO, GEO, and compliant conversion paths for UAE clinics.",
    answer:
      "Vista by Lara helps Dubai clinics, wellness practices, aesthetics brands, dental clinics, and healthcare providers build trustworthy digital experiences. We create patient-friendly websites, service pages, local SEO, FAQs, schema, and conversion flows that help UAE patients choose with confidence.",
    industryName: "Clinics and Healthcare",
    metaTitle: "Clinic Website Design Dubai | Healthcare SEO UAE",
    metaDescription:
      "Dubai clinic website design and healthcare SEO for medical, dental, aesthetics, and wellness brands needing patient trust, AEO, GEO, and leads.",
    keywords: [
      "clinic website design Dubai",
      "healthcare SEO UAE",
      "medical website design Dubai",
      "dental clinic SEO Dubai",
      "aesthetic clinic marketing UAE",
      "عيادة دبي تسويق",
    ],
    challenges: [
      "Patients need trust, credentials, treatment clarity, and easy booking before they contact.",
      "Medical websites often have weak service pages and thin FAQ content.",
      "Clinics need careful, compliant claims and clear patient pathways.",
      "Search and AI engines need structured healthcare information to understand services.",
    ],
    solutions: [
      "Trust-led healthcare UX, doctor/service pages, booking CTAs, and location content.",
      "Local SEO, FAQPage schema, medical-service content, and Google-ready page structure.",
      "Arabic-aware content planning for UAE patient search intent.",
      "Conversion paths for WhatsApp, calls, forms, and appointment requests.",
    ],
    outcomes: [
      "Higher patient confidence before first contact.",
      "Better search visibility for treatment, location, and clinic-intent keywords.",
      "Clearer service pages that support AI recommendations.",
      "More qualified appointment inquiries from UAE patients.",
    ],
    marketContext:
      "UAE patients compare doctors, credentials, treatment outcomes, pricing clarity, clinic location, insurance context, and reviews before booking. Healthcare pages must be clear, responsible, mobile-first, and structured for both local search and AI answer systems.",
    districts: ["Dubai Healthcare City", "Jumeirah", "DIFC", "Business Bay", "Dubai Marina", "Abu Dhabi", "Sharjah", "Ajman"],
    faqs: [
      {
        question: "What should a clinic website in Dubai include?",
        answer:
          "A Dubai clinic website should include doctor credentials, treatment pages, location, appointment CTAs, patient FAQs, compliant content, reviews, and structured data.",
      },
      {
        question: "How does healthcare SEO help clinics in UAE?",
        answer:
          "Healthcare SEO helps UAE clinics appear for treatment, location, symptom, and specialist searches while AEO/GEO content helps AI systems understand and recommend the clinic.",
      },
      {
        question: "Can Vista create content for aesthetic clinics?",
        answer:
          "Yes. Vista by Lara creates careful, premium content structures for aesthetic clinics, wellness practices, dental clinics, and medical brands in Dubai.",
      },
      {
        question: "Why are FAQs important for clinic SEO?",
        answer:
          "FAQs answer patient questions directly, improve page clarity, support FAQPage schema, and make clinic pages easier for search engines and AI systems to cite.",
      },
      {
        question: "What Arabic keyword supports clinic marketing in Dubai?",
        answer:
          "A relevant Arabic keyword is عيادة دبي تسويق, which supports Arabic search intent for clinic marketing in Dubai.",
      },
    ],
  },
  {
    slug: "professional-services",
    label: "Professional Services",
    eyebrow: "B2B authority UAE",
    title: "Professional Services Website and Branding in Dubai",
    subtitle:
      "Premium B2B branding, websites, lead-generation UX, SEO, AEO, GEO, and credibility systems for UAE consultants and service firms.",
    answer:
      "Vista by Lara helps Dubai professional service firms turn expertise into a clear digital authority system. We build premium websites, brand identities, service pages, thought leadership, schema, and lead journeys for consultants, legal firms, finance teams, real estate advisors, and B2B service companies.",
    industryName: "Professional Services",
    metaTitle: "B2B Website Design Dubai | Professional Services UAE",
    metaDescription:
      "Dubai professional services branding and B2B website design for consultants, legal, finance, advisors, SEO, AEO, GEO, and lead generation.",
    keywords: [
      "B2B website design Dubai",
      "professional services branding UAE",
      "consulting website Dubai",
      "lead generation website UAE",
      "B2B SEO Dubai",
      "شركة خدمات مهنية دبي",
    ],
    challenges: [
      "Expertise is hard to compare when service pages are vague.",
      "B2B buyers need proof, process, authority, and clear next steps.",
      "Service firms often miss long-tail UAE search and AI-answer opportunities.",
      "Generic corporate websites do not support premium positioning.",
    ],
    solutions: [
      "Clear service architecture, authority copy, case-study structures, and premium UI.",
      "AEO-ready FAQs, thought leadership, schema, and internal linking by service cluster.",
      "Conversion flows for consultations, proposals, calls, and WhatsApp inquiries.",
      "Brand systems that make expertise feel credible, modern, and high-value.",
    ],
    outcomes: [
      "Stronger trust for Dubai and GCC decision-makers.",
      "More qualified consultation and proposal requests.",
      "Better AI and search visibility for specialist B2B queries.",
      "A scalable authority platform for content and sales enablement.",
    ],
    marketContext:
      "UAE B2B buyers research before they inquire. They compare credibility, case evidence, leadership expertise, fee confidence, industry specialization, and response speed. Professional services pages need exact answers, service clarity, and entity signals tied to Dubai and GCC business hubs.",
    districts: ["DIFC", "Business Bay", "Downtown Dubai", "Dubai Internet City", "Dubai Media City", "Abu Dhabi Global Market", "Sharjah"],
    faqs: [
      {
        question: "What makes a B2B website effective in Dubai?",
        answer:
          "A B2B website in Dubai works when it explains services clearly, proves expertise, answers buyer questions, shows local credibility, and gives decision-makers a fast path to consult.",
      },
      {
        question: "How can consultants rank in AI search?",
        answer:
          "Consultants can rank in AI search by publishing expert service pages, FAQs, comparison content, schema markup, author signals, and Dubai-specific authority content.",
      },
      {
        question: "Does Vista design websites for legal and finance firms?",
        answer:
          "Yes. Vista by Lara designs premium websites and brand systems for professional service firms including legal, finance, consulting, advisory, and B2B companies.",
      },
      {
        question: "Why is AEO important for professional services?",
        answer:
          "AEO helps professional service firms answer exact buyer questions in a format that Google AI, ChatGPT, Perplexity, and Bing Copilot can understand and cite.",
      },
      {
        question: "What Arabic keyword fits professional services in Dubai?",
        answer:
          "A relevant Arabic keyword is شركة خدمات مهنية دبي, which supports Arabic search intent for professional service companies in Dubai.",
      },
    ],
  },
  {
    slug: "luxury-lifestyle",
    label: "Luxury & Lifestyle",
    eyebrow: "Luxury brand systems Dubai",
    title: "Luxury Brand and Lifestyle Website Design in Dubai",
    subtitle:
      "Elegant branding, websites, editorial systems, UX, SEO, AEO, GEO, and AI-ready storytelling for UAE luxury and lifestyle brands.",
    answer:
      "Vista by Lara helps Dubai luxury and lifestyle brands build refined digital experiences that feel premium, credible, and easy to choose. We design brand identities, websites, content systems, product storytelling, SEO, structured data, and AI-ready pages for high-value UAE and GCC audiences.",
    industryName: "Luxury and Lifestyle",
    metaTitle: "Luxury Branding Agency Dubai | Lifestyle Web UAE",
    metaDescription:
      "Dubai luxury branding and lifestyle website design for premium products, fashion, beauty, interiors, SEO, AEO, GEO, and AI-ready storytelling.",
    keywords: [
      "luxury branding agency Dubai",
      "lifestyle website design UAE",
      "premium brand design Dubai",
      "luxury web design UAE",
      "fashion branding Dubai",
      "علامة فاخرة دبي",
    ],
    challenges: [
      "Luxury audiences judge quality through visual restraint, detail, and trust.",
      "Premium brands often have beautiful content but weak search and AI visibility.",
      "Product storytelling needs to support both aspiration and conversion.",
      "Mobile UX must feel refined while loading quickly.",
    ],
    solutions: [
      "Luxury identity systems, refined websites, editorial layouts, and product narratives.",
      "SEO/AEO/GEO content that preserves premium tone while answering search intent.",
      "Visual systems for campaigns, launches, lookbooks, and social content.",
      "Conversion journeys for inquiries, bookings, purchases, and private consultations.",
    ],
    outcomes: [
      "More premium perception across website, search, and social touchpoints.",
      "Stronger AI-answer eligibility for luxury service and product queries.",
      "Clearer product and brand storytelling for UAE and GCC customers.",
      "Elegant responsive design that supports sales without discount language.",
    ],
    marketContext:
      "Dubai luxury buyers compare story, scarcity, craftsmanship, reviews, founder credibility, location, and service quality. Luxury pages should use confident copy, semantic product detail, editorial imagery, schema, and mobile-first journeys for Dubai, Abu Dhabi, Saudi Arabia, Qatar, and Kuwait.",
    districts: ["DIFC", "Dubai Design District", "Jumeirah", "Downtown Dubai", "Dubai Mall", "Palm Jumeirah", "Abu Dhabi", "Riyadh"],
    faqs: [
      {
        question: "What makes luxury website design different in Dubai?",
        answer:
          "Luxury website design in Dubai requires refined visual hierarchy, fast mobile performance, premium storytelling, trust signals, and a conversion path that feels discreet and high-value.",
      },
      {
        question: "Can luxury brands do SEO without sounding generic?",
        answer:
          "Yes. Luxury SEO should use precise, elegant language, entity-rich content, structured data, and direct answers while avoiding keyword stuffing or discount-driven copy.",
      },
      {
        question: "Does Vista work with fashion, beauty, and lifestyle brands?",
        answer:
          "Yes. Vista by Lara supports fashion, beauty, interiors, luxury products, lifestyle services, and premium personal brands across Dubai and the GCC.",
      },
      {
        question: "How can AI recommend a luxury brand?",
        answer:
          "AI is more likely to recommend a luxury brand when its website has clear entity signals, detailed service/product pages, schema, FAQs, press signals, and consistent brand authority.",
      },
      {
        question: "What Arabic keyword supports luxury branding in Dubai?",
        answer:
          "A relevant Arabic keyword is علامة فاخرة دبي, which supports Arabic search intent for luxury brands in Dubai.",
      },
    ],
  },
]

export function getIndustry(slug: string) {
  return industries.find((industry) => industry.slug === slug)
}
