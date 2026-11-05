import React from 'react';
import { MessageCircle, ArrowUpRight } from 'lucide-react';
import { buildWhatsAppUrl } from '../data/agencyData';

export const ConsultationSection: React.FC = () => {
  return (
    <section className="py-16 lg:py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-[#17133A] via-[#553BF6] to-[#3B82F6] px-6 py-12 sm:px-12 sm:py-16 text-white overflow-hidden shadow-xl shadow-indigo-950/15">
          {/* Subtle Ambient Highlights */}
          <div
            className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-white/12 blur-2xl pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute -left-16 -top-16 w-64 h-64 rounded-full bg-purple-400/20 blur-2xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl space-y-3">
              <div className="text-xs sm:text-sm font-semibold text-indigo-100">
                Free Strategy Consultation · Direct WhatsApp Access
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white headline-balance">
                Let’s Build Something Great Together.
              </h2>
              <p className="text-sm sm:text-lg text-indigo-100/95 leading-relaxed">
                Whether you’re starting a new business or looking to grow an
                existing one, ZENVEXA is ready to help you take the next step.
              </p>
            </div>

            <div className="shrink-0">
              <a
                href={buildWhatsAppUrl(
                  'Hello ZENVEXA Digital Agency! I would like to claim a Free Consultation to discuss growing my business.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 text-sm sm:text-base font-bold text-[#0B0F19] bg-white hover:bg-[#F5F3FF] rounded-xl shadow-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <MessageCircle className="w-5 h-5 text-[#6A35FF] shrink-0" />
                <span>Get a Free Consultation</span>
                <ArrowUpRight className="w-4 h-4 shrink-0" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
