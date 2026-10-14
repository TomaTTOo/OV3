import type { Content } from '../content.ts';
import { PillLink } from '../ui/PillLink.tsx';
import { Section } from '../ui/Section.tsx';
import styles from './Contact.module.css';

/** The one thing the site asks of its reader: to get in touch. */
export function Contact({ id, contact, href }: { id: string; contact: Content['contact']; href: string }) {
  return (
    <Section id={id} tone="capacity">
      <div className={styles.contact}>
        <h2 className={styles.title}>{contact.title}</h2>
        <p className={styles.lead}>{contact.lead}</p>
        <PillLink href={href} look="dark">
          {contact.button}
        </PillLink>
      </div>
    </Section>
  );
}
