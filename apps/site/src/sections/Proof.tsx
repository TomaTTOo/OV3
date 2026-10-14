import type { Content } from '../content.ts';
import { Eyebrow } from '../ui/Eyebrow.tsx';
import { Section } from '../ui/Section.tsx';
import styles from './Proof.module.css';

/** What the method behind Outcome Vault has already achieved, as three large figures. */
export function Proof({ proof }: { proof: Content['proof'] }) {
  return (
    <Section ruled>
      <Eyebrow>{proof.label}</Eyebrow>
      <ul className={styles.figures}>
        {proof.figures.map((figure) => (
          <li key={figure.value} className={styles.figure}>
            <span className={styles.value}>{figure.value}</span>
            <span className={styles.text}>{figure.text}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
