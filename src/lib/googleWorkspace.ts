/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Google Workspace APIs Client Service (Google Slides & Gmail)
 * Complies with least-privilege, in-memory bearer tokens, and explicit user confirmations for mutations.
 */

export const WORKSPACE_SCOPES = [
  'https://www.googleapis.com/auth/presentations',
  'https://www.googleapis.com/auth/presentations.readonly',
  'https://www.googleapis.com/auth/drive.readonly',
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/gmail.readonly',
  'https://www.googleapis.com/auth/gmail.send',
  'https://www.googleapis.com/auth/gmail.compose',
] as const;

/* ========================================================================= */
/* TYPES: GOOGLE SLIDES & PRESENTATIONS                                      */
/* ========================================================================= */

export interface GooglePresentationSummary {
  id: string;
  title: string;
  modifiedTime?: string;
  thumbnailLink?: string;
  webViewLink?: string;
  slideCount?: number;
}

export interface GooglePresentationDetail {
  presentationId: string;
  title: string;
  slides?: Array<{
    objectId: string;
    pageElements?: Array<{
      objectId: string;
      shape?: {
        text?: {
          textElements?: Array<{
            textRun?: {
              content: string;
            };
          }>;
        };
      };
    }>;
  }>;
}

/* ========================================================================= */
/* TYPES: GMAIL MESSAGES                                                     */
/* ========================================================================= */

export interface GmailMessageSummary {
  id: string;
  threadId: string;
  snippet?: string;
  from?: string;
  to?: string;
  subject?: string;
  date?: string;
  unread?: boolean;
}

export interface GmailSendPayload {
  to: string;
  subject: string;
  body: string;
}

/* ========================================================================= */
/* 1. GOOGLE SLIDES API OPERATIONS                                           */
/* ========================================================================= */

/**
 * Lists Google Slides presentations owned or accessible by the user.
 * Searches Google Drive for mimeType = 'application/vnd.google-apps.presentation'.
 */
export async function listUserPresentations(
  accessToken: string,
  searchQuery?: string
): Promise<GooglePresentationSummary[]> {
  const qParts = [
    "mimeType = 'application/vnd.google-apps.presentation'",
    'trashed = false',
  ];
  if (searchQuery && searchQuery.trim()) {
    const escaped = searchQuery.replace(/'/g, "\\'");
    qParts.push(`name contains '${escaped}'`);
  }
  const q = encodeURIComponent(qParts.join(' and '));
  const url = `https://www.googleapis.com/drive/v3/files?q=${q}&fields=files(id,name,modifiedTime,thumbnailLink,webViewLink)&orderBy=modifiedTime desc&pageSize=20`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to load Google Slides presentations (${res.status}): ${errorText}`);
  }

  const data = await res.json();
  const files: Array<{
    id: string;
    name: string;
    modifiedTime?: string;
    thumbnailLink?: string;
    webViewLink?: string;
  }> = data.files || [];

  return files.map((f) => ({
    id: f.id,
    title: f.name,
    modifiedTime: f.modifiedTime,
    thumbnailLink: f.thumbnailLink,
    webViewLink: f.webViewLink || `https://docs.google.com/presentation/d/${f.id}/edit`,
  }));
}

/**
 * Gets details for a specific Google Slides presentation.
 */
export async function getPresentationDetails(
  presentationId: string,
  accessToken: string
): Promise<GooglePresentationDetail> {
  const res = await fetch(
    `https://slides.googleapis.com/v1/presentations/${presentationId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to retrieve presentation (${res.status}): ${errorText}`);
  }

  return (await res.json()) as GooglePresentationDetail;
}

/**
 * Creates a brand new Google Slides presentation.
 * Note: Mutation requires prior confirmation in UI.
 */
export async function createPresentation(
  title: string,
  accessToken: string
): Promise<GooglePresentationSummary> {
  const res = await fetch('https://slides.googleapis.com/v1/presentations', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: title.trim() || 'Untitled ZENVEXA Growth Deck',
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to create presentation (${res.status}): ${errorText}`);
  }

  const data = await res.json();
  return {
    id: data.presentationId,
    title: data.title || title,
    webViewLink: `https://docs.google.com/presentation/d/${data.presentationId}/edit`,
  };
}

/**
 * Creates a customized ZENVEXA Digital Growth Strategy Deck in Google Slides
 * with pre-structured slides for clients (SEO, Meta Ads, Branding, or Web Dev).
 */
