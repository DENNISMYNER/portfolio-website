import { z } from 'zod';

/**
 * The contract for POST /api/contact. The server is the source of truth for
 * validation; the frontend mirrors these rules only to give faster feedback.
 */
export const contactSchema = z.object({
  name: z
    .string({ error: 'Please enter your name.' })
    .trim()
    .min(1, 'Please enter your name.')
    .max(100, 'Name must be 100 characters or fewer.'),
  email: z
    .string({ error: 'Please enter your email.' })
    .trim()
    .min(1, 'Please enter your email.')
    .max(254, 'Email must be 254 characters or fewer.')
    .pipe(z.email('Please enter a valid email address.')),
  subject: z
    .string()
    .trim()
    .max(150, 'Subject must be 150 characters or fewer.')
    // Newlines in a subject can be used for email header injection.
    .refine((value) => !/[\r\n]/.test(value), 'Subject must be a single line.')
    .optional(),
  message: z
    .string({ error: 'Please enter your message.' })
    .trim()
    .min(1, 'Please enter your message.')
    .min(20, 'Message should be at least 20 characters.')
    .max(5000, 'Message must be 5000 characters or fewer.'),
  // Honeypot: hidden from humans, so only bots fill it in.
  website: z.string().max(500).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
