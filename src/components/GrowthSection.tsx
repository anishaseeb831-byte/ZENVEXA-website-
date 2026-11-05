import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, TrendingUp, BarChart3, Users, DollarSign } from 'lucide-react';
import { AGENCY_IMAGES } from '../data/agencyImages';

interface GrowthSectionProps {
  onExploreServices: () => void;
}

export const GrowthSection: React.FC<GrowthSectionProps> = ({
  onExploreServices,
}) => {
  return (
    <section className="relative py-20 lg:py-24 bg-gradient-to-r from-[#F7F6FF] via-[#FAF9FF] to-[#F2F0FF] overflow-hidden border-b border-indigo-100/70">
      {/* Subtle Rising Trajectory Background Vector */}
      <svg
        viewBox="0 0 600 260"
        className="hidden lg:block absolute bottom-4 left-[28%] w-[460px] h-[200px] opacity-25 pointer-events-none select-none"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M20 230 L160 150 L240 185 L430 45"
          stroke="#A78BFA"
          strokeWidth="22"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M385 38 L442 35 L432 92"
          stroke="#A78BFA"
          strokeWidth="22"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Real Strategies. Real Growth. */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.35 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="text-xs sm:text-sm font-bold text-[#6A35FF]">
              Strategic Execution · Measurable Momentum
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-extrabold tracking-tight text-[#0B0F19] leading-[1.12] headline-balance">
              Real <span className="text-brand-gradient">Strategies.</span>
              <span className="block mt-1">
                Real <span className="text-brand-gradient">Growth.</span>
              </span>
            </h2>

            <p className="text-base text-slate-600 leading-relaxed">
              We design data-driven digital marketing campaigns and high-converting
              websites that deliver measurable commercial outcomes. From lowering
              customer acquisition costs to scaling organic reach, our framework
              is built around direct business impact.
            </p>

            {/* Quantified Impact Pillows */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white border border-indigo-100 shadow-2xs">
                <div className="text-2xl font-black text-[#0B0F19] tabular-nums">
                  +256%
                </div>
                <div className="text-xs font-semibold text-slate-500 mt-0.5">
                  Avg. Organic Traffic Lift
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-indigo-100 shadow-2xs">
                <div className="text-2xl font-black text-[#6A35FF] tabular-nums">
                  3.85x
                </div>
                <div className="text-xs font-semibold text-slate-500 mt-0.5">
                  Blended Paid Ad ROAS
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={onExploreServices}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-brand-gradient bg-brand-gradient-hover rounded-xl shadow-md shadow-indigo-500/20 transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6A35FF]"
              >
                <span>Our Digital Capabilities</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
            </div>
          </motion.div>

          {/* Right Column: High-Resolution Workstation Analytics Visual */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.35, delay: 0.06 }}
            className="lg:col-span-7 relative"
          >
            <div className="relative rounded-3xl overflow-hidden border border-indigo-100 shadow-2xl shadow-indigo-950/12 bg-slate-900 group">
              <img
                src={AGENCY_IMAGES.growthAnalytics}
                alt="ZENVEXA Performance Marketing Analytics and Revenue Dashboard"
                className="w-full aspect-[16/9] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                referrerPolicy="no-referrer"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Bottom Live Metrics Bar */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white/50 shadow-xl flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm font-bold text-sm">
                    ROI
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#0B0F19]">
                      Verified Performance Tracking
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Multi-touch attribution &amp; lead verification
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-bold text-emerald-600">
                    Live Pacing
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Real-Time Dashboard
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
