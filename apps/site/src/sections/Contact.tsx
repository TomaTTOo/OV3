import type { Content } from '../content.ts';
import { Section } from '../ui/Section.tsx';
import { ContactForm } from './ContactForm.tsx';
import styles from './Contact.module.css';

/** The invitation to the pilot, and the form to answer it. */
export function Contact({ id, contact }: { id: string; contact: Content['contact'] }) {
  return (
    <Section id={id} tone="capacity">
      <div className={styles.contact}>
        <h2 className={styles.title}>{contact.title}</h2>
        <p className={styles.lead}>{contact.lead}</p>
        <ContactForm copy={contact.form} />
      </div>
    </Section>
  );
}
