import type { Content } from '../content.ts';
import { PillLink } from '../ui/PillLink.tsx';
import { Section } from '../ui/Section.tsx';
import styles from './Pilot.module.css';

/** The one thing the site asks of its reader: to join the pilot. */
export function Pilot({ id, pilot, href }: { id: string; pilot: Content['pilot']; href: string }) {
  return (
    <Section id={id} tone="capacity">
      <div className={styles.pilot}>
        <h2 className={styles.title}>{pilot.title}</h2>
        <p className={styles.lead}>{pilot.lead}</p>
        <PillLink href={href} look="dark">
          {pilot.button}
        </PillLink>
      </div>
    </Section>
  );
}
