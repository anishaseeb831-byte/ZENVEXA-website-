import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Check,
  ArrowRight,
  Sparkles,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  ShieldCheck,
  AlertCircle,
  Tag,
} from 'lucide-react';
import {
  PRICING_PACKAGES_DATA,
  PRICING_CONDITIONS,
  PRICING_TAGLINE_MESSAGE,
  RoutePath,
  buildWhatsAppUrl,
  ServiceItem,
} from '../data/agencyData';
import { Breadcrumbs } from './Breadcrumbs';
import { AGENCY_IMAGES } from '../data/agencyImages';

interface PricingPageProps {
  onNavigate: (path: RoutePath) => void;
  onGetService: (serviceTitle: string, priceNote: string) => void;
  onRequestCustomQuote: (serviceTitle: string) => void;
}

const PRICING_FAQS = [
  {
    question: 'Are these prices fixed or starting estimates?',
    answer:
      'All prices displayed are introductory starting rates in USD ($) designed for small and medium businesses. Final quotations depend on exact deliverable volume, custom features, timeline requirements, and project scope agreed in writing.',
  },
  {
    question: 'Is ad spend included in the Facebook & Instagram Ads management fee?',
    answer:
      'No. Advertising budgets paid to Meta (Facebook & Instagram) are paid directly to the platform via your business billing method. Our $99/month fee covers professional strategy, ad design, copywriting, campaign setup, pixel tracking, and ongoing optimization.',
  },
  {
    question: 'Are there any hidden setup fees or long-term contract lock-ins?',
    answer:
      'Zero hidden fees and no predatory multi-year lock-ins. Monthly retainers operate month-to-month and can be paused or adjusted with standard notice.',
  },
  {
    question: 'Can I bundle multiple services into a single discounted package?',
    answer:
      'Yes! Many of our clients combine Website Development + SEO + Meta Ads, or Social Media + Branding. We provide custom bundled quotations with unified monthly reporting.',
  },
  {
    question: 'What payment methods do you accept for international clients?',
    answer:
      'We accept bank transfers, Wise, Payoneer, international cards, and standard electronic payment methods for clients in Pakistan, the US, and worldwide.',
  },
];

