import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { describe, expect, it } from 'vitest';
import { brandThemes, parseTokens, preset } from '@ov/design';
import { edit, fromPreset, onBrand, svgOf, withTheme } from './state.ts';

const tokens = parseTokens(
  readFileSync(createRequire(import.meta.url).resolve('@ov/design/tokens.css'), 'utf8'),
);

describe('the generator', () => {
  it('starts from a preset, on brand', () => {
    const state = fromPreset(preset('linkedin-logo'), tokens);
    expect(state.layout).toBe('stacked');
    expect(onBrand(state, tokens)).toBe(true);
  });

  it('leaves the preset as soon as something is changed by hand', () => {
    const state = edit(fromPreset(preset('favicon'), tokens), { layout: 'mark' });
    expect(state.presetId).toBeNull();
  });

  it('flags colours that differ from the version as off-brand', () => {
    const state = fromPreset(preset('linkedin-logo'), tokens);
    expect(onBrand(edit(state, { colors: { ...state.colors, accent: '#ff0000' } }), tokens)).toBe(false);
  });

  it('switches version with its colours, keeping a transparent background transparent', () => {
    const header = fromPreset(preset('site-header'), tokens);
    const light = withTheme(header, 'light', tokens);
    expect(light.colors.marks).toBe(brandThemes(tokens).light.marks);
    expect(light.colors.background).toBeUndefined();
  });

  it('draws the safe zone only when asked, and never into exports', () => {
    const state = { ...fromPreset(preset('linkedin-logo'), tokens), clearSpace: true };
    expect(svgOf(state)).toContain('stroke-dasharray');
    expect(svgOf(state, false)).not.toContain('stroke-dasharray');
  });
});
