/**
 * ============================================================================
 * ZENVEXA DIGITAL AGENCY — GENUINE CLIENT TESTIMONIALS STORE
 * ============================================================================
 * IMPORTANT: We strictly do NOT invent fake customer reviews.
 * Add verified client reviews to `GENUINE_TESTIMONIALS` below as projects conclude.
 * When `GENUINE_TESTIMONIALS` is empty, the Testimonials section displays
 * authentic leadership commitments from Anis & Awais alongside a client review
 * submission invitation.
 * ============================================================================
 */

export interface TestimonialItem {
  id: string;
  name: string;
  roleAndCompany: string;
  reviewText: string;
  avatarUrl?: string;
}

export const GENUINE_TESTIMONIALS: TestimonialItem[] = [
  // Example format when adding your real client reviews later:
  // {
  //   id: 'client-1',
  //   name: 'Verified Client Name',
  //   roleAndCompany: 'Founder, Company Name',
  //   reviewText: 'Exact approved feedback shared by your client...',
  //   avatarUrl: '/testimonials/client-1.jpg',
  // },
];

export const AGENCY_COMMITMENT_VOICES = [
  {
    id: 'founder-commitment',
    initials: 'AN',
    name: 'Anis',
    role: 'Founder, ZENVEXA Digital Agency',
    quote:
      'Every business we partner with receives thoughtful creative craft, modern digital execution, and honest guidance tailored to sustainable long-term growth.',
  },
  {
    id: 'rep-commitment',
    initials: 'AW',
    name: 'Awais',
    role: 'Agency Representative, ZENVEXA',
    quote:
      'From our first consultation on WhatsApp or email through launch and monthly reporting, we prioritize clear communication, defined deliverables, and responsive support.',
  },
] as const;
