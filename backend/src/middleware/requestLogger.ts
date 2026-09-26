import type { RequestHandler } from 'express';
import type { Logger } from '../lib/logger.js';

/**
 * One log line per request. Deliberately logs the path only (no query string,
 * no body) so visitor data never ends up in logs.
 */
export function requestLogger(logger: Logger): RequestHandler {
  return (req, res, next) => {
    const start = process.hrtime.bigint();
    const path = req.path; // captured now: routers rewrite req.path while handling the request
    res.on('finish', () => {
      const ms = Number(process.hrtime.bigint() - start) / 1e6;
      logger.info({ method: req.method, path, status: res.statusCode, ms: Math.round(ms) }, 'request');
    });
    next();
  };
}
