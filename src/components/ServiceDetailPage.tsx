import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Check,
  Copy,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Mail,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Compass,
  ArrowUpRight,
  HelpCircle,
  Tag,
  Share2,
  Megaphone,
  Search,
  Globe,
  Palette,
  MapPin,
  LineChart,
} from 'lucide-react';
import {
  DetailedService,
  DETAILED_SERVICES_DATA,
  getServiceBySlug,
} from '../data/servicesDetailedData';
import {
  COMPANY_INFO,
  RoutePath,
  buildWhatsAppUrl,
  ServiceIconKey,
} from '../data/agencyData';
import { getServiceHeroImage } from '../data/agencyImages';
import { generateSocialShareLinks } from '../lib/seoMeta';
import { Breadcrumbs } from './Breadcrumbs';

interface ServiceDetailPageProps {
  service: DetailedService;
  onNavigate: (path: RoutePath) => void;
  onGetStartedWithService: (serviceTitle: string, note?: string) => void;
}

function getServiceIcon(iconKey: ServiceIconKey) {
  switch (iconKey) {
    case 'search':
      return Search;
    case 'share':
      return Share2;
    case 'megaphone':
      return Megaphone;
    case 'globe':
      return Globe;
    case 'palette':
      return Palette;
    case 'mail':
      return Mail;
    case 'mapPin':
      return MapPin;
    case 'compass':
      return Compass;
    case 'lineChart':
      return LineChart;
  }
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  service,
  onNavigate,
  onGetStartedWithService,
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  const ServiceIcon = getServiceIcon(service.iconKey);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex((prev) => (prev === idx ? null : idx));
  };

  const relatedServices = service.relatedSlugs
    .map((slug) => getServiceBySlug(slug))
    .filter((s): s is DetailedService => Boolean(s));

  const directWhatsAppQuoteUrl = buildWhatsAppUrl(
    `Hello ZENVEXA Digital Agency! I would like to get a free quote regarding your ${service.title} service for my business.`
  );

  const pageUrl =
    typeof window !== 'undefined'
      ? window.location.href
      : `https://zenvexa.agency/services/${service.slug}`;

  const shareLinks = generateSocialShareLinks({
    url: pageUrl,
    title: `${service.title} — ZENVEXA Digital Agency`,
    summary: service.heroDescription,
  });

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb Navigation */}
      <Breadcrumbs
        items={[
          { label: 'Services', path: '/services' },
          { label: service.title },
        ]}
        onNavigate={onNavigate}
        subtitle={`${service.number} · ${service.strategicFocus}`}
      />

      {/* ========================================================================= */}
      {/* SECTION A: Unique Premium Service Hero Banner */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-16 lg:pb-24 bg-gradient-to-b from-[#F8F7FF] via-[#FAF9FE] to-white border-b border-indigo-100/70">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-gradient-to-br from-[#6A35FF]/10 to-[#4361EE]/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-80 h-80 rounded-full bg-gradient-to-tr from-[#3B82F6]/10 to-[#8B5CF6]/5 blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            {/* Hero Left: Headline, Subtitle & Action Triggers */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white border border-indigo-100 shadow-2xs">
                <div
                  className={`w-6 h-6 rounded-lg bg-gradient-to-br ${service.iconGradient} text-white flex items-center justify-center shrink-0`}
                >
                  <ServiceIcon className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-bold text-[#6A35FF]">
                  ZENVEXA Service {service.number}
                </span>
                <span className="text-slate-300" aria-hidden="true">·</span>
                <span className="text-xs text-slate-600 font-medium">
                  {service.tagline}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0B0F19] leading-tight headline-balance">
                {service.heroHeadline}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                {service.heroDescription}
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                <button
                  type="button"
                  onClick={() =>
                    onGetStartedWithService(
                      service.title,
                      `Hello ZENVEXA Team, I would like to get started with ${service.title}. Here are my project details:`
                    )
                  }
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm sm:text-base font-semibold text-white bg-brand-gradient bg-brand-gradient-hover rounded-xl shadow-md shadow-indigo-500/20 transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-[#6A35FF]"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={directWhatsAppQuoteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-semibold text-[#0B0F19] bg-white hover:bg-slate-50 border border-slate-300 hover:border-indigo-300 rounded-xl transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-[#6A35FF]" />
                  <span>Get a Free Quote</span>
                </a>
              </div>

              {/* Open Graph Social Sharing Strip for LinkedIn, Twitter, and Facebook */}
              <div className="pt-1 flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5 mr-1">
                  <Share2 className="w-3.5 h-3.5 text-[#6A35FF]" />
                  <span>Share Service:</span>
                </span>

                <a
                  href={shareLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Share this service on LinkedIn"
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-[#0A66C2] bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 border border-[#0A66C2]/25 rounded-xl transition-colors cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                  <span>LinkedIn</span>
                </a>

                <a
                  href={shareLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Share this service on X / Twitter"
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl transition-colors cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  <span>Twitter / X</span>
                </a>

                <a
                  href={shareLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Share this service on Facebook"
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-[#1877F2] bg-[#1877F2]/10 hover:bg-[#1877F2]/20 border border-[#1877F2]/25 rounded-xl transition-colors cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
                  </svg>
                  <span>Facebook</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyLink}
                  title="Copy Service Link"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-indigo-100 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#6A35FF]" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>
              </div>

              {/* Starting Price & Guarantee Highlight */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-500 border-t border-indigo-100/80">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-[#6A35FF]" />
                  <span>
                    Starting Rate:{' '}
                    <strong className="text-[#0B0F19] font-bold">
                      ${service.startingPrice}
                    </strong>
                    /{service.billingType}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#6A35FF]" />
                  <span>No Long-Term Lock-ins</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#6A35FF]" />
                  <span>Tailored Scope Available</span>
                </div>
              </div>
            </div>

            {/* Hero Right: High-Resolution Cinematic Service Visual */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border border-indigo-100 shadow-2xl shadow-indigo-950/12 bg-slate-900 group">
                <img
                  src={getServiceHeroImage(service.slug)}
                  alt={`${service.title} — ZENVEXA Digital Agency`}
                  className="w-full aspect-[4/3] sm:aspect-[16/11] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  referrerPolicy="no-referrer"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />

                {/* Floating Service Badge */}
                <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-semibold shadow-md">
                  <div
                    className={`w-2.5 h-2.5 rounded-full bg-gradient-to-br ${service.iconGradient}`}
                  />
                  <span>Service {service.number} · {service.tagline}</span>
                </div>

                {/* Glassmorphic Metric Bottom Strip */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white/50 shadow-xl flex items-center justify-between gap-3">
                  <div>
                    <div className="text-xs font-bold text-[#0B0F19]">
                      {service.title}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Starting from ${service.startingPrice}/{service.billingType}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      onGetStartedWithService(
                        service.title,
                        `Hello ZENVEXA Team, I would like to get started with ${service.title}.`
                      )
                    }
                    className="px-3.5 py-1.5 text-xs font-bold text-white bg-brand-gradient rounded-xl shadow-xs cursor-pointer hover:opacity-95 whitespace-nowrap"
                  >
                    Start Project
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION B: Service Introduction */}
      {/* ========================================================================= */}
      <section className="py-16 lg:py-20 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center gap-3">
            <span className="text-xs sm:text-sm font-bold text-[#6A35FF]">
              Overview &amp; Strategy
            </span>
            <span className="h-0.5 w-10 bg-gradient-to-r from-[#6A35FF] to-[#3B82F6] rounded-full" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B0F19] tracking-tight">
            How Our {service.title} Drives Commercial Growth
          </h2>

          <div className="space-y-4 text-base text-slate-600 leading-relaxed">
            {service.introduction.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION C: What We Offer (Sub-Services Grid) */}
      {/* ========================================================================= */}
      <section className="py-20 bg-[#FAF9FE] border-b border-indigo-100/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <div className="text-xs sm:text-sm font-bold text-[#6A35FF]">
              Comprehensive Deliverables
            </div>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#0B0F19]">
              What We Offer in {service.title}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              Every deliverable is crafted for clarity, brand cohesion, and measurable commercial results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.subServices.map((sub, idx) => (
              <div
                key={sub.title}
                className="bg-white rounded-2xl p-6 border border-indigo-100/80 shadow-xs hover:shadow-md hover:border-indigo-300 transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#F5F3FF] text-[#6A35FF] font-bold text-xs flex items-center justify-center">
                    0{idx + 1}
                  </div>
                  <h3 className="text-base font-bold text-[#0B0F19]">
                    {sub.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {sub.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 text-xs font-semibold text-[#6A35FF] flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5" />
                  <span>{sub.keyDeliverable}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION D: Benefits & Business Value */}
      {/* ========================================================================= */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <div className="text-xs sm:text-sm font-bold text-[#6A35FF]">
              Commercial Advantages
            </div>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#0B0F19]">
              Why Invest in Professional {service.title}?
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              Tangible advantages that translate into higher authority, lower acquisition costs, and compounding growth.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-[#FAF9FE] rounded-2xl p-6 border border-indigo-100/80 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="text-xs font-bold text-[#6A35FF]">
                    {benefit.impactMetric}
                  </div>
                  <h3 className="text-base font-bold text-[#0B0F19]">
                    {benefit.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION E: Our Working Process */}
      {/* ========================================================================= */}
      <section className="py-20 bg-[#FAF9FE] border-b border-indigo-100/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <div className="text-xs sm:text-sm font-bold text-[#6A35FF]">
              Step-by-Step Delivery
            </div>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#0B0F19]">
              How ZENVEXA Executes {service.title}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              A transparent, structured workflow ensuring quality oversight, quick iterations, and consistent deadlines.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.process.map((step) => (
              <div
                key={step.step}
                className="bg-white rounded-2xl p-6 border border-indigo-100/80 shadow-xs relative space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="text-2xl font-black text-[#6A35FF]/30 tabular-nums">
                    {step.step}
                  </span>
                  <h3 className="text-base font-bold text-[#0B0F19]">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 text-xs font-semibold text-slate-700">
                  Deliverable: <span className="text-[#6A35FF]">{step.deliverable}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION F: Pricing & Quotation Transparency */}
      {/* ========================================================================= */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#F8F7FF] to-[#EEF0FF] rounded-3xl p-8 sm:p-10 border border-indigo-100/90 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-[#6A35FF]">
                  Transparent Pricing
                </span>
                <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#0B0F19]">
                  Starting at ${service.startingPrice}/{service.billingType}
                </h2>
                <div className="text-xs sm:text-sm text-slate-500 mt-1">
                  {service.pricingSubtitle}
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  onGetStartedWithService(
                    service.title,
                    `Hello ZENVEXA Team, I would like to get started with ${service.title} ($${service.startingPrice}/${service.billingType}).`
                  )
                }
                className="px-6 py-3.5 text-sm font-semibold text-white bg-brand-gradient rounded-xl shadow-md cursor-pointer shrink-0"
              >
                Request Custom Plan
              </button>
            </div>

            <div className="pt-4 border-t border-indigo-100 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <strong className="text-[#0B0F19] block mb-1">
                What Influences the Final Quotation:
              </strong>
              {service.priceExplanation}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION G: Service-Specific FAQs */}
      {/* ========================================================================= */}
      <section className="py-20 bg-[#FAF9FE] border-b border-indigo-100/70">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <div className="text-xs sm:text-sm font-bold text-[#6A35FF]">
              Got Questions?
            </div>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#0B0F19]">
              Frequently Asked Questions About {service.title}
            </h2>
          </div>

          <div className="space-y-3">
            {service.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={faq.question}
                  className="bg-white rounded-2xl border border-indigo-100/90 overflow-hidden shadow-2xs transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#6A35FF]"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm sm:text-base font-bold text-[#0B0F19]">
                      {faq.question}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#6A35FF] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION H: Final CTA */}
      {/* ========================================================================= */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#0B0F19] to-[#1E1B4B] rounded-3xl p-8 sm:p-12 text-white text-center space-y-6 shadow-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-semibold text-indigo-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Let’s Grow Your Brand</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight headline-balance">
              Ready to Grow Your Business with {service.title}?
            </h2>

            <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-300 leading-relaxed">
              Connect directly with our team to discuss your goals, review your current digital assets, and receive a tailored growth plan.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3.5">
              <button
                type="button"
                onClick={() => onNavigate('/contact')}
                className="px-7 py-3.5 text-sm sm:text-base font-semibold text-white bg-brand-gradient bg-brand-gradient-hover rounded-xl shadow-lg cursor-pointer"
              >
                Contact Us Online
              </button>

              <a
                href={directWhatsAppQuoteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm sm:text-base font-semibold text-[#0B0F19] bg-white hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-[#6A35FF]" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION I: Related Services */}
      {/* ========================================================================= */}
      {relatedServices.length > 0 && (
        <section className="py-20 bg-[#FAF9FE]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-10">
              <div className="text-xs sm:text-sm font-bold text-[#6A35FF]">
                Cross-Channel Synergy
              </div>
              <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#0B0F19]">
                Related Services You Might Need
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedServices.map((rel) => {
                const RelIcon = getServiceIcon(rel.iconKey);
                return (
                  <div
                    key={rel.slug}
                    onClick={() => onNavigate(`/services/${rel.slug}` as RoutePath)}
                    className="bg-white rounded-2xl p-6 border border-indigo-100 shadow-2xs hover:shadow-md hover:border-indigo-300 transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div
                        className={`w-10 h-10 rounded-xl bg-gradient-to-br ${rel.iconGradient} text-white flex items-center justify-center`}
                      >
                        <RelIcon className="w-5 h-5" />
                      </div>
                      <h3 className="text-base font-bold text-[#0B0F19]">
                        {rel.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 line-clamp-2">
                        {rel.heroDescription}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#6A35FF]">
                      <span>Learn More</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
