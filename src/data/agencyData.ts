export type RoutePath =
  | '/'
  | '/about'
  | '/services'
  | '/services/social-media-management'
  | '/services/meta-ads'
  | '/services/seo'
  | '/services/website-development'
  | '/services/branding'
  | '/services/email-marketing'
  | '/services/google-business-profile'
  | '/services/local-seo'
  | '/services/marketing-strategy'
  | '/team'
  | '/portfolio'
  | '/pricing'
  | '/blog'
  | '/contact'
  | '/portal'
  | '/workspace'
  | (string & {});

export interface NavItem {
  label: string;
  path: RoutePath;
}

export type ServiceIconKey =
  | 'search'
  | 'share'
  | 'megaphone'
  | 'globe'
  | 'palette'
  | 'mail'
  | 'mapPin'
  | 'compass'
  | 'lineChart';

export interface ServiceItem {
  id: string;
  slug: string;
  number: string;
  title: string;
  pricingTitle: string;
  description: string;
  deliverables: string[];
  startingPrice?: number;
  billingType?: 'month' | 'project';
  iconKey: ServiceIconKey;
  iconGradient: string;
  strategicFocus: string;
}

export interface TeamStructureItem {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  responsibilities: string[];
}

export interface CoreValueItem {
  title: string;
  description: string;
}

export interface WhyChooseItem {
  number: string;
  title: string;
  description: string;
}

export interface ProcessStepItem {
  step: string;
  title: string;
  description: string;
  detail: string;
}

export const COMPANY_INFO = {
  name: 'ZENVEXA Digital Agency',
  shortName: 'ZENVEXA',
  tagline: 'We Build. We Market. We Scale.',
  founder: 'Anis',
  founderTitle: 'Founder & Strategic Director',
  founderPhone: '03436481298',
  founderPhoneInternational: '+92 343 6481298',
  founderWhatsappDisplay: '03436481298',
  founderWhatsappBaseUrl: 'https://wa.me/923436481298',
  representative: 'Awais',
  representativeTitle: 'Co-Founder & Client Operations',
  representativePhone: '03133651635',
  representativePhoneInternational: '+92 313 3651635',
  representativeWhatsappDisplay: '03133651635',
  representativeWhatsappBaseUrl: 'https://wa.me/923133651635',
  location: 'Pakistan',
  targetMarkets: 'Pakistan · United States · International Markets',
  description:
    'ZENVEXA is a Pakistan-based digital agency providing complete digital marketing, branding, website development, and business growth solutions.',
  extendedDescription:
    'We help businesses establish a stronger online presence, connect with relevant customers, improve their brand identity, and grow through professional digital strategies.',
  logoPath: '/assets/aistudio/DFDE557A-BA98-44FF-BFF9-FC89A8D5B1C0_106ec586.png',
  whatsappDisplay: '03436481298',
  whatsappInternational: '+92 343 6481298',
  whatsappBaseUrl: 'https://wa.me/923436481298',
  email: 'zenvexahub@gmail.com',
  instagramUrl:
    'https://www.instagram.com/zenvexahub?srtk=MWtsNGtrdHM2aGpwNw%3D%3D&utm_source=qr',
  facebookUrl: 'https://www.facebook.com/share/1E41z5AwGd/?mibextid=wwXIfr',
} as const;

export function buildWhatsAppUrl(
  customMessage?: string,
  recipient: 'anis' | 'awais' = 'anis'
): string {
  const recipientName = recipient === 'awais' ? 'Awais' : 'Anis';
  const defaultMsg = `Hello ${recipientName} (ZENVEXA Digital Agency), I would like to consult on digital growth for my business.`;
  const text = encodeURIComponent(customMessage || defaultMsg);
  const baseUrl =
    recipient === 'awais'
      ? COMPANY_INFO.representativeWhatsappBaseUrl
      : COMPANY_INFO.founderWhatsappBaseUrl;
  return `${baseUrl}?text=${text}`;
}

