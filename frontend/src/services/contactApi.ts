/**
 * Talks to the backend's POST /api/contact.
 *
 * In development, Vite proxies /api to the Express server (see vite.config.ts),
 * so VITE_API_URL is left empty. In production it points at the deployed API.
 */
const API_BASE_URL = import.meta.env.VITE_API_URL ?? '';

export interface ContactPayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
  /** Honeypot field: always empty for a real visitor. */
  website?: string;
}

export interface ApiError {
  code: string;
  message: string;
  fields?: Record<string, string[]>;
}

export class ContactRequestError extends Error {
  constructor(public readonly apiError: ApiError) {
    super(apiError.message);
    this.name = 'ContactRequestError';
  }
}

export async function sendContactMessage(payload: ContactPayload): Promise<void> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new ContactRequestError({
      code: 'NETWORK_ERROR',
      message: 'Could not reach the server. Please check your connection and try again.',
    });
  }

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as { error?: ApiError } | null;
    throw new ContactRequestError(
      body?.error ?? { code: 'UNKNOWN_ERROR', message: 'Something went wrong. Please try again later.' },
    );
  }
}
