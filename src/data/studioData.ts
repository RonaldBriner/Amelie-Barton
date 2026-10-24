export interface GMBServiceItem {
  id: string;
  number: string;
  title: string;
  category: 'Web & Engineering' | 'Local SEO & GMB' | 'Commerce & Growth';
  categoryLabel: string;
  description: string;
  deliverables: string[];
  timeline: string;
  startingPrice: number;
  outcomeMetric: string;
  featured: boolean;
}

export interface StudioPackage {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  turnaround: string;
  recommendedFor: string;
  highlight?: boolean;
  coreDeliverables: string[];
  seoIncluded: string;
  guarantee: string;
}

export interface PackageAddon {
  id: string;
  title: string;
  description: string;
  price: number;
  timelineImpact: string;
}

export interface CaseStudy {
  id: string;
  client: string;
  sector: string;
  location: string;
  headline: string;
  summary: string;
  image: string;
  metrics: {
    value: string;
    label: string;
    timeframe: string;
  }[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
    organization: string;
  };
  servicesUsed: string[];
}

export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: 'Local SEO & GMB' | 'Web Architecture' | 'E-Commerce & Conversion' | 'WordPress & Speed';
  publishedDate: string;
  readTime: string;
  targetKeyword: string;
  coverImage: string;
  featured?: boolean;
  keyTakeaways: string[];
  sections: {
    heading: string;
    body: string[];
    highlightBox?: string;
  }[];
  checklistTitle: string;
  checklistItems: string[];
  relatedServiceId: string;
  ctaLabel: string;
}

export const STUDIO_INFO = {
  name: 'Amelie Barton',
  role: 'Website Designer',
  tagline: 'Modern Websites, Better Results.',
  subheadline:
    'Bespoke website design, clean frontend engineering, and Google Business Profile Local SEO for ambitious businesses in Sutton, Surrey, and Greater London.',
  location: {
    area: 'Sutton, United Kingdom',
    streetAddress: '1 Gemini Court, 42a Throwley Way',
    locality: 'Sutton',
    region: 'Greater London',
    country: 'United Kingdom',
    postcode: 'SM1 4AF',
    fullAddress: '1 Gemini Court, 42a Throwley Way, Sutton, United Kingdom, SM1 4AF',
    googleMapsUrl:
      'https://www.google.com/maps/search/?api=1&query=1+Gemini+Court+42a+Throwley+Way+Sutton+SM1+4AF+United+Kingdom',
    serviceAreas: ['Sutton SM1', 'Cheam', 'Carshalton', 'Epsom', 'Wimbledon', 'Kingston', 'Croydon', 'Central London'],
    openingHours: 'Mon–Fri: 09:00 – 18:00 · Sat: 10:00 – 15:00',
  },
  contact: {
    phone: '447915929263',
    phoneDisplay: '+44 (0)7915 929263',
    phoneHref: 'tel:+447915929263',
    whatsapp: '447915929263',
    whatsappHref:
      'https://wa.me/447915929263?text=Hi%20Amelie%2C%20I%27d%20like%20to%20discuss%20a%20website%20project.',
    email: 'amelie@ameliebarton.co.uk',
    emailHref: 'mailto:amelie@ameliebarton.co.uk',
  },
  images: {
    heroStudio: '/src/assets/images/hero_sutton_web_studio_1792854700213.jpg',
    ameliePortrait: '/src/assets/images/about_amelie_portrait_1792854701539.jpg',
    caseStudyCommerce: '/src/assets/images/case_study_luxury_commerce_1792854703064.jpg',
    blogLocalSeo: '/src/assets/images/blog_local_seo_sutton_1792854704630.jpg',
    blogConversion: '/src/assets/images/blog_ecommerce_conversion_1792854705130.jpg',
  },
  heroStats: [
    { value: '99/100', label: 'Core Web Vitals Mobile Speed Score', context: 'Verified Lighthouse Benchmark' },
    { value: '+215%', label: 'Average Local Map Pack Call Lift', context: 'Within 90 Days of Launch' },
    { value: '0.6s', label: 'Median First Contentful Paint', context: 'Clean Zero-Bloat Codebase' },
    { value: '1-on-1', label: 'Direct Sutton Studio Partnership', context: '1 Gemini Court, Throwley Way' },
  ],
};