export function buildAwaisWhatsAppUrl(customMessage?: string): string {
  return buildWhatsAppUrl(customMessage, 'awais');
}

export function buildPhoneCallUrl(phoneNumber: string): string {
  const digits = phoneNumber.replace(/[^0-9+]/g, '');
  return `tel:${digits}`;
}

export function buildMailtoUrl(subject?: string, body?: string): string {
  const mailSubject = encodeURIComponent(
    subject || 'Business Inquiry — ZENVEXA Digital Agency'
  );
  const mailBody = encodeURIComponent(
    body ||
      'Hello ZENVEXA Team,\n\nI would like to discuss digital services for my business.\n\nBusiness Name:\nService Needed:\nGoals / Timeline:\n'
  );
  return `mailto:${COMPANY_INFO.email}?subject=${mailSubject}&body=${mailBody}`;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'About Us', path: '/about' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Pricing', path: '/pricing' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact Us', path: '/contact' },
];

export const FOOTER_QUICK_LINKS: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'About Us', path: '/about' },
  { label: 'Our Team', path: '/team' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Pricing', path: '/pricing' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
  { label: 'Client Portal', path: '/portal' },
  { label: 'Google Workspace', path: '/workspace' },
];

export const ROUTE_SEO: Record<
  RoutePath,
  { title: string; description: string }
> = {
  '/': {
    title:
      'ZENVEXA Digital Agency | Digital Marketing, Branding & Web Development',
    description:
      'ZENVEXA Digital Agency helps businesses grow through social media management, Facebook and Instagram advertising, SEO, website development, branding, and complete digital marketing solutions.',
  },
  '/about': {
    title: 'About Us | ZENVEXA Digital Agency — Your Partner in Digital Growth',
    description:
      'Learn about ZENVEXA Digital Agency, founded by Anis and represented by Awais in Pakistan, serving businesses across Pakistan, the United States, and international markets.',
  },
  '/services': {
    title: 'Our Services | ZENVEXA Digital Agency — Marketing, SEO & Web Design',
    description:
      'Explore ZENVEXA’s digital services: SEO, Social Media Management, Facebook & Instagram Ads, Website Development, Branding, Email Marketing, Google Business Profile, Local SEO, and Strategy.',
  },
  '/team': {
    title: 'Our Team Structure | ZENVEXA Digital Agency',
    description:
      'Discover how ZENVEXA operates seamlessly through our In-House Team, Remote Team, and Specialist Network to deliver reliable creative and technical execution.',
  },
  '/portfolio': {
    title: 'Portfolio | ZENVEXA Digital Agency — Creative Work & Capabilities',
    description:
      'Browse ZENVEXA Digital Agency concept showcases across website development, social media design, branding & logo design, marketing campaigns, and advertising creatives.',
  },
  '/pricing': {
    title: 'Pricing & Packages | ZENVEXA Digital Agency — Transparent USD Rates',
    description:
      'Affordable, transparent introductory USD pricing for small and medium businesses across social media management, Meta ads, SEO, website development, and branding.',
  },
  '/blog': {
    title: 'Digital Marketing & Growth Blog | ZENVEXA Digital Agency',
    description:
      'Actionable guides on SEO, Meta advertising, website conversion, branding, and local search growth for founders and modern businesses.',
  },
  '/contact': {
    title: 'Contact Us | ZENVEXA Digital Agency — Get a Free Quote',
    description:
      'Connect with ZENVEXA Digital Agency via WhatsApp, email, or our online project inquiry form to discuss your branding, website development, or digital marketing goals.',
  },
  '/portal': {
    title: 'Client & Agency Portal | ZENVEXA Digital Agency',
    description:
      'Sign in to track your ZENVEXA project inquiries, manage agency portfolio items, and moderate verified client reviews.',
  },
  '/workspace': {
    title: 'Google Workspace Hub (Slides & Gmail) | ZENVEXA Digital Agency',
    description:
      'Manage client growth presentations in Google Slides and communicate directly via Gmail integrated into ZENVEXA.',
  },
  '/services/social-media-management': {
    title: 'Social Media Management | ZENVEXA Digital Agency',
    description:
      'Turn social media profiles into active customer magnets with strategic monthly content planning, custom graphics, and responsive community interactions.',
  },
  '/services/meta-ads': {
    title: 'Facebook & Instagram Ads Management | ZENVEXA Digital Agency',
    description:
      'Targeted paid advertising campaigns on Meta engineered to generate qualified inbound leads, sales, and measurable return on ad spend.',
  },
  '/services/seo': {
    title: 'Search Engine Optimization (SEO) | ZENVEXA Digital Agency',
    description:
      'Improve organic Google search rankings with comprehensive keyword research, on-page optimization, technical SEO health, and authority building.',
  },
  '/services/website-development': {
    title: 'Website Development & Design | ZENVEXA Digital Agency',
    description:
      'Bespoke, high-converting business websites and landing pages built with modern responsive architecture, speed optimization, and lead capture UX.',
  },
  '/services/branding': {
    title: 'Branding & Logo Design | ZENVEXA Digital Agency',
    description:
      'Distinctive visual identities, logo marks, typography standards, color systems, and comprehensive brand guidelines books that build commercial trust.',
  },
  '/services/email-marketing': {
    title: 'Email Marketing & Automations | ZENVEXA Digital Agency',
    description:
      'Direct email marketing campaigns, branded newsletters, and automated nurture sequences that turn subscribers into repeat paying customers.',
  },
  '/services/google-business-profile': {
    title: 'Google Business Profile Management | ZENVEXA Digital Agency',
    description:
      'Optimize your Google Business Profile and local Google Maps discovery to capture nearby searchers and increase direct phone inquiries.',
  },
  '/services/local-seo': {
    title: 'Local SEO & Lead Generation | ZENVEXA Digital Agency',
    description:
      'Targeted local SEO strategies, directory citation consistency, and geo-targeted landing pages that outrank regional competitors.',
  },
  '/services/marketing-strategy': {
    title: 'Marketing Strategy & Growth Analytics | ZENVEXA Digital Agency',
    description:
      'Data-backed multi-channel growth roadmaps, audience research, competitor analysis, and GA4 tracking setup for clear marketing ROI.',
  },
};

