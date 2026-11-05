/**
 * ============================================================================
 * ZENVEXA DIGITAL AGENCY — EDITABLE PORTFOLIO CONFIGURATION
 * ============================================================================
 * HOW TO ADD YOUR COMPLETED CLIENT PROJECTS LATER:
 * 1. Upload your project screenshot or cover image into `/public/portfolio/`
 *    (for example: `/public/portfolio/my-project.jpg`).
 * 2. In the `PORTFOLIO_ITEMS` array below, edit an existing item or add a new
 *    object with `imageUrl: '/portfolio/my-project.jpg'`.
 * 3. Change `statusLabel` from `'Agency Concept Showcase'` to `'Client Project'`
 *    once replacing a concept sample with an approved live project.
 * ============================================================================
 */

export type PortfolioCategory =
  | 'All'
  | 'Website Development'
  | 'Social Media Designs'
  | 'Branding & Logo Design'
  | 'Marketing Campaigns'
  | 'Advertising Creatives';

export type ConceptVisualKey =
  | 'web-corporate'
  | 'social-grid'
  | 'brand-identity'
  | 'campaign-funnel'
  | 'ad-creatives'
  | 'web-local-lead';

export interface PortfolioItem {
  id: string;
  title: string;
  category: Exclude<PortfolioCategory, 'All'>;
  statusLabel: 'Agency Concept Showcase' | 'Client Project';
  shortDescription: string;
  detailedOverview: string;
  deliverables: string[];
  toolsAndApproach: string[];
  /**
   * Optional custom image path (e.g. '/portfolio/project-cover.jpg').
   * When left empty, the card renders a crisp ZENVEXA architectural preview board.
   */
  imageUrl?: string;
  imageAlt: string;
  visualKey: ConceptVisualKey;
  relatedService: string;
}

