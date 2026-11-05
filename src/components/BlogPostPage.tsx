import React, { useState } from 'react';
import {
  Clock,
  Calendar,
  Share2,
  Check,
  Copy,
  ArrowRight,
  Sparkles,
  MessageCircle,
  Tag,
  BookOpen,
  ArrowLeft,
} from 'lucide-react';
import { BlogArticle, BLOG_ARTICLES, getBlogArticleBySlug } from '../data/blogData';
import { RoutePath, buildWhatsAppUrl, buildMailtoUrl } from '../data/agencyData';
import { Breadcrumbs } from './Breadcrumbs';

interface BlogPostPageProps {
  article: BlogArticle;
  onNavigate: (path: RoutePath) => void;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({
  article,
  onNavigate,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  const relatedArticles = article.relatedSlugs
    .map((slug) => getBlogArticleBySlug(slug))
    .filter((a): a is BlogArticle => Boolean(a));

  const directWhatsAppUrl = buildWhatsAppUrl(
    `Hello ZENVEXA! I was reading your article "${article.title}" and would like to discuss implementing these strategies for my brand.`
  );

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Blog', path: '/blog' },
          { label: article.title },
        ]}
        onNavigate={onNavigate}
        subtitle={article.category}
      />

      {/* Article Header & Title */}
      <header className="pt-12 pb-16 lg:pt-16 lg:pb-20 bg-gradient-to-b from-[#F8F7FF] via-[#FAF9FE] to-white border-b border-indigo-100/70">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => onNavigate('/blog')}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-500 hover:text-[#6A35FF] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Articles</span>
            </button>

            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-indigo-100 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#6A35FF]" />
                  <span>Link Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Share Article</span>
                </>
              )}
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span className="font-bold text-[#6A35FF]">{article.category}</span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{article.readTime}</span>
            </span>
            <span aria-hidden="true">·</span>
            <span>{article.publishDate}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B0F19] tracking-tight leading-tight headline-balance">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {article.subtitle}
          </p>

          <div className="pt-4 border-t border-indigo-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand-gradient text-white font-extrabold text-sm flex items-center justify-center shrink-0 shadow-xs">
              {article.author.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="text-sm font-bold text-[#0B0F19]">
                {article.author.name}
              </div>
              <div className="text-xs text-slate-500">
                {article.author.role} · {article.author.organization}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Article Body */}
      <article className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {article.sections.map((section, idx) => (
            <section key={idx} className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B0F19] tracking-tight leading-snug">
                {section.heading}
              </h2>

              <div className="space-y-4 text-base text-slate-700 leading-relaxed">
                {section.paragraphs.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </div>

              {section.bulletPoints && (
                <ul className="mt-4 space-y-2.5 pt-2">
                  {section.bulletPoints.map((pt, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-3 text-sm sm:text-base text-slate-700">
                      <span className="w-2 h-2 rounded-full bg-[#6A35FF] mt-2 shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              )}

              {section.callout && (
                <div className="my-6 p-6 rounded-2xl bg-[#FAF9FE] border border-indigo-200/80 space-y-2 shadow-2xs">
                  <div className="text-xs font-bold text-[#6A35FF] uppercase tracking-wider">
                    {section.callout.title}
                  </div>
                  <p className="text-sm text-[#0B0F19] font-medium leading-relaxed">
                    {section.callout.text}
                  </p>
                </div>
              )}
            </section>
          ))}

          {/* Key Strategic Takeaways Box */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-[#F8F7FF] to-[#EEF0FF] border border-indigo-200 space-y-4 shadow-sm">
            <h3 className="text-lg font-extrabold text-[#0B0F19] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#6A35FF]" />
              <span>Key Strategic Takeaways</span>
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-700">
              {article.keyTakeaways.map((takeaway, tIdx) => (
                <li key={tIdx} className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#6A35FF] mt-0.5 shrink-0" />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tags */}
          <div className="pt-4 flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span className="font-semibold text-slate-700">Tagged:</span>
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-lg bg-[#FAF9FE] border border-indigo-100 font-medium text-slate-700"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Author Bio Card */}
          <div className="p-6 rounded-2xl bg-[#FAF9FE] border border-indigo-100/90 flex flex-col sm:flex-row items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-gradient text-white font-extrabold text-base flex items-center justify-center shrink-0 shadow-xs">
              {article.author.name.slice(0, 2).toUpperCase()}
            </div>
            <div className="space-y-1">
              <div className="text-sm font-bold text-[#0B0F19]">
                Written by {article.author.name}
              </div>
              <div className="text-xs text-[#6A35FF] font-semibold">
                {article.author.role} · {article.author.organization}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pt-1">
                Representing ZENVEXA Digital Agency, helping businesses across Pakistan, the US, and international markets build authority, acquire customers, and scale.
              </p>
            </div>
          </div>
        </div>
      </article>

      {/* Strategic Consultation Callout */}
      <section className="py-20 bg-[#FAF9FE] border-b border-indigo-100/70">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#0B0F19] to-[#1E1B4B] rounded-3xl p-8 sm:p-12 text-white text-center space-y-6 shadow-xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold headline-balance">
              Need Help Applying This Strategy to Your Brand?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
              Every business has unique strengths and growth bottlenecks. Schedule a free growth consultation to explore a customized roadmap for your business.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => onNavigate('/contact')}
                className="px-6 py-3 text-sm font-semibold text-white bg-brand-gradient rounded-xl shadow-md cursor-pointer"
              >
                Get a Free Consultation
              </button>
              <a
                href={directWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-[#0B0F19] bg-white rounded-xl transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-[#6A35FF]" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B0F19]">
                Related Articles
              </h2>
              <button
                type="button"
                onClick={() => onNavigate('/blog')}
                className="text-xs sm:text-sm font-bold text-[#6A35FF] hover:underline"
              >
                View All Articles →
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => (
                <div
                  key={rel.slug}
                  onClick={() => onNavigate(`/blog/${rel.slug}` as RoutePath)}
                  className="bg-[#FAF9FE] rounded-2xl p-6 border border-indigo-100 hover:border-indigo-300 transition-all cursor-pointer flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-[#6A35FF]">{rel.category}</span>
                    <h3 className="text-base font-bold text-[#0B0F19] line-clamp-2">
                      {rel.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2">
                      {rel.excerpt}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-indigo-100/70 flex items-center justify-between text-xs font-bold text-[#6A35FF]">
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
