import pino from 'pino';
import { createApp } from '../src/app.js';
import { loadConfig, type AppConfig } from '../src/config/env.js';
import type { ContactMessage, EmailService } from '../src/services/email/index.js';

export class FakeEmailService implements EmailService {
  sent: ContactMessage[] = [];
  shouldFail = false;

  async sendContactMessage(message: ContactMessage): Promise<void> {
    if (this.shouldFail) throw new Error('SMTP down');
    this.sent.push(message);
  }
}

export function buildTestApp(overrides: Partial<AppConfig> = {}) {
  const config: AppConfig = { ...loadConfig({ NODE_ENV: 'test' }), ...overrides };
  const emailService = new FakeEmailService();
  const app = createApp({ config, emailService, logger: pino({ level: 'silent' }) });
  return { app, emailService, config };
}

export const validMessage = {
  name: 'Ada Lovelace',
  email: 'ada@example.com',
  subject: 'Hello',
  message: 'I would love to talk about a project with you.',
};
