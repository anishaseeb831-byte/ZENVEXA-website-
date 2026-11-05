/**
 * ============================================================================
 * ZENVEXA DIGITAL AGENCY — OPTIONAL CONTACT FORM INTEGRATION CONFIG
 * ============================================================================
 * By default, this website requires ZERO environment variables or API keys to run.
 * When Web3Forms and Webhook settings below are empty, the Contact Inquiry Form
 * validates all fields and sends formatted inquiries directly through ZENVEXA's
 * official WhatsApp (+92 343 6481298) and Email (zenvexahub@gmail.com).
 *
 * HOW TO ENABLE AUTOMATED INBOX SUBMISSIONS LATER (OPTIONAL):
 * Option A — Vercel Environment Variables (Recommended for production):
 *   Add `VITE_WEB3FORMS_ACCESS_KEY` (from https://web3forms.com) OR
 *   `VITE_CONTACT_WEBHOOK_URL` (e.g. Formspree, Make, Zapier, or custom API)
 *   in your Vercel Project -> Settings -> Environment Variables, then redeploy.
 *
 * Option B — Direct Config Constant:
 *   Paste your public Web3Forms access key into `FALLBACK_WEB3FORMS_KEY` below.
 * ============================================================================
 */

const FALLBACK_WEB3FORMS_KEY = '';
const FALLBACK_WEBHOOK_URL = '';

/**
 * Ensures empty values or accidental example strings are never treated as real credentials.
 */
function sanitizeOptionalConfig(rawValue: unknown): string {
  if (typeof rawValue !== 'string') return '';
  const trimmed = rawValue.trim();
  if (!trimmed) return '';

  const lower = trimmed.toLowerCase();
  const invalidPrefixes = [
    'your_',
    'my_',
    'insert_',
    'replace_',
    'placeholder',
    'example',
    'xxx',
    '<',
  ];
  if (invalidPrefixes.some((prefix) => lower.startsWith(prefix))) {
    return '';
  }

  return trimmed;
}

const envWeb3FormsKey =
  typeof import.meta !== 'undefined' && import.meta.env
    ? import.meta.env.VITE_WEB3FORMS_ACCESS_KEY
    : '';

const envWebhookUrl =
  typeof import.meta !== 'undefined' && import.meta.env
    ? import.meta.env.VITE_CONTACT_WEBHOOK_URL
    : '';

export const CONTACT_INTEGRATION = {
  web3FormsAccessKey:
    sanitizeOptionalConfig(envWeb3FormsKey) ||
    sanitizeOptionalConfig(FALLBACK_WEB3FORMS_KEY),
  webhookUrl:
    sanitizeOptionalConfig(envWebhookUrl) ||
    sanitizeOptionalConfig(FALLBACK_WEBHOOK_URL),
  get isAutomatedEnabled(): boolean {
    return Boolean(this.web3FormsAccessKey || this.webhookUrl);
  },
};
