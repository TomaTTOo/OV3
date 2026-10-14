import type { Content } from '../content.ts';
import { sendContact } from '../contact/send.ts';
import { LIMITS, type ContactField } from '../contact/message.ts';
import { useContactForm } from '../contact/useContactForm.ts';
import styles from './ContactForm.module.css';

type Copy = Content['contact']['form'];
const fields: { field: ContactField; type: 'text' | 'email' | 'textarea'; autoComplete: string }[] = [
  { field: 'name', type: 'text', autoComplete: 'name' },
  { field: 'email', type: 'email', autoComplete: 'email' },
  { field: 'company', type: 'text', autoComplete: 'organization' },
  { field: 'message', type: 'textarea', autoComplete: 'off' },
];

/** The contact form: each problem said under its field, once the field is left; sending stores the message for the owner to read. */
export function ContactForm({ copy, send = sendContact }: { copy: Copy; send?: typeof sendContact }) {
  const form = useContactForm(send);
  if (form.status === 'sent')
    return (
      <p className={styles.sent} role="status">
        {copy.sent}
      </p>
    );
  const problem = (field: ContactField) => {
    const p = form.errors[field];
    return p === 'tooLong' ? copy.problems.tooLong(LIMITS[field]) : p ? copy.problems[p] : null;
  };
  return (
    <form
      className={styles.form}
      noValidate
      onSubmit={(event) => (event.preventDefault(), void form.submit())}
    >
      {fields.map(({ field, type, autoComplete }) => {
        const id = `contact-${field}`;
        const message = problem(field);
        const shared = {
          id,
          name: field,
          autoComplete,
          value: form.values[field],
          'aria-invalid': message ? true : undefined,
          'aria-describedby': message ? `${id}-problem` : undefined,
          onBlur: () => form.leave(field),
          className: styles.input,
        };
        return (
          <label
            key={field}
            htmlFor={id}
            className={field === 'message' ? `${styles.field} ${styles.wide}` : styles.field}
          >
            <span className={styles.label}>{copy.labels[field]}</span>
            {type === 'textarea' ? (
              <textarea {...shared} rows={5} onChange={(e) => form.change(field, e.target.value)} />
            ) : (
              <input {...shared} type={type} onChange={(e) => form.change(field, e.target.value)} />
            )}
            {message && (
              <span id={`${id}-problem`} className={styles.problem}>
                {message}
              </span>
            )}
          </label>
        );
      })}
      <input
        className={styles.trap}
        tabIndex={-1}
        aria-hidden="true"
        autoComplete="off"
        name="website"
        value={form.trap}
        onChange={(e) => form.setTrap(e.target.value)}
      />
      <p className={`${styles.privacy} ${styles.wide}`}>{copy.privacy}</p>
      <div className={`${styles.actions} ${styles.wide}`}>
        <button type="submit" className={styles.send} disabled={form.status === 'sending'}>
          {form.status === 'sending' ? copy.sending : copy.send}
        </button>
        {form.status === 'failed' && (
          <span className={styles.problem} role="alert">
            {copy.failed}
          </span>
        )}
      </div>
    </form>
  );
}
