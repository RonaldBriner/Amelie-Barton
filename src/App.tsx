import React, { useState, useMemo } from 'react';
import {
  ArrowRight,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Search,
  Check,
  ChevronDown,
  BookOpen,
  ExternalLink,
  Sliders,
  Calculator,
  Code2,
  ShieldCheck,
} from 'lucide-react';
import {
  STUDIO_INFO,
  GMB_SERVICES,
  STUDIO_PACKAGES,
  PACKAGE_ADDONS,
  CASE_STUDIES,
  BLOG_ARTICLES,
  FAQ_ITEMS,
  BlogArticle,
  StudioPackage,
} from './data/studioData';
import { ArticleModal } from './components/ArticleModal';
import { PackageCheckoutModal } from './components/PackageCheckoutModal';

export default function App() {
  // Interactive Service Filter State
  const [serviceFilter, setServiceFilter] = useState<
    'Featured' | 'All' | 'Web & Engineering' | 'Local SEO & GMB' | 'Commerce & Growth'
  >('Featured');

  // Interactive Package & Addon Configurator State
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>([]);
  const [checkoutPackage, setCheckoutPackage] = useState<StudioPackage | null>(null);

  // Interactive Local SEO & Conversion ROI Calculator State
  const [monthlyVisitors, setMonthlyVisitors] = useState<number>(650);
  const [avgClientValue, setAvgClientValue] = useState<number>(850);
  const [includeGmbTop3, setIncludeGmbTop3] = useState<boolean>(true);

  // Interactive Blog / Journal State
  const [blogCategory, setBlogCategory] = useState<string>('All');
  const [blogSearchQuery, setBlogSearchQuery] = useState<string>('');
  const [activeArticle, setActiveArticle] = useState<BlogArticle | null>(null);

  // Interactive Contact Form State
  const [selectedServiceInquiry, setSelectedServiceInquiry] = useState<string>('Bespoke Authority Website + Local SEO');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactBusiness, setContactBusiness] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactError, setContactError] = useState('');

  // FAQ & SEO Schema Inspector State
  const [openFaqIndex, setOpenFaqIndex] = useState<number>(0);
  const [showSeoAuditDrawer, setShowSeoAuditDrawer] = useState<boolean>(false);

  // Filtered Services
  const filteredServices = useMemo(() => {
    if (serviceFilter === 'Featured') return GMB_SERVICES.filter((s) => s.featured);
    if (serviceFilter === 'All') return GMB_SERVICES;
    return GMB_SERVICES.filter((s) => s.category === serviceFilter);
  }, [serviceFilter]);

  // Selected Addon Objects & Total
  const activeAddons = useMemo(
    () => PACKAGE_ADDONS.filter((a) => selectedAddonIds.includes(a.id)),
    [selectedAddonIds]
  );
  const addonsTotalSum = useMemo(
    () => activeAddons.reduce((acc, item) => acc + item.price, 0),
    [activeAddons]
  );

  const toggleAddon = (id: string) => {
    setSelectedAddonIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Filtered Blog Articles
  const filteredArticles = useMemo(() => {
    return BLOG_ARTICLES.filter((article) => {
      const matchesCategory = blogCategory === 'All' || article.category === blogCategory;
      const q = blogSearchQuery.trim().toLowerCase();
      const matchesQuery =
        !q ||
        article.title.toLowerCase().includes(q) ||
        article.excerpt.toLowerCase().includes(q) ||
        article.targetKeyword.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [blogCategory, blogSearchQuery]);

  // ROI Calculator Computations
  const roiMetrics = useMemo(() => {
    const currentLeads = Math.max(1, Math.round(monthlyVisitors * 0.018));
    const trafficMultiplier = includeGmbTop3 ? 2.15 : 1.35;
    const projectedTraffic = Math.round(monthlyVisitors * trafficMultiplier);
    const projectedLeads = Math.max(3, Math.round(projectedTraffic * 0.058));
    const additionalMonthlyLeads = Math.max(2, projectedLeads - currentLeads);
    const projectedMonthlyRevenueLift = additionalMonthlyLeads * avgClientValue;
    return {
      currentLeads,
      projectedTraffic,
      projectedLeads,
      additionalMonthlyLeads,
      projectedMonthlyRevenueLift,
    };
  }, [monthlyVisitors, avgClientValue, includeGmbTop3]);

  const handleSelectServiceToContact = (serviceTitle: string, contextNote?: string) => {
    setSelectedServiceInquiry(serviceTitle);
    if (contextNote) {
      setContactMessage(`Hi Amelie, I was reading "${contextNote}" and would like to discuss ${serviceTitle} for my business.`);
    }
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) {
      setContactError('Please provide your name, email address, and brief project details.');
      return;
    }
    setContactError('');
    setContactSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FCFBF9] text-[#140E21]">
      {/* =====================================================================
          TOP BAR CONTRACT: Strict 1-Row, 3-Zone Header (Brand — Nav — CTA)
         ===================================================================== */}
      <header className="sticky top-0 z-40 bg-[#FCFBF9]/95 backdrop-blur-md border-b border-[#140E21]/10">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-8 px-6 py-4">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#"
            className="font-display text-xl font-semibold tracking-tight text-[#140E21] whitespace-nowrap shrink-0"
          >
            Amelie Barton
          </a>

          {/* Zone 2: 5 concise single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#534D66]">
            <a
              href="#services"
              className="hover:text-[#140E21] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Services
            </a>
            <a
              href="#case-studies"
              className="hover:text-[#140E21] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Case Studies
            </a>
            <a
              href="#packages"
              className="hover:text-[#140E21] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Packages
            </a>
            <a
              href="#journal"
              className="hover:text-[#140E21] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Journal
            </a>
            <a
              href="#contact"
              className="hover:text-[#140E21] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Contact
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#packages"
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#4C1D95] hover:bg-[#3B0764] rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              View Packages
            </a>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* =====================================================================
            1. HERO SECTION: 2-Column Split + Full-Width Quantified Proof Bar
           ===================================================================== */}
        <section className="pt-10 pb-16 sm:pt-16 sm:pb-24 border-b border-[#140E21]/10">
          <div className="max-w-[1280px] mx-auto px-6 space-y-12">
            {/* 2-Column Split (items-stretch for optical height balance) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
              {/* Left Column: Editorial Value Proposition */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-8 py-2">
                <div className="space-y-6">
                  {/* Unboxed Regional Trust Kicker */}
                  <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#4C1D95]">
                    <span>Website Designer & Local SEO Studio</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#534D66]">1 Gemini Court, Sutton SM1 4AF</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#534D66]">Greater London</span>
                  </div>

                  <h1
                    className="font-display text-[#140E21] font-semibold tracking-tight leading-[1.08]"
                    style={{
                      fontSize: 'clamp(2.35rem, 4.2vw, 3.75rem)',
                      textWrap: 'balance',
                    }}
                  >
                    Modern Websites, Better Results. Built to Rank & Convert.
                  </h1>

                  <p className="text-base sm:text-lg text-[#534D66] leading-relaxed max-w-[62ch]">
                    We design and engineer bespoke, sub-second websites synchronized with your Google
                    Business Profile—helping ambitious businesses in Sutton, Surrey, and Greater
                    London dominate local search and turn visitors into paying clients.
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Primary Action + Secondary WhatsApp Action */}
                  <div className="flex flex-wrap items-center gap-4">
                    <a
                      href="#packages"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold bg-[#4C1D95] hover:bg-[#3B0764] text-white rounded-lg transition-colors whitespace-nowrap shrink-0"
                    >
                      <span>Explore Packages & Pricing</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>

                    <a
                      href={STUDIO_INFO.contact.whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold bg-white hover:bg-[#F4F1EA] text-[#140E21] border border-[#140E21]/15 rounded-lg transition-colors whitespace-nowrap shrink-0"
                    >
                      <MessageCircle className="w-4 h-4 text-[#1E6F45]" />
                      <span>WhatsApp: {STUDIO_INFO.contact.phoneDisplay}</span>
                    </a>
                  </div>

                  {/* Unboxed Studio Assurance */}
                  <div className="pt-4 border-t border-[#140E21]/10 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#534D66]">
                    <span>Direct 1-on-1 collaboration with Amelie Barton</span>
                    <span aria-hidden="true">·</span>
                    <span>12 Verified GMB Services</span>
                    <span aria-hidden="true">·</span>
                    <a
                      href={STUDIO_INFO.location.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#4C1D95] font-medium hover:underline inline-flex items-center gap-1"
                    >
                      <span>Throwley Way Studio, SM1 4AF</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Column: High-Fidelity Studio Asset */}
              <div className="lg:col-span-5 relative rounded-xl overflow-hidden bg-[#140E21] border border-[#140E21]/10 min-h-[340px] lg:min-h-full">
                <img
                  src={STUDIO_INFO.images.heroStudio}
                  alt="Amelie Barton Website Design Studio in Sutton, Greater London"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#140E21]/85 via-[#140E21]/20 to-transparent flex flex-col justify-end p-6 text-white">
                  <div className="text-xs text-[#DDD6FE] mb-1">
                    Sutton Studio · 1 Gemini Court, 42a Throwley Way
                  </div>
                  <div className="font-display text-lg font-medium leading-snug">
                    Bespoke UI Architecture, E-Commerce & Local Search Engineering
                  </div>
                </div>
              </div>
            </div>

            {/* Full-Width 4-Column Quantified Benchmark Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-[#140E21]/10">
              {STUDIO_INFO.heroStats.map((stat, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="font-mono-tabular text-2xl sm:text-3xl font-bold text-[#140E21]">
                    {stat.value}
                  </div>
                  <div className="text-sm font-semibold text-[#140E21]">{stat.label}</div>
                  <div className="text-xs text-[#534D66]">{stat.context}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================================
            2. CORE GMB CAPABILITIES (All 12 Services + Interactive Filter)
           ===================================================================== */}
        <section id="services" className="py-16 sm:py-24 border-b border-[#140E21]/10">
          <div className="max-w-[1280px] mx-auto px-6 space-y-12">
            {/* Header + Interactive Filter Controls */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#4C1D95]">
                  Complete GMB Service Catalog · Sutton & London
                </div>
                <h2
                  className="font-display text-3xl sm:text-4xl font-semibold text-[#140E21] tracking-tight"
                  style={{ textWrap: 'balance' }}
                >
                  Tailored Website Design, Development & Local Search Dominance
                </h2>
                <p className="text-base text-[#534D66] leading-relaxed">
                  Every service is delivered one-on-one with obsessive attention to typographic
                  hierarchy, mobile speed, and verified Google Business Profile alignment.
                </p>
              </div>

              {/* Functional Segmented Filter Bar */}
              <div
                className="flex flex-wrap items-center gap-1 p-1.5 bg-[#F4F1EA] border border-[#140E21]/10 rounded-lg self-start"
                role="tablist"
                aria-label="Filter studio services"
              >
                {(
                  [
                    { key: 'Featured', label: 'Featured (6)' },
                    { key: 'All', label: 'All 12 GMB Services' },
                    { key: 'Web & Engineering', label: 'Web & Code' },
                    { key: 'Local SEO & GMB', label: 'Local SEO & GMB' },
                    { key: 'Commerce & Growth', label: 'Commerce & Growth' },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    role="tab"
                    aria-selected={serviceFilter === tab.key}
                    onClick={() => setServiceFilter(tab.key)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      serviceFilter === tab.key
                        ? 'bg-white text-[#140E21] shadow-xs'
                        : 'text-[#534D66] hover:text-[#140E21]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service) => (
                <article
                  key={service.id}
                  className="p-6 rounded-xl bg-white border border-[#140E21]/10 flex flex-col justify-between space-y-6 hover:border-[#4C1D95]/40 transition-colors"
                >
                  <div className="space-y-4">
                    {/* Unboxed Metadata Line (Zero-Pill Discipline) */}
                    <div className="flex items-center justify-between text-xs text-[#534D66]">
                      <div className="flex items-center gap-2">
                        <span className="font-mono-tabular font-semibold text-[#4C1D95]">
                          {service.number}.
                        </span>
                        <span>{service.categoryLabel}</span>
                      </div>
                      <span className="font-mono-tabular">{service.timeline}</span>
                    </div>

                    <h3 className="font-display text-xl font-semibold text-[#140E21]">
                      {service.title}
                    </h3>

                    <p className="text-sm text-[#534D66] leading-relaxed">{service.description}</p>

                    {/* Deliverables List */}
                    <ul className="space-y-2 pt-2 border-t border-[#140E21]/8">
                      {service.deliverables.map((del, dIdx) => (
                        <li key={dIdx} className="flex items-center gap-2 text-xs text-[#140E21]">
                          <Check className="w-3.5 h-3.5 text-[#4C1D95] shrink-0" />
                          <span>{del}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-[#140E21]/10 space-y-4">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs text-[#534D66]">Starting Investment</span>
                      <span className="font-mono-tabular text-base font-bold text-[#140E21]">
                        From £{service.startingPrice.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => handleSelectServiceToContact(service.title)}
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#140E21] bg-[#F4F1EA] hover:bg-[#4C1D95] hover:text-white rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                      >
                        <span>Commission {service.title}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {serviceFilter === 'Featured' && (
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={() => setServiceFilter('All')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-[#4C1D95] border border-[#4C1D95]/30 rounded-lg hover:bg-[#4C1D95]/5 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <span>View All 12 Verified GMB Services</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </section>

        {/* =====================================================================
            3. PROOF OF IMPACT: Quantified Case Studies & Attributable Testimonials
               (Placed Immediately Adjacent to Capabilities)
           ===================================================================== */}
        <section id="case-studies" className="py-16 sm:py-24 bg-[#F4F1EA] border-b border-[#140E21]/10">
          <div className="max-w-[1280px] mx-auto px-6 space-y-12">
            <div className="space-y-3 max-w-2xl">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#4C1D95]">
                Verified Commercial Outcomes · Sutton, Surrey & Greater London
              </div>
              <h2
                className="font-display text-3xl sm:text-4xl font-semibold text-[#140E21] tracking-tight"
                style={{ textWrap: 'balance' }}
              >
                Websites Engineered to Pay for Themselves in Weeks
              </h2>
              <p className="text-base text-[#534D66] leading-relaxed">
                Every design decision is measured against real commercial outcomes: Map Pack phone
                calls, mobile loading speed, and completed client bookings.
              </p>
            </div>

            <div className="space-y-8">
              {CASE_STUDIES.map((study, index) => (
                <div
                  key={study.id}
                  className="p-6 sm:p-8 rounded-xl bg-[#FCFBF9] border border-[#140E21]/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
                >
                  {/* Image Column */}
                  <div className="lg:col-span-5 relative rounded-lg overflow-hidden bg-[#140E21] min-h-[260px]">
                    <img
                      src={study.image}
                      alt={study.client}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#140E21]/80 via-transparent to-transparent flex flex-col justify-end p-5 text-white">
                      <div className="text-xs text-[#DDD6FE]">
                        0{index + 1} · {study.sector} · {study.location}
                      </div>
                      <div className="font-display text-lg font-semibold mt-0.5">
                        {study.client}
                      </div>
                    </div>
                  </div>

                  {/* Narrative + Quantified Metrics + Attributable Quote */}
                  <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      {/* Unboxed Metadata */}
                      <div className="flex flex-wrap items-center gap-2 text-xs text-[#534D66]">
                        <span className="font-semibold text-[#4C1D95]">{study.client}</span>
                        <span aria-hidden="true">·</span>
                        <span>{study.location}</span>
                        <span aria-hidden="true">·</span>
                        <span>{study.servicesUsed.join(' / ')}</span>
                      </div>

                      <h3
                        className="font-display text-xl sm:text-2xl font-semibold text-[#140E21] leading-snug"
                        style={{ textWrap: 'balance' }}
                      >
                        {study.headline}
                      </h3>

                      <p className="text-sm text-[#534D66] leading-relaxed">{study.summary}</p>

                      {/* 3 Quantified Metrics */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                        {study.metrics.map((m, mIdx) => (
                          <div
                            key={mIdx}
                            className="p-3.5 rounded-lg bg-[#F4F1EA] border border-[#140E21]/8"
                          >
                            <div className="font-mono-tabular text-xl sm:text-2xl font-bold text-[#4C1D95]">
                              {m.value}
                            </div>
                            <div className="text-xs font-semibold text-[#140E21] mt-0.5">
                              {m.label}
                            </div>
                            <div className="text-[11px] text-[#534D66]">{m.timeframe}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Attributable Testimonial */}
                    <div className="pt-4 border-t border-[#140E21]/10 space-y-2">
                      <p className="text-xs sm:text-sm italic text-[#2D263E] leading-relaxed">
                        “{study.testimonial.quote}”
                      </p>
                      <div className="text-xs text-[#534D66]">
                        <strong className="text-[#140E21]">{study.testimonial.author}</strong> ·{' '}
                        {study.testimonial.role}, {study.testimonial.organization}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================================
            4. TRANSPARENT PACKAGES, SCOPE CONFIGURATOR & ROI CALCULATOR
               (Direct Purchase & Booking Engine)
           ===================================================================== */}
        <section id="packages" className="py-16 sm:py-24 border-b border-[#140E21]/10">
          <div className="max-w-[1280px] mx-auto px-6 space-y-16">
            {/* Section Heading */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#4C1D95]">
                  Transparent Studio Investment · Reserve Online or via WhatsApp
                </div>
                <h2
                  className="font-display text-3xl sm:text-4xl font-semibold text-[#140E21] tracking-tight"
                  style={{ textWrap: 'balance' }}
                >
                  Fixed-Price Website & Local SEO Packages Built to Convert
                </h2>
                <p className="text-base text-[#534D66] leading-relaxed">
                  No hidden agency retainers or surprise hourly bills. Choose a flagship package,
                  customize optional boosters below, and reserve your studio slot with a 50%
                  kickoff deposit.
                </p>
              </div>
              <div className="text-xs text-[#534D66] space-y-1">
                <div className="font-semibold text-[#140E21]">
                  Every Package Includes 1-on-1 Handover
                </div>
                <div>100% Code & Content Ownership · Zero Lock-In</div>
              </div>
            </div>

            {/* 3 Primary Packages Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
              {STUDIO_PACKAGES.map((pkg) => {
                const totalWithAddons = pkg.price + addonsTotalSum;
                return (
                  <div
                    key={pkg.id}
                    className={`p-7 rounded-xl flex flex-col justify-between space-y-8 border transition-colors ${
                      pkg.highlight
                        ? 'bg-[#140E21] text-white border-[#4C1D95]'
                        : 'bg-white text-[#140E21] border-[#140E21]/12'
                    }`}
                  >
                    <div className="space-y-5">
                      <div
                        className={`flex items-center justify-between text-xs ${
                          pkg.highlight ? 'text-[#DDD6FE]' : 'text-[#4C1D95]'
                        }`}
                      >
                        <span className="font-semibold">
                          {pkg.highlight ? 'Most Popular Studio Package' : 'Fixed-Scope Package'}
                        </span>
                        <span className="font-mono-tabular">{pkg.turnaround}</span>
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-display text-2xl font-semibold">{pkg.name}</h3>
                        <p
                          className={`text-xs leading-relaxed ${
                            pkg.highlight ? 'text-white/75' : 'text-[#534D66]'
                          }`}
                        >
                          {pkg.subtitle}
                        </p>
                      </div>

                      {/* Price Display */}
                      <div className="pt-2 pb-4 border-b border-current/10">
                        <div className="flex items-baseline gap-2">
                          <span className="font-mono-tabular text-3xl sm:text-4xl font-bold">
                            £{totalWithAddons.toLocaleString()}
                          </span>
                          <span
                            className={`text-xs ${
                              pkg.highlight ? 'text-white/65' : 'text-[#534D66]'
                            }`}
                          >
                            {addonsTotalSum > 0
                              ? `(Includes +£${addonsTotalSum} boosters)`
                              : 'Fixed Studio Fee'}
                          </span>
                        </div>
                        <div
                          className={`text-xs mt-1 ${
                            pkg.highlight ? 'text-[#DDD6FE]' : 'text-[#534D66]'
                          }`}
                        >
                          Or £{Math.round(totalWithAddons * 0.5).toLocaleString()} (50% studio
                          deposit) to start today
                        </div>
                      </div>

                      {/* Deliverables */}
                      <div className="space-y-2.5">
                        <div
                          className={`text-xs font-semibold uppercase tracking-wider ${
                            pkg.highlight ? 'text-[#DDD6FE]' : 'text-[#534D66]'
                          }`}
                        >
                          What’s Included:
                        </div>
                        <ul className="space-y-2.5">
                          {pkg.coreDeliverables.map((item, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-xs leading-relaxed">
                              <Check
                                className={`w-4 h-4 shrink-0 mt-0.5 ${
                                  pkg.highlight ? 'text-[#DDD6FE]' : 'text-[#4C1D95]'
                                }`}
                              />
                              <span className={pkg.highlight ? 'text-white/90' : 'text-[#2D263E]'}>
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-current/10">
                      <div
                        className={`text-[11px] leading-snug ${
                          pkg.highlight ? 'text-white/70' : 'text-[#534D66]'
                        }`}
                      >
                        <strong className={pkg.highlight ? 'text-white' : 'text-[#140E21]'}>
                          Guarantee:
                        </strong>{' '}
                        {pkg.guarantee}
                      </div>

                      <button
                        type="button"
                        onClick={() => setCheckoutPackage(pkg)}
                        className={`w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                          pkg.highlight
                            ? 'bg-[#4C1D95] hover:bg-[#6D28D9] text-white'
                            : 'bg-[#140E21] hover:bg-[#4C1D95] text-white'
                        }`}
                      >
                        <span>Configure & Reserve Package</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Interactive Booster Add-ons Strip + Local SEO ROI Calculator */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-4">
              {/* Left 7 Columns: Optional Package Boosters */}
              <div className="lg:col-span-7 p-6 sm:p-8 rounded-xl bg-[#F4F1EA] border border-[#140E21]/10 flex flex-col justify-between space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#4C1D95] inline-flex items-center gap-1.5">
                      <Sliders className="w-3.5 h-3.5" />
                      <span>Interactive Scope Customizer</span>
                    </span>
                    {addonsTotalSum > 0 && (
                      <button
                        type="button"
                        onClick={() => setSelectedAddonIds([])}
                        className="text-xs text-[#534D66] hover:text-[#140E21] underline cursor-pointer"
                      >
                        Reset Add-ons (+£{addonsTotalSum})
                      </button>
                    )}
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#140E21]">
                    Add Optional SEO, Content & Express Sprint Boosters
                  </h3>
                  <p className="text-xs sm:text-sm text-[#534D66]">
                    Select any add-on below to preview live package investment across all three
                    studio tiers above.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {PACKAGE_ADDONS.map((addon) => {
                    const isChecked = selectedAddonIds.includes(addon.id);
                    return (
                      <button
                        key={addon.id}
                        type="button"
                        onClick={() => toggleAddon(addon.id)}
                        className={`p-4 rounded-lg border text-left transition-colors cursor-pointer flex flex-col justify-between gap-3 ${
                          isChecked
                            ? 'bg-white border-[#4C1D95] shadow-xs'
                            : 'bg-[#FCFBF9] border-[#140E21]/10 hover:border-[#140E21]/25'
                        }`}
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-semibold text-[#140E21] flex items-center gap-2">
                              <span
                                className={`w-4 h-4 rounded flex items-center justify-center border shrink-0 ${
                                  isChecked
                                    ? 'bg-[#4C1D95] border-[#4C1D95] text-white'
                                    : 'border-[#534D66]/40 bg-white'
                                }`}
                              >
                                {isChecked && <Check className="w-3 h-3" />}
                              </span>
                              <span>{addon.title}</span>
                            </span>
                          </div>
                          <p className="text-xs text-[#534D66] leading-relaxed">
                            {addon.description}
                          </p>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-[#140E21]/8 text-xs">
                          <span className="text-[#534D66]">{addon.timelineImpact}</span>
                          <span className="font-mono-tabular font-bold text-[#4C1D95]">
                            +£{addon.price}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right 5 Columns: Interactive Local SEO & Website ROI Estimator */}
              <div className="lg:col-span-5 p-6 sm:p-8 rounded-xl bg-white border border-[#140E21]/12 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#4C1D95] inline-flex items-center gap-1.5">
                    <Calculator className="w-3.5 h-3.5" />
                    <span>Website & GMB Return Estimator</span>
                  </div>
                  <h3 className="font-display text-xl font-semibold text-[#140E21]">
                    Estimate Your Monthly Revenue Lift
                  </h3>

                  {/* Sliders */}
                  <div className="space-y-4 pt-2">
                    <div>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-[#534D66]">Current Monthly Local Visitors / Views</span>
                        <span className="font-mono-tabular font-semibold text-[#140E21]">
                          {monthlyVisitors.toLocaleString()} / mo
                        </span>
                      </div>
                      <input
                        type="range"
                        min={150}
                        max={3000}
                        step={50}
                        value={monthlyVisitors}
                        onChange={(e) => setMonthlyVisitors(Number(e.target.value))}
                        className="w-full accent-[#4C1D95] cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-[#534D66]">Average Value per New Client (£)</span>
                        <span className="font-mono-tabular font-semibold text-[#140E21]">
                          £{avgClientValue.toLocaleString()}
                        </span>
                      </div>
                      <input
                        type="range"
                        min={150}
                        max={5000}
                        step={50}
                        value={avgClientValue}
                        onChange={(e) => setAvgClientValue(Number(e.target.value))}
                        className="w-full accent-[#4C1D95] cursor-pointer"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => setIncludeGmbTop3(!includeGmbTop3)}
                      className="w-full flex items-center justify-between p-3 rounded-lg bg-[#F4F1EA] border border-[#140E21]/10 text-xs font-medium text-[#140E21] cursor-pointer"
                    >
                      <span>Include Top-3 Sutton Google Map Pack SEO</span>
                      <span
                        className={`font-mono-tabular font-semibold ${
                          includeGmbTop3 ? 'text-[#4C1D95]' : 'text-[#534D66]'
                        }`}
                      >
                        {includeGmbTop3 ? 'Enabled (+115% Reach)' : 'Disabled'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Output Results */}
                <div className="p-4 rounded-lg bg-[#140E21] text-white space-y-3">
                  <div className="flex items-center justify-between text-xs text-white/75">
                    <span>Projected Qualified Inquiries:</span>
                    <span className="font-mono-tabular font-semibold text-white">
                      {roiMetrics.projectedLeads} inquiries / mo (+{roiMetrics.additionalMonthlyLeads})
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between pt-2 border-t border-white/15">
                    <span className="text-xs text-[#DDD6FE]">Estimated Monthly Revenue Lift:</span>
                    <span className="font-mono-tabular text-2xl font-bold text-white">
                      +£{roiMetrics.projectedMonthlyRevenueLift.toLocaleString()}/mo
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            5. THE SUTTON DIGITAL JOURNAL (Full SEO Blog & Local Growth Hub)
           ===================================================================== */}
        <section id="journal" className="py-16 sm:py-24 bg-[#F4F1EA] border-b border-[#140E21]/10">
          <div className="max-w-[1280px] mx-auto px-6 space-y-12">
            {/* Journal Header + Search & Category Filter */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#4C1D95]">
                  The Sutton Digital Journal · SEO, Web Architecture & Growth Guides
                </div>
                <h2
                  className="font-display text-3xl sm:text-4xl font-semibold text-[#140E21] tracking-tight"
                  style={{ textWrap: 'balance' }}
                >
                  Practical Playbooks for Ranking #1 & Converting Local Buyers
                </h2>
                <p className="text-base text-[#534D66] leading-relaxed">
                  In-depth guides written by Amelie Barton on Google Business Profile optimization,
                  Core Web Vitals engineering, and high-converting digital storefronts.
                </p>
              </div>

              {/* Search Input */}
              <div className="relative w-full lg:w-72 shrink-0">
                <Search className="w-4 h-4 text-[#534D66] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="search"
                  value={blogSearchQuery}
                  onChange={(e) => setBlogSearchQuery(e.target.value)}
                  placeholder="Search SEO & design guides..."
                  aria-label="Search blog articles"
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white border border-[#140E21]/15 rounded-lg focus:outline-none focus:border-[#4C1D95]"
                />
              </div>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#FCFBF9] border border-[#140E21]/10 rounded-lg w-fit">
              {(
                [
                  'All',
                  'Local SEO & GMB',
                  'Web Architecture',
                  'E-Commerce & Conversion',
                  'WordPress & Speed',
                ] as const
              ).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setBlogCategory(cat)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    blogCategory === cat
                      ? 'bg-[#4C1D95] text-white'
                      : 'text-[#534D66] hover:text-[#140E21]'
                  }`}
                >
                  {cat === 'All' ? `All Guides (${BLOG_ARTICLES.length})` : cat}
                </button>
              ))}
            </div>

            {/* Featured Flagship Guide (when 'All' is active and no search filter) */}
            {blogCategory === 'All' && !blogSearchQuery.trim() && (
              <div className="p-6 sm:p-8 rounded-xl bg-white border border-[#140E21]/12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                <div className="lg:col-span-6 relative rounded-lg overflow-hidden bg-[#140E21] min-h-[260px]">
                  <img
                    src={BLOG_ARTICLES[0].coverImage}
                    alt={BLOG_ARTICLES[0].title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="lg:col-span-6 flex flex-col justify-between space-y-6 py-1">
                  <div className="space-y-3">
                    {/* Unboxed Metadata */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#534D66]">
                      <span className="font-semibold text-[#4C1D95]">Featured Flagship Guide</span>
                      <span aria-hidden="true">·</span>
                      <span>{BLOG_ARTICLES[0].category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{BLOG_ARTICLES[0].publishedDate}</span>
                      <span aria-hidden="true">·</span>
                      <span>{BLOG_ARTICLES[0].readTime}</span>
                    </div>

                    <h3
                      className="font-display text-2xl sm:text-3xl font-semibold text-[#140E21] leading-tight"
                      style={{ textWrap: 'balance' }}
                    >
                      {BLOG_ARTICLES[0].title}
                    </h3>

                    <p className="text-sm text-[#534D66] leading-relaxed">
                      {BLOG_ARTICLES[0].excerpt}
                    </p>

                    <div className="pt-2 space-y-1.5">
                      <div className="text-xs font-semibold text-[#140E21]">
                        Inside this blueprint:
                      </div>
                      {BLOG_ARTICLES[0].keyTakeaways.slice(0, 2).map((point, pIdx) => (
                        <div
                          key={pIdx}
                          className="flex items-start gap-2 text-xs text-[#534D66]"
                        >
                          <Check className="w-3.5 h-3.5 text-[#4C1D95] shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[#140E21]/10">
                    <button
                      type="button"
                      onClick={() => setActiveArticle(BLOG_ARTICLES[0])}
                      className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold bg-[#4C1D95] hover:bg-[#3B0764] text-white rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>Read Full Blueprint & Checklist</span>
                    </button>
                    <span className="text-xs text-[#534D66]">
                      Includes interactive 5-point Sutton GMB audit
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Articles Grid */}
            {filteredArticles.length === 0 ? (
              <div className="p-12 rounded-xl bg-white border border-[#140E21]/10 text-center space-y-3">
                <div className="font-display text-xl font-semibold text-[#140E21]">
                  No guides matched "{blogSearchQuery}"
                </div>
                <p className="text-sm text-[#534D66]">
                  Try clearing your search filter or exploring all categories.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setBlogCategory('All');
                    setBlogSearchQuery('');
                  }}
                  className="px-4 py-2 text-xs font-semibold bg-[#4C1D95] text-white rounded-lg cursor-pointer"
                >
                  Show All Guides
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map((article) => (
                  <article
                    key={article.id}
                    className="rounded-xl bg-white border border-[#140E21]/10 overflow-hidden flex flex-col justify-between hover:border-[#4C1D95]/40 transition-colors group"
                  >
                    <div>
                      <div className="aspect-[16/10] w-full bg-[#140E21] overflow-hidden">
                        <img
                          src={article.coverImage}
                          alt={article.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-200"
                        />
                      </div>
                      <div className="p-6 space-y-3">
                        {/* Unboxed Metadata */}
                        <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#534D66]">
                          <span className="font-medium text-[#4C1D95]">{article.category}</span>
                          <span aria-hidden="true">·</span>
                          <span>{article.publishedDate}</span>
                          <span aria-hidden="true">·</span>
                          <span>{article.readTime}</span>
                        </div>

                        <h3 className="font-display text-lg font-semibold text-[#140E21] leading-snug">
                          {article.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-[#534D66] leading-relaxed line-clamp-3">
                          {article.excerpt}
                        </p>
                      </div>
                    </div>

                    <div className="px-6 pb-6 pt-3 border-t border-[#140E21]/8 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setActiveArticle(article)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4C1D95] hover:text-[#3B0764] cursor-pointer whitespace-nowrap"
                      >
                        <span>Read Full Article</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-[11px] text-[#534D66]">By Amelie Barton</span>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* =====================================================================
            6. ABOUT AMELIE BARTON & STUDIO PRINCIPLES (Sutton SM1 4AF)
           ===================================================================== */}
        <section id="about" className="py-16 sm:py-24 border-b border-[#140E21]/10">
          <div className="max-w-[1280px] mx-auto px-6 space-y-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
              {/* Left 5 Cols: Portrait */}
              <div className="lg:col-span-5 relative rounded-xl overflow-hidden bg-[#140E21] border border-[#140E21]/10 min-h-[340px]">
                <img
                  src={STUDIO_INFO.images.ameliePortrait}
                  alt="Amelie Barton working at her Sutton website design studio"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#140E21]/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                  <div className="text-xs text-[#DDD6FE]">Founder & Lead Website Designer</div>
                  <div className="font-display text-xl font-semibold">
                    Amelie Barton · Sutton, SM1 4AF
                  </div>
                </div>
              </div>

              {/* Right 7 Cols: Studio Philosophy & 4 Principles */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
                <div className="space-y-4">
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#4C1D95]">
                    About Amelie Barton · Dedicated Website Craft in Sutton
                  </div>
                  <h2
                    className="font-display text-3xl sm:text-4xl font-semibold text-[#140E21] tracking-tight"
                    style={{ textWrap: 'balance' }}
                  >
                    Direct One-on-One Collaboration. Zero Agency Hand-Offs.
                  </h2>
                  <p className="text-base text-[#2D263E] leading-relaxed">
                    I work directly with independent businesses, professional practices, and
                    ambitious brands across Sutton, Surrey, and Greater London to build digital
                    flagships that command authority. Based at Gemini Court on Throwley Way, my
                    practice offers a calm, personal alternative to bloated agencies—giving you a
                    single dedicated partner from initial wireframe to #1 local search ranking.
                  </p>
                </div>

                {/* 4 Editorial Numbered Principles */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#140E21]/10">
                  <div className="space-y-1.5">
                    <div className="font-display text-base font-semibold text-[#140E21]">
                      01. Sutton Studio Presence
                    </div>
                    <p className="text-xs sm:text-sm text-[#534D66] leading-relaxed">
                      Based at 1 Gemini Court, 42a Throwley Way (SM1 4AF), providing direct
                      communication, local accountability, and transparent timelines.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <div className="font-display text-base font-semibold text-[#140E21]">
                      02. Direct 1-on-1 Partnership
                    </div>
                    <p className="text-xs sm:text-sm text-[#534D66] leading-relaxed">
                      Work directly with Amelie Barton from concept to completion. No junior
                      account handlers, no diluted feedback, no hidden fees.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <div className="font-display text-base font-semibold text-[#140E21]">
                      03. Full-Spectrum GMB & Web Sync
                    </div>
                    <p className="text-xs sm:text-sm text-[#534D66] leading-relaxed">
                      From bespoke visual design and responsive code to LocalBusiness schema and
                      Google Business Profile optimization, everything works in harmony.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <div className="font-display text-base font-semibold text-[#140E21]">
                      04. Engineered for Conversion
                    </div>
                    <p className="text-xs sm:text-sm text-[#534D66] leading-relaxed">
                      Lightweight, accessible code structured to load in under a second on mobile
                      and turn local searchers into immediate inquiries.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            7. CONTACT, VERIFIED GMB NAP DETAILS & FAQ
           ===================================================================== */}
        <section id="contact" className="py-16 sm:py-24 bg-[#F4F1EA]">
          <div className="max-w-[1280px] mx-auto px-6 space-y-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left 5 Cols: Exact GMB NAP & Direct Channels */}
              <div className="lg:col-span-5 space-y-8">
                <div className="space-y-3">
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#4C1D95]">
                    Initiate Your Project · Sutton & Greater London
                  </div>
                  <h2
                    className="font-display text-3xl sm:text-4xl font-semibold text-[#140E21] tracking-tight"
                    style={{ textWrap: 'balance' }}
                  >
                    Let’s Build & Rank Your Website
                  </h2>
                  <p className="text-sm sm:text-base text-[#534D66] leading-relaxed">
                    Reach out on WhatsApp for an immediate response, call the studio directly, or
                    send your project details using the inquiry form.
                  </p>
                </div>

                {/* Verified GMB NAP Card */}
                <div className="p-6 rounded-xl bg-[#FCFBF9] border border-[#140E21]/12 space-y-5">
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#4C1D95]">
                    Verified Google Business Profile Details
                  </div>

                  <div className="space-y-4 text-sm">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-[#4C1D95] shrink-0 mt-1" />
                      <div>
                        <div className="font-semibold text-[#140E21]">Studio Address</div>
                        <div className="text-[#534D66]">{STUDIO_INFO.location.fullAddress}</div>
                        <a
                          href={STUDIO_INFO.location.googleMapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-semibold text-[#4C1D95] hover:underline mt-1"
                        >
                          <span>Get Directions on Google Maps</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="w-4 h-4 text-[#4C1D95] shrink-0 mt-1" />
                      <div>
                        <div className="font-semibold text-[#140E21]">Telephone & WhatsApp</div>
                        <a
                          href={STUDIO_INFO.contact.phoneHref}
                          className="font-mono-tabular text-[#534D66] hover:text-[#140E21] block"
                        >
                          {STUDIO_INFO.contact.phoneDisplay}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Mail className="w-4 h-4 text-[#4C1D95] shrink-0 mt-1" />
                      <div>
                        <div className="font-semibold text-[#140E21]">Studio Email</div>
                        <a
                          href={STUDIO_INFO.contact.emailHref}
                          className="text-[#534D66] hover:text-[#140E21] block"
                        >
                          {STUDIO_INFO.contact.email}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#140E21]/10 space-y-2">
                    <div className="text-xs font-semibold text-[#140E21]">
                      Areas Served Across Sutton & London:
                    </div>
                    <div className="text-xs text-[#534D66] leading-relaxed">
                      {STUDIO_INFO.location.serviceAreas.join(' · ')}
                    </div>
                  </div>

                  <a
                    href={STUDIO_INFO.contact.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold bg-[#1E6F45] hover:bg-[#155232] text-white rounded-lg transition-colors whitespace-nowrap"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Message Amelie Directly on WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Right 7 Cols: Interactive Project Inquiry Form */}
              <div className="lg:col-span-7 p-6 sm:p-10 rounded-xl bg-white border border-[#140E21]/12">
                {contactSubmitted ? (
                  <div className="py-8 space-y-5">
                    <div className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
                      Inquiry Received · Amelie Barton Studio
                    </div>
                    <h3 className="font-display text-2xl font-semibold text-[#140E21]">
                      Thank you, {contactName}. Your inquiry is with Amelie.
                    </h3>
                    <p className="text-sm text-[#534D66] leading-relaxed">
                      We have logged your interest in{' '}
                      <strong className="text-[#140E21]">{selectedServiceInquiry}</strong> and will
                      reply to <strong className="text-[#140E21]">{contactEmail}</strong> within
                      one business day.
                    </p>
                    <div className="flex flex-wrap gap-3 pt-2">
                      <a
                        href={STUDIO_INFO.contact.whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold bg-[#1E6F45] text-white rounded-lg"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Fast-Track on WhatsApp</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          setContactSubmitted(false);
                          setContactMessage('');
                        }}
                        className="px-4 py-2.5 text-xs font-semibold text-[#140E21] border border-[#140E21]/20 rounded-lg cursor-pointer"
                      >
                        Send Another Message
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-5">
                    <div className="space-y-1">
                      <h3 className="font-display text-2xl font-semibold text-[#140E21]">
                        Request a Project Consultation or Quote
                      </h3>
                      <p className="text-xs text-[#534D66]">
                        Direct response from Amelie Barton within 24 hours · No obligation
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#140E21] mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          placeholder="Your name"
                          className="w-full px-3.5 py-2.5 text-sm bg-[#FCFBF9] border border-[#140E21]/15 rounded-lg focus:outline-none focus:border-[#4C1D95]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#140E21] mb-1.5">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          placeholder="you@company.co.uk"
                          className="w-full px-3.5 py-2.5 text-sm bg-[#FCFBF9] border border-[#140E21]/15 rounded-lg focus:outline-none focus:border-[#4C1D95]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#140E21] mb-1.5">
                          Phone / WhatsApp Number
                        </label>
                        <input
                          type="tel"
                          value={contactPhone}
                          onChange={(e) => setContactPhone(e.target.value)}
                          placeholder="+44 7..."
                          className="w-full px-3.5 py-2.5 text-sm bg-[#FCFBF9] border border-[#140E21]/15 rounded-lg focus:outline-none focus:border-[#4C1D95]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#140E21] mb-1.5">
                          Business Name or Website URL
                        </label>
                        <input
                          type="text"
                          value={contactBusiness}
                          onChange={(e) => setContactBusiness(e.target.value)}
                          placeholder="e.g. Sutton Practice Ltd"
                          className="w-full px-3.5 py-2.5 text-sm bg-[#FCFBF9] border border-[#140E21]/15 rounded-lg focus:outline-none focus:border-[#4C1D95]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#140E21] mb-1.5">
                        Primary Service or Package Required
                      </label>
                      <select
                        value={selectedServiceInquiry}
                        onChange={(e) => setSelectedServiceInquiry(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-[#FCFBF9] border border-[#140E21]/15 rounded-lg focus:outline-none focus:border-[#4C1D95]"
                      >
                        <optgroup label="Studio Packages">
                          {STUDIO_PACKAGES.map((p) => (
                            <option key={p.id} value={p.name}>
                              {p.name} (£{p.price.toLocaleString()})
                            </option>
                          ))}
                        </optgroup>
                        <optgroup label="12 Individual GMB Services">
                          {GMB_SERVICES.map((s) => (
                            <option key={s.id} value={s.title}>
                              {s.title} (From £{s.startingPrice.toLocaleString()})
                            </option>
                          ))}
                        </optgroup>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#140E21] mb-1.5">
                        Project Goals & Timeline *
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        placeholder="Tell Amelie about your business, what you want your new website to achieve, and any local search keywords you want to rank for..."
                        className="w-full px-3.5 py-2.5 text-sm bg-[#FCFBF9] border border-[#140E21]/15 rounded-lg focus:outline-none focus:border-[#4C1D95]"
                      />
                    </div>

                    {contactError && (
                      <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
                        {contactError}
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold bg-[#4C1D95] hover:bg-[#3B0764] text-white rounded-lg transition-colors cursor-pointer"
                    >
                      <span>Send Project Inquiry</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* FAQ Section */}
            <div id="faq" className="pt-12 border-t border-[#140E21]/10 max-w-3xl mx-auto space-y-8">
              <div className="text-center space-y-2">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#4C1D95]">
                  Questions & Answers
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#140E21]">
                  Common Questions About Working Together
                </h3>
              </div>

              <div className="space-y-3">
                {FAQ_ITEMS.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-xl bg-[#FCFBF9] border border-[#140E21]/12 overflow-hidden"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                        aria-expanded={isOpen}
                        className="w-full px-6 py-4 flex items-center justify-between gap-4 text-left cursor-pointer"
                      >
                        <span className="font-display text-base sm:text-lg font-medium text-[#140E21]">
                          {faq.question}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-[#4C1D95] shrink-0 transition-transform duration-150 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-5 pt-1 text-sm text-[#534D66] leading-relaxed border-t border-[#140E21]/6">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* =====================================================================
          8. QUIET FOOTER + LIVE GMB & SCHEMA.ORG SEO AUDIT VIEWER
         ===================================================================== */}
      <footer className="bg-[#100B1A] text-white py-14 border-t border-white/10">
        <div className="max-w-[1280px] mx-auto px-6 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Col 1: Brand & NAP */}
            <div className="space-y-3">
              <div className="font-display text-xl font-semibold text-white">
                {STUDIO_INFO.name}
              </div>
              <p className="text-xs text-white/70">{STUDIO_INFO.tagline}</p>
              <p className="text-xs text-white/55 leading-relaxed">
                {STUDIO_INFO.location.fullAddress}
              </p>
              <div className="text-xs text-white/55">{STUDIO_INFO.location.openingHours}</div>
            </div>

            {/* Col 2: Core GMB Services */}
            <div className="space-y-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#DDD6FE]">
                Core GMB Services
              </div>
              <ul className="space-y-2 text-xs text-white/75">
                {GMB_SERVICES.slice(0, 6).map((s) => (
                  <li key={s.id}>
                    <a
                      href="#services"
                      onClick={() => setServiceFilter('All')}
                      className="hover:text-white transition-colors"
                    >
                      {s.title} in Sutton
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Latest SEO Journal Guides */}
            <div className="space-y-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#DDD6FE]">
                Sutton Digital Journal
              </div>
              <ul className="space-y-2 text-xs text-white/75">
                {BLOG_ARTICLES.slice(0, 4).map((art) => (
                  <li key={art.id}>
                    <button
                      type="button"
                      onClick={() => setActiveArticle(art)}
                      className="text-left hover:text-white transition-colors cursor-pointer line-clamp-1"
                    >
                      {art.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4: Direct Contact & Technical SEO Verification */}
            <div className="space-y-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#DDD6FE]">
                Direct Contact
              </div>
              <ul className="space-y-2 text-xs text-white/75">
                <li>
                  <a
                    href={STUDIO_INFO.contact.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white"
                  >
                    WhatsApp: {STUDIO_INFO.contact.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a href={STUDIO_INFO.contact.phoneHref} className="hover:text-white">
                    Tel: {STUDIO_INFO.contact.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a href={STUDIO_INFO.contact.emailHref} className="hover:text-white">
                    {STUDIO_INFO.contact.email}
                  </a>
                </li>
                <li>
                  <a
                    href={STUDIO_INFO.location.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white underline"
                  >
                    View Studio on Google Maps
                  </a>
                </li>
              </ul>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setShowSeoAuditDrawer(!showSeoAuditDrawer)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold text-[#DDD6FE] bg-white/10 hover:bg-white/15 rounded-md transition-colors cursor-pointer whitespace-nowrap"
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>
                    {showSeoAuditDrawer ? 'Hide SEO & GMB Schema' : 'Inspect Live GMB & SEO Schema'}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Collapsible SEO & GMB Ranking Verification Drawer */}
          {showSeoAuditDrawer && (
            <div className="p-6 rounded-xl bg-white/5 border border-white/15 space-y-4 text-xs">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="font-semibold text-[#DDD6FE] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>
                    Active Local SEO & Google Business Profile Architecture (Embedded in HTML Head)
                  </span>
                </div>
                <span className="font-mono-tabular text-white/60">
                  Schema.org @graph: ProfessionalService + LocalBusiness + OfferCatalog + FAQPage
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white/80">
                <div className="p-3.5 rounded-lg bg-black/30 border border-white/10 space-y-1">
                  <div className="font-semibold text-white">1. Verified GMB NAP Match</div>
                  <div>Name: Amelie Barton (Website Designer)</div>
                  <div>Address: 1 Gemini Court, 42a Throwley Way, Sutton, SM1 4AF</div>
                  <div>Phone: +44 (0)7915 929263 · Geo: 51.3618, -0.1916</div>
                </div>
                <div className="p-3.5 rounded-lg bg-black/30 border border-white/10 space-y-1">
                  <div className="font-semibold text-white">2. OfferCatalog & 12 Services</div>
                  <div>
                    All 12 GMB services (Website Design, Development, E-Commerce, WordPress, Local
                    SEO, GMB Optimization, etc.) indexed in structured data.
                  </div>
                </div>
                <div className="p-3.5 rounded-lg bg-black/30 border border-white/10 space-y-1">
                  <div className="font-semibold text-white">3. Editorial Authority Cluster</div>
                  <div>
                    6 long-form geo-targeted articles targeting Sutton, Surrey & Greater London
                    search intent with interactive checklists.
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
            <div>
              © {new Date().getFullYear()} {STUDIO_INFO.name}. All rights reserved. Registered
              Studio at 1 Gemini Court, Sutton SM1 4AF.
            </div>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-white/75 hover:text-white cursor-pointer"
            >
              Back to top ↑
            </button>
          </div>
        </div>
      </footer>

      {/* Interactive Modals */}
      <ArticleModal
        article={activeArticle}
        onClose={() => setActiveArticle(null)}
        onSelectService={(serviceId, articleTitle) => {
          const matched = GMB_SERVICES.find((s) => s.id === serviceId);
          handleSelectServiceToContact(
            matched ? matched.title : 'Google Business Profile Optimization',
            articleTitle
          );
        }}
        onSelectArticle={(newArt) => setActiveArticle(newArt)}
        allArticles={BLOG_ARTICLES}
      />

      <PackageCheckoutModal
        selectedPackage={checkoutPackage}
        selectedAddons={activeAddons}
        onToggleAddon={toggleAddon}
        allAddons={PACKAGE_ADDONS}
        onClose={() => setCheckoutPackage(null)}
      />
    </div>
  );
}
