import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Cpu, Target, ArrowRight } from 'lucide-react';
import {
  COMPANY_INFO,
  CORE_VALUES,
  RoutePath,
} from '../data/agencyData';

interface AboutSectionProps {
  isStandalonePage?: boolean;
  onNavigate: (path: RoutePath) => void;
}

const VALUE_ICONS = [Sparkles, Cpu, Target];

export const AboutSection: React.FC<AboutSectionProps> = ({
  isStandalonePage = false,
  onNavigate,
}) => {
  const HeadingTag = isStandalonePage ? 'h1' : 'h2';

  return (
    <section
      id="about"
      className="py-20 lg:py-24 bg-white border-b border-slate-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Left Column: Agency Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.35 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="flex items-center gap-3">
              <span className="text-xs sm:text-sm font-bold text-[#6A35FF]">
                About ZENVEXA Digital Agency · {COMPANY_INFO.location}
              </span>
              <span
                className="h-0.5 w-10 bg-gradient-to-r from-[#6A35FF] to-[#3B82F6] rounded-full"
                aria-hidden="true"
              />
            </div>

            <HeadingTag className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0B0F19] headline-balance">
              Your Partner in{' '}
              <span className="text-brand-gradient">Digital Growth.</span>
            </HeadingTag>

            <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
              At ZENVEXA Digital Agency, we believe every business deserves a
              powerful digital presence. We combine creativity, technology, and
              marketing strategy to help businesses connect with their audiences
              and achieve sustainable growth.
            </p>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {COMPANY_INFO.description} {COMPANY_INFO.extendedDescription}
            </p>

            {/* Core Values Grid */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-indigo-100">
              {CORE_VALUES.map((value, idx) => {
                const IconComponent = VALUE_ICONS[idx % VALUE_ICONS.length];
                return (
                  <div key={value.title} className="pt-2 space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-[#F3F0FF] text-[#6A35FF] flex items-center justify-center">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <h3 className="text-base font-bold text-[#0B0F19]">
                      {value.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {!isStandalonePage && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate('/about')}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#6A35FF] hover:text-[#0B0F19] transition-colors cursor-pointer"
                >
                  <span>Explore Our Agency Profile &amp; Team Structure</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>

          {/* Right Column: Official Brand Identity & Leadership Overview Card */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.35, delay: 0.06 }}
            className="lg:col-span-5 bg-gradient-to-b from-[#F8F7FF] to-[#F3F0FF] rounded-3xl p-6 sm:p-8 border border-indigo-100 shadow-xs space-y-6"
          >
            <div className="bg-white rounded-2xl p-6 border border-indigo-100/80 shadow-2xs flex flex-col items-center text-center">
              <img
                src={COMPANY_INFO.logoPath}
                alt="ZENVEXA Digital Agency Official Brand Emblem"
                referrerPolicy="no-referrer"
                className="w-36 h-36 object-contain"
              />
              <div className="mt-3 text-sm font-extrabold text-[#0B0F19]">
                {COMPANY_INFO.name}
              </div>
              <div className="mt-1 text-xs font-semibold text-[#6A35FF]">
                “{COMPANY_INFO.tagline}”
              </div>
            </div>

            <dl className="divide-y divide-indigo-200/60 text-sm">
              <div className="py-3 flex items-center justify-between gap-4">
                <dt className="text-slate-500">Founder</dt>
                <dd className="font-bold text-[#0B0F19]">
                  {COMPANY_INFO.founder}
                </dd>
              </div>
              <div className="py-3 flex items-center justify-between gap-4">
                <dt className="text-slate-500">Agency Representative</dt>
                <dd className="font-bold text-[#0B0F19]">
                  {COMPANY_INFO.representative}
                </dd>
              </div>
              <div className="py-3 flex items-center justify-between gap-4">
                <dt className="text-slate-500">Headquarters</dt>
                <dd className="font-bold text-[#0B0F19]">
                  {COMPANY_INFO.location}
                </dd>
              </div>
              <div className="py-3 flex items-center justify-between gap-4">
                <dt className="text-slate-500">Client Markets</dt>
                <dd className="font-bold text-[#0B0F19] text-right">
                  Pakistan, US &amp; Global
                </dd>
              </div>
            </dl>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
