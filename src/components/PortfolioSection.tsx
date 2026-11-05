import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, X, Check, FolderKanban } from 'lucide-react';
import {
  collection,
  query,
  where,
  onSnapshot,
  Timestamp,
} from 'firebase/firestore';
import {
  PORTFOLIO_CATEGORIES,
  PORTFOLIO_ITEMS,
  PortfolioCategory,
  PortfolioItem,
  ConceptVisualKey,
} from '../data/portfolioData';
import { RoutePath } from '../data/agencyData';
import { PortfolioPreviewVisual } from './VisualCompositions';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { useFirebase } from '../context/FirebaseContext';

import { Breadcrumbs } from './Breadcrumbs';
import { AGENCY_IMAGES } from '../data/agencyImages';

interface PortfolioSectionProps {
  isStandalonePage?: boolean;
  onRequestSimilarProject: (serviceTitle: string, projectTitle: string) => void;
  onNavigate?: (path: RoutePath) => void;
}

interface PublishedPortfolioDoc {
  title: string;
  category: Exclude<PortfolioCategory, 'All'>;
  statusLabel: 'Client Project' | 'Agency Concept Showcase';
  shortDescription: string;
  detailedOverview: string;
  deliverables: string[];
  toolsAndApproach: string[];
  imageUrl: string;
  relatedService: string;
  visibility: 'published' | 'draft';
  createdAt?: Timestamp | null;
}

