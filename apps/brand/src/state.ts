/** What the generator shows: pure, so it can be tested without a browser. */
import type { BrandTheme, LogoColors, LogoLayout, Preset } from '@ov/design';
import { brandThemes, presetColors, sizedSvg, type Tokens } from '@ov/design';

export type GeneratorState = {
  /** The preset in force, or null once something is changed by hand. */
  presetId: string | null;
  name: string;
  layout: LogoLayout;
  theme: BrandTheme;
  colors: LogoColors;
  width: number;
  height: number;
  padding: number | 'clear';
  clearSpace: boolean;
};

export function fromPreset(preset: Preset, tokens: Tokens): GeneratorState {
  return {
    presetId: preset.id,
    name: preset.file.replace(/\.(svg|png)$/, ''),
    layout: preset.layout,
    theme: preset.theme,
    colors: presetColors(preset, tokens),
    width: preset.width,
    height: preset.height,
    padding: preset.padding,
    clearSpace: false,
  };
}

/** A hand-made change: the preset no longer applies. */
export function edit(
  state: GeneratorState,
  change: Partial<Omit<GeneratorState, 'presetId'>>,
): GeneratorState {
  return { ...state, ...change, presetId: null, name: change.name ?? 'outcome-vault-logo' };
}

/** Switches to a version of the logo, its colours with it (keeping a transparent background transparent). */
export function withTheme(state: GeneratorState, theme: BrandTheme, tokens: Tokens): GeneratorState {
  const colors = brandThemes(tokens)[theme];
  return edit(state, {
    theme,
    colors: state.colors.background ? colors : { marks: colors.marks, accent: colors.accent },
  });
}

/** True while the colours are exactly the version's: anything else is an exploration, off-brand. */
export function onBrand(state: GeneratorState, tokens: Tokens): boolean {
  const theme = brandThemes(tokens)[state.theme];
  return (
    state.colors.marks === theme.marks &&
    state.colors.accent === theme.accent &&
    (state.colors.background === undefined || state.colors.background === theme.background)
  );
}

export function svgOf(state: GeneratorState, overlay = state.clearSpace): string {
  return sizedSvg(
    { layout: state.layout, colors: state.colors, padding: state.padding, showClearSpace: overlay },
    state.width,
    state.height,
  );
}

export const dataUrl = (svg: string) => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
