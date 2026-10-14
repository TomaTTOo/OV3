import type { Content } from '../content.ts';
import { Section } from '../ui/Section.tsx';
import styles from './Statement.module.css';

/** The one sentence Outcome Vault stands for; its promise in blue. */
export function Statement({ statement }: { statement: Content['statement'] }) {
  return (
    <Section ruled>
      <p className={styles.statement}>
        {statement.plain} <span className={styles.emphasis}>{statement.emphasis}</span>
      </p>
    </Section>
  );
}
