import type { Tokens } from '@ov/design';
import { brandThemes, contrast } from '@ov/design';
import type { GeneratorState } from './state.ts';
import styles from './Contrast.module.css';

/** WCAG asks 3:1 for shapes such as a logo; 4.5:1 reads comfortably at any size. */
const verdict = (ratio: number) => (ratio >= 4.5 ? 'Good' : ratio >= 3 ? 'Enough for shapes' : 'Too low');

/** How well the marks and the accent stand out from the background (the version's, when transparent). */
export function Contrast({ state, tokens }: { state: GeneratorState; tokens: Tokens }) {
  const background = state.colors.background ?? brandThemes(tokens)[state.theme].background;
  const rows = [
    { label: 'Marks', ratio: contrast(state.colors.marks, background) },
    { label: 'Accent', ratio: contrast(state.colors.accent, background) },
  ];
  return (
    <dl className={styles.contrast}>
      {rows.map((row) => (
        <div key={row.label} className={row.ratio < 3 ? `${styles.row} ${styles.low}` : styles.row}>
          <dt>{row.label} on background</dt>
          <dd>
            {row.ratio.toFixed(1)} : 1 · {verdict(row.ratio)}
          </dd>
        </div>
      ))}
    </dl>
  );
}
