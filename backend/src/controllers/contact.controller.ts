import type { RequestHandler } from 'express';
import { HttpError } from '../errors/HttpError.js';
import type { Logger } from '../lib/logger.js';
import type { ContactInput } from '../schemas/contact.schema.js';
import type { EmailService } from '../services/email/index.js';

/**
 * Controllers are the HTTP-facing layer: read the (already validated) request,
 * call the right service, shape the response. No business rules live here.
 */
export function createContactController(emailService: EmailService, logger: Logger): RequestHandler {
  return async (req, res) => {
    const { website, ...message } = req.body as ContactInput;

    // Honeypot filled in => almost certainly a bot. Answer "success" so it
    // learns nothing, but don't send anything.
    if (website) {
      logger.warn('Honeypot field filled; contact message discarded');
      res.status(200).json({ ok: true });
      return;
    }

    try {
      await emailService.sendContactMessage(message);
    } catch (cause) {
      throw new HttpError(
        502,
        'EMAIL_DELIVERY_FAILED',
        "Your message couldn't be delivered. Please try again later.",
        undefined,
        { cause },
      );
    }

    res.status(200).json({ ok: true });
  };
}