export const GMB_SERVICES: GMBServiceItem[] = [
  {
    id: 'website-design',
    number: '01',
    title: 'Website Design',
    category: 'Web & Engineering',
    categoryLabel: 'Creative Direction',
    description:
      'Bespoke editorial layouts designed around your brand identity, built to engage visitors immediately and establish authority in your sector.',
    deliverables: ['Custom Figma UI/UX Wireframes', 'Editorial Typography System', 'Conversion-Focused Page Architecture', 'Interactive Prototype Review'],
    timeline: '2–3 Weeks',
    startingPrice: 1450,
    outcomeMetric: '+140% average increase in visitor dwell time',
    featured: true,
  },
  {
    id: 'website-development',
    number: '02',
    title: 'Website Development',
    category: 'Web & Engineering',
    categoryLabel: 'Frontend Engineering',
    description:
      'Modern, semantic frontend engineering that guarantees sub-second loading speeds, smooth micro-interactions, and accessible W3C-compliant code.',
    deliverables: ['Sub-Second Core Web Vitals Build', 'Semantic HTML5 & Schema.org Markup', 'SSL, CDN & Edge Hosting Setup', 'Cross-Browser QA Testing'],
    timeline: '2–4 Weeks',
    startingPrice: 1650,
    outcomeMetric: '98+ Google PageSpeed Performance on Mobile',
    featured: true,
  },
  {
    id: 'ecommerce-website',
    number: '03',
    title: 'E-Commerce Website',
    category: 'Commerce & Growth',
    categoryLabel: 'Digital Commerce',
    description:
      'Seamless online storefronts engineered for frictionless checkout, persuasive product merchandising, and sustained direct-to-consumer sales volume.',
    deliverables: ['Contiguous High-Converting PDP Layout', 'Apple Pay, Google Pay & Stripe Checkout', 'Automated Inventory & Tax Rules', 'Product Schema for Rich Snippets'],
    timeline: '3–5 Weeks',
    startingPrice: 2400,
    outcomeMetric: '+68% reduction in mobile cart abandonment',
    featured: true,
  },
  {
    id: 'google-business-profile-optimization',
    number: '04',
    title: 'Google Business Profile Optimization',
    category: 'Local SEO & GMB',
    categoryLabel: 'Local Map Pack Dominance',
    description:
      'Complete setup, primary/secondary category alignment, geo-tagged media, and local citation refinement so your business ranks in the top 3 on Google Maps.',
    deliverables: ['Primary & 9 Secondary GMB Category Audit', '12-Service Catalog & Q&A Seeding', '50+ UK Directory NAP Citations', 'Review Velocity & Response Playbook'],
    timeline: '10–14 Days',
    startingPrice: 650,
    outcomeMetric: 'Top-3 Map Pack placement for Sutton & Surrey keywords',
    featured: true,
  },
  {
    id: 'local-seo',
    number: '05',
    title: 'Local SEO',
    category: 'Local SEO & GMB',
    categoryLabel: 'Geographic Search Visibility',
    description:
      'Targeted geographic visibility strategies connecting your practice or trade directly with high-intent buyers in Sutton, Cheam, Epsom, and Greater London.',
    deliverables: ['Suburb & Borough Landing Page Matrix', 'LocalBusiness & GeoCoordinates JSON-LD', 'Competitor Backlink Gap Execution', 'Monthly Map Grid Ranking Reports'],
    timeline: 'Ongoing / 30-Day Sprint',
    startingPrice: 850,
    outcomeMetric: '+215% qualified local phone & WhatsApp inquiries',
    featured: true,
  },
  {
    id: 'wordpress-design',
    number: '06',
    title: 'WordPress Design',
    category: 'Web & Engineering',
    categoryLabel: 'Content Management',
    description:
      'Custom, lightweight WordPress builds that give your team effortless content editing and complete ownership without slow, vulnerable plugin bloat.',
    deliverables: ['Bespoke Block Theme Architecture', 'Zero-Bloat Custom Fields Setup', 'Hardened Security & Automated Backups', '1-on-1 Recorded Editor Handover'],
    timeline: '2–3 Weeks',
    startingPrice: 1550,
    outcomeMetric: '3.4x faster load times than template themes',
    featured: true,
  },
  {
    id: 'landing-page-design',
    number: '07',
    title: 'Landing Page Design',
    category: 'Commerce & Growth',
    categoryLabel: 'Conversion Funnels',
    description:
      'Focused, single-objective pages engineered specifically for Google Ads campaigns, service launches, and high-ticket consultation bookings.',
    deliverables: ['Claim-to-Proof Persuasion Copywriting', 'Instant WhatsApp & Lead Capture Forms', 'A/B Conversion Tracking Pixels', '48-Hour Rapid Deployment Option'],
    timeline: '5–7 Days',
    startingPrice: 750,
    outcomeMetric: '8.4% average visitor-to-inquiry conversion rate',
    featured: false,
  },
  {
    id: 'website-redesign',
    number: '08',
    title: 'Website Redesign',
    category: 'Web & Engineering',
    categoryLabel: 'Brand Transformation',
    description:
      'Transforming dated, underperforming websites into sharp, contemporary commercial assets while preserving and boosting existing search equity.',
    deliverables: ['Full URL & 301 Redirect Preservation Audit', 'Visual & Typographic Modernization', 'Mobile UX & Speed Overhaul', 'Conversion Rate Bottleneck Fix'],
    timeline: '2–3 Weeks',
    startingPrice: 1400,
    outcomeMetric: 'Zero ranking drops with immediate conversion lift',
    featured: false,
  },
  {
    id: 'responsive-web-design',
    number: '09',
    title: 'Responsive Web Design',
    category: 'Web & Engineering',
    categoryLabel: 'Mobile-First Precision',
    description:
      'Meticulously engineered fluid grids tested across iOS, Android, tablets, and 4K studio monitors for a frictionless browsing experience everywhere.',
    deliverables: ['44px+ Ergonomic Touch Targets', 'Fluid Clamp() Typography Scaling', 'Adaptive Next-Gen WebP/AVIF Media', 'Thumb-Zone Navigation Architecture'],
    timeline: 'Included / 1–2 Weeks',
    startingPrice: 950,
    outcomeMetric: '100% Mobile Usability score in Google Search Console',
    featured: false,
  },
  {
    id: 'seo-services',
    number: '10',
    title: 'SEO Services',
    category: 'Local SEO & GMB',
    categoryLabel: 'Technical Search Strategy',
    description:
      'Foundational technical architecture, semantic heading hierarchies, internal topic clusters, and speed audits that search engines reward.',
    deliverables: ['Technical Crawlability & Indexing Fix', 'High-Intent Buyer Keyword Mapping', 'Editorial Blog Topic Cluster Plan', 'Schema.org Rich Result Validation'],
    timeline: '2 Weeks / Monthly',
    startingPrice: 900,
    outcomeMetric: '+175% organic non-branded impressions in 4 months',
    featured: false,
  },
  {
    id: 'digital-marketing',
    number: '11',
    title: 'Digital Marketing',
    category: 'Commerce & Growth',
    categoryLabel: 'Full-Funnel Acquisition',
    description:
      'Holistic digital positioning bridging bespoke web design, local search authority, and high-intent conversion funnels into predictable revenue.',
    deliverables: ['Local Search + Paid Search Synergy', 'Lead Nurture & CRM Email Flows', 'Call & Form Attribution Tracking', 'Quarterly Growth Strategy Reviews'],
    timeline: '30-Day Launch',
    startingPrice: 1100,
    outcomeMetric: '3.8x average return on digital marketing spend',
    featured: false,
  },
  {
    id: 'social-media-marketing',
    number: '12',
    title: 'Social Media Marketing',
    category: 'Commerce & Growth',
    categoryLabel: 'Brand Authority Assets',
    description:
      'Refined editorial templates, campaign visuals, and coherent aesthetic guidelines that maintain your luxury brand voice across social channels.',
    deliverables: ['Bespoke Social Editorial Design Kit', 'OpenGraph & Social Share Card System', 'Case Study & Proof Carousel Templates', 'Local Community Positioning Guide'],
    timeline: '1–2 Weeks',
    startingPrice: 600,
    outcomeMetric: 'Cohesive luxury brand identity across all touchpoints',
    featured: false,
  },
];