export const PORTFOLIO_CATEGORIES: PortfolioCategory[] = [
  'All',
  'Website Development',
  'Social Media Designs',
  'Branding & Logo Design',
  'Marketing Campaigns',
  'Advertising Creatives',
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'concept-b2b-web-platform',
    title: 'Executive B2B Service Website Architecture',
    category: 'Website Development',
    statusLabel: 'Agency Concept Showcase',
    shortDescription:
      'Responsive multi-section corporate web experience structured for clarity, fast performance, and inquiry conversion.',
    detailedOverview:
      'An agency capability blueprint demonstrating how ZENVEXA structures service-based business websites: clear value propositions above the fold, scannable capability breakdowns, mobile-first responsiveness, and frictionless lead capture.',
    deliverables: [
      'Custom UI/UX layout & responsive grid architecture',
      'Conversion-oriented service & pricing presentation',
      'SEO-ready heading hierarchy & metadata setup',
      'Direct WhatsApp & validated inquiry form workflow',
    ],
    toolsAndApproach: [
      'Responsive Web Design',
      'Conversion UX',
      'Technical SEO Structure',
    ],
    imageUrl: '',
    imageAlt:
      'ZENVEXA Website Development Concept Showcase — Executive B2B Service Website layout',
    visualKey: 'web-corporate',
    relatedService: 'Website Development',
  },
  {
    id: 'concept-social-media-system',
    title: 'Cohesive Monthly Brand Feed & Content Grid',
    category: 'Social Media Designs',
    statusLabel: 'Agency Concept Showcase',
    shortDescription:
      'Structured social media visual system combining educational carousels, service spotlights, and branded post templates.',
    detailedOverview:
      'Demonstrates ZENVEXA’s approach to consistent monthly social media management—aligning typography, brand color discipline, caption structure, and planned content pillars so business profiles look unified and trustworthy.',
    deliverables: [
      'Monthly content calendar & topic pillars',
      'Branded carousel & single-post visual templates',
      'Strategic captions & researched hashtag sets',
      'Scheduled publishing & monthly summary framework',
    ],
    toolsAndApproach: [
      'Content Planning',
      'Visual Post Design',
      'Brand Consistency',
    ],
    imageUrl: '',
    imageAlt:
      'ZENVEXA Social Media Designs Concept Showcase — Cohesive 9-grid social feed layout',
    visualKey: 'social-grid',
    relatedService: 'Social Media Management',
  },
  {
    id: 'concept-brand-identity-suite',
    title: 'Modern Corporate Brand Identity & Guidelines',
    category: 'Branding & Logo Design',
    statusLabel: 'Agency Concept Showcase',
    shortDescription:
      'Complete visual identity concept featuring primary logo construction, color architecture, typography rules, and stationery.',
    detailedOverview:
      'Illustrates our end-to-end branding process—from geometric mark exploration and legibility testing across light and dark surfaces to documented brand guidelines, business card layouts, and social profile kits.',
    deliverables: [
      'Primary, secondary & icon logo variations',
      'Curated brand color palette & contrast system',
      'Display & body typography specifications',
      'Business card & social media profile branding kit',
    ],
    toolsAndApproach: [
      'Logo Construction',
      'Brand Guidelines',
      'Stationery & Digital Assets',
    ],
    imageUrl: '',
    imageAlt:
      'ZENVEXA Branding & Logo Design Concept Showcase — Visual identity specification board',
    visualKey: 'brand-identity',
    relatedService: 'Branding & Logo Design',
  },
  {
    id: 'concept-lead-gen-campaign',
    title: 'Multi-Channel Local Service Growth Campaign',
    category: 'Marketing Campaigns',
    statusLabel: 'Agency Concept Showcase',
    shortDescription:
      'Integrated campaign blueprint connecting local search discovery, landing page messaging, and structured lead follow-up.',
    detailedOverview:
      'A strategic campaign framework designed for small and medium businesses looking to capture high-intent local demand by aligning search visibility, Google Business Profile updates, and targeted promotional offers.',
    deliverables: [
      'Audience & local competitor research brief',
      'Coordinated search, map & social campaign plan',
      'Dedicated offer landing page wireframe',
      'Lead tracking & monthly performance review structure',
    ],
    toolsAndApproach: [
      'Campaign Strategy',
      'Local Visibility',
      'Funnel Alignment',
    ],
    imageUrl: '',
    imageAlt:
      'ZENVEXA Marketing Campaigns Concept Showcase — Multi-channel growth funnel architecture',
    visualKey: 'campaign-funnel',
    relatedService: 'Local SEO & Lead Generation',
  },
  {
    id: 'concept-meta-ad-creatives',
    title: 'Direct-Response Facebook & Instagram Ad Suite',
    category: 'Advertising Creatives',
    statusLabel: 'Agency Concept Showcase',
    shortDescription:
      'High-clarity ad creative concepts engineered for feed and story placements with focused value hooks and clear CTAs.',
    detailedOverview:
      'Showcases how ZENVEXA plans paid social creative variations across feed and vertical story formats—pairing clean visual hierarchy, scannable benefit statements, and audience-specific call-to-action framing.',
    deliverables: [
      'Feed (1:1 / 4:5) & Story (9:16) ad creative layouts',
      'Value-proposition headline & primary text variants',
      'Audience segment & placement alignment',
      'Structured creative testing & reporting workflow',
    ],
    toolsAndApproach: [
      'Meta Ads Creative',
      'Audience Targeting',
      'Conversion Copywriting',
    ],
    imageUrl: '',
    imageAlt:
      'ZENVEXA Advertising Creatives Concept Showcase — Facebook and Instagram ad formats',
    visualKey: 'ad-creatives',
    relatedService: 'Facebook & Instagram Ads',
  },
  {
    id: 'concept-local-booking-landing',
    title: 'Service Booking & Consultation Landing Page',
    category: 'Website Development',
    statusLabel: 'Agency Concept Showcase',
    shortDescription:
      'Streamlined landing page concept built specifically for paid traffic and local search visitors ready to request a quote.',
    detailedOverview:
      'Focused landing page architecture removing navigation distractions to highlight core service deliverables, transparent pricing expectations, process clarity, and fast mobile inquiry submission.',
    deliverables: [
      'Mobile-first landing page UI/UX design',
      'Fast-loading semantic page structure',
      'Service-specific inquiry form & click-to-call/WhatsApp',
      'On-page SEO & conversion tracking readiness',
    ],
    toolsAndApproach: [
      'Landing Page UX',
      'Mobile Optimization',
      'Lead Capture',
    ],
    imageUrl: '',
    imageAlt:
      'ZENVEXA Website Development Concept Showcase — High-conversion service landing page',
    visualKey: 'web-local-lead',
    relatedService: 'Website Development',
  },
];