/**
 * Verified agency highlights displayed horizontally beneath the Hero section.
 * Uses strictly factual ZENVEXA service and operational attributes (zero invented figures).
 */
export const HERO_HIGHLIGHTS = [
  {
    value: '9 Core',
    label: 'Digital Growth Disciplines',
  },
  {
    value: '3-Tier',
    label: 'Dedicated Team Structure',
  },
  {
    value: 'From $49',
    label: 'Transparent USD Starting Rates',
  },
  {
    value: 'Global',
    label: 'Pakistan, US & Worldwide Clients',
  },
] as const;

export const CORE_VALUES: CoreValueItem[] = [
  {
    title: 'Creativity',
    description:
      'Distinctive visual storytelling, purposeful design systems, and brand communication crafted to help your business stand out with clarity.',
  },
  {
    title: 'Innovation',
    description:
      'Modern web architecture, evolving platform strategies, and agile digital workflows adapted to today’s competitive online landscape.',
  },
  {
    title: 'Results-Driven Strategies',
    description:
      'Structured planning rooted in audience research, clear business priorities, and measurable progress toward sustainable growth.',
  },
];

export const TEAM_STRUCTURES: TeamStructureItem[] = [
  {
    id: 'in-house',
    title: 'In-House Team',
    shortDescription:
      'Professional collaboration and core project operations.',
    fullDescription:
      'Our core team handles agency operations, project coordination, creative work, and client communication.',
    responsibilities: [
      'Centralized project management and quality review',
      'Direct client communication and strategic alignment',
      'Core creative direction and brand consistency',
      'Timeline accountability across active engagements',
    ],
  },
  {
    id: 'remote',
    title: 'Remote Team',
    shortDescription:
      'Flexible collaboration and digital project execution.',
    fullDescription:
      'Our remote professionals collaborate on projects, manage digital operations, and support clients from different locations.',
    responsibilities: [
      'Responsive support across Pakistan, US, and global time zones',
      'Daily campaign management, scheduling, and publishing',
      'Continuous website updates and technical maintenance',
      'Agile execution across multi-channel marketing deliverables',
    ],
  },
  {
    id: 'specialist-network',
    title: 'Specialist Network',
    shortDescription:
      'Specialized expertise across different digital disciplines.',
    fullDescription:
      'We work with specialized professionals with expertise in different areas of digital marketing, branding, technology, and creative production.',
    responsibilities: [
      'Deep technical SEO and conversion-focused web development',
      'Specialized paid media buying and ad creative production',
      'Custom visual identity systems and brand guidelines',
      'On-demand domain specialists matched to project scope',
    ],
  },
];

