import { useState, type FormEvent } from 'react';
import { z } from 'zod';
import { useRipple } from '../../hooks/useRipple';
import { ContactRequestError, sendContactMessage } from '../../services/contactApi';
import { contactFormSchema, type ContactFormErrors, type ContactFormValues } from './contact.schema';

const EMPTY_VALUES: ContactFormValues = { name: '', email: '', subject: '', message: '' };

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const ripple = useRipple();

  function updateField<K extends keyof ContactFormValues>(field: K, value: ContactFormValues[K]) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('idle');

    const result = contactFormSchema.safeParse(values);
    if (!result.success) {
      const flat = z.flattenError(result.error).fieldErrors;
      setErrors({
        name: flat.name?.[0],
        email: flat.email?.[0],
        subject: flat.subject?.[0],
        message: flat.message?.[0],
      });
      return;
    }

    setErrors({});
    setStatus('submitting');
    try {
      // The `website` field is a honeypot: left blank by real visitors, filled in by bots.
      await sendContactMessage({
        ...result.data,
        website: (event.currentTarget.elements.namedItem('website') as HTMLInputElement | null)?.value ?? '',
      });
      setStatus('success');
      setStatusMessage('✓ Message sent successfully! I will get back to you soon.');
      setValues(EMPTY_VALUES);
    } catch (error) {
      setStatus('error');
      if (error instanceof ContactRequestError && error.apiError.fields) {
        const fields = error.apiError.fields;
        setErrors({
          name: fields.name?.[0],
          email: fields.email?.[0],
          subject: fields.subject?.[0],
          message: fields.message?.[0],
        });
      }
      setStatusMessage(
        error instanceof ContactRequestError
          ? error.apiError.message
          : 'Something went wrong. Please try again later.',
      );
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div>
        <input
          type="text"
          placeholder="Full Name"
          aria-label="Full Name"
          className={errors.name ? 'error' : ''}
          value={values.name}
          onChange={(e) => updateField('name', e.target.value)}
          required
        />
        {errors.name && <small className="error-message">{errors.name}</small>}
      </div>

      <div>
        <input
          type="email"
          placeholder="Email Address"
          aria-label="Email Address"
          className={errors.email ? 'error' : ''}
          value={values.email}
          onChange={(e) => updateField('email', e.target.value)}
          required
        />
        {errors.email && <small className="error-message">{errors.email}</small>}
      </div>

      <div>
        <input
          type="text"
          placeholder="Subject"
          aria-label="Subject"
          className={errors.subject ? 'error' : ''}
          value={values.subject}
          onChange={(e) => updateField('subject', e.target.value)}
        />
        {errors.subject && <small className="error-message">{errors.subject}</small>}
      </div>

      {/* Honeypot: hidden from sighted users and skipped by keyboard tab order; real visitors never fill it in. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
      />

      <div>
        <textarea
          rows={6}
          placeholder="Your Message"
          aria-label="Your Message"
          className={errors.message ? 'error' : ''}
          value={values.message}
          onChange={(e) => updateField('message', e.target.value)}
        />
        {errors.message && <small className="error-message">{errors.message}</small>}
      </div>

      <button type="submit" className="btn btn-primary" onClick={ripple} disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending...' : 'Send Message'}
      </button>

      {status === 'success' && <div className="form-message success">{statusMessage}</div>}
      {status === 'error' && <div className="form-message error">{statusMessage}</div>}
    </form>
  );
}
