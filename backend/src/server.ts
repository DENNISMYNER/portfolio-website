import dotenv from 'dotenv';
import { createApp } from './app.js';
import { loadConfig } from './config/env.js';
import { createLogger } from './lib/logger.js';
import { createEmailService } from './services/email/index.js';

// Loads backend/.env into process.env (does nothing if the file doesn't exist, e.g. on a host that injects env vars).
dotenv.config({ quiet: true });

let config;
try {
  config = loadConfig();
} catch (error) {
  console.error((error as Error).message);
  process.exit(1);
}

const logger = createLogger(config.logLevel, config.nodeEnv);
const app = createApp({ config, emailService: createEmailService(config.email, logger), logger });

const server = app.listen(config.port, () => {
  logger.info(
    { port: config.port, env: config.nodeEnv, email: config.email.transport, cors: config.corsOrigins },
    'API listening',
  );
});

// Let in-flight requests finish when the platform asks us to stop.
function shutdown(signal: string) {
  logger.info({ signal }, 'Shutting down');
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(1), 10_000).unref();
}
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
