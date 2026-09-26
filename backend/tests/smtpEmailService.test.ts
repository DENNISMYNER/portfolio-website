import nodemailer from 'nodemailer';
import { describe, expect, it } from 'vitest';
import { SmtpEmailService } from '../src/services/email/SmtpEmailService.js';

describe('SmtpEmailService', () => {
  // jsonTransport builds the email but "sends" it to memory, so no network is needed.
  const transporter = nodemailer.createTransport({ jsonTransport: true });
  const service = new SmtpEmailService(transporter, {
    from: 'Portfolio <no-reply@example.com>',
    to: 'me@example.com',
  });

  it('sends from our address and replies to the visitor, as plain text', async () => {
    const sendMail = transporter.sendMail.bind(transporter);
    let sent: Record<string, unknown> = {};
    transporter.sendMail = (async (options: Record<string, unknown>) => {
      sent = options;
      return sendMail(options);
    }) as typeof transporter.sendMail;

    await service.sendContactMessage({
      name: 'Ada\r\nBcc: victim@example.com',
      email: 'ada@example.com',
      message: '<script>alert(1)</script> hello there, this is long enough',
    });

    expect(sent.from).toBe('Portfolio <no-reply@example.com>');
    expect(sent.to).toBe('me@example.com');
    expect(sent.replyTo).toEqual({ name: 'Ada Bcc: victim@example.com', address: 'ada@example.com' });
    expect(String(sent.subject)).not.toMatch(/[\r\n]/);
    expect(sent).not.toHaveProperty('html');
    expect(String(sent.text)).toContain('<script>alert(1)</script>'); // text/plain: harmless
  });
});
