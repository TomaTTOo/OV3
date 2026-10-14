import type { BrandTheme } from './colors.ts';
import type { LogoLayout } from './logo.ts';

export type Preset = {
  id: string;
  label: string;
  /** The file it becomes. */
  file: string;
  layout: LogoLayout;
  theme: BrandTheme;
  format: 'svg' | 'png';
  /** Pixel size; an SVG keeps the frame's shape at any size. */
  width: number;
  height: number;
  /** Space around the logo, in specification units, or the safe zone. */
  padding: number | 'clear';
  /** Transparent instead of the version's background (the icon always draws its tile). */
  transparent?: boolean;
};

/** Every logo file Outcome Vault uses: the website's (built with the site) and the ones for other channels (exported from the generator). */
export const presets: readonly Preset[] = [
  {
    id: 'site-header',
    label: 'Website header',
    file: 'logo-horizontal-dark.svg',
    layout: 'horizontal',
    theme: 'dark',
    format: 'svg',
    width: 1200,
    height: 240,
    padding: 0,
    transparent: true,
  },
  {
    id: 'favicon',
    label: 'Favicon (SVG)',
    file: 'favicon.svg',
    layout: 'icon',
    theme: 'dark',
    format: 'svg',
    width: 512,
    height: 512,
    padding: 0,
  },
  {
    id: 'favicon-32',
    label: 'Favicon 32 px',
    file: 'favicon-32.png',
    layout: 'icon',
    theme: 'dark',
    format: 'png',
    width: 32,
    height: 32,
    padding: 0,
  },
  {
    id: 'apple-touch',
    label: 'Phone home screen 180 px',
    file: 'apple-touch-icon.png',
    layout: 'icon',
    theme: 'dark',
    format: 'png',
    width: 180,
    height: 180,
    padding: 0,
  },
  {
    id: 'app-icon',
    label: 'App icon 512 px',
    file: 'icon-512.png',
    layout: 'icon',
    theme: 'dark',
    format: 'png',
    width: 512,
    height: 512,
    padding: 0,
  },
  {
    id: 'linkedin-logo',
    label: 'LinkedIn page logo 400 × 400',
    file: 'linkedin-logo.png',
    layout: 'stacked',
    theme: 'light',
    format: 'png',
    width: 400,
    height: 400,
    padding: 'clear',
  },
  {
    id: 'linkedin-cover',
    label: 'LinkedIn cover 1128 × 191',
    file: 'linkedin-cover.png',
    layout: 'horizontal',
    theme: 'dark',
    format: 'png',
    width: 1128,
    height: 191,
    padding: 'clear',
  },
  {
    id: 'email-signature',
    label: 'Email signature 600 × 150',
    file: 'email-signature.png',
    layout: 'horizontal',
    theme: 'light',
    format: 'png',
    width: 600,
    height: 150,
    padding: 40,
  },
];

/** The files the website serves, built with it. */
export const siteFiles = ['site-header', 'favicon', 'favicon-32', 'apple-touch', 'app-icon'] as const;

export function preset(id: string): Preset {
  const found = presets.find((p) => p.id === id);
  if (!found) throw new Error(`No logo preset "${id}"`);
  return found;
}