export const LEADERSHIP_PROFILES = [
  {
    name: 'Anis',
    role: 'Founder & Strategic Director',
    phoneDisplay: '03436481298',
    phoneInternational: '+92 343 6481298',
    whatsappUrl: 'https://wa.me/923436481298',
    organization: 'ZENVEXA Digital Agency',
    focus: 'Agency Vision · Strategic Direction · Quality Standards',
    bio: 'Leads ZENVEXA’s overarching vision, service architecture, and commitment to delivering structured, reliable digital growth solutions for domestic and international businesses.',
  },
  {
    name: 'Awais',
    role: 'Co-Founder & Client Operations',
    phoneDisplay: '03133651635',
    phoneInternational: '+92 313 3651635',
    whatsappUrl: 'https://wa.me/923133651635',
    organization: 'ZENVEXA Digital Agency',
    focus: 'Client Partnerships · Consultation · Project Coordination',
    bio: 'Serves as primary agency representative for prospective and active partners, guiding consultations, scoping custom plans, and ensuring clear, transparent communication at every stage.',
  },
] as const;

/**
 * Complete ZENVEXA Services Catalog (all 8 core priced services + Email Marketing capability).
 */
export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'seo',
    slug: 'seo',
    number: '01',
    title: 'Search Engine Optimization (SEO)',
    pricingTitle: 'Search Engine Optimization (SEO)',
    description:
      'We improve website visibility on search engines through professional SEO strategies and optimization techniques.',
    deliverables: [
      'Keyword research',
      'On-page SEO',
      'Technical SEO',
      'Website optimization',
      'Content optimization',
      'SEO analysis',
      'Performance tracking',
    ],
    startingPrice: 149,
    billingType: 'month',
    iconKey: 'search',
    iconGradient: 'from-[#2563EB] to-[#0EA5E9]',
    strategicFocus: 'Sustainable organic search visibility & rankings',
  },
  {
    id: 'social-media-management',
    slug: 'social-media-management',
    number: '02',
    title: 'Social Media Management',
    pricingTitle: 'Social Media Management',
    description:
      'We manage business social media accounts through strategic content planning, creative post designs, audience engagement, and consistent brand communication.',
    deliverables: [
      'Social media account management',
      'Content planning',
      'Post and creative design',
      'Captions and hashtags',
      'Content scheduling',
      'Audience engagement',
      'Monthly performance reporting',
    ],
    startingPrice: 149,
    billingType: 'month',
    iconKey: 'share',
    iconGradient: 'from-[#EC4899] to-[#F43F5E]',
    strategicFocus: 'Consistent brand presence & community engagement',
  },
  {
    id: 'facebook-instagram-ads',
    slug: 'meta-ads',
    number: '03',
    title: 'Facebook & Instagram Ads',
    pricingTitle: 'Facebook & Instagram Ads Management',
    description:
      'We create and manage targeted advertising campaigns to help businesses reach potential customers, increase brand awareness, and generate leads.',
    deliverables: [
      'Campaign strategy',
      'Audience targeting',
      'Ad creative planning',
      'Campaign setup',
      'Performance monitoring',
      'Campaign optimization',
      'Reporting',
    ],
    startingPrice: 99,
    billingType: 'month',
    iconKey: 'megaphone',
    iconGradient: 'from-[#6A35FF] to-[#4361EE]',
    strategicFocus: 'Targeted paid acquisition & qualified lead generation',
  },
  {
    id: 'website-development',
    slug: 'website-development',
    number: '04',
    title: 'Website Development',
    pricingTitle: 'Website Development',
    description:
      'We build modern, responsive, and professional websites that represent businesses and help convert visitors into potential customers.',
    deliverables: [
      'Business websites',
      'Landing pages',
      'Responsive design',
      'UI/UX design',
      'Website optimization',
      'Contact forms',
      'Website maintenance options',
    ],
    startingPrice: 199,
    billingType: 'project',
    iconKey: 'globe',
    iconGradient: 'from-[#F59E0B] to-[#F97316]',
    strategicFocus: 'Responsive architecture & conversion-focused UX',
  },
  {
    id: 'branding-logo-design',
    slug: 'branding',
    number: '05',
    title: 'Branding & Logo Design',
    pricingTitle: 'Branding & Logo Design',
    description:
      'We create distinctive brand identities that help businesses stand out and establish a recognizable professional image.',
    deliverables: [
      'Logo design',
      'Brand identity',
      'Brand guidelines',
      'Color and typography selection',
      'Business cards',
      'Social media branding',
      'Visual brand assets',
    ],
    startingPrice: 49,
    billingType: 'project',
    iconKey: 'palette',
    iconGradient: 'from-[#8B5CF6] to-[#6D28D9]',
    strategicFocus: 'Memorable visual identity & cohesive brand systems',
  },
  {
    id: 'email-marketing',
    slug: 'email-marketing',
    number: '06',
    title: 'Email Marketing',
    pricingTitle: 'Email Marketing Campaigns',
    description:
      'We design and structure targeted email campaigns, newsletters, and customer follow-up sequences to nurture leads and strengthen retention.',
    deliverables: [
      'Email campaign planning',
      'Branded newsletter & template design',
      'Audience list segmentation',
      'Lead-nurture & welcome sequences',
      'Subject line & CTA copywriting',
      'Campaign scheduling support',
      'Engagement & click review',
    ],
    startingPrice: 99,
    billingType: 'month',
    iconKey: 'mail',
    iconGradient: 'from-[#7C3AED] to-[#4F46E5]',
    strategicFocus: 'Direct audience nurturing & repeat customer engagement',
  },
  {
    id: 'google-business-profile',
    slug: 'google-business-profile',
    number: '07',
    title: 'Google Business Profile Management',
    pricingTitle: 'Google Business Profile Management',
    description:
      'We help businesses optimize their Google Business Profiles to improve local visibility and make it easier for customers to discover their services.',
    deliverables: [
      'Profile setup assistance',
      'Profile optimization',
      'Business information updates',
      'Service and category optimization',
      'Business photos and updates',
      'Review management support',
      'Performance monitoring',
    ],
    startingPrice: 79,
    billingType: 'month',
    iconKey: 'mapPin',
    iconGradient: 'from-[#10B981] to-[#059669]',
    strategicFocus: 'Local search discovery & profile trust building',
  },
  {
    id: 'local-seo-lead-generation',
    slug: 'local-seo',
    number: '08',
    title: 'Local SEO & Lead Generation',
    pricingTitle: 'Local SEO & Lead Generation',
    description:
      'We help businesses reach relevant local customers through local search optimization and strategic lead generation.',
    deliverables: [
      'Local keyword research',
      'Local SEO',
      'Google Maps optimization',
      'Local visibility improvement',
      'Lead generation strategies',
      'Competitor analysis',
      'Lead tracking',
    ],
    startingPrice: 129,
    billingType: 'month',
    iconKey: 'compass',
    iconGradient: 'from-[#06B6D4] to-[#2563EB]',
    strategicFocus: 'Regional map visibility & inbound customer inquiries',
  },
  {
    id: 'marketing-strategy-analytics',
    slug: 'marketing-strategy',
    number: '09',
    title: 'Marketing Strategy & Analytics',
    pricingTitle: 'Marketing Strategy & Analytics',
    description:
      'We develop strategic marketing plans based on business objectives, audience research, competitor analysis, and performance data.',
    deliverables: [
      'Marketing strategy',
      'Audience research',
      'Competitor analysis',
      'Campaign planning',
      'Marketing analytics',
      'Performance reporting',
      'Growth recommendations',
    ],
    startingPrice: 79,
    billingType: 'project',
    iconKey: 'lineChart',
    iconGradient: 'from-[#4F46E5] to-[#EC4899]',
    strategicFocus: 'Research-backed roadmaps & performance clarity',
  },
];