export const STUDIO_PACKAGES: StudioPackage[] = [
  {
    id: 'gmb-local-dominance',
    name: 'Sutton Local SEO & GMB Dominance',
    subtitle: 'Engineered to rank your business in the Top 3 Google Map Pack across Sutton & Surrey.',
    price: 890,
    turnaround: '14 Days Delivery',
    recommendedFor: 'Local trades, clinics, legal practices & hospitality in Sutton / Greater London',
    coreDeliverables: [
      'Complete Google Business Profile audit, primary/secondary category alignment & 12-service catalog setup',
      'High-converting Local Landing Page or Homepage SEO overhaul with LocalBusiness JSON-LD Schema',
      '50+ verified UK directory NAP citations (Yell, Thomson Local, Scoot, Apple Business Connect, Bing Places)',
      '2 long-form, geo-targeted authority blog articles written & published on your site',
      'Automated WhatsApp & SMS customer review generation workflow',
    ],
    seoIncluded: 'Full LocalBusiness + FAQPage Schema + 50 UK Citations',
    guarantee: 'Verified improvements in local search visibility & map impressions within 30 days.',
  },
  {
    id: 'bespoke-authority-website',
    name: 'Bespoke Authority Website + Local SEO',
    subtitle: 'Our flagship studio package: a custom-designed, ultra-fast website built to convert visitors into buyers.',
    price: 1850,
    turnaround: '3 Weeks Delivery',
    recommendedFor: 'Ambitious service businesses, consultants & professional firms seeking market leadership',
    highlight: true,
    coreDeliverables: [
      'Up to 8 bespoke pages (Home, Services, Case Studies, About, Editorial Blog, FAQ, Contact)',
      '100% custom typography & editorial UI design (zero generic templates or bloated page builders)',
      'Interactive Lead Capture, Package Inquiry & Direct WhatsApp integration',
      'Full Google Business Profile synchronization + On-Page Technical SEO & Schema.org architecture',
      'Editorial Blog & Authority Hub setup with 3 launch articles targeting your highest-margin services',
      '98+ Mobile PageSpeed performance guarantee & 1-on-1 studio handover at Gemini Court or via Zoom',
    ],
    seoIncluded: 'Complete On-Page SEO + GMB Sync + 3 SEO Launch Articles',
    guarantee: 'Sub-second load times and 30 days of complimentary post-launch priority support.',
  },
  {
    id: 'luxury-ecommerce-flagship',
    name: 'High-Converting E-Commerce Storefront',
    subtitle: 'Editorial retail design paired with frictionless checkout to maximize average order value.',
    price: 2750,
    turnaround: '4 Weeks Delivery',
    recommendedFor: 'Boutique retailers, D2C brands & product makers selling across the UK',
    coreDeliverables: [
      'Bespoke storefront hero, collection filtering, and contiguous Product Detail Pages (PDP)',
      'Slide-over cart drawer with free shipping threshold progress bar & instant upsell modules',
      'Stripe, Apple Pay, Google Pay, Klarna & UK shipping/tax automation',
      'Automated Product, Offer & AggregateRating JSON-LD schema for Google Shopping organic snippets',
      'Speed-optimized image pipeline + abandoned cart recovery email sequence',
    ],
    seoIncluded: 'Product & Merchant Listing Schema + Category SEO Architecture',
    guarantee: 'Engineered for zero checkout friction across mobile and desktop viewports.',
  },
];

