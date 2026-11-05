import React from 'react';
import { Home, Compass, ArrowRight, MessageCircle } from 'lucide-react';
import { RoutePath, buildWhatsAppUrl } from '../data/agencyData';
import { Breadcrumbs } from './Breadcrumbs';

interface NotFoundPageProps {
  onNavigate: (path: RoutePath) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-white min-h-[70vh] flex flex-col justify-between">
      <Breadcrumbs
        items={[{ label: '404 — Page Not Found' }]}
        onNavigate={onNavigate}
        subtitle="Error 404"
      />

      <div className="max-w-2xl mx-auto px-4 py-20 sm:py-24 text-center space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-[#F5F3FF] text-[#6A35FF] font-black text-2xl flex items-center justify-center mx-auto shadow-sm">
          404
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B0F19] tracking-tight">
          Page Not Found
        </h1>

        <p className="text-base text-slate-600 leading-relaxed max-w-lg mx-auto">
          The page or URL you were looking for doesn't exist, has moved, or the link may be outdated. You can return to our homepage or explore our services below.
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate('/')}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-brand-gradient rounded-xl shadow-md cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('/services')}
            className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-[#0B0F19] bg-[#FAF9FE] hover:bg-slate-100 border border-indigo-100 rounded-xl transition-colors cursor-pointer"
          >
            <Compass className="w-4 h-4 text-[#6A35FF]" />
            <span>Explore Services</span>
          </button>

          <a
            href={buildWhatsAppUrl('Hello ZENVEXA! I was browsing your website and had a question.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-[#0B0F19] bg-white border border-slate-200 rounded-xl"
          >
            <MessageCircle className="w-4 h-4 text-[#6A35FF]" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>

      <div />
    </div>
  );
};
