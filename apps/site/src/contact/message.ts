/** A contact message: its fields, their limits and their checks. Pure; the Firestore rules enforce the same limits. */

export type ContactValues = { name: string; email: string; company: string; message: string };
export type ContactField = keyof ContactValues;
export type ContactProblem = 'required' | 'invalid' | 'tooLong';
export type ContactErrors = Partial<Record<ContactField, ContactProblem>>;

/** Longest value each field accepts (firestore.rules checks the same numbers; a test keeps them equal). */
export const LIMITS: Record<ContactField, number> = { name: 120, email: 200, company: 120, message: 4000 };
const REQUIRED: readonly ContactField[] = ['name', 'email', 'message'];
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const emptyContact: ContactValues = { name: '', email: '', company: '', message: '' };

/** What is wrong with each field, if anything. */
export function validate(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  for (const field of Object.keys(LIMITS) as ContactField[]) {
    const value = values[field].trim();
    if (REQUIRED.includes(field) && value === '') errors[field] = 'required';
    else if (value.length > LIMITS[field]) errors[field] = 'tooLong';
  }
  if (!errors.email && !EMAIL.test(values.email.trim())) errors.email = 'invalid';
  return errors;
}

/** The document stored: trimmed, and without an empty company. */
export function toDocument(values: ContactValues) {
  const company = values.company.trim();
  return {
    name: values.name.trim(),
    email: values.email.trim(),
    message: values.message.trim(),
    ...(company ? { company } : {}),
  };
}
