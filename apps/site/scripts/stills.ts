/**
 * Draws the cube once, at build time, from the same geometry as the live canvas:
 * the hero's first frame (shown until the live cube is drawn) and the image link previews show.
 * Colours are read from tokens.css, their one source.
 */
import { mkdir, readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import sharp from 'sharp';
import { stillFrame, type CubeMode } from '../src/cube/geometry.ts';
import { heroCube as hero } from '../src/sections/heroCube.ts';

const publicDir = new URL('../public/', import.meta.url);
/** A public path such as /generated/preview.png, as a file under public/. */
const file = (path: string) => new URL(path.replace(/^\//, ''), publicDir).pathname;
const tokens = await readFile(createRequire(import.meta.url).resolve('@ov/design/tokens.css'), 'utf8');

function color(name: string): string {
  const match = new RegExp(`--${name}:\\s*(#[0-9a-f]{6})`, 'i').exec(tokens);
  if (!match?.[1]) throw new Error(`tokens.css has no six-digit colour for --${name}`);
  return match[1];
}

const colors = {
  ground: color('ov-color-ground'),
  capacity: color('ov-color-capacity'),
  over: color('ov-color-over'),
};

/** The hero's cube, as an SVG of the given size. The live hero uses the same mode, side and zoom. */
function svg(width: number, height: number, mode: CubeMode, side: number, zoom: number): string {
  const rects = stillFrame(side, { width, height, zoom, mode }, 7)
    .filter((p) => p.alpha > 0)
    .map((p) => {
      const fill = p.kind === 'over' ? colors.over : colors.capacity;
      const s = p.size.toFixed(2);
      return `<rect x="${(p.x - p.size / 2).toFixed(1)}" y="${(p.y - p.size / 2).toFixed(1)}" width="${s}" height="${s}" fill="${fill}" fill-opacity="${p.alpha.toFixed(3)}"/>`;
    })
    .join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
<defs><linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
<stop offset="0.6" stop-color="${colors.ground}" stop-opacity="0"/><stop offset="1" stop-color="${colors.ground}" stop-opacity="1"/>
</linearGradient></defs>
<rect width="100%" height="100%" fill="${colors.ground}"/>${rects}<rect width="100%" height="100%" fill="url(#fade)"/>
</svg>`;
}

await mkdir(new URL('generated/', publicDir), { recursive: true });
await sharp(Buffer.from(svg(hero.posterSize.width, hero.posterSize.height, hero.mode, hero.side, hero.zoom)))
  .webp({ quality: 82 })
  .toFile(file(hero.poster));
await sharp(
  Buffer.from(svg(hero.previewSize.width, hero.previewSize.height, hero.mode, hero.side, hero.previewZoom)),
)
  .png({ compressionLevel: 9 })
  .toFile(file(hero.preview));
console.log('Stills written to public/generated/');
