/**
 * The Outcome Vault logo, built as SVG from its specification (docs/brand/logo.md): pure, no DOM.
 * Coordinates are the specification's units (the mark sits in a 460-wide design space).
 */
import type { LogoColors } from './colors.ts';
import { wordmark } from './wordmark.generated.ts';

export type LogoLayout = 'mark' | 'stacked' | 'horizontal' | 'icon';
export type Box = { x: number; y: number; width: number; height: number };
export type LogoOptions = {
  layout: LogoLayout;
  colors: LogoColors;
  /** Empty space around the logo, in specification units. `clear` = the specification's safe zone (the height of the O). */
  padding: number | 'clear';
  /** Widen the frame to this width ÷ height, the logo centred in it (an export at a fixed size). */
  aspect?: number;
  /** Draw the safe zone as a dashed frame (a design aid, never exported). */
  showClearSpace?: boolean;
};

/** The specification's constants. */
export const SPEC = {
  stroke: 18,
  underlineStroke: 6,
  /** The O's height: the safe zone around the logo. */
  clearSpace: 100,
  /** The vertical rhythm between tiers. */
  gap: 33,
  stackedTextSize: 32,
  /** In the horizontal lockup, the wordmark's letters stand this tall (two-fifths of the O). */
  horizontalCapHeight: 40,
  /** The icon's tile: corner radius and inner margin, as shares of its side. */
  iconRadius: 0.22,
  iconMargin: 0.18,
  /** Small sizes need heavier strokes and a larger dot (the favicon), as in the original favicon. */
  iconStroke: 28,
  iconDot: 30,
} as const;

/** The mark's visual bounds, strokes included: the O and V above, the underline below. */
const MARK: Box = { x: 45.5, y: 56, width: 369, height: 157 };
/** The icon's O, V and dot, heavier strokes included. */
const GLYPHS: Box = { x: 41, y: 51, width: 377, height: 128 };

/** The O, the V and the dot; with the underline (the mark) or heavier for small sizes (the icon). */
function markShapes(colors: LogoColors, withUnderline: boolean): string {
  const { marks, accent } = colors;
  const s = withUnderline ? SPEC.stroke : SPEC.iconStroke;
  const dot = withUnderline
    ? { x: 387, y: 152, side: 22, radius: 4 }
    : { x: 388, y: 149, side: SPEC.iconDot, radius: 5 };
  return [
    `<rect x="55" y="65" width="160" height="100" rx="50" fill="none" stroke="${marks}" stroke-width="${s}"/>`,
    `<path d="M 245 65 L 322.5 165 L 400 65" fill="none" stroke="${marks}" stroke-width="${s}" stroke-linecap="round" stroke-linejoin="round"/>`,
    `<rect x="${dot.x}" y="${dot.y}" width="${dot.side}" height="${dot.side}" rx="${dot.radius}" fill="${accent}"/>`,
    withUnderline
      ? `<line x1="48.5" y1="210" x2="411.5" y2="210" stroke="${accent}" stroke-width="${SPEC.underlineStroke}" stroke-linecap="round"/>`
      : '',
  ].join('');
}

/** The wordmark placed with its letters' top-left corner at (x, top), letters `capHeight` tall. */
function wordmarkAt(x: number, top: number, capHeight: number, fill: string): { svg: string; box: Box } {
  const scale = capHeight / wordmark.capHeight;
  const baseline = top + capHeight;
  const svg = `<path d="${wordmark.d}" fill="${fill}" transform="translate(${round(x)} ${round(baseline)}) scale(${scale.toFixed(6)})"/>`;
  return { svg, box: { x, y: top, width: wordmark.width * scale, height: capHeight } };
}

const round = (n: number) => Math.round(n * 100) / 100;

function union(a: Box, b: Box): Box {
  const x = Math.min(a.x, b.x);
  const y = Math.min(a.y, b.y);
  return {
    x,
    y,
    width: Math.max(a.x + a.width, b.x + b.width) - x,
    height: Math.max(a.y + a.height, b.y + b.height) - y,
  };
}

