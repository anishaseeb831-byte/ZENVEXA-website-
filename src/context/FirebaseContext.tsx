import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
} from 'firebase/auth';
import {
  auth,
  googleAuthProvider,
  workspaceGoogleProvider,
  BOOTSTRAPPED_ADMIN_EMAIL,
} from '../lib/firebase';

interface FirebaseContextValue {
  user: User | null;
  authReady: boolean;
  isAdmin: boolean;
  isSigningIn: boolean;
  authError: string | null;
  accessToken: string | null;
  signInWithGoogle: () => Promise<User | null>;
  connectWorkspace: () => Promise<string | null>;
  signOutUser: () => Promise<void>;
  clearAuthError: () => void;
}

const FirebaseContext = createContext<FirebaseContextValue | undefined>(
  undefined
);

export const FirebaseProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        setAccessToken(null);
      }
      setIsAdmin(
        Boolean(
          currentUser &&
            currentUser.emailVerified &&
            currentUser.email === BOOTSTRAPPED_ADMIN_EMAIL
        )
      );
      setAuthReady(true);
    });

    return () => unsubscribe();
  }, []);

  const parseAuthErrorMessage = (err: unknown, isWorkspace = false): string | null => {
    const raw = err instanceof Error ? err.message : String(err);

    // Normal cancellation by user dismissal
    if (raw.includes('auth/popup-closed-by-user')) {
      return null;
    }

    if (raw.includes('auth/popup-blocked')) {
      return 'The sign-in popup was blocked by your browser. Please allow popups for this site or tap the button again.';
    }

    if (raw.includes('auth/cancelled-popup-request')) {
      return 'A sign-in request is already in progress. Please complete or close the existing popup.';
    }

    if (raw.includes('auth/operation-not-allowed')) {
      return 'Google Sign-In is not enabled in Firebase Authentication. In the Firebase Console, go to Authentication > Sign-in method, click Google, and toggle it to Enabled.';
    }

    if (raw.includes('auth/unauthorized-domain')) {
      const currentHost = typeof window !== 'undefined' ? window.location.hostname : 'your domain';
      return `The domain "${currentHost}" is not authorized for authentication. Please add "${currentHost}" to Authorized Domains in Firebase Console > Authentication > Settings.`;
    }

    if (raw.includes('auth/network-request-failed')) {
      return 'Network connection failed. Please check your internet connection and try again.';
    }

    if (raw.includes('403') || raw.includes('access_denied') || raw.includes('verification process')) {
      if (isWorkspace) {
        return 'Google Workspace authorization was blocked (Error 403). Because Google Slides & Gmail are restricted APIs, while your project is in Testing Mode, your Google account email must be added to "Test users" in Google Cloud Console > APIs & Services > OAuth consent screen.';
      }
      return 'Google sign-in access was blocked (Error 403). If your Google Cloud OAuth Consent Screen is in Testing Mode, please ensure your email is added under "Test users" in Google Cloud Console, or publish the consent screen.';
    }

    if (
      raw.includes('missing initial state') ||
      raw.includes('storage-partitioned') ||
      raw.includes('sessionStorage')
    ) {
      return 'Third-party storage/cookie restrictions in this browser prevented the login session from completing. Please open the link directly in your browser or enable third-party cookies.';
    }

    return `Authentication could not be completed: ${raw.replace(/Firebase:\s*/, '')}`;
  };

  const signInWithGoogle = useCallback(async (): Promise<User | null> => {
    setAuthError(null);
    setIsSigningIn(true);
    try {
      // Standard authentication: only requests standard openid/profile/email scopes.
      // This ensures 100% normal sign-in for clients and users without triggering Google's restricted scope 403 block!
      const result = await signInWithPopup(auth, googleAuthProvider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (credential?.accessToken) {
        setAccessToken(credential.accessToken);
      }
      return result.user;
    } catch (err) {
      const friendlyMessage = parseAuthErrorMessage(err, false);
      if (friendlyMessage) {
        setAuthError(friendlyMessage);
      }
      return null;
    } finally {
      setIsSigningIn(false);
    }
  }, []);

  const connectWorkspace = useCallback(async (): Promise<string | null> => {
    setAuthError(null);
    setIsSigningIn(true);
    try {
      // Dedicated workspace authentication: requests Slides and Gmail scopes incrementally
      const result = await signInWithPopup(auth, workspaceGoogleProvider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (credential?.accessToken) {
        setAccessToken(credential.accessToken);
        return credential.accessToken;
      }
      return null;
    } catch (err) {
      const friendlyMessage = parseAuthErrorMessage(err, true);
      if (friendlyMessage) {
        setAuthError(friendlyMessage);
      }
      return null;
    } finally {
      setIsSigningIn(false);
    }
  }, []);

  const signOutUser = useCallback(async (): Promise<void> => {
    setAuthError(null);
    setAccessToken(null);
    await signOut(auth);
  }, []);

  const clearAuthError = useCallback(() => setAuthError(null), []);

  return (
    <FirebaseContext.Provider
      value={{
        user,
        authReady,
        isAdmin,
        isSigningIn,
        authError,
        accessToken,
        signInWithGoogle,
        connectWorkspace,
        signOutUser,
        clearAuthError,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export function useFirebase(): FirebaseContextValue {
  const ctx = useContext(FirebaseContext);
  if (!ctx) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return ctx;
}
