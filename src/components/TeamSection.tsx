import React from 'react';
import { motion } from 'motion/react';
import { Building2, Laptop, Network, Check, MessageCircle } from 'lucide-react';
import {
  TEAM_STRUCTURES,
  LEADERSHIP_PROFILES,
  COMPANY_INFO,
  buildWhatsAppUrl,
} from '../data/agencyData';

interface TeamSectionProps {
  showExtendedDetails?: boolean;
}

const STRUCTURE_ICONS = [
  { Icon: Building2, gradient: 'from-[#6A35FF] to-[#4361EE]' },
  { Icon: Laptop, gradient: 'from-[#2563EB] to-[#0EA5E9]' },
  { Icon: Network, gradient: 'from-[#EC4899] to-[#8B5CF6]' },
];

export const TeamSection: React.FC<TeamSectionProps> = ({
  showExtendedDetails = false,
}) => {
  return (
    <section
      id="team"
      className="py-20 lg:py-24 bg-[#F8F7FF] border-b border-indigo-100/70"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="text-xs sm:text-sm font-bold text-[#6A35FF]">
              Our Team Structure · Collaborative Execution
            </span>
            <span
              className="h-0.5 w-10 bg-gradient-to-r from-[#6A35FF] to-[#3B82F6] rounded-full"
              aria-hidden="true"
            />
          </div>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0B0F19] headline-balance">
            Three Coordinated Teams.{' '}
            <span className="text-brand-gradient">One Quality Standard.</span>
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            {COMPANY_INFO.name} operates through three integrated team
            structures—combining dedicated core project oversight with flexible
            remote execution and specialized domain talent.
          </p>
        </div>

        {/* Three Team Structures Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {TEAM_STRUCTURES.map((structure, idx) => {
            const { Icon, gradient } =
              STRUCTURE_ICONS[idx % STRUCTURE_ICONS.length];
            return (
              <motion.div
                key={structure.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="bg-white rounded-2xl p-7 border border-indigo-100/90 shadow-2xs hover:shadow-lg hover:shadow-indigo-950/6 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-sm flex items-center justify-center shrink-0`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-semibold text-slate-400 tabular-nums">
                      0{idx + 1} · Team Model
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#0B0F19]">
                    {structure.title}
                  </h3>

                  <p className="mt-2 text-sm font-semibold text-[#6A35FF]">
                    {structure.shortDescription}
                  </p>

                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                    {structure.fullDescription}
                  </p>

                  {showExtendedDetails && (
                    <ul className="mt-5 pt-5 border-t border-slate-100 space-y-2.5">
                      {structure.responsibilities.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600"
                        >
                          <Check className="w-4 h-4 text-[#6A35FF] mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Agency Leadership Row */}
        <div className="mt-14 pt-12 border-t border-indigo-200/60">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="text-xs sm:text-sm font-bold text-[#6A35FF]">
                Agency Leadership &amp; Representation
              </div>
              <h3 className="mt-1 text-2xl font-extrabold text-[#0B0F19]">
                Guided by Accountable Leadership
              </h3>
            </div>
            <a
              href={buildWhatsAppUrl(
                'Hello Awais & ZENVEXA Team, I would like to discuss a project for my business.'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#6A35FF] hover:text-[#0B0F19] transition-colors whitespace-nowrap shrink-0"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Connect Directly on WhatsApp</span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {LEADERSHIP_PROFILES.map((leader) => (
              <div
                key={leader.name}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-indigo-100/90 shadow-2xs flex items-start gap-5"
              >
                <div className="w-14 h-14 rounded-2xl bg-brand-gradient text-white font-extrabold text-lg flex items-center justify-center shrink-0 shadow-sm">
                  {leader.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-lg font-bold text-[#0B0F19]">
                      {leader.name}
                    </h4>
                    <span aria-hidden="true" className="text-slate-300">
                      ·
                    </span>
                    <span className="text-sm font-bold text-[#6A35FF]">
                      {leader.role}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500">{leader.focus}</div>
                  <p className="pt-1 text-sm text-slate-600 leading-relaxed">
                    {leader.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
