/** Builds the website's logo files from the brand's one source (@ov/design): SVGs as they are, PNGs rendered at their size. */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import sharp from 'sharp';
import { parseTokens, preset, presetSvg, siteFiles } from '@ov/design';
import { BRAND_DIR } from '../src/brandFiles.ts';

const require = createRequire(import.meta.url);
const tokens = parseTokens(await readFile(require.resolve('@ov/design/tokens.css'), 'utf8'));
const out = new URL(`../public${BRAND_DIR}`, import.meta.url);
await mkdir(out, { recursive: true });

for (const id of siteFiles) {
  const p = preset(id);
  const svg = presetSvg(p, tokens);
  const file = new URL(p.file, out).pathname;
  if (p.format === 'svg') await writeFile(file, svg);
  else await sharp(Buffer.from(svg)).resize(p.width, p.height).png({ compressionLevel: 9 }).toFile(file);
}
console.log(`Logo files written to public${BRAND_DIR}`);
