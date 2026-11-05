import React from 'react';
import { motion } from 'motion/react';
import {
  Globe,
  Sparkles,
  ShieldCheck,
  Users,
  Compass,
  ArrowRight,
  MessageCircle,
  Mail,
  Check,
  Layers,
  Award,
  TrendingUp,
} from 'lucide-react';
import {
  COMPANY_INFO,
  CORE_VALUES,
  TEAM_STRUCTURES,
  LEADERSHIP_PROFILES,
  WHY_CHOOSE_DATA,
  RoutePath,
  buildWhatsAppUrl,
  buildMailtoUrl,
} from '../data/agencyData';
import { AGENCY_IMAGES } from '../data/agencyImages';
import { Breadcrumbs } from './Breadcrumbs';

interface AboutPageProps {
  onNavigate: (path: RoutePath) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[{ label: 'About Us' }]}
        onNavigate={onNavigate}
        subtitle="ZENVEXA Digital Agency · We Build. We Market. We Scale."
      />

      {/* ========================================================================= */}
      {/* 1. Cinematic Professional Hero Banner */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden pt-12 pb-18 lg:pt-16 lg:pb-22 bg-gradient-to-b from-[#F8F7FF] via-[#FAF9FE] to-white border-b border-indigo-100/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-indigo-100 text-xs font-bold text-[#6A35FF] shadow-2xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Digital Growth Partner</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0B0F19] leading-tight headline-balance">
                Your Dedicated Partner in{' '}
                <span className="text-brand-gradient">Digital Growth.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                Founded by <strong>{COMPANY_INFO.founder}</strong> and represented by <strong>{COMPANY_INFO.representative}</strong> in Pakistan, ZENVEXA delivers structured creative, branding, website development, and performance-marketing solutions for businesses across Pakistan, the United States, and international markets.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                <button
                  type="button"
                  onClick={() => onNavigate('/services')}
                  className="px-6 py-3.5 text-sm font-semibold text-white bg-brand-gradient bg-brand-gradient-hover rounded-xl shadow-md shadow-indigo-500/20 cursor-pointer"
                >
                  Explore Our Services
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('/contact')}
                  className="px-6 py-3.5 text-sm font-semibold text-[#0B0F19] bg-white border border-slate-300 hover:border-indigo-300 rounded-xl transition-colors cursor-pointer"
                >
                  Get in Touch
                </button>
              </div>

              {/* Trust Metadata */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-500 border-t border-indigo-100/80">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#6A35FF]" />
                  <span>Founder-Led Quality Oversight</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-[#6A35FF]" />
                  <span>Pakistan HQ · US &amp; Global Reach</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden border border-indigo-100 shadow-2xl shadow-indigo-950/15 bg-slate-900 group">
                <img
                  src={AGENCY_IMAGES.aboutHero}
                  alt="ZENVEXA Digital Agency Team collaborating in contemporary agency studio"
                  className="w-full aspect-[16/10] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white/50 shadow-xl flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-[#0B0F19]">
                      In-House Operations &amp; Specialist Network
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Coordinated project management &amp; domain experts
                    </div>
                  </div>
                  <div className="text-xs font-bold text-[#6A35FF]">
                    3-Tier Team Model
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. Who We Are & Our Story */}
      {/* ========================================================================= */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-3">
                <span className="text-xs sm:text-sm font-bold text-[#6A35FF]">
                  Who We Are · Agency Roots
                </span>
                <span className="h-0.5 w-10 bg-gradient-to-r from-[#6A35FF] to-[#3B82F6] rounded-full" />
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B0F19] tracking-tight leading-tight">
                Built to Bridge the Gap Between Creative Craft and Business Commercials.
              </h2>

              <p className="text-base text-slate-600 leading-relaxed">
                {COMPANY_INFO.description} {COMPANY_INFO.extendedDescription}
              </p>

              <p className="text-base text-slate-600 leading-relaxed">
                Too many agencies operate at extremes: either building visually attractive websites that generate zero customer inquiries, or pushing aggressive ad campaigns without brand cohesion. ZENVEXA was established to combine both: high-standard visual craft with measurable customer acquisition.
              </p>

              <div className="p-5 rounded-2xl bg-[#FAF9FE] border border-indigo-100 space-y-2">
                <div className="text-xs font-bold text-[#6A35FF] uppercase tracking-wider">
                  Our Brand Tagline
                </div>
                <div className="text-xl font-extrabold text-[#0B0F19]">
                  “{COMPANY_INFO.tagline}”
                </div>
                <p className="text-xs text-slate-500">
                  We build your digital foundation, market your solutions to active buyers, and scale your customer acquisition.
                </p>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4">
              <div className="bg-[#FAF9FE] rounded-3xl p-8 border border-indigo-100 shadow-sm space-y-4">
                <h3 className="text-xl font-bold text-[#0B0F19]">
                  Our Story
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  ZENVEXA started with a clear observation: small and medium enterprises worldwide need reliable, modern digital partners who respect their budgets, communicate with complete transparency, and execute with international quality standards.
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Headquartered in Pakistan, we organized our operations to serve domestic leaders as well as international businesses in the US, UK, and Middle East. Through our agile 3-tier team model, clients receive dedicated coordination paired with specialist-level execution.
                </p>
                <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-slate-700">
                  <div className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-[#6A35FF]" />
                    <span>Serving Pakistan &amp; Global Clients</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-[#6A35FF]" />
                    <span>Founder-Led Quality Oversight</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. Our Mission & Our Vision */}
      {/* ========================================================================= */}
      <section className="py-20 bg-[#FAF9FE] border-b border-indigo-100/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-indigo-100/80 shadow-xs space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#F5F3FF] text-[#6A35FF] flex items-center justify-center">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-extrabold text-[#0B0F19]">
                  Our Mission
                </h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  To empower growing businesses with structured, transparent, and high-standard digital marketing, branding, and web development solutions that generate qualified customer demand, elevate brand authority, and fuel long-term commercial success.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 text-xs font-semibold text-[#6A35FF]">
                Real strategies · Accountable delivery · Zero fluff
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-indigo-100/80 shadow-xs space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#F5F3FF] text-[#6A35FF] flex items-center justify-center">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-extrabold text-[#0B0F19]">
                  Our Vision
                </h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  To be recognized across Pakistan and international markets as a trusted, results-focused digital growth agency known for creative integrity, dependable project delivery, and honest client partnerships that scale sustainably.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 text-xs font-semibold text-[#6A35FF]">
                International standards · Accessible pricing · Global reach
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. Our Core Values */}
      {/* ========================================================================= */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-2xl">
            <div className="text-xs sm:text-sm font-bold text-[#6A35FF]">
              Guiding Principles
            </div>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#0B0F19]">
              Our Core Values
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              Every project, communication, and campaign we build is governed by these foundational commitments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {CORE_VALUES.map((val, idx) => (
              <div
                key={val.title}
                className="bg-[#FAF9FE] rounded-2xl p-7 border border-indigo-100/80 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <span className="text-xs font-bold text-[#6A35FF] uppercase tracking-wider">
                    Value 0{idx + 1}
                  </span>
                  <h3 className="text-lg font-bold text-[#0B0F19]">
                    {val.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {val.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. Our Team Structure & Leadership */}
      {/* ========================================================================= */}
      <section className="py-20 bg-[#FAF9FE] border-b border-indigo-100/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-2xl">
            <div className="text-xs sm:text-sm font-bold text-[#6A35FF]">
              Collaborative Architecture
            </div>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#0B0F19]">
              Our 3-Tier Team Structure
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              How ZENVEXA operates seamlessly across Pakistan, the US, and international time zones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {TEAM_STRUCTURES.map((struct, idx) => (
              <div
                key={struct.id}
                className="bg-white rounded-2xl p-7 border border-indigo-100 shadow-xs space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F5F3FF] text-[#6A35FF] font-extrabold text-sm flex items-center justify-center">
                    0{idx + 1}
                  </div>
                  <h3 className="text-lg font-bold text-[#0B0F19]">
                    {struct.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {struct.fullDescription}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-2">
                  <div className="text-xs font-bold text-slate-700">
                    Core Operational Roles:
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {struct.responsibilities.map((resp) => (
                      <li key={resp} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#6A35FF] mt-0.5 shrink-0" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Leadership Profiles */}
          <div className="pt-8">
            <h3 className="text-xl font-extrabold text-[#0B0F19] mb-6">
              Agency Leadership
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {LEADERSHIP_PROFILES.map((leader) => (
                <div
                  key={leader.name}
                  className="bg-white rounded-2xl p-6 border border-indigo-100 flex flex-col sm:flex-row gap-5 items-start"
                >
                  <div className="w-14 h-14 rounded-2xl bg-brand-gradient text-white font-extrabold text-lg flex items-center justify-center shrink-0 shadow-sm">
                    {leader.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-base font-bold text-[#0B0F19]">
                        {leader.name}
                      </h4>
                      <span className="text-xs font-semibold text-[#6A35FF]">
                        · {leader.role}
                      </span>
                    </div>
                    <div className="text-xs font-medium text-slate-500">
                      {leader.focus}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                      {leader.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. Why Businesses Choose ZENVEXA */}
      {/* ========================================================================= */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-2xl">
            <div className="text-xs sm:text-sm font-bold text-[#6A35FF]">
              Competitive Advantage
            </div>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#0B0F19]">
              Why Businesses Choose ZENVEXA
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_CHOOSE_DATA.map((item) => (
              <div
                key={item.number}
                className="bg-[#FAF9FE] rounded-2xl p-6 border border-indigo-100/80 space-y-2"
              >
                <span className="text-xs font-bold text-[#6A35FF]">
                  {item.number}
                </span>
                <h3 className="text-base font-bold text-[#0B0F19]">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. Final Call to Action */}
      {/* ========================================================================= */}
      <section className="py-20 bg-[#FAF9FE]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#0B0F19] to-[#1E1B4B] rounded-3xl p-8 sm:p-12 text-white text-center space-y-6 shadow-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-semibold text-indigo-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Let’s Build Something Great Together</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight headline-balance">
              Ready to Start Your Digital Journey With ZENVEXA?
            </h2>

            <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-300 leading-relaxed">
              Connect with Agency Representative Awais or submit your project inquiry online to explore custom options for your business.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3.5">
              <button
                type="button"
                onClick={() => onNavigate('/contact')}
                className="px-7 py-3.5 text-sm sm:text-base font-semibold text-white bg-brand-gradient bg-brand-gradient-hover rounded-xl shadow-lg cursor-pointer"
              >
                Get a Free Consultation
              </button>

              <a
                href={buildWhatsAppUrl(
                  'Hello Awais! I visited the ZENVEXA About page and would like to discuss working together.'
                )}
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
    </div>
  );
};
