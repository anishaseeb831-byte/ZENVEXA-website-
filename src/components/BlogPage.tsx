import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Sparkles,
  BookOpen,
  Clock,
  Calendar,
  Tag,
  ArrowUpRight,
  MessageCircle,
} from 'lucide-react';
import { BLOG_ARTICLES, BlogArticle } from '../data/blogData';
import { RoutePath, buildWhatsAppUrl } from '../data/agencyData';
import { Breadcrumbs } from './Breadcrumbs';
import { AGENCY_IMAGES } from '../data/agencyImages';

interface BlogPageProps {
  onNavigate: (path: RoutePath) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Strategy & Paid Media',
    'Website Development',
    'Local SEO & Maps',
    'Social Media',
    'Branding & Design',
    'Growth Architecture',
  ];

  const filteredArticles = BLOG_ARTICLES.filter((a) => {
    if (selectedCategory === 'All') return true;
    return a.category === selectedCategory;
  });

  const featuredArticle = BLOG_ARTICLES[0];

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[{ label: 'Blog & Insights' }]}
        onNavigate={onNavigate}
        subtitle="Practical Marketing, SEO & Web Growth Playbooks"
      />

      {/* Hero Banner with Bespoke Editorial Visual */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-16 lg:pb-20 bg-gradient-to-b from-[#F8F7FF] via-[#FAF9FE] to-white border-b border-indigo-100/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-indigo-100 text-xs font-bold text-[#6A35FF] shadow-2xs">
                <BookOpen className="w-3.5 h-3.5" />
                <span>ZENVEXA Strategic Knowledge Hub</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0B0F19] leading-tight headline-balance">
                Digital Marketing &amp;{' '}
                <span className="text-brand-gradient">Growth Insights.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                Actionable playbooks, strategic frameworks, and practical breakdowns from the ZENVEXA team to help founders and operators scale their digital presence.
              </p>

              <div className="flex flex-wrap items-center gap-6 pt-2 text-xs sm:text-sm text-slate-700">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#6A35FF]" />
                  <span className="font-semibold">Conversion Architecture</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#3B82F6]" />
                  <span className="font-semibold">Paid Traffic Systems</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                  <span className="font-semibold">Search Engine Authority</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl overflow-hidden shadow-2xl shadow-indigo-950/10 border border-indigo-100/90 group">
                <img
                  src={AGENCY_IMAGES.blogHero}
                  alt="ZENVEXA Marketing Knowledge & Playbooks"
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19]/80 via-transparent to-transparent" />

                {/* Floating Glassmorphism Badge */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white/40 shadow-lg text-xs space-y-1">
                  <div className="flex items-center justify-between text-[#0B0F19] font-extrabold">
                    <span>Field-Tested Playbooks</span>
                    <span className="text-[#6A35FF]">Zero Fluff</span>
                  </div>
                  <p className="text-slate-600 text-[11px]">
                    Written directly by agency practitioners executing campaigns every day.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Featured Spotlight Card */}
          {selectedCategory === 'All' && featuredArticle && (
            <div
              onClick={() => onNavigate(`/blog/${featuredArticle.slug}` as RoutePath)}
              className="group bg-gradient-to-br from-[#F8F7FF] via-[#FAF9FE] to-[#EEF0FF] rounded-3xl p-8 sm:p-10 border border-indigo-100 shadow-sm hover:shadow-xl hover:border-indigo-300 transition-all cursor-pointer grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-8 space-y-4">
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                  <span className="font-bold text-[#6A35FF]">{featuredArticle.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{featuredArticle.readTime}</span>
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{featuredArticle.publishDate}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B0F19] group-hover:text-[#6A35FF] transition-colors leading-tight">
                  {featuredArticle.title}
                </h2>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
                  {featuredArticle.excerpt}
                </p>

                <div className="pt-2 flex items-center gap-3 text-xs font-semibold text-slate-700">
                  <span>Author: {featuredArticle.author.name} ({featuredArticle.author.role})</span>
                </div>
              </div>

              <div className="lg:col-span-4 flex lg:justify-end">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-brand-gradient rounded-xl shadow-md group-hover:opacity-95 transition-opacity"
                >
                  <span>Read Full Guide</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Category Filter Bar */}
          <div className="overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="inline-flex items-center gap-1.5 p-1.5 bg-[#F5F3FF] rounded-2xl border border-indigo-100">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-xl whitespace-nowrap transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-brand-gradient text-white font-semibold shadow-xs'
                        : 'text-slate-600 hover:text-[#0B0F19]'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredArticles.map((article, idx) => (
              <motion.article
                key={article.slug}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: (idx % 3) * 0.04 }}
                onClick={() => onNavigate(`/blog/${article.slug}` as RoutePath)}
                className="group bg-[#FAF9FE] hover:bg-white rounded-3xl p-7 border border-indigo-100/90 hover:border-indigo-300 shadow-2xs hover:shadow-xl hover:shadow-indigo-950/8 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between cursor-pointer"
              >
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span className="font-bold text-[#6A35FF]">{article.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{article.readTime}</span>
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#0B0F19] group-hover:text-[#6A35FF] transition-colors leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {article.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-medium text-slate-500 bg-white px-2 py-0.5 rounded-md border border-indigo-100/60"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-indigo-100/70 flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-500">{article.author.name}</span>
                  <span className="inline-flex items-center gap-1 text-[#6A35FF] font-bold group-hover:translate-x-0.5 transition-transform">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Strategy Newsletter / Inquiry CTA */}
      <section className="py-20 bg-[#FAF9FE] border-t border-indigo-100/70">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-indigo-100 shadow-sm text-center space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-brand-gradient text-white flex items-center justify-center mx-auto shadow-md">
              <Sparkles className="w-6 h-6" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B0F19]">
              Want ZENVEXA to Implement These Strategies for Your Brand?
            </h2>

            <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-600 leading-relaxed">
              We turn these growth playbooks into execution every day. Connect directly with our team to explore custom marketing, SEO, branding, or website solutions.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => onNavigate('/contact')}
                className="px-6 py-3 text-sm font-semibold text-white bg-brand-gradient rounded-xl shadow-md cursor-pointer"
              >
                Schedule a Consultation
              </button>
              <a
                href={buildWhatsAppUrl(
                  'Hello ZENVEXA! I was reading your blog and would like to consult on implementing these strategies for my business.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-[#0B0F19] bg-[#F5F3FF] hover:bg-indigo-100 rounded-xl transition-colors cursor-pointer"
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
