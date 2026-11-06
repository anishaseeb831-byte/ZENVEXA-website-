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
  googleProvider,
  BOOTSTRAPPED_ADMIN_EMAIL,
} from '../lib/firebase';

interface FirebaseContextValue {
  user: User | null;
  authReady: boolean;
  isAdmin: boolean;
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

  const signInWithGoogle = useCallback(async (): Promise<User | null> => {
    setAuthError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (credential?.accessToken) {
        setAccessToken(credential.accessToken);
      }
      return result.user;
    } catch (err) {
      const raw = err instanceof Error ? err.message : String(err);
      if (raw.includes('auth/popup-closed-by-user')) {
        return null;
      }
      if (
        raw.includes('missing initial state') ||
        raw.includes('storage-partitioned') ||
        raw.includes('sessionStorage')
      ) {
        setAuthError(
          'Mobile Safari in this preview container is operating with partitioned storage. You can send your inquiry directly via WhatsApp or Email without signing in, or open the link directly in your browser.'
        );
      } else if (raw.includes('auth/popup-blocked')) {
        setAuthError(
          'The login popup was blocked by your browser. Please allow popups for this site or send your inquiry directly via WhatsApp or Email.'
        );
      } else {
        setAuthError(
          'Google authentication could not complete in this preview session. You can submit directly via WhatsApp or Email below.'
        );
      }
      return null;
    }
  }, []);

  const connectWorkspace = useCallback(async (): Promise<string | null> => {
    setAuthError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (credential?.accessToken) {
        setAccessToken(credential.accessToken);
        return credential.accessToken;
      }
      return null;
    } catch (err) {
      const raw = err instanceof Error ? err.message : String(err);
      if (raw.includes('auth/popup-closed-by-user')) {
        return null;
      }
      setAuthError('Could not grant Google Workspace permissions. Please try again.');
      return null;
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
