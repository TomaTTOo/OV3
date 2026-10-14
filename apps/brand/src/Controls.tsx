import type { BrandTheme, LogoLayout, Tokens } from '@ov/design';
import { preset, presets } from '@ov/design';
import { edit, fromPreset, withTheme, type GeneratorState } from './state.ts';
import { ColourFields, SizeFields } from './Fields.tsx';
import { Choice } from './Choice.tsx';
import styles from './Controls.module.css';

type Props = { state: GeneratorState; tokens: Tokens; onChange: (state: GeneratorState) => void };

const layouts: { value: LogoLayout; label: string }[] = [
  { value: 'horizontal', label: 'Horizontal' },
  { value: 'stacked', label: 'Stacked' },
  { value: 'mark', label: 'Mark' },
  { value: 'icon', label: 'Icon' },
];
const versions: { value: BrandTheme; label: string }[] = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
];

/** What to draw: a preset, or the layout, version, colours and size by hand. */
export function Controls({ state, tokens, onChange }: Props) {
  return (
    <form className={styles.controls} onSubmit={(event) => event.preventDefault()}>
      <label className={styles.field}>
        <span className={styles.label}>Preset</span>
        <select
          value={state.presetId ?? ''}
          onChange={(event) => event.target.value && onChange(fromPreset(preset(event.target.value), tokens))}
        >
          {state.presetId === null && <option value="">Custom</option>}
          {presets.map((p) => (
            <option key={p.id} value={p.id}>
              {p.label}
            </option>
          ))}
        </select>
      </label>
      <Choice
        legend="Layout"
        options={layouts}
        value={state.layout}
        onChange={(layout) => onChange(edit(state, { layout }))}
      />
      <Choice
        legend="Version"
        options={versions}
        value={state.theme}
        onChange={(theme) => onChange(withTheme(state, theme, tokens))}
      />
      <ColourFields state={state} tokens={tokens} onChange={onChange} />
      <SizeFields state={state} onChange={onChange} />
      <label className={styles.inline}>
        <input
          type="checkbox"
          checked={state.clearSpace}
          onChange={(e) => onChange({ ...state, clearSpace: e.target.checked })}
        />
        Show the safe zone
      </label>
    </form>
  );
}
