# The Outcome Vault logo

The specification every logo file is drawn from. `packages/design/src/logo.ts` builds the variants from it; nothing here is drawn by hand. All measures are in **units** of the logo's design space (the mark sits in a space 460 units wide); a file scales them to its size.

## 1. Composition

The logo has three tiers:

1. **The monogram:** "OV", an open O and V, with a gold accent dot.
2. **The underline:** a thin gold line under the monogram.
3. **The wordmark:** "OUTCOME VAULT" in wide capitals.

It comes in four layouts:

| Layout         | Tiers                                      | Used for                                                   |
| -------------- | ------------------------------------------ | ---------------------------------------------------------- |
| **Stacked**    | monogram, underline, wordmark below        | square spaces: the LinkedIn page logo, documents           |
| **Horizontal** | monogram and underline, wordmark beside it | wide spaces: the website header, the LinkedIn cover, email |
| **Mark**       | monogram and underline                     | where the name is already written next to it               |
| **Icon**       | monogram only, heavier, on a rounded tile  | small sizes: favicons, phone and app icons                 |

## 2. Geometry

### The O

- A horizontal capsule: **160 × 100**, its top-left corner at **(55, 65)**.
- Corner radius **50**, so both ends are perfect half-circles.
- Outline only: a stroke of **18**, centred on the path. The hole inside is **124** wide (160 − 18 − 18), balancing line and space.

### The V

- An open V: from **(245, 65)** down to **(322.5, 165)** and up to **(400, 65)**, a symmetric dip.
- Stroke **18**, with rounded ends and a rounded corner.

### The accent dot

- A gold square **22 × 22**, corners rounded at **4**, at **(387, 152)**.
- It sits flush with the V's lower-right outer edge (the stroke's 9-unit half-width included): the full stop after "OV".

### The underline

- A gold line from **(48.5, 210)** to **(411.5, 210)**, **363** long, spanning the outer edges of the O and the V.
- Stroke **6** (one third of the monogram's), rounded ends.

### The icon's heavier version

At favicon sizes an 18 stroke would be about 1 pixel. The icon uses the same O and V paths with:

- a stroke of **28**;
- a larger dot: **30 × 30**, corners **5**, at **(388, 149)**;
- no underline;
- a rounded square tile behind it: corner radius **22%** of its side, the monogram centred with an **18%** margin on each side.

## 3. Spacing

- **The gap (G = 33)** is the logo's rhythm: between the monogram and the underline, between the underline and the stacked wordmark, and between the mark and the wordmark in the horizontal lockup.
- **Stacked:** the wordmark's letters start 33 below the underline, centred on the monogram (x = 230).
- **Horizontal:** the wordmark starts 33 to the right of the mark's outer edge (x = 447.5), its letters centred on the O's middle (y = 115).

## 4. Typography

- **Typeface:** Syncopate, **Bold (700)**: a modern, ultra-wide sans serif.
- **Case:** all capitals, as written: OUTCOME VAULT.
- **Spacing between letters:** the typeface's own; none added.
- **Drawn as shapes, never as text:** the letters are converted once from the font into outlines (`packages/design/scripts/wordmark.ts`), so a logo file never depends on the font being installed or loaded.
- **Size, stacked:** a font size of **32**: letters **21.5** tall, the word **369** wide, matching the underline's span almost exactly.
- **Size, horizontal:** letters **40** tall (two fifths of the O's height), the word **687** wide.
- **Measured from the top of the letters**, so the 33 gap is the same visible space in every layout.
- Syncopate is for the wordmark only. The website's text is set in Sora.

## 5. Colour

The colours live in the design tokens (`packages/design/src/tokens.css`), their one source:

| Version   | Background                       | Monogram and wordmark             | Dot and underline                |
| --------- | -------------------------------- | --------------------------------- | -------------------------------- |
| **Light** | white (`--ov-color-brand-paper`) | graphite (`--ov-color-brand-ink`) | gold (`--ov-color-brand-accent`) |
| **Dark**  | near-black (`--ov-color-ground`) | white (`--ov-color-brand-paper`)  | gold (`--ov-color-brand-accent`) |

The original navy (#111827) was replaced by graphite to match the website. On the website, gold appears only in the logo: blue and red keep their meanings on the page.

## 6. Clear space

- Keep empty space around the logo equal to the **O's height (100)** on all four sides before any other element. In the stacked version it is measured from the bottom of the wordmark.
- Exports for other channels (LinkedIn, email) keep it; the website header is the one exception, where the page's own margins provide it.
- The logo generator can draw this zone as a dashed guide.

## 7. Contrast and rendering

| Pair                | Contrast | Note                                                       |
| ------------------- | -------- | ---------------------------------------------------------- |
| Graphite on white   | 16.2 : 1 | well above WCAG AAA                                        |
| White on near-black | 19.5 : 1 | well above WCAG AAA                                        |
| Gold on near-black  | 11.6 : 1 | strong                                                     |
| Gold on white       | 1.7 : 1  | faint: the accent reads as a highlight, not as information |

Logos are exempt from WCAG's contrast rules, and the gold carries no meaning of its own, so the light version is acceptable. If the dot and underline look too faint on white in practice, a darker gold for the light version is the fix (a token change; every file follows).

Rendering: shapes only, no text and no outside resources, so a file looks the same in every browser, app and image viewer.

## 8. Design intent

- **Style:** modern, minimal, architectural.
- **Meaning:** the heavy, even strokes and the wide wordmark convey stability and security (the "vault"); the open shapes, transparency; the dot, a full stop: certainty.
- **Ready for motion:** being built on a grid, the logo can animate cleanly (the underline drawing out from the centre, the dot dropping into its corner).

## 9. Where the files come from

- **The website** builds its own at every build: the horizontal logo for the header, the favicon (SVG and 32 px), the phone home-screen icon (180 px) and the app icon (512 px).
- **Every other file** (LinkedIn logo and cover, email signature, anything new) is exported from the logo generator (`apps/brand`, `pnpm --filter @ov/brand dev`). Its presets are the same list (`packages/design/src/presets.ts`); a new use gets a preset there first.
