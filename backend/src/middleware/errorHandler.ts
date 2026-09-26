import type { ErrorRequestHandler, RequestHandler } from 'express';
import { HttpError } from '../errors/HttpError.js';
import type { Logger } from '../lib/logger.js';

export const notFoundHandler: RequestHandler = (_req, _res, next) => {
  next(new HttpError(404, 'NOT_FOUND', 'Route not found.'));
};

/** Every error leaves the API in the same JSON shape: { error: { code, message, fields? } }. */
export function createErrorHandler(logger: Logger): ErrorRequestHandler {
  return (err, req, res, next) => {
    if (res.headersSent) {
      next(err);
      return;
    }

    if (err instanceof HttpError) {
      if (err.status >= 500) logger.error({ err, path: req.path }, err.message);
      res.status(err.status).json({
        error: { code: err.code, message: err.message, ...(err.fields && { fields: err.fields }) },
      });
      return;
    }

    // Errors raised by Express's own body parser (bad JSON, body too large) carry a 4xx status.
    const status = typeof err?.status === 'number' ? err.status : undefined;
    if (status && status >= 400 && status < 500) {
      const code = status === 413 ? 'PAYLOAD_TOO_LARGE' : 'BAD_REQUEST';
      const message = status === 413 ? 'Request body is too large.' : 'The request could not be understood.';
      res.status(status).json({ error: { code, message } });
      return;
    }

    // Anything else is a bug: log the details, tell the client nothing internal.
    logger.error({ err, path: req.path }, 'Unhandled error');
    res
      .status(500)
      .json({ error: { code: 'INTERNAL_ERROR', message: 'Something went wrong on the server.' } });
  };
}
