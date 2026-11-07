/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { getServiceBySlug } from '../data/servicesDetailedData';
import { getBlogArticleBySlug } from '../data/blogData';
import { RoutePath, ROUTE_SEO, COMPANY_INFO } from '../data/agencyData';

export interface RouteMetaProfile {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  type: 'website' | 'article';
  canonicalUrl: string;
  siteName: string;
  // Article-specific metadata for LinkedIn, Facebook, and Twitter
  article?: {
    publishedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
}

/**
 * Mappings of service slugs to dedicated Open Graph preview images (in public/assets/images).
 */
export const SERVICE_OG_IMAGES: Record<string, string> = {
  'seo': '/assets/images/seo_search_growth_1793886211670.jpg',
  'meta-ads': '/assets/images/meta_ads_campaign_1793887125931.jpg',
  'social-media-management': '/assets/images/social_media_meta_ads_1793886212402.jpg',
  'website-development': '/assets/images/web_development_hero_1793886213570.jpg',
  'branding': '/assets/images/branding_design_hero_1793886213919.jpg',
  'email-marketing': '/assets/images/email_marketing_crm_1793887128057.jpg',
  'google-business-profile': '/assets/images/google_business_maps_1793887128022.jpg',
  'local-seo': '/assets/images/local_seo_leads_1793887128174.jpg',
  'marketing-strategy': '/assets/images/marketing_strategy_hub_1793887129772.jpg',
};

/**
 * Mappings of blog article slugs to dedicated Open Graph preview images.
 */
export const BLOG_OG_IMAGES: Record<string, string> = {
  'seo-vs-meta-ads-guide': '/assets/images/meta_ads_campaign_1793887125931.jpg',
  'website-conversion-redesign-tips': '/assets/images/web_development_hero_1793886213570.jpg',
  'local-seo-ranking-factors': '/assets/images/local_seo_leads_1793887128174.jpg',
  'social-media-content-system': '/assets/images/social_media_meta_ads_1793886212402.jpg',
  'brand-identity-roi': '/assets/images/branding_design_hero_1793886213919.jpg',
  'b2b-digital-growth-framework': '/assets/images/marketing_strategy_hub_1793887129772.jpg',
};

export const DEFAULT_OG_IMAGE = '/assets/images/homepage_hero_marketing_1793886210302.jpg';

/**
 * Builds the full Open Graph & Twitter card metadata for any application path.
 */
export function getRouteMetaProfile(pathname: string): RouteMetaProfile {
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://zenvexa.agency';
  const canonicalUrl = `${origin}${pathname === '/' ? '' : pathname}`;

  // 1. Service Detail Pages (/services/:slug)
  if (pathname.startsWith('/services/')) {
    const slug = pathname.slice('/services/'.length);
    const service = getServiceBySlug(slug);

    if (service) {
      const ogImage = SERVICE_OG_IMAGES[slug] || DEFAULT_OG_IMAGE;
      return {
        title: `${service.title} | ${COMPANY_INFO.name}`,
        description: service.heroDescription || service.tagline,
        image: ogImage.startsWith('http') ? ogImage : `${origin}${ogImage}`,
        imageAlt: `${service.title} - Professional Digital Services by ZENVEXA`,
        type: 'website',
        canonicalUrl,
        siteName: COMPANY_INFO.name,
      };
    }
  }

  // 2. Blog Article Detail Pages (/blog/:slug)
  if (pathname.startsWith('/blog/')) {
    const slug = pathname.slice('/blog/'.length);
    const article = getBlogArticleBySlug(slug);

    if (article) {
      const ogImage = BLOG_OG_IMAGES[slug] || '/assets/images/blog_insights_hero_1793887132655.jpg';
      return {
        title: `${article.title} | ZENVEXA Digital Agency Blog`,
        description: article.excerpt || article.subtitle,
        image: ogImage.startsWith('http') ? ogImage : `${origin}${ogImage}`,
        imageAlt: `${article.title} - Strategic Growth Article by ZENVEXA`,
        type: 'article',
        canonicalUrl,
        siteName: COMPANY_INFO.name,
        article: {
          publishedTime: new Date().toISOString(),
          author: article.author.name,
          section: article.category,
          tags: article.tags,
        },
      };
    }
  }

  // 3. Known Static Routes
  if (ROUTE_SEO[pathname as RoutePath]) {
    const seo = ROUTE_SEO[pathname as RoutePath];
    let imagePath = DEFAULT_OG_IMAGE;

    if (pathname === '/about' || pathname === '/team') {
      imagePath = '/assets/images/about_agency_team_1793886214345.jpg';
    } else if (pathname === '/services') {
      imagePath = '/assets/images/services_page_hero_1793886211456.jpg';
    } else if (pathname === '/portfolio') {
      imagePath = '/assets/images/portfolio_showcase_hero_1793887129391.jpg';
    } else if (pathname === '/pricing') {
      imagePath = '/assets/images/pricing_plans_hero_1793887133667.jpg';
    } else if (pathname === '/blog') {
      imagePath = '/assets/images/blog_insights_hero_1793887132655.jpg';
    } else if (pathname === '/contact') {
      imagePath = '/assets/images/contact_consultation_hero_1793887132215.jpg';
    }

    return {
      title: seo.title,
      description: seo.description,
      image: imagePath.startsWith('http') ? imagePath : `${origin}${imagePath}`,
      imageAlt: `${seo.title} - ZENVEXA Digital Agency`,
      type: 'website',
      canonicalUrl,
      siteName: COMPANY_INFO.name,
    };
  }

  // 4. Default Fallback
  return {
    title: 'ZENVEXA Digital Agency | Digital Marketing, Branding & Web Development',
    description:
      'ZENVEXA helps businesses scale through search engine optimization, Meta advertising, custom website development, branding, and comprehensive performance marketing.',
    image: `${origin}${DEFAULT_OG_IMAGE}`,
    imageAlt: 'ZENVEXA Digital Agency - We Build. We Market. We Scale.',
    type: 'website',
    canonicalUrl,
    siteName: COMPANY_INFO.name,
  };
}

/**
 * Injects and synchronizes all Open Graph, Twitter, and canonical tags into the document head.
 * Ensures social platforms (LinkedIn, Facebook, Twitter, Slack, Discord, WhatsApp) render optimal visual cards.
 */
export function applyRouteMeta(pathname: string): void {
  if (typeof document === 'undefined') return;

  const profile = getRouteMetaProfile(pathname);

  // 1. Browser Title
  document.title = profile.title;

  // Helper to update or create a meta tag
  const setMetaTag = (attributeName: string, attributeValue: string, content: string) => {
    let tag = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute(attributeName, attributeValue);
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
  };

  // Helper to update or create a link tag
  const setLinkTag = (rel: string, href: string) => {
    let link = document.querySelector(`link[rel="${rel}"]`);
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', rel);
      document.head.appendChild(link);
    }
    link.setAttribute('href', href);
  };