/**
 * The 8 introductory USD pricing packages preserved verbatim from ZENVEXA's official rate card.
 */
export const PRICING_PACKAGES_DATA = SERVICES_DATA.filter(
  (s): s is ServiceItem & { startingPrice: number; billingType: 'month' | 'project' } =>
    typeof s.startingPrice === 'number' && Boolean(s.billingType)
);

export const WHY_CHOOSE_DATA: WhyChooseItem[] = [
  {
    number: '01',
    title: 'Professional Team',
    description:
      'Our coordinated In-House Team, Remote Team, and Specialist Network combine dedicated operational oversight with specialized execution across disciplines.',
  },
  {
    number: '02',
    title: 'Affordable Solutions',
    description:
      'Transparent, SMB-friendly introductory USD packages designed to make professional branding, websites, SEO, and paid media accessible as you scale.',
  },
  {
    number: '03',
    title: 'Customized Strategies',
    description:
      'We avoid rigid, one-size-fits-all templates—structuring deliverables and channel priorities around your industry, audience, and stage of growth.',
  },
  {
    number: '04',
    title: 'Creative Excellence',
    description:
      'Distinctive brand identities, cohesive social media designs, and modern responsive web interfaces built to represent your business with authority.',
  },
  {
    number: '05',
    title: 'Transparent Communication',
    description:
      'Clear scope definitions, structured monthly reporting, and direct access to agency representation via WhatsApp and email at every step.',
  },
  {
    number: '06',
    title: 'Results-Focused Approach',
    description:
      'Every campaign, website, and creative asset is planned around practical commercial objectives—visibility, customer trust, and qualified inquiries.',
  },
];

