import nodemailer from 'nodemailer';
import type { EmailConfig } from '../../config/env.js';
import type { Logger } from '../../lib/logger.js';
import { ConsoleEmailService } from './ConsoleEmailService.js';
import type { EmailService } from './EmailService.js';
import { SmtpEmailService } from './SmtpEmailService.js';

export type { ContactMessage, EmailService } from './EmailService.js';

/** Picks the email adapter from configuration. */
export function createEmailService(config: EmailConfig, logger: Logger): EmailService {
  if (config.transport === 'console') {
    return new ConsoleEmailService(logger);
  }

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: { user: config.user, pass: config.pass },
    // Never let a slow mail server hang a visitor's request.
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });

  return new SmtpEmailService(transporter, { from: config.from, to: config.to });
}
