import cors from 'cors';
import express, { type Express } from 'express';
import helmet from 'helmet';
import type { AppConfig } from './config/env.js';
import type { Logger } from './lib/logger.js';
import { createErrorHandler, notFoundHandler } from './middleware/errorHandler.js';
import { requestLogger } from './middleware/requestLogger.js';
import { createApiRouter } from './routes/index.js';
import type { EmailService } from './services/email/index.js';

interface AppDependencies {
  config: AppConfig;
  emailService: EmailService;
  logger: Logger;
}

/**
 * Builds the Express app without starting it. Keeping "build" and "listen"
 * separate lets tests drive the app in memory, with a fake email service.
 */
export function createApp({ config, emailService, logger }: AppDependencies): Express {
  const app = express();

  // How many reverse proxies sit in front of us; needed for correct client IPs (rate limiting).
  app.set('trust proxy', config.trustProxy);

  app.use(helmet()); // Secure default response headers.
  app.use(cors({ origin: config.corsOrigins, methods: ['GET', 'POST'], maxAge: 600 }));
  app.use(requestLogger(logger));
  app.use(express.json({ limit: '10kb' })); // A contact form never needs more.

  app.use('/api', createApiRouter({ config, emailService, logger }));

  app.use(notFoundHandler);
  app.use(createErrorHandler(logger));

  return app;
}
