import type { Tokens } from '@ov/design';
import { brandThemes } from '@ov/design';
import { edit, onBrand, type GeneratorState } from './state.ts';
import styles from './Controls.module.css';

type Props = { state: GeneratorState; onChange: (state: GeneratorState) => void };

/** The marks, accent and background colours, free to explore; a warning once they leave the brand. */
export function ColourFields({ state, tokens, onChange }: Props & { tokens: Tokens }) {
  const { colors } = state;
  const versionBackground = brandThemes(tokens)[state.theme].background;
  const set = (change: Partial<typeof colors>) => onChange(edit(state, { colors: { ...colors, ...change } }));
  const transparent = (on: boolean) =>
    onChange(
      edit(state, {
        colors: on
          ? { marks: colors.marks, accent: colors.accent }
          : { ...colors, background: versionBackground },
      }),
    );
  return (
    <fieldset className={styles.group}>
      <legend className={styles.label}>Colours</legend>
      <label className={styles.inline}>
        <input type="color" value={colors.marks} onChange={(e) => set({ marks: e.target.value })} />
        Marks
      </label>
      <label className={styles.inline}>
        <input type="color" value={colors.accent} onChange={(e) => set({ accent: e.target.value })} />
        Accent
      </label>
      <label className={styles.inline}>
        <input
          type="color"
          value={colors.background ?? versionBackground}
          disabled={colors.background === undefined}
          onChange={(e) => set({ background: e.target.value })}
        />
        Background
      </label>
      <label className={styles.inline}>
        <input
          type="checkbox"
          checked={colors.background === undefined}
          onChange={(e) => transparent(e.target.checked)}
        />
        Transparent
      </label>
      {!onBrand(state, tokens) && (
        <p className={styles.warning}>Off-brand: these colours differ from the {state.theme} version.</p>
      )}
    </fieldset>
  );
}

/** The export's size in pixels. */
export function SizeFields({ state, onChange }: Props) {
  const size = (key: 'width' | 'height', value: string) =>
    onChange(edit(state, { [key]: Number(value) || state[key] }));
  return (
    <fieldset className={styles.group}>
      <legend className={styles.label}>Size in pixels</legend>
      <label className={styles.inline}>
        W
        <input type="number" min={16} value={state.width} onChange={(e) => size('width', e.target.value)} />
      </label>
      <label className={styles.inline}>
        H
        <input type="number" min={16} value={state.height} onChange={(e) => size('height', e.target.value)} />
      </label>
    </fieldset>
  );
}
