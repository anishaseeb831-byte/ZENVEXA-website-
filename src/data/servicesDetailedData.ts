import { ServiceIconKey } from './agencyData';

export interface ServiceSubOfferItem {
  title: string;
  description: string;
  keyDeliverable: string;
}

export interface ServiceBenefitItem {
  title: string;
  description: string;
  impactMetric: string;
}

export interface ServiceProcessStep {
  step: string;
  title: string;
  description: string;
  deliverable: string;
}

export interface ServiceFaqItem {
  question: string;
  answer: string;
}

export interface DetailedService {
  slug: string;
  aliases?: string[];
  number: string;
  title: string;
  tagline: string;
  heroHeadline: string;
  heroDescription: string;
  startingPrice: number;
  billingType: 'month' | 'project';
  pricingSubtitle: string;
  priceExplanation: string;
  introduction: string[];
  subServices: ServiceSubOfferItem[];
  benefits: ServiceBenefitItem[];
  process: ServiceProcessStep[];
  faqs: ServiceFaqItem[];
  relatedSlugs: string[];
  iconKey: ServiceIconKey;
  iconGradient: string;
  strategicFocus: string;
}

export const DETAILED_SERVICES_DATA: DetailedService[] = [
  {
    slug: 'social-media-management',
    aliases: ['social-media'],
    number: '01',
    title: 'Social Media Management',
    tagline: 'Build Consistent Brand Authority & Continuous Audience Engagement',
    heroHeadline: 'Social Media Management That Builds Community & Converts Followers',
    heroDescription:
      'Turn your business profiles into active customer magnets with strategic monthly content planning, high-impact creative designs, engaging captions, and responsive community interactions.',
    startingPrice: 149,
    billingType: 'month',
    pricingSubtitle: 'From $149/month · Cancel or adjust anytime',
    priceExplanation:
      'Our monthly social media retainer starts at $149/month for core management (12–16 customized posts/month across 1–2 platforms). Final pricing depends on posting frequency, the number of platforms managed (Instagram, Facebook, LinkedIn, TikTok), short-form video/reel editing needs, and custom community engagement requirements.',
    introduction: [
      'In today’s fast-moving digital landscape, casual or sporadic posting no longer builds commercial trust. Customers evaluate your credibility, design quality, and responsiveness directly through your Instagram, Facebook, and LinkedIn profiles before making an inquiry.',
      'ZENVEXA manages your social channels with structured content calendars, bespoke post designs, targeted hashtags, and proactive engagement to keep your brand top-of-mind across Pakistan, the United States, and international markets.',
      'We focus on high-clarity visual communication that represents your business with authority, educates your audience on your unique advantages, and consistently guides prospects toward consultations.',
    ],
    subServices: [
      {
        title: 'Monthly Content Strategy & Calendar',
        description:
          'Structured monthly calendar mapping promotional posts, educational carousels, testimonials, and brand stories around your business objectives.',
        keyDeliverable: 'Pre-approved 30-day visual content calendar',
      },
      {
        title: 'Custom Graphic & Carousel Design',
        description:
          'Eye-catching, brand-consistent post graphics, carousels, and visual templates crafted to stop scrolling and spark saves.',
        keyDeliverable: 'High-resolution feed creatives (1:1 & 4:5)',
      },
      {
        title: 'Persuasive Copywriting & Hashtags',
        description:
          'Engaging captions with clear value hooks, brand voice consistency, researched hashtag sets, and strong call-to-actions.',
        keyDeliverable: 'Conversion-focused captions & hashtag banks',
      },
      {
        title: 'Multi-Platform Scheduling & Publishing',
        description:
          'Optimal timing distribution across Facebook, Instagram, LinkedIn, or Twitter to maximize organic reach and impression consistency.',
        keyDeliverable: 'Hands-off scheduled publishing',
      },
      {
        title: 'Community Engagement Support',
        description:
          'Monitoring post comments, acknowledging inquiries, and directing potential leads to WhatsApp or your website contact form.',
        keyDeliverable: 'Responsive brand interaction',
      },
      {
        title: 'Monthly Performance Analytics Report',
        description:
          'Clear monthly review detailing impressions, profile reach, follower growth, top-performing posts, and next-month improvements.',
        keyDeliverable: 'Transparent monthly PDF report',
      },
    ],
    benefits: [
      {
        title: 'Polished Brand Authority',
        description:
          'A unified, professional social feed that instantly signals trust to new prospects checking out your business.',
        impactMetric: '100% Brand Cohesion',
      },
      {
        title: 'Saved Team Hours Every Week',
        description:
          'Eliminate the daily stress of wondering what to post. We handle planning, design, and scheduling end-to-end.',
        impactMetric: '15+ Hours Saved Weekly',
      },
      {
        title: 'Continuous Top-of-Mind Presence',
        description:
          'Consistent, high-quality touchpoints ensure your brand is the first choice when customers are ready to buy.',
        impactMetric: 'Consistent Audience Reach',
      },
      {
        title: 'Inbound Conversation Generation',
        description:
          'Every carousel and post is designed with intentional hooks that inspire direct messages and WhatsApp inquiries.',
        impactMetric: 'Higher Inbound Inquiries',
      },
    ],
    process: [
      {
        step: '01',
        title: 'Brand & Audience Audit',
        description:
          'We analyze your current social presence, target demographics, top competitors, and key services to define your unique voice.',
        deliverable: 'Social Audit & Content Pillars',
      },
      {
        step: '02',
        title: '30-Day Content Planning',
        description:
          'We structure a 30-day calendar with topics, offers, and visual themes submitted to you for feedback and approval.',
        deliverable: 'Monthly Content Outline',
      },
      {
        step: '03',
        title: 'Design & Copy Production',
        description:
          'Our creative team crafts bespoke visuals, carousel slides, and persuasive copy adhering to your brand guidelines.',
        deliverable: 'Approved Creative Suite',
      },
      {
        step: '04',
        title: 'Publishing & Monthly Review',
        description:
          'We schedule posts for peak engagement windows and deliver a transparent monthly analytics report with actionable insights.',
        deliverable: 'Monthly Performance Review',
      },
    ],
    faqs: [
      {
        question: 'Which social media platforms do you manage?',
        answer:
          'We actively manage Facebook, Instagram, LinkedIn, and X (Twitter). We recommend focusing on the 1–2 platforms where your target clients spend the most time.',
      },
      {
        question: 'Do I get to review and approve posts before they go live?',
        answer:
          'Yes, absolutely. We prepare the monthly content calendar and graphics in advance and only publish after you review and approve the creatives.',
      },
      {
        question: 'Does this service include paid advertising budgets?',
        answer:
          'Our Social Media Management service covers organic posting, graphic design, and page management. Paid ad spend and paid advertising management are handled through our dedicated Meta Ads service.',
      },
      {
        question: 'How do we communicate during the month?',
        answer:
          'You have direct access to our agency team via WhatsApp and email for quick feedback, urgent announcements, and seamless coordination.',
      },
      {
        question: 'Can I provide my own photos and project videos?',
        answer:
          'Yes! We love integrating real photos, product shots, and team media into custom branded templates. If you don’t have assets, we create custom graphic illustrations and layouts.',
      },
    ],
    relatedSlugs: ['meta-ads', 'branding', 'website-development'],
    iconKey: 'share',
    iconGradient: 'from-[#EC4899] to-[#F43F5E]',
    strategicFocus: 'Consistent brand presence & community engagement',
  },
  {
    slug: 'meta-ads',
    aliases: ['facebook-instagram-ads', 'meta-advertising'],
    number: '02',
    title: 'Facebook & Instagram Ads Management',
    tagline: 'High-Converting Paid Social Campaigns Engineered for Measurable ROI',
    heroHeadline: 'Meta Advertising Campaigns That Generate Qualified Leads & Sales',
    heroDescription:
      'Reach your target audience across Facebook and Instagram with data-backed audience targeting, compelling ad creative formats, precise pixel tracking, and continuous ROI optimization.',
    startingPrice: 99,
    billingType: 'month',
    pricingSubtitle: 'From $99/month management · Ad spend separate',
    priceExplanation:
      'Agency campaign management starts at $99/month. Note that your advertising budget paid directly to Meta is separate from agency management fees. Final management tiers depend on the number of active campaigns, ad spend volume, creative refresh frequency, and custom landing page requirements.',
    introduction: [
      'Paid social advertising on Meta (Facebook and Instagram) remains one of the most powerful and scalable customer acquisition channels in the world. However, running ads without a structured funnel, compelling creative, or proper tracking quickly burns through marketing dollars.',
      'At ZENVEXA, we treat your advertising budget with commercial discipline. We build full-funnel paid strategies that combine audience interest modeling, retargeting pools, click-worthy ad creatives, and persuasive copywriting to maximize your return on ad spend (ROAS).',
      'Whether you want to generate local phone inquiries, B2B leads, or e-commerce purchases in Pakistan, the US, or internationally, we engineer campaigns that deliver measurable commercial outcomes.',
    ],
    subServices: [
      {
        title: 'Campaign Strategy & Funnel Architecture',
        description:
          'Structuring top-of-funnel prospecting, middle-of-funnel consideration, and bottom-of-funnel retargeting to maximize conversion efficiency.',
        keyDeliverable: 'Custom paid acquisition blueprint',
      },
      {
        title: 'Laser-Targeted Audience Research',
        description:
          'Defining custom lookalikes, competitor interest clusters, and geographic targets aligned with your ideal customer profile.',
        keyDeliverable: 'Segmented audience targeting setup',
      },
      {
        title: 'High-Impact Ad Creatives & Copywriting',
        description:
          'Designing feed and vertical story ad graphics, compelling headlines, and clear value hooks that drive clicks.',
        keyDeliverable: 'Tested ad creative variations',
      },
      {
        title: 'Pixel, CAPI & Conversion Tracking',
        description:
          'Setting up Meta Pixel and Conversions API (CAPI) events to accurately track leads, inquiries, and purchase actions.',
        keyDeliverable: 'Verified tracking & event setup',
      },
      {
        title: 'Continuous A/B Testing & Bid Optimization',
        description:
          'Regularly testing headlines, visual formats, and audience segments to decrease Cost Per Lead (CPL) and scale winning ads.',
        keyDeliverable: 'Weekly bid & budget refinement',
      },
      {
        title: 'Transparent Reporting & Lead Analytics',
        description:
          'Clear, unvarnished performance reports detailing spend, reach, link clicks, qualified leads, and cost-per-acquisition.',
        keyDeliverable: 'Monthly ROAS & lead review',
      },
    ],
    benefits: [
      {
        title: 'Immediate Market Reach',
        description:
          'Unlike organic channels that take months, paid Meta campaigns place your offer directly in front of thousands of potential buyers within 24 hours.',
        impactMetric: 'Instant Traffic Inflow',
      },
      {
        title: 'Predictable Lead Pipeline',
        description:
          'Scale campaigns up during peak business cycles and dial them back when at capacity, maintaining predictable pipeline control.',
        impactMetric: 'Scalable Customer Inflow',
      },
      {
        title: 'Granular Demographic Targeting',
        description:
          'Target buyers based on location, age, language, specific interests, business roles, and previous website visits.',
        impactMetric: 'Targeted Buyer Relevance',
      },
      {
        title: 'Cost-Effective Commercial Testing',
        description:
          'Quickly validate new offers, services, or pricing points with small initial budgets before committing major resources.',
        impactMetric: 'Low-Risk Market Validation',
      },
    ],
    process: [
      {
        step: '01',
        title: 'Offer & Competitor Audit',
        description:
          'We examine your core service or product offer, pricing, target buyer profile, and competitor ad strategies in the Meta Ad Library.',
        deliverable: 'Campaign Strategy Brief',
      },
      {
        step: '02',
        title: 'Creative & Tracking Setup',
        description:
          'We craft ad copy, design visual creatives, set up Meta Pixel/CAPI tracking, and configure custom audience segments.',
        deliverable: 'Ad Creative Suite & Pixel Setup',
      },
      {
        step: '03',
        title: 'Campaign Launch & Testing',
        description:
          'We launch controlled budget test ad sets to measure click-through rates, lead quality, and initial cost-per-result.',
        deliverable: 'Live Campaigns with Active Monitoring',
      },
      {
        step: '04',
        title: 'Optimization & Scaling',
        description:
          'We cull underperforming ad sets, reallocate budget to top-performing creatives, and scale winning audiences sustainably.',
        deliverable: 'Ongoing Optimization & CPL Reduction',
      },
    ],
    faqs: [
      {
        question: 'How much should I spend on Meta ad budget?',
        answer:
          'Ad spend is paid directly to Meta via your business payment method. For local and small businesses, we typically recommend starting between $150 to $500/month in ad spend to test audiences effectively before scaling.',
      },
      {
        question: 'Who owns the Meta ad account and campaign assets?',
        answer:
          'You retain 100% ownership of your Meta Business Manager, ad accounts, pixel data, and creatives. We operate securely as an agency partner with delegated access.',
      },
      {
        question: 'How quickly can we start seeing leads from Facebook & Instagram?',
        answer:
          'Once campaigns are configured and approved by Meta (typically within 24–48 hours of launch), your ads begin delivering impressions and receiving clicks immediately.',
      },
      {
        question: 'Do you create the ad graphics and write the copy?',
        answer:
          'Yes. ZENVEXA handles the copy, headline hooks, visual design layouts, and call-to-actions as part of the management service.',
      },
      {
        question: 'What if I don’t have a website yet?',
        answer:
          'We can run native Meta Lead Forms or click-to-WhatsApp ad campaigns, or build a high-converting landing page through our Website Development service.',
      },
    ],
    relatedSlugs: ['social-media-management', 'website-development', 'marketing-strategy'],
    iconKey: 'megaphone',
    iconGradient: 'from-[#6A35FF] to-[#4361EE]',
    strategicFocus: 'Targeted paid acquisition & qualified lead generation',
  },
  {
    slug: 'seo',
    aliases: ['search-engine-optimization'],
    number: '03',
    title: 'Search Engine Optimization (SEO)',
    tagline: 'Capture High-Intent Commercial Searches on Google Organically',
    heroHeadline: 'Strategic SEO That Drives Sustainable Organic Traffic & Inquiries',
    heroDescription:
      'Dominate organic search rankings with comprehensive keyword research, technical website audits, on-page content optimization, and structured search authority building.',
    startingPrice: 149,
    billingType: 'month',
    pricingSubtitle: 'From $149/month · White-hat compounding growth',
    priceExplanation:
      'SEO plans start at $149/month for local and regional small businesses focusing on 10–15 primary target keywords. Enterprise e-commerce catalogs, international targeting, and competitive multi-market niches are scoped based on site scale and content volume.',
    introduction: [
      'When potential clients need your products or services, Google is their first destination. Unlike paid ads that stop the second your budget pauses, organic search rankings provide a compounding asset that delivers high-intent visitors month after month.',
      'Achieving durable Google rankings requires an integrated approach: clean technical site health, fast Core Web Vitals, authoritative content that answers exact search intent, and natural backlink signals.',
      'ZENVEXA uses proven white-hat SEO methodologies. We optimize your website architecture, eliminate crawl roadblocks, and target the commercial keywords that your highest-value customers actually search for.',
    ],
    subServices: [
      {
        title: 'Keyword Research & Search Intent Mapping',
        description:
          'Identifying high-intent commercial keywords, search volume trends, and competitor ranking gaps that lead to paying customers.',
        keyDeliverable: 'Prioritized Master Keyword List',
      },
      {
        title: 'On-Page SEO & Content Hierarchy',
        description:
          'Optimizing title tags, meta descriptions, H1-H3 headers, internal linking, and semantic keyword integration across all core pages.',
        keyDeliverable: 'Full on-page site optimization',
      },
      {
        title: 'Technical SEO & Core Web Vitals Audit',
        description:
          'Resolving crawl errors, indexing bottlenecks, XML sitemaps, robots.txt directives, mobile performance, and page speed.',
        keyDeliverable: 'Technical health audit & fixes',
      },
      {
        title: 'Schema Markup & Rich Snippet Integration',
        description:
          'Implementing structured data (Organization, LocalBusiness, FAQ, Service) to earn rich snippets and elevate search CTR.',
        keyDeliverable: 'Structured data deployment',
      },
      {
        title: 'Search Authority & Link Building Strategy',
        description:
          'Earning quality relevant backlinks, brand mentions, and citations through white-hat outreach and content distribution.',
        keyDeliverable: 'Sustainable domain authority growth',
      },
      {
        title: 'Rank Tracking & Google Search Console Analytics',
        description:
          'Monitoring organic keyword positions, search impressions, click trends, and crawl health with monthly transparency.',
        keyDeliverable: 'Monthly SEO ranking report',
      },
    ],
    benefits: [
      {
        title: 'Zero Cost-Per-Click Traffic',
        description:
          'Every click from organic Google search is 100% free, drastically lowering your overall customer acquisition cost.',
        impactMetric: '$0 Ad Spend per Click',
      },
      {
        title: 'Compounding Long-Term Value',
        description:
          'SEO builds enduring equity. Well-ranked pages continue delivering qualified leads for months and years.',
        impactMetric: 'Durable Search Equity',
      },
      {
        title: 'Enhanced Brand Credibility',
        description:
          'Buyers instinctively trust top organic Google results significantly more than paid sponsored listings.',
        impactMetric: 'Organic Authority & Trust',
      },
      {
        title: 'High-Intent Commercial Prospects',
        description:
          'Users searching for your services are actively seeking a solution, making them substantially easier to convert.',
        impactMetric: 'Higher Lead-to-Close Rates',
      },
    ],
    process: [
      {
        step: '01',
        title: 'Comprehensive SEO & Competitor Audit',
        description:
          'We audit your current domain authority, technical crawl health, indexation status, existing rankings, and competitor strengths.',
        deliverable: 'Complete SEO Baseline Audit',
      },
      {
        step: '02',
        title: 'Technical Fixes & Architecture Optimization',
        description:
          'We fix technical crawl roadblocks, optimize page loading speed, update sitemaps, and structure clean URL hierarchies.',
        deliverable: 'Technical Health Resolution',
      },
      {
        step: '03',
        title: 'On-Page Content & Keyword Deployment',
        description:
          'We optimize page titles, meta descriptions, headings, body copy, and schema markup targeting your priority keywords.',
        deliverable: 'On-Page Optimization Rollout',
      },
      {
        step: '04',
        title: 'Authority Building & Rank Tracking',
        description:
          'We monitor keyword positions in Google Search Console, build domain relevance, and deliver monthly performance analytics.',
        deliverable: 'Monthly Ranking & Traffic Report',
      },
    ],
    faqs: [
      {
        question: 'How long does SEO take to produce results?',
        answer:
          'SEO is a compounding long-term growth channel. Initial technical and indexing improvements typically register within 4–8 weeks, with noticeable keyword rank gains and traffic growth consolidating between 3 to 6 months.',
      },
      {
        question: 'Do you guarantee number 1 rankings on Google?',
        answer:
          'No honest agency can guarantee position #1, as Google’s search algorithms update constantly. However, we guarantee rigorous white-hat best practices, transparent work logs, and proven optimization strategies that consistently elevate search visibility.',
      },
      {
        question: 'What is the difference between General SEO and Local SEO?',
        answer:
          'General SEO optimizes your website for national or global search terms without physical boundaries. Local SEO focuses specifically on Google Maps and city-level searches (e.g. "digital agency in Lahore" or "dentist in Dallas"). We offer both.',
      },
      {
        question: 'Will you need access to my website CMS or hosting?',
        answer:
          'Yes. To implement title tags, schema markup, technical fixes, and content optimizations, we require administrative access to your CMS or developer coordination.',
      },
      {
        question: 'What reports will I receive each month?',
        answer:
          'You receive a comprehensive monthly report detailing your tracked keyword positions, organic impressions, clicks from Google Search Console, and strategic next steps.',
      },
    ],
    relatedSlugs: ['website-development', 'local-seo', 'marketing-strategy'],
    iconKey: 'search',
    iconGradient: 'from-[#2563EB] to-[#0EA5E9]',
    strategicFocus: 'Sustainable organic search visibility & rankings',
  },
  {
    slug: 'website-development',
    aliases: ['web-design', 'web-development'],
    number: '04',
    title: 'Website Development',
    tagline: 'High-Performance Modern Web Architecture Engineered to Convert',
    heroHeadline: 'Custom, High-Converting Websites Built for Modern Growth',
    heroDescription:
      'Represent your business with a fast, modern, mobile-responsive website designed with clean typography, conversion-focused UX, and frictionless customer inquiry flows.',
    startingPrice: 199,
    billingType: 'project',
    pricingSubtitle: 'From $199 starting project rate · Full ownership',
    priceExplanation:
      'Project packages start at $199 for dedicated landing pages and streamlined multi-section business websites. Multi-page enterprise websites, extensive CMS portals, and e-commerce functionalities are quoted transparently based on scope, page count, and custom features.',
    introduction: [
      'Your website is the single most critical asset in your digital presence—it is where advertising traffic lands, brand credibility is proven, and commercial inquiries are captured. A slow, dated template with broken mobile layouts repels valuable prospects.',
      'ZENVEXA builds bespoke, responsive business websites and landing pages engineered for speed, search visibility, intuitive navigation, and high visitor-to-lead conversion rates.',
      'We combine modern design principles (inspired by top international creative studios) with semantic code, clean typography, fast Core Web Vitals, and direct WhatsApp or cloud contact workflows.',
    ],
    subServices: [
      {
        title: 'Bespoke Business Websites',
        description:
          'Multi-page corporate and service agency websites designed from scratch to reflect your exact brand positioning and commercial capabilities.',
        keyDeliverable: 'Custom multi-page web platform',
      },
      {
        title: 'High-Converting Landing Pages',
        description:
          'Laser-focused landing pages engineered for paid advertising traffic with persuasive headline hooks and zero navigation friction.',
        keyDeliverable: 'Optimized campaign landing page',
      },
      {
        title: 'Mobile-First Responsive Architecture',
        description:
          'Flawless layout presentation, touch-friendly navigation, and adaptive typography across smartphones, tablets, and wide desktop screens.',
        keyDeliverable: '100% responsive cross-device layout',
      },
      {
        title: 'Conversion UX & Frictionless Forms',
        description:
          'Strategically placed call-to-actions, direct WhatsApp chat triggers, and validated contact forms that maximize qualified inquiries.',
        keyDeliverable: 'Streamlined inquiry workflows',
      },
      {
        title: 'Technical SEO & Performance Speed',
        description:
          'Semantic HTML5 structure, optimized assets, fast Core Web Vitals, clean OpenGraph cards, and search engine readiness.',
        keyDeliverable: 'Fast loading & SEO-ready structure',
      },
      {
        title: 'Ongoing Maintenance & Support Options',
        description:
          'Reliable technical maintenance, backup procedures, content updates, and continuous platform support as your business scales.',
        keyDeliverable: 'Optional ongoing care plans',
      },
    ],
    benefits: [
      {
        title: 'Instant Commercial Credibility',
        description:
          'A modern, polished digital storefront positions you as a leading authority in your industry from the very first impression.',
        impactMetric: 'High First-Impression Trust',
      },
      {
        title: 'Superior Mobile & Desktop Speed',
        description:
          'Lightweight, modern code ensures rapid loading times that keep bounce rates low and Google search rankings high.',
        impactMetric: 'Sub-Second Load Times',
      },
      {
        title: 'Frictionless Inbound Lead Capture',
        description:
          'Clear CTAs, integrated WhatsApp contact links, and validated forms make it effortless for prospects to reach your team.',
        impactMetric: 'Maximized Conversion Rate',
      },
      {
        title: 'Full Platform Ownership & Freedom',
        description:
          'You maintain complete ownership of your code, design assets, and content with no predatory proprietary platform lock-ins.',
        impactMetric: '100% Client Ownership',
      },
    ],
    process: [
      {
        step: '01',
        title: 'Discovery & UX Architecture',
        description:
          'We define your target market, required pages, conversion goals, and key user flows before touching any design tools.',
        deliverable: 'Site Architecture & Page Blueprint',
      },
      {
        step: '02',
        title: 'Visual UI Design & Styling',
        description:
          'We design the visual layout, typography pairing, hero banner compositions, and interactive cards for your review.',
        deliverable: 'Approved Visual Mockup & Design System',
      },
      {
        step: '03',
        title: 'Clean Engineering & Integration',
        description:
          'We develop the website using clean, responsive code, connecting contact forms, WhatsApp links, and interactive elements.',
        deliverable: 'Functional Staging Website',
      },
      {
        step: '04',
        title: 'Quality Testing & Production Launch',
        description:
          'We conduct cross-browser testing, mobile responsiveness checks, speed optimization, and handle the final domain deployment.',
        deliverable: 'Live Production Website Launch',
      },
    ],
    faqs: [
      {
        question: 'How long does it take to develop a custom website?',
        answer:
          'A focused landing page is typically completed within 5–7 business days, while comprehensive multi-page business websites take approximately 2–3 weeks depending on feedback cycles and content readiness.',
      },
      {
        question: 'Are domain registration and hosting included in the starting price?',
        answer:
          'Domain registration and web hosting fees are separate third-party services. We assist you in selecting and configuring the best fast, affordable hosting provider (e.g. Vercel, Netlify, or standard web hosts).',
      },
      {
        question: 'Will my website work properly on mobile phones?',
        answer:
          'Yes, 100%. We design mobile-first so every element, button, navigation menu, and form looks and functions seamlessly across iPhones, Android devices, tablets, and desktop displays.',
      },
      {
        question: 'Can I request edits or updates to my website later?',
        answer:
          'Yes! We provide post-launch support and offer flexible ongoing website maintenance packages for regular updates, security monitoring, and new page additions.',
      },
      {
        question: 'Do you help write the website content and copywriting?',
        answer:
          'Yes. We help structure your value proposition, write compelling headline hooks, organize service deliverables, and polish your business copy.',
      },
    ],
    relatedSlugs: ['seo', 'branding', 'local-seo'],
    iconKey: 'globe',
    iconGradient: 'from-[#F59E0B] to-[#F97316]',
    strategicFocus: 'Responsive architecture & conversion-focused UX',
  },
  {
    slug: 'branding',
    aliases: ['branding-logo-design', 'logo-design'],
    number: '05',
    title: 'Branding & Logo Design',
    tagline: 'Distinctive Visual Identity Systems That Command Authority & Trust',
    heroHeadline: 'Memorable Brand Identities That Set Your Business Apart',
    heroDescription:
      'Establish an authoritative, cohesive visual identity with custom logo design, color architecture, typography standards, business collateral, and comprehensive brand guidelines.',
    startingPrice: 49,
    billingType: 'project',
    pricingSubtitle: 'From $49 starting project rate · Vector master files',
    priceExplanation:
      'Introductory brand packages start at $49 for essential logo design and color specifications. Comprehensive corporate identity systems including complete brand guidelines books, stationery suites, and social kits are quoted based on deliverable requirements.',
    introduction: [
      'Branding is far more than just a logo; it is the immediate emotional impression, perceived quality, and subconscious trust your business projects. In competitive markets, visual inconsistency makes a business look amateur and undermines pricing power.',
      'ZENVEXA designs complete brand identity systems that look pristine across digital screens, physical merchandise, stationery, and social media. We ensure your business is immediately recognizable and commanding.',
      'From custom geometric marks and wordmarks to harmonious color palettes and documented brand guidelines, we build visual identities that founders and teams are proud to showcase.',
    ],
    subServices: [
      {
        title: 'Custom Primary & Secondary Logo Design',
        description:
          'Memorable, versatile vector logo marks crafted for high legibility across dark and light surfaces, favicons, and signage.',
        keyDeliverable: 'Master vector logo files (SVG, PNG, EPS, PDF)',
      },
      {
        title: 'Brand Color Architecture & Contrast Rules',
        description:
          'Curated primary, secondary, and accent palettes with precise HEX, RGB, and CMYK color codes tested for digital contrast.',
        keyDeliverable: 'Complete color specification guide',
      },
      {
        title: 'Typography System & Font Pairing',
        description:
          'Selecting distinctive, authoritative display fonts and readable body typefaces that elevate your brand communication.',
        keyDeliverable: 'Typography hierarchy documentation',
      },
      {
        title: 'Corporate Brand Guidelines Book',
        description:
          'A clear rulebook outlining logo clearspace, minimum sizes, color usage, incorrect applications, and styling rules.',
        keyDeliverable: 'Comprehensive Brand Guidelines PDF',
      },
      {
        title: 'Business Cards & Stationery Collateral',
        description:
          'Print-ready business card designs, letterheads, invoice templates, and email signatures reflecting your identity.',
        keyDeliverable: 'Print-ready corporate stationery files',
      },
      {
        title: 'Social Media Branding Suite',
        description:
          'High-resolution profile avatars, banner cover graphics, and story highlight icons for Instagram, Facebook, and LinkedIn.',
        keyDeliverable: 'Ready-to-use social profile branding kit',
      },
    ],
    benefits: [
      {
        title: 'Immediate Premium Perception',
        description:
          'Professional branding allows you to command higher prices by signaling high standards, reliability, and established authority.',
        impactMetric: 'Elevated Pricing Power',
      },
      {
        title: 'Instant Brand Recognition',
        description:
          'A consistent visual identity ensures prospects immediately recognize your content and remember your name across channels.',
        impactMetric: 'Memorable Market Recall',
      },
      {
        title: 'Team & Vendor Alignment',
        description:
          'A documented brand guidelines book ensures future designers, marketers, and print shops never distort your visual standards.',
        impactMetric: '100% Visual Consistency',
      },
      {
        title: 'Long-Term Brand Equity',
        description:
          'A well-crafted brand identity is an enduring business asset that gains recognition and commercial value over years of operation.',
        impactMetric: 'Enduring Business Equity',
      },
    ],
    process: [
      {
        step: '01',
        title: 'Brand Discovery & Visual Direction',
        description:
          'We explore your company values, industry positioning, aesthetic preferences, and competitor landscape to set the creative tone.',
        deliverable: 'Creative Brief & Moodboard',
      },
      {
        step: '02',
        title: 'Logo Concept Exploration',
        description:
          'We craft multiple distinct logo design directions showcasing how the marks look in monochrome, color, and real-world mockups.',
        deliverable: 'Initial Concept Presentation',
      },
      {
        step: '03',
        title: 'Refinement & System Expansion',
        description:
          'You choose the winning concept, and we refine geometry, lock up typography, finalize color palettes, and design collateral.',
        deliverable: 'Collateral & Color Palette Refinement',
      },
      {
        step: '04',
        title: 'Master File Delivery & Guidelines',
        description:
          'We package all vector formats, high-res web exports, social media kits, and your official Brand Guidelines book.',
        deliverable: 'Complete Master Brand Package',
      },
    ],
    faqs: [
      {
        question: 'What file formats do I receive for my logo?',
        answer:
          'You receive full vector master files (AI, EPS, SVG, PDF) which can scale infinitely without pixelation, along with high-resolution PNGs with transparent backgrounds and JPG files for all digital uses.',
      },
      {
        question: 'How many logo concepts do you present initially?',
        answer:
          'We present 2–3 thoroughly developed, unique concept directions during the initial review, each with different design angles tailored to your brand personality.',
      },
      {
        question: 'Do I get full commercial copyright ownership of my logo?',
        answer:
          'Yes, 100%. Upon final project delivery and settlement, full commercial intellectual property and copyright ownership of the chosen logo mark belongs entirely to you.',
      },
      {
        question: 'Can you redesign or modernize my existing logo?',
        answer:
          'Yes. We frequently help established businesses modernize dated logos while preserving their core brand recognition and customer familiarity.',
      },
      {
        question: 'What is included in the Brand Guidelines book?',
        answer:
          'The guidelines book covers logo variations, proper clearspace margins, minimum display sizes, primary and secondary color formulas (HEX, RGB, CMYK), typography rules, and what NOT to do with the logo.',
      },
    ],
    relatedSlugs: ['website-development', 'social-media-management', 'marketing-strategy'],
    iconKey: 'palette',
    iconGradient: 'from-[#8B5CF6] to-[#6D28D9]',
    strategicFocus: 'Memorable visual identity & cohesive brand systems',
  },
  {
    slug: 'email-marketing',
    aliases: ['email-campaigns', 'email-automation'],
    number: '06',
    title: 'Email Marketing',
    tagline: 'Nurture Prospects, Retain Customers & Drive Repeat Business',
    heroHeadline: 'Direct Email Campaigns That Turn Subscribers Into Loyal Customers',
    heroDescription:
      'Build predictable revenue from your audience through beautifully branded email newsletters, automated lead-nurturing workflows, and high-converting promotional campaigns.',
    startingPrice: 99,
    billingType: 'month',
    pricingSubtitle: 'From $99/month · Direct customer retention',
    priceExplanation:
      'Email marketing management starts at $99/month for bi-weekly campaign design, copywriting, and broadcast management. Comprehensive daily e-commerce flows, custom CRM migrations, and high-frequency schedules are custom quoted.',
    introduction: [
      'Email marketing remains one of the highest-ROI direct marketing channels in the world because you own the audience relationship completely free from social media algorithm shifts or rising pay-per-click costs.',
      'Sending structured, value-packed newsletters and automated welcome sequences keeps your brand top of mind, educates leads on your solutions, and consistently generates repeat inquiries.',
      'ZENVEXA plans, designs, writes, and monitors email marketing campaigns that land in the primary inbox, engage readers with clean layouts, and drive decisive action.',
    ],
    subServices: [
      {
        title: 'Campaign Strategy & Editorial Calendars',
        description:
          'Mapping out seasonal promotions, company milestones, customer case studies, and educational roundups to engage your list.',
        keyDeliverable: 'Monthly email broadcast schedule',
      },
      {
        title: 'Branded Responsive Newsletter Design',
        description:
          'Clean, mobile-optimized email templates that display crisply across Apple Mail, Gmail, Outlook, and all mobile screens.',
        keyDeliverable: 'Custom reusable email templates',
      },
      {
        title: 'Automated Lead-Nurture & Welcome Flows',
        description:
          'Multi-step automated email sequences that greet new inquiries, introduce your services, and guide them toward consultations.',
        keyDeliverable: 'Automated evergreen drip sequences',
      },
      {
        title: 'Persuasive Subject Lines & Copywriting',
        description:
          'Writing compelling subject lines that boost open rates, paired with clear, readable body copy that drives click-throughs.',
        keyDeliverable: 'High-open copywriting & CTAs',
      },
      {
        title: 'Audience Segmentation & List Hygiene',
        description:
          'Segmenting your contacts based on past inquiries, services of interest, and engagement levels to maximize relevancy.',
        keyDeliverable: 'Targeted subscriber segments',
      },
      {
        title: 'Deliverability & Open Rate Analytics',
        description:
          'Monitoring deliverability, bounce rates, open rates, and click performance with ongoing subject line and timing refinements.',
        keyDeliverable: 'Monthly campaign analytics report',
      },
    ],
    benefits: [
      {
        title: 'Direct Owned Audience Channel',
        description:
          'No algorithms or ad platforms stand between you and your customers. Your message arrives directly in their personal inboxes.',
        impactMetric: '100% Owned Channel',
      },
      {
        title: 'High Commercial Return on Investment',
        description:
          'Consistently nurturing past clients and active inquiries drives repeat purchases and referrals at minimal incremental cost.',
        impactMetric: 'Industry-Leading ROI',
      },
      {
        title: 'Automated Evergreen Conversion',
        description:
          'Welcome sequences work for your business 24/7, warming up new inquiries while your team focuses on daily operations.',
        impactMetric: '24/7 Automated Nurturing',
      },
      {
        title: 'Stronger Customer Retention',
        description:
          'Regular educational updates keep your clients informed of new services, case studies, and seasonal opportunities.',
        impactMetric: 'Lower Customer Churn',
      },
    ],
    process: [
      {
        step: '01',
        title: 'List & Platform Setup',
        description:
          'We evaluate your email platform (Mailchimp, Brevo, Klaviyo, etc.), verify domain authentication (DKIM, SPF), and organize your lists.',
        deliverable: 'Platform Configuration & Verification',
      },
      {
        step: '02',
        title: 'Branded Template Design',
        description:
          'We design responsive email templates aligned with your typography, brand colors, and core visual identity.',
        deliverable: 'Approved Master Email Template',
      },
      {
        step: '03',
        title: 'Copywriting & Sequence Setup',
        description:
          'We draft campaign copy, write clickable subject lines, configure automated triggers, and submit them for your review.',
        deliverable: 'Campaign Copy & Automated Workflows',
      },
      {
        step: '04',
        title: 'Broadcast & Optimization',
        description:
          'We schedule broadcasts at optimal sending hours, monitor delivery rates, and analyze clicks to continuously improve results.',
        deliverable: 'Monthly Deliverability & Click Review',
      },
    ],
    faqs: [
      {
        question: 'Which email platforms do you support?',
        answer:
          'We work with Mailchimp, Brevo (Sendinblue), Klaviyo, ActiveCampaign, Constant Contact, and custom webhook-based email systems.',
      },
      {
        question: 'How do you ensure emails don’t land in spam?',
        answer:
          'We configure critical domain authentication records (SPF, DKIM, and DMARC), avoid spam-trigger words, maintain clean subscriber lists, and ensure proper mobile rendering.',
      },
      {
        question: 'Can you help build automated welcome emails for new inquiries?',
        answer:
          'Yes! Automated welcome and lead-nurturing series are one of our highest-impact services, ensuring every new contact receives prompt, professional follow-up.',
      },
      {
        question: 'How often should my business send emails?',
        answer:
          'For most B2B and service businesses, 2 to 4 high-quality emails per month deliver the best balance of staying top-of-mind without causing subscriber fatigue.',
      },
      {
        question: 'Do I need an existing email list to get started?',
        answer:
          'If you already have past clients and inquiries, we help import and clean your list. If you are starting fresh, we build lead-capture forms and opt-in incentives to grow your list organically.',
      },
    ],
    relatedSlugs: ['marketing-strategy', 'meta-ads', 'website-development'],
    iconKey: 'mail',
    iconGradient: 'from-[#7C3AED] to-[#4F46E5]',
    strategicFocus: 'Direct audience nurturing & repeat customer engagement',
  },
  {
    slug: 'google-business-profile',
    aliases: ['gbp-management', 'google-maps'],
    number: '07',
    title: 'Google Business Profile Management',
    tagline: 'Capture Nearby Customers Searching on Google Maps & Local Search',
    heroHeadline: 'Optimize & Grow Your Google Business Profile for Maximum Calls',
    heroDescription:
      'Improve your local search discovery and credibility on Google Maps with complete profile optimization, weekly updates, product showcases, and proactive review management.',
    startingPrice: 79,
    billingType: 'month',
    pricingSubtitle: 'From $79/month · Map Pack rankings',
    priceExplanation:
      'Google Business Profile management starts at $79/month for ongoing updates, photo management, review response guidance, and monthly insights reporting. Multi-location enterprises are quoted based on location volume.',
    introduction: [
      'When local customers search for businesses in their city or neighborhood, the Google Map 3-Pack is the first thing they see. An unoptimized or abandoned profile loses dozens of calls to competitors every single week.',
      'A thriving Google Business Profile requires ongoing attention: complete and verified category selections, geo-tagged photo uploads, weekly Google updates, service catalog descriptions, and prompt review interactions.',
      'ZENVEXA actively manages and optimizes your Google Business Profile to boost local rankings, highlight your latest offerings, and convert nearby searchers into direct phone calls and inquiries.',
    ],
    subServices: [
      {
        title: 'Full Profile Audit & Category Alignment',
        description:
          'Selecting optimal primary and secondary Google business categories, defining exact service areas, and completing all profile attributes.',
        keyDeliverable: 'Optimized profile configuration',
      },
      {
        title: 'Service & Product Catalog Showcase',
        description:
          'Structuring clear service descriptions, pricing points, and visual highlights directly within your Google profile catalog.',
        keyDeliverable: 'Complete in-profile service catalog',
      },
      {
        title: 'Weekly Google Posts & Promotional Updates',
        description:
          'Publishing weekly updates, seasonal offers, and announcements on Google to signal continuous business activity to the algorithm.',
        keyDeliverable: 'Weekly active Google posts',
      },
      {
        title: 'Photo Uploads & Visual Management',
        description:
          'Regularly uploading high-quality photos of your work, facility, team, and projects to increase customer trust and profile views.',
        keyDeliverable: 'Curated photo asset uploads',
      },
      {
        title: 'Review Management & Response Strategy',
        description:
          'Providing review generation guidance and drafting professional, keyword-rich responses to positive and negative reviews.',
        keyDeliverable: 'Professional review response workflows',
      },
      {
        title: 'Google Maps Insights & Call Tracking',
        description:
          'Delivering monthly metrics on how customers found your profile (direct vs discovery searches), phone call counts, and direction requests.',
        keyDeliverable: 'Monthly Google Maps analytics report',
      },
    ],
    benefits: [
      {
        title: 'Dominant Google Map Pack Placement',
        description:
          'Active, optimized profiles rank significantly higher in the local 3-pack, putting your business ahead of inactive competitors.',
        impactMetric: 'Top 3 Local Map Visibility',
      },
      {
        title: 'Increased Inbound Phone Calls',
        description:
          'Mobile searchers can call your business directly from Google with a single tap, generating immediate, qualified inquiries.',
        impactMetric: 'Direct One-Tap Phone Calls',
      },
      {
        title: 'Instant Customer Trust & Social Proof',
        description:
          'A rich profile with recent photos, verified details, and professional review responses establishes immediate buyer confidence.',
        impactMetric: 'High Local Credibility',
      },
      {
        title: 'Zero Cost-Per-Click Map Discovery',
        description:
          'Organic Google Maps impressions and calls are completely free, making profile optimization an exceptionally high-ROI investment.',
        impactMetric: '100% Free Organic Clicks',
      },
    ],
    process: [
      {
        step: '01',
        title: 'Profile Audit & Verification',
        description:
          'We inspect your existing Google Business Profile, identify missing attributes, and assist with verification if required.',
        deliverable: 'Profile Audit & Verification Check',
      },
      {
        step: '02',
        title: 'Complete Category & Catalog Overhaul',
        description:
          'We rewrite business descriptions, optimize primary and secondary categories, and populate all services and products.',
        deliverable: 'Fully Optimized Profile Data',
      },
      {
        step: '03',
        title: 'Weekly Posting & Photo Schedule',
        description:
          'We establish a weekly cadence of Google updates, offer announcements, and high-resolution photo uploads.',
        deliverable: 'Ongoing Weekly Content Cadence',
      },
      {
        step: '04',
        title: 'Monthly Review & Search Insights',
        description:
          'We review search performance trends, track phone call volume and direction requests, and recommend refinements.',
        deliverable: 'Monthly Search & Call Analytics',
      },
    ],
    faqs: [
      {
        question: 'What if my Google Business Profile is not verified yet?',
        answer:
          'We guide you through Google’s official verification process (via video, postcard, or phone code depending on Google’s requirements for your region).',
      },
      {
        question: 'Can you help remove fake or unfair negative reviews?',
        answer:
          'We assist in reporting policy-violating reviews to Google support and write professional, de-escalating public responses that protect your business reputation.',
      },
      {
        question: 'Do Google Business Posts really help rankings?',
        answer:
          'Yes! Regular posts demonstrate active business operations to Google’s ranking algorithms and provide valuable keyword signals while engaging mobile searchers.',
      },
      {
        question: 'Does this service cover multiple branch locations?',
        answer:
          'Our starting package covers one primary business location. We offer scalable bundled pricing for businesses managing multiple physical branches or service locations.',
      },
      {
        question: 'How do I track calls generated by my Google Profile?',
        answer:
          'Google provides detailed call analytics inside your Business Profile manager, and we summarize total monthly calls, website clicks, and discovery searches in your monthly report.',
      },
    ],
    relatedSlugs: ['local-seo', 'seo', 'website-development'],
    iconKey: 'mapPin',
    iconGradient: 'from-[#10B981] to-[#059669]',
    strategicFocus: 'Local search discovery & profile trust building',
  },
  {
    slug: 'local-seo',
    aliases: ['local-seo-lead-generation'],
    number: '08',
    title: 'Local SEO & Lead Generation',
    tagline: 'Win Your Local Market with Regional Keywords & Map Domination',
    heroHeadline: 'Targeted Local SEO That Fills Your Pipeline with Nearby Clients',
    heroDescription:
      'Attract qualified local customers through city-specific keyword optimization, NAP consistency, local citations, and conversion-engineered local landing pages.',
    startingPrice: 129,
    billingType: 'month',
    pricingSubtitle: 'From $129/month · Regional market capture',
    priceExplanation:
      'Local SEO packages start at $129/month covering your primary city and core services. Multi-city coverage, state-wide service areas, or hyper-competitive metropolitan areas are quoted based on target radius and competitive difficulty.',
    introduction: [
      'Service businesses, agencies, clinics, contractors, legal professionals, and retail stores thrive on regional demand. When high-value customers search for "near me" or specific city services, they are ready to purchase immediately.',
      'Local SEO connects that regional search intent directly with your business. We build local search authority by synchronizing your Name, Address, and Phone (NAP) citations across top business directories, optimizing localized landing pages, and capturing competitive local phrases.',
      'ZENVEXA builds a fortress around your local market presence, helping you outrank local competitors and turn regional search queries into consistent telephone and form inquiries.',
    ],
    subServices: [
      {
        title: 'Local Keyword & Competitor Gap Analysis',
        description:
          'Identifying city-specific, high-intent local search queries and uncovering areas where local competitors are vulnerable.',
        keyDeliverable: 'Localized keyword ranking targets',
      },
      {
        title: 'NAP Consistency & Directory Citations',
        description:
          'Auditing, standardizing, and building business citations across top local directories to establish trust with Google’s local algorithm.',
        keyDeliverable: 'Verified local business citations',
      },
      {
        title: 'Local Landing Page Optimization',
        description:
          'Structuring dedicated, fast-loading service-area landing pages with localized H1-H3 tags, maps embeds, and localized FAQs.',
        keyDeliverable: 'Geo-targeted landing page optimization',
      },
      {
        title: 'Google Maps Ranking Signals Optimization',
        description:
          'Optimizing proximity, relevance, and prominence signals that push your business into the top 3 Google Map results.',
        keyDeliverable: 'Map 3-Pack placement strategy',
      },
      {
        title: 'Local Authority & Community Link Building',
        description:
          'Securing local mentions, regional business directory links, and community partnerships that boost local domain relevance.',
        keyDeliverable: 'High-trust local backlink signals',
      },
      {
        title: 'Inbound Lead Tracking & Ranking Reports',
        description:
          'Tracking local search rankings across your service radius, monitoring phone call conversions, and reporting progress monthly.',
        keyDeliverable: 'Comprehensive local SEO report',
      },
    ],
    benefits: [
      {
        title: 'Capture Highest-Intent Local Buyers',
        description:
          'Local searchers have immediate commercial intent. Ranking at the top captures customers at the exact moment they need a provider.',
        impactMetric: 'High Inbound Conversion',
      },
      {
        title: 'Outrank Nearby Competitors',
        description:
          'Systematic citation building and localized page optimization consistently push your business ahead of regional competitors.',
        impactMetric: 'Local Market Dominance',
      },
      {
        title: 'Higher Conversion Than Generic Traffic',
        description:
          'Nearby clients convert at substantially higher rates because proximity, local trust, and shared geography eliminate friction.',
        impactMetric: 'Superior Lead Quality',
      },
      {
        title: 'Durable Community Reputation',
        description:
          'A strong local search footprint cements your standing as an established, trustworthy institution in your geographic market.',
        impactMetric: 'Compounding Regional Trust',
      },
    ],
    process: [
      {
        step: '01',
        title: 'Local Market & Citation Audit',
        description:
          'We analyze your local competitors, map visibility, NAP consistency across the web, and existing local landing pages.',
        deliverable: 'Local Baseline & Citation Audit',
      },
      {
        step: '02',
        title: 'NAP Cleanup & Directory Citations',
        description:
          'We correct mismatched directory listings and submit clean, standardized citations to authoritative business portals.',
        deliverable: 'Clean Citation Network Deployment',
      },
      {
        step: '03',
        title: 'Localized On-Page & Schema Optimization',
        description:
          'We optimize your website’s localized content, embed Google Maps, and implement LocalBusiness schema markup.',
        deliverable: 'Geo-Optimized On-Page Structure',
      },
      {
        step: '04',
        title: 'Local Rank Tracking & Lead Monitoring',
        description:
          'We track local map pack rankings, monitor phone and form inquiries, and refine strategy to expand your service radius.',
        deliverable: 'Monthly Local Search Report',
      },
    ],
    faqs: [
      {
        question: 'What is NAP consistency and why does it matter?',
        answer:
          'NAP stands for Name, Address, and Phone number. If your business details differ across directories (e.g. "St." vs "Street"), Google loses confidence in your location data. We ensure complete standardization.',
      },
      {
        question: 'Can I rank for multiple cities or service areas?',
        answer:
          'Yes. We build dedicated, high-quality service-area landing pages targeting each individual municipality or neighborhood without creating duplicate content.',
      },
      {
        question: 'Do I need a physical storefront to do Local SEO?',
        answer:
          'Not necessarily. If you operate a service-area business (such as home services, consulting, or mobile agencies), we configure your profiles as a verified Service Area Business (SAB) without publicly displaying a home address.',
      },
      {
        question: 'How does Local SEO work alongside Google Business Profile?',
        answer:
          'They reinforce each other. Your website’s local SEO signals provide organic relevance, which directly feeds into higher rankings in Google Maps.',
      },
      {
        question: 'What kind of leads will I receive?',
        answer:
          'You receive direct phone inquiries, WhatsApp consultation messages, and website quote requests from customers living or operating in your targeted geographic radius.',
      },
    ],
    relatedSlugs: ['google-business-profile', 'seo', 'website-development'],
    iconKey: 'compass',
    iconGradient: 'from-[#06B6D4] to-[#2563EB]',
    strategicFocus: 'Regional map visibility & inbound customer inquiries',
  },
  {
    slug: 'marketing-strategy',
    aliases: ['marketing-strategy-analytics', 'digital-strategy'],
    number: '09',
    title: 'Marketing Strategy & Analytics',
    tagline: 'Data-Driven Growth Roadmaps Rooted in Research, Not Guesswork',
    heroHeadline: 'Comprehensive Marketing Strategy & Growth Analytics Roadmaps',
    heroDescription:
      'Gain clarity on where your growth comes from with custom marketing blueprints, audience research, competitor teardowns, tracking architecture, and clear ROI reporting.',
    startingPrice: 79,
    billingType: 'project',
    pricingSubtitle: 'From $79 starting project rate · Actionable roadmap',
    priceExplanation:
      'Strategy consultations and growth roadmaps start at $79 for introductory audits. Comprehensive multi-quarter plans, multi-channel funnel architectures, and ongoing CMO-level advisory are quoted based on organization complexity.',
    introduction: [
      'Executing digital marketing tactics without an overarching strategy leads to wasted budgets, conflicting messaging, and erratic results. Jumping between ad campaigns, social posts, and website tweaks without clear attribution leaves founders guessing what actually works.',
      'A structured marketing plan aligns your unique commercial value proposition, ideal customer personas, customer acquisition channels, and conversion touchpoints into a unified roadmap.',
      'ZENVEXA develops pragmatic, data-driven digital growth strategies tailored to businesses scaling in Pakistan, the US, and global markets. We replace guesswork with clarity and actionable execution plans.',
    ],
    subServices: [
      {
        title: 'Audience & Competitor Intelligence Audit',
        description:
          'In-depth research dissecting competitor positioning, pricing strategies, market gaps, and customer buying triggers.',
        keyDeliverable: 'Comprehensive Competitive Matrix',
      },
      {
        title: 'Multi-Channel Growth Roadmap',
        description:
          'A prioritized quarterly action plan detailing which channels (SEO, Meta Ads, Email, Website) to deploy and when.',
        keyDeliverable: 'Actionable 90-Day Growth Blueprint',
      },
      {
        title: 'Value Proposition & Offer Architecture',
        description:
          'Refining your service packaging, pricing tiers, and commercial guarantees to make your offer irresistible to ideal clients.',
        keyDeliverable: 'High-Converting Offer Framework',
      },
      {
        title: 'Analytics, Tagging & Tracking Setup',
        description:
          'Configuring Google Analytics 4 (GA4), conversion event tagging, and attribution models so every dollar spent is tracked.',
        keyDeliverable: 'Verified GA4 & event tracking setup',
      },
      {
        title: 'Conversion Funnel & Friction Auditing',
        description:
          'Analyzing your user journey from ad or search click to inquiry, eliminating drop-off points, and increasing lead conversion.',
        keyDeliverable: 'Conversion Funnel Audit & Action Items',
      },
      {
        title: 'Ongoing Strategic Growth Reviews',
        description:
          'Regular advisory sessions analyzing progress against KPIs, identifying emerging opportunities, and reallocating resources.',
        keyDeliverable: 'Bi-weekly or monthly strategy advisory',
      },
    ],
    benefits: [
      {
        title: 'Elimination of Wasted Marketing Budgets',
        description:
          'Stop spending money on random tactics that don’t align with your business model. Focus exclusively on validated high-return channels.',
        impactMetric: 'Zero Budget Waste',
      },
      {
        title: 'Clear Cross-Channel Synergy',
        description:
          'Ensure your paid advertising, social media presence, website UX, and email sequences reinforce each other into one cohesive engine.',
        impactMetric: 'Integrated Funnel Synergy',
      },
      {
        title: 'Accurate Attribution & Tracking',
        description:
          'Know exactly which marketing channel produces your most profitable leads and highest customer lifetime values.',
        impactMetric: 'Full Revenue Visibility',
      },
      {
        title: 'Confidence in Strategic Scaling',
        description:
          'Make hiring, marketing investment, and operational decisions backed by verifiable data rather than gut assumptions.',
        impactMetric: 'Predictable Growth Decisions',
      },
    ],
    process: [
      {
        step: '01',
        title: 'Business Discovery & KPI Benchmark',
        description:
          'We evaluate your historical sales data, current customer acquisition channels, profit margins, and 12-month revenue goals.',
        deliverable: 'Discovery Assessment & KPI Baseline',
      },
      {
        step: '02',
        title: 'Market Research & Competitor Teardown',
        description:
          'We analyze competitor positioning, pricing strategies, customer feedback, and untapped keyword/audience segments.',
        deliverable: 'Competitive Intelligence Report',
      },
      {
        step: '03',
        title: 'Strategy Formulation & Roadmap Creation',
        description:
          'We design your end-to-end growth blueprint, outlining channel allocations, messaging frameworks, and budget distribution.',
        deliverable: 'Master Digital Growth Blueprint',
      },
      {
        step: '04',
        title: 'Implementation Guidance & Review',
        description:
          'We assist your team or our execution specialists in deploying the roadmap, reviewing performance metrics every cycle.',
        deliverable: 'Ongoing Strategic Alignment Reviews',
      },
    ],
    faqs: [
      {
        question: 'Who is this strategy service designed for?',
        answer:
          'This service is ideal for ambitious business owners, startups, and service firms who want to scale systematically and avoid wasting money on disjointed marketing tactics.',
      },
      {
        question: 'Can ZENVEXA execute the strategy after creating it?',
        answer:
          'Yes! That is our primary advantage: ZENVEXA is a full-service agency capable of seamlessly handling the design, website development, SEO, and paid ad management recommended in the roadmap.',
      },
      {
        question: 'What analytics tools do you work with?',
        answer:
          'We primarily configure Google Analytics 4 (GA4), Google Tag Manager, Meta Pixel/CAPI, Google Search Console, and customized lead-tracking spreadsheets.',
      },
      {
        question: 'How long does it take to deliver a custom growth roadmap?',
        answer:
          'An initial strategic audit is delivered within 3–5 business days, while comprehensive multi-channel growth blueprints take approximately 10–14 business days.',
      },
      {
        question: 'What if we already have an in-house marketing team?',
        answer:
          'We regularly collaborate with in-house teams, acting as strategic advisors providing high-level growth frameworks, technical audits, and specialized guidance.',
      },
    ],
    relatedSlugs: ['meta-ads', 'seo', 'social-media-management'],
    iconKey: 'lineChart',
    iconGradient: 'from-[#4F46E5] to-[#EC4899]',
    strategicFocus: 'Research-backed roadmaps & performance clarity',
  },
];

export function getServiceBySlug(slugOrAlias: string): DetailedService | undefined {
  const normalized = slugOrAlias.trim().toLowerCase();
  return DETAILED_SERVICES_DATA.find(
    (s) => s.slug === normalized || s.aliases?.includes(normalized)
  );
}
