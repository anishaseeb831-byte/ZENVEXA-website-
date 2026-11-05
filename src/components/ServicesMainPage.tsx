import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Check,
  Sparkles,
  MessageCircle,
  HelpCircle,
  Share2,
  Megaphone,
  Search,
  Globe,
  Palette,
  Mail,
  MapPin,
  Compass,
  LineChart,
  Tag,
} from 'lucide-react';
import {
  SERVICES_DATA,
  RoutePath,
  ServiceIconKey,
  buildWhatsAppUrl,
} from '../data/agencyData';
import { AGENCY_IMAGES, getServiceHeroImage } from '../data/agencyImages';
import { Breadcrumbs } from './Breadcrumbs';

interface ServicesMainPageProps {
  onNavigate: (path: RoutePath) => void;
  onSelectService: (serviceTitle: string) => void;
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

export const ServicesMainPage: React.FC<ServicesMainPageProps> = ({
  onNavigate,
  onSelectService,
}) => {
  const [filterType, setFilterType] = useState<'all' | 'marketing' | 'creative' | 'technical'>('all');

  const filteredServices = SERVICES_DATA.filter((s) => {
    if (filterType === 'all') return true;
    if (filterType === 'marketing') {
      return ['social-media-management', 'meta-ads', 'email-marketing', 'marketing-strategy'].includes(s.slug);
    }
    if (filterType === 'creative') {
      return ['branding', 'social-media-management', 'website-development'].includes(s.slug);
    }
    if (filterType === 'technical') {
      return ['seo', 'website-development', 'google-business-profile', 'local-seo'].includes(s.slug);
    }
    return true;
  });

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[{ label: 'Our Services' }]}
        onNavigate={onNavigate}
        subtitle="9 Growth Disciplines · Pakistan, US & Worldwide"
      />

