/**
 * An error that is safe to show to API clients.
 * Anything that is NOT an HttpError is treated as a bug and answered with a
 * generic 500 (details go to the log, never to the response).
 */
export class HttpError extends Error {
  constructor(
    public readonly status: number,
    public readonly code: string,
    message: string,
    public readonly fields?: Record<string, string[]>,
    options?: ErrorOptions,
  ) {
    super(message, options);
    this.name = 'HttpError';
  }
}
