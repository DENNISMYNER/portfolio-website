import { z } from 'zod';

/**
 * Mirrors the backend's validation (backend/src/schemas/contact.schema.ts) so
 * the visitor sees the same messages instantly, without a round trip. The
 * server re-validates independently and is the actual source of truth.
 */
export const contactFormSchema = z.object({
  name: z.string().trim().min(1, 'Please enter your name.').max(100, 'Name must be 100 characters or fewer.'),
  email: z
    .string()
    .trim()
    .min(1, 'Please enter your email.')
    .pipe(z.email('Please enter a valid email address.')),
  subject: z.string().trim().max(150, 'Subject must be 150 characters or fewer.').optional(),
  message: z
    .string()
    .trim()
    .min(1, 'Please enter your message.')
    .min(20, 'Message should be at least 20 characters.')
    .max(5000, 'Message must be 5000 characters or fewer.'),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;
