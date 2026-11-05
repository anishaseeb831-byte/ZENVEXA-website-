/**
 * Curated AI-Generated Visual Assets for ZENVEXA Digital Agency
 * 8K Commercial Advertising Quality & Editorial Studio Photography
 */

export const AGENCY_IMAGES = {
  // Homepage
  homepageHero: '/src/assets/images/homepage_hero_marketing_1793886210302.jpg',
  growthAnalytics: '/src/assets/images/growth_analytics_visual_1793886210284.jpg',

  // Core Main Pages (Unique visuals for each)
  servicesMainHero: '/src/assets/images/services_page_hero_1793886211456.jpg',
  aboutHero: '/src/assets/images/about_agency_team_1793886214345.jpg',
  portfolioHero: '/src/assets/images/portfolio_showcase_hero_1793887129391.jpg',
  contactHero: '/src/assets/images/contact_consultation_hero_1793887132215.jpg',
  pricingHero: '/src/assets/images/pricing_plans_hero_1793887133667.jpg',
  blogHero: '/src/assets/images/blog_insights_hero_1793887132655.jpg',

  // Dedicated 9 Services (Separate image for every individual service)
  socialMediaHero: '/src/assets/images/social_media_meta_ads_1793886212402.jpg',
  metaAdsHero: '/src/assets/images/meta_ads_campaign_1793887125931.jpg',
  seoHero: '/src/assets/images/seo_search_growth_1793886211670.jpg',
  webDevHero: '/src/assets/images/web_development_hero_1793886213570.jpg',
  brandingHero: '/src/assets/images/branding_design_hero_1793886213919.jpg',
  emailMarketingHero: '/src/assets/images/email_marketing_crm_1793887128057.jpg',
  googleBusinessHero: '/src/assets/images/google_business_maps_1793887128022.jpg',
  localSeoHero: '/src/assets/images/local_seo_leads_1793887128174.jpg',
  strategyHero: '/src/assets/images/marketing_strategy_hub_1793887129772.jpg',
} as const;

export function getServiceHeroImage(slug: string): string {
  switch (slug) {
    case 'social-media-management':
      return AGENCY_IMAGES.socialMediaHero;
    case 'meta-ads':
    case 'facebook-instagram-ads':
      return AGENCY_IMAGES.metaAdsHero;
    case 'seo':
      return AGENCY_IMAGES.seoHero;
    case 'website-development':
      return AGENCY_IMAGES.webDevHero;
    case 'branding':
    case 'branding-logo-design':
      return AGENCY_IMAGES.brandingHero;
    case 'email-marketing':
      return AGENCY_IMAGES.emailMarketingHero;
    case 'google-business-profile':
      return AGENCY_IMAGES.googleBusinessHero;
    case 'local-seo':
    case 'local-seo-lead-generation':
      return AGENCY_IMAGES.localSeoHero;
    case 'marketing-strategy':
    case 'marketing-strategy-analytics':
      return AGENCY_IMAGES.strategyHero;
    default:
      return AGENCY_IMAGES.servicesMainHero;
  }
}
