/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Presentation,
  Mail,
  Send,
  Plus,
  RefreshCw,
  ExternalLink,
  Search,
  CheckCircle2,
  AlertCircle,
  FileText,
  Clock,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  Eye,
  X,
  Share2,
} from 'lucide-react';
import { useFirebase } from '../context/FirebaseContext';
import {
  listUserPresentations,
  createAgencyStrategyDeck,
  listGmailMessages,
  getGmailMessageBody,
  sendGmailMessage,
  GooglePresentationSummary,
  GmailMessageSummary,
} from '../lib/googleWorkspace';
import { SERVICES_DATA, COMPANY_INFO } from '../data/agencyData';

export const GoogleWorkspaceHub: React.FC = () => {
  const { user, accessToken, connectWorkspace } = useFirebase();

  // Active workspace tab
  const [activeTab, setActiveTab] = useState<'slides' | 'gmail'>('slides');

  // Slides state
  const [presentations, setPresentations] = useState<GooglePresentationSummary[]>([]);
  const [slidesLoading, setSlidesLoading] = useState(false);
  const [slidesError, setSlidesError] = useState<string | null>(null);
  const [slidesSearch, setSlidesSearch] = useState('');

  // New deck modal & confirmation
  const [isCreatingDeck, setIsCreatingDeck] = useState(false);
  const [deckClientName, setDeckClientName] = useState('');
  const [deckService, setDeckService] = useState(SERVICES_DATA[0].title);
  const [deckGoal, setDeckGoal] = useState('Scale organic visibility & qualified monthly leads');
  const [showDeckConfirmDialog, setShowDeckConfirmDialog] = useState(false);
  const [deckCreationSuccess, setDeckCreationSuccess] = useState<GooglePresentationSummary | null>(null);
  const [isSubmittingDeck, setIsSubmittingDeck] = useState(false);

  // Gmail state
  const [messages, setMessages] = useState<GmailMessageSummary[]>([]);
  const [gmailLoading, setGmailLoading] = useState(false);
  const [gmailError, setGmailError] = useState<string | null>(null);
  const [gmailQuery, setGmailQuery] = useState('');

  // View message detail modal
  const [viewingMessage, setViewingMessage] = useState<{
    subject: string;
    from: string;
    date: string;
    body: string;
  } | null>(null);
  const [readingMessageLoading, setReadingMessageLoading] = useState(false);

  // Compose email modal & confirmation
  const [isComposingEmail, setIsComposingEmail] = useState(false);
  const [composeTo, setComposeTo] = useState('');
  const [composeSubject, setComposeSubject] = useState('');
  const [composeBody, setComposeBody] = useState('');
  const [showEmailConfirmDialog, setShowEmailConfirmDialog] = useState(false);
  const [emailSendSuccess, setEmailSendSuccess] = useState<string | null>(null);
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  // Load presentations when connected or search changes
  useEffect(() => {
    if (!accessToken || activeTab !== 'slides') return;
    let isCancelled = false;

    async function loadDecks() {
      setSlidesLoading(true);
      setSlidesError(null);
      try {
        const data = await listUserPresentations(accessToken!, slidesSearch);
        if (!isCancelled) {
          setPresentations(data);
        }
      } catch (err: any) {
        if (!isCancelled) {
          setSlidesError(err.message || 'Failed to load Google Slides presentations.');
        }
      } finally {
        if (!isCancelled) setSlidesLoading(false);
      }
    }

    const timer = setTimeout(() => {
      void loadDecks();
    }, 300);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, [accessToken, activeTab, slidesSearch]);

  // Load Gmail messages when connected or query changes
  useEffect(() => {
    if (!accessToken || activeTab !== 'gmail') return;
    let isCancelled = false;

    async function loadEmails() {
      setGmailLoading(true);
      setGmailError(null);
      try {
        const data = await listGmailMessages(accessToken!, gmailQuery, 12);
        if (!isCancelled) {
          setMessages(data);
        }
      } catch (err: any) {
        if (!isCancelled) {
          setGmailError(err.message || 'Failed to load Gmail messages.');
        }
      } finally {
        if (!isCancelled) setGmailLoading(false);
      }
    }

    const timer = setTimeout(() => {
      void loadEmails();
    }, 350);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, [accessToken, activeTab, gmailQuery]);

  // Handle deck creation execution with explicit user confirmation
  const handleExecuteDeckCreation = async () => {
    if (!accessToken) return;
    setIsSubmittingDeck(true);
    setSlidesError(null);
    try {
      const newDeck = await createAgencyStrategyDeck(
        {
          clientName: deckClientName.trim() || 'New Partner',
          serviceName: deckService,
          primaryGoal: deckGoal.trim() || 'Digital Growth',
        },
        accessToken
      );
      setPresentations((prev) => [newDeck, ...prev]);
      setDeckCreationSuccess(newDeck);
      setShowDeckConfirmDialog(false);
      setIsCreatingDeck(false);
      setDeckClientName('');
    } catch (err: any) {
      setSlidesError(err.message || 'Failed to generate presentation.');
      setShowDeckConfirmDialog(false);
    } finally {
      setIsSubmittingDeck(false);
    }
  };

  // Handle email send execution with explicit user confirmation
  const handleExecuteEmailSend = async () => {
    if (!accessToken) return;
    setIsSendingEmail(true);
    setGmailError(null);
    try {
      await sendGmailMessage(
        {
          to: composeTo.trim(),
          subject: composeSubject.trim(),
          body: composeBody.trim(),
        },
        accessToken
      );
      setEmailSendSuccess(`Email successfully sent to ${composeTo.trim()}`);
      setShowEmailConfirmDialog(false);
      setIsComposingEmail(false);
      setComposeTo('');
      setComposeSubject('');
      setComposeBody('');
    } catch (err: any) {
      setGmailError(err.message || 'Failed to send email via Gmail.');
      setShowEmailConfirmDialog(false);
    } finally {
      setIsSendingEmail(false);
    }
  };

  // View full email
  const handleViewMessage = async (msgId: string) => {
    if (!accessToken) return;
    setReadingMessageLoading(true);
    try {
      const details = await getGmailMessageBody(msgId, accessToken);
      setViewingMessage(details);
    } catch (err: any) {
      setGmailError(err.message || 'Failed to fetch email body.');
    } finally {
      setReadingMessageLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white dark:bg-[#0D1222] rounded-3xl p-6 sm:p-7 border border-indigo-100 dark:border-slate-800 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5F3FF] dark:bg-purple-950/60 text-[#6A35FF] dark:text-purple-300 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Google Workspace Productivity Suite</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B0F19] dark:text-white">
            Google Slides &amp; Gmail Integration
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
            Create client pitch decks, access real-time presentation materials, and manage agency client communications directly via official Google APIs.
          </p>
        </div>

        {/* OAuth Authentication State */}
        <div className="shrink-0 flex items-center gap-3">
          {accessToken ? (
            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Workspace Connected</span>
            </div>
          ) : (
            <button
              type="button"
              onClick={connectWorkspace}
              className="inline-flex items-center gap-2.5 px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-brand-gradient bg-brand-gradient-hover rounded-xl shadow-md shadow-indigo-500/20 hover:scale-[1.02] transition-all cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Connect Google Workspace</span>
            </button>
          )}
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex items-center gap-2 border-b border-indigo-100 dark:border-slate-800 pb-3">
        <button
          type="button"
          onClick={() => setActiveTab('slides')}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'slides'
              ? 'bg-[#6A35FF] text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-[#0B0F19] dark:hover:text-white hover:bg-[#FAF9FE] dark:hover:bg-slate-800'
          }`}
        >
          <Presentation className="w-4 h-4" />
          <span>Google Slides &amp; Strategy Decks</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('gmail')}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'gmail'
              ? 'bg-[#6A35FF] text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-[#0B0F19] dark:hover:text-white hover:bg-[#FAF9FE] dark:hover:bg-slate-800'
          }`}
        >
          <Mail className="w-4 h-4" />
          <span>Gmail Communications</span>
        </button>
      </div>

      {/* Connection Notice if Not Authenticated */}
      {!accessToken && (
        <div className="bg-[#FAF9FE] dark:bg-[#0B0F19] rounded-2xl p-6 border border-indigo-100 dark:border-slate-800 text-center space-y-3">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-[#F5F3FF] dark:bg-purple-950/60 text-[#6A35FF] dark:text-purple-300 flex items-center justify-center">
            {activeTab === 'slides' ? (
              <Presentation className="w-6 h-6" />
            ) : (
              <Mail className="w-6 h-6" />
            )}
          </div>
          <h3 className="text-base font-bold text-[#0B0F19] dark:text-white">
            Connect Your Google Account
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
            Authorize access with your Google account to view and generate Google Slides presentations and manage client communications via Gmail.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={connectWorkspace}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-brand-gradient hover:opacity-95 shadow-md shadow-indigo-500/20 cursor-pointer"
            >
              <span>Authorize Google Workspace</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. GOOGLE SLIDES WORKSPACE TAB                                            */}
      {/* ========================================================================= */}
      {activeTab === 'slides' && accessToken && (
        <div className="space-y-6">
          {/* Action Bar: Search & New Deck Button */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={slidesSearch}
                onChange={(e) => setSlidesSearch(e.target.value)}
                placeholder="Search presentations in Google Drive..."
                className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-indigo-100 dark:border-slate-800 bg-white dark:bg-[#0D1222] text-[#0B0F19] dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#6A35FF]"
              />
            </div>

            <button
              type="button"
              onClick={() => setIsCreatingDeck(true)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold text-white bg-brand-gradient bg-brand-gradient-hover rounded-xl shadow-sm cursor-pointer whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              <span>Create Strategy Deck</span>
            </button>
          </div>

          {/* Success Banner */}
          {deckCreationSuccess && (
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs sm:text-sm text-emerald-900 dark:text-emerald-200 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>
                  Deck created: <strong>{deckCreationSuccess.title}</strong>
                </span>
              </div>
              <a
                href={deckCreationSuccess.webViewLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-bold text-[#6A35FF] dark:text-purple-300 underline shrink-0"
              >
                <span>Open in Google Slides</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}

          {/* Error Notice */}
          {slidesError && (
            <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-xs text-red-800 dark:text-red-200 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0" />
              <span>{slidesError}</span>
            </div>
          )}

          {/* Presentations Grid */}
          {slidesLoading ? (
            <div className="p-12 text-center text-slate-500 space-y-2">
              <RefreshCw className="w-6 h-6 animate-spin mx-auto text-[#6A35FF]" />
              <div className="text-xs font-semibold">Loading presentations from Google Slides...</div>
            </div>
          ) : presentations.length === 0 ? (
            <div className="bg-white dark:bg-[#0D1222] rounded-2xl p-10 border border-indigo-100 dark:border-slate-800 text-center space-y-3">
              <Presentation className="w-10 h-10 mx-auto text-slate-300 dark:text-slate-600" />
              <div className="text-sm font-bold text-[#0B0F19] dark:text-white">
                No Presentations Found
              </div>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Create a customized client pitch deck or strategy presentation directly in Google Slides.
              </p>
              <button
                type="button"
                onClick={() => setIsCreatingDeck(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-brand-gradient cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create Your First Deck</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {presentations.map((deck) => (
                <div
                  key={deck.id}
                  className="bg-white dark:bg-[#0D1222] rounded-2xl p-5 border border-indigo-100 dark:border-slate-800 shadow-2xs hover:border-indigo-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                        <Presentation className="w-4 h-4" />
                      </div>
                      <span className="text-[11px] text-slate-400 font-mono">
                        Google Slides
                      </span>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#0B0F19] dark:text-white group-hover:text-[#6A35FF] transition-colors line-clamp-2">
                        {deck.title}
                      </h4>
                      {deck.modifiedTime && (
                        <div className="mt-1 text-[11px] text-slate-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>
                            Updated {new Date(deck.modifiedTime).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-indigo-50 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">Ready to present</span>
                    <a
                      href={deck.webViewLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#6A35FF] dark:text-purple-300 hover:underline"
                    >
                      <span>Open Deck</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. GMAIL COMMUNICATIONS TAB                                               */}
      {/* ========================================================================= */}
      {activeTab === 'gmail' && accessToken && (
        <div className="space-y-6">
          {/* Action Bar: Search & Compose */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={gmailQuery}
                onChange={(e) => setGmailQuery(e.target.value)}
                placeholder="Search emails by sender, subject, or label..."
                className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-indigo-100 dark:border-slate-800 bg-white dark:bg-[#0D1222] text-[#0B0F19] dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#6A35FF]"
              />
            </div>

            <button
              type="button"
              onClick={() => setIsComposingEmail(true)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold text-white bg-brand-gradient bg-brand-gradient-hover rounded-xl shadow-sm cursor-pointer whitespace-nowrap"
            >
              <Send className="w-4 h-4" />
              <span>Compose Email</span>
            </button>
          </div>

          {/* Success Banner */}
          {emailSendSuccess && (
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs sm:text-sm text-emerald-900 dark:text-emerald-200 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{emailSendSuccess}</span>
              </div>
              <button
                type="button"
                onClick={() => setEmailSendSuccess(null)}
                className="text-emerald-700 hover:text-emerald-950 dark:text-emerald-300 text-xs font-bold cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Error Notice */}
          {gmailError && (
            <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-xs text-red-800 dark:text-red-200 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0" />
              <span>{gmailError}</span>
            </div>
          )}

          {/* Messages List */}
          {gmailLoading ? (
            <div className="p-12 text-center text-slate-500 space-y-2">
              <RefreshCw className="w-6 h-6 animate-spin mx-auto text-[#6A35FF]" />
              <div className="text-xs font-semibold">Loading messages from Gmail...</div>
            </div>
          ) : messages.length === 0 ? (
            <div className="bg-white dark:bg-[#0D1222] rounded-2xl p-10 border border-indigo-100 dark:border-slate-800 text-center space-y-3">
              <Mail className="w-10 h-10 mx-auto text-slate-300 dark:text-slate-600" />
              <div className="text-sm font-bold text-[#0B0F19] dark:text-white">
                No Messages Found
              </div>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                No recent emails match your search query. Compose a new message or refresh.
              </p>
            </div>
          ) : (
            <div className="bg-white dark:bg-[#0D1222] rounded-2xl border border-indigo-100 dark:border-slate-800 divide-y divide-indigo-50 dark:divide-slate-800 overflow-hidden">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  onClick={() => void handleViewMessage(msg.id)}
                  className={`p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#FAF9FE] dark:hover:bg-slate-800/60 transition-colors cursor-pointer ${
                    msg.unread ? 'bg-[#F9F7FF] dark:bg-purple-950/20' : ''
                  }`}
                >
                  <div className="space-y-1 flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      {msg.unread && (
                        <span className="w-2 h-2 rounded-full bg-[#6A35FF] shrink-0" />
                      )}
                      <span className="text-xs font-bold text-[#0B0F19] dark:text-white truncate">
                        {msg.from || 'Unknown Sender'}
                      </span>
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">
                      {msg.subject || '(No Subject)'}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                      {msg.snippet || 'No preview available'}
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0">
                    <span className="text-[11px] text-slate-400 whitespace-nowrap">
                      {msg.date ? new Date(msg.date).toLocaleDateString() : ''}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-[#6A35FF] dark:text-purple-300">
                      <span>View</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 1: CREATE GOOGLE SLIDES STRATEGY DECK                               */}
      {/* ========================================================================= */}
      {isCreatingDeck && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#0D1222] rounded-3xl p-6 sm:p-7 max-w-lg w-full border border-indigo-100 dark:border-slate-800 shadow-2xl space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                  <Presentation className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-bold text-[#0B0F19] dark:text-white">
                  Create Google Slides Pitch Deck
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsCreatingDeck(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Client / Business Name
                </label>
                <input
                  type="text"
                  value={deckClientName}
                  onChange={(e) => setDeckClientName(e.target.value)}
                  placeholder="e.g. Apex Global Logistics"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-indigo-100 dark:border-slate-800 bg-[#FAF9FE] dark:bg-[#111728] text-[#0B0F19] dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Agency Service Focus
                </label>
                <select
                  value={deckService}
                  onChange={(e) => setDeckService(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-indigo-100 dark:border-slate-800 bg-[#FAF9FE] dark:bg-[#111728] text-[#0B0F19] dark:text-white"
                >
                  {SERVICES_DATA.map((s) => (
                    <option key={s.id} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Primary Strategy Objective
                </label>
                <input
                  type="text"
                  value={deckGoal}
                  onChange={(e) => setDeckGoal(e.target.value)}
                  placeholder="e.g. Scale ROAS to 4.5x and build brand authority"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-indigo-100 dark:border-slate-800 bg-[#FAF9FE] dark:bg-[#111728] text-[#0B0F19] dark:text-white"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-indigo-50 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setIsCreatingDeck(false)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setShowDeckConfirmDialog(true)}
                className="px-5 py-2.5 rounded-xl bg-brand-gradient text-xs font-bold text-white shadow-sm cursor-pointer"
              >
                Continue to Review
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MANDATORY USER CONFIRMATION DIALOG FOR CREATING PRESENTATION */}
      {showDeckConfirmDialog && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#0D1222] rounded-3xl p-6 sm:p-7 max-w-md w-full border border-indigo-200 dark:border-slate-700 shadow-2xl space-y-4">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>

            <div className="space-y-1.5">
              <h4 className="text-base font-bold text-[#0B0F19] dark:text-white">
                Confirm Deck Creation in Google Drive
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                This will create a new Google Slides presentation named{' '}
                <strong>
                  &ldquo;ZENVEXA Strategy Deck — {deckClientName.trim() || 'New Partner'} ({deckService})&rdquo;
                </strong>{' '}
                in your connected Google account.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#FAF9FE] dark:bg-slate-800/60 border border-indigo-100 dark:border-slate-700 text-xs space-y-1">
              <div className="text-slate-500">Service: {deckService}</div>
              <div className="text-slate-500">Goal: {deckGoal}</div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                disabled={isSubmittingDeck}
                onClick={() => setShowDeckConfirmDialog(false)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isSubmittingDeck}
                onClick={handleExecuteDeckCreation}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-brand-gradient text-xs font-bold text-white shadow-sm cursor-pointer disabled:opacity-50"
              >
                {isSubmittingDeck ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Creating in Google Slides...</span>
                  </>
                ) : (
                  <span>Confirm &amp; Create Deck</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: COMPOSE GMAIL MESSAGE                                            */}
      {/* ========================================================================= */}
      {isComposingEmail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#0D1222] rounded-3xl p-6 sm:p-7 max-w-lg w-full border border-indigo-100 dark:border-slate-800 shadow-2xl space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-[#6A35FF] dark:text-purple-300 flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-bold text-[#0B0F19] dark:text-white">
                  Compose Email via Gmail
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsComposingEmail(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Recipient Email
                </label>
                <input
                  type="email"
                  value={composeTo}
                  onChange={(e) => setComposeTo(e.target.value)}
                  placeholder="client@company.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-indigo-100 dark:border-slate-800 bg-[#FAF9FE] dark:bg-[#111728] text-[#0B0F19] dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Subject Line
                </label>
                <input
                  type="text"
                  value={composeSubject}
                  onChange={(e) => setComposeSubject(e.target.value)}
                  placeholder="ZENVEXA Digital Growth Proposal & Next Steps"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-indigo-100 dark:border-slate-800 bg-[#FAF9FE] dark:bg-[#111728] text-[#0B0F19] dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Message Content
                </label>
                <textarea
                  rows={5}
                  value={composeBody}
                  onChange={(e) => setComposeBody(e.target.value)}
                  placeholder="Hello,&#10;&#10;Thank you for reaching out to ZENVEXA Digital Agency..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-indigo-100 dark:border-slate-800 bg-[#FAF9FE] dark:bg-[#111728] text-[#0B0F19] dark:text-white resize-y"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-indigo-50 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setIsComposingEmail(false)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!composeTo.trim() || !composeSubject.trim() || !composeBody.trim()}
                onClick={() => setShowEmailConfirmDialog(true)}
                className="px-5 py-2.5 rounded-xl bg-brand-gradient text-xs font-bold text-white shadow-sm cursor-pointer disabled:opacity-40"
              >
                Review &amp; Send
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MANDATORY USER CONFIRMATION DIALOG FOR SENDING EMAIL */}
      {showEmailConfirmDialog && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#0D1222] rounded-3xl p-6 sm:p-7 max-w-md w-full border border-indigo-200 dark:border-slate-700 shadow-2xl space-y-4">
            <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-950/80 text-red-600 dark:text-red-400 flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>

            <div className="space-y-1.5">
              <h4 className="text-base font-bold text-[#0B0F19] dark:text-white">
                Confirm Sending Email via Gmail
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Are you sure you want to send this email to{' '}
                <strong>{composeTo.trim()}</strong> from your verified Gmail address?
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#FAF9FE] dark:bg-slate-800/60 border border-indigo-100 dark:border-slate-700 text-xs space-y-1">
              <div className="font-bold text-[#0B0F19] dark:text-white truncate">
                Subject: {composeSubject.trim()}
              </div>
              <div className="text-slate-500 line-clamp-2">
                Body: {composeBody.trim()}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                disabled={isSendingEmail}
                onClick={() => setShowEmailConfirmDialog(false)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isSendingEmail}
                onClick={handleExecuteEmailSend}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-brand-gradient text-xs font-bold text-white shadow-sm cursor-pointer disabled:opacity-50"
              >
                {isSendingEmail ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Sending via Gmail...</span>
                  </>
                ) : (
                  <span>Confirm &amp; Send Email</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: VIEW EMAIL DETAIL                                                */}
      {/* ========================================================================= */}
      {viewingMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#0D1222] rounded-3xl p-6 sm:p-7 max-w-xl w-full border border-indigo-100 dark:border-slate-800 shadow-2xl space-y-4 max-h-[85vh] flex flex-col">
            <div className="flex items-start justify-between gap-4 border-b border-indigo-50 dark:border-slate-800 pb-3">
              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-bold text-[#0B0F19] dark:text-white">
                  {viewingMessage.subject}
                </h3>
                <div className="text-xs text-slate-500">
                  From: <span className="font-semibold text-slate-700 dark:text-slate-300">{viewingMessage.from}</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  {viewingMessage.date}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setViewingMessage(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap font-sans">
              {viewingMessage.body}
            </div>

            <div className="pt-3 border-t border-indigo-50 dark:border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={() => setViewingMessage(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
