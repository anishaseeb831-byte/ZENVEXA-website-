import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import {
  Quote,
  MessageSquarePlus,
  ArrowUpRight,
  X,
  CheckCircle2,
  AlertCircle,
  LogIn,
  ExternalLink,
} from 'lucide-react';
import {
  collection,
  doc,
  query,
  where,
  onSnapshot,
  setDoc,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import {
  GENUINE_TESTIMONIALS,
  AGENCY_COMMITMENT_VOICES,
  TestimonialItem,
} from '../data/testimonialsData';
import { buildMailtoUrl, COMPANY_INFO, RoutePath } from '../data/agencyData';
import { useFirebase } from '../context/FirebaseContext';
import {
  db,
  handleFirestoreError,
  formatReadableFirestoreError,
  generateSafeDocId,
  OperationType,
  SCHEMA_CONSTRAINTS,
} from '../lib/firebase';

interface ApprovedTestimonialDoc {
  displayName: string;
  roleAndCompany: string;
  reviewText: string;
  status: 'approved';
  createdAt?: Timestamp | null;
}

interface TestimonialsSectionProps {
  onNavigate?: (path: RoutePath) => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  onNavigate,
}) => {
  const { user, signInWithGoogle, authError } = useFirebase();

  const [cloudReviews, setCloudReviews] = useState<TestimonialItem[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const [displayName, setDisplayName] = useState('');
  const [roleAndCompany, setRoleAndCompany] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [formError, setFormError] = useState<{
    message: string;
    upgradeUrl?: string;
  } | null>(null);

  // Pre-fill displayName when Google account connects
  useEffect(() => {
    if (user?.displayName && !displayName) {
      setDisplayName(user.displayName);
    }
  }, [user, displayName]);

  // Real-time subscription to moderation-approved client reviews
  useEffect(() => {
    const approvedQuery = query(
      collection(db, 'testimonials'),
      where('status', '==', 'approved')
    );

    const unsubscribe = onSnapshot(
      approvedQuery,
      (snapshot) => {
        const docs = snapshot.docs
          .map((d) => {
            const data = d.data() as ApprovedTestimonialDoc;
            return {
              createdMillis: data.createdAt?.toMillis?.() ?? 0,
              item: {
                id: d.id,
                name: data.displayName,
                roleAndCompany: data.roleAndCompany,
                reviewText: data.reviewText,
              } satisfies TestimonialItem,
            };
          })
          .sort((a, b) => b.createdMillis - a.createdMillis)
          .map((entry) => entry.item);

        setCloudReviews(docs);
      },
      (err) => {
        try {
          handleFirestoreError(err, OperationType.LIST, 'testimonials');
        } catch {
          // Graceful degradation: preserve leadership commitment cards on quota/offline
        }
      }
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModalOpen(false);
    };
    if (modalOpen) {
      window.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [modalOpen]);

  const allApprovedReviews = useMemo(
    () => [...cloudReviews, ...GENUINE_TESTIMONIALS],
    [cloudReviews]
  );

  const hasClientReviews = allApprovedReviews.length > 0;

  const openReviewModal = () => {
    setFormError(null);
    setSubmittedSuccess(false);
    setModalOpen(true);
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const cleanName = displayName
      .trim()
      .slice(0, SCHEMA_CONSTRAINTS.testimonial.displayNameMax);
    const cleanRole = roleAndCompany
      .trim()
      .slice(0, SCHEMA_CONSTRAINTS.testimonial.roleMax);
    const cleanReview = reviewText
      .trim()
      .slice(0, SCHEMA_CONSTRAINTS.testimonial.reviewMax);

    if (cleanName.length < SCHEMA_CONSTRAINTS.testimonial.displayNameMin) {
      setFormError({ message: 'Please enter your name (at least 2 characters).' });
      return;
    }
    if (cleanRole.length < SCHEMA_CONSTRAINTS.testimonial.roleMin) {
      setFormError({
        message: 'Please enter your role and company (e.g. Founder, Brand Name).',
      });
      return;
    }
    if (cleanReview.length < SCHEMA_CONSTRAINTS.testimonial.reviewMin) {
      setFormError({
        message: 'Please share at least 15 characters describing your experience.',
      });
      return;
    }

    setSubmitting(true);
    try {
      const activeUser = user || (await signInWithGoogle());
      if (!activeUser) {
        setFormError({
          message:
            authError ||
            'Please sign in with Google to verify your identity before submitting a review.',
        });
        setSubmitting(false);
        return;
      }

      if (!activeUser.emailVerified) {
        setFormError({
          message:
            'A verified Google email address is required to submit a client review.',
        });
        setSubmitting(false);
        return;
      }

      const docId = generateSafeDocId('rev');
      const path = `testimonials/${docId}`;

      try {
        await setDoc(doc(db, 'testimonials', docId), {
          authorId: activeUser.uid,
          displayName: cleanName,
          roleAndCompany: cleanRole,
          reviewText: cleanReview,
          status: 'pending',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });

        setSubmittedSuccess(true);
        setReviewText('');
      } catch (err) {
        try {
          handleFirestoreError(err, OperationType.CREATE, path);
        } catch (rethrown) {
          setFormError(formatReadableFirestoreError(rethrown));
        }
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-20 lg:py-24 bg-[#FAF9FF] border-b border-indigo-100/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-xs sm:text-sm font-bold text-[#6A35FF]">
                {hasClientReviews
                  ? 'Client Feedback · Verified Reviews'
                  : 'Partnership Standards & Client Feedback'}
              </span>
              <span
                className="h-0.5 w-10 bg-gradient-to-r from-[#6A35FF] to-[#3B82F6] rounded-full"
                aria-hidden="true"
              />
            </div>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0B0F19] headline-balance">
              {hasClientReviews ? (
                <>
                  What Our{' '}
                  <span className="text-brand-gradient">Clients Say.</span>
                </>
              ) : (
                <>
                  Built on Trust &amp;{' '}
                  <span className="text-brand-gradient">
                    Accountable Delivery.
                  </span>
                </>
              )}
            </h2>
          </div>

          <button
            type="button"
            onClick={openReviewModal}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#6A35FF] hover:text-[#0B0F19] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Submit Verified Review</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Render Approved Client Reviews when present */}
        {hasClientReviews ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {allApprovedReviews.map((review, idx) => (
              <motion.article
                key={review.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.3, delay: (idx % 3) * 0.05 }}
                className="bg-white rounded-2xl p-7 border border-indigo-100/80 shadow-xs flex flex-col justify-between"
              >
                <p className="text-sm text-slate-600 italic leading-relaxed">
                  “{review.reviewText}”
                </p>

                <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {review.avatarUrl ? (
                      <img
                        src={review.avatarUrl}
                        alt={review.name}
                        referrerPolicy="no-referrer"
                        className="w-11 h-11 rounded-full object-cover border border-indigo-100 shrink-0"
                      />
                    ) : (
                      <div className="w-11 h-11 rounded-full bg-brand-gradient text-white font-bold text-sm flex items-center justify-center shrink-0">
                        {review.name.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <div className="text-sm font-bold text-[#0B0F19]">
                        {review.name}
                      </div>
                      <div className="text-xs text-slate-500">
                        {review.roleAndCompany}
                      </div>
                    </div>
                  </div>

                  <Quote
                    className="w-6 h-6 text-indigo-300 shrink-0"
                    aria-hidden="true"
                  />
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          /* Zero Fake Reviews Fallback: Leadership Commitment Cards + Verified Submission Card */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {AGENCY_COMMITMENT_VOICES.map((voice, idx) => (
              <motion.article
                key={voice.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="bg-white rounded-2xl p-7 border border-indigo-100/80 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-semibold text-[#6A35FF] mb-3">
                    ZENVEXA Partnership Pledge
                  </div>
                  <p className="text-sm text-slate-600 italic leading-relaxed">
                    “{voice.quote}”
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-brand-gradient text-white font-extrabold text-sm flex items-center justify-center shrink-0 shadow-xs">
                      {voice.initials}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#0B0F19]">
                        {voice.name}
                      </div>
                      <div className="text-xs text-slate-500">{voice.role}</div>
                    </div>
                  </div>

                  <Quote
                    className="w-6 h-6 text-indigo-300 shrink-0"
                    aria-hidden="true"
                  />
                </div>
              </motion.article>
            ))}

            {/* Card 3: Genuine Client Review Invitation */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="bg-white rounded-2xl p-7 border border-indigo-100/80 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#F3F0FF] text-[#6A35FF] flex items-center justify-center mb-4">
                  <MessageSquarePlus className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#0B0F19]">
                  Verified Client Reviews Only
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  We publish only authentic, moderation-approved feedback from
                  real ZENVEXA partners. Worked with our team? Submit your
                  verified review online.
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={openReviewModal}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#6A35FF] hover:text-[#0B0F19] transition-colors cursor-pointer"
                >
                  <span>Write a Verified Review</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <a
                  href={buildMailtoUrl(
                    `Client Review Submission — ${COMPANY_INFO.name}`,
                    `Hello ZENVEXA Team,\n\nHere is my review of working together:\n\nName:\nCompany:\nService Used:\nReview:\n`
                  )}
                  className="text-xs font-medium text-slate-500 hover:text-[#0B0F19] transition-colors"
                >
                  Or via Email
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </div>

      {/* Verified Client Review Submission Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#080B14]/75 backdrop-blur-xs"
          onClick={() => setModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="review-modal-title"
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-indigo-100 space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-bold text-[#6A35FF]">
                  Verified Partner Feedback
                </div>
                <h3
                  id="review-modal-title"
                  className="mt-1 text-xl font-extrabold text-[#0B0F19]"
                >
                  Submit a Client Review
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close review modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {submittedSuccess ? (
              <div className="p-5 rounded-2xl bg-[#F5F3FF] border border-indigo-200 space-y-4">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#6A35FF] mt-0.5 shrink-0" />
                  <div>
                    <div className="text-sm font-bold text-[#0B0F19]">
                      Thank You — Review Submitted for Verification
                    </div>
                    <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Your feedback has been securely saved and queued for
                      review by the ZENVEXA team. Once approved, it will appear
                      publicly in this section.
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2.5">
                  {onNavigate && (
                    <button
                      type="button"
                      onClick={() => {
                        setModalOpen(false);
                        onNavigate('/portal');
                      }}
                      className="px-4 py-2 text-xs font-semibold text-white bg-brand-gradient rounded-lg cursor-pointer"
                    >
                      View in Client Portal
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {user
                    ? `Signed in as ${user.email}. Your email will not be displayed publicly.`
                    : 'Reviews are verified with Google Sign-In and moderated by ZENVEXA before public display.'}
                </p>

                {formError && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 space-y-1.5">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                      <span>{formError.message}</span>
                    </div>
                    {formError.upgradeUrl && (
                      <a
                        href={formError.upgradeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-bold underline"
                      >
                        <span>Open Firebase Console</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                )}

                <div>
                  <label
                    htmlFor="review-displayName"
                    className="block text-xs font-bold text-slate-700 mb-1"
                  >
                    Your Public Name <span className="text-[#6A35FF]">*</span>
                  </label>
                  <input
                    id="review-displayName"
                    type="text"
                    required
                    maxLength={SCHEMA_CONSTRAINTS.testimonial.displayNameMax}
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="e.g. Sarah Ahmed"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-indigo-100 bg-[#FAF9FE] focus:bg-white focus:outline-none focus:border-[#6A35FF]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="review-role"
                    className="block text-xs font-bold text-slate-700 mb-1"
                  >
                    Role &amp; Business Name{' '}
                    <span className="text-[#6A35FF]">*</span>
                  </label>
                  <input
                    id="review-role"
                    type="text"
                    required
                    maxLength={SCHEMA_CONSTRAINTS.testimonial.roleMax}
                    value={roleAndCompany}
                    onChange={(e) => setRoleAndCompany(e.target.value)}
                    placeholder="e.g. Founder, Apex Retail"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-indigo-100 bg-[#FAF9FE] focus:bg-white focus:outline-none focus:border-[#6A35FF]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="review-text"
                    className="block text-xs font-bold text-slate-700 mb-1"
                  >
                    Your Experience With ZENVEXA{' '}
                    <span className="text-[#6A35FF]">*</span>
                  </label>
                  <textarea
                    id="review-text"
                    rows={4}
                    required
                    maxLength={SCHEMA_CONSTRAINTS.testimonial.reviewMax}
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Share how ZENVEXA supported your website, branding, or marketing goals..."
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-indigo-100 bg-[#FAF9FE] focus:bg-white focus:outline-none focus:border-[#6A35FF] resize-y"
                  />
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-[#0B0F19] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-brand-gradient bg-brand-gradient-hover rounded-xl shadow-md shadow-indigo-500/20 disabled:opacity-60 cursor-pointer"
                  >
                    {!user && <LogIn className="w-4 h-4" />}
                    <span>
                      {submitting
                        ? 'Submitting...'
                        : user
                          ? 'Submit Review'
                          : 'Sign In & Submit Review'}
                    </span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
