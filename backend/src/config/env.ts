import { z } from 'zod';

/**
 * Environment validation.
 *
 * Every setting the server reads comes through here, is validated once at
 * startup, and is converted into a typed `AppConfig`. If something is missing
 * the process fails immediately with a readable message instead of failing
 * later, halfway through a visitor's request.
 */

// Blank values in .env files ("SMTP_HOST=") should count as "not set".
const optional = z
  .string()
  .trim()
  .optional()
  .transform((value) => value || undefined);

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().min(1).max(65535).default(4000),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent']).default('info'),
  CORS_ORIGIN: optional,
  TRUST_PROXY: z.coerce.number().int().min(0).default(0),
  CONTACT_RATE_LIMIT_MAX: z.coerce.number().int().min(1).default(5),
  CONTACT_RATE_LIMIT_WINDOW_MINUTES: z.coerce.number().int().min(1).default(15),
  EMAIL_TRANSPORT: z.enum(['console', 'smtp']).default('console'),
  CONTACT_TO_EMAIL: optional,
  SMTP_HOST: optional,
  SMTP_PORT: z.coerce.number().int().min(1).max(65535).default(587),
  SMTP_SECURE: z
    .enum(['true', 'false'])
    .default('false')
    .transform((value) => value === 'true'),
  SMTP_USER: optional,
  SMTP_PASS: optional,
  SMTP_FROM: optional,
});

export type EmailConfig =
  | { transport: 'console' }
  | {
      transport: 'smtp';
      host: string;
      port: number;
      secure: boolean;
      user: string;
      pass: string;
      from: string;
      to: string;
    };

export interface AppConfig {
  nodeEnv: 'development' | 'test' | 'production';
  port: number;
  logLevel: string;
  corsOrigins: string[];
  trustProxy: number;
  contactRateLimit: { max: number; windowMs: number };
  email: EmailConfig;
}

export function loadConfig(source: NodeJS.ProcessEnv = process.env): AppConfig {
  const parsed = envSchema.safeParse(source);
  if (!parsed.success) {
    throw new Error(`Invalid environment configuration:\n${formatIssues(parsed.error)}`);
  }
  const env = parsed.data;
  const problems: string[] = [];

  const isProduction = env.NODE_ENV === 'production';

  if (isProduction && !env.CORS_ORIGIN) {
    problems.push('CORS_ORIGIN is required in production (your deployed frontend URL).');
  }
  if (isProduction && env.EMAIL_TRANSPORT !== 'smtp') {
    problems.push(
      "EMAIL_TRANSPORT must be 'smtp' in production, otherwise contact messages would be silently dropped.",
    );
  }

  let email: EmailConfig = { transport: 'console' };
  if (env.EMAIL_TRANSPORT === 'smtp') {
    const { SMTP_HOST, SMTP_USER, SMTP_PASS, SMTP_FROM, CONTACT_TO_EMAIL } = env;
    for (const [name, value] of Object.entries({
      SMTP_HOST,
      SMTP_USER,
      SMTP_PASS,
      SMTP_FROM,
      CONTACT_TO_EMAIL,
    })) {
      if (!value) problems.push(`${name} is required when EMAIL_TRANSPORT=smtp.`);
    }
    if (SMTP_HOST && SMTP_USER && SMTP_PASS && SMTP_FROM && CONTACT_TO_EMAIL) {
      email = {
        transport: 'smtp',
        host: SMTP_HOST,
        port: env.SMTP_PORT,
        secure: env.SMTP_SECURE,
        user: SMTP_USER,
        pass: SMTP_PASS,
        from: SMTP_FROM,
        to: CONTACT_TO_EMAIL,
      };
    }
  }

  if (problems.length > 0) {
    throw new Error(`Invalid environment configuration:\n${problems.map((p) => `  - ${p}`).join('\n')}`);
  }

  return {
    nodeEnv: env.NODE_ENV,
    port: env.PORT,
    logLevel: env.LOG_LEVEL,
    corsOrigins: (env.CORS_ORIGIN ?? 'http://localhost:5173')
      .split(',')
      .map((origin) => origin.trim().replace(/\/$/, ''))
      .filter(Boolean),
    trustProxy: env.TRUST_PROXY,
    contactRateLimit: {
      max: env.CONTACT_RATE_LIMIT_MAX,
      windowMs: env.CONTACT_RATE_LIMIT_WINDOW_MINUTES * 60_000,
    },
    email,
  };
}

function formatIssues(error: z.ZodError): string {
  return error.issues.map((issue) => `  - ${issue.path.join('.') || 'env'}: ${issue.message}`).join('\n');
}
