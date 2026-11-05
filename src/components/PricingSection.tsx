import React from 'react';
import { motion } from 'motion/react';
import { Check, ArrowRight, Info } from 'lucide-react';
import {
  PRICING_PACKAGES_DATA,
  PRICING_CONDITIONS,
  PRICING_TAGLINE_MESSAGE,
} from '../data/agencyData';

interface PricingSectionProps {
  isStandalonePage?: boolean;
  onGetService: (serviceTitle: string, priceNote: string) => void;
  onRequestCustomQuote: (serviceTitle: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  isStandalonePage = false,
  onGetService,
  onRequestCustomQuote,
}) => {
  const HeadingTag = isStandalonePage ? 'h1' : 'h2';

  return (
    <section
      id="pricing"
      className="py-20 lg:py-24 bg-white border-b border-slate-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="text-xs sm:text-sm font-bold text-[#6A35FF]">
              Pricing &amp; Packages · Introductory Starting Rates (USD)
            </span>
            <span
              className="h-0.5 w-10 bg-gradient-to-r from-[#6A35FF] to-[#3B82F6] rounded-full"
              aria-hidden="true"
            />
          </div>
          <HeadingTag className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0B0F19] headline-balance">
            Professional Digital Solutions.{' '}
            <span className="text-brand-gradient">Affordable Pricing.</span>
          </HeadingTag>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Grow your business with professional digital services designed to
            fit your budget.
          </p>
        </div>

        {/* Eight Individual USD Pricing Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRICING_PACKAGES_DATA.map((pkg, idx) => {
            const billingLabel =
              pkg.billingType === 'month'
                ? 'Monthly Service'
                : 'Project-Based';
            const priceReference = `Starting at $${pkg.startingPrice}/${pkg.billingType}`;

            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.3, delay: (idx % 4) * 0.04 }}
                className="bg-[#FAF9FE] hover:bg-white rounded-2xl p-6 border border-indigo-100/90 hover:border-indigo-300 shadow-2xs hover:shadow-xl hover:shadow-indigo-950/6 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Unboxed Billing Cadence Metadata */}
                  <div className="flex items-center justify-between gap-2 text-xs text-slate-500 mb-3">
                    <span className="font-bold text-[#6A35FF]">
                      {billingLabel}
                    </span>
                    <span className="tabular-nums">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Service Name */}
                  <h3 className="text-lg font-bold text-[#0B0F19] leading-snug min-h-[3.25rem]">
                    {pkg.pricingTitle}
                  </h3>

                  {/* Introductory Starting Price */}
                  <div className="mt-4 pb-5 border-b border-indigo-100/80">
                    <div className="text-xs text-slate-500">
                      Introductory Starting Price
                    </div>
                    <div className="mt-1 flex items-baseline gap-1 tabular-nums">
                      <span className="text-3xl font-extrabold text-[#0B0F19]">
                        ${pkg.startingPrice}
                      </span>
                      <span className="text-sm font-medium text-slate-500">
                        /{pkg.billingType}
                      </span>
                    </div>
                  </div>

                  {/* Included Services Summary */}
                  <ul className="mt-5 space-y-2.5">
                    {pkg.deliverables.slice(0, 5).map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-xs sm:text-[13px] text-slate-700"
                      >
                        <Check className="w-3.5 h-3.5 text-[#6A35FF] mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Dual Action Buttons: Get This Service + Request Custom Quote */}
                <div className="mt-6 pt-5 border-t border-indigo-100/80 space-y-2.5">
                  <button
                    type="button"
                    onClick={() => onGetService(pkg.title, priceReference)}
                    className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-brand-gradient bg-brand-gradient-hover rounded-xl shadow-sm shadow-indigo-500/20 transition-all duration-150 whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6A35FF]"
                  >
                    <span>Get This Service</span>
                    <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onRequestCustomQuote(pkg.title)}
                    className="w-full inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-slate-700 hover:text-[#6A35FF] bg-white hover:bg-[#F3F0FF] border border-indigo-100 rounded-xl transition-colors duration-150 whitespace-nowrap cursor-pointer"
                  >
                    Request Custom Quote
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Brand Pricing Promise & Transparent Conditions */}
        <div className="mt-12 bg-[#F8F7FF] rounded-3xl p-6 sm:p-8 border border-indigo-100">
          <p className="text-base sm:text-lg font-extrabold text-[#0B0F19]">
            “{PRICING_TAGLINE_MESSAGE}”
          </p>

          <div className="mt-5 pt-5 border-t border-indigo-200/60">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0B0F19] mb-3">
              <Info className="w-4 h-4 text-[#6A35FF] shrink-0" />
              <span>Important Pricing Terms &amp; Scope Disclosures</span>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-xs sm:text-sm text-slate-600">
              {PRICING_CONDITIONS.map((condition) => (
                <li key={condition} className="flex items-start gap-2">
                  <span
                    aria-hidden="true"
                    className="text-[#6A35FF] font-bold leading-5"
                  >
                    ·
                  </span>
                  <span>{condition}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
