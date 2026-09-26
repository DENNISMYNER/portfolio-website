export interface ContactMessage {
  name: string;
  email: string;
  subject?: string | undefined;
  message: string;
}

/**
 * The seam between our app and whatever delivers email.
 *
 * Controllers depend on this interface only. To switch from SMTP to a provider
 * API (Resend, SendGrid, SES...) write one new class that implements it and
 * change one line in `createEmailService`. Nothing else moves.
 */
export interface EmailService {
  sendContactMessage(message: ContactMessage): Promise<void>;
}