export const PROCESS_STEPS: ProcessStepItem[] = [
  {
    step: '01',
    title: 'Discover',
    description:
      'We understand your business, goals, target audience, and challenges.',
    detail:
      'Initial consultation, market positioning review, and goal alignment.',
  },
  {
    step: '02',
    title: 'Strategize',
    description: 'We develop a customized digital growth strategy.',
    detail:
      'Channel selection, creative direction, roadmap, and deliverable scoping.',
  },
  {
    step: '03',
    title: 'Execute',
    description:
      'Our team implements professional creative and marketing solutions.',
    detail:
      'Design, development, campaign launch, and quality-checked deployment.',
  },
  {
    step: '04',
    title: 'Grow',
    description:
      'We monitor performance, analyze results, and identify opportunities for improvement.',
    detail:
      'Ongoing reporting, iterative refinement, and long-term scaling support.',
  },
];

export const PRICING_CONDITIONS: string[] = [
  'All prices displayed above are introductory starting prices in USD ($), not guaranteed final quotations.',
  'Facebook and Instagram advertising budgets (ad spend paid to Meta) are separate from agency management fees.',
  'Domain registration and website hosting costs are separate unless explicitly agreed otherwise in writing.',
  'Third-party subscriptions, premium plugins, and paid software licenses are not automatically included.',
  'Final quotations depend on specific project requirements, deliverable volume, workload, and agreed service scope.',
];

export const PRICING_TAGLINE_MESSAGE =
  'Affordable solutions. Professional execution. Customized plans for every business.';
