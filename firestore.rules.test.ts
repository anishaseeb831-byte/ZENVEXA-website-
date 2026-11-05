/**
 * Firestore Security Rules — Dirty Dozen Adversarial Verification Suite
 * Run against the Firebase Local Emulator (`firebase emulators:exec --only firestore "..."`)
 * to verify all 12 adversarial payloads in `security_spec.md` return PERMISSION_DENIED.
 */

import { readFileSync } from 'node:fs';

export interface DirtyDozenScenario {
  id: number;
  name: string;
  collection: string;
  docId: string;
  auth: {
    uid: string;
    email?: string;
    email_verified?: boolean;
  } | null;
  operation: 'get' | 'list' | 'create' | 'update' | 'delete';
  payload?: Record<string, unknown>;
  expectedOutcome: 'PERMISSION_DENIED';
}

export const DIRTY_DOZEN_SCENARIOS: DirtyDozenScenario[] = [
  {
    id: 1,
    name: 'Unauthenticated Inquiry Spam',
    collection: 'inquiries',
    docId: 'inq_unauth_1',
    auth: null,
    operation: 'create',
    payload: {
      clientId: 'anon',
      fullName: 'Bot',
      email: 'bot@example.com',
      businessName: 'Spam Corp',
      country: 'US',
      serviceRequired: 'SEO',
      message: 'Automated unauthenticated spam payload.',
      status: 'new',
      agencyNote: '',
    },
    expectedOutcome: 'PERMISSION_DENIED',
  },
  {
    id: 2,
    name: 'Unverified Email Spoof of Bootstrapped Admin',
    collection: 'inquiries',
    docId: 'inq_victim_1',
    auth: {
      uid: 'spoof_attacker',
      email: 'zenvexahub@gmail.com',
      email_verified: false,
    },
    operation: 'get',
    expectedOutcome: 'PERMISSION_DENIED',
  },
  {
    id: 3,
    name: 'Identity Spoofing on Inquiry Creation',
    collection: 'inquiries',
    docId: 'inq_spoof_owner',
    auth: {
      uid: 'user_A',
      email: 'usera@example.com',
      email_verified: true,
    },
    operation: 'create',
    payload: {
      clientId: 'user_B',
      fullName: 'User A',
      email: 'usera@example.com',
      businessName: 'Acme',
      country: 'US',
      serviceRequired: 'Website Development',
      message: 'Trying to impersonate user_B UID.',
      status: 'new',
      agencyNote: '',
    },
    expectedOutcome: 'PERMISSION_DENIED',
  },
  {
    id: 4,
    name: 'Cross-Tenant PII Read Leak',
    collection: 'inquiries',
    docId: 'inq_owned_by_A',
    auth: {
      uid: 'user_B',
      email: 'userb@example.com',
      email_verified: true,
    },
    operation: 'get',
    expectedOutcome: 'PERMISSION_DENIED',
  },
  {
    id: 5,
    name: 'Shadow Ghost Field Injection',
    collection: 'inquiries',
    docId: 'inq_ghost_field',
    auth: {
      uid: 'user_A',
      email: 'usera@example.com',
      email_verified: true,
    },
    operation: 'create',
    payload: {
      clientId: 'user_A',
      fullName: 'User A',
      email: 'usera@example.com',
      businessName: 'Acme',
      country: 'Pakistan',
      serviceRequired: 'SEO',
      message: 'Valid length inquiry with unauthorized shadow field.',
      status: 'new',
      agencyNote: '',
      isPriorityAdmin: true,
    },
    expectedOutcome: 'PERMISSION_DENIED',
  },
  {
    id: 6,
    name: 'Client Pre-Approving Own Testimonial',
    collection: 'testimonials',
    docId: 'rev_self_approve',
    auth: {
      uid: 'user_A',
      email: 'usera@example.com',
      email_verified: true,
    },
    operation: 'create',
    payload: {
      authorId: 'user_A',
      displayName: 'Malicious Reviewer',
      roleAndCompany: 'CEO, Fake Co',
      reviewText: 'Attempting to bypass moderation directly into approved.',
      status: 'approved',
    },
    expectedOutcome: 'PERMISSION_DENIED',
  },
  {
    id: 7,
    name: 'Post-Approval Testimonial Tampering',
    collection: 'testimonials',
    docId: 'rev_already_approved',
    auth: {
      uid: 'user_A',
      email: 'usera@example.com',
      email_verified: true,
    },
    operation: 'update',
    payload: {
      reviewText: 'Swapping text after admin approved the review!',
    },
    expectedOutcome: 'PERMISSION_DENIED',
  },
  {
    id: 8,
    name: 'Client Modifying Agency Note or Terminal Completed Inquiry',
    collection: 'inquiries',
    docId: 'inq_completed_1',
    auth: {
      uid: 'user_A',
      email: 'usera@example.com',
      email_verified: true,
    },
    operation: 'update',
    payload: {
      agencyNote: 'Forged official agency discount promise.',
    },
    expectedOutcome: 'PERMISSION_DENIED',
  },
  {
    id: 9,
    name: 'ID Poisoning Attack with Illegal Characters',
    collection: 'inquiries',
    docId: 'bad$id!spaces',
    auth: {
      uid: 'user_A',
      email: 'usera@example.com',
      email_verified: true,
    },
    operation: 'create',
    payload: {
      clientId: 'user_A',
      fullName: 'User A',
      email: 'usera@example.com',
      businessName: 'Acme',
      country: 'US',
      serviceRequired: 'SEO',
      message: 'Testing path variable regex hardening.',
      status: 'new',
      agencyNote: '',
    },
    expectedOutcome: 'PERMISSION_DENIED',
  },
  {
    id: 10,
    name: 'Value Poisoning on Update (Invalid Type / Oversized Payload)',
    collection: 'inquiries',
    docId: 'inq_valid_1',
    auth: {
      uid: 'user_A',
      email: 'usera@example.com',
      email_verified: true,
    },
    operation: 'update',
    payload: {
      message: 'x'.repeat(5000),
    },
    expectedOutcome: 'PERMISSION_DENIED',
  },
  {
    id: 11,
    name: 'Client-Forged Historical Timestamp',
    collection: 'testimonials',
    docId: 'rev_forged_time',
    auth: {
      uid: 'user_A',
      email: 'usera@example.com',
      email_verified: true,
    },
    operation: 'create',
    payload: {
      authorId: 'user_A',
      displayName: 'User A',
      roleAndCompany: 'Founder, Startup',
      reviewText: 'Attempting to backdate createdAt timestamp.',
      status: 'pending',
      createdAt: '2020-01-01T00:00:00.000Z',
    },
    expectedOutcome: 'PERMISSION_DENIED',
  },
  {
    id: 12,
    name: 'Scraping Unpublished Draft Portfolio Project',
    collection: 'portfolioProjects',
    docId: 'proj_secret_draft',
    auth: null,
    operation: 'get',
    expectedOutcome: 'PERMISSION_DENIED',
  },
];

export function verifyRulesFileInvariants(rulesPath = './firestore.rules'): void {
  const rulesSource = readFileSync(rulesPath, 'utf8');
  if (!rulesSource.includes("rules_version = '2';")) {
    throw new Error('Missing rules_version = 2');
  }
  if (!rulesSource.includes('match /{document=**} {\n      allow read, write: if false;\n    }')) {
    throw new Error('Missing Global Safety Net default-deny rule');
  }
}
