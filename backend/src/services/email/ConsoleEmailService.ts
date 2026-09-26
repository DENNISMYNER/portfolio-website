import type { Logger } from '../../lib/logger.js';
import type { ContactMessage, EmailService } from './EmailService.js';

/** Development adapter: prints the message instead of emailing it. */
export class ConsoleEmailService implements EmailService {
  constructor(private readonly logger: Logger) {}

  async sendContactMessage(message: ContactMessage): Promise<void> {
    this.logger.info({ contact: message }, 'Contact message received (console transport, no email sent)');
  }
}
