/** Colours read from tokens.css (their one source), as six-digit hex. Pure: give it the file's text. */

export type Tokens = ReadonlyMap<string, string>;
export type LogoColors = { marks: string; accent: string; background?: string };
export type BrandTheme = 'light' | 'dark';

/** Every `--name: value;` declaration in the file. */
export function parseTokens(css: string): Tokens {
  const tokens = new Map<string, string>();
  for (const match of css.matchAll(/--([\w-]+):\s*([^;]+);/g)) {
    if (match[1] && match[2]) tokens.set(match[1], match[2].trim());
  }
  return tokens;
}

/** A colour token as `#rrggbb`, following `var(--other)` references and widening `#rgb`. */
export function color(tokens: Tokens, name: string, seen: string[] = []): string {
  const value = tokens.get(name);
  if (value === undefined) throw new Error(`tokens.css has no --${name}`);
  const reference = /^var\(--([\w-]+)\)$/.exec(value);
  if (reference?.[1]) {
    if (seen.includes(name)) throw new Error(`--${name} refers to itself through ${seen.join(' → ')}`);
    return color(tokens, reference[1], [...seen, name]);
  }
  const short = /^#([0-9a-f])([0-9a-f])([0-9a-f])$/i.exec(value);
  if (short) return `#${short[1]}${short[1]}${short[2]}${short[2]}${short[3]}${short[3]}`.toLowerCase();
  if (/^#[0-9a-f]{6}$/i.test(value)) return value.toLowerCase();
  throw new Error(`--${name} is not a hex colour: "${value}"`);
}

/** The logo's two versions: ink marks on paper, or white marks on the website's ground. Gold is the accent in both. */
export function brandThemes(tokens: Tokens): Record<BrandTheme, Required<LogoColors>> {
  const accent = color(tokens, 'ov-color-brand-accent');
  return {
    light: {
      background: color(tokens, 'ov-color-brand-paper'),
      marks: color(tokens, 'ov-color-brand-ink'),
      accent,
    },
    dark: {
      background: color(tokens, 'ov-color-ground'),
      marks: color(tokens, 'ov-color-brand-paper'),
      accent,
    },
  };
}

/** WCAG contrast ratio between two colours, from 1 (none) to 21 (black on white). */
export function contrast(a: string, b: string): number {
  const [la, lb] = [luminance(a), luminance(b)];
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

function luminance(hex: string): number {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((channel) => {
    const c = channel / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * (r ?? 0) + 0.7152 * (g ?? 0) + 0.0722 * (b ?? 0);
}
