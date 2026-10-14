import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { brandThemes, color, contrast, parseTokens } from './colors.ts';
import { frame, logoSvg, SPEC } from './logo.ts';
import { preset, presets, siteFiles } from './presets.ts';
import { presetSvg } from './export.ts';

const tokens = parseTokens(readFileSync(new URL('./tokens.css', import.meta.url), 'utf8'));

describe('colours from the tokens', () => {
  it('follows references and widens short hex', () => {
    expect(color(tokens, 'ov-color-brand-ink')).toBe(color(tokens, 'ov-color-text-on-light'));
    expect(color(tokens, 'ov-color-brand-paper')).toBe('#ffffff');
  });

  it('refuses a token that does not exist', () => {
    expect(() => color(tokens, 'nope')).toThrow('no --nope');
  });

  it('gives the two versions of the logo, gold in both', () => {
    const themes = brandThemes(tokens);
    expect(themes.dark.background).toBe(color(tokens, 'ov-color-ground'));
    expect(themes.light.accent).toBe(themes.dark.accent);
  });

  it('keeps the marks readable on their background in both versions', () => {
    const { light, dark } = brandThemes(tokens);
    expect(contrast(light.marks, light.background)).toBeGreaterThan(7);
    expect(contrast(dark.marks, dark.background)).toBeGreaterThan(7);
  });

  it('measures contrast as WCAG does', () => {
    expect(contrast('#000000', '#ffffff')).toBeCloseTo(21);
    expect(contrast('#777777', '#777777')).toBe(1);
  });
});

describe('the logo', () => {
  const colors = { marks: '#000000', accent: '#ffcc00' };

  it('draws the wordmark as shapes, never as text', () => {
    for (const layout of ['stacked', 'horizontal'] as const) {
      const { svg } = logoSvg({ layout, colors, padding: 0 });
      expect(svg).not.toContain('<text');
      expect(svg).toContain('<path d="M');
    }
  });

  it('leaves the underline out of the icon', () => {
    expect(logoSvg({ layout: 'icon', colors, padding: 0 }).svg).not.toContain('<line');
    expect(logoSvg({ layout: 'mark', colors, padding: 0 }).svg).toContain('<line');
  });

  it('keeps the safe zone around the logo when asked', () => {
    const tight = logoSvg({ layout: 'mark', colors, padding: 0 }).viewBox;
    const clear = logoSvg({ layout: 'mark', colors, padding: 'clear' }).viewBox;
    expect(clear.width - tight.width).toBe(SPEC.clearSpace * 2);
  });

  it('widens the frame to an aspect, the logo centred', () => {
    const box = frame({ x: 0, y: 0, width: 100, height: 100 }, 0, 2);
    expect(box).toEqual({ x: -50, y: 0, width: 200, height: 100 });
  });
});

describe('the presets', () => {
  it('cover every file the website needs', () => {
    for (const id of siteFiles) expect(preset(id).file).toBeTruthy();
  });

  it('size each SVG for its use', () => {
    const svg = presetSvg(preset('favicon'), tokens);
    expect(svg).toMatch(/^<svg width="512" height="512" /);
  });

  it('have unique files', () => {
    expect(new Set(presets.map((p) => p.file)).size).toBe(presets.length);
  });
});
