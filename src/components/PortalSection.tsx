import React, { useState, useEffect } from 'react';
import {
  collection,
  doc,
  query,
  where,
  onSnapshot,
  setDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import {
  LogIn,
  LogOut,
  ShieldCheck,
  Inbox,
  FolderKanban,
  MessageSquareQuote,
  Check,
  Trash2,
  Plus,
  Mail,
  MessageCircle,
  AlertCircle,
  ExternalLink,
  Eye,
  EyeOff,
  LayoutDashboard,
} from 'lucide-react';
import { useFirebase } from '../context/FirebaseContext';
import { ClientDashboardView } from './ClientDashboardView';
import {
  db,
  handleFirestoreError,
  formatReadableFirestoreError,
  generateSafeDocId,
  OperationType,
  SCHEMA_CONSTRAINTS,
} from '../lib/firebase';
import {
  SERVICES_DATA,
  buildWhatsAppUrl,
  buildMailtoUrl,
  RoutePath,
} from '../data/agencyData';
import { PortfolioCategory } from '../data/portfolioData';

export interface CloudInquiryRecord {
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
  createdAt?: Timestamp | null;
  updatedAt?: Timestamp | null;
}

export interface CloudPortfolioRecord {
  id: string;
  authorId: string;
  title: string;
  category: Exclude<PortfolioCategory, 'All'>;
  statusLabel: 'Client Project' | 'Agency Concept Showcase';
  shortDescription: string;
  detailedOverview: string;
  deliverables: string[];
  toolsAndApproach: string[];
  imageUrl: string;
  relatedService: string;
  visibility: 'published' | 'draft';
  createdAt?: Timestamp | null;
  updatedAt?: Timestamp | null;
}

export interface CloudTestimonialRecord {
  id: string;
  authorId: string;
  displayName: string;
  roleAndCompany: string;
  reviewText: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt?: Timestamp | null;
  updatedAt?: Timestamp | null;
}

const PORTFOLIO_CATEGORY_OPTIONS: Exclude<PortfolioCategory, 'All'>[] = [
  'Website Development',
  'Social Media Designs',
  'Branding & Logo Design',
  'Marketing Campaigns',
  'Advertising Creatives',
];

function formatTimestamp(ts?: Timestamp | null): string {
  if (!ts || typeof ts.toDate !== 'function') return 'Just now';
  return ts.toDate().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function getStatusLabel(status: CloudInquiryRecord['status']): string {
  switch (status) {
    case 'new':
      return 'New Inquiry';
    case 'in_review':
      return 'In Review';
    case 'responded':
      return 'Responded';
    case 'completed':
      return 'Completed';
  }
}

interface PortalSectionProps {
  onNavigate: (path: RoutePath) => void;
}

export const PortalSection: React.FC<PortalSectionProps> = ({ onNavigate }) => {
  const { user, authReady, isAdmin, authError, signInWithGoogle, signOutUser } =
    useFirebase();

  const [activeAdminTab, setActiveAdminTab] = useState<
    'inquiries' | 'portfolio' | 'reviews' | 'client_preview'
  >('inquiries');

  const [activeClientTab, setActiveClientTab] = useState<
    'dashboard' | 'inquiries' | 'reviews'
  >('dashboard');

  const [inquiries, setInquiries] = useState<CloudInquiryRecord[]>([]);
  const [portfolioProjects, setPortfolioProjects] = useState<
    CloudPortfolioRecord[]
  >([]);
  const [reviews, setReviews] = useState<CloudTestimonialRecord[]>([]);
  const [actionError, setActionError] = useState<{
    message: string;
    upgradeUrl?: string;
  } | null>(null);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  // Admin draft states for updating inquiries
  const [noteDrafts, setNoteDrafts] = useState<Record<string, string>>({});
  const [statusDrafts, setStatusDrafts] = useState<
    Record<string, CloudInquiryRecord['status']>
  >({});

  // Client edit state for 'new' inquiries
  const [editingInquiryId, setEditingInquiryId] = useState<string | null>(null);
  const [clientMessageDraft, setClientMessageDraft] = useState('');

  // Admin new portfolio project form state
  const [newProject, setNewProject] = useState({
    title: '',
    category: 'Website Development' as Exclude<PortfolioCategory, 'All'>,
    statusLabel: 'Client Project' as
      | 'Client Project'
      | 'Agency Concept Showcase',
    shortDescription: '',
    detailedOverview: '',
    deliverablesText:
      'Custom responsive design\nSEO-ready page architecture\nLead capture integration',
    toolsText: 'Web Design, UI/UX, Conversion Strategy',
    imageUrl: '',
    relatedService: SERVICES_DATA[3].title,
    visibility: 'published' as 'published' | 'draft',
  });
  const [savingProject, setSavingProject] = useState(false);

  // Real-time listeners attached ONLY after auth is ready & user is verified
  useEffect(() => {
    if (!authReady || !user || !user.emailVerified) {
      setInquiries([]);
      setPortfolioProjects([]);
      setReviews([]);
      return;
    }

    setActionError(null);

    // 1. Inquiries listener (Admin gets all; Client gets strictly their own via clientId == uid)
    const inquiriesQuery = isAdmin
      ? collection(db, 'inquiries')
      : query(collection(db, 'inquiries'), where('clientId', '==', user.uid));

    const unsubInquiries = onSnapshot(
      inquiriesQuery,
      (snapshot) => {
        const docs = snapshot.docs.map((d) => ({
          id: d.id,
          ...(d.data() as Omit<CloudInquiryRecord, 'id'>),
        }));
        docs.sort(
          (a, b) =>
            (b.createdAt?.toMillis?.() ?? 0) - (a.createdAt?.toMillis?.() ?? 0)
        );
        setInquiries(docs);
      },
      (err) => {
        try {
          handleFirestoreError(err, OperationType.LIST, 'inquiries');
        } catch (rethrown) {
          setActionError(formatReadableFirestoreError(rethrown));
        }
      }
    );

    // 2. Testimonials listener (Admin gets all; Client gets their own authored reviews)
    const reviewsQuery = isAdmin
      ? collection(db, 'testimonials')
      : query(collection(db, 'testimonials'), where('authorId', '==', user.uid));

    const unsubReviews = onSnapshot(
      reviewsQuery,
      (snapshot) => {
        const docs = snapshot.docs.map((d) => ({
          id: d.id,
          ...(d.data() as Omit<CloudTestimonialRecord, 'id'>),
        }));
        docs.sort(
          (a, b) =>
            (b.createdAt?.toMillis?.() ?? 0) - (a.createdAt?.toMillis?.() ?? 0)
        );
        setReviews(docs);
      },
      (err) => {
        try {
          handleFirestoreError(err, OperationType.LIST, 'testimonials');
        } catch (rethrown) {
          setActionError(formatReadableFirestoreError(rethrown));
        }
      }
    );

    // 3. Portfolio Projects listener (Admin only in Portal)
    let unsubPortfolio = () => {};
    if (isAdmin) {
      unsubPortfolio = onSnapshot(
        collection(db, 'portfolioProjects'),
        (snapshot) => {
          const docs = snapshot.docs.map((d) => ({
            id: d.id,
            ...(d.data() as Omit<CloudPortfolioRecord, 'id'>),
          }));
          docs.sort(
            (a, b) =>
              (b.createdAt?.toMillis?.() ?? 0) -
              (a.createdAt?.toMillis?.() ?? 0)
          );
          setPortfolioProjects(docs);
        },
        (err) => {
          try {
            handleFirestoreError(err, OperationType.LIST, 'portfolioProjects');
          } catch (rethrown) {
            setActionError(formatReadableFirestoreError(rethrown));
          }
        }
      );
    }

    return () => {
      unsubInquiries();
      unsubReviews();
      unsubPortfolio();
    };
  }, [authReady, user, isAdmin]);

  const showTempFeedback = (msg: string) => {
    setActionFeedback(msg);
    setTimeout(() => setActionFeedback(null), 3500);
  };

  // Admin: Save inquiry status & agencyNote
  const handleAdminUpdateInquiry = async (inq: CloudInquiryRecord) => {
    setActionError(null);
    const nextStatus = statusDrafts[inq.id] ?? inq.status;
    const nextNote = (noteDrafts[inq.id] ?? inq.agencyNote)
      .trim()
      .slice(0, SCHEMA_CONSTRAINTS.inquiry.agencyNoteMax);

    const path = `inquiries/${inq.id}`;
    try {
      await updateDoc(doc(db, 'inquiries', inq.id), {
        status: nextStatus,
        agencyNote: nextNote,
        updatedAt: serverTimestamp(),
      });
      showTempFeedback(`Updated inquiry for ${inq.businessName}.`);
    } catch (err) {
      try {
        handleFirestoreError(err, OperationType.UPDATE, path);
      } catch (rethrown) {
        setActionError(formatReadableFirestoreError(rethrown));
      }
    }
  };

  // Client: Update own 'new' inquiry message
  const handleClientSaveInquiryEdit = async (inq: CloudInquiryRecord) => {
    setActionError(null);
    const trimmed = clientMessageDraft
      .trim()
      .slice(0, SCHEMA_CONSTRAINTS.inquiry.messageMax);
    if (trimmed.length < SCHEMA_CONSTRAINTS.inquiry.messageMin) {
      setActionError({
        message: 'Project details must be at least 10 characters.',
      });
      return;
    }

    const path = `inquiries/${inq.id}`;
    try {
      await updateDoc(doc(db, 'inquiries', inq.id), {
        message: trimmed,
        updatedAt: serverTimestamp(),
      });
      setEditingInquiryId(null);
      showTempFeedback('Your inquiry details have been updated.');
    } catch (err) {
      try {
        handleFirestoreError(err, OperationType.UPDATE, path);
      } catch (rethrown) {
        setActionError(formatReadableFirestoreError(rethrown));
      }
    }
  };

  // Admin: Create new live Portfolio Project
  const handleCreatePortfolioProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setActionError(null);

    const title = newProject.title
      .trim()
      .slice(0, SCHEMA_CONSTRAINTS.portfolio.titleMax);
    const shortDescription = newProject.shortDescription
      .trim()
      .slice(0, SCHEMA_CONSTRAINTS.portfolio.shortDescMax);
    const detailedOverview = newProject.detailedOverview
      .trim()
      .slice(0, SCHEMA_CONSTRAINTS.portfolio.overviewMax);
    const imageUrl = newProject.imageUrl
      .trim()
      .slice(0, SCHEMA_CONSTRAINTS.portfolio.imageUrlMax);

    const deliverables = newProject.deliverablesText
      .split('\n')
      .map((s) => s.trim().slice(0, SCHEMA_CONSTRAINTS.portfolio.deliverableItemMax))
      .filter((s) => s.length >= 2)
      .slice(0, SCHEMA_CONSTRAINTS.portfolio.maxDeliverables);

    const toolsAndApproach = newProject.toolsText
      .split(',')
      .map((s) => s.trim().slice(0, SCHEMA_CONSTRAINTS.portfolio.toolItemMax))
      .filter((s) => s.length >= 2)
      .slice(0, SCHEMA_CONSTRAINTS.portfolio.maxTools);

    if (
      title.length < SCHEMA_CONSTRAINTS.portfolio.titleMin ||
      shortDescription.length < SCHEMA_CONSTRAINTS.portfolio.shortDescMin ||
      detailedOverview.length < SCHEMA_CONSTRAINTS.portfolio.overviewMin ||
      deliverables.length === 0 ||
      toolsAndApproach.length === 0
    ) {
      setActionError({
        message:
          'Please provide a title, summary (10+ chars), overview (10+ chars), at least one deliverable line, and at least one approach tag.',
      });
      return;
    }

    setSavingProject(true);
    const docId = generateSafeDocId('proj');
    const path = `portfolioProjects/${docId}`;

    try {
      await setDoc(doc(db, 'portfolioProjects', docId), {
        authorId: user.uid,
        title,
        category: newProject.category,
        statusLabel: newProject.statusLabel,
        shortDescription,
        detailedOverview,
        deliverables,
        toolsAndApproach,
        imageUrl,
        relatedService: newProject.relatedService.slice(0, 140),
        visibility: newProject.visibility,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      setNewProject((prev) => ({
        ...prev,
        title: '',
        shortDescription: '',
        detailedOverview: '',
        imageUrl: '',
      }));
      showTempFeedback('Portfolio project saved to Firestore.');
    } catch (err) {
      try {
        handleFirestoreError(err, OperationType.CREATE, path);
      } catch (rethrown) {
        setActionError(formatReadableFirestoreError(rethrown));
      }
    } finally {
      setSavingProject(false);
    }
  };

  // Admin: Toggle portfolio visibility
  const handleToggleProjectVisibility = async (proj: CloudPortfolioRecord) => {
    setActionError(null);
    const nextVis = proj.visibility === 'published' ? 'draft' : 'published';
    const path = `portfolioProjects/${proj.id}`;
    try {
      await updateDoc(doc(db, 'portfolioProjects', proj.id), {
        visibility: nextVis,
        updatedAt: serverTimestamp(),
      });
      showTempFeedback(
        `Project "${proj.title}" is now ${nextVis === 'published' ? 'Published' : 'Draft'}.`
      );
    } catch (err) {
      try {
        handleFirestoreError(err, OperationType.UPDATE, path);
      } catch (rethrown) {
        setActionError(formatReadableFirestoreError(rethrown));
      }
    }
  };

  // Admin: Delete portfolio project
  const handleDeleteProject = async (projId: string) => {
    setActionError(null);
    const path = `portfolioProjects/${projId}`;
    try {
      await deleteDoc(doc(db, 'portfolioProjects', projId));
      showTempFeedback('Portfolio item removed.');
    } catch (err) {
      try {
        handleFirestoreError(err, OperationType.DELETE, path);
      } catch (rethrown) {
        setActionError(formatReadableFirestoreError(rethrown));
      }
    }
  };

  // Admin: Moderate testimonial status
  const handleModerateReview = async (
    revId: string,
    nextStatus: CloudTestimonialRecord['status']
  ) => {
    setActionError(null);
    const path = `testimonials/${revId}`;
    try {
      await updateDoc(doc(db, 'testimonials', revId), {
        status: nextStatus,
        updatedAt: serverTimestamp(),
      });
      showTempFeedback(`Review marked as ${nextStatus}.`);
    } catch (err) {
      try {
        handleFirestoreError(err, OperationType.UPDATE, path);
      } catch (rethrown) {
        setActionError(formatReadableFirestoreError(rethrown));
      }
    }
  };

  // Client (pending) or Admin: Delete testimonial
  const handleDeleteReview = async (revId: string) => {
    setActionError(null);
    const path = `testimonials/${revId}`;
    try {
      await deleteDoc(doc(db, 'testimonials', revId));
      showTempFeedback('Review deleted.');
    } catch (err) {
      try {
        handleFirestoreError(err, OperationType.DELETE, path);
      } catch (rethrown) {
        setActionError(formatReadableFirestoreError(rethrown));
      }
    }
  };

  if (!authReady) {
    return (
      <section className="py-24 bg-[#FAF9FF]">
        <div className="max-w-3xl mx-auto px-4 text-center text-sm text-slate-500">
          Connecting to ZENVEXA Cloud Portal...
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-22 bg-[#FAF9FF] border-b border-indigo-100/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Signed-Out State: Full Secure-Looking Client Dashboard Landing Page */}
        {!user ? (
          <div className="space-y-12">
            <ClientDashboardView
              isSignedIn={false}
              onSignIn={signInWithGoogle}
              onNavigate={onNavigate}
            />

            {/* Secure Sign-In Access Box */}
            <div className="max-w-xl mx-auto bg-white rounded-3xl p-8 sm:p-10 border border-indigo-100 shadow-sm text-center space-y-5">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-[#F5F3FF] text-[#6A35FF] flex items-center justify-center shadow-xs">
                <ShieldCheck className="w-6 h-6" />
              </div>

              <div>
                <div className="text-xs font-bold text-[#6A35FF]">
                  ZENVEXA Cloud Workspace
                </div>
                <h3 className="mt-1 text-xl sm:text-2xl font-extrabold text-[#0B0F19]">
                  Access Your Dedicated Client Account
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Sign in with Google to view confidential inquiry updates, direct scoping responses from Anis &amp; Awais, and submit verified project feedback.
                </p>
              </div>

              {authError && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
                  {authError}
                </div>
              )}

              <div className="pt-2">
                <button
                  type="button"
                  onClick={signInWithGoogle}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm sm:text-base font-semibold text-white bg-brand-gradient bg-brand-gradient-hover rounded-xl shadow-md shadow-indigo-500/20 transition-all cursor-pointer"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In with Google</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Authenticated Top Bar */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-indigo-100 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                  <span className="font-bold text-[#6A35FF]">
                    {isAdmin
                      ? 'ZENVEXA Agency Administrator'
                      : 'Verified Client Account'}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{user.email}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B0F19]">
                  {isAdmin
                    ? 'ZENVEXA Agency Management Console'
                    : `Welcome, ${user.displayName || 'Partner'}`}
                </h1>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                {!isAdmin && (
                  <button
                    type="button"
                    onClick={() => onNavigate('/contact')}
                    className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-brand-gradient rounded-xl cursor-pointer"
                  >
                    New Inquiry
                  </button>
                )}
                <button
                  type="button"
                  onClick={signOutUser}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 hover:text-[#0B0F19] bg-slate-100 hover:bg-slate-200/80 rounded-xl transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>

            {/* Feedback & Error Notices */}
            {actionFeedback && (
              <div className="p-4 rounded-2xl bg-[#F5F3FF] border border-indigo-200 text-sm font-medium text-[#0B0F19] flex items-center gap-2">
                <Check className="w-4 h-4 text-[#6A35FF] shrink-0" />
                <span>{actionFeedback}</span>
              </div>
            )}

            {actionError && (
              <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-sm text-red-800 space-y-2">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                  <span>{actionError.message}</span>
                </div>
                {actionError.upgradeUrl && (
                  <a
                    href={actionError.upgradeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-red-700 underline"
                  >
                    <span>Open Firebase Database Console</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            )}

            {/* ============================================================== */}
            {/* ADMIN VIEW: Inquiries Inbox · Portfolio Publisher · Moderation */}
            {/* ============================================================== */}
            {isAdmin ? (
              <div className="space-y-8">
                <div
                  className="inline-flex items-center gap-1 p-1.5 bg-white rounded-2xl border border-indigo-100 shadow-2xs"
                  role="tablist"
                >
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeAdminTab === 'inquiries'}
                    onClick={() => setActiveAdminTab('inquiries')}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer ${
                      activeAdminTab === 'inquiries'
                        ? 'bg-brand-gradient text-white shadow-xs'
                        : 'text-slate-600 hover:text-[#0B0F19]'
                    }`}
                  >
                    <Inbox className="w-4 h-4" />
                    <span>Inquiries ({inquiries.length})</span>
                  </button>

                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeAdminTab === 'portfolio'}
                    onClick={() => setActiveAdminTab('portfolio')}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer ${
                      activeAdminTab === 'portfolio'
                        ? 'bg-brand-gradient text-white shadow-xs'
                        : 'text-slate-600 hover:text-[#0B0F19]'
                    }`}
                  >
                    <FolderKanban className="w-4 h-4" />
                    <span>Portfolio ({portfolioProjects.length})</span>
                  </button>

                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeAdminTab === 'reviews'}
                    onClick={() => setActiveAdminTab('reviews')}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer ${
                      activeAdminTab === 'reviews'
                        ? 'bg-brand-gradient text-white shadow-xs'
                        : 'text-slate-600 hover:text-[#0B0F19]'
                    }`}
                  >
                    <MessageSquareQuote className="w-4 h-4" />
                    <span>Reviews ({reviews.length})</span>
                  </button>

                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeAdminTab === 'client_preview'}
                    onClick={() => setActiveAdminTab('client_preview')}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer ${
                      activeAdminTab === 'client_preview'
                        ? 'bg-brand-gradient text-white shadow-xs'
                        : 'text-slate-600 hover:text-[#0B0F19]'
                    }`}
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Client Dashboard Preview</span>
                  </button>
                </div>

                {/* Tab 1: Admin Inquiries Inbox */}
                {activeAdminTab === 'inquiries' && (
                  <div className="space-y-4">
                    {inquiries.length === 0 ? (
                      <div className="bg-white rounded-3xl p-10 border border-indigo-100 text-center text-sm text-slate-500">
                        No cloud inquiries submitted yet. New client submissions
                        from the Contact form will appear here in real time.
                      </div>
                    ) : (
                      inquiries.map((inq) => (
                        <div
                          key={inq.id}
                          className="bg-white rounded-2xl p-6 border border-indigo-100 shadow-2xs space-y-4"
                        >
                          <div className="flex flex-wrap items-start justify-between gap-4">
                            <div>
                              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                                <span className="font-bold text-[#6A35FF]">
                                  {getStatusLabel(inq.status)}
                                </span>
                                <span aria-hidden="true">·</span>
                                <span>{formatTimestamp(inq.createdAt)}</span>
                                <span aria-hidden="true">·</span>
                                <span>{inq.country}</span>
                              </div>
                              <h3 className="mt-1 text-lg font-bold text-[#0B0F19]">
                                {inq.businessName} — {inq.serviceRequired}
                              </h3>
                              <div className="text-xs sm:text-sm text-slate-600 mt-0.5">
                                {inq.fullName} · {inq.email}
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <a
                                href={buildWhatsAppUrl(
                                  `Hello ${inq.fullName}, this is Awais from ZENVEXA Digital Agency following up on your inquiry regarding ${inq.serviceRequired} for ${inq.businessName}.`
                                )}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#0B0F19] bg-[#F5F3FF] hover:bg-indigo-100 rounded-lg transition-colors"
                              >
                                <MessageCircle className="w-3.5 h-3.5 text-[#6A35FF]" />
                                <span>WhatsApp</span>
                              </a>
                              <a
                                href={`mailto:${encodeURIComponent(inq.email)}?subject=${encodeURIComponent(`Re: Your ZENVEXA Inquiry — ${inq.serviceRequired}`)}`}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#0B0F19] bg-[#F5F3FF] hover:bg-indigo-100 rounded-lg transition-colors"
                              >
                                <Mail className="w-3.5 h-3.5 text-[#6A35FF]" />
                                <span>Email Client</span>
                              </a>
                            </div>
                          </div>

                          <p className="text-sm text-slate-700 bg-[#FAF9FE] p-4 rounded-xl border border-indigo-100/70 whitespace-pre-line">
                            {inq.message}
                          </p>

                          <div className="pt-2 grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
                            <div className="md:col-span-3">
                              <label className="block text-xs font-bold text-slate-600 mb-1">
                                Workflow Status
                              </label>
                              <select
                                value={statusDrafts[inq.id] ?? inq.status}
                                onChange={(e) =>
                                  setStatusDrafts((prev) => ({
                                    ...prev,
                                    [inq.id]: e.target
                                      .value as CloudInquiryRecord['status'],
                                  }))
                                }
                                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-indigo-100 bg-white text-[#0B0F19]"
                              >
                                <option value="new">New Inquiry</option>
                                <option value="in_review">In Review</option>
                                <option value="responded">Responded</option>
                                <option value="completed">Completed</option>
                              </select>
                            </div>

                            <div className="md:col-span-7">
                              <label className="block text-xs font-bold text-slate-600 mb-1">
                                Agency Response Note (Visible to Client)
                              </label>
                              <input
                                type="text"
                                value={noteDrafts[inq.id] ?? inq.agencyNote}
                                onChange={(e) =>
                                  setNoteDrafts((prev) => ({
                                    ...prev,
                                    [inq.id]: e.target.value,
                                  }))
                                }
                                placeholder="Share scoping feedback, next steps, or proposal status..."
                                className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-indigo-100 bg-white text-[#0B0F19]"
                              />
                            </div>

                            <div className="md:col-span-2">
                              <button
                                type="button"
                                onClick={() => handleAdminUpdateInquiry(inq)}
                                className="w-full px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-brand-gradient rounded-xl cursor-pointer"
                              >
                                Save Update
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {/* Tab 2: Admin Live Portfolio Publisher */}
                {activeAdminTab === 'portfolio' && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <form
                      onSubmit={handleCreatePortfolioProject}
                      className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-indigo-100 shadow-2xs space-y-4"
                    >
                      <h2 className="text-lg font-extrabold text-[#0B0F19]">
                        Add Portfolio Project
                      </h2>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Project Title *
                        </label>
                        <input
                          type="text"
                          required
                          maxLength={140}
                          value={newProject.title}
                          onChange={(e) =>
                            setNewProject((p) => ({
                              ...p,
                              title: e.target.value,
                            }))
                          }
                          placeholder="e.g. Modern E-Commerce Brand Launch"
                          className="w-full px-3.5 py-2 text-sm rounded-xl border border-indigo-100 bg-[#FAF9FE]"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Category
                          </label>
                          <select
                            value={newProject.category}
                            onChange={(e) =>
                              setNewProject((p) => ({
                                ...p,
                                category: e.target
                                  .value as Exclude<PortfolioCategory, 'All'>,
                              }))
                            }
                            className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-indigo-100 bg-[#FAF9FE]"
                          >
                            {PORTFOLIO_CATEGORY_OPTIONS.map((cat) => (
                              <option key={cat} value={cat}>
                                {cat}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Project Type
                          </label>
                          <select
                            value={newProject.statusLabel}
                            onChange={(e) =>
                              setNewProject((p) => ({
                                ...p,
                                statusLabel: e.target.value as
                                  | 'Client Project'
                                  | 'Agency Concept Showcase',
                              }))
                            }
                            className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-indigo-100 bg-[#FAF9FE]"
                          >
                            <option value="Client Project">
                              Client Project
                            </option>
                            <option value="Agency Concept Showcase">
                              Agency Concept Showcase
                            </option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Cover Image URL (Optional)
                        </label>
                        <input
                          type="url"
                          maxLength={600}
                          value={newProject.imageUrl}
                          onChange={(e) =>
                            setNewProject((p) => ({
                              ...p,
                              imageUrl: e.target.value,
                            }))
                          }
                          placeholder="https://... (leave blank for vector preview)"
                          className="w-full px-3.5 py-2 text-sm rounded-xl border border-indigo-100 bg-[#FAF9FE]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Card Summary *
                        </label>
                        <textarea
                          rows={2}
                          required
                          maxLength={320}
                          value={newProject.shortDescription}
                          onChange={(e) =>
                            setNewProject((p) => ({
                              ...p,
                              shortDescription: e.target.value,
                            }))
                          }
                          placeholder="Brief 1-2 sentence summary shown on the portfolio card..."
                          className="w-full px-3.5 py-2 text-sm rounded-xl border border-indigo-100 bg-[#FAF9FE]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Detailed Project Overview *
                        </label>
                        <textarea
                          rows={3}
                          required
                          maxLength={1500}
                          value={newProject.detailedOverview}
                          onChange={(e) =>
                            setNewProject((p) => ({
                              ...p,
                              detailedOverview: e.target.value,
                            }))
                          }
                          placeholder="Full project scope, strategy, and deliverables shown in the detail modal..."
                          className="w-full px-3.5 py-2 text-sm rounded-xl border border-indigo-100 bg-[#FAF9FE]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Deliverables (One per line, max 8) *
                        </label>
                        <textarea
                          rows={3}
                          required
                          value={newProject.deliverablesText}
                          onChange={(e) =>
                            setNewProject((p) => ({
                              ...p,
                              deliverablesText: e.target.value,
                            }))
                          }
                          className="w-full px-3.5 py-2 text-xs rounded-xl border border-indigo-100 bg-[#FAF9FE]"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Tags (Comma-separated)
                          </label>
                          <input
                            type="text"
                            required
                            value={newProject.toolsText}
                            onChange={(e) =>
                              setNewProject((p) => ({
                                ...p,
                                toolsText: e.target.value,
                              }))
                            }
                            className="w-full px-3 py-2 text-xs rounded-xl border border-indigo-100 bg-[#FAF9FE]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Visibility
                          </label>
                          <select
                            value={newProject.visibility}
                            onChange={(e) =>
                              setNewProject((p) => ({
                                ...p,
                                visibility: e.target.value as
                                  | 'published'
                                  | 'draft',
                              }))
                            }
                            className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-indigo-100 bg-[#FAF9FE]"
                          >
                            <option value="published">
                              Published (Live on Site)
                            </option>
                            <option value="draft">Draft (Hidden)</option>
                          </select>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={savingProject}
                        className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-brand-gradient rounded-xl cursor-pointer disabled:opacity-60"
                      >
                        <Plus className="w-4 h-4" />
                        <span>
                          {savingProject
                            ? 'Saving Project...'
                            : 'Publish Portfolio Item'}
                        </span>
                      </button>
                    </form>

                    <div className="lg:col-span-7 space-y-4">
                      {portfolioProjects.length === 0 ? (
                        <div className="bg-white rounded-3xl p-10 border border-indigo-100 text-center text-sm text-slate-500">
                          No custom cloud portfolio items added yet. Your built-in
                          ZENVEXA Concept Showcases are currently active on the
                          Portfolio page, and any live projects added here will
                          appear alongside them automatically.
                        </div>
                      ) : (
                        portfolioProjects.map((proj) => (
                          <div
                            key={proj.id}
                            className="bg-white rounded-2xl p-5 border border-indigo-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                          >
                            <div className="space-y-1">
                              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                                <span className="font-bold text-[#6A35FF]">
                                  {proj.category}
                                </span>
                                <span aria-hidden="true">·</span>
                                <span>{proj.statusLabel}</span>
                                <span aria-hidden="true">·</span>
                                <span
                                  className={
                                    proj.visibility === 'published'
                                      ? 'text-emerald-600 font-semibold'
                                      : 'text-amber-600 font-semibold'
                                  }
                                >
                                  {proj.visibility === 'published'
                                    ? 'Published'
                                    : 'Draft'}
                                </span>
                              </div>
                              <h3 className="text-base font-bold text-[#0B0F19]">
                                {proj.title}
                              </h3>
                              <p className="text-xs text-slate-600 line-clamp-2">
                                {proj.shortDescription}
                              </p>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <button
                                type="button"
                                onClick={() =>
                                  handleToggleProjectVisibility(proj)
                                }
                                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#0B0F19] bg-[#F5F3FF] hover:bg-indigo-100 rounded-lg cursor-pointer"
                              >
                                {proj.visibility === 'published' ? (
                                  <>
                                    <EyeOff className="w-3.5 h-3.5" />
                                    <span>Set Draft</span>
                                  </>
                                ) : (
                                  <>
                                    <Eye className="w-3.5 h-3.5" />
                                    <span>Publish</span>
                                  </>
                                )}
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteProject(proj.id)}
                                className="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                                aria-label={`Delete ${proj.title}`}
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}

                {/* Tab 3: Admin Reviews Moderation */}
                {activeAdminTab === 'reviews' && (
                  <div className="space-y-4">
                    {reviews.length === 0 ? (
                      <div className="bg-white rounded-3xl p-10 border border-indigo-100 text-center text-sm text-slate-500">
                        No client testimonials submitted for moderation yet.
                      </div>
                    ) : (
                      reviews.map((rev) => (
                        <div
                          key={rev.id}
                          className="bg-white rounded-2xl p-6 border border-indigo-100 flex flex-col sm:flex-row sm:items-center justify-between gap-5"
                        >
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                              <span
                                className={`font-bold ${
                                  rev.status === 'approved'
                                    ? 'text-emerald-600'
                                    : rev.status === 'rejected'
                                      ? 'text-red-600'
                                      : 'text-amber-600'
                                }`}
                              >
                                {rev.status === 'approved'
                                  ? 'Approved (Live)'
                                  : rev.status === 'rejected'
                                    ? 'Hidden'
                                    : 'Pending Review'}
                              </span>
                              <span aria-hidden="true">·</span>
                              <span>{formatTimestamp(rev.createdAt)}</span>
                            </div>
                            <div className="text-base font-bold text-[#0B0F19]">
                              {rev.displayName}{' '}
                              <span className="text-xs font-medium text-slate-500">
                                — {rev.roleAndCompany}
                              </span>
                            </div>
                            <p className="text-sm text-slate-600 italic">
                              “{rev.reviewText}”
                            </p>
                          </div>

                          <div className="flex flex-wrap items-center gap-2 shrink-0">
                            {rev.status !== 'approved' && (
                              <button
                                type="button"
                                onClick={() =>
                                  handleModerateReview(rev.id, 'approved')
                                }
                                className="px-3.5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg cursor-pointer"
                              >
                                Approve
                              </button>
                            )}
                            {rev.status !== 'rejected' && (
                              <button
                                type="button"
                                onClick={() =>
                                  handleModerateReview(rev.id, 'rejected')
                                }
                                className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer"
                              >
                                Hide
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => handleDeleteReview(rev.id)}
                              className="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 cursor-pointer"
                              aria-label="Delete review"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {/* Tab 4: Admin Client Dashboard Preview */}
                {activeAdminTab === 'client_preview' && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-[#F5F3FF] border border-indigo-200 text-xs sm:text-sm text-[#0B0F19] flex items-center gap-2">
                      <LayoutDashboard className="w-4 h-4 text-[#6A35FF] shrink-0" />
                      <span>
                        <strong>Admin Live Preview:</strong> Viewing the secure client dashboard exactly as seen by clients with Active Campaigns &amp; Website Development progress bars.
                      </span>
                    </div>

                    <ClientDashboardView
                      isSignedIn={true}
                      userName={user.displayName}
                      userEmail={user.email}
                      onNavigate={onNavigate}
                    />
                  </div>
                )}
              </div>
            ) : (
              /* ============================================================== */
              /* CLIENT VIEW: Live Dashboard & Progress · Inquiries · Reviews   */
              /* ============================================================== */
              <div className="space-y-8">
                {/* Client Navigation Tabs */}
                <div
                  className="inline-flex items-center gap-1 p-1.5 bg-white rounded-2xl border border-indigo-100 shadow-2xs"
                  role="tablist"
                >
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeClientTab === 'dashboard'}
                    onClick={() => setActiveClientTab('dashboard')}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer ${
                      activeClientTab === 'dashboard'
                        ? 'bg-brand-gradient text-white shadow-xs'
                        : 'text-slate-600 hover:text-[#0B0F19]'
                    }`}
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Project &amp; Campaign Dashboard</span>
                  </button>

                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeClientTab === 'inquiries'}
                    onClick={() => setActiveClientTab('inquiries')}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer ${
                      activeClientTab === 'inquiries'
                        ? 'bg-brand-gradient text-white shadow-xs'
                        : 'text-slate-600 hover:text-[#0B0F19]'
                    }`}
                  >
                    <Inbox className="w-4 h-4" />
                    <span>My Inquiries ({inquiries.length})</span>
                  </button>

                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeClientTab === 'reviews'}
                    onClick={() => setActiveClientTab('reviews')}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer ${
                      activeClientTab === 'reviews'
                        ? 'bg-brand-gradient text-white shadow-xs'
                        : 'text-slate-600 hover:text-[#0B0F19]'
                    }`}
                  >
                    <MessageSquareQuote className="w-4 h-4" />
                    <span>My Reviews ({reviews.length})</span>
                  </button>
                </div>

                {/* Tab 1: Client Active Dashboard & Progress Trackers */}
                {activeClientTab === 'dashboard' && (
                  <ClientDashboardView
                    isSignedIn={true}
                    userName={user.displayName}
                    userEmail={user.email}
                    onNavigate={onNavigate}
                  />
                )}

                {/* Tab 2 & 3: Client Inquiries & Reviews */}
                {activeClientTab !== 'dashboard' && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-8 space-y-4">
                      <h2 className="text-lg font-extrabold text-[#0B0F19]">
                        My Project Inquiries ({inquiries.length})
                      </h2>

                  {inquiries.length === 0 ? (
                    <div className="bg-white rounded-3xl p-8 border border-indigo-100 text-sm text-slate-600 space-y-4">
                      <p>
                        You haven’t submitted any online inquiries under this
                        Google account yet.
                      </p>
                      <button
                        type="button"
                        onClick={() => onNavigate('/contact')}
                        className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-brand-gradient rounded-xl cursor-pointer"
                      >
                        Submit a Project Inquiry
                      </button>
                    </div>
                  ) : (
                    inquiries.map((inq) => (
                      <div
                        key={inq.id}
                        className="bg-white rounded-2xl p-6 border border-indigo-100 shadow-2xs space-y-4"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="text-xs text-slate-500">
                            <span className="font-bold text-[#6A35FF]">
                              {getStatusLabel(inq.status)}
                            </span>{' '}
                            · Submitted {formatTimestamp(inq.createdAt)}
                          </div>
                          {inq.status === 'new' &&
                            editingInquiryId !== inq.id && (
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingInquiryId(inq.id);
                                  setClientMessageDraft(inq.message);
                                }}
                                className="text-xs font-semibold text-[#6A35FF] hover:text-[#0B0F19] cursor-pointer"
                              >
                                Edit Details
                              </button>
                            )}
                        </div>

                        <h3 className="text-base sm:text-lg font-bold text-[#0B0F19]">
                          {inq.serviceRequired} — {inq.businessName}
                        </h3>

                        {editingInquiryId === inq.id ? (
                          <div className="space-y-3">
                            <textarea
                              rows={3}
                              value={clientMessageDraft}
                              onChange={(e) =>
                                setClientMessageDraft(e.target.value)
                              }
                              className="w-full px-3.5 py-2 text-sm rounded-xl border border-indigo-200 bg-[#FAF9FE]"
                            />
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => handleClientSaveInquiryEdit(inq)}
                                className="px-4 py-2 text-xs font-semibold text-white bg-brand-gradient rounded-lg cursor-pointer"
                              >
                                Save Changes
                              </button>
                              <button
                                type="button"
                                onClick={() => setEditingInquiryId(null)}
                                className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 rounded-lg cursor-pointer"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <p className="text-sm text-slate-600 whitespace-pre-line">
                            {inq.message}
                          </p>
                        )}

                        {inq.agencyNote && (
                          <div className="p-4 rounded-xl bg-[#F5F3FF] border border-indigo-100 space-y-1">
                            <div className="text-xs font-bold text-[#6A35FF]">
                              Response from ZENVEXA Digital Agency
                            </div>
                            <p className="text-xs sm:text-sm text-[#0B0F19]">
                              {inq.agencyNote}
                            </p>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>

                <div className="lg:col-span-4 space-y-4">
                  <h2 className="text-lg font-extrabold text-[#0B0F19]">
                    My Reviews ({reviews.length})
                  </h2>

                  {reviews.length === 0 ? (
                    <div className="bg-white rounded-3xl p-6 border border-indigo-100 text-xs sm:text-sm text-slate-600">
                      Worked with ZENVEXA? You can submit a verified client
                      review from the Testimonials section on the homepage.
                    </div>
                  ) : (
                    reviews.map((rev) => (
                      <div
                        key={rev.id}
                        className="bg-white rounded-2xl p-5 border border-indigo-100 space-y-2.5"
                      >
                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <span className="font-bold text-[#6A35FF]">
                            {rev.status === 'approved'
                              ? 'Published'
                              : rev.status === 'rejected'
                                ? 'Not Published'
                                : 'Pending Approval'}
                          </span>
                          {rev.status === 'pending' && (
                            <button
                              type="button"
                              onClick={() => handleDeleteReview(rev.id)}
                              className="text-slate-400 hover:text-red-600 cursor-pointer"
                              aria-label="Withdraw pending review"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm text-slate-700 italic">
                          “{rev.reviewText}”
                        </p>
                      </div>
                    ))
                  )}

                  <div className="bg-white rounded-2xl p-5 border border-indigo-100 space-y-3">
                    <div className="text-xs font-bold text-[#0B0F19]">
                      Need Immediate Assistance?
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <a
                        href={buildWhatsAppUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-brand-gradient rounded-lg"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>
                      <a
                        href={buildMailtoUrl()}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#0B0F19] bg-[#F5F3FF] rounded-lg"
                      >
                        <Mail className="w-3.5 h-3.5 text-[#6A35FF]" />
                        <span>Email</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    )}
  </div>
</section>
);
};
