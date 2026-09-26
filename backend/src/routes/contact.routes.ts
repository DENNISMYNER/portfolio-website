import { Router } from 'express';
import { rateLimit } from 'express-rate-limit';
import type { AppConfig } from '../config/env.js';
import { createContactController } from '../controllers/contact.controller.js';
import type { Logger } from '../lib/logger.js';
import { validateBody } from '../middleware/validateBody.js';
import { contactSchema } from '../schemas/contact.schema.js';
import { HttpError } from '../errors/HttpError.js';
import type { EmailService } from '../services/email/index.js';

interface Deps {
  config: AppConfig;
  emailService: EmailService;
  logger: Logger;
}

export function createContactRouter({ config, emailService, logger }: Deps): Router {
  const router = Router();

  // Runs BEFORE validation so that repeated invalid attempts count too.
  const limiter = rateLimit({
    windowMs: config.contactRateLimit.windowMs,
    limit: config.contactRateLimit.max,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    handler: (_req, _res, next) => {
      next(new HttpError(429, 'RATE_LIMITED', 'Too many messages sent. Please try again later.'));
    },
  });

  router.post('/', limiter, validateBody(contactSchema), createContactController(emailService, logger));

  return router;
}