function mapCategoryToVisualKey(
  category: Exclude<PortfolioCategory, 'All'>
): ConceptVisualKey {
  switch (category) {
    case 'Website Development':
      return 'web-corporate';
    case 'Social Media Designs':
      return 'social-grid';
    case 'Branding & Logo Design':
      return 'brand-identity';
    case 'Marketing Campaigns':
      return 'campaign-funnel';
    case 'Advertising Creatives':
      return 'ad-creatives';
  }
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  isStandalonePage = false,
  onRequestSimilarProject,
  onNavigate,
}) => {
  const { isAdmin } = useFirebase();
  const [activeCategory, setActiveCategory] =
    useState<PortfolioCategory>('All');
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(
    null
  );
  const [cloudProjects, setCloudProjects] = useState<PortfolioItem[]>([]);

  const HeadingTag = isStandalonePage ? 'h1' : 'h2';

  useEffect(() => {
    const publishedQuery = query(
      collection(db, 'portfolioProjects'),
      where('visibility', '==', 'published')
    );

    const unsubscribe = onSnapshot(
      publishedQuery,
      (snapshot) => {
        const mapped = snapshot.docs
          .map((d) => {
            const data = d.data() as PublishedPortfolioDoc;
            return {
              createdMillis: data.createdAt?.toMillis?.() ?? 0,
              item: {
                id: d.id,
                title: data.title,
                category: data.category,
                statusLabel: data.statusLabel,
                shortDescription: data.shortDescription,
                detailedOverview: data.detailedOverview,
                deliverables: Array.isArray(data.deliverables)
                  ? data.deliverables
                  : [],
                toolsAndApproach: Array.isArray(data.toolsAndApproach)
                  ? data.toolsAndApproach
                  : [],
                imageUrl: data.imageUrl || '',
                imageAlt: `${data.title} — ZENVEXA ${data.category} ${data.statusLabel}`,
                visualKey: mapCategoryToVisualKey(data.category),
                relatedService: data.relatedService || data.category,
              } satisfies PortfolioItem,
            };
          })
          .sort((a, b) => b.createdMillis - a.createdMillis)
          .map((entry) => entry.item);

        setCloudProjects(mapped);
      },
      (err) => {
        try {
          handleFirestoreError(err, OperationType.LIST, 'portfolioProjects');
        } catch {
          // Graceful degradation: preserve built-in ZENVEXA concept showcases
        }
      }
    );

    return () => unsubscribe();
  }, []);

  const combinedItems = useMemo(
    () => [...cloudProjects, ...PORTFOLIO_ITEMS],
    [cloudProjects]
  );

  const filteredItems =
    activeCategory === 'All'
      ? combinedItems
      : combinedItems.filter((item) => item.category === activeCategory);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    if (selectedProject) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedProject]);

  return (
    <div className={isStandalonePage ? 'bg-white min-h-screen' : ''}>
      {isStandalonePage && onNavigate && (
        <Breadcrumbs
          items={[{ label: 'Portfolio' }]}
          onNavigate={onNavigate}
          subtitle="Creative Work & Capability Showcases"
        />
      )}

      {/* Standalone Hero Banner with AI Visual if on standalone page */}
      {isStandalonePage && (
        <section className="relative overflow-hidden pt-12 pb-16 lg:pt-16 lg:pb-20 bg-gradient-to-b from-[#F8F7FF] via-[#FAF9FE] to-white border-b border-indigo-100/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-indigo-100 text-xs font-bold text-[#6A35FF] shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-[#6A35FF] animate-pulse" />
                  <span>Curated Portfolio &amp; Capability Proofs</span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0B0F19] leading-tight headline-balance">
                  Creative Work.{' '}
                  <span className="text-brand-gradient">Real Possibilities.</span>
                </h1>

                <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                  Explore ZENVEXA’s visual design, high-converting website architecture, branding systems, and data-driven marketing campaign concepts across key digital disciplines.
                </p>

                <div className="flex flex-wrap items-center gap-6 pt-2 text-xs sm:text-sm text-slate-700">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#6A35FF] shrink-0" />
                    <span className="font-semibold">Web Development &amp; CRO</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#6A35FF] shrink-0" />
                    <span className="font-semibold">Meta &amp; Paid Ad Creatives</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#6A35FF] shrink-0" />
                    <span className="font-semibold">Brand Identity Systems</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 relative">
                <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl overflow-hidden shadow-2xl shadow-indigo-950/10 border border-indigo-100/90 group">
                  <img
                    src={AGENCY_IMAGES.portfolioHero}
                    alt="ZENVEXA Portfolio and Digital Growth Showcases"
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="eager"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19]/80 via-transparent to-transparent" />

                  {/* Glassmorphic floating card */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white/40 shadow-lg text-xs space-y-1">
                    <div className="flex items-center justify-between text-[#0B0F19] font-extrabold">
                      <span>Bespoke Engineering &amp; Design</span>
                      <span className="text-[#6A35FF]">100% Custom</span>
                    </div>
                    <p className="text-slate-600 text-[11px]">
                      Concept frameworks ready to be tailored to your brand's unique market position.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Portfolio Section */}
      <section
        id="portfolio"
        className={`py-16 lg:py-20 ${
          isStandalonePage ? 'bg-white' : 'bg-white border-b border-slate-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header (Homepage only, as standalone has the rich hero above) */}
          {!isStandalonePage && (
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3">
                  <span className="text-xs sm:text-sm font-bold text-[#6A35FF]">
                    Our Portfolio · Capability Showcases
                  </span>
                  <span
                    className="h-0.5 w-10 bg-gradient-to-r from-[#6A35FF] to-[#3B82F6] rounded-full"
                    aria-hidden="true"
                  />
                </div>
                <HeadingTag className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0B0F19] headline-balance">
                  Creative Work.{' '}
                  <span className="text-brand-gradient">Real Possibilities.</span>
                </HeadingTag>
                <p className="mt-3 text-base text-slate-600 leading-relaxed">
                  Explore ZENVEXA’s visual design, website architecture, branding,
                  and campaign capability concepts across key digital disciplines.
                </p>
              </div>

              {isAdmin && onNavigate && (
                <button
                  type="button"
                  onClick={() => onNavigate('/portal')}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#6A35FF] bg-[#F5F3FF] hover:bg-indigo-100 rounded-xl transition-colors shrink-0 cursor-pointer"
                >
                  <FolderKanban className="w-4 h-4" />
                  <span>Manage Portfolio in Console</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}

          {/* Interactive Category Segmented Filter Bar */}
          <div className="mt-4 sm:mt-6 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
            <div
              className="inline-flex items-center gap-1 p-1.5 bg-[#F5F3FF] rounded-2xl border border-indigo-100"
              role="tablist"
              aria-label="Filter portfolio by category"
            >
              {PORTFOLIO_CATEGORIES.map((category) => {
                const isSelected = activeCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-xl transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                      isSelected
                        ? 'bg-brand-gradient text-white font-semibold shadow-sm'
                        : 'text-slate-600 hover:text-[#0B0F19]'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

        {/* Modern Visual Portfolio Cards Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredItems.map((item) => (
            <motion.article
              key={item.id}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setSelectedProject(item)}
              className="group bg-white rounded-3xl border border-indigo-100/90 overflow-hidden shadow-xs hover:shadow-xl hover:shadow-indigo-950/8 hover:border-indigo-300 transition-all duration-200 flex flex-col justify-between cursor-pointer"
            >
              <div>
                {/* Large Rounded Visual Preview Slot */}
                <div className="aspect-[16/10] w-full overflow-hidden">
                  <PortfolioPreviewVisual item={item} />
                </div>

                {/* Card Copy & Category Label */}
                <div className="p-6">
                  <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 mb-2">
                    <span className="font-bold text-[#6A35FF]">
                      {item.category}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{item.statusLabel}</span>
                  </div>

                  <h3 className="text-lg font-extrabold text-[#0B0F19] leading-snug group-hover:text-[#553BF6] transition-colors">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {item.shortDescription}
                  </p>
                </div>
              </div>

              {/* Card Action Footer with Markito-Style Circular Arrow Button */}
              <div className="px-6 pb-6 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                <span className="text-xs font-medium text-slate-500">
                  {item.toolsAndApproach.join(' · ')}
                </span>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProject(item);
                  }}
                  aria-label={`View project details for ${item.title}`}
                  className="w-9 h-9 rounded-full bg-[#F3F0FF] group-hover:bg-[#6A35FF] text-[#6A35FF] group-hover:text-white flex items-center justify-center transition-colors shrink-0 cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Accessible Project Detail Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#080B14]/75 backdrop-blur-xs"
          onClick={() => setSelectedProject(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="portfolio-modal-title"
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-indigo-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Visual Banner */}
            <div className="relative aspect-[16/9] w-full overflow-hidden">
              <PortfolioPreviewVisual item={selectedProject} />
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#0B0F19]/85 hover:bg-[#0B0F19] text-white flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-white"
                aria-label="Close project details"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-2">
                  <span className="font-bold text-[#6A35FF]">
                    {selectedProject.category}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedProject.statusLabel}</span>
                </div>
                <h3
                  id="portfolio-modal-title"
                  className="text-2xl font-extrabold text-[#0B0F19]"
                >
                  {selectedProject.title}
                </h3>
                <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                  {selectedProject.detailedOverview}
                </p>
              </div>

              <div className="pt-5 border-t border-slate-200/80">
                <h4 className="text-sm font-bold text-[#0B0F19] mb-3">
                  Key Capability Deliverables
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedProject.deliverables.map((deliverable) => (
                    <li
                      key={deliverable}
                      className="flex items-start gap-2 text-xs sm:text-sm text-slate-700"
                    >
                      <Check className="w-4 h-4 text-[#6A35FF] mt-0.5 shrink-0" />
                      <span>{deliverable}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-5 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-4">
                <div className="text-xs text-slate-500">
                  {selectedProject.toolsAndApproach.join(' · ')}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const project = selectedProject;
                    setSelectedProject(null);
                    onRequestSimilarProject(
                      project.relatedService,
                      project.title
                    );
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-brand-gradient bg-brand-gradient-hover rounded-xl shadow-md shadow-indigo-500/20 transition-all whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Request Similar Solution</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
    </div>
  );
};
