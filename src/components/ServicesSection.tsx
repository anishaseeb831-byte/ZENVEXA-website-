import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Share2,
  Megaphone,
  Search,
  Globe,
  Palette,
  Mail,
  MapPin,
  Compass,
  LineChart,
  Check,
  ArrowRight,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { SERVICES_DATA, ServiceIconKey, RoutePath } from '../data/agencyData';

interface ServicesSectionProps {
  isStandalonePage?: boolean;
  onSelectService: (serviceTitle: string) => void;
  onNavigate?: (path: RoutePath) => void;
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

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  isStandalonePage = false,
  onSelectService,
  onNavigate,
}) => {
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});
  const HeadingTag = isStandalonePage ? 'h1' : 'h2';

  const toggleDeliverables = (id: string) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleLearnMore = (slug: string) => {
    if (onNavigate) {
      onNavigate(`/services/${slug}` as RoutePath);
    }
  };

  return (
    <section
      id="services"
      className="py-20 lg:py-24 bg-white border-b border-slate-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="text-xs sm:text-sm font-bold text-[#6A35FF]">
              Our Services · Complete Digital Capabilities
            </div>
            <HeadingTag className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0B0F19] headline-balance">
              Solutions Built to{' '}
              <span className="text-brand-gradient">Scale Your Brand.</span>
            </HeadingTag>
          </div>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-md">
            From search visibility and paid social campaigns to custom websites,
            brand identity, and email marketing—each service is structured for
            measurable business progress.
          </p>
        </div>

        {/* Modern Colorful Icon Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_DATA.map((service, idx) => {
            const IconComponent = getServiceIcon(service.iconKey);
            const showFullList =
              isStandalonePage || Boolean(expandedIds[service.id]);

            return (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12, margin: '0px 0px -40px 0px' }}
                transition={{
                  duration: 0.48,
                  delay: (idx % 3) * 0.08,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
                className="group bg-[#FAF9FE] hover:bg-white rounded-2xl p-6 sm:p-7 border border-indigo-100/80 hover:border-indigo-300/80 shadow-2xs hover:shadow-xl hover:shadow-indigo-950/6 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Colorful Professional Icon Tile */}
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div
                      className={`w-13 h-13 rounded-2xl bg-gradient-to-br ${service.iconGradient} text-white shadow-md flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105`}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold text-slate-400 tabular-nums">
                      {service.number}
                    </span>
                  </div>

                  {/* Service Title */}
                  <h3 className="text-lg font-bold text-[#0B0F19] leading-snug">
                    {service.title}
                  </h3>

                  {/* Short Description */}
                  <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Expandable / Standalone 7-Deliverable Breakdown */}
                  {showFullList && (
                    <ul className="mt-5 pt-4 border-t border-indigo-100/80 space-y-2">
                      {service.deliverables.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-xs sm:text-[13px] text-slate-700"
                        >
                          <Check className="w-3.5 h-3.5 text-[#6A35FF] mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {!isStandalonePage && (
                    <button
                      type="button"
                      onClick={() => toggleDeliverables(service.id)}
                      className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-[#6A35FF] transition-colors cursor-pointer"
                    >
                      <span>
                        {showFullList
                          ? 'Hide Included Items'
                          : `View ${service.deliverables.length} Included Deliverables`}
                      </span>
                      {showFullList ? (
                        <ChevronUp className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </button>
                  )}
                </div>

                {/* Card Footer: Rate & Inquiry / Learn More CTAs */}
                <div className="mt-6 pt-4 border-t border-indigo-100/70 flex items-center justify-between gap-2">
                  <span className="text-xs text-slate-500 tabular-nums">
                    {typeof service.startingPrice === 'number' &&
                    service.billingType ? (
                      <>
                        From{' '}
                        <strong className="text-[#0B0F19] font-bold">
                          ${service.startingPrice}
                        </strong>
                        /{service.billingType}
                      </>
                    ) : (
                      <strong className="text-[#0B0F19] font-semibold">
                        Custom Plan
                      </strong>
                    )}
                  </span>

                  <div className="flex items-center gap-3">
                    {onNavigate && (
                      <a
                        href={`/services/${service.slug}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleLearnMore(service.slug);
                        }}
                        className="text-xs font-semibold text-slate-600 hover:text-[#6A35FF] transition-colors"
                      >
                        Learn More
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => onSelectService(service.title)}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#6A35FF] hover:text-[#0B0F19] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#6A35FF] rounded-xs"
                    >
                      <span>Get Started</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
                    </button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Explore All Services Action when embedded in Homepage */}
        {!isStandalonePage && onNavigate && (
          <div className="mt-12 text-center">
            <a
              href="/services"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/services');
              }}
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-brand-gradient bg-brand-gradient-hover rounded-xl shadow-md shadow-indigo-500/20 hover:shadow-lg transition-all"
            >
              <span>Explore All 9 Services &amp; Detailed Breakdown</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
};