  // Standard Meta Tags
  setMetaTag('name', 'description', profile.description);
  setLinkTag('canonical', profile.canonicalUrl);

  // Open Graph Core Tags (Facebook, LinkedIn, Slack, WhatsApp)
  setMetaTag('property', 'og:site_name', profile.siteName);
  setMetaTag('property', 'og:title', profile.title);
  setMetaTag('property', 'og:description', profile.description);
  setMetaTag('property', 'og:url', profile.canonicalUrl);
  setMetaTag('property', 'og:type', profile.type);
  setMetaTag('property', 'og:image', profile.image);
  setMetaTag('property', 'og:image:secure_url', profile.image);
  setMetaTag('property', 'og:image:width', '1200');
  setMetaTag('property', 'og:image:height', '630');
  setMetaTag('property', 'og:image:alt', profile.imageAlt);
  setMetaTag('property', 'og:image:type', 'image/jpeg');

  // Twitter / X Card Tags
  setMetaTag('name', 'twitter:card', 'summary_large_image');
  setMetaTag('name', 'twitter:site', '@zenvexahub');
  setMetaTag('name', 'twitter:creator', '@zenvexahub');
  setMetaTag('name', 'twitter:url', profile.canonicalUrl);
  setMetaTag('name', 'twitter:title', profile.title);
  setMetaTag('name', 'twitter:description', profile.description);
  setMetaTag('name', 'twitter:image', profile.image);
  setMetaTag('name', 'twitter:image:alt', profile.imageAlt);

  // Article Specific Tags
  const existingArticleTags = document.querySelectorAll(
    'meta[property^="article:"]'
  );
  existingArticleTags.forEach((el) => el.remove());

  if (profile.type === 'article' && profile.article) {
    if (profile.article.publishedTime) {
      setMetaTag('property', 'article:published_time', profile.article.publishedTime);
    }
    if (profile.article.author) {
      setMetaTag('property', 'article:author', profile.article.author);
    }
    if (profile.article.section) {
      setMetaTag('property', 'article:section', profile.article.section);
    }
    if (profile.article.tags) {
      profile.article.tags.forEach((tag) => {
        const t = document.createElement('meta');
        t.setAttribute('property', 'article:tag');
        t.setAttribute('content', tag);
        document.head.appendChild(t);
      });
    }
  }
}

/**
 * Generates ready-to-use social sharing links for LinkedIn, Facebook, and Twitter/X.
 */
export function generateSocialShareLinks(params: {
  url: string;
  title: string;
  summary?: string;
}) {
  const encodedUrl = encodeURIComponent(params.url);
  const encodedTitle = encodeURIComponent(params.title);
  const encodedSummary = encodeURIComponent(params.summary || params.title);

  return {
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
  };
}
