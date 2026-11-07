import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  MessageCircle,
  ShieldCheck,
} from 'lucide-react';
import {
  COMPANY_INFO,
  FOOTER_QUICK_LINKS,
  SERVICES_DATA,
  RoutePath,
  buildWhatsAppUrl,
  buildAwaisWhatsAppUrl,
  buildPhoneCallUrl,
  buildMailtoUrl,
} from '../data/agencyData';

interface FooterProps {
  onNavigate: (path: RoutePath) => void;
  onSelectService: (serviceTitle: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onSelectService,
}) => {
  const [quickGoal, setQuickGoal] = useState('');

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    path: RoutePath
  ) => {
    e.preventDefault();
    onNavigate(path);
  };

  const quickWhatsAppHref = buildWhatsAppUrl(
    quickGoal.trim()
      ? `Hello ZENVEXA Digital Agency! Here is what I am looking to build or grow: ${quickGoal.trim()}`
      : undefined
  );

  return (
    <footer className="bg-[#0B0D17] text-slate-300 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Column 1: Official ZENVEXA Brand, Tagline & Circular Social Icons */}
          <div className="lg:col-span-3 space-y-5">
            <a
              href="/"
              onClick={(e) => handleLinkClick(e, '/')}
              className="inline-flex items-center gap-3 bg-white rounded-2xl p-2 pr-4 shadow-md focus-visible:outline-2 focus-visible:outline-indigo-400"
              aria-label="ZENVEXA Digital Agency Home"
            >
              <img
                src={COMPANY_INFO.logoPath}
                alt="ZENVEXA Digital Agency Logo"
                referrerPolicy="no-referrer"
                className="h-11 w-11 rounded-xl object-cover shrink-0"
              />
              <div>
                <div className="text-base font-extrabold tracking-tight text-[#0B0F19] leading-none">
                  ZENVEXA
                </div>
                <div className="text-[11px] font-semibold text-[#6A35FF] mt-1">
                  Digital Growth Partner
                </div>
              </div>
            </a>

            <p className="text-sm font-semibold text-white">
              “{COMPANY_INFO.tagline}”
            </p>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {COMPANY_INFO.description}
            </p>

            {/* Circular Social & Channel Icons (Markito Dark Footer Style) */}
            <div className="pt-1 flex items-center gap-2.5">
              <a
                href={COMPANY_INFO.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/8 hover:bg-[#6A35FF] text-slate-200 hover:text-white flex items-center justify-center transition-colors"
                aria-label="ZENVEXA on Facebook"
                title="Facebook"
              >
                <svg
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H8v3h2.5V21h3z" />
                </svg>
              </a>

              <a
                href={COMPANY_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/8 hover:bg-[#6A35FF] text-slate-200 hover:text-white flex items-center justify-center transition-colors"
                aria-label="ZENVEXA on Instagram"
                title="Instagram"
              >
                <svg
                  className="w-4 h-4 fill-none stroke-current"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>

              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/8 hover:bg-[#6A35FF] text-slate-200 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Chat on WhatsApp"
                title="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              <a
                href={buildMailtoUrl()}
                className="w-9 h-9 rounded-full bg-white/8 hover:bg-[#6A35FF] text-slate-200 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Email ZENVEXA"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-sm font-bold text-white">Quick Links</h3>
            <ul className="space-y-2.5 text-sm">
              {FOOTER_QUICK_LINKS.map((item) => (
                <li key={item.path}>
                  <a
                    href={item.path}
                    onClick={(e) => handleLinkClick(e, item.path)}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Our Services */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-sm font-bold text-white">Our Services</h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              {SERVICES_DATA.map((service) => (
                <li key={service.id}>
                  <a
                    href={`/services/${service.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(`/services/${service.slug}` as RoutePath);
                    }}
                    className="block text-left text-slate-400 hover:text-white transition-colors"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Get In Touch + Direct WhatsApp Quote Starter */}
          <div className="lg:col-span-4 space-y-6">
            <div className="space-y-3.5">
              <h3 className="text-sm font-bold text-white">Get In Touch</h3>
              <ul className="space-y-3.5 text-sm text-slate-400">
                {/* Anis Contact */}
                <li className="space-y-1">
                  <div className="text-xs text-slate-400 font-semibold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#6A35FF]" />
                    <span>Founder ({COMPANY_INFO.founder}):</span>
                  </div>
                  <div className="flex items-center gap-3 pl-3">
                    <a
                      href={buildWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-200 hover:text-[#38BDF8] font-mono text-xs transition-colors flex items-center gap-1"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{COMPANY_INFO.founderWhatsappDisplay}</span>
                    </a>
                    <span className="text-slate-600">·</span>
                    <a
                      href={buildPhoneCallUrl(COMPANY_INFO.founderPhone)}
                      className="text-slate-400 hover:text-white text-xs transition-colors"
                    >
                      Call
                    </a>
                  </div>
                </li>

                {/* Awais Contact */}
                <li className="space-y-1">
                  <div className="text-xs text-slate-400 font-semibold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
                    <span>Representative ({COMPANY_INFO.representative}):</span>
                  </div>
                  <div className="flex items-center gap-3 pl-3">
                    <a
                      href={buildAwaisWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-200 hover:text-[#38BDF8] font-mono text-xs transition-colors flex items-center gap-1"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{COMPANY_INFO.representativeWhatsappDisplay}</span>
                    </a>
                    <span className="text-slate-600">·</span>
                    <a
                      href={buildPhoneCallUrl(COMPANY_INFO.representativePhone)}
                      className="text-slate-400 hover:text-white text-xs transition-colors"
                    >
                      Call
                    </a>
                  </div>
                </li>

                <li className="flex items-center gap-2.5 pt-1">
                  <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                  <a
                    href={buildMailtoUrl()}
                    className="text-slate-200 hover:text-white font-medium transition-colors break-all"
                  >
                    {COMPANY_INFO.email}
                  </a>
                </li>
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" />
                  <span className="text-slate-300">
                    {COMPANY_INFO.location} · Serving Pakistan, US &amp; Global Clients
                  </span>
                </li>
              </ul>
            </div>

            {/* Functional Quick WhatsApp Project Starter (Markito-Style Footer Input + Purple CTA) */}
            <div className="pt-4 border-t border-white/10 space-y-2.5">
              <div className="text-xs font-bold text-white">
                Start a Quick Consultation
              </div>
              <p className="text-xs text-slate-400">
                Enter your business name or goal to launch a direct WhatsApp
                quote chat.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={quickGoal}
                  onChange={(e) => setQuickGoal(e.target.value)}
                  placeholder="Your business or service needed..."
                  aria-label="Your business name or project goal"
                  className="flex-1 min-w-0 px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#6A35FF]"
                />
                <a
                  href={quickWhatsAppHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-brand-gradient bg-brand-gradient-hover rounded-xl transition-all whitespace-nowrap shrink-0"
                >
                  <span>Start Chat</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar with Dedicated Admin Link */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} {COMPANY_INFO.name}. All rights
            reserved.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <span className="text-slate-400 hidden sm:inline">{COMPANY_INFO.tagline}</span>
            <span className="text-slate-700 hidden sm:inline">·</span>
            <a
              href="/admin"
              onClick={(e) => handleLinkClick(e, '/admin')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 hover:border-indigo-400/40 transition-all font-semibold"
              title="Single Slot Administrator Panel"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#6A35FF]" />
              <span>Admin Sign-Up / Login</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