export async function createAgencyStrategyDeck(
  params: {
    clientName: string;
    serviceName: string;
    primaryGoal: string;
  },
  accessToken: string
): Promise<GooglePresentationSummary> {
  const deckTitle = `ZENVEXA Strategy Deck — ${params.clientName} (${params.serviceName})`;
  const presentation = await createPresentation(deckTitle, accessToken);

  // Batch insert title and strategy structure
  try {
    await fetch(
      `https://slides.googleapis.com/v1/presentations/${presentation.id}:batchUpdate`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requests: [
            {
              createSlide: {
                insertionIndex: 1,
                slideLayoutReference: {
                  predefinedLayout: 'SECTION_HEADER',
                },
              },
            },
            {
              createSlide: {
                insertionIndex: 2,
                slideLayoutReference: {
                  predefinedLayout: 'TITLE_AND_BODY',
                },
              },
            },
          ],
        }),
      }
    );
  } catch {
    // Basic deck created even if batchUpdate layout fails
  }

  return presentation;
}

/* ========================================================================= */
/* 2. GMAIL API OPERATIONS                                                   */
/* ========================================================================= */

/**
 * Lists the user's latest Gmail messages matching an optional search query.
 */
export async function listGmailMessages(
  accessToken: string,
  query = '',
  maxResults = 10
): Promise<GmailMessageSummary[]> {
  const queryParam = query.trim() ? `&q=${encodeURIComponent(query)}` : '';
  const url = `https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=${maxResults}${queryParam}`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to list Gmail messages (${res.status}): ${errorText}`);
  }

  const listData = await res.json();
  const rawList: Array<{ id: string; threadId: string }> = listData.messages || [];

  if (rawList.length === 0) {
    return [];
  }

  // Fetch header snippets for each message in parallel
  const detailPromises = rawList.slice(0, 10).map(async (m) => {
    try {
      const msgRes = await fetch(
        `https://gmail.googleapis.com/gmail/v1/users/me/messages/${m.id}?format=metadata&metadataHeaders=From&metadataHeaders=To&metadataHeaders=Subject&metadataHeaders=Date`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      if (!msgRes.ok) return { id: m.id, threadId: m.threadId, snippet: '' };
      const d = await msgRes.json();
      const headers = (d.payload?.headers || []) as Array<{ name: string; value: string }>;
      const from = headers.find((h) => h.name.toLowerCase() === 'from')?.value || '';
      const to = headers.find((h) => h.name.toLowerCase() === 'to')?.value || '';
      const subject = headers.find((h) => h.name.toLowerCase() === 'subject')?.value || '(No Subject)';
      const date = headers.find((h) => h.name.toLowerCase() === 'date')?.value || '';
      const labelIds = (d.labelIds || []) as string[];
      const unread = labelIds.includes('UNREAD');

      return {
        id: m.id,
        threadId: m.threadId,
        snippet: d.snippet || '',
        from,
        to,
        subject,
        date,
        unread,
      };
    } catch {
      return { id: m.id, threadId: m.threadId };
    }
  });

  return await Promise.all(detailPromises);
}

/**
 * Fetches full text content of a single Gmail message.
 */
export async function getGmailMessageBody(
  messageId: string,
  accessToken: string
): Promise<{ subject: string; from: string; date: string; body: string }> {
  const res = await fetch(
    `https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}?format=full`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to load message (${res.status})`);
  }

  const data = await res.json();
  const headers = (data.payload?.headers || []) as Array<{ name: string; value: string }>;
  const from = headers.find((h) => h.name.toLowerCase() === 'from')?.value || '';
  const subject = headers.find((h) => h.name.toLowerCase() === 'subject')?.value || '(No Subject)';
  const date = headers.find((h) => h.name.toLowerCase() === 'date')?.value || '';

  let body = data.snippet || '';

  // Extract body if available
  const extractTextPart = (part: any): string => {
    if (part.body?.data) {
      try {
        const decoded = atob(part.body.data.replace(/-/g, '+').replace(/_/g, '/'));
        return decodeURIComponent(escape(decoded));
      } catch {
        return '';
      }
    }
    if (part.parts && Array.isArray(part.parts)) {
      for (const p of part.parts) {
        const found = extractTextPart(p);
        if (found) return found;
      }
    }
    return '';
  };

  if (data.payload) {
    const text = extractTextPart(data.payload);
    if (text) body = text;
  }

  return { subject, from, date, body };
}

/**
 * Sends an email via Gmail API.
 * Note: Mutation requires prior confirmation in UI.
 */
export async function sendGmailMessage(
  payload: GmailSendPayload,
  accessToken: string
): Promise<{ id: string; threadId: string }> {
  const emailLines = [
    `To: ${payload.to.trim()}`,
    `Subject: =?utf-8?B?${btoa(unescape(encodeURIComponent(payload.subject.trim())))}?=`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=utf-8',
    '',
    payload.body,
  ];
  const email = emailLines.join('\r\n');
  const base64Encoded = btoa(unescape(encodeURIComponent(email)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  const res = await fetch(
    'https://gmail.googleapis.com/gmail/v1/users/me/messages/send',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        raw: base64Encoded,
      }),
    }
  );

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to send email via Gmail (${res.status}): ${errorText}`);
  }

  return await res.json();
}