export const PACKAGE_ADDONS: PackageAddon[] = [
  {
    id: 'addon-blog-cluster',
    title: '4x SEO Authority Blog Articles Cluster',
    description: 'Four 1,200-word research-backed articles targeting buyer-intent keywords in your sector.',
    price: 380,
    timelineImpact: '+3 days',
  },
  {
    id: 'addon-gmb-pro',
    title: 'Google Business Profile 90-Day Management',
    description: 'Weekly GMB posts, geo-tagged photo uploads, Q&A seeding, and review response management.',
    price: 450,
    timelineImpact: 'Immediate start',
  },
  {
    id: 'addon-priority-sprint',
    title: 'Priority 7-Day Express Studio Sprint',
    description: 'Dedicated studio allocation to launch your new page or website redesign in 7 business days.',
    price: 350,
    timelineImpact: 'Fast-tracks launch',
  },
  {
    id: 'addon-copywriting',
    title: 'Complete Conversion Copywriting',
    description: 'Done-for-you headline, service page, and case study copywriting crafted for buyer persuasion.',
    price: 290,
    timelineImpact: 'Included in timeline',
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'cavendish-dental-sutton',
    client: 'Cavendish Aesthetics & Dental Clinic',
    sector: 'Private Healthcare & Aesthetics',
    location: 'Sutton High Street, SM1',
    headline: 'Replacing a slow WordPress template with a sub-second clinical booking platform and #1 Sutton Map Pack ranking.',
    summary:
      'Cavendish Clinic was losing mobile patients due to a 6.4-second load time and an unoptimized Google Business Profile buried on page two. We rebuilt their digital presence from the ground up with bespoke treatment pages, direct WhatsApp triage, and LocalBusiness schema.',
    image: STUDIO_INFO.images.heroStudio,
    metrics: [
      { value: '+215%', label: 'Inbound GMB & Website Bookings', timeframe: 'Within 90 Days' },
      { value: '0.6s', label: 'Mobile Largest Contentful Paint', timeframe: 'Down from 6.4s' },
      { value: '#1', label: 'Google Map Pack Position in Sutton', timeframe: 'For 14 Core Keywords' },
    ],
    testimonial: {
      quote:
        'Before working with Amelie at her Throwley Way studio, our website felt dated and rarely generated private consultation inquiries. Within eight weeks of launching the new site and GMB strategy, our high-value implant and aesthetics calendar was booked three weeks in advance.',
      author: 'Dr. Julian Vance',
      role: 'Clinical Director',
      organization: 'Cavendish Aesthetics & Dental, Sutton',
    },
    servicesUsed: ['Website Redesign', 'Local SEO', 'Google Business Profile Optimization'],
  },
  {
    id: 'aurelia-home-london',
    client: 'Aurélia Home & Architectural Lighting',
    sector: 'Luxury Interior Retail & E-Commerce',
    location: 'Wimbledon & Greater London',
    headline: 'Engineering an editorial e-commerce flagship that lifted mobile checkout completion by 164%.',
    summary:
      'Aurélia Home needed a digital storefront that matched the tactile quality of their travertine and brushed brass showroom pieces. We designed a calm, high-contrast editorial store with contiguous purchase modules, tabular dimension specs, and one-tap Apple Pay checkout.',
    image: STUDIO_INFO.images.caseStudyCommerce,
    metrics: [
      { value: '+164%', label: 'Mobile Checkout Conversion Rate', timeframe: 'First 60 Days Post-Launch' },
      { value: '£142k', label: 'Incremental Direct Online Revenue', timeframe: 'In Q1 After Relaunch' },
      { value: '+88%', label: 'Organic Product Rich Snippet Clicks', timeframe: 'Via Product Schema' },
    ],
    testimonial: {
      quote:
        'Amelie understood immediately that luxury buyers despise cluttered popups and slow carousels. Our new store loads instantaneously, showcases our collections with museum-grade restraint, and paid for itself within the first nineteen days.',
      author: 'claire Sterling',
      role: 'Founder & Creative Director',
      organization: 'Aurélia Home London',
    },
    servicesUsed: ['E-Commerce Website', 'Website Design', 'SEO Services'],
  },
  {
    id: 'thorne-chambers-surrey',
    client: 'Thorne & Partners Chartered Surveyors',
    sector: 'Property & Professional Practice',
    location: 'Cheam & Surrey',
    headline: 'Building an authority content engine and instant fee-quote calculator for a Surrey surveying practice.',
    summary:
      'Relying solely on word-of-mouth left Thorne & Partners vulnerable to seasonal dips. We architected a fast corporate website featuring an interactive RICS survey fee estimator and a targeted local blog hub answering property buyer questions across Sutton, Epsom, and Kingston.',
    image: STUDIO_INFO.images.blogLocalSeo,
    metrics: [
      { value: '+180%', label: 'Qualified Survey Quote Requests', timeframe: 'Over 4 Months' },
      { value: '9.2%', label: 'Visitor-to-Lead Conversion Rate', timeframe: 'Up from 1.8%' },
      { value: '42', label: 'Page-1 Local Search Rankings', timeframe: 'Across Sutton & Surrey' },
    ],
    testimonial: {
      quote:
        'Having direct one-on-one access to Amelie made the entire process effortless. The interactive quote tool and local property articles she built now bring us 35+ qualified homebuyer instructions every single month without spending a penny on paid ads.',
      author: 'Marcus Thorne MRICS',
      role: 'Managing Partner',
      organization: 'Thorne & Partners Surveyors',
    },
    servicesUsed: ['Website Development', 'Landing Page Design', 'Local SEO'],
  },
];

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 'sutton-gmb-map-pack-ranking-guide-2026',
    slug: 'how-to-rank-number-one-google-maps-sutton-local-seo',
    title: 'How Sutton & London Businesses Rank #1 in the Google Map Pack: The Complete 2026 Blueprint',
    excerpt:
      'Why do three local businesses capture 72% of all phone calls on Google Maps while competitors with decades of experience remain invisible? Here is the exact technical alignment between your website and Google Business Profile.',
    category: 'Local SEO & GMB',
    publishedDate: 'October 2026',
    readTime: '6 min read',
    targetKeyword: 'Google Business Profile Optimization Sutton & Local SEO',
    coverImage: STUDIO_INFO.images.blogLocalSeo,
    featured: true,
    keyTakeaways: [
      'Your primary GMB category and homepage H1/Title must mirror each other with mathematical precision.',
      'Embedding LocalBusiness JSON-LD schema with exact GeoCoordinates (51.3618, -0.1916) and NAP citations verifies entity trust.',
      'Dedicated service entries on your website must match all 12 services listed inside your Google Business Profile.',
      'Consistent review velocity mentioning specific services and locations (e.g., "website design in Sutton") compounds map rankings.',
    ],
    sections: [
      {
        heading: '1. The Fatal Disconnect Between Most Websites and Their Google Business Profile',
        body: [
          'When a prospective customer in Sutton, Cheam, or Carshalton searches for a high-intent service—whether that is a website designer, private dentist, or chartered surveyor—Google evaluates three primary pillars: Relevance, Distance, and Prominence.',
          'Most local businesses treat their Google Business Profile (formerly Google My Business) as an isolated directory listing. Meanwhile, their website has a generic homepage headline like "Welcome to Our Company" with zero structured geographic metadata. When Google crawls the linked website and fails to find matching primary categories, service catalogues, and postal coordinates, it suppresses the business below competitors who have synchronized both assets.',
        ],
        highlightBox:
          'Rule of Entity Alignment: Every secondary category and service in your Google Business Profile should correspond to an indexable, fast-loading section or landing page on your primary domain.',
      },
      {
        heading: '2. Engineering LocalBusiness JSON-LD Schema That Search Engines Trust',
        body: [
          'Visual text on a page helps human visitors, but search engine crawlers rely on Schema.org structured data in JSON-LD format to disambiguate local entities. At our Gemini Court studio in Sutton (SM1 4AF), every website we ship includes a comprehensive @graph schema block inside the HTML head.',
          'This block explicitly declares the streetAddress, postalCode, GeoCoordinates, openingHoursSpecification, areaServed boroughs, and an OfferCatalog containing every service offered. This eliminates ambiguity and triggers rich search snippets directly in Google results.',
        ],
      },
      {
        heading: '3. Turning Map Views Into Direct WhatsApp Inquiries and Purchases',
        body: [
          'Ranking in the Top 3 Map Pack is only half the equation. Once a local buyer clicks through to your website, you have less than 3 seconds to prove authority and make contacting you effortless.',
          'Replacing clunky 12-field contact forms with transparent package pricing, attributable local case studies, and a one-tap WhatsApp consultation trigger routinely doubles inquiry conversion rates for Sutton businesses.',
        ],
      },
    ],
    checklistTitle: 'Sutton GMB & Website Synchronization Checklist',
    checklistItems: [
      'Match exact Name, Address, and Phone (NAP) across website footer, schema, and GMB profile',
      'List all 12 core services in GMB and mirror them with dedicated sections on your website',
      'Validate LocalBusiness & FAQPage JSON-LD in Google Rich Results Test',
      'Achieve sub-1.0s Largest Contentful Paint (LCP) on 4G mobile connections',
      'Add a direct "Message on WhatsApp" and "Get Directions" action above the fold',
    ],
    relatedServiceId: 'google-business-profile-optimization',
    ctaLabel: 'Book Your GMB & Local SEO Audit',
  },
  {
    id: 'website-design-psychology-high-ticket-sales',
    slug: 'bespoke-website-design-psychology-convert-visitors-into-buyers',
    title: 'The Architecture of Trust: Why Bespoke Website Design Outconverts Generic Templates by 310%',
    excerpt:
      'Prospective clients judge the calibre of your business within 50 milliseconds of landing on your homepage. Discover how editorial typography, spatial restraint, and claim-to-proof adjacency turn browsers into buyers.',
    category: 'Web Architecture',
    publishedDate: 'October 2026',
    readTime: '5 min read',
    targetKeyword: 'Bespoke Website Designer Sutton & London',
    coverImage: STUDIO_INFO.images.blogConversion,
    featured: false,
    keyTakeaways: [
      'Eliminate visual clutter: replace floating chat widgets, neon badges, and stock clichés with disciplined whitespace.',
      'Place quantified client proof immediately adjacent to your service claims so buyers never have to take your word on faith.',
      'Provide transparent package tiers and interactive scope configurators so ready-to-buy clients can commit immediately.',
    ],
    sections: [
      {
        heading: '1. Why Templates Signal Commodity Pricing',
        body: [
          'When an ambitious business uses a £49 multipurpose template, visitors subconsciously recognize the familiar layout patterns: generic stock photography, three identical icon boxes, and vague buzzwords. When your website looks interchangeable with ten other competitors in Greater London, customers default to comparing you strictly on the lowest price.',
          'Bespoke design reverses this dynamic. By pairing an expressive editorial serif like Fraunces with crisp geometric body copy and custom studio photography, your digital presence immediately signals craftsmanship and reliability.',
        ],
      },
      {
        heading: '2. Claim-to-Proof Adjacency & Transparent Packaging',
        body: [
          'High-converting websites follow a rigorous narrative sequence: Proposition → Capabilities → Quantified Proof → Frictionless Action. Instead of hiding pricing behind vague "Contact Us" walls, displaying clear service packages with defined deliverables empowers decisive buyers to purchase or reserve a project slot on the spot.',
        ],
        highlightBox:
          'Conversion Insight: Adding an interactive package configurator with transparent investment levels increases qualified project deposits by 64%.',
      },
    ],
    checklistTitle: 'High-Converting Website Design Audit',
    checklistItems: [
      'Single unmistakable focal anchor in the hero viewport',
      'Zero unverified stock clichés or distracting popup overlays on arrival',
      'Attributable client testimonials with full name, role, company, and concrete metrics',
      'Transparent package breakdowns with clear turnaround timelines',
    ],
    relatedServiceId: 'website-design',
    ctaLabel: 'Start Your Bespoke Website Project',
  },
  {
    id: 'core-web-vitals-wordpress-speed-engineering',
    slug: 'core-web-vitals-speed-optimization-wordpress-custom-development',
    title: 'Sub-Second Websites: How Core Web Vitals Speed Directly Impacts Google Rankings & Mobile Revenue',
    excerpt:
      'Every 100ms of loading delay costs online businesses up to 7% in lost conversions. Learn how clean frontend code and lightweight WordPress engineering eliminate plugin bloat.',
    category: 'WordPress & Speed',
    publishedDate: 'September 2026',
    readTime: '5 min read',
    targetKeyword: 'Website Development & WordPress Design Sutton',
    coverImage: STUDIO_INFO.images.heroStudio,
    featured: false,
    keyTakeaways: [
      'Bloated drag-and-drop page builders load up to 4MB of unused JavaScript on mobile devices.',
      'Google uses Core Web Vitals (LCP, INP, CLS) as a verified tie-breaker in competitive local search markets.',
      'Custom-engineered frontends and lean WordPress block builds achieve 99/100 performance scores effortlessly.',
    ],
    sections: [
      {
        heading: '1. The Hidden Cost of Drag-and-Drop Page Builders',
        body: [
          'Many business owners in Sutton come to our studio frustrated that their existing WordPress site takes 5 to 8 seconds to load on an iPhone. When we audit the codebase, the culprit is almost always a heavy visual page builder stacked with 35+ third-party plugins.',
          'Not only does this create constant security vulnerabilities, it also fails Google’s Interaction to Next Paint (INP) and Largest Contentful Paint (LCP) thresholds—actively penalizing your organic search visibility.',
        ],
      },
      {
        heading: '2. Clean Engineering & Effortless Content Ownership',
        body: [
          'Whether we build your site in modern React/TypeScript or a bespoke, lightweight WordPress architecture, we write clean, semantic code from scratch. Images are served in next-gen formats with explicit aspect ratios to prevent layout shifts, ensuring your site feels instantaneous on any connection.',
        ],
      },
    ],
    checklistTitle: 'Technical Performance Standards',
    checklistItems: [
      'Largest Contentful Paint (LCP) under 1.2 seconds on mobile',
      'Cumulative Layout Shift (CLS) of 0.00 using explicit container ratios',
      'Interaction to Next Paint (INP) under 100 milliseconds',
      'Strict font loading discipline (maximum 2 font families + tabular numerals)',
    ],
    relatedServiceId: 'website-development',
    ctaLabel: 'Request a Technical Speed Audit',
  },
  {
    id: 'ecommerce-checkout-conversion-luxury-retail',
    slug: 'ecommerce-website-design-reduce-cart-abandonment-uk',
    title: 'Frictionless Commerce: 5 Product Page & Checkout Upgrades That Double Online Store Sales',
    excerpt:
      'Traffic without conversion is wasted budget. See how contiguous purchase modules, tabular specifications, and express mobile wallets transform UK e-commerce revenue.',
    category: 'E-Commerce & Conversion',
    publishedDate: 'September 2026',
    readTime: '6 min read',
    targetKeyword: 'E-Commerce Website Designer Sutton & UK',
    coverImage: STUDIO_INFO.images.caseStudyCommerce,
    featured: false,
    keyTakeaways: [
      'Keep product title, price, variant selector, stock status, and Buy CTA inside one contiguous sticky module.',
      'Never ambush newly arrived shoppers with discount popups; build trust through clear delivery thresholds and return policies.',
      'Implement Product and Offer schema so Google displays live pricing and star ratings directly in search results.',
    ],
    sections: [
      {
        heading: '1. Designing the Contiguous Purchase Module',
        body: [
          'On poorly designed e-commerce stores, critical buying information is scattered across the screen—shipping costs hidden in the footer, sizing guides buried in tabs, and the Add to Bag button pushed below the fold on mobile.',
          'We engineer Product Detail Pages (PDPs) with a unified, contiguous purchase module alongside high-resolution studio imagery. Shoppers see exact pricing, delivery dates, and one-tap Apple Pay / Google Pay buttons in a single glance.',
        ],
      },
      {
        heading: '2. Slide-Over Cart Drawers That Lift Average Order Value',
        body: [
          'Instead of redirecting shoppers to a slow, full-page cart reload every time they add an item, a responsive slide-over drawer confirms the action in under 150ms and displays how close they are to complimentary UK express delivery.',
        ],
      },
    ],
    checklistTitle: 'E-Commerce Conversion Essentials',
    checklistItems: [
      'Sticky mobile purchase bar for effortless thumb-zone checkout',
      'Clear UK delivery timelines and transparent return terms inside the buy box',
      'Automated Google Merchant & Product JSON-LD schema markup',
      'One-click express checkout via Apple Pay, Google Pay, and Stripe',
    ],
    relatedServiceId: 'ecommerce-website',
    ctaLabel: 'Discuss Your E-Commerce Store',
  },
  {
    id: 'high-converting-landing-pages-google-ads',
    slug: 'landing-page-design-sutton-convert-paid-search-traffic',
    title: 'Why Sending Paid Traffic to Your Homepage Wastes 60% of Your Ad Spend (And What to Build Instead)',
    excerpt:
      'When running Google Ads or social campaigns, message match is everything. Learn how dedicated conversion landing pages achieve 8%+ inquiry rates.',
    category: 'E-Commerce & Conversion',
    publishedDate: 'August 2026',
    readTime: '4 min read',
    targetKeyword: 'Landing Page Design Sutton & Digital Marketing',
    coverImage: STUDIO_INFO.images.blogConversion,
    featured: false,
    keyTakeaways: [
      'Dedicated landing pages remove distracting navigation leaks and focus 100% on one conversion goal.',
      'Mirroring the exact search query in the hero headline raises Google Ads Quality Score and lowers cost-per-click.',
      'Interactive ROI calculators and instant WhatsApp booking buttons capture both analytical and urgent buyers.',
    ],
    sections: [
      {
        heading: '1. The Power of Single-Objective Architecture',
        body: [
          'A full website serves multiple audiences, but a campaign landing page has a single job: turning a specific search intent into a booked consultation or purchase. By stripping away secondary distractions and aligning the headline, proof metrics, and FAQ directly with the ad’s promise, conversion rates routinely jump from 2% to over 8%.',
        ],
      },
    ],
    checklistTitle: 'Landing Page Launch Blueprint',
    checklistItems: [
      '1:1 headline match with target search campaign keywords',
      'Above-the-fold social proof and quantified outcome metrics',
      'Sub-second mobile load time to eliminate ad click bounce',
      'Validated instant lead form + direct WhatsApp fallback',
    ],
    relatedServiceId: 'landing-page-design',
    ctaLabel: 'Order a High-Converting Landing Page',
  },
  {
    id: 'website-redesign-without-losing-seo-rankings',
    slug: 'website-redesign-checklist-preserve-and-boost-seo-rankings',
    title: 'The Zero-Drop Website Redesign Protocol: How to Modernize Your Brand and Multiply Organic Traffic',
    excerpt:
      'Many businesses fear a website redesign will hurt their existing Google rankings. With proper URL mapping, schema upgrades, and speed engineering, a redesign accelerates growth from day one.',
    category: 'Web Architecture',
    publishedDate: 'August 2026',
    readTime: '5 min read',
    targetKeyword: 'Website Redesign Sutton & SEO Services',
    coverImage: STUDIO_INFO.images.ameliePortrait,
    featured: false,
    keyTakeaways: [
      'Audit all existing high-performing URLs and backlinks before changing a single line of code.',
      'Preserve or map 1:1 301 redirects for every legacy page so search equity flows seamlessly into the new build.',
      'Upgrade on-page semantic hierarchy (single H1, logical H2/H3 structure) and internal linking during the redesign.',
    ],
    sections: [
      {
        heading: '1. Why Naive Redesigns Tank Traffic—And How Our Studio Prevents It',
        body: [
          'When a designer rebuilds a site solely for aesthetics and deletes old service pages or changes URL slugs without a redirect map, Google encounters broken 404 links and drops the site from search results.',
          'At Amelie Barton Studio, every redesign begins with a comprehensive technical SEO crawl. We protect every ranking asset you have earned while upgrading your site’s speed, mobile usability, and conversion design.',
        ],
      },
    ],
    checklistTitle: 'Safe Website Redesign Protocol',
    checklistItems: [
      'Complete benchmark export of current Google Search Console queries & URLs',
      '1:1 301 permanent redirect mapping for any consolidated slugs',
      'Upgraded Schema.org JSON-LD and OpenGraph metadata across all pages',
      'Post-launch sitemap submission and live indexing verification',
    ],
    relatedServiceId: 'website-redesign',
    ctaLabel: 'Plan Your Website Redesign',
  },
];

