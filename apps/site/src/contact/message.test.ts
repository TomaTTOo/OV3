import { describe, expect, it } from 'vitest';
import { emptyContact, LIMITS, toDocument, validate } from './message.ts';

const filled = { name: 'Ana', email: 'ana@example.com', company: '', message: 'Hello' };

describe('a contact message', () => {
  it('needs a name, a valid email and a message; the company is optional', () => {
    expect(validate(emptyContact)).toEqual({ name: 'required', email: 'required', message: 'required' });
    expect(validate(filled)).toEqual({});
    expect(validate({ ...filled, email: 'ana@' })).toEqual({ email: 'invalid' });
  });

  it('refuses values over their limit', () => {
    expect(validate({ ...filled, message: 'x'.repeat(LIMITS.message + 1) })).toEqual({ message: 'tooLong' });
  });

  it('stores trimmed values and leaves an empty company out', () => {
    expect(toDocument({ ...filled, name: '  Ana ', company: ' ' })).toEqual({
      name: 'Ana',
      email: 'ana@example.com',
      message: 'Hello',
    });
  });
});