export const PricingPage: React.FC<PricingPageProps> = ({
  onNavigate,
  onGetService,
  onRequestCustomQuote,
}) => {
  const [filter, setFilter] = useState<'all' | 'month' | 'project'>('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const filteredPackages = PRICING_PACKAGES_DATA.filter((pkg) => {
    if (filter === 'all') return true;
    return pkg.billingType === filter;
  });

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[{ label: 'Pricing & Packages' }]}
        onNavigate={onNavigate}
        subtitle="Transparent Introductory USD Starting Rates"
      />

      {/* Hero Banner with Bespoke Pricing Visual */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-16 lg:pb-20 bg-gradient-to-b from-[#F8F7FF] via-[#FAF9FE] to-white border-b border-indigo-100/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-indigo-100 text-xs font-bold text-[#6A35FF] shadow-2xs">
                <Tag className="w-3.5 h-3.5" />
                <span>SMB-Friendly Rates · Zero Hidden Lock-Ins</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0B0F19] leading-tight headline-balance">
                Transparent Pricing.{' '}
                <span className="text-brand-gradient">Customized Plans.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                {PRICING_TAGLINE_MESSAGE} Clear introductory USD rates designed to make professional marketing, branding, and web architecture accessible as you scale.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-1 p-1 bg-white rounded-2xl border border-indigo-100 shadow-xs">
                  <button
                    type="button"
                    onClick={() => setFilter('all')}
                    className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-colors cursor-pointer ${
                      filter === 'all'
                        ? 'bg-brand-gradient text-white shadow-xs'
                        : 'text-slate-600 hover:text-[#0B0F19]'
                    }`}
                  >
                    All Packages ({PRICING_PACKAGES_DATA.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setFilter('month')}
                    className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-colors cursor-pointer ${
                      filter === 'month'
                        ? 'bg-brand-gradient text-white shadow-xs'
                        : 'text-slate-600 hover:text-[#0B0F19]'
                    }`}
                  >
                    Monthly Retainers
                  </button>
                  <button
                    type="button"
                    onClick={() => setFilter('project')}
                    className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-colors cursor-pointer ${
                      filter === 'project'
                        ? 'bg-brand-gradient text-white shadow-xs'
                        : 'text-slate-600 hover:text-[#0B0F19]'
                    }`}
                  >
                    Project-Based
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl overflow-hidden shadow-2xl shadow-indigo-950/10 border border-indigo-100/90 group">
                <img
                  src={AGENCY_IMAGES.pricingHero}
                  alt="ZENVEXA Transparent Pricing and ROI Deliverables"
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19]/80 via-transparent to-transparent" />

                {/* Floating Glassmorphism Badge */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white/40 shadow-lg text-xs space-y-1">
                  <div className="flex items-center justify-between text-[#0B0F19] font-extrabold">
                    <span>Performance-First Value</span>
                    <span className="text-[#6A35FF]">No Setup Fees</span>
                  </div>
                  <p className="text-slate-600 text-[11px]">
                    Month-to-month retainers and project milestones agreed with total scope transparency.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards Grid */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredPackages.map((pkg, idx) => {
              const isPopular = pkg.id === 'website-development' || pkg.id === 'seo';

              return (
                <motion.article
                  key={pkg.id}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.25, delay: (idx % 4) * 0.04 }}
                  className={`bg-[#FAF9FE] rounded-3xl p-6 sm:p-7 border transition-all duration-200 flex flex-col justify-between ${
                    isPopular
                      ? 'border-[#6A35FF]/60 shadow-lg shadow-indigo-950/6 bg-white ring-2 ring-[#6A35FF]/10'
                      : 'border-indigo-100/80 hover:border-indigo-300 shadow-2xs hover:shadow-md'
                  }`}
                >
                  <div className="space-y-4">
                    {isPopular && (
                      <div className="text-[11px] font-bold text-[#6A35FF] uppercase tracking-wider">
                        Most Popular Choice
                      </div>
                    )}

                    <div>
                      <h3 className="text-lg font-bold text-[#0B0F19] leading-snug">
                        {pkg.pricingTitle}
                      </h3>
                      <p className="mt-1 text-xs text-slate-500 line-clamp-2">
                        {pkg.strategicFocus}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-indigo-100/80">
                      <div className="text-xs text-slate-500">Starting from</div>
                      <div className="text-3xl font-black text-[#0B0F19] tracking-tight">
                        ${pkg.startingPrice}
                        <span className="text-xs font-normal text-slate-500">
                          /{pkg.billingType}
                        </span>
                      </div>
                    </div>

                    <div className="pt-2 space-y-2">
                      <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                        Included Deliverables:
                      </div>
                      <ul className="space-y-1.5 text-xs text-slate-600">
                        {pkg.deliverables.slice(0, 5).map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-[#6A35FF] mt-0.5 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-indigo-100/70 space-y-2">
                    <button
                      type="button"
                      onClick={() =>
                        onGetService(
                          pkg.title,
                          `Starting at $${pkg.startingPrice}/${pkg.billingType}`
                        )
                      }
                      className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold text-white bg-brand-gradient hover:opacity-95 shadow-xs cursor-pointer"
                    >
                      <span>Get Started</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onNavigate(`/services/${pkg.slug}` as RoutePath)}
                      className="w-full text-center py-1 text-xs font-semibold text-slate-500 hover:text-[#6A35FF] transition-colors cursor-pointer"
                    >
                      Explore Service Details →
                    </button>
                  </div>
                </motion.article>
              );
            })}
          </div>

          {/* Custom Quotation Card */}
          <div className="bg-[#FAF9FE] rounded-3xl p-8 border border-indigo-100 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-[#6A35FF]">
                Enterprise &amp; Multi-Service Bundles
              </span>
              <h3 className="text-xl font-bold text-[#0B0F19]">
                Need a Custom Solution or Multi-Channel Plan?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
                Have specific technical requirements, an e-commerce catalog, or multiple brand locations? We provide comprehensive scoped quotations with tailored milestones.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => onRequestCustomQuote('Custom Multi-Service Growth Plan')}
                className="px-6 py-3 text-sm font-semibold text-white bg-brand-gradient rounded-xl shadow-md cursor-pointer"
              >
                Request Custom Quote
              </button>
              <a
                href={buildWhatsAppUrl(
                  'Hello ZENVEXA! I would like to request a custom bundled quotation for my project.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-3 text-sm font-semibold text-[#0B0F19] bg-white border border-slate-300 rounded-xl"
              >
                <MessageCircle className="w-4 h-4 text-[#6A35FF]" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Conditions & Transparency */}
      <section className="py-16 bg-[#FAF9FE] border-b border-indigo-100/70">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#6A35FF]">
            <AlertCircle className="w-4 h-4" />
            <span>Important Pricing &amp; Scope Conditions</span>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-indigo-100/80 space-y-2.5 text-xs sm:text-sm text-slate-600">
            {PRICING_CONDITIONS.map((cond, idx) => (
              <div key={idx} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6A35FF] mt-2 shrink-0" />
                <span>{cond}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing FAQs */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-2xl">
            <div className="text-xs sm:text-sm font-bold text-[#6A35FF]">
              Frequently Asked Questions
            </div>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#0B0F19]">
              Everything You Need to Know About Our Rates
            </h2>
          </div>

          <div className="space-y-3">
            {PRICING_FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={faq.question}
                  className="bg-[#FAF9FE] rounded-2xl border border-indigo-100/80 overflow-hidden shadow-2xs"
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
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-indigo-100/50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
