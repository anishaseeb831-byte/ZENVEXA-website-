/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import {
  ShieldCheck,
  ShieldAlert,
  LogIn,
  LogOut,
  CheckCircle2,
  Clock,
  Mail,
  MessageCircle,
  Search,
  Filter,
  Download,
  Trash2,
  ArrowLeft,
  RefreshCw,
  AlertCircle,
  Building,
  Globe,
  Check,
  Copy,
  Lock,
  Unlock,
  UserCheck,
  Tag,
  FileSpreadsheet,
} from 'lucide-react';
import { useFirebase } from '../context/FirebaseContext';
import {
  db,
  handleFirestoreError,
  formatReadableFirestoreError,
  OperationType,
  BOOTSTRAPPED_ADMIN_EMAIL,
} from '../lib/firebase';
import {
  COMPANY_INFO,
  RoutePath,
  buildWhatsAppUrl,
  SERVICES_DATA,
} from '../data/agencyData';

interface AdminBookingsPanelProps {
  onNavigate: (path: RoutePath) => void;
}

interface AdminSlotDoc {
  claimed: boolean;
  adminUid: string;
  adminEmail: string;
  label?: string;
  claimedAt?: Timestamp;
}

interface BookingRecord {
  id: string;
  clientId: string;
  fullName: string;
  email: string;
  businessName: string;
  country: string;
  serviceRequired: string;
  message: string;
  status: 'new' | 'in_review' | 'responded' | 'completed';
  agencyNote: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export const AdminBookingsPanel: React.FC<AdminBookingsPanelProps> = ({
  onNavigate,
}) => {
  const {
    user,
    authReady,
    isAdmin,
    isSigningIn,
    authError,
    signInWithGoogle,
    signOutUser,
    clearAuthError,
  } = useFirebase();

  // Admin Slot State
  const [adminSlot, setAdminSlot] = useState<AdminSlotDoc | null>(null);
  const [slotLoading, setSlotLoading] = useState(true);
  const [claimingSlot, setClaimingSlot] = useState(false);
  const [claimSuccess, setClaimSuccess] = useState<string | null>(null);
  const [claimError, setClaimError] = useState<string | null>(null);

  // Bookings State
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [bookingsLoading, setBookingsLoading] = useState(true);
  const [bookingsError, setBookingsError] = useState<string | null>(null);

  // Filter & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<
    'all' | 'new' | 'in_review' | 'responded' | 'completed'
  >('all');
  const [serviceFilter, setServiceFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  // Booking Actions & Inline Note Editing
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [noteDraft, setNoteDraft] = useState('');
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // 1. Real-time subscription to the Singleton Admin Slot
  useEffect(() => {
    const slotDocRef = doc(db, 'system', 'adminSlot');
    const unsubscribe = onSnapshot(
      slotDocRef,
      (snapshot) => {
        if (snapshot.exists()) {
          setAdminSlot(snapshot.data() as AdminSlotDoc);
        } else {
          setAdminSlot(null);
        }
        setSlotLoading(false);
      },
      (err) => {
        console.warn('Could not read admin slot directly:', err);
        setSlotLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Determine if the current active user is the authorized administrator
  const isAuthorizedAdmin = useMemo(() => {
    if (!user || !user.emailVerified) return false;
    // Condition A: Matches the bootstrapped official email
    if (user.email === BOOTSTRAPPED_ADMIN_EMAIL) return true;
    // Condition B: Matches the claimed admin UID or email in adminSlot
    if (
      adminSlot &&
      adminSlot.claimed &&
      (adminSlot.adminUid === user.uid || adminSlot.adminEmail === user.email)
    ) {
      return true;
    }
    // Condition C: Firebase context isAdmin state
    return Boolean(isAdmin);
  }, [user, adminSlot, isAdmin]);

  // 2. Real-time subscription to all client bookings/inquiries (Only if authorized admin)
  useEffect(() => {
    if (!authReady || !isAuthorizedAdmin) {
      setBookings([]);
      setBookingsLoading(false);
      return;
    }

    setBookingsLoading(true);
    setBookingsError(null);

    const inquiriesRef = collection(db, 'inquiries');
    const unsubscribe = onSnapshot(
      inquiriesRef,
      (snapshot) => {
        const docs = snapshot.docs.map((d) => ({
          id: d.id,
          ...(d.data() as Omit<BookingRecord, 'id'>),
        }));
        setBookings(docs);
        setBookingsLoading(false);
      },
      (err) => {
        try {
          handleFirestoreError(err, OperationType.LIST, 'inquiries');
        } catch (wrapped) {
          const formatted = formatReadableFirestoreError(wrapped);
          setBookingsError(formatted.message);
        }
        setBookingsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [authReady, isAuthorizedAdmin]);

  // 3. Claim the 1 Single Admin Slot
  const handleClaimAdminSlot = async () => {
    setClaimError(null);
    setClaimSuccess(null);
    clearAuthError();
    setClaimingSlot(true);

    try {
      const activeUser = user || (await signInWithGoogle());
      if (!activeUser) {
        setClaimingSlot(false);
        return;
      }

      if (!activeUser.emailVerified) {
        setClaimError(
          'A verified Google email address is required to register as the administrator.'
        );
        setClaimingSlot(false);
        return;
      }

      // Step A: Write the singleton Admin Slot
      const slotRef = doc(db, 'system', 'adminSlot');
      await setDoc(slotRef, {
        claimed: true,
        adminUid: activeUser.uid,
        adminEmail: activeUser.email,
        label: `${COMPANY_INFO.name} Lead Administrator`,
        claimedAt: serverTimestamp(),
      });

      // Step B: Mirror into admins collection
      const adminDocRef = doc(db, 'admins', activeUser.uid);
      await setDoc(adminDocRef, {
        uid: activeUser.uid,
        label: `${COMPANY_INFO.name} Primary Administrator`,
        createdAt: serverTimestamp(),
      });

      setClaimSuccess(
        `Sole admin account successfully claimed and linked to ${activeUser.email}! The admin slot is now permanently locked.`
      );
    } catch (err) {
      const formatted = formatReadableFirestoreError(err);
      setClaimError(
        formatted.message ||
          'Failed to claim the admin slot. It may have already been claimed by another session.'
      );
    } finally {
      setClaimingSlot(false);
    }
  };

  // 4. Update Booking Status
  const handleUpdateStatus = async (
    bookingId: string,
    newStatus: BookingRecord['status']
  ) => {
    setActionSuccess(null);
    try {
      const bookingRef = doc(db, 'inquiries', bookingId);
      await updateDoc(bookingRef, {
        status: newStatus,
        updatedAt: serverTimestamp(),
      });
      setActionSuccess(`Booking #${bookingId.slice(-6)} marked as "${newStatus}".`);
      setTimeout(() => setActionSuccess(null), 3000);
    } catch (err) {
      const formatted = formatReadableFirestoreError(err);
      alert(`Could not update booking status: ${formatted.message}`);
    }
  };

  // 5. Save Agency Scoping Note
  const handleSaveAgencyNote = async (bookingId: string) => {
    try {
      const bookingRef = doc(db, 'inquiries', bookingId);
      await updateDoc(bookingRef, {
        agencyNote: noteDraft.trim(),
        updatedAt: serverTimestamp(),
      });
      setEditingNoteId(null);
      setNoteDraft('');
      setActionSuccess('Agency note updated successfully.');
      setTimeout(() => setActionSuccess(null), 3000);
    } catch (err) {
      const formatted = formatReadableFirestoreError(err);
      alert(`Could not save agency note: ${formatted.message}`);
    }
  };

  // 6. Delete Booking Record
  const handleDeleteBooking = async (bookingId: string) => {
    if (!window.confirm('Are you sure you want to permanently delete this booking record?')) {
      return;
    }
    setDeletingId(bookingId);
    try {
      await deleteDoc(doc(db, 'inquiries', bookingId));
      setActionSuccess('Booking deleted successfully.');
      setTimeout(() => setActionSuccess(null), 3000);
    } catch (err) {
      const formatted = formatReadableFirestoreError(err);
      alert(`Could not delete booking: ${formatted.message}`);
    } finally {
      setDeletingId(null);
    }
  };

  // 7. Copy to Clipboard Helper
  const handleCopy = (text: string, id: string) => {
    void navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // 8. Filtered and Sorted Bookings
  const filteredBookings = useMemo(() => {
    return bookings
      .filter((b) => {
        // Status filter
        if (statusFilter !== 'all' && b.status !== statusFilter) return false;
        // Service filter
        if (serviceFilter !== 'all' && b.serviceRequired !== serviceFilter) return false;
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = b.fullName?.toLowerCase().includes(q);
          const matchBusiness = b.businessName?.toLowerCase().includes(q);
          const matchEmail = b.email?.toLowerCase().includes(q);
          const matchCountry = b.country?.toLowerCase().includes(q);
          const matchService = b.serviceRequired?.toLowerCase().includes(q);
          const matchMsg = b.message?.toLowerCase().includes(q);
          const matchNote = b.agencyNote?.toLowerCase().includes(q);
          return (
            matchName ||
            matchBusiness ||
            matchEmail ||
            matchCountry ||
            matchService ||
            matchMsg ||
            matchNote
          );
        }
        return true;
      })
      .sort((a, b) => {
        const timeA = a.createdAt?.toMillis?.() ?? 0;
        const timeB = b.createdAt?.toMillis?.() ?? 0;
        return sortOrder === 'newest' ? timeB - timeA : timeA - timeB;
      });
  }, [bookings, statusFilter, serviceFilter, searchQuery, sortOrder]);

  // Metrics
  const stats = useMemo(() => {
    return {
      total: bookings.length,
      new: bookings.filter((b) => b.status === 'new').length,
      inReview: bookings.filter((b) => b.status === 'in_review').length,
      responded: bookings.filter((b) => b.status === 'responded').length,
      completed: bookings.filter((b) => b.status === 'completed').length,
    };
  }, [bookings]);

  // 9. Export Bookings to CSV
  const handleExportCSV = () => {
    if (bookings.length === 0) {
      alert('No bookings available to export.');
      return;
    }

    const headers = [
      'Booking ID',
      'Client Name',
      'Email',
      'Business / Brand',
      'Country',
      'Service Booked',
      'Status',
      'Message / Scope',
      'Agency Note',
      'Date Submitted',
    ];

    const rows = bookings.map((b) => [
      `"${b.id}"`,
      `"${(b.fullName || '').replace(/"/g, '""')}"`,
      `"${(b.email || '').replace(/"/g, '""')}"`,
      `"${(b.businessName || '').replace(/"/g, '""')}"`,
      `"${(b.country || '').replace(/"/g, '""')}"`,
      `"${(b.serviceRequired || '').replace(/"/g, '""')}"`,
      `"${b.status}"`,
      `"${(b.message || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`,
      `"${(b.agencyNote || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`,
      `"${b.createdAt?.toDate?.()?.toISOString?.() || ''}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `zenvexa-bookings-${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Helper for status badge styles
  const getStatusBadge = (status: BookingRecord['status']) => {
    switch (status) {
      case 'new':
        return 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800';
      case 'in_review':
        return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800';
      case 'responded':
        return 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800';
      case 'completed':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800';
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9FF] dark:bg-[#070A12] text-slate-800 dark:text-slate-100 py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation & Header Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-indigo-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('/')}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-500 hover:text-[#6A35FF] dark:text-slate-400 dark:hover:text-purple-300 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Website</span>
            </button>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <span className="text-xs font-bold text-[#6A35FF] dark:text-purple-400 tracking-wider uppercase">
              Admin Bookings Console
            </span>
          </div>

          {/* Slot Status Badge */}
          <div className="flex items-center gap-2">
            {slotLoading ? (
              <span className="text-xs text-slate-400">Verifying admin slot...</span>
            ) : adminSlot?.claimed ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                <Lock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Single Admin Slot Claimed</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300 border border-amber-200 dark:border-amber-800 animate-pulse">
                <Unlock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>1 Admin Slot Available (Open)</span>
              </span>
            )}
          </div>
        </div>

        {/* Global Action Feedback Notice */}
        {actionSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-sm text-emerald-800 dark:text-emerald-300 flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{actionSuccess}</span>
          </div>
        )}

        {/* CASE 1: NOT AUTHENTICATED OR NOT THE AUTHORIZED ADMIN */}
        {!isAuthorizedAdmin ? (
          <div className="max-w-xl mx-auto space-y-6">
            {/* Slot Available: Single Admin Registration Flow */}
            {!adminSlot?.claimed ? (
              <div className="bg-white dark:bg-[#0D1222] rounded-3xl p-8 sm:p-10 border border-indigo-100 dark:border-slate-800 shadow-xl text-center space-y-6">
                <div className="w-16 h-16 mx-auto rounded-3xl bg-brand-gradient text-white flex items-center justify-center shadow-lg shadow-indigo-500/30">
                  <UserCheck className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                    <span>Single Admin Account Creation</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B0F19] dark:text-white">
                    Claim Administrator Seat
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-md mx-auto">
                    You have requested a single slot so you can create your admin account. Once claimed, <strong>nobody else is permitted to create an admin account</strong>.
                  </p>
                </div>

                {claimError && (
                  <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-xs text-red-700 dark:text-red-300 text-left flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <span>{claimError}</span>
                  </div>
                )}

                {claimSuccess && (
                  <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-xs text-emerald-800 dark:text-emerald-300 text-left flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{claimSuccess}</span>
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="button"
                    disabled={claimingSlot || isSigningIn}
                    onClick={handleClaimAdminSlot}
                    className="w-full inline-flex items-center justify-center gap-2.5 px-7 py-4 text-sm sm:text-base font-bold text-white bg-brand-gradient bg-brand-gradient-hover rounded-2xl shadow-lg shadow-indigo-500/25 transition-all cursor-pointer disabled:opacity-60"
                  >
                    {claimingSlot || isSigningIn ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Registering Admin Account...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-5 h-5" />
                        <span>Sign Up / Claim Admin Account</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="pt-2 text-xs text-slate-400">
                  <span>Authorized Lead Admin: </span>
                  <span className="font-mono text-slate-600 dark:text-slate-300">
                    {BOOTSTRAPPED_ADMIN_EMAIL}
                  </span>
                </div>
              </div>
            ) : (
              /* Slot Claimed: Sign-In Only Interface */
              <div className="bg-white dark:bg-[#0D1222] rounded-3xl p-8 sm:p-10 border border-indigo-100 dark:border-slate-800 shadow-xl text-center space-y-6">
                <div className="w-16 h-16 mx-auto rounded-3xl bg-[#F5F3FF] dark:bg-purple-950/50 text-[#6A35FF] dark:text-purple-300 flex items-center justify-center shadow-md">
                  <Lock className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    <span>Admin Slot Claimed · Registration Locked</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B0F19] dark:text-white">
                    Administrator Login
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-md mx-auto">
                    The single admin slot is registered to{' '}
                    <strong className="text-[#0B0F19] dark:text-white font-mono">
                      {adminSlot.adminEmail}
                    </strong>
                    . Sign in with the registered administrator credentials to view all bookings.
                  </p>
                </div>

                {user && !isAuthorizedAdmin && (
                  <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-300 text-left space-y-2">
                    <div className="font-bold flex items-center gap-1.5">
                      <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>Unauthorized Account</span>
                    </div>
                    <p>
                      You are currently signed in as <strong>{user.email}</strong>, which is not the authorized administrator account.
                    </p>
                    <button
                      type="button"
                      onClick={signOutUser}
                      className="px-3 py-1.5 text-xs font-bold bg-white dark:bg-slate-900 border border-amber-300 rounded-lg text-amber-900 dark:text-amber-200 cursor-pointer"
                    >
                      Sign Out
                    </button>
                  </div>
                )}

                {authError && (
                  <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-xs text-red-700 dark:text-red-300 text-left flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <span>{authError}</span>
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="button"
                    disabled={isSigningIn}
                    onClick={signInWithGoogle}
                    className="w-full inline-flex items-center justify-center gap-2.5 px-7 py-4 text-sm sm:text-base font-bold text-white bg-brand-gradient bg-brand-gradient-hover rounded-2xl shadow-lg shadow-indigo-500/25 transition-all cursor-pointer disabled:opacity-60"
                  >
                    {isSigningIn ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Signing in as Admin...</span>
                      </>
                    ) : (
                      <>
                        <LogIn className="w-5 h-5" />
                        <span>Sign In as Admin with Google</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* CASE 2: AUTHORIZED ADMIN DASHBOARD */
          <div className="space-y-8">
            {/* Top Admin Status & Profile Strip */}
            <div className="bg-white dark:bg-[#0D1222] rounded-3xl p-6 sm:p-7 border border-indigo-100 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-brand-gradient text-white flex items-center justify-center font-bold text-xl shadow-md shadow-indigo-500/20 shrink-0">
                  {user?.displayName ? user.displayName.slice(0, 2).toUpperCase() : 'AD'}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-xl sm:text-2xl font-extrabold text-[#0B0F19] dark:text-white">
                      ZENVEXA Bookings Management
                    </h1>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#F5F3FF] text-[#6A35FF] dark:bg-purple-950 dark:text-purple-300 border border-indigo-100 dark:border-purple-800">
                      Sole Admin
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                    Logged in as <strong className="text-slate-800 dark:text-slate-200">{user?.email}</strong> · Live cloud sync active
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleExportCSV}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer shadow-2xs"
                >
                  <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                  <span>Export CSV</span>
                </button>

                <button
                  type="button"
                  onClick={signOutUser}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-xl bg-red-50 hover:bg-red-100 dark:bg-red-950/40 dark:hover:bg-red-950/60 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-900/60 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>

            {/* Metrics Overview Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
              <div
                onClick={() => setStatusFilter('all')}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  statusFilter === 'all'
                    ? 'bg-white dark:bg-[#0D1222] border-[#6A35FF] ring-2 ring-[#6A35FF]/20 shadow-md'
                    : 'bg-white dark:bg-[#0D1222] border-indigo-100 dark:border-slate-800 hover:border-indigo-300'
                }`}
              >
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Total Bookings
                </div>
                <div className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#0B0F19] dark:text-white">
                  {stats.total}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">All website submissions</div>
              </div>

              <div
                onClick={() => setStatusFilter('new')}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  statusFilter === 'new'
                    ? 'bg-amber-50/60 dark:bg-amber-950/30 border-amber-500 ring-2 ring-amber-500/20 shadow-md'
                    : 'bg-white dark:bg-[#0D1222] border-indigo-100 dark:border-slate-800 hover:border-amber-300'
                }`}
              >
                <div className="text-xs font-semibold text-amber-700 dark:text-amber-400 flex items-center justify-between">
                  <span>New Bookings</span>
                  {stats.new > 0 && (
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                  )}
                </div>
                <div className="mt-1 text-2xl sm:text-3xl font-extrabold text-amber-700 dark:text-amber-300">
                  {stats.new}
                </div>
                <div className="text-[11px] text-amber-600/80 dark:text-amber-400/80 mt-1">Requires review</div>
              </div>

              <div
                onClick={() => setStatusFilter('in_review')}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  statusFilter === 'in_review'
                    ? 'bg-blue-50/60 dark:bg-blue-950/30 border-blue-500 ring-2 ring-blue-500/20 shadow-md'
                    : 'bg-white dark:bg-[#0D1222] border-indigo-100 dark:border-slate-800 hover:border-blue-300'
                }`}
              >
                <div className="text-xs font-semibold text-blue-700 dark:text-blue-400">
                  In Review
                </div>
                <div className="mt-1 text-2xl sm:text-3xl font-extrabold text-blue-700 dark:text-blue-300">
                  {stats.inReview}
                </div>
                <div className="text-[11px] text-blue-600/80 dark:text-blue-400/80 mt-1">Under scoping</div>
              </div>

              <div
                onClick={() => setStatusFilter('responded')}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  statusFilter === 'responded'
                    ? 'bg-purple-50/60 dark:bg-purple-950/30 border-purple-500 ring-2 ring-purple-500/20 shadow-md'
                    : 'bg-white dark:bg-[#0D1222] border-indigo-100 dark:border-slate-800 hover:border-purple-300'
                }`}
              >
                <div className="text-xs font-semibold text-purple-700 dark:text-purple-400">
                  Responded
                </div>
                <div className="mt-1 text-2xl sm:text-3xl font-extrabold text-purple-700 dark:text-purple-300">
                  {stats.responded}
                </div>
                <div className="text-[11px] text-purple-600/80 dark:text-purple-400/80 mt-1">In communication</div>
              </div>

              <div
                onClick={() => setStatusFilter('completed')}
                className={`p-5 rounded-2xl border transition-all cursor-pointer col-span-2 lg:col-span-1 ${
                  statusFilter === 'completed'
                    ? 'bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-500 ring-2 ring-emerald-500/20 shadow-md'
                    : 'bg-white dark:bg-[#0D1222] border-indigo-100 dark:border-slate-800 hover:border-emerald-300'
                }`}
              >
                <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                  Completed
                </div>
                <div className="mt-1 text-2xl sm:text-3xl font-extrabold text-emerald-700 dark:text-emerald-300">
                  {stats.completed}
                </div>
                <div className="text-[11px] text-emerald-600/80 dark:text-emerald-400/80 mt-1">Closed / Converted</div>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="bg-white dark:bg-[#0D1222] rounded-2xl p-4 sm:p-5 border border-indigo-100 dark:border-slate-800 shadow-xs space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5">
                {/* Search Bar */}
                <div className="md:col-span-5 relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search client, company, email, country, service..."
                    className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-indigo-100 dark:border-slate-800 bg-[#FAF9FE] dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-[#6A35FF]"
                  />
                </div>

                {/* Service Filter */}
                <div className="md:col-span-4">
                  <select
                    value={serviceFilter}
                    onChange={(e) => setServiceFilter(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-indigo-100 dark:border-slate-800 bg-[#FAF9FE] dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-[#6A35FF]"
                  >
                    <option value="all">All Services ({bookings.length})</option>
                    {SERVICES_DATA.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sort Order */}
                <div className="md:col-span-3">
                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value as 'newest' | 'oldest')}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-indigo-100 dark:border-slate-800 bg-[#FAF9FE] dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-[#6A35FF]"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                  </select>
                </div>
              </div>

              {/* Status Filter Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-indigo-50 dark:border-slate-800/80">
                <span className="text-xs font-semibold text-slate-400 mr-1 flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5" />
                  <span>Status:</span>
                </span>
                {(['all', 'new', 'in_review', 'responded', 'completed'] as const).map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer capitalize ${
                      statusFilter === st
                        ? 'bg-[#6A35FF] text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {st === 'in_review' ? 'In Review' : st}
                  </button>
                ))}
                {(searchQuery || statusFilter !== 'all' || serviceFilter !== 'all') && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setStatusFilter('all');
                      setServiceFilter('all');
                    }}
                    className="text-xs text-[#6A35FF] hover:underline font-semibold ml-auto cursor-pointer"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            </div>

            {/* Bookings List Area */}
            {bookingsLoading ? (
              <div className="bg-white dark:bg-[#0D1222] rounded-3xl p-12 text-center text-slate-500 border border-indigo-100 dark:border-slate-800">
                <div className="w-8 h-8 border-3 border-[#6A35FF] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                <p className="text-sm">Loading all website bookings from Firestore...</p>
              </div>
            ) : bookingsError ? (
              <div className="p-6 rounded-3xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 space-y-2">
                <div className="font-bold flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  <span>Error Loading Bookings</span>
                </div>
                <p className="text-xs leading-relaxed">{bookingsError}</p>
              </div>
            ) : filteredBookings.length === 0 ? (
              <div className="bg-white dark:bg-[#0D1222] rounded-3xl p-12 text-center border border-indigo-100 dark:border-slate-800 space-y-3">
                <div className="w-12 h-12 mx-auto rounded-2xl bg-[#F5F3FF] dark:bg-purple-950/50 text-[#6A35FF] dark:text-purple-300 flex items-center justify-center">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-[#0B0F19] dark:text-white">
                  No Bookings Found
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  {bookings.length === 0
                    ? 'No consultation bookings have been submitted on the website yet. New inquiries submitted through the contact form will automatically stream here in real time.'
                    : 'No bookings match your current search or status filter criteria.'}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-xs text-slate-500 font-semibold px-1">
                  Showing {filteredBookings.length} of {bookings.length} total bookings
                </div>

                {filteredBookings.map((b) => {
                  const clientWhatsAppHref = buildWhatsAppUrl(
                    `Hello ${b.fullName}! Thank you for booking with ZENVEXA regarding ${b.serviceRequired}. I am following up on your inquiry.`
                  );
                  const clientMailtoHref = `mailto:${encodeURIComponent(
                    b.email
                  )}?subject=${encodeURIComponent(
                    `ZENVEXA Follow-up: ${b.serviceRequired}`
                  )}&body=${encodeURIComponent(
                    `Hi ${b.fullName},\n\nThank you for reaching out to ZENVEXA Digital Agency regarding ${b.serviceRequired}.\n\nBest regards,\nAnis & Awais\nZENVEXA Digital Agency`
                  )}`;

                  return (
                    <div
                      key={b.id}
                      className="bg-white dark:bg-[#0D1222] rounded-3xl p-6 sm:p-7 border border-indigo-100/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow space-y-5"
                    >
                      {/* Top Bar: Client Name, Service Badge, Status Badge & Timestamp */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-indigo-50 dark:border-slate-800/80 pb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold flex items-center justify-center text-sm shadow-xs shrink-0">
                            {b.fullName.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="text-base font-bold text-[#0B0F19] dark:text-white">
                                {b.fullName}
                              </h3>
                              <span className="text-xs text-slate-400">·</span>
                              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-1">
                                <Building className="w-3.5 h-3.5" />
                                {b.businessName}
                              </span>
                              <span className="text-xs text-slate-400">·</span>
                              <span className="text-xs text-slate-500 flex items-center gap-1">
                                <Globe className="w-3.5 h-3.5" />
                                {b.country}
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-400 mt-0.5">
                              Client ID: <span className="font-mono">{b.clientId.slice(0, 12)}...</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold border capitalize ${getStatusBadge(
                              b.status
                            )}`}
                          >
                            {b.status === 'in_review' ? 'In Review' : b.status}
                          </span>
                          <span className="text-xs text-slate-400 flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {b.createdAt?.toDate
                              ? b.createdAt.toDate().toLocaleDateString(undefined, {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })
                              : 'Recent'}
                          </span>
                        </div>
                      </div>

                      {/* Middle: Service Booked & Full Project Message */}
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        <div className="lg:col-span-8 space-y-3">
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-xs font-bold text-[#6A35FF] dark:text-purple-300">
                            <Tag className="w-3.5 h-3.5" />
                            <span>Service Booked: {b.serviceRequired}</span>
                          </div>

                          <div className="bg-[#FAF9FE] dark:bg-slate-900/60 p-4 rounded-2xl border border-indigo-50 dark:border-slate-800/80">
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                              Client Scope &amp; Project Requirements:
                            </div>
                            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
                              {b.message}
                            </p>
                          </div>
                        </div>

                        {/* Right: Client Contact Quick Links */}
                        <div className="lg:col-span-4 bg-[#FAF9FF] dark:bg-slate-900/40 p-4 rounded-2xl border border-indigo-100/70 dark:border-slate-800 space-y-3">
                          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                            Direct Contact Actions
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs bg-white dark:bg-slate-800/80 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
                              <span className="truncate mr-2 font-mono text-[11px] text-slate-600 dark:text-slate-300">
                                {b.email}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleCopy(b.email, `email-${b.id}`)}
                                title="Copy email address"
                                className="text-slate-400 hover:text-[#6A35FF] p-1 cursor-pointer"
                              >
                                {copiedId === `email-${b.id}` ? (
                                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5" />
                                )}
                              </button>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              <a
                                href={clientWhatsAppHref}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl text-emerald-700 dark:text-emerald-300 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 transition-colors"
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                                <span>WhatsApp</span>
                              </a>

                              <a
                                href={clientMailtoHref}
                                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl text-indigo-700 dark:text-indigo-300 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 transition-colors"
                              >
                                <Mail className="w-3.5 h-3.5" />
                                <span>Email</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Agency Scoping Note Section */}
                      <div className="pt-2 border-t border-indigo-50 dark:border-slate-800/80 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                            <ShieldCheck className="w-3.5 h-3.5 text-[#6A35FF]" />
                            <span>Agency Scoping Note:</span>
                          </span>

                          {editingNoteId !== b.id && (
                            <button
                              type="button"
                              onClick={() => {
                                setEditingNoteId(b.id);
                                setNoteDraft(b.agencyNote || '');
                              }}
                              className="text-xs font-semibold text-[#6A35FF] dark:text-purple-300 hover:underline cursor-pointer"
                            >
                              {b.agencyNote ? 'Edit Note' : '+ Add Note'}
                            </button>
                          )}
                        </div>

                        {editingNoteId === b.id ? (
                          <div className="space-y-2 bg-[#FAF9FE] dark:bg-slate-900 p-3 rounded-2xl border border-indigo-100 dark:border-slate-800">
                            <textarea
                              rows={3}
                              value={noteDraft}
                              onChange={(e) => setNoteDraft(e.target.value)}
                              placeholder="Add internal notes on consultation, pricing agreed, timeline, or next steps..."
                              className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#070A12] text-slate-900 dark:text-slate-100 focus:outline-none focus:border-[#6A35FF]"
                            />
                            <div className="flex items-center justify-end gap-2">
                              <button
                                type="button"
                                onClick={() => setEditingNoteId(null)}
                                className="px-3 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-700 cursor-pointer"
                              >
                                Cancel
                              </button>
                              <button
                                type="button"
                                onClick={() => handleSaveAgencyNote(b.id)}
                                className="px-4 py-1.5 text-xs font-bold text-white bg-brand-gradient rounded-xl shadow-xs cursor-pointer hover:opacity-95"
                              >
                                Save Scoping Note
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900/40 p-3 rounded-xl border border-slate-100 dark:border-slate-800/60">
                            {b.agencyNote ? (
                              <p className="whitespace-pre-wrap">{b.agencyNote}</p>
                            ) : (
                              <span className="text-slate-400 italic">
                                No internal scoping note added yet. Click &quot;+ Add Note&quot; to log internal status.
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Bottom Controls: Workflow Status Changer & Delete Action */}
                      <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-indigo-50 dark:border-slate-800/80">
                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                          <span className="text-xs font-semibold text-slate-400 mr-1">
                            Set Status:
                          </span>
                          <button
                            type="button"
                            disabled={b.status === 'new'}
                            onClick={() => handleUpdateStatus(b.id, 'new')}
                            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 cursor-pointer disabled:opacity-40"
                          >
                            New
                          </button>
                          <button
                            type="button"
                            disabled={b.status === 'in_review'}
                            onClick={() => handleUpdateStatus(b.id, 'in_review')}
                            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 cursor-pointer disabled:opacity-40"
                          >
                            In Review
                          </button>
                          <button
                            type="button"
                            disabled={b.status === 'responded'}
                            onClick={() => handleUpdateStatus(b.id, 'responded')}
                            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200 cursor-pointer disabled:opacity-40"
                          >
                            Responded
                          </button>
                          <button
                            type="button"
                            disabled={b.status === 'completed'}
                            onClick={() => handleUpdateStatus(b.id, 'completed')}
                            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 cursor-pointer disabled:opacity-40"
                          >
                            Completed
                          </button>
                        </div>

                        <button
                          type="button"
                          disabled={deletingId === b.id}
                          onClick={() => handleDeleteBooking(b.id)}
                          className="inline-flex items-center gap-1 text-xs text-red-500 hover:text-red-700 dark:hover:text-red-400 font-semibold p-1.5 cursor-pointer disabled:opacity-50"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
