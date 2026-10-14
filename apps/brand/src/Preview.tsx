import { dataUrl, svgOf, type GeneratorState } from './state.ts';
import styles from './Preview.module.css';

const smallSizes = [16, 32, 64] as const;

/** The logo large, then at the small sizes where details can blur (the favicon). */
export function Preview({ state }: { state: GeneratorState }) {
  const large = dataUrl(svgOf(state));
  const small = dataUrl(svgOf(state, false));
  return (
    <figure className={styles.preview}>
      <div className={styles.canvas}>
        <img src={large} alt="The logo as it will be exported" className={styles.large} />
      </div>
      <figcaption className={styles.small}>
        {smallSizes.map((size) => (
          <span key={size} className={styles.sample}>
            <img src={small} alt="" width={size} height={Math.round((size * state.height) / state.width)} />
            {size} px
          </span>
        ))}
      </figcaption>
    </figure>
  );
}
