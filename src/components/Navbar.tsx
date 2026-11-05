import React, { useState, useEffect, useRef } from 'react';
import {
  Menu,
  X,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Share2,
  Megaphone,
  Search,
  Globe,
  Palette,
  Mail,
  MapPin,
  Compass,
  LineChart,
  MessageCircle,
} from 'lucide-react';
import {
  COMPANY_INFO,
  NAV_ITEMS,
  SERVICES_DATA,
  RoutePath,
  ServiceIconKey,
  buildWhatsAppUrl,
} from '../data/agencyData';
import { useFirebase } from '../context/FirebaseContext';

interface NavbarProps {
  currentPath: RoutePath;
  onNavigate: (path: RoutePath) => void;
  onGetQuote: () => void;
}

function getServiceIcon(iconKey: ServiceIconKey) {
  switch (iconKey) {
    case 'search':
      return Search;
    case 'share':
      return Share2;
    case 'megaphone':
      return Megaphone;
    case 'globe':
      return Globe;
    case 'palette':
      return Palette;
    case 'mail':
      return Mail;
    case 'mapPin':
      return MapPin;
    case 'compass':
      return Compass;
    case 'lineChart':
      return LineChart;
  }
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPath,
  onNavigate,
  onGetQuote,
}) => {
  const { isAdmin } = useFirebase();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const megaMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setMegaMenuOpen(false);
  }, [currentPath]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    path: RoutePath
  ) => {
    e.preventDefault();
    onNavigate(path);
    setMobileMenuOpen(false);
    setMegaMenuOpen(false);
  };

  const isItemActive = (itemPath: string) => {
    if (itemPath === '/') return currentPath === '/';
    if (itemPath === '/services') return currentPath.startsWith('/services');
    if (itemPath === '/blog') return currentPath.startsWith('/blog');
    if (itemPath === '/about') return currentPath === '/about' || currentPath === '/team';
    return currentPath === itemPath;
  };

  const handleMouseEnterServices = () => {
    if (megaMenuTimeoutRef.current) clearTimeout(megaMenuTimeoutRef.current);
    setMegaMenuOpen(true);
  };

  const handleMouseLeaveServices = () => {
    megaMenuTimeoutRef.current = setTimeout(() => {
      setMegaMenuOpen(false);
    }, 180);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-150 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-indigo-100/90 shadow-xs'
          : 'bg-white border-b border-slate-100/80'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Official ZENVEXA Logo & Single-Line Wordmark */}
        <a
          href="/"
          onClick={(e) => handleNavClick(e, '/')}
          className="flex items-center gap-2.5 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6A35FF] rounded-lg"
          aria-label="ZENVEXA Digital Agency Home"
        >
          <img
            src={COMPANY_INFO.logoPath}
            alt="ZENVEXA Digital Agency Logo"
            referrerPolicy="no-referrer"
            className="h-10 w-10 rounded-xl object-cover bg-white border border-indigo-100 shadow-2xs shrink-0"
          />
          <span className="text-lg font-extrabold tracking-tight text-[#0B0F19] whitespace-nowrap">
            ZENVEXA
          </span>
        </a>

        {/* Zone 2: Clean Single-Line Navigation Links with Services Mega Menu */}
        <nav
          className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600"
          aria-label="Primary Navigation"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = isItemActive(item.path);

            if (item.path === '/services') {
              return (
                <div
                  key={item.path}
                  className="relative py-4"
                  onMouseEnter={handleMouseEnterServices}
                  onMouseLeave={handleMouseLeaveServices}
                >
                  <a
                    href={item.path}
                    onClick={(e) => handleNavClick(e, item.path)}
                    className={`inline-flex items-center gap-1 transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6A35FF] rounded-xs ${
                      isActive
                        ? 'text-[#6A35FF] font-semibold'
                        : 'hover:text-[#0B0F19]'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        megaMenuOpen ? 'rotate-180 text-[#6A35FF]' : 'text-slate-400'
                      }`}
                    />
                  </a>

                  {/* Desktop Services Mega Menu Flyout */}
                  {megaMenuOpen && (
                    <div
                      className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-[820px] max-w-[90vw] z-50 animate-in fade-in-0 zoom-in-95 duration-150"
                      role="menu"
                      aria-label="ZENVEXA Services Directory"
                    >
                      <div className="bg-white/98 backdrop-blur-xl rounded-3xl p-6 border border-indigo-100 shadow-2xl shadow-indigo-950/15 overflow-hidden">
                        <div className="flex items-center justify-between pb-4 mb-4 border-b border-indigo-50">
                          <div>
                            <div className="text-xs font-bold text-[#6A35FF] uppercase tracking-wider">
                              Our Capabilities
                            </div>
                            <div className="text-sm font-bold text-[#0B0F19]">
                              Complete Digital Marketing &amp; Web Solutions
                            </div>
                          </div>
                          <a
                            href="/services"
                            onClick={(e) => handleNavClick(e, '/services')}
                            className="inline-flex items-center gap-1 text-xs font-bold text-[#6A35FF] hover:text-[#0B0F19] transition-colors"
                          >
                            <span>Explore All 9 Capabilities</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </a>
                        </div>

                        {/* 3-Column Services Directory */}
                        <div className="grid grid-cols-3 gap-4">
                          {SERVICES_DATA.map((service) => {
                            const IconComponent = getServiceIcon(service.iconKey);
                            return (
                              <a
                                key={service.id}
                                href={`/services/${service.slug}`}
                                onClick={(e) =>
                                  handleNavClick(
                                    e,
                                    `/services/${service.slug}` as RoutePath
                                  )
                                }
                                className="group p-3 rounded-2xl hover:bg-[#F8F7FF] border border-transparent hover:border-indigo-100 transition-all flex items-start gap-3"
                              >
                                <div
                                  className={`w-9 h-9 rounded-xl bg-gradient-to-br ${service.iconGradient} text-white flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform`}
                                >
                                  <IconComponent className="w-4 h-4" />
                                </div>
                                <div className="space-y-0.5 min-w-0">
                                  <div className="text-xs font-bold text-[#0B0F19] group-hover:text-[#6A35FF] transition-colors truncate">
                                    {service.title}
                                  </div>
                                  <div className="text-[11px] text-slate-500 line-clamp-1 leading-tight">
                                    {service.strategicFocus || service.description}
                                  </div>
                                  <div className="text-[10px] font-semibold text-[#6A35FF] pt-0.5">
                                    {typeof service.startingPrice === 'number'
                                      ? `From $${service.startingPrice}/${service.billingType}`
                                      : 'Custom Quote'}
                                  </div>
                                </div>
                              </a>
                            );
                          })}
                        </div>

                        {/* Mega Menu Footer Banner */}
                        <div className="mt-4 pt-3.5 border-t border-indigo-50 flex items-center justify-between text-xs text-slate-500 bg-[#FAF9FE] -mx-6 -mb-6 px-6 py-3">
                          <span className="font-medium">
                            Need a custom multi-channel strategy?
                          </span>
                          <a
                            href={buildWhatsAppUrl(
                              'Hello ZENVEXA! I would like to consult on a custom digital growth plan for my business.'
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 font-bold text-[#6A35FF] hover:text-[#0B0F19] transition-colors"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>Chat Directly on WhatsApp</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <a
                key={item.path}
                href={item.path}
                onClick={(e) => handleNavClick(e, item.path)}
                className={`relative py-1 transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6A35FF] rounded-xs ${
                  isActive
                    ? 'text-[#6A35FF] font-semibold after:content-[""] after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-0.5 after:bg-[#6A35FF] after:rounded-full'
                    : 'hover:text-[#0B0F19]'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Prominent Purple Gradient "Get a Free Quote" CTA + Mobile Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onGetQuote}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-brand-gradient bg-brand-gradient-hover rounded-xl shadow-md shadow-indigo-500/20 hover:shadow-lg transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6A35FF]"
          >
            <span>Get a Free Quote</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-xl text-slate-700 hover:text-[#0B0F19] hover:bg-[#F5F3FF] transition-colors focus-visible:outline-2 focus-visible:outline-[#6A35FF] cursor-pointer"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={
              mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'
            }
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Responsive Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="lg:hidden bg-white border-b border-indigo-100 shadow-xl max-h-[85vh] overflow-y-auto"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive = isItemActive(item.path);

              if (item.path === '/services') {
                return (
                  <div key={item.path} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <a
                        href="/services"
                        onClick={(e) => handleNavClick(e, '/services')}
                        className={`flex-1 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                          isActive
                            ? 'bg-[#F5F3FF] text-[#6A35FF] font-semibold'
                            : 'text-slate-700 hover:bg-slate-50 hover:text-[#0B0F19]'
                        }`}
                      >
                        <span>Services</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => setMobileServicesOpen((prev) => !prev)}
                        className="p-2.5 text-slate-500 hover:text-[#6A35FF] cursor-pointer"
                        aria-label="Expand services submenu"
                      >
                        {mobileServicesOpen ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    {mobileServicesOpen && (
                      <div className="pl-4 pr-1 py-1 space-y-1 border-l-2 border-indigo-100 ml-3">
                        {SERVICES_DATA.map((service) => (
                          <a
                            key={service.id}
                            href={`/services/${service.slug}`}
                            onClick={(e) =>
                              handleNavClick(
                                e,
                                `/services/${service.slug}` as RoutePath
                              )
                            }
                            className="block px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:text-[#6A35FF] hover:bg-[#FAF9FE] transition-colors"
                          >
                            {service.title}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <a
                  key={item.path}
                  href={item.path}
                  onClick={(e) => handleNavClick(e, item.path)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#F5F3FF] text-[#6A35FF] font-semibold'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-[#0B0F19]'
                  }`}
                >
                  <span>{item.label}</span>
                </a>
              );
            })}

            <a
              href="/team"
              onClick={(e) => handleNavClick(e, '/team')}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                currentPath === '/team'
                  ? 'bg-[#F5F3FF] text-[#6A35FF] font-semibold'
                  : 'text-slate-700 hover:bg-slate-50 hover:text-[#0B0F19]'
              }`}
            >
              <span>Our Team</span>
            </a>

            <a
              href="/portal"
              onClick={(e) => handleNavClick(e, '/portal')}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                currentPath === '/portal'
                  ? 'bg-[#F5F3FF] text-[#6A35FF] font-semibold'
                  : 'text-slate-700 hover:bg-slate-50 hover:text-[#0B0F19]'
              }`}
            >
              <span>{isAdmin ? 'Agency Admin Console' : 'Client Portal'}</span>
              <ShieldCheck className="w-4 h-4 text-[#6A35FF]" />
            </a>

            <div className="pt-3 mt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onGetQuote();
                }}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-brand-gradient bg-brand-gradient-hover rounded-xl shadow-md shadow-indigo-500/20 transition-all whitespace-nowrap cursor-pointer"
              >
                <span>Get a Free Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
