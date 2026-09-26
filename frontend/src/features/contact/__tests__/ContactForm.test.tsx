import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ContactForm } from '../ContactForm';

const validInput = {
  name: 'Ada Lovelace',
  email: 'ada@example.com',
  message: 'I would love to talk about a project with you.',
};

async function fillValidForm(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByPlaceholderText('Full Name'), validInput.name);
  await user.type(screen.getByPlaceholderText('Email Address'), validInput.email);
  await user.type(screen.getByPlaceholderText('Your Message'), validInput.message);
}

describe('ContactForm', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('shows validation errors for empty required fields without calling the API', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(screen.getByRole('button', { name: /send message/i }));

    expect(await screen.findByText('Please enter your name.')).toBeInTheDocument();
    expect(screen.getByText('Please enter your email.')).toBeInTheDocument();
    expect(screen.getByText('Please enter your message.')).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('rejects a message under 20 characters', async () => {
    vi.stubGlobal('fetch', vi.fn());
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByPlaceholderText('Full Name'), validInput.name);
    await user.type(screen.getByPlaceholderText('Email Address'), validInput.email);
    await user.type(screen.getByPlaceholderText('Your Message'), 'too short');
    await user.click(screen.getByRole('button', { name: /send message/i }));

    expect(await screen.findByText('Message should be at least 20 characters.')).toBeInTheDocument();
  });

  it('submits successfully and shows a confirmation message', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ ok: true }) });
    vi.stubGlobal('fetch', fetchMock);
    const user = userEvent.setup();
    render(<ContactForm />);

    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: /send message/i }));

    expect(await screen.findByText(/message sent successfully/i)).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledWith('/api/contact', expect.objectContaining({ method: 'POST' }));
    // Form resets after success.
    expect(screen.getByPlaceholderText('Full Name')).toHaveValue('');
  });

  it('shows a server error message when the request fails', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({
        error: { code: 'RATE_LIMITED', message: 'Too many messages sent. Please try again later.' },
      }),
    });
    vi.stubGlobal('fetch', fetchMock);
    const user = userEvent.setup();
    render(<ContactForm />);

    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: /send message/i }));

    expect(await screen.findByText('Too many messages sent. Please try again later.')).toBeInTheDocument();
  });

  it('never submits with a value in the honeypot field the way a bot would fill it', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ ok: true }) });
    vi.stubGlobal('fetch', fetchMock);
    render(<ContactForm />);

    const honeypot = document.querySelector('input[name="website"]') as HTMLInputElement;
    expect(honeypot).toBeInTheDocument();
    expect(honeypot).toHaveAttribute('tabindex', '-1');
    expect(honeypot).toHaveAttribute('aria-hidden', 'true');
  });
});
