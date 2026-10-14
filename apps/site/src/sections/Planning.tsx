import type { Content } from '../content.ts';
import { ParticleCube } from '../cube/ParticleCube.tsx';
import { Eyebrow } from '../ui/Eyebrow.tsx';
import { Legend } from '../ui/Legend.tsx';
import { Section } from '../ui/Section.tsx';
import styles from './Planning.module.css';

/** Planning as it is done today, beside the cube with what was committed beyond capacity in red. */
export function Planning({ planning }: { planning: Content['planning'] }) {
  return (
    <Section width="wide">
      <div className={styles.columns}>
        <div className={styles.text}>
          <Eyebrow>{planning.label}</Eyebrow>
          <h2 className={styles.title}>
            {planning.title.before}
            <span className={styles.over}>{planning.title.over}</span>
            {planning.title.after}
          </h2>
          <ul className={styles.items}>
            {planning.items.map((item) => (
              <li key={item.title} className={styles.item}>
                <span className={styles.itemTitle}>{item.title}</span>
                <span className={styles.itemText}>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
        <figure className={styles.figure}>
          <div className={styles.cube}>
            <ParticleCube mode="overload" side={11} zoom={1.45} />
          </div>
          <figcaption>
            <Legend
              centred
              items={[
                { label: planning.legend.capacity, mark: 'capacity' },
                { label: planning.legend.over, mark: 'over' },
              ]}
            />
          </figcaption>
        </figure>
      </div>
    </Section>
  );
}
