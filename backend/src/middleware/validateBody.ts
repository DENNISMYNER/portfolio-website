import type { RequestHandler } from 'express';
import { z } from 'zod';
import { HttpError } from '../errors/HttpError.js';

/**
 * Validates `req.body` against a zod schema. On success the body is replaced
 * with the parsed (trimmed, unknown-keys-removed) data; on failure the client
 * gets a 422 listing the problem for each field.
 */
export function validateBody(schema: z.ZodType): RequestHandler {
  return (req, _res, next) => {
    const result = schema.safeParse(req.body ?? {});
    if (!result.success) {
      const fields = z.flattenError(result.error).fieldErrors as Record<string, string[]>;
      throw new HttpError(422, 'VALIDATION_ERROR', 'Please check the highlighted fields.', fields);
    }
    req.body = result.data;
    next();
  };
}
