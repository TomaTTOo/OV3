import type { Content } from '../content.ts';
import { CapacityChart } from '../chart/CapacityChart.tsx';
import { Section } from '../ui/Section.tsx';
import styles from './Steps.module.css';

/** How it works: three numbered steps on a light band, then the idea as a chart. */
export function Steps({ id, how }: { id: string; how: Content['how'] }) {
  return (
    <Section id={id} tone="light">
      <h2 className={styles.title}>{how.title}</h2>
      <ol className={styles.steps}>
        {how.steps.map((step, index) => (
          <li key={step.title} className={styles.step}>
            <span className={styles.number} aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className={styles.stepTitle}>{step.title}</span>
            <span className={styles.stepText}>{step.text}</span>
          </li>
        ))}
      </ol>
      <CapacityChart chart={how.chart} />
    </Section>
  );
}
