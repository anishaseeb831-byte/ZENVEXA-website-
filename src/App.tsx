/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { GrowthSection } from './components/GrowthSection';
import { PortfolioSection } from './components/PortfolioSection';
import { AboutSection } from './components/AboutSection';
import { WhyChooseSection } from './components/WhyChooseSection';
import { ProcessSection } from './components/ProcessSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ConsultationSection } from './components/ConsultationSection';
import { ContactSection, InquiryPreset } from './components/ContactSection';
import { PortalSection } from './components/PortalSection';
import { Footer } from './components/Footer';
import { ServicesMainPage } from './components/ServicesMainPage';
import { ServiceDetailPage } from './components/ServiceDetailPage';
import { AboutPage } from './components/AboutPage';
import { PricingPage } from './components/PricingPage';
import { BlogPage } from './components/BlogPage';
import { BlogPostPage } from './components/BlogPostPage';
import { NotFoundPage } from './components/NotFoundPage';
import { BackToTop } from './components/BackToTop';
import { RoutePath, ROUTE_SEO } from './data/agencyData';
import { getServiceBySlug } from './data/servicesDetailedData';
import { getBlogArticleBySlug } from './data/blogData';

function normalizePath(pathname: string): string {
  const cleaned =
    pathname.length > 1 && pathname.endsWith('/')
      ? pathname.slice(0, -1)
      : pathname;
  return cleaned || '/';
}

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() =>
    normalizePath(window.location.pathname)
  );
  const [inquiryPreset, setInquiryPreset] = useState<InquiryPreset | null>(null);

  // Sync browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(normalizePath(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Sync per-route SEO title and meta description dynamically
  useEffect(() => {
    let title = 'ZENVEXA Digital Agency | Digital Marketing, Branding & Web Development';
    let description =
      'ZENVEXA Digital Agency helps businesses grow through social media management, Facebook and Instagram advertising, SEO, website development, branding, and complete digital marketing solutions.';

    if (currentPath.startsWith('/services/')) {
      const slug = currentPath.slice('/services/'.length);
      const service = getServiceBySlug(slug);
      if (service) {
        title = `${service.title} | ZENVEXA Digital Agency`;
        description = service.heroDescription;
      } else {
        title = 'Service Not Found | ZENVEXA Digital Agency';
        description = 'The requested service page could not be found.';
      }
    } else if (currentPath.startsWith('/blog/')) {
      const slug = currentPath.slice('/blog/'.length);
      const article = getBlogArticleBySlug(slug);
      if (article) {
        title = `${article.title} | ZENVEXA Digital Agency Blog`;
        description = article.excerpt;
      } else {
        title = 'Article Not Found | ZENVEXA Digital Agency Blog';
        description = 'The requested blog article could not be found.';
      }
    } else if (ROUTE_SEO[currentPath as RoutePath]) {
      const seo = ROUTE_SEO[currentPath as RoutePath];
      title = seo.title;
      description = seo.description;
    }

    document.title = title;

    const updateMeta = (selector: string, content: string) => {
      const el = document.querySelector(selector);
      if (el) {
        el.setAttribute('content', content);
      }
    };

    updateMeta('meta[name="description"]', description);
    updateMeta('meta[property="og:title"]', title);
    updateMeta('meta[property="og:description"]', description);
    updateMeta('meta[name="twitter:title"]', title);
    updateMeta('meta[name="twitter:description"]', description);
  }, [currentPath]);

  const navigateTo = useCallback(
    (path: RoutePath, targetElementId?: string) => {
      const targetPath = normalizePath(path);
      if (window.location.pathname !== targetPath) {
        window.history.pushState({}, '', targetPath);
        setCurrentPath(targetPath);
      }

      requestAnimationFrame(() => {
        if (targetElementId) {
          const targetEl = document.getElementById(targetElementId);
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            return;
          }
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    },
    []
  );

  const openInquiryWithPreset = useCallback(
    (serviceTitle: string, noteText: string) => {
      setInquiryPreset({
        service: serviceTitle,
        note: noteText,
        nonce: Date.now(),
      });
      navigateTo('/contact');
    },
    [navigateTo]
  );

  const handleGetQuoteAction = () => {
    navigateTo('/contact');
  };

  const handleExploreServicesAction = () => {
    navigateTo('/services');
  };

  // Route Router Logic
  const renderRouteContent = () => {
    // 1. Homepage
    if (currentPath === '/') {
      return (
        <>
          <HeroSection
            onNavigate={(path) => navigateTo(path)}
            onPrimaryAction={handleGetQuoteAction}
            onExploreServices={handleExploreServicesAction}
          />
          <ServicesSection
            onSelectService={(serviceTitle) =>
              openInquiryWithPreset(
                serviceTitle,
                `Hello ZENVEXA Team, I am interested in learning more about ${serviceTitle} for my business.`
              )
            }
            onNavigate={(path) => navigateTo(path)}
          />
          <GrowthSection onExploreServices={handleExploreServicesAction} />
          <WhyChooseSection />
          <ProcessSection />
          <PortfolioSection
            onNavigate={(path) => navigateTo(path)}
            onRequestSimilarProject={(serviceTitle, projectTitle) =>
              openInquiryWithPreset(
                serviceTitle,
                `Hello ZENVEXA Team, I viewed the "${projectTitle}" showcase and would like to discuss a similar solution for my business.`
              )
            }
          />
          <AboutSection onNavigate={(path) => navigateTo(path)} />
          <TestimonialsSection onNavigate={(path) => navigateTo(path)} />
          <ConsultationSection />
        </>
      );
    }

    // 2. Services Main Page
    if (currentPath === '/services') {
      return (
        <ServicesMainPage
          onNavigate={(path) => navigateTo(path)}
          onSelectService={(serviceTitle) =>
            openInquiryWithPreset(
              serviceTitle,
              `Hello ZENVEXA Team, I am interested in ${serviceTitle} for my business.`
            )
          }
        />
      );
    }

    // 3. Service Detail Pages (/services/:slug)
    if (currentPath.startsWith('/services/')) {
      const slug = currentPath.slice('/services/'.length);
      const service = getServiceBySlug(slug);
      if (!service) {
        return <NotFoundPage onNavigate={(path) => navigateTo(path)} />;
      }
      return (
        <ServiceDetailPage
          service={service}
          onNavigate={(path) => navigateTo(path)}
          onGetStartedWithService={(serviceTitle: string, note?: string) =>
            openInquiryWithPreset(
              serviceTitle,
              note || `Hello ZENVEXA Team, I would like to get started with ${serviceTitle}.`
            )
          }
        />
      );
    }

    // 4. About Us Page
    if (currentPath === '/about' || currentPath === '/team') {
      return <AboutPage onNavigate={(path) => navigateTo(path)} />;
    }

    // 5. Portfolio Page
    if (currentPath === '/portfolio') {
      return (
        <>
          <PortfolioSection
            isStandalonePage
            onNavigate={(path) => navigateTo(path)}
            onRequestSimilarProject={(serviceTitle, projectTitle) =>
              openInquiryWithPreset(
                serviceTitle,
                `Hello ZENVEXA Team, I viewed the "${projectTitle}" showcase and would like to discuss a similar solution for my business.`
              )
            }
          />
          <ConsultationSection />
        </>
      );
    }

    // 6. Pricing Page
    if (currentPath === '/pricing') {
      return (
        <PricingPage
          onNavigate={(path) => navigateTo(path)}
          onGetService={(serviceTitle, priceNote) =>
            openInquiryWithPreset(
              serviceTitle,
              `Hello ZENVEXA Team, I would like to get started with ${serviceTitle} (${priceNote}). Here are my business details:`
            )
          }
          onRequestCustomQuote={(serviceTitle) =>
            openInquiryWithPreset(
              serviceTitle,
              `Hello ZENVEXA Team, I would like to request a custom quotation for ${serviceTitle} tailored to my project scope:`
            )
          }
        />
      );
    }

    // 7. Blog Listing Page
    if (currentPath === '/blog') {
      return <BlogPage onNavigate={(path) => navigateTo(path)} />;
    }

    // 8. Blog Article Detail Page (/blog/:slug)
    if (currentPath.startsWith('/blog/')) {
      const slug = currentPath.slice('/blog/'.length);
      const article = getBlogArticleBySlug(slug);
      if (!article) {
        return <NotFoundPage onNavigate={(path) => navigateTo(path)} />;
      }
      return <BlogPostPage article={article} onNavigate={(path) => navigateTo(path)} />;
    }

    // 9. Contact Us Page
    if (currentPath === '/contact') {
      return (
        <>
          <ContactSection
            isStandalonePage
            inquiryPreset={inquiryPreset}
            onNavigate={(path) => navigateTo(path)}
          />
          <ConsultationSection />
        </>
      );
    }

    // 10. Client & Agency Portal
    if (currentPath === '/portal') {
      return <PortalSection onNavigate={(path) => navigateTo(path)} />;
    }

    // 11. Custom 404 Fallback
    return <NotFoundPage onNavigate={(path) => navigateTo(path)} />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#0B0F19]">
      <Navbar
        currentPath={currentPath as RoutePath}
        onNavigate={(path) => navigateTo(path)}
        onGetQuote={handleGetQuoteAction}
      />

      <main className="flex-1">{renderRouteContent()}</main>

      <Footer
        onNavigate={(path) => navigateTo(path)}
        onSelectService={(serviceTitle) =>
          openInquiryWithPreset(
            serviceTitle,
            `Hello ZENVEXA Team, I would like to inquire about ${serviceTitle} for my business.`
          )
        }
      />

      <BackToTop />
    </div>
  );
}
