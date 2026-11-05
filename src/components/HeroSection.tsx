import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Compass, Sparkles, TrendingUp, ShieldCheck } from 'lucide-react';
import {
  COMPANY_INFO,
  HERO_HIGHLIGHTS,
  RoutePath,
} from '../data/agencyData';
import { AGENCY_IMAGES } from '../data/agencyImages';

interface HeroSectionProps {
  onNavigate: (path: RoutePath) => void;
  onPrimaryAction: () => void;
  onExploreServices: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigate,
  onPrimaryAction,
  onExploreServices,
}) => {
  return (
    <section className="relative bg-gradient-to-br from-[#F8F7FF] via-[#FCFBFE] to-[#F1EEFE] overflow-hidden border-b border-indigo-100/70">
      {/* Ambient Atmospheric Glows */}
      <div
        className="absolute -top-32 -left-28 w-[500px] h-[500px] rounded-full bg-purple-300/20 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-8 right-0 w-[600px] h-[600px] rounded-full bg-indigo-300/25 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 lg:pt-16 lg:pb-20">
        {/* Balanced 2-Column Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Bold Editorial Typography & Conversion CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 mb-4">
              <span className="text-[#6A35FF] font-bold">
                {COMPANY_INFO.name}
              </span>
              <span aria-hidden="true" className="text-slate-300">
                ·
              </span>
              <span>{COMPANY_INFO.tagline}</span>
            </div>

            <h1 className="text-[clamp(2.35rem,4.4vw,3.75rem)] font-extrabold tracking-tight text-[#0B0F19] leading-[1.08] headline-balance">
              We Build Brands.{' '}
              <span className="block text-brand-gradient mt-1.5">
                We Create Digital Growth.
              </span>
            </h1>

            <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
              From powerful branding to performance-driven marketing, ZENVEXA
              helps businesses turn their digital presence into real
              opportunities.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onPrimaryAction}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm sm:text-base font-semibold text-white bg-brand-gradient bg-brand-gradient-hover rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/35 transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6A35FF]"
              >
                <span>Let’s Grow Together</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>

              <button
                type="button"
                onClick={onExploreServices}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-semibold text-[#0B0F19] bg-white hover:bg-[#F8F7FF] border border-slate-300 hover:border-indigo-300 rounded-xl shadow-2xs transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6A35FF]"
              >
                <Compass className="w-4 h-4 text-[#6A35FF] shrink-0" />
                <span>Explore Our Services</span>
              </button>
            </div>

            {/* Horizontal Verified Agency Statistics Strip */}
            <div className="mt-11 pt-8 border-t border-indigo-200/60 grid grid-cols-2 sm:grid-cols-4 gap-6">
              {HERO_HIGHLIGHTS.map((item) => (
                <div key={item.label}>
                  <div className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#0B0F19] tabular-nums">
                    {item.value}
                  </div>
                  <div className="mt-1 text-xs text-slate-600 leading-snug">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Ultra-Premium Commercial Advertising Photograph & Glassmorphic Highlights */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.45,
              delay: 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="lg:col-span-6 relative"
          >
            {/* Ambient Background Gradient Aura */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#6A35FF]/20 via-[#4361EE]/15 to-transparent rounded-3xl blur-2xl -z-10" />

            <div className="relative rounded-3xl overflow-hidden border border-indigo-100 shadow-2xl shadow-indigo-950/15 bg-slate-900 group">
              <img
                src={AGENCY_IMAGES.homepageHero}
                alt="ZENVEXA Digital Agency Creative Strategist analyzing live campaign performance dashboards"
                className="w-full aspect-[16/9] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                referrerPolicy="no-referrer"
              />

              {/* Sophisticated Dark Gradient Vignette for Text Contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 pointer-events-none" />

              {/* Floating Top Badge: Strategic Precision */}
              <div className="absolute top-4 left-4 sm:top-5 sm:left-5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-semibold shadow-lg">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Performance Marketing &amp; Brand Studio</span>
              </div>

              {/* Floating Bottom Metric Overlay (Markito-Inspired Glass Card) */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-white/40 shadow-xl flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-gradient text-white flex items-center justify-center shrink-0 shadow-md">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#0B0F19]">
                      +312% Average Client ROI
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Real-time analytics &amp; lead scaling
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onExploreServices}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-[#6A35FF] hover:text-[#0B0F19] transition-colors whitespace-nowrap cursor-pointer"
                >
                  <span>Explore Solutions</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