export const FAQ_ITEMS = [
  {
    question: 'How does the design and build process work with Amelie Barton?',
    answer:
      'We begin with a direct 1-on-1 discovery conversation—either via video call, phone, or at our studio at 1 Gemini Court, 42a Throwley Way in Sutton (SM1 4AF). Once we define your commercial goals, target keywords, and package scope, I design custom wireframes and editorial visuals for your approval before engineering the website with clean, sub-second code. You review and approve every milestone.',
  },
  {
    question: 'How do you rank my website and Google Business Profile at the top of local search?',
    answer:
      'Ranking at the top requires complete synchronization between your website and your Google Business Profile (GMB). I align your primary and secondary GMB categories with dedicated service pages on your site, embed LocalBusiness and OfferCatalog JSON-LD schema with Sutton/London geo-coordinates, build verified UK directory NAP citations, and publish high-intent authority blog content that Google rewards.',
  },
  {
    question: 'Can I purchase a website or Local SEO package directly online?',
    answer:
      'Yes. You can configure any of our transparent studio packages in the Packages section above, add optional SEO or copywriting boosters, and either reserve your studio slot immediately online (with a 50% studio deposit or full payment) or send your exact configured specification directly to my WhatsApp for a same-day kickoff.',
  },
  {
    question: 'What is included in every website project as standard?',
    answer:
      'Every website includes 100% bespoke responsive design (tested across smartphones, tablets, and 4K displays), sub-second Core Web Vitals optimization, on-page technical SEO and Schema.org markup, WhatsApp and lead form integration, SSL/hosting configuration, and a 1-on-1 recorded handover session so you have total ownership.',
  },
  {
    question: 'Do you work only with businesses in Sutton, or across Greater London and the UK?',
    answer:
      'While our studio is proudly based in Sutton (SM1 4AF) and works closely with businesses across Sutton, Cheam, Carshalton, Epsom, Wimbledon, and Surrey, we partner with ambitious companies throughout Greater London and across the United Kingdom.',
  },
];
