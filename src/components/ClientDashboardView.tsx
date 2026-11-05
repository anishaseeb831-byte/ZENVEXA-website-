import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ShieldCheck,
  Lock,
  TrendingUp,
  Globe,
  Laptop,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  BarChart3,
  Layers,
  Sparkles,
  MessageCircle,
  Mail,
  Activity,
  FileCheck,
  Check,
  ChevronRight,
  Zap,
} from 'lucide-react';
import {
  COMPANY_INFO,
  RoutePath,
  buildWhatsAppUrl,
  buildMailtoUrl,
} from '../data/agencyData';

interface ClientDashboardViewProps {
  userEmail?: string | null;
  userName?: string | null;
  isSignedIn?: boolean;
  onSignIn?: () => void;
  onNavigate: (path: RoutePath) => void;
}

export const ClientDashboardView: React.FC<ClientDashboardViewProps> = ({
  userEmail,
  userName,
  isSignedIn = false,
  onSignIn,
  onNavigate,
}) => {
  const [selectedCampaignTab, setSelectedCampaignTab] = useState<'meta' | 'google'>('meta');

  return (
    <div className="space-y-8">
      {/* Top Security & Trust Clearance Ribbon */}
      <div className="bg-gradient-to-r from-slate-900 via-[#131127] to-slate-900 text-white rounded-3xl p-6 sm:p-7 shadow-lg border border-indigo-950/40 relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#6A35FF]/15 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <Lock className="w-3.5 h-3.5" />
              <span>256-Bit SSL Encrypted Client Environment</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white headline-balance">
              {isSignedIn ? `Welcome, ${userName || 'Valued Partner'}` : 'ZENVEXA Client Project & Growth Dashboard'}
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Real-time milestone tracking, performance metrics, and technical deliverables across active marketing campaigns and web engineering workflows.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {!isSignedIn && onSignIn && (
              <button
                type="button"
                onClick={onSignIn}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-bold text-[#0B0F19] bg-white hover:bg-slate-100 rounded-xl shadow-sm transition-all cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-[#6A35FF]" />
                <span>Sign In with Google</span>
              </button>
            )}

            <a
              href={buildWhatsAppUrl('Hello ZENVEXA! I would like to get an update on our project progress.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/15 rounded-xl transition-all"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Speak to Lead Awais</span>
            </a>
          </div>
        </div>

        {/* Live Status Indicators Bar */}
        <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <div className="text-slate-400 text-[11px] uppercase tracking-wider font-semibold">Security Clearance</div>
            <div className="font-bold text-slate-200 mt-0.5 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Verified Session</span>
            </div>
          </div>
          <div>
            <div className="text-slate-400 text-[11px] uppercase tracking-wider font-semibold">Dedicated Lead</div>
            <div className="font-bold text-slate-200 mt-0.5">{COMPANY_INFO.representative} &amp; {COMPANY_INFO.founder}</div>
          </div>
          <div>
            <div className="text-slate-400 text-[11px] uppercase tracking-wider font-semibold">Agency Operations</div>
            <div className="font-bold text-emerald-400 mt-0.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Active (Pakistan HQ)</span>
            </div>
          </div>
          <div>
            <div className="text-slate-400 text-[11px] uppercase tracking-wider font-semibold">Guaranteed SLA</div>
            <div className="font-bold text-slate-200 mt-0.5">&lt; 24h Review Window</div>
          </div>
        </div>
      </div>

      {/* KPI Overview Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-indigo-100 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Active Campaigns</span>
            <Activity className="w-4 h-4 text-[#6A35FF]" />
          </div>
          <div className="text-2xl font-black text-[#0B0F19]">2 Live</div>
          <div className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>Pacing on target (+18% MoM)</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-indigo-100 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Average Ad ROAS</span>
            <BarChart3 className="w-4 h-4 text-[#6A35FF]" />
          </div>
          <div className="text-2xl font-black text-[#0B0F19]">3.85x</div>
          <div className="text-xs text-slate-500">Across Meta &amp; Paid Social</div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-indigo-100 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Website Engineering</span>
            <Laptop className="w-4 h-4 text-[#6A35FF]" />
          </div>
          <div className="text-2xl font-black text-[#6A35FF]">82% Done</div>
          <div className="text-xs text-slate-500">Sprint 3: API &amp; Performance</div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-indigo-100 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Speed Benchmark</span>
            <Zap className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-[#0B0F19]">99 / 100</div>
          <div className="text-xs text-emerald-600 font-semibold">Google Core Web Vitals Pass</div>
        </div>
      </div>

      {/* Main Grid: Active Campaigns + Website Development Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ============================================================== */}
        {/* SECTION 1: Active Campaigns Progress (Col 6 / 12)             */}
        {/* ============================================================== */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-indigo-100 shadow-2xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-indigo-50">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6A35FF]">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Performance Marketing Track</span>
                </div>
                <h3 className="text-xl font-extrabold text-[#0B0F19] mt-0.5">
                  Active Campaigns Progress
                </h3>
              </div>

              {/* Campaign Switcher Pill */}
              <div className="inline-flex p-1 bg-slate-100 rounded-xl text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setSelectedCampaignTab('meta')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    selectedCampaignTab === 'meta'
                      ? 'bg-white text-[#6A35FF] shadow-xs'
                      : 'text-slate-600 hover:text-[#0B0F19]'
                  }`}
                >
                  Meta Ads (78%)
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedCampaignTab('google')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    selectedCampaignTab === 'google'
                      ? 'bg-white text-[#6A35FF] shadow-xs'
                      : 'text-slate-600 hover:text-[#0B0F19]'
                  }`}
                >
                  Local SEO &amp; Maps (65%)
                </button>
              </div>
            </div>

            {selectedCampaignTab === 'meta' ? (
              <div className="space-y-6">
                {/* Meta Ads Campaign Overview Card */}
                <div className="bg-gradient-to-br from-[#FAF9FE] to-[#F3F0FF] rounded-2xl p-5 border border-indigo-100/80 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#0B0F19]">Campaign: Q2 Meta Ads Lead Scaling Funnel</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 font-bold border border-emerald-500/20">
                      Live &amp; Optimizing
                    </span>
                  </div>

                  {/* Main Progress Bar */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold text-slate-700">
                      <span>Overall Campaign Delivery Pacing</span>
                      <span className="text-[#6A35FF] tabular-nums">78%</span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-indigo-100 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '78%' }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="h-full bg-brand-gradient rounded-full"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs">
                    <div className="bg-white/80 rounded-xl p-2.5 border border-indigo-100/60">
                      <div className="text-[11px] text-slate-500">Target CPL</div>
                      <div className="text-sm font-black text-[#0B0F19] mt-0.5">$4.18</div>
                    </div>
                    <div className="bg-white/80 rounded-xl p-2.5 border border-indigo-100/60">
                      <div className="text-[11px] text-slate-500">Verified Leads</div>
                      <div className="text-sm font-black text-emerald-600 mt-0.5">1,420</div>
                    </div>
                    <div className="bg-white/80 rounded-xl p-2.5 border border-indigo-100/60">
                      <div className="text-[11px] text-slate-500">Blended ROAS</div>
                      <div className="text-sm font-black text-[#6A35FF] mt-0.5">3.85x</div>
                    </div>
                  </div>
                </div>

                {/* Granular Milestones */}
                <div className="space-y-3">
                  <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Milestone Breakdown &amp; Status
                  </div>

                  <div className="space-y-3">
                    <div className="p-3.5 rounded-xl border border-indigo-100/80 bg-white space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 font-bold text-[#0B0F19]">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span>Audience Segmentation &amp; Pixel Setup</span>
                        </div>
                        <span className="text-emerald-600 font-bold">100% Complete</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                        <div className="w-full h-full bg-emerald-500 rounded-full" />
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl border border-indigo-100/80 bg-white space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 font-bold text-[#0B0F19]">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span>Creative Production (12 Ad Variations)</span>
                        </div>
                        <span className="text-emerald-600 font-bold">100% Complete</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                        <div className="w-full h-full bg-emerald-500 rounded-full" />
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl border border-indigo-100/80 bg-white space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 font-bold text-[#0B0F19]">
                          <Clock className="w-4 h-4 text-[#6A35FF] shrink-0" />
                          <span>Retargeting Funnel &amp; Lookalike Scaling</span>
                        </div>
                        <span className="text-[#6A35FF] font-bold">80% In Progress</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                        <div className="w-[80%] h-full bg-brand-gradient rounded-full" />
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl border border-indigo-100/80 bg-white space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 font-bold text-[#0B0F19]">
                          <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                          <span>AI Bid Optimization &amp; CPL Compression</span>
                        </div>
                        <span className="text-slate-600 font-bold">55% Active</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                        <div className="w-[55%] h-full bg-indigo-400 rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Local SEO & Maps Overview Card */}
                <div className="bg-gradient-to-br from-[#FAF9FE] to-[#F3F0FF] rounded-2xl p-5 border border-indigo-100/80 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#0B0F19]">Campaign: High-Intent Local Search &amp; Google Maps</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 font-bold border border-emerald-500/20">
                      Rankings Surging
                    </span>
                  </div>

                  {/* Main Progress Bar */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold text-slate-700">
                      <span>Local Authority &amp; Ranking Pacing</span>
                      <span className="text-[#6A35FF] tabular-nums">65%</span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-indigo-100 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '65%' }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="h-full bg-brand-gradient rounded-full"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs">
                    <div className="bg-white/80 rounded-xl p-2.5 border border-indigo-100/60">
                      <div className="text-[11px] text-slate-500">Search Growth</div>
                      <div className="text-sm font-black text-emerald-600 mt-0.5">+185%</div>
                    </div>
                    <div className="bg-white/80 rounded-xl p-2.5 border border-indigo-100/60">
                      <div className="text-[11px] text-slate-500">Map Top 3</div>
                      <div className="text-sm font-black text-[#0B0F19] mt-0.5">14 Keywords</div>
                    </div>
                    <div className="bg-white/80 rounded-xl p-2.5 border border-indigo-100/60">
                      <div className="text-[11px] text-slate-500">Monthly Calls</div>
                      <div className="text-sm font-black text-[#6A35FF] mt-0.5">380+ Calls</div>
                    </div>
                  </div>
                </div>

                {/* Granular Milestones */}
                <div className="space-y-3">
                  <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Milestone Breakdown &amp; Status
                  </div>

                  <div className="space-y-3">
                    <div className="p-3.5 rounded-xl border border-indigo-100/80 bg-white space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 font-bold text-[#0B0F19]">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span>Google Business Profile Optimization</span>
                        </div>
                        <span className="text-emerald-600 font-bold">100% Complete</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                        <div className="w-full h-full bg-emerald-500 rounded-full" />
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl border border-indigo-100/80 bg-white space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 font-bold text-[#0B0F19]">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span>NAP Consistency &amp; 40+ Local Citations</span>
                        </div>
                        <span className="text-emerald-600 font-bold">85% Complete</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                        <div className="w-[85%] h-full bg-emerald-500 rounded-full" />
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl border border-indigo-100/80 bg-white space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 font-bold text-[#0B0F19]">
                          <Clock className="w-4 h-4 text-[#6A35FF] shrink-0" />
                          <span>Location Pages &amp; Schema Markup</span>
                        </div>
                        <span className="text-[#6A35FF] font-bold">60% In Progress</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                        <div className="w-[60%] h-full bg-brand-gradient rounded-full" />
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl border border-indigo-100/80 bg-white space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 font-bold text-[#0B0F19]">
                          <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                          <span>Local Review Acquisition Engine</span>
                        </div>
                        <span className="text-slate-600 font-bold">40% Active</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                        <div className="w-[40%] h-full bg-indigo-400 rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ============================================================== */}
        {/* SECTION 2: Website Development Progress (Col 6 / 12)          */}
        {/* ============================================================== */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-indigo-100 shadow-2xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-indigo-50">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6A35FF]">
                  <Laptop className="w-3.5 h-3.5" />
                  <span>Full-Stack Engineering Track</span>
                </div>
                <h3 className="text-xl font-extrabold text-[#0B0F19] mt-0.5">
                  Website Development Progress
                </h3>
              </div>

              <div className="px-3 py-1 rounded-full bg-[#F5F3FF] border border-indigo-200 text-xs font-bold text-[#6A35FF] self-start sm:self-auto">
                Sprint 3 of 4 Active
              </div>
            </div>

            {/* Development Project Banner Card */}
            <div className="bg-gradient-to-br from-[#FAF9FE] to-[#F3F0FF] rounded-2xl p-5 border border-indigo-100/80 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#0B0F19]">Project: Custom Digital Agency Web Application</span>
                <span className="text-xs font-bold text-[#6A35FF] bg-white px-2.5 py-0.5 rounded-full border border-indigo-100 shadow-2xs">
                  Target Launch: 2 Weeks
                </span>
              </div>

              {/* Main Overall Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>Total Engineering Completion</span>
                  <span className="text-[#6A35FF] tabular-nums">82%</span>
                </div>
                <div className="w-full h-3 rounded-full bg-indigo-100 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '82%' }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="h-full bg-brand-gradient rounded-full"
                  />
                </div>
              </div>

              {/* Stack Architecture Highlights */}
              <div className="pt-2 flex flex-wrap items-center gap-2 text-[11px] text-slate-600 font-medium">
                <span className="px-2 py-0.5 rounded-md bg-white border border-indigo-100">React 19 SPA</span>
                <span className="px-2 py-0.5 rounded-md bg-white border border-indigo-100">TypeScript</span>
                <span className="px-2 py-0.5 rounded-md bg-white border border-indigo-100">Tailwind CSS</span>
                <span className="px-2 py-0.5 rounded-md bg-white border border-indigo-100">Firestore Cloud</span>
                <span className="px-2 py-0.5 rounded-md bg-white border border-indigo-100">SSL Encrypted</span>
              </div>
            </div>

            {/* 4-Stage Development Lifecycle Progress Tracker */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Development Stages &amp; Delivery Roadmap
              </div>

              <div className="space-y-3">
                {/* Stage 1 */}
                <div className="p-4 rounded-2xl border border-emerald-100 bg-emerald-50/40 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span className="font-bold text-[#0B0F19]">Stage 1: Architecture &amp; High-Fidelity UI/UX Design</span>
                    </div>
                    <span className="text-emerald-700 font-bold">100% Approved</span>
                  </div>
                  <p className="text-xs text-slate-600 pl-7">
                    Brand guidelines integrated, wireframes approved by Anis &amp; Awais, and responsive layouts structured.
                  </p>
                  <div className="pl-7 w-full h-1.5 rounded-full bg-emerald-200/60 overflow-hidden">
                    <div className="w-full h-full bg-emerald-600 rounded-full" />
                  </div>
                </div>

                {/* Stage 2 */}
                <div className="p-4 rounded-2xl border border-indigo-100 bg-white space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span className="font-bold text-[#0B0F19]">Stage 2: Frontend Engineering &amp; Multi-Page Routing</span>
                    </div>
                    <span className="text-emerald-700 font-bold">95% Complete</span>
                  </div>
                  <p className="text-xs text-slate-600 pl-7">
                    All 9 service pages, blog system, interactive modals, responsive navigation, and Markito design deployed.
                  </p>
                  <div className="pl-7 w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                    <div className="w-[95%] h-full bg-emerald-500 rounded-full" />
                  </div>
                </div>

                {/* Stage 3 */}
                <div className="p-4 rounded-2xl border border-indigo-200 bg-[#F8F7FF] space-y-2 shadow-2xs">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-[#6A35FF] text-white flex items-center justify-center text-[10px] font-bold animate-pulse">
                        3
                      </div>
                      <span className="font-bold text-[#0B0F19]">Stage 3: Cloud Database &amp; Client Portal Sync</span>
                    </div>
                    <span className="text-[#6A35FF] font-bold">80% In Review</span>
                  </div>
                  <p className="text-xs text-slate-600 pl-7">
                    Firestore integration, Google Workspace Auth, real-time inquiry tickets, and verified reviews pipeline active.
                  </p>
                  <div className="pl-7 w-full h-1.5 rounded-full bg-indigo-100 overflow-hidden">
                    <div className="w-[80%] h-full bg-brand-gradient rounded-full" />
                  </div>
                </div>

                {/* Stage 4 */}
                <div className="p-4 rounded-2xl border border-slate-100 bg-white space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[10px] font-bold">
                        4
                      </div>
                      <span className="font-bold text-slate-700">Stage 4: CRO, PageSpeed 99+ &amp; Security Auditing</span>
                    </div>
                    <span className="text-slate-500 font-bold">55% In Progress</span>
                  </div>
                  <p className="text-xs text-slate-500 pl-7">
                    Core Web Vitals tuning, meta tags, sitemap submission, and final cross-device quality assurance.
                  </p>
                  <div className="pl-7 w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                    <div className="w-[55%] h-full bg-indigo-400 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust & Direct Agency Escalation Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-indigo-100 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600">
            <ShieldCheck className="w-4 h-4" />
            <span>Dedicated Account Assurance</span>
          </div>
          <h4 className="text-lg font-bold text-[#0B0F19]">
            Have a project milestone question or custom scope request?
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
            Founder Anis and Agency Representative Awais supervise every client account personally to ensure rapid turnarounds and guaranteed execution quality.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <a
            href={buildWhatsAppUrl('Hello Awais and Anis, I would like to discuss my project progress and upcoming milestones.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-brand-gradient bg-brand-gradient-hover rounded-xl shadow-md shadow-indigo-500/20 transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp Project Lead</span>
          </a>

          <a
            href={buildMailtoUrl('Client Dashboard Inquiry — Project Progress Update')}
            className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
          >
            <Mail className="w-4 h-4 text-[#6A35FF]" />
            <span>Email Agency Team</span>
          </a>
        </div>
      </div>
    </div>
  );
};
