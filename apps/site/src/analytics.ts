/**
 * Visit counting with Umami Cloud: no cookies and no personal data, so no consent banner.
 * Counted only on the real domain, never on previews (localhost, the web.app address).
 */
export const analytics = {
  script: 'https://cloud.umami.is/script.js',
  websiteId: '88eed688-d1fb-480c-bb97-4f6a5b3ab6a3',
  domains: ['outcomevault.com'],
} as const;