/** The shapes of one layout and the box they fill. */
export function layoutContent(layout: LogoLayout, colors: LogoColors): { svg: string; box: Box } {
  switch (layout) {
    case 'mark':
      return { svg: markShapes(colors, true), box: MARK };
    case 'stacked': {
      const capHeight = (SPEC.stackedTextSize * wordmark.capHeight) / wordmark.unitsPerEm;
      const width = (wordmark.width * capHeight) / wordmark.capHeight;
      const top = MARK.y + MARK.height + SPEC.gap;
      const text = wordmarkAt(MARK.x + MARK.width / 2 - width / 2, top, capHeight, colors.marks);
      return { svg: markShapes(colors, true) + text.svg, box: union(MARK, text.box) };
    }
    case 'horizontal': {
      const oCentre = 115;
      const text = wordmarkAt(
        MARK.x + MARK.width + SPEC.gap,
        oCentre - SPEC.horizontalCapHeight / 2,
        SPEC.horizontalCapHeight,
        colors.marks,
      );
      return { svg: markShapes(colors, true) + text.svg, box: union(MARK, text.box) };
    }
    case 'icon':
      return { svg: markShapes(colors, false), box: GLYPHS };
  }
}

/** The frame around the content: padding added, then widened to the aspect if one is asked. */
export function frame(content: Box, padding: number, aspect?: number): Box {
  let box = {
    x: content.x - padding,
    y: content.y - padding,
    width: content.width + padding * 2,
    height: content.height + padding * 2,
  };
  if (aspect !== undefined) {
    const width = Math.max(box.width, box.height * aspect);
    const height = width / aspect;
    box = { x: box.x - (width - box.width) / 2, y: box.y - (height - box.height) / 2, width, height };
  }
  return box;
}

/** The logo as a standalone SVG document. The icon layout draws its own rounded tile; others draw the background, if any, edge to edge. */
export function logoSvg(options: LogoOptions): { svg: string; viewBox: Box } {
  const { layout, colors } = options;
  const content = layoutContent(layout, colors);
  if (layout === 'icon') return iconSvg(content, colors);
  const padding = options.padding === 'clear' ? SPEC.clearSpace : options.padding;
  const viewBox = frame(content.box, padding, options.aspect);
  const background = colors.background
    ? `<rect x="${round(viewBox.x)}" y="${round(viewBox.y)}" width="${round(viewBox.width)}" height="${round(viewBox.height)}" fill="${colors.background}"/>`
    : '';
  const guide = options.showClearSpace ? clearSpaceGuide(content.box, colors.marks) : '';
  return { svg: document(viewBox, background + content.svg + guide), viewBox };
}

function iconSvg(content: { svg: string; box: Box }, colors: LogoColors): { svg: string; viewBox: Box } {
  const side = Math.max(content.box.width, content.box.height) / (1 - SPEC.iconMargin * 2);
  const viewBox = frame(content.box, 0, 1);
  const tile = {
    x: viewBox.x + viewBox.width / 2 - side / 2,
    y: viewBox.y + viewBox.height / 2 - side / 2,
  };
  const square: Box = { ...tile, width: side, height: side };
  const background = `<rect x="${round(square.x)}" y="${round(square.y)}" width="${round(side)}" height="${round(side)}" rx="${round(side * SPEC.iconRadius)}" fill="${colors.background ?? 'none'}"/>`;
  return { svg: document(square, background + content.svg), viewBox: square };
}

function clearSpaceGuide(content: Box, color: string): string {
  const zone = frame(content, SPEC.clearSpace);
  return `<rect x="${round(zone.x)}" y="${round(zone.y)}" width="${round(zone.width)}" height="${round(zone.height)}" fill="none" stroke="${color}" stroke-opacity="0.5" stroke-width="2" stroke-dasharray="8 8"/>`;
}

function document(viewBox: Box, body: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${round(viewBox.x)} ${round(viewBox.y)} ${round(viewBox.width)} ${round(viewBox.height)}">${body}</svg>`;
}
