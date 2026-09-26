import pino, { type Logger } from 'pino';

export type { Logger };

/**
 * Structured JSON logs in production (easy for log platforms to search),
 * human-readable output while developing.
 */
export function createLogger(level: string, nodeEnv: string): Logger {
  return pino({
    level,
    ...(nodeEnv === 'development' && {
      transport: { target: 'pino-pretty', options: { colorize: true, translateTime: 'HH:MM:ss' } },
    }),
  });
}
