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
  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  React.useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = true;
    el.defaultMuted = true;
    const playPromise = el.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay policy handled gracefully
      });
    }
  }, []);

  return (
    <section className="relative min-h-[640px] lg:min-h-[720px] flex items-center overflow-hidden border-b border-indigo-950/60 bg-[#080B14]">
      {/* 1. Full-Width 8-Second Futuristic 3D Technology Background Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={AGENCY_IMAGES.homepageHero}
        className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none z-0"
        aria-hidden="true"
      >
        <source
          src="/assets/aistudio/hero_bg_video.mp4"
          type="video/mp4"
        />
        <source
          src="/assets/aistudio/971519373_1793887833384155_df4405cb.mov"
          type="video/quicktime"
        />
      </video>

      {/* 2. Subtle Dark Navy & Brand Vignette Overlays for Flawless Readability */}
      <div
        className="absolute inset-0 bg-[#080B14]/70 bg-gradient-to-r from-[#080B14]/92 via-[#0B0F19]/80 to-[#080B14]/85 z-10 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#080B14] via-transparent to-[#080B14]/50 z-10 pointer-events-none"
        aria-hidden="true"
      />
      {/* Subtle Cyan and Purple Ambient Lighting Accents */}
      <div
        className="absolute -top-32 -left-28 w-[500px] h-[500px] rounded-full bg-purple-600/20 blur-3xl pointer-events-none z-10"
        aria-hidden="true"
      />
      <div
        className="absolute top-8 right-0 w-[600px] h-[600px] rounded-full bg-blue-500/15 blur-3xl pointer-events-none z-10"
        aria-hidden="true"
      />

      {/* 3. Hero Content Positioned Above Video (z-20) */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Bold Editorial Typography & Conversion CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs sm:text-sm font-semibold text-slate-200 mb-5 w-fit">
              <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse" />
              <span className="text-[#A78BFA] font-bold">
                {COMPANY_INFO.name}
              </span>
              <span aria-hidden="true" className="text-slate-400">
                ·
              </span>
              <span>{COMPANY_INFO.tagline}</span>
            </div>

            <h1 className="text-[clamp(2.35rem,4.5vw,3.85rem)] font-extrabold tracking-tight text-white leading-[1.08] headline-balance">
              We Build Brands.{' '}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#60A5FA] to-[#38BDF8] mt-2">
                We Create Digital Growth.
              </span>
            </h1>

            <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
              From powerful branding to performance-driven marketing, ZENVEXA
              helps businesses turn their digital presence into real
              opportunities.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onPrimaryAction}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm sm:text-base font-semibold text-white bg-brand-gradient bg-brand-gradient-hover rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/40 hover:scale-[1.02] transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6A35FF]"
              >
                <span>Let’s Grow Together</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>

              <button
                type="button"
                onClick={onExploreServices}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-md rounded-xl shadow-sm transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <Compass className="w-4 h-4 text-[#38BDF8] shrink-0" />
                <span>Explore Our Services</span>
              </button>
            </div>

            {/* Horizontal Verified Agency Statistics Strip */}
            <div className="mt-11 pt-8 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-6">
              {HERO_HIGHLIGHTS.map((item) => (
                <div key={item.label}>
                  <div className="text-xl sm:text-2xl font-extrabold tracking-tight text-white tabular-nums">
                    {item.value}
                  </div>
                  <div className="mt-1 text-xs text-slate-400 leading-snug">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Glassmorphic Visual Card Over 3D Video Backdrop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.45,
              delay: 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="lg:col-span-5 relative"
          >
            {/* Ambient Cyan-Purple Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#6A35FF]/30 via-[#38BDF8]/20 to-transparent rounded-3xl blur-2xl -z-10" />

            <div className="relative rounded-3xl overflow-hidden border border-white/20 shadow-2xl shadow-black/50 bg-[#0B0F19]/85 backdrop-blur-xl group">
              <img
                src={AGENCY_IMAGES.homepageHero}
                alt="ZENVEXA Digital Agency Creative Strategist analyzing live campaign performance dashboards"
                className="w-full aspect-[16/10] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02] opacity-90"
                referrerPolicy="no-referrer"
              />

              {/* Dark Gradient Vignette for Text Contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-black/20 pointer-events-none" />

              {/* Floating Top Badge: Strategic Precision */}
              <div className="absolute top-4 left-4 sm:top-5 sm:left-5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-black/70 backdrop-blur-md border border-white/20 text-white text-xs font-semibold shadow-lg">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Performance Marketing &amp; Brand Studio</span>
              </div>

              {/* Floating Bottom Metric Overlay (Glassmorphic Card) */}
              <div className="p-5 sm:p-6 bg-gradient-to-b from-[#0B0F19]/90 to-[#080B14] border-t border-white/10 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-brand-gradient text-white flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/25">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-extrabold text-white">
                      +312% Average Client ROI
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      Real-time campaign analytics &amp; lead scaling
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onExploreServices}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#38BDF8] hover:text-white transition-colors whitespace-nowrap cursor-pointer"
                >
                  <span>Explore</span>
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
