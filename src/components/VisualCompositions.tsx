import React, { useState } from 'react';
import {
  Globe,
  Layers,
  TrendingUp,
  Search,
  Share2,
  Megaphone,
  Check,
  ArrowUpRight,
  BarChart3,
  Users,
  Sparkles,
} from 'lucide-react';
import { ConceptVisualKey, PortfolioItem } from '../data/portfolioData';
import { RoutePath } from '../data/agencyData';

interface HeroVisualProps {
  onNavigate: (path: RoutePath) => void;
}

type StudioTab = 'growth' | 'web' | 'brand';

export const HeroAgencyVisual: React.FC<HeroVisualProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<StudioTab>('growth');

  return (
    <div className="relative w-full h-full min-h-[430px] flex items-center justify-center py-4 lg:py-2">
      {/* Markito-Inspired Vibrant Electric Purple Organic Blob Backdrop */}
      <svg
        viewBox="0 0 540 480"
        className="absolute inset-0 w-full h-full pointer-events-none select-none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="zenvexa-blob-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.18" />
            <stop offset="50%" stopColor="#553BF6" stopOpacity="0.24" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.16" />
          </linearGradient>
          <linearGradient id="zenvexa-blob-solid" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6A35FF" />
            <stop offset="100%" stopColor="#4361EE" />
          </linearGradient>
        </defs>
        <path
          d="M428.5,88.2C478.2,135.4,499.1,211.8,479.8,281.4C460.5,351,401,413.8,328.9,436.9C256.8,460,172.1,443.4,113.2,395.3C54.3,347.2,21.2,267.6,33.4,193.5C45.6,119.4,103.1,50.8,176.8,31.2C250.5,11.6,378.8,41,428.5,88.2Z"
          fill="url(#zenvexa-blob-grad)"
        />
        <circle cx="410" cy="128" r="78" fill="url(#zenvexa-blob-solid)" opacity="0.88" />
        <circle cx="118" cy="340" r="54" fill="#6A35FF" opacity="0.14" />
      </svg>

      {/* Subtle Top-Right Floating Strategy Callout Card */}
      <div className="hidden sm:flex absolute -top-1 right-2 z-20 items-center gap-2.5 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-indigo-100 shadow-lg shadow-indigo-900/8">
        <div className="w-8 h-8 rounded-xl bg-brand-gradient text-white flex items-center justify-center shrink-0">
          <Sparkles className="w-4 h-4" />
        </div>
        <div className="text-left">
          <div className="text-xs font-bold text-[#0B0F19]">
            Ideas · Strategy · Growth
          </div>
          <div className="text-[11px] text-slate-500">
            Traffic &amp; Conversions Together
          </div>
        </div>
      </div>

      {/* Main Interactive Marketing & Brand Dashboard Showcase */}
      <div className="relative z-10 w-full max-w-[500px] rounded-3xl bg-white/95 backdrop-blur-md p-5 sm:p-6 border border-indigo-100/90 shadow-2xl shadow-indigo-950/10 flex flex-col justify-between">
        {/* Card Header + Interactive Mode Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-brand-gradient text-white font-extrabold text-xs flex items-center justify-center shadow-xs shrink-0">
              ZX
            </div>
            <div>
              <div className="text-xs font-bold text-[#0B0F19]">
                ZENVEXA Growth Studio
              </div>
              <div className="text-[11px] text-slate-500">
                Digital Marketing &amp; Web Suite
              </div>
            </div>
          </div>

          <div
            className="inline-flex items-center gap-1 p-1 rounded-xl bg-[#F4F2FF]"
            role="tablist"
            aria-label="Preview agency capabilities"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'growth'}
              onClick={() => setActiveTab('growth')}
              className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'growth'
                  ? 'bg-brand-gradient text-white shadow-xs'
                  : 'text-slate-600 hover:text-[#0B0F19]'
              }`}
            >
              Marketing
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'web'}
              onClick={() => setActiveTab('web')}
              className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'web'
                  ? 'bg-brand-gradient text-white shadow-xs'
                  : 'text-slate-600 hover:text-[#0B0F19]'
              }`}
            >
              Web UX
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'brand'}
              onClick={() => setActiveTab('brand')}
              className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'brand'
                  ? 'bg-brand-gradient text-white shadow-xs'
                  : 'text-slate-600 hover:text-[#0B0F19]'
              }`}
            >
              Branding
            </button>
          </div>
        </div>

        {/* Dynamic Center Illustration & Dashboard Panel */}
        <div className="my-5">
          {activeTab === 'growth' && (
            <div className="space-y-4">
              {/* Illustrated Growth Dashboard Chart + Strategist Card */}
              <div className="grid grid-cols-12 gap-3.5 items-stretch">
                <div className="col-span-7 rounded-2xl bg-gradient-to-br from-[#F8F7FF] to-[#EEF0FF] p-4 border border-indigo-100/80 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#0B0F19]">
                      Channel Visibility
                    </span>
                    <TrendingUp className="w-4 h-4 text-[#6A35FF]" />
                  </div>

                  {/* Clean Vector Rising Columns */}
                  <div className="pt-4 pb-1 flex items-end justify-between gap-2 h-28">
                    <div className="flex-1 bg-indigo-200/80 rounded-t-md h-[35%]" />
                    <div className="flex-1 bg-indigo-300/90 rounded-t-md h-[50%]" />
                    <div className="flex-1 bg-indigo-400 rounded-t-md h-[65%]" />
                    <div className="flex-1 bg-[#6A35FF] rounded-t-md h-[82%]" />
                    <div className="flex-1 bg-gradient-to-t from-[#6A35FF] to-[#3B82F6] rounded-t-md h-full" />
                  </div>

                  <div className="text-[11px] text-slate-500 pt-1 border-t border-indigo-100">
                    SEO · Paid Ads · Social · Local
                  </div>
                </div>

                {/* Illustrated Executive Strategist & Channels Card */}
                <div className="col-span-5 rounded-2xl bg-[#0B0F19] p-4 text-white flex flex-col justify-between relative overflow-hidden">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                    {/* Stylized Strategist Vector Portrait */}
                    <svg
                      viewBox="0 0 40 40"
                      className="w-7 h-7"
                      fill="none"
                      aria-hidden="true"
                    >
                      <circle cx="20" cy="13" r="6.5" fill="#A78BFA" />
                      <path
                        d="M8.5 33C9.8 25.8 14.2 22.5 20 22.5C25.8 22.5 30.2 25.8 31.5 33"
                        stroke="#FFFFFF"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <div className="my-2">
                    <div className="text-xs font-bold text-white leading-snug">
                      Dedicated Strategists
                    </div>
                    <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                      In-House, Remote &amp; Specialist talent.
                    </p>
                  </div>
                  <div className="text-[10px] font-semibold text-indigo-300">
                    ZENVEXA Team
                  </div>
                </div>
              </div>

              {/* Three Compact Service Mini-Highlights */}
              <div className="grid grid-cols-3 gap-2.5">
                <div className="p-3 rounded-xl bg-[#F9F9FC] border border-slate-100">
                  <Search className="w-4 h-4 text-[#2563EB] mb-1.5" />
                  <div className="text-[11px] font-bold text-[#0B0F19]">
                    SEO &amp; Maps
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-[#F9F9FC] border border-slate-100">
                  <Megaphone className="w-4 h-4 text-[#6A35FF] mb-1.5" />
                  <div className="text-[11px] font-bold text-[#0B0F19]">
                    Meta Ads
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-[#F9F9FC] border border-slate-100">
                  <Share2 className="w-4 h-4 text-[#EC4899] mb-1.5" />
                  <div className="text-[11px] font-bold text-[#0B0F19]">
                    Social Media
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'web' && (
            <div className="rounded-2xl bg-[#F8F7FF] p-4 border border-indigo-100 space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#6A35FF]" />
                  <span className="text-xs font-bold text-[#0B0F19]">
                    Modern Responsive Web Architecture
                  </span>
                </div>
                <span className="text-[11px] text-slate-500">
                  Desktop &amp; Mobile
                </span>
              </div>

              <div className="grid grid-cols-12 gap-3">
                <div className="col-span-8 bg-white rounded-xl p-3.5 border border-slate-200/80 space-y-2">
                  <div className="w-16 h-2 rounded bg-indigo-200" />
                  <div className="w-full h-3 rounded bg-[#0B0F19]" />
                  <div className="w-4/5 h-3 rounded bg-[#6A35FF]" />
                  <div className="w-11/12 h-2 rounded bg-slate-200" />
                  <div className="pt-1 flex gap-2">
                    <div className="px-2.5 py-1 rounded-md bg-brand-gradient text-[10px] font-semibold text-white">
                      Convert Visitors
                    </div>
                    <div className="px-2.5 py-1 rounded-md border border-slate-200 text-[10px] font-medium text-slate-600">
                      SEO Structure
                    </div>
                  </div>
                </div>
                <div className="col-span-4 bg-[#0B0F19] rounded-xl p-3 text-white flex flex-col justify-between">
                  <span className="text-[10px] text-indigo-300 font-semibold">
                    Mobile UX
                  </span>
                  <div className="space-y-1.5 my-2">
                    <div className="h-2 w-full rounded bg-white/80" />
                    <div className="h-2 w-2/3 rounded bg-indigo-400" />
                  </div>
                  <div className="h-6 rounded-md bg-brand-gradient flex items-center justify-center text-[10px] font-semibold">
                    Responsive
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'brand' && (
            <div className="rounded-2xl bg-[#F8F7FF] p-4 border border-indigo-100 grid grid-cols-3 gap-3">
              <div className="bg-white rounded-xl p-3.5 border border-slate-200/80">
                <div className="text-[11px] text-slate-500">Typography</div>
                <div className="text-2xl font-extrabold text-[#0B0F19] mt-1">
                  Aa
                </div>
                <div className="text-[11px] font-semibold text-[#6A35FF] mt-2">
                  Plus Jakarta
                </div>
              </div>
              <div className="bg-white rounded-xl p-3.5 border border-slate-200/80 flex flex-col justify-between">
                <div className="text-[11px] text-slate-500">Brand Palette</div>
                <div className="grid grid-cols-3 gap-1.5 my-2">
                  <div className="h-8 rounded-md bg-[#0B0F19]" />
                  <div className="h-8 rounded-md bg-[#6A35FF]" />
                  <div className="h-8 rounded-md bg-[#3B82F6]" />
                </div>
                <div className="text-[10px] text-slate-500">
                  Identity System
                </div>
              </div>
              <div className="bg-[#0B0F19] rounded-xl p-3.5 text-white flex flex-col justify-between">
                <Layers className="w-4 h-4 text-indigo-400" />
                <ul className="space-y-1 my-1.5 text-[11px] text-slate-200">
                  <li className="flex items-center gap-1">
                    <Check className="w-3 h-3 text-indigo-400 shrink-0" />
                    <span>Logo Design</span>
                  </li>
                  <li className="flex items-center gap-1">
                    <Check className="w-3 h-3 text-indigo-400 shrink-0" />
                    <span>Guidelines</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Card Bar */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
          <span className="text-xs font-medium text-slate-500">
            We Build. We Market. We Scale.
          </span>
          <button
            type="button"
            onClick={() => onNavigate('/portfolio')}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#6A35FF] hover:text-[#0B0F19] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Explore Portfolio</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Markito-Inspired Bottom-Right Floating Lavender Badge */}
      <div className="hidden sm:flex absolute -bottom-2 right-0 z-20 items-center gap-3 bg-[#EDE9FE]/95 backdrop-blur-md px-4 py-3 rounded-2xl border border-indigo-200/80 shadow-xl shadow-indigo-950/10">
        <div className="w-10 h-10 rounded-xl bg-[#0B0F19] text-white flex items-center justify-center shrink-0">
          <BarChart3 className="w-5 h-5 text-indigo-400" />
        </div>
        <div className="pr-1">
          <div className="text-xs font-extrabold text-[#0B0F19] leading-tight">
            Grow Your Business
          </div>
          <div className="text-xs font-bold text-[#6A35FF] leading-tight">
            Online ↗
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Laptop + Marketing Analytics Illustration for the "Real Strategies. Real Growth." Split Section.
 * Strictly avoids invented client statistics while showcasing marketing channels & analytics clarity.
 */
export const GrowthLaptopVisual: React.FC = () => {
  return (
    <div className="relative w-full flex flex-col xl:flex-row items-center justify-center gap-6">
      {/* Sleek Laptop Mockup Frame */}
      <div className="w-full max-w-[440px]">
        {/* Screen Lid */}
        <div className="rounded-t-2xl bg-[#0B0F19] p-2.5 sm:p-3 shadow-2xl border border-slate-800">
          {/* Webcam dot */}
          <div className="w-1.5 h-1.5 rounded-full bg-slate-700 mx-auto mb-2" />
          {/* Display Screen */}
          <div className="bg-white rounded-xl p-4 sm:p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <div className="text-[11px] font-semibold text-slate-400">
                  Campaign &amp; Search Visibility
                </div>
                <div className="text-sm sm:text-base font-extrabold text-[#0B0F19] mt-0.5">
                  Strategic Growth Trajectory
                </div>
              </div>
              <div className="px-2.5 py-1 rounded-lg bg-[#F3F0FF] text-[11px] font-bold text-[#6A35FF]">
                Multi-Channel
              </div>
            </div>

            {/* Clean Analytical Bar & Curve Visualization (No Fake Numbers) */}
            <div className="relative pt-3 pb-1">
              <svg
                viewBox="0 0 320 120"
                className="w-full h-32 overflow-visible"
                aria-label="Illustration of progressive digital visibility across marketing stages"
              >
                <defs>
                  <linearGradient id="laptop-bar-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6A35FF" />
                    <stop offset="100%" stopColor="#818CF8" />
                  </linearGradient>
                </defs>
                {/* Subtle Grid Lines */}
                <line x1="0" y1="25" x2="320" y2="25" stroke="#F1F5F9" strokeWidth="1" />
                <line x1="0" y1="60" x2="320" y2="60" stroke="#F1F5F9" strokeWidth="1" />
                <line x1="0" y1="95" x2="320" y2="95" stroke="#F1F5F9" strokeWidth="1" />

                {/* 7 Rising Analytical Bars */}
                <rect x="14" y="82" width="26" height="32" rx="5" fill="#E0E7FF" />
                <rect x="58" y="70" width="26" height="44" rx="5" fill="#C7D2FE" />
                <rect x="102" y="62" width="26" height="52" rx="5" fill="#A5B4FC" />
                <rect x="146" y="48" width="26" height="66" rx="5" fill="#818CF8" />
                <rect x="190" y="38" width="26" height="76" rx="5" fill="url(#laptop-bar-grad)" />
                <rect x="234" y="24" width="26" height="90" rx="5" fill="url(#laptop-bar-grad)" />
                <rect x="278" y="10" width="26" height="104" rx="5" fill="#553BF6" />

                {/* Smooth Upward Trend Curve */}
                <path
                  d="M27 76 Q 115 54, 160 40 T 291 8"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <circle cx="291" cy="8" r="4.5" fill="#10B981" />
              </svg>

              <div className="mt-2 flex items-center justify-between text-[10px] font-medium text-slate-400">
                <span>Audit</span>
                <span>Brand</span>
                <span>SEO</span>
                <span>Social</span>
                <span>Ads</span>
                <span>Scale</span>
              </div>
            </div>
          </div>
        </div>
        {/* Laptop Aluminum Base */}
        <div className="mx-auto w-[106%] -ml-[3%] h-3.5 rounded-b-xl bg-gradient-to-r from-slate-300 via-slate-100 to-slate-300 border-t border-slate-300 shadow-md" />
      </div>

      {/* Right-Side Outcome Stack (Inspired by Markito's 3 Outcome Cards) */}
      <div className="w-full sm:w-auto grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-1 gap-3 shrink-0">
        <div className="bg-white rounded-2xl px-4 py-3.5 border border-indigo-100/90 shadow-sm flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bold text-[#0B0F19] whitespace-nowrap">
              Stronger Visibility
            </div>
            <div className="text-[11px] text-slate-500">
              Search &amp; Local Reach
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl px-4 py-3.5 border border-indigo-100/90 shadow-sm flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-50 text-[#6A35FF] flex items-center justify-center shrink-0">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bold text-[#0B0F19] whitespace-nowrap">
              Qualified Leads
            </div>
            <div className="text-[11px] text-slate-500">
              Targeted Campaigns
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl px-4 py-3.5 border border-indigo-100/90 shadow-sm flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Globe className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bold text-[#0B0F19] whitespace-nowrap">
              Modern Presence
            </div>
            <div className="text-[11px] text-slate-500">
              Web &amp; Brand Authority
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface PortfolioPreviewProps {
  item: PortfolioItem;
}

export const PortfolioPreviewVisual: React.FC<PortfolioPreviewProps> = ({
  item,
}) => {
  const [imageFailed, setImageFailed] = useState(false);

  if (item.imageUrl && item.imageUrl.trim() !== '' && !imageFailed) {
    return (
      <img
        src={item.imageUrl}
        alt={item.imageAlt}
        referrerPolicy="no-referrer"
        onError={() => setImageFailed(true)}
        className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-[1.03]"
      />
    );
  }

  return <ConceptVectorBoard visualKey={item.visualKey} />;
};

const ConceptVectorBoard: React.FC<{ visualKey: ConceptVisualKey }> = ({
  visualKey,
}) => {
  switch (visualKey) {
    case 'web-corporate':
      return (
        <div className="w-full h-full bg-gradient-to-br from-[#0B0F19] via-[#1E1B4B] to-[#4338CA] p-5 flex items-center justify-center">
          <div className="w-full max-w-[290px] bg-white rounded-xl shadow-lg overflow-hidden border border-white/20 transition-transform duration-200 group-hover:scale-[1.02]">
            <div className="px-3 py-2 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-rose-400" />
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              </div>
              <div className="w-24 h-2 rounded bg-slate-200" />
            </div>
            <div className="p-4">
              <div className="grid grid-cols-12 gap-3 items-center">
                <div className="col-span-7 space-y-2">
                  <div className="w-12 h-1.5 rounded bg-[#6A35FF]" />
                  <div className="w-full h-2.5 rounded bg-[#0B0F19]" />
                  <div className="w-4/5 h-2.5 rounded bg-[#553BF6]" />
                  <div className="w-full h-1.5 rounded bg-slate-300" />
                  <div className="w-16 h-5 rounded-md bg-brand-gradient mt-2" />
                </div>
                <div className="col-span-5 h-20 rounded-lg bg-[#F5F3FF] border border-indigo-100 p-2 flex flex-col justify-between">
                  <div className="w-8 h-1.5 rounded bg-indigo-300" />
                  <div className="grid grid-cols-2 gap-1">
                    <div className="h-7 rounded bg-white border border-indigo-100" />
                    <div className="h-7 rounded bg-[#6A35FF]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    case 'social-grid':
      return (
        <div className="w-full h-full bg-gradient-to-br from-[#FDF2F8] via-[#F3E8FF] to-[#E0E7FF] p-5 flex items-center justify-center">
          <div className="grid grid-cols-3 gap-2 w-full max-w-[260px] transition-transform duration-200 group-hover:scale-[1.02]">
            <div className="aspect-square rounded-lg bg-[#0B0F19] p-2.5 flex flex-col justify-between text-white">
              <div className="w-4 h-1 bg-pink-400 rounded" />
              <div className="text-[9px] font-bold leading-tight">
                Brand Story
              </div>
            </div>
            <div className="aspect-square rounded-lg bg-white p-2.5 border border-purple-200/70 flex flex-col justify-between shadow-2xs">
              <div className="w-5 h-5 rounded bg-purple-50 border border-purple-100" />
              <div className="w-full h-1.5 rounded bg-slate-800" />
            </div>
            <div className="aspect-square rounded-lg bg-gradient-to-br from-[#6A35FF] to-[#EC4899] p-2.5 flex flex-col justify-between text-white">
              <div className="w-4 h-1 bg-white/60 rounded" />
              <div className="text-[9px] font-bold leading-tight">
                Carousel
              </div>
            </div>
            <div className="aspect-square rounded-lg bg-white p-2.5 border border-purple-200/70 flex flex-col justify-between shadow-2xs">
              <div className="w-3/4 h-1.5 rounded bg-[#6A35FF]" />
              <div className="w-full h-1.5 rounded bg-slate-300" />
            </div>
            <div className="aspect-square rounded-lg bg-[#0B0F19] p-2.5 flex items-center justify-center text-white font-extrabold text-sm tracking-tight">
              ZX
            </div>
            <div className="aspect-square rounded-lg bg-white p-2.5 border border-purple-200/70 flex flex-col justify-between shadow-2xs">
              <div className="w-full h-6 rounded bg-indigo-50" />
              <div className="w-2/3 h-1.5 rounded bg-slate-700" />
            </div>
          </div>
        </div>
      );

    case 'brand-identity':
      return (
        <div className="w-full h-full bg-gradient-to-br from-[#0B0F19] via-[#1E1B4B] to-[#312E81] p-5 flex items-center justify-center">
          <div className="w-full max-w-[280px] grid grid-cols-12 gap-2.5 transition-transform duration-200 group-hover:scale-[1.02]">
            <div className="col-span-7 bg-white rounded-xl p-4 flex flex-col justify-between h-36 shadow-md">
              <div className="text-[10px] font-semibold text-slate-400">
                Identity System
              </div>
              <div className="text-2xl font-extrabold tracking-tight text-[#0B0F19]">
                Aa Bb
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-md bg-[#0B0F19]" />
                <span className="w-5 h-5 rounded-md bg-[#6A35FF]" />
                <span className="w-5 h-5 rounded-md bg-[#3B82F6]" />
              </div>
            </div>
            <div className="col-span-5 flex flex-col gap-2.5 h-36">
              <div className="flex-1 bg-brand-gradient rounded-xl p-3 text-white flex flex-col justify-between shadow-md">
                <div className="w-5 h-1 rounded bg-white/60" />
                <div className="text-xs font-bold">Logo Suite</div>
              </div>
              <div className="flex-1 bg-[#F5F3FF] rounded-xl p-3 text-[#0B0F19] flex flex-col justify-between">
                <div className="w-8 h-1 rounded bg-indigo-400" />
                <div className="text-[10px] font-bold">Style Guide</div>
              </div>
            </div>
          </div>
        </div>
      );

    case 'campaign-funnel':
      return (
        <div className="w-full h-full bg-gradient-to-br from-[#F5F3FF] via-[#EDE9FE] to-[#E0E7FF] p-5 flex items-center justify-center">
          <div className="w-full max-w-[280px] bg-white rounded-2xl p-4 shadow-md border border-indigo-100 space-y-2.5 transition-transform duration-200 group-hover:scale-[1.02]">
            <div className="flex items-center justify-between text-[10px] text-slate-500 pb-1 border-b border-slate-100">
              <span className="font-bold text-[#0B0F19]">
                Growth Campaign Architecture
              </span>
              <span>Funnel</span>
            </div>
            <div className="h-7 rounded-lg bg-[#0B0F19] text-white px-3 flex items-center justify-between text-[11px] font-medium">
              <span>01. Local &amp; Search Reach</span>
              <span className="text-indigo-300">Attract</span>
            </div>
            <div className="h-7 w-11/12 mx-auto rounded-lg bg-[#553BF6] text-white px-3 flex items-center justify-between text-[11px] font-medium">
              <span>02. Landing Experience</span>
              <span className="text-indigo-100">Engage</span>
            </div>
            <div className="h-7 w-4/5 mx-auto rounded-lg bg-[#2563EB] text-white px-3 flex items-center justify-between text-[11px] font-medium">
              <span>03. Lead Conversion</span>
              <span className="text-blue-100">Scale</span>
            </div>
          </div>
        </div>
      );

    case 'ad-creatives':
      return (
        <div className="w-full h-full bg-gradient-to-br from-[#1E1B4B] via-[#4C1D95] to-[#4361EE] p-5 flex items-center justify-center">
          <div className="flex items-center gap-3 w-full max-w-[270px] justify-center transition-transform duration-200 group-hover:scale-[1.02]">
            {/* Feed Ad Card */}
            <div className="w-36 bg-white rounded-xl p-3 shadow-lg">
              <div className="flex items-center gap-1.5 mb-2">
                <div className="w-4 h-4 rounded-full bg-[#6A35FF]" />
                <div className="w-14 h-1.5 rounded bg-slate-300" />
              </div>
              <div className="h-16 rounded-lg bg-[#F5F3FF] border border-indigo-100 p-2 flex flex-col justify-between mb-2">
                <div className="w-10 h-1.5 rounded bg-[#6A35FF]" />
                <div className="w-full h-2 rounded bg-[#0B0F19]" />
              </div>
              <div className="h-5 rounded-md bg-brand-gradient text-[9px] font-semibold text-white flex items-center justify-center">
                Get Offer
              </div>
            </div>
            {/* Story Ad Card */}
            <div className="w-24 h-36 bg-white/95 rounded-xl p-2.5 shadow-lg flex flex-col justify-between">
              <div className="w-full h-1 rounded bg-indigo-200" />
              <div className="space-y-1.5">
                <div className="w-8 h-1.5 rounded bg-[#6A35FF]" />
                <div className="w-full h-2 rounded bg-[#0B0F19]" />
                <div className="w-3/4 h-2 rounded bg-[#553BF6]" />
              </div>
              <div className="h-5 rounded-md bg-[#0B0F19] text-[8px] font-semibold text-white flex items-center justify-center">
                Learn More
              </div>
            </div>
          </div>
        </div>
      );

    case 'web-local-lead':
    default:
      return (
        <div className="w-full h-full bg-gradient-to-br from-[#EEF2FF] via-[#EDE9FE] to-[#DBEAFE] p-5 flex items-center justify-center">
          <div className="w-full max-w-[280px] bg-white rounded-2xl p-4 shadow-md border border-indigo-100 grid grid-cols-12 gap-3 items-center transition-transform duration-200 group-hover:scale-[1.02]">
            <div className="col-span-6 space-y-2">
              <div className="w-10 h-1.5 rounded bg-[#6A35FF]" />
              <div className="w-full h-2.5 rounded bg-[#0B0F19]" />
              <div className="w-5/6 h-2.5 rounded bg-[#553BF6]" />
              <div className="w-full h-1.5 rounded bg-slate-300" />
              <div className="pt-1 flex gap-1.5">
                <div className="h-5 w-16 rounded-md bg-brand-gradient" />
                <div className="h-5 w-10 rounded-md border border-slate-200" />
              </div>
            </div>
            <div className="col-span-6 bg-[#F8F7FF] rounded-xl p-2.5 border border-indigo-100 space-y-1.5">
              <div className="text-[9px] font-bold text-[#0B0F19]">
                Free Quote
              </div>
              <div className="h-3.5 rounded bg-white border border-slate-200" />
              <div className="h-3.5 rounded bg-white border border-slate-200" />
              <div className="h-5 rounded-md bg-[#0B0F19]" />
            </div>
          </div>
        </div>
      );
  }
};
