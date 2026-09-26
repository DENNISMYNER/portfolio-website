import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { buildTestApp, validMessage } from './helpers.js';

describe('GET /api/health', () => {
  it('reports ok', async () => {
    const { app } = buildTestApp();
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });
});

describe('POST /api/contact', () => {
  it('sends a valid message', async () => {
    const { app, emailService } = buildTestApp();
    const res = await request(app).post('/api/contact').send(validMessage);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ ok: true });
    expect(emailService.sent).toEqual([validMessage]);
  });

  it('trims whitespace and drops unknown fields', async () => {
    const { app, emailService } = buildTestApp();
    await request(app)
      .post('/api/contact')
      .send({ ...validMessage, name: '  Ada  ', isAdmin: true });

    expect(emailService.sent[0]?.name).toBe('Ada');
    expect(emailService.sent[0]).not.toHaveProperty('isAdmin');
  });

  it('returns per-field errors (422) for invalid input', async () => {
    const { app, emailService } = buildTestApp();
    const res = await request(app)
      .post('/api/contact')
      .send({ name: '', email: 'nope', message: 'too short' });

    expect(res.status).toBe(422);
    expect(res.body.error.code).toBe('VALIDATION_ERROR');
    expect(res.body.error.fields.name[0]).toBe('Please enter your name.');
    expect(res.body.error.fields.email[0]).toBe('Please enter a valid email address.');
    expect(res.body.error.fields.message[0]).toBe('Message should be at least 20 characters.');
    expect(emailService.sent).toHaveLength(0);
  });

  it('rejects a missing body with 422, not a crash', async () => {
    const { app } = buildTestApp();
    const res = await request(app).post('/api/contact');
    expect(res.status).toBe(422);
    expect(res.body.error.fields.name[0]).toBe('Please enter your name.');
  });

  it('rejects newlines in the subject (header injection)', async () => {
    const { app } = buildTestApp();
    const res = await request(app)
      .post('/api/contact')
      .send({ ...validMessage, subject: 'Hi\r\nBcc: victim@example.com' });
    expect(res.status).toBe(422);
    expect(res.body.error.fields.subject).toBeDefined();
  });

  it('silently discards honeypot submissions', async () => {
    const { app, emailService } = buildTestApp();
    const res = await request(app)
      .post('/api/contact')
      .send({ ...validMessage, website: 'http://spam.example' });

    expect(res.status).toBe(200);
    expect(emailService.sent).toHaveLength(0);
  });

  it('returns 502 without leaking details when email delivery fails', async () => {
    const { app, emailService } = buildTestApp();
    emailService.shouldFail = true;
    const res = await request(app).post('/api/contact').send(validMessage);

    expect(res.status).toBe(502);
    expect(res.body.error.code).toBe('EMAIL_DELIVERY_FAILED');
    expect(JSON.stringify(res.body)).not.toContain('SMTP down');
  });

  it('rate limits repeated submissions (429)', async () => {
    const { app } = buildTestApp({ contactRateLimit: { max: 2, windowMs: 60_000 } });

    await request(app).post('/api/contact').send(validMessage).expect(200);
    await request(app).post('/api/contact').send(validMessage).expect(200);
    const res = await request(app).post('/api/contact').send(validMessage);

    expect(res.status).toBe(429);
    expect(res.body.error.code).toBe('RATE_LIMITED');
  });

  it('handles malformed JSON with 400', async () => {
    const { app } = buildTestApp();
    const res = await request(app)
      .post('/api/contact')
      .set('Content-Type', 'application/json')
      .send('{bad json');
    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe('BAD_REQUEST');
  });

  it('rejects oversized bodies with 413', async () => {
    const { app } = buildTestApp();
    const res = await request(app)
      .post('/api/contact')
      .send({ ...validMessage, message: 'x'.repeat(20_000) });
    expect(res.status).toBe(413);
  });
});

describe('security & misc', () => {
  it('sets security headers and hides x-powered-by', async () => {
    const { app } = buildTestApp();
    const res = await request(app).get('/api/health');
    expect(res.headers['x-content-type-options']).toBe('nosniff');
    expect(res.headers['x-powered-by']).toBeUndefined();
  });

  it('only allows configured CORS origins', async () => {
    const { app } = buildTestApp();
    const allowed = await request(app).get('/api/health').set('Origin', 'http://localhost:5173');
    const blocked = await request(app).get('/api/health').set('Origin', 'https://evil.example');
    expect(allowed.headers['access-control-allow-origin']).toBe('http://localhost:5173');
    expect(blocked.headers['access-control-allow-origin']).toBeUndefined();
  });

  it('answers unknown routes with a JSON 404', async () => {
    const { app } = buildTestApp();
    const res = await request(app).get('/api/nope');
    expect(res.status).toBe(404);
    expect(res.body.error.code).toBe('NOT_FOUND');
  });
});
