import { useRef, useState } from 'react';
import {
  emptyContact,
  validate,
  type ContactErrors,
  type ContactField,
  type ContactValues,
} from './message.ts';

export type Status = 'editing' | 'sending' | 'sent' | 'failed';

/**
 * The form's state: values, errors shown once a field is left (or on send), and the sending status.
 * `trap` is a field people never see: bots fill it, and then nothing is sent.
 */
export function useContactForm(send: (values: ContactValues) => Promise<void>) {
  const [values, setValues] = useState<ContactValues>(emptyContact);
  const [shown, setShown] = useState<ReadonlySet<ContactField>>(new Set());
  const [status, setStatus] = useState<Status>('editing');
  const [trap, setTrap] = useState('');
  /** Set the moment a send starts, so a second click before the screen updates cannot send again. */
  const busy = useRef(false);
  const all = validate(values);
  const errors: ContactErrors = Object.fromEntries(
    Object.entries(all).filter(([field]) => shown.has(field as ContactField)),
  );

  const change = (field: ContactField, value: string) => setValues((v) => ({ ...v, [field]: value }));
  const leave = (field: ContactField) => setShown((s) => new Set(s).add(field));
  const submit = async () => {
    setShown(new Set(Object.keys(values) as ContactField[]));
    if (Object.keys(all).length > 0 || busy.current) return;
    if (trap !== '') return setStatus('sent');
    busy.current = true;
    setStatus('sending');
    try {
      await send(values);
      setStatus('sent');
    } catch {
      busy.current = false;
      setStatus('failed');
    }
  };
  return { values, errors, status, change, leave, submit, trap, setTrap };
}
