import { preset } from '@ov/design';

/** Where the build writes the logo files (scripts/brand.ts) and where the page finds them. */
export const BRAND_DIR = '/generated/brand/';

/** The public address of one of the website's logo files, by preset. */
export const brandFile = (id: string) => `${BRAND_DIR}${preset(id).file}`;
