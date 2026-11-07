import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDocFromServer,
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);

export const FIREBASE_PROJECT_ID = firebaseConfig.projectId;
export const FIRESTORE_DATABASE_ID =
  (firebaseConfig as Record<string, any>).firestoreDatabaseId ||
  'ai-studio-zenvexadigitalag-e4f0e9e2-74cb-4701-ab27-d194a4c4a291';
export const BOOTSTRAPPED_ADMIN_EMAIL = 'zenvexahub@gmail.com';
export const REGISTERED_SOLE_ADMIN_EMAIL = 'anisusa032@gmail.com';
export const AUTHORIZED_ADMIN_EMAILS = [BOOTSTRAPPED_ADMIN_EMAIL, REGISTERED_SOLE_ADMIN_EMAIL];
export const isAuthorizedAdminEmail = (email?: string | null): boolean =>
  Boolean(email && AUTHORIZED_ADMIN_EMAILS.includes(email.toLowerCase()));

/* CRITICAL: Pass firestoreDatabaseId to connect to the provisioned Enterprise database */
export const db = getFirestore(app, FIRESTORE_DATABASE_ID);
export const auth = getAuth(app);

/**
 * Standard Google Auth Provider for general website authentication
 * (Client Portal, Inquiry submission, Reviews, and Account management).
 * Requests ONLY basic profile and email (OpenID).
 * Does NOT request restricted sensitive scopes, preventing Google's 403 access_denied verification blocker.
 */
export const googleAuthProvider = new GoogleAuthProvider();
googleAuthProvider.setCustomParameters({
  prompt: 'select_account',
});
// Google Slides and Google Drive scopes for presentation generation and deck management
googleAuthProvider.addScope('https://www.googleapis.com/auth/presentations');
googleAuthProvider.addScope('https://www.googleapis.com/auth/presentations.readonly');
googleAuthProvider.addScope('https://www.googleapis.com/auth/drive.readonly');
googleAuthProvider.addScope('https://www.googleapis.com/auth/drive.file');

/**
 * Dedicated Google Workspace Provider for Google Slides & Gmail.
 * Used exclusively inside GoogleWorkspaceHub when explicitly authorized by an admin/tester.
 */
export const workspaceGoogleProvider = new GoogleAuthProvider();
workspaceGoogleProvider.setCustomParameters({
  prompt: 'select_account',
});
workspaceGoogleProvider.addScope('https://www.googleapis.com/auth/presentations');
workspaceGoogleProvider.addScope('https://www.googleapis.com/auth/presentations.readonly');
workspaceGoogleProvider.addScope('https://www.googleapis.com/auth/drive.readonly');
workspaceGoogleProvider.addScope('https://www.googleapis.com/auth/drive.file');
workspaceGoogleProvider.addScope('https://www.googleapis.com/auth/gmail.readonly');
workspaceGoogleProvider.addScope('https://www.googleapis.com/auth/gmail.send');
workspaceGoogleProvider.addScope('https://www.googleapis.com/auth/gmail.compose');

/**
 * Default provider alias for backwards compatibility
 */
export const googleProvider = googleAuthProvider;

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

/**
 * Mandatory structured error handler for all Firestore operations.
 */
export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

/**
 * Formats user-friendly explanations for Firestore errors, including quota guidance.
 */
export function formatReadableFirestoreError(err: unknown): {
  message: string;
  upgradeUrl?: string;
} {
  const raw = err instanceof Error ? err.message : String(err);
  let extractedMessage = raw;

  try {
    const parsed = JSON.parse(raw) as Partial<FirestoreErrorInfo>;
    if (parsed && typeof parsed.error === 'string') {
      extractedMessage = parsed.error;
    }
  } catch {
    // Plain error string
  }

  if (
    extractedMessage.includes(
      "Quota exceeded for quota metric 'Free daily read units per project (free tier database)'"
    )
  ) {
    return {
      message:
        'Daily free-tier Firestore read quota has been reached. Quota resets tomorrow, or you can upgrade your project in the Firebase Console.',
      upgradeUrl: `https://console.firebase.google.com/project/${FIREBASE_PROJECT_ID}/firestore/databases/${FIRESTORE_DATABASE_ID}/data?openUpgradeDialog=true`,
    };
  }

  if (extractedMessage.includes('Quota exceeded')) {
    return {
      message:
        'Firestore free-tier usage quota has been exceeded and will reset tomorrow. See Spark plan Enterprise limits at firebase.google.com/pricing#cloud-firestore.',
    };
  }

  return { message: extractedMessage };
}

/**
 * Generates safe document IDs strictly matching `^[a-zA-Z0-9_\-]+$` (<= 128 chars).
 */
export function generateSafeDocId(prefix: string): string {
  const cleanPrefix = prefix.replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 24) || 'doc';
  const randomPart = Math.random().toString(36).slice(2, 10);
  return `${cleanPrefix}_${Date.now()}_${randomPart}`;
}

/**
 * Schema constants synchronized verbatim with `firebase-blueprint.json` and `firestore.rules`.
 */
export const SCHEMA_CONSTRAINTS = {
  idPattern: /^[a-zA-Z0-9_\-]+$/,
  emailPattern: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
  inquiry: {
    fullNameMax: 120,
    emailMax: 160,
    businessNameMax: 140,
    countryMax: 100,
    serviceRequiredMax: 140,
    messageMin: 10,
    messageMax: 2000,
    agencyNoteMax: 1500,
  },
  portfolio: {
    titleMin: 2,
    titleMax: 140,
    shortDescMin: 10,
    shortDescMax: 320,
    overviewMin: 10,
    overviewMax: 1500,
    maxDeliverables: 8,
    deliverableItemMax: 160,
    maxTools: 6,
    toolItemMax: 80,
    imageUrlMax: 600,
  },
  testimonial: {
    displayNameMin: 2,
    displayNameMax: 80,
    roleMin: 2,
    roleMax: 120,
    reviewMin: 15,
    reviewMax: 800,
  },
} as const;

/**
 * Boot-time connection check to verify Firestore reachability.
 */
async function testConnection(): Promise<void> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes('the client is offline')
    ) {
      console.error('Please check your Firebase configuration.');
    }
  }
}

void testConnection();