      {/* Main Services Hero Banner with Cinematic Visual */}
      <section className="relative overflow-hidden pt-12 pb-18 lg:pt-16 lg:pb-22 bg-gradient-to-b from-[#F8F7FF] via-[#FAF9FE] to-white border-b border-indigo-100/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-indigo-100 text-xs font-bold text-[#6A35FF] shadow-2xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Complete Agency Capabilities</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0B0F19] leading-tight headline-balance">
                Digital Solutions That Drive{' '}
                <span className="text-brand-gradient">Business Growth.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                From creative branding to performance-driven marketing, ZENVEXA provides the digital solutions businesses need to grow, compete and succeed in modern markets.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                <button
                  type="button"
                  onClick={() => onNavigate('/pricing')}
                  className="px-6 py-3.5 text-sm font-semibold text-white bg-brand-gradient bg-brand-gradient-hover rounded-xl shadow-md shadow-indigo-500/20 cursor-pointer"
                >
                  View Transparent Pricing
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('/contact')}
                  className="px-6 py-3.5 text-sm font-semibold text-[#0B0F19] bg-white border border-slate-300 hover:border-indigo-300 rounded-xl transition-colors cursor-pointer"
                >
                  Request Custom Consultation
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden border border-indigo-100 shadow-2xl shadow-indigo-950/15 bg-slate-900 group">
                <img
                  src={AGENCY_IMAGES.servicesMainHero}
                  alt="ZENVEXA Digital Agency Workspace & Holographic Strategy Suite"
                  className="w-full aspect-[16/10] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-white/40 shadow-xl flex items-center justify-between">
                  <div className="text-xs font-bold text-[#0B0F19]">
                    Strategy · Design · Growth
                  </div>
                  <div className="text-xs font-semibold text-[#6A35FF]">
                    9 Specialized Disciplines
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Segmented Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-extrabold text-[#0B0F19]">
                All Agency Services
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Click any service below to explore dedicated deliverable breakdowns and FAQs.
              </p>
            </div>

            <div className="inline-flex items-center gap-1 p-1 bg-[#F5F3FF] rounded-xl border border-indigo-100">
              <button
                type="button"
                onClick={() => setFilterType('all')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  filterType === 'all'
                    ? 'bg-brand-gradient text-white shadow-xs'
                    : 'text-slate-600 hover:text-[#0B0F19]'
                }`}
              >
                All 9 Services
              </button>
              <button
                type="button"
                onClick={() => setFilterType('marketing')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  filterType === 'marketing'
                    ? 'bg-brand-gradient text-white shadow-xs'
                    : 'text-slate-600 hover:text-[#0B0F19]'
                }`}
              >
                Marketing &amp; Ads
              </button>
              <button
                type="button"
                onClick={() => setFilterType('technical')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  filterType === 'technical'
                    ? 'bg-brand-gradient text-white shadow-xs'
                    : 'text-slate-600 hover:text-[#0B0F19]'
                }`}
              >
                Web &amp; SEO
              </button>
              <button
                type="button"
                onClick={() => setFilterType('creative')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  filterType === 'creative'
                    ? 'bg-brand-gradient text-white shadow-xs'
                    : 'text-slate-600 hover:text-[#0B0F19]'
                }`}
              >
                Branding &amp; Creative
              </button>
            </div>
          </div>

          {/* Cards Grid with Visual Image Previews */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredServices.map((service, idx) => {
              const ServiceIcon = getServiceIcon(service.iconKey);
              const serviceRoute = `/services/${service.slug}` as RoutePath;
              const cardImage = getServiceHeroImage(service.slug);

              return (
                <motion.article
                  key={service.id}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.12, margin: '0px 0px -40px 0px' }}
                  transition={{
                    duration: 0.5,
                    delay: (idx % 3) * 0.08,
                    ease: [0.21, 0.47, 0.32, 0.98],
                  }}
                  className="group bg-[#FAF9FE] hover:bg-white rounded-3xl overflow-hidden border border-indigo-100/90 hover:border-indigo-300 shadow-2xs hover:shadow-xl hover:shadow-indigo-950/8 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Visual Card Header */}
                    <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                      <img
                        src={cardImage}
                        alt={`${service.title} thumbnail`}
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 opacity-90"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      
                      {/* Floating Icon Tile on Top Left */}
                      <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                        <div
                          className={`w-9 h-9 rounded-xl bg-gradient-to-br ${service.iconGradient} text-white shadow-md flex items-center justify-center shrink-0`}
                        >
                          <ServiceIcon className="w-4 h-4" />
                        </div>
                        <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[11px] font-bold text-white border border-white/20">
                          {service.number}
                        </span>
                      </div>

                      {/* Pill on Bottom Right */}
                      <div className="absolute bottom-3 right-3 text-[11px] font-semibold text-white/90 bg-black/50 backdrop-blur-xs px-2.5 py-0.5 rounded-lg border border-white/15">
                        {service.strategicFocus}
                      </div>
                    </div>

                    <div className="p-6 space-y-4">
                      <div>
                        <h3 className="text-lg font-bold text-[#0B0F19] group-hover:text-[#6A35FF] transition-colors leading-snug">
                          {service.title}
                        </h3>
                        <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">
                          {service.description}
                        </p>
                      </div>

                      {/* Deliverables snippet */}
                      <div className="pt-3 border-t border-indigo-100/70">
                        <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                          Core Deliverables:
                        </div>
                        <ul className="space-y-1.5 text-xs text-slate-700">
                          {service.deliverables.slice(0, 3).map((item) => (
                            <li key={item} className="flex items-center gap-2 truncate">
                              <Check className="w-3.5 h-3.5 text-[#6A35FF] shrink-0" />
                              <span className="truncate">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer: Starting Price & Learn More Button */}
                  <div className="p-6 pt-0">
                    <div className="pt-4 border-t border-indigo-100/70 flex items-center justify-between gap-3">
                      <div className="text-xs text-slate-500">
                        {typeof service.startingPrice === 'number' && service.billingType ? (
                          <>
                            From{' '}
                            <strong className="text-[#0B0F19] font-bold">
                              ${service.startingPrice}
                            </strong>
                            /{service.billingType}
                          </>
                        ) : (
                          <strong className="text-[#0B0F19] font-semibold">Custom Plan</strong>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => onNavigate(serviceRoute)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-brand-gradient hover:opacity-95 transition-opacity cursor-pointer shadow-xs"
                      >
                        <span>Learn More</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-20 bg-gradient-to-r from-slate-900 via-[#120F24] to-slate-900 text-white border-t border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Ready to Build, Market &amp; Scale Your Business?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Connect directly with Founder Anis and Representative Awais to structure a digital growth plan tailored to your market.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <a
              href={buildWhatsAppUrl('Hello ZENVEXA! I would like to schedule a strategy call regarding digital services.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-brand-gradient rounded-xl shadow-lg"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
            <button
              type="button"
              onClick={() => onNavigate('/contact')}
              className="px-6 py-3.5 text-sm font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/15 rounded-xl transition-all cursor-pointer"
            >
              Submit an Online Inquiry
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
