import type { Content } from '../content.ts';
import { Section } from '../ui/Section.tsx';
import styles from './Trust.module.css';

/** Why the numbers can be trusted: four points in a ruled grid. */
export function Trust({ trust }: { trust: Content['trust'] }) {
  return (
    <Section>
      <h2 className={styles.title}>{trust.title}</h2>
      <ul className={styles.grid}>
        {trust.items.map((item) => (
          <li key={item.title} className={styles.cell}>
            <span className={styles.cellTitle}>{item.title}</span>
            <span className={styles.cellText}>{item.text}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
