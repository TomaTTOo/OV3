/**
 * A contact message, defined once as a Zod schema (zod/mini, the light edition): its fields, trimming, lengths and email format.
 * The checks shown in the form and the document stored both come from it; firestore.rules enforce the same limits.
 */
import * as z from 'zod/mini';

/** Longest value each field accepts (firestore.rules checks the same numbers; a test keeps them equal). */
export const LIMITS = { name: 120, email: 200, company: 120, message: 4000 } as const;

const text = (min: number, max: number) => z.string().check(z.trim(), z.minLength(min), z.maxLength(max));

/** What the form sends: trimmed, the company left out when empty (Firestore refuses empty values). */
export const contactSchema = z.pipe(
  z.object({
    name: text(1, LIMITS.name),
    email: z.pipe(text(1, LIMITS.email), z.email()),
    company: text(0, LIMITS.company),
    message: text(1, LIMITS.message),
  }),
  z.transform(({ company, ...rest }) => (company ? { ...rest, company } : rest)),
);

export type ContactValues = z.input<typeof contactSchema>;
export type ContactField = keyof ContactValues;
export type ContactProblem = 'required' | 'invalid' | 'tooLong';
export type ContactErrors = Partial<Record<ContactField, ContactProblem>>;

export const emptyContact: ContactValues = { name: '', email: '', company: '', message: '' };

/** Zod's issue codes, in the words the form uses. */
const problems: Partial<Record<z.core.$ZodIssue['code'], ContactProblem>> = {
  too_small: 'required',
  too_big: 'tooLong',
  invalid_format: 'invalid',
};

/** What is wrong with each field, if anything: the first problem per field. */
export function validate(values: ContactValues): ContactErrors {
  const result = contactSchema.safeParse(values);
  if (result.success) return {};
  const errors: ContactErrors = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0] as ContactField | undefined;
    const problem = problems[issue.code];
    if (field && problem && !errors[field]) errors[field] = problem;
  }
  return errors;
}

/** The document stored. Only called once `validate` found nothing wrong. */
export const toDocument = (values: ContactValues) => contactSchema.parse(values);
