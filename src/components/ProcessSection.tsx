import React from 'react';
import { motion } from 'motion/react';
import { Search, Compass, Rocket, TrendingUp } from 'lucide-react';
import { PROCESS_STEPS } from '../data/agencyData';

const STEP_ICONS = [Search, Compass, Rocket, TrendingUp];

export const ProcessSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-24 bg-[#0B0F19] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl">
          <div className="text-xs sm:text-sm font-bold text-indigo-400 tracking-wide">
            Our Working Process · Four-Stage Methodology
          </div>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-white headline-balance">
            A Clear Path From Discovery to Sustainable Growth.
          </h2>
          <p className="mt-4 text-base text-slate-300 leading-relaxed">
            Every engagement follows a disciplined four-step workflow so your
            goals, creative assets, campaigns, and ongoing improvements stay
            aligned.
          </p>
        </div>

        {/* Connected Four-Step Timeline Grid */}
        <div className="mt-14 relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <div
            className="hidden lg:block absolute top-11 left-12 right-12 h-px bg-indigo-500/25 pointer-events-none"
            aria-hidden="true"
          />

          {PROCESS_STEPS.map((item, idx) => {
            const IconComponent = STEP_ICONS[idx % STEP_ICONS.length];
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.3, delay: idx * 0.06 }}
                className="relative bg-[#131829] rounded-2xl p-7 border border-white/10 hover:border-indigo-400/40 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="w-11 h-11 rounded-xl bg-brand-gradient text-white flex items-center justify-center shrink-0 shadow-md">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-indigo-300 tabular-nums tracking-wide">
                      Step {item.step}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white tracking-wide">
                    Step {item.step} — {item.title}
                  </h3>

                  <p className="mt-3 text-sm text-slate-200 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 text-xs text-indigo-200/80 leading-relaxed">
                  {item.detail}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
