import { Router } from 'express';
import type { AppConfig } from '../config/env.js';
import type { Logger } from '../lib/logger.js';
import type { EmailService } from '../services/email/index.js';
import { createContactRouter } from './contact.routes.js';

interface Deps {
  config: AppConfig;
  emailService: EmailService;
  logger: Logger;
}

/** Everything mounted under /api. */
export function createApiRouter(deps: Deps): Router {
  const router = Router();

  // Used by hosting platforms to check the service is alive.
  router.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  router.use('/contact', createContactRouter(deps));

  return router;
}
