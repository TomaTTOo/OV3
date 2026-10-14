import type { CubeMode } from '../cube/geometry.ts';

/** The hero's cube: its one definition, used by the page and by the still images built from it. */
export const heroCube = {
  mode: 'form' as CubeMode,
  side: 12,
  /** Size in the hero. */
  zoom: 1.45,
  /** Size in the link preview image. */
  previewZoom: 1.15,
  /** The still shown until the live cube is drawn, at the hero's desktop size. */
  poster: '/generated/hero-still.webp',
  posterSize: { width: 1440, height: 752 },
  /** The image link previews show (LinkedIn and others expect 1200 × 630). */
  preview: '/generated/preview.png',
  previewSize: { width: 1200, height: 630 },
} as const;
