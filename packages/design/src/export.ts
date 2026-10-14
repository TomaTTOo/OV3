import type { LogoColors, Tokens } from './colors.ts';
import { brandThemes } from './colors.ts';
import { logoSvg, type LogoOptions } from './logo.ts';
import type { Preset } from './presets.ts';

/** The logo as an SVG document of a given pixel size, its frame widened to that shape. */
export function sizedSvg(options: Omit<LogoOptions, 'aspect'>, width: number, height: number): string {
  const { svg } = logoSvg({ ...options, aspect: width / height });
  return svg.replace('<svg ', `<svg width="${width}" height="${height}" `);
}

/** A preset's colours: its version's, without the background when it asks to be transparent. */
export function presetColors(preset: Preset, tokens: Tokens): LogoColors {
  const theme = brandThemes(tokens)[preset.theme];
  return preset.transparent ? { marks: theme.marks, accent: theme.accent } : theme;
}

/** A preset's logo, sized for it. */
export function presetSvg(preset: Preset, tokens: Tokens): string {
  return sizedSvg(
    { layout: preset.layout, colors: presetColors(preset, tokens), padding: preset.padding },
    preset.width,
    preset.height,
  );
}
