import { describe, expect, it } from 'vitest';
import { loadConfig } from '../src/config/env.js';

describe('loadConfig', () => {
  it('has safe development defaults', () => {
    const config = loadConfig({});
    expect(config.port).toBe(4000);
    expect(config.email.transport).toBe('console');
    expect(config.corsOrigins).toEqual(['http://localhost:5173']);
  });

  it('parses a comma-separated CORS list and strips trailing slashes', () => {
    const config = loadConfig({ CORS_ORIGIN: 'https://a.dev/, https://b.dev' });
    expect(config.corsOrigins).toEqual(['https://a.dev', 'https://b.dev']);
  });

  it('requires SMTP settings when EMAIL_TRANSPORT=smtp', () => {
    expect(() => loadConfig({ EMAIL_TRANSPORT: 'smtp' })).toThrow(/SMTP_HOST is required/);
  });

  it('refuses to run in production with the console email transport', () => {
    expect(() => loadConfig({ NODE_ENV: 'production', CORS_ORIGIN: 'https://a.dev' })).toThrow(
      /EMAIL_TRANSPORT must be 'smtp'/,
    );
  });

  it('requires CORS_ORIGIN in production', () => {
    expect(() => loadConfig({ NODE_ENV: 'production' })).toThrow(/CORS_ORIGIN is required/);
  });

  it('accepts a complete production configuration', () => {
    const config = loadConfig({
      NODE_ENV: 'production',
      CORS_ORIGIN: 'https://a.dev',
      EMAIL_TRANSPORT: 'smtp',
      SMTP_HOST: 'smtp.example.com',
      SMTP_USER: 'user',
      SMTP_PASS: 'pass',
      SMTP_FROM: 'Portfolio <no-reply@example.com>',
      CONTACT_TO_EMAIL: 'me@example.com',
    });
    expect(config.email.transport).toBe('smtp');
  });
});
