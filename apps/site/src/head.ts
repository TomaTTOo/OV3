import { content } from './content.ts';
import { heroCube } from './sections/heroCube.ts';

const escape = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** The page's title and the tags search engines and link previews read. */
export function headTags(): string {
  const { title, description, url } = content.meta;
  const image = new URL(heroCube.preview, url).href;
  return [
    `<title>${escape(title)}</title>`,
    `<meta name="description" content="${escape(description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:title" content="${escape(title)}" />`,
    `<meta property="og:description" content="${escape(description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:width" content="${heroCube.previewSize.width}" />`,
    `<meta property="og:image:height" content="${heroCube.previewSize.height}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<link rel="preload" as="image" href="${heroCube.poster}" />`,
  ].join('\n    ');
}
