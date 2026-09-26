import type { Transporter } from 'nodemailer';
import type { ContactMessage, EmailService } from './EmailService.js';

interface SmtpEmailOptions {
  /** Authenticated sender address, e.g. "Portfolio <no-reply@example.com>". */
  from: string;
  /** Your inbox. */
  to: string;
}

/** Collapse any whitespace (including newlines) so user input can't inject email headers. */
const singleLine = (value: string) => value.replace(/\s+/g, ' ').trim();

export class SmtpEmailService implements EmailService {
  constructor(
    private readonly transporter: Transporter,
    private readonly options: SmtpEmailOptions,
  ) {}

  async sendContactMessage({ name, email, subject, message }: ContactMessage): Promise<void> {
    const cleanName = singleLine(name);
    const cleanSubject = subject ? singleLine(subject) : 'New message';

    await this.transporter.sendMail({
      // Send FROM our authenticated address (spoofing the visitor's address gets mail rejected as spam)...
      from: this.options.from,
      to: this.options.to,
      // ...but let "Reply" go straight to the visitor.
      replyTo: { name: cleanName, address: email },
      subject: `Portfolio: ${cleanSubject} (from ${cleanName})`,
      // Plain text only: nothing the visitor typed is ever interpreted as HTML.
      text: [`Name: ${cleanName}`, `Email: ${email}`, `Subject: ${cleanSubject}`, '', message].join('\n'),
    });
  }
}
