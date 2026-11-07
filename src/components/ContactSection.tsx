import React, { useState, useEffect, useRef } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Send,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  Copy,
  Check,
  Code2,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  LogIn,
  ExternalLink,
} from 'lucide-react';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import {
  COMPANY_INFO,
  SERVICES_DATA,
  buildWhatsAppUrl,
  buildAwaisWhatsAppUrl,
  buildPhoneCallUrl,
  buildMailtoUrl,
  RoutePath,
} from '../data/agencyData';
import { CONTACT_INTEGRATION } from '../config/contactConfig';
import { useFirebase } from '../context/FirebaseContext';
import { Breadcrumbs } from './Breadcrumbs';
import { AGENCY_IMAGES } from '../data/agencyImages';
import {
  db,
  handleFirestoreError,
  formatReadableFirestoreError,
  generateSafeDocId,
  OperationType,
  SCHEMA_CONSTRAINTS,
} from '../lib/firebase';

export interface InquiryPreset {
  service: string;
  note: string;
  nonce: number;
}

interface ContactSectionProps {
  isStandalonePage?: boolean;
  inquiryPreset?: InquiryPreset | null;
  onNavigate?: (path: RoutePath) => void;
}

interface FormValues {
  fullName: string;
  email: string;
  businessName: string;
  country: string;
  serviceRequired: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;

type SubmissionStatus =
  | 'idle'
  | 'cloud-saved'
  | 'cloud-error'
  | 'whatsapp-opened'
  | 'email-opened'
  | 'automated-sent'
  | 'automated-error';

export const ContactSection: React.FC<ContactSectionProps> = ({
  isStandalonePage = false,
  inquiryPreset,
  onNavigate,
}) => {
  const HeadingTag = isStandalonePage ? 'h1' : 'h2';
  const { user, isAdmin, signInWithGoogle, authError } = useFirebase();

  const whatsappTriggerRef = useRef<HTMLAnchorElement>(null);
  const emailTriggerRef = useRef<HTMLAnchorElement>(null);

  const [values, setValues] = useState<FormValues>({
    fullName: '',
    email: '',
    businessName: '',
    country: '',
    serviceRequired: SERVICES_DATA[0].title,
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] =
    useState<SubmissionStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [upgradeUrl, setUpgradeUrl] = useState<string | undefined>(undefined);
  const [copied, setCopied] = useState(false);
  const [showIntegrationGuide, setShowIntegrationGuide] = useState(false);

  const isAutomatedEnabled = CONTACT_INTEGRATION.isAutomatedEnabled;

  // Prefill name and email when signed into Google if fields are empty
  useEffect(() => {
    if (user) {
      setValues((prev) => ({
        ...prev,
        fullName: prev.fullName || user.displayName || '',
        email: prev.email || user.email || '',
      }));
    }
  }, [user]);

  useEffect(() => {
    if (inquiryPreset && inquiryPreset.nonce > 0) {
      setValues((prev) => ({
        ...prev,
        serviceRequired: inquiryPreset.service || prev.serviceRequired,
        message: inquiryPreset.note ? inquiryPreset.note : prev.message,
      }));
      setSubmissionStatus('idle');
    }
  }, [inquiryPreset]);

  const validate = (form: FormValues): FormErrors => {
    const nextErrors: FormErrors = {};
    if (!form.fullName.trim()) {
      nextErrors.fullName = 'Please enter your full name.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim() || !emailRegex.test(form.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (!form.businessName.trim()) {
      nextErrors.businessName = 'Please enter your business or brand name.';
    }
    if (!form.country.trim()) {
      nextErrors.country = 'Please specify your country.';
    }
    if (!form.serviceRequired.trim()) {
      nextErrors.serviceRequired = 'Please select a service.';
    }
    if (!form.message.trim() || form.message.trim().length < 10) {
      nextErrors.message =
        'Please share brief project details (at least 10 characters).';
    }
    return nextErrors;
  };

  const formattedSummaryText = [
    `Hello ${COMPANY_INFO.name}, I would like to submit a project inquiry:`,
    '',
    `Full Name: ${values.fullName.trim()}`,
    `Email Address: ${values.email.trim()}`,
    `Business Name: ${values.businessName.trim()}`,
    `Country: ${values.country.trim()}`,
    `Service Required: ${values.serviceRequired}`,
    '',
    `Project Details:`,
    values.message.trim(),
  ].join('\n');

  const emailSubjectLine = `Project Inquiry: ${values.serviceRequired} — ${
    values.businessName.trim() || 'New Client'
  }`;

  const directWhatsAppHref = buildWhatsAppUrl(formattedSummaryText);
  const directEmailHref = buildMailtoUrl(
    emailSubjectLine,
    formattedSummaryText
  );
  const gmailComposeHref = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    COMPANY_INFO.email
  )}&su=${encodeURIComponent(emailSubjectLine)}&body=${encodeURIComponent(
    formattedSummaryText
  )}`;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormValues]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (submissionStatus !== 'idle') {
      setSubmissionStatus('idle');
    }
  };

  const runValidation = (): boolean => {
    const validationErrors = validate(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleDirectFallbackDispatch = (channel: 'whatsapp' | 'email') => {
    if (!runValidation()) return;

    if (channel === 'whatsapp') {
      whatsappTriggerRef.current?.click();
      setSubmissionStatus('whatsapp-opened');
    } else {
      emailTriggerRef.current?.click();
      setSubmissionStatus('email-opened');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!runValidation()) return;

    setSubmitting(true);
    setErrorMessage('');
    setUpgradeUrl(undefined);

    try {
      const activeUser = user || (await signInWithGoogle());
      if (!activeUser) {
        setSubmissionStatus('cloud-error');
        setErrorMessage(
          authError ||
            'Google sign-in was cancelled. Sign in with Google to save and track your inquiry online, or send directly via WhatsApp or Email below.'
        );
        return;
      }

      if (!activeUser.emailVerified) {
        setSubmissionStatus('cloud-error');
        setErrorMessage(
          'A verified Google email is required for cloud tracking. Please use WhatsApp or Email below to send your inquiry immediately.'
        );
        return;
      }

      const docId = generateSafeDocId('inq');
      const path = `inquiries/${docId}`;

      try {
        await setDoc(doc(db, 'inquiries', docId), {
          clientId: activeUser.uid,
          fullName: values.fullName
            .trim()
            .slice(0, SCHEMA_CONSTRAINTS.inquiry.fullNameMax),
          email: values.email
            .trim()
            .slice(0, SCHEMA_CONSTRAINTS.inquiry.emailMax),
          businessName: values.businessName
            .trim()
            .slice(0, SCHEMA_CONSTRAINTS.inquiry.businessNameMax),
          country: values.country
            .trim()
            .slice(0, SCHEMA_CONSTRAINTS.inquiry.countryMax),
          serviceRequired: values.serviceRequired
            .trim()
            .slice(0, SCHEMA_CONSTRAINTS.inquiry.serviceRequiredMax),
          message: values.message
            .trim()
            .slice(0, SCHEMA_CONSTRAINTS.inquiry.messageMax),
          status: 'new',
          agencyNote: '',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      } catch (firestoreErr) {
        try {
          handleFirestoreError(firestoreErr, OperationType.CREATE, path);
        } catch (rethrown) {
          const formatted = formatReadableFirestoreError(rethrown);
          setSubmissionStatus('cloud-error');
          setErrorMessage(
            `${formatted.message} You can still send your inquiry immediately via WhatsApp or Email below.`
          );
          setUpgradeUrl(formatted.upgradeUrl);
          return;
        }
      }

      // Optional secondary dispatch if Web3Forms or Custom Webhook is configured
      if (isAutomatedEnabled) {
        const useWeb3Forms = Boolean(CONTACT_INTEGRATION.web3FormsAccessKey);
        const targetUrl = useWeb3Forms
          ? 'https://api.web3forms.com/submit'
          : CONTACT_INTEGRATION.webhookUrl;

        const payload = useWeb3Forms
          ? {
              access_key: CONTACT_INTEGRATION.web3FormsAccessKey,
              subject: emailSubjectLine,
              from_name: values.fullName.trim(),
              name: values.fullName.trim(),
              email: values.email.trim(),
              business_name: values.businessName.trim(),
              country: values.country.trim(),
              service_required: values.serviceRequired,
              message: values.message.trim(),
            }
          : {
              fullName: values.fullName.trim(),
              email: values.email.trim(),
              businessName: values.businessName.trim(),
              country: values.country.trim(),
              serviceRequired: values.serviceRequired,
              message: values.message.trim(),
              submittedAt: new Date().toISOString(),
            };

        await fetch(targetUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(payload),
        }).catch(() => null);
      }

      setSubmissionStatus('cloud-saved');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCopyBrief = async () => {
    try {
      await navigator.clipboard.writeText(formattedSummaryText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className={isStandalonePage ? 'bg-[#FAF9FF] min-h-screen' : ''}>
      {isStandalonePage && onNavigate && (
        <Breadcrumbs
          items={[{ label: 'Contact Us' }]}
          onNavigate={onNavigate}
          subtitle="Direct Agency Communication & Instant Free Quote"
        />
      )}

      <section
        id="contact"
        className="py-16 lg:py-20 bg-[#FAF9FF] border-b border-indigo-100/70"
      >
        {/* Hidden safe anchor triggers for validated WhatsApp & Email dispatch */}
        <a
          ref={whatsappTriggerRef}
          href={directWhatsAppHref}
          target="_blank"
          rel="noopener noreferrer"
          className="sr-only"
          tabIndex={-1}
          aria-hidden="true"
        >
          Open WhatsApp Inquiry
        </a>
        <a
          ref={emailTriggerRef}
          href={directEmailHref}
          className="sr-only"
          tabIndex={-1}
          aria-hidden="true"
        >
          Open Email Inquiry
        </a>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
            {/* Left Column: Official Business Contact Information */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-xs sm:text-sm font-bold text-[#6A35FF]">
                    Contact Us · Request a Free Quote
                  </span>
                  <span
                    className="h-0.5 w-10 bg-gradient-to-r from-[#6A35FF] to-[#3B82F6] rounded-full"
                    aria-hidden="true"
                  />
                </div>
                <HeadingTag className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0B0F19] headline-balance">
                  Start a Conversation With{' '}
                  <span className="text-brand-gradient">ZENVEXA.</span>
                </HeadingTag>
                <p className="mt-4 text-base text-slate-600 leading-relaxed">
                  Reach out directly via WhatsApp, email, social channels, or our
                  project inquiry form. We work with businesses across Pakistan,
                  the United States, and international markets.
                </p>
              </div>

              {/* Consultation Studio Visual Card */}
              <div className="rounded-3xl overflow-hidden border border-indigo-100 shadow-sm relative group">
                <img
                  src={AGENCY_IMAGES.contactHero}
                  alt="ZENVEXA Strategy & Client Consultation Studio"
                  className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19]/85 via-[#0B0F19]/35 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-[11px] font-bold text-indigo-300 uppercase tracking-wider">
                    Direct Consultation
                  </div>
                  <div className="text-sm font-extrabold text-white mt-0.5">
                    Connect Directly With Agency Leadership
                  </div>
                  <div className="text-[11px] text-slate-300 mt-0.5">
                    Fast response via WhatsApp Hotline &amp; Google Cloud Inquiries
                  </div>
                </div>
              </div>

              {/* Direct Contact Channels Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-indigo-100 shadow-xs space-y-5">
                <div>
                  <div className="text-sm font-extrabold text-[#0B0F19]">
                  {COMPANY_INFO.name}
                </div>
                <div className="mt-1 text-xs text-slate-600">
                  Founder:{' '}
                  <strong className="text-[#0B0F19]">
                    {COMPANY_INFO.founder}
                  </strong>{' '}
                  · Representative:{' '}
                  <strong className="text-[#0B0F19]">
                    {COMPANY_INFO.representative}
                  </strong>{' '}
                  · Location:{' '}
                  <strong className="text-[#0B0F19]">
                    {COMPANY_INFO.location}
                  </strong>
                </div>
              </div>

              <div className="pt-4 border-t border-indigo-100/80 space-y-3.5">
                {/* 1. Anis (Founder) */}
                <div className="p-3.5 rounded-2xl bg-[#FAF9FE] border border-indigo-100/80 hover:border-indigo-300 transition-all space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-brand-gradient text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                        AN
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#0B0F19]">
                          {COMPANY_INFO.founder} (Founder)
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono">
                          {COMPANY_INFO.founderWhatsappDisplay}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <a
                      href={buildWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors shadow-2xs"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>
                    <a
                      href={buildPhoneCallUrl(COMPANY_INFO.founderPhone)}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 text-xs font-semibold transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call Now</span>
                    </a>
                  </div>
                </div>

                {/* 2. Awais (Representative / Partner) */}
                <div className="p-3.5 rounded-2xl bg-[#FAF9FE] border border-indigo-100/80 hover:border-indigo-300 transition-all space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#553BF6] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                        AW
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#0B0F19]">
                          {COMPANY_INFO.representative} (Representative)
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono">
                          {COMPANY_INFO.representativeWhatsappDisplay}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <a
                      href={buildAwaisWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors shadow-2xs"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>
                    <a
                      href={buildPhoneCallUrl(COMPANY_INFO.representativePhone)}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 text-xs font-semibold transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call Now</span>
                    </a>
                  </div>
                </div>

                <a
                  href={buildMailtoUrl()}
                  className="group flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#FAF9FE] hover:bg-white border border-indigo-100/80 hover:border-indigo-300 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#F3F0FF] text-[#6A35FF] group-hover:bg-[#6A35FF] group-hover:text-white transition-colors flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-slate-500">Official Email</div>
                    <div className="text-sm font-bold text-[#0B0F19] truncate">
                      {COMPANY_INFO.email}
                    </div>
                  </div>
                </a>

                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#FAF9FE] border border-indigo-100/80">
                  <div className="w-10 h-10 rounded-xl bg-[#F3F0FF] text-[#6A35FF] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">
                      Agency Location &amp; Coverage
                    </div>
                    <div className="text-sm font-bold text-[#0B0F19]">
                      {COMPANY_INFO.location} · Serving Global Clients
                    </div>
                  </div>
                </div>
              </div>

              {/* Clickable Social Profiles */}
              <div className="pt-4 border-t border-indigo-100/80">
                <div className="text-xs font-semibold text-slate-500 mb-3">
                  Connect on Social Media
                </div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <a
                    href={COMPANY_INFO.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FAF9FE] border border-indigo-100 hover:border-[#6A35FF] text-xs font-bold text-[#0B0F19] transition-colors whitespace-nowrap"
                  >
                    <span>Instagram (@zenvexahub)</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#6A35FF]" />
                  </a>

                  <a
                    href={COMPANY_INFO.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FAF9FE] border border-indigo-100 hover:border-[#6A35FF] text-xs font-bold text-[#0B0F19] transition-colors whitespace-nowrap"
                  >
                    <span>Facebook Page</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#6A35FF]" />
                  </a>
                </div>
              </div>
              {/* Client & Agency Portal Quick Link */}
              {onNavigate && (
                <div className="pt-4 border-t border-indigo-100/80">
                  <button
                    type="button"
                    onClick={() => onNavigate('/portal')}
                    className="w-full flex items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#F5F3FF] hover:bg-indigo-100/80 border border-indigo-100 transition-colors text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="w-5 h-5 text-[#6A35FF] shrink-0" />
                      <div>
                        <div className="text-xs font-bold text-[#0B0F19]">
                          {isAdmin
                            ? 'Open Agency Management Console'
                            : 'Client Inquiry Portal'}
                        </div>
                        <div className="text-xs text-slate-600">
                          {isAdmin
                            ? 'Manage inquiries, portfolio & client reviews'
                            : 'Track status & responses on submitted inquiries'}
                        </div>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#6A35FF] shrink-0" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Project Inquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-indigo-100 shadow-sm">
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B0F19]">
              Project Inquiry Form
            </h3>
            <p className="mt-1.5 text-sm text-slate-600">
              Submit your inquiry online with Google verification to track
              agency responses in real time—or send directly via WhatsApp or
              Email with no sign-in required.
            </p>

            <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="contact-fullName"
                    className="block text-xs font-bold text-slate-700 mb-1.5"
                  >
                    Full Name <span className="text-[#6A35FF]">*</span>
                  </label>
                  <input
                    id="contact-fullName"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    value={values.fullName}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.fullName)}
                    placeholder="Your full name"
                    className={`w-full px-4 py-2.5 text-sm rounded-xl border bg-[#FAF9FE] focus:bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#6A35FF]/20 focus:border-[#6A35FF] transition-colors ${
                      errors.fullName ? 'border-red-500' : 'border-indigo-100'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Email Address */}
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-bold text-slate-700 mb-1.5"
                  >
                    Email Address <span className="text-[#6A35FF]">*</span>
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.email)}
                    placeholder="you@company.com"
                    className={`w-full px-4 py-2.5 text-sm rounded-xl border bg-[#FAF9FE] focus:bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#6A35FF]/20 focus:border-[#6A35FF] transition-colors ${
                      errors.email ? 'border-red-500' : 'border-indigo-100'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                  )}
                </div>

                {/* Business Name */}
                <div>
                  <label
                    htmlFor="contact-businessName"
                    className="block text-xs font-bold text-slate-700 mb-1.5"
                  >
                    Business Name <span className="text-[#6A35FF]">*</span>
                  </label>
                  <input
                    id="contact-businessName"
                    name="businessName"
                    type="text"
                    autoComplete="organization"
                    value={values.businessName}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.businessName)}
                    placeholder="Your company or brand name"
                    className={`w-full px-4 py-2.5 text-sm rounded-xl border bg-[#FAF9FE] focus:bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#6A35FF]/20 focus:border-[#6A35FF] transition-colors ${
                      errors.businessName
                        ? 'border-red-500'
                        : 'border-indigo-100'
                    }`}
                  />
                  {errors.businessName && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.businessName}
                    </p>
                  )}
                </div>

                {/* Country */}
                <div>
                  <label
                    htmlFor="contact-country"
                    className="block text-xs font-bold text-slate-700 mb-1.5"
                  >
                    Country <span className="text-[#6A35FF]">*</span>
                  </label>
                  <input
                    id="contact-country"
                    name="country"
                    type="text"
                    autoComplete="country-name"
                    value={values.country}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.country)}
                    placeholder="e.g. United States, Pakistan, UK"
                    className={`w-full px-4 py-2.5 text-sm rounded-xl border bg-[#FAF9FE] focus:bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#6A35FF]/20 focus:border-[#6A35FF] transition-colors ${
                      errors.country ? 'border-red-500' : 'border-indigo-100'
                    }`}
                  />
                  {errors.country && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.country}
                    </p>
                  )}
                </div>
              </div>

              {/* Service Required */}
              <div>
                <label
                  htmlFor="contact-serviceRequired"
                  className="block text-xs font-bold text-slate-700 mb-1.5"
                >
                  Service Required <span className="text-[#6A35FF]">*</span>
                </label>
                <select
                  id="contact-serviceRequired"
                  name="serviceRequired"
                  value={values.serviceRequired}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-indigo-100 bg-[#FAF9FE] focus:bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#6A35FF]/20 focus:border-[#6A35FF] transition-colors"
                >
                  {SERVICES_DATA.map((service) => (
                    <option key={service.id} value={service.title}>
                      {typeof service.startingPrice === 'number' &&
                      service.billingType
                        ? `${service.title} (Starting at $${service.startingPrice}/${service.billingType})`
                        : service.title}
                    </option>
                  ))}
                  <option value="Custom Multi-Service Growth Plan">
                    Custom Multi-Service Growth Plan
                  </option>
                </select>
              </div>

              {/* Project Details / Message */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-bold text-slate-700 mb-1.5"
                >
                  Project Details / Message{' '}
                  <span className="text-[#6A35FF]">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  value={values.message}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.message)}
                  placeholder="Tell us about your business goals, timeline, and what you would like to achieve..."
                  className={`w-full px-4 py-2.5 text-sm rounded-xl border bg-[#FAF9FE] focus:bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#6A35FF]/20 focus:border-[#6A35FF] transition-colors resize-y ${
                    errors.message ? 'border-red-500' : 'border-indigo-100'
                  }`}
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-red-600">{errors.message}</p>
                )}
              </div>

              {/* Submission Actions: Cloud Submit + Direct WhatsApp & Email Channels */}
              <div className="pt-1 space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-brand-gradient bg-brand-gradient-hover disabled:opacity-60 rounded-xl shadow-md shadow-indigo-500/20 transition-all duration-150 whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6A35FF]"
                  >
                    {user ? (
                      <Send className="w-4 h-4 shrink-0" />
                    ) : (
                      <LogIn className="w-4 h-4 shrink-0" />
                    )}
                    <span>
                      {submitting
                        ? 'Saving Inquiry...'
                        : user
                          ? 'Submit Inquiry Online'
                          : 'Sign In & Submit Online'}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDirectFallbackDispatch('whatsapp')}
                    className="inline-flex items-center justify-center gap-2 px-4 py-3.5 text-xs sm:text-sm font-semibold text-[#0B0F19] bg-[#F5F3FF] hover:bg-indigo-100/70 border border-indigo-100 rounded-xl transition-colors duration-150 whitespace-nowrap cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 text-[#6A35FF] shrink-0" />
                    <span>Send via WhatsApp</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDirectFallbackDispatch('email')}
                    className="inline-flex items-center justify-center gap-2 px-4 py-3.5 text-xs sm:text-sm font-semibold text-[#0B0F19] bg-white hover:bg-[#F8F7FF] border border-slate-300 hover:border-indigo-300 rounded-xl transition-colors duration-150 whitespace-nowrap cursor-pointer"
                  >
                    <Mail className="w-4 h-4 text-[#6A35FF] shrink-0" />
                    <span>Send via Email</span>
                  </button>
                </div>

                <p className="text-xs text-slate-500">
                  {user
                    ? `Signed in as ${user.email}. Online inquiries save to your private Client Portal, or you can contact Founder Anis (${COMPANY_INFO.founderWhatsappDisplay}) or Representative Awais (${COMPANY_INFO.representativeWhatsappDisplay}) directly.`
                    : `Inquiries verify with Google so you can track responses in the Client Portal—or contact Founder Anis (${COMPANY_INFO.founderWhatsappDisplay}) or Representative Awais (${COMPANY_INFO.representativeWhatsappDisplay}) directly on WhatsApp or phone.`}
                </p>
              </div>
            </form>

            {/* Verified Cloud Firestore Submission Receipt */}
            {submissionStatus === 'cloud-saved' && (
              <div
                role="status"
                className="mt-6 p-5 rounded-2xl bg-[#F5F3FF] border border-indigo-200 space-y-3"
              >
                <div className="flex items-start gap-2.5 text-[#0B0F19]">
                  <CheckCircle2 className="w-5 h-5 text-[#6A35FF] mt-0.5 shrink-0" />
                  <div>
                    <div className="text-sm font-bold">
                      Project Inquiry Saved to ZENVEXA Cloud
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                      Thank you, {values.fullName}. Your inquiry for{' '}
                      <strong>{values.serviceRequired}</strong> has been
                      recorded. Our team will review your project brief and
                      follow up—and you can track status updates anytime in the
                      Client Portal.
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2.5 pt-1">
                  {onNavigate && (
                    <button
                      type="button"
                      onClick={() => onNavigate('/portal')}
                      className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-brand-gradient rounded-lg transition-all cursor-pointer"
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Track in Client Portal</span>
                    </button>
                  )}
                  <a
                    href={directWhatsAppHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#0B0F19] bg-white border border-indigo-200 hover:bg-indigo-50 rounded-lg transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[#6A35FF]" />
                    <span>Also Message on WhatsApp</span>
                  </a>
                </div>
              </div>
            )}

            {/* Cloud Error / Cancelled Sign-In -> Immediate WhatsApp & Email Fallback */}
            {submissionStatus === 'cloud-error' && (
              <div
                role="alert"
                className="mt-6 p-5 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-3"
              >
                <div className="flex items-start gap-2.5 text-amber-950">
                  <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                  <div className="space-y-1">
                    <div className="text-sm font-bold">
                      Direct WhatsApp &amp; Email Dispatch Ready
                    </div>
                    <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
                      {errorMessage}
                    </p>
                    {upgradeUrl && (
                      <a
                        href={upgradeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-bold text-amber-900 underline"
                      >
                        <span>Open Firebase Database Console</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2.5 pt-1">
                  <a
                    href={directWhatsAppHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-brand-gradient rounded-lg transition-all"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Send via WhatsApp</span>
                  </a>
                  <a
                    href={directEmailHref}
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#0B0F19] bg-white border border-slate-300 rounded-lg"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#6A35FF]" />
                    <span>Send via Email</span>
                  </a>
                  <a
                    href={gmailComposeHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#0B0F19] bg-white border border-slate-300 rounded-lg"
                  >
                    <span>Compose in Gmail</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#6A35FF]" />
                  </a>
                </div>
              </div>
            )}

            {/* Honest Handoff Notice: WhatsApp Opened */}
            {submissionStatus === 'whatsapp-opened' && (
              <div
                role="region"
                aria-label="WhatsApp inquiry handoff instructions"
                className="mt-6 p-5 rounded-2xl bg-[#F8F7FF] border border-indigo-200 space-y-3"
              >
                <div className="flex items-start gap-2.5">
                  <MessageCircle className="w-5 h-5 text-[#6A35FF] mt-0.5 shrink-0" />
                  <div>
                    <div className="text-sm font-bold text-[#0B0F19]">
                      Complete Sending in WhatsApp
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                      We opened WhatsApp with your formatted project inquiry.
                      Please press <strong>Send</strong> inside WhatsApp to
                      deliver your message to ZENVEXA. Prefer email instead? Use
                      an option below:
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 pt-1">
                  <a
                    href={directWhatsAppHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-brand-gradient rounded-lg transition-all whitespace-nowrap"
                  >
                    <span>Reopen WhatsApp</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href={directEmailHref}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#0B0F19] bg-white hover:bg-slate-50 border border-slate-300 rounded-lg transition-colors whitespace-nowrap"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#6A35FF]" />
                    <span>Open Email App</span>
                  </a>

                  <a
                    href={gmailComposeHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#0B0F19] bg-white hover:bg-slate-50 border border-slate-300 rounded-lg transition-colors whitespace-nowrap"
                  >
                    <span>Compose in Gmail</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#6A35FF]" />
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyBrief}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-[#0B0F19] bg-white border border-slate-200 rounded-lg transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#6A35FF]" />
                        <span>Copied Text</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Inquiry</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Honest Handoff Notice: Email Draft Opened */}
            {submissionStatus === 'email-opened' && (
              <div
                role="region"
                aria-label="Email inquiry handoff instructions"
                className="mt-6 p-5 rounded-2xl bg-[#F8F7FF] border border-indigo-200 space-y-3"
              >
                <div className="flex items-start gap-2.5">
                  <Mail className="w-5 h-5 text-[#6A35FF] mt-0.5 shrink-0" />
                  <div>
                    <div className="text-sm font-bold text-[#0B0F19]">
                      Complete Sending in Your Email Client
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                      We prepared an email addressed to{' '}
                      <strong>{COMPANY_INFO.email}</strong> with your project
                      details. Please press <strong>Send</strong> in your mail
                      app—or use Gmail web compose or WhatsApp below if no mail
                      app opened automatically:
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 pt-1">
                  <a
                    href={gmailComposeHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-brand-gradient rounded-lg transition-all whitespace-nowrap"
                  >
                    <span>Compose in Gmail</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href={directWhatsAppHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#0B0F19] bg-white hover:bg-slate-50 border border-slate-300 rounded-lg transition-colors whitespace-nowrap"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[#6A35FF]" />
                    <span>Send via WhatsApp Instead</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyBrief}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-[#0B0F19] bg-white border border-slate-200 rounded-lg transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#6A35FF]" />
                        <span>Copied Text</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Inquiry</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Verified Automated Delivery State */}
            {submissionStatus === 'automated-sent' && (
              <div
                role="status"
                className="mt-6 p-5 rounded-2xl bg-[#F5F3FF] border border-indigo-200 space-y-3"
              >
                <div className="flex items-start gap-2.5 text-[#0B0F19]">
                  <CheckCircle2 className="w-5 h-5 text-[#6A35FF] mt-0.5 shrink-0" />
                  <div>
                    <div className="text-sm font-bold">
                      Inquiry Delivered to ZENVEXA
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1">
                      Thank you, {values.fullName}. Your inquiry has been
                      submitted. You can also connect directly on WhatsApp below
                      for immediate follow-up.
                    </p>
                  </div>
                </div>
                <div className="pt-1">
                  <a
                    href={directWhatsAppHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#0B0F19] hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Message on WhatsApp</span>
                  </a>
                </div>
              </div>
            )}

            {/* Automated Error State -> Immediate WhatsApp & Email Fallback */}
            {submissionStatus === 'automated-error' && (
              <div
                role="alert"
                className="mt-6 p-5 rounded-2xl bg-red-50/70 border border-red-200 space-y-3"
              >
                <div className="flex items-start gap-2.5 text-red-900">
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-sm font-bold">
                      Direct Fallback Available
                    </div>
                    <p className="text-xs sm:text-sm text-red-800 mt-1">
                      {errorMessage}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2.5 pt-1">
                  <a
                    href={directWhatsAppHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-brand-gradient rounded-lg transition-all"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Send via WhatsApp</span>
                  </a>
                  <a
                    href={directEmailHref}
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#0B0F19] bg-white border border-slate-300 rounded-lg"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#6A35FF]" />
                    <span>Send via Email</span>
                  </a>
                  <a
                    href={gmailComposeHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#0B0F19] bg-white border border-slate-300 rounded-lg"
                  >
                    <span>Compose in Gmail</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#6A35FF]" />
                  </a>
                </div>
              </div>
            )}

            {/* Optional Web3Forms / Webhook Later Setup Guide */}
            <div className="mt-8 pt-5 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowIntegrationGuide((prev) => !prev)}
                className="flex items-center justify-between w-full text-left text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                aria-expanded={showIntegrationGuide}
              >
                <span className="inline-flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-[#6A35FF]" />
                  <span>
                    Optional Later Setup: Connect Web3Forms or Custom Webhook
                  </span>
                </span>
                {showIntegrationGuide ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>

              {showIntegrationGuide && (
                <div className="mt-3 p-4 rounded-2xl bg-[#FAF9FE] border border-indigo-100 text-xs text-slate-600 space-y-2 leading-relaxed">
                  <p className="font-semibold text-slate-800">
                    No environment variables are needed right now—WhatsApp and
                    Email dispatch are active by default.
                  </p>
                  <p>
                    Whenever you are ready to add automated inbox submissions:
                  </p>
                  <ol className="list-decimal list-inside space-y-1.5">
                    <li>
                      Request a free access key at{' '}
                      <span className="font-medium text-slate-800">
                        web3forms.com
                      </span>{' '}
                      for <strong>{COMPANY_INFO.email}</strong>.
                    </li>
                    <li>
                      Add{' '}
                      <code className="px-1.5 py-0.5 rounded bg-white border border-indigo-100 text-slate-800">
                        VITE_WEB3FORMS_ACCESS_KEY
                      </code>{' '}
                      in Vercel Environment Variables (or paste it into the
                      optional contact configuration file).
                    </li>
                    <li>
                      The form will automatically enable direct API submission
                      while keeping WhatsApp and Email as built-in fallbacks.
                    </li>
                  </ol>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
};
