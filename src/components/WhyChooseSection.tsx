import React from 'react';
import { motion } from 'motion/react';
import {
  Users,
  Wallet,
  Sliders,
  Sparkles,
  MessageSquare,
  Target,
} from 'lucide-react';
import { WHY_CHOOSE_DATA } from '../data/agencyData';

const WHY_ICON_STYLES = [
  { Icon: Users, gradient: 'from-[#6A35FF] to-[#4361EE]' },
  { Icon: Wallet, gradient: 'from-[#10B981] to-[#059669]' },
  { Icon: Sliders, gradient: 'from-[#2563EB] to-[#0EA5E9]' },
  { Icon: Sparkles, gradient: 'from-[#EC4899] to-[#F43F5E]' },
  { Icon: MessageSquare, gradient: 'from-[#F59E0B] to-[#F97316]' },
  { Icon: Target, gradient: 'from-[#7C3AED] to-[#4F46E5]' },
];

export const WhyChooseSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-24 bg-[#F8F7FF] border-b border-indigo-100/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-12">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3">
              <span className="text-xs sm:text-sm font-bold text-[#6A35FF]">
                Why Choose Us · The ZENVEXA Advantage
              </span>
              <span
                className="h-0.5 w-10 bg-gradient-to-r from-[#6A35FF] to-[#3B82F6] rounded-full"
                aria-hidden="true"
              />
            </div>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0B0F19] headline-balance">
              Why Businesses Choose{' '}
              <span className="text-brand-gradient">ZENVEXA.</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              We combine creative craft, tailored marketing strategy, modern web
              technology, and transparent communication so your brand grows with
              consistency.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {WHY_CHOOSE_DATA.map((feature, idx) => {
            const { Icon, gradient } =
              WHY_ICON_STYLES[idx % WHY_ICON_STYLES.length];
            return (
              <motion.div
                key={feature.number}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.3, delay: (idx % 3) * 0.05 }}
                className="bg-white rounded-2xl p-7 border border-indigo-100/80 hover:border-indigo-300 shadow-2xs hover:shadow-lg hover:shadow-indigo-950/6 transition-all duration-200"
              >
                <div className="flex items-center justify-between gap-4 mb-5">
                  <div
                    className={`w-11 h-11 rounded-xl bg-gradient-to-br ${gradient} text-white shadow-sm flex items-center justify-center shrink-0`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold text-slate-400 tabular-nums">
                    {feature.number}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#0B0F19]">
                  {feature.title}
                </h3>

                <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
