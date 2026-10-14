import { renderToString } from 'react-dom/server';
import { Page } from './Page.tsx';
import { headTags } from './head.ts';

/** Everything the build needs to write the page as static HTML. */
export function renderPage() {
  return { html: renderToString(<Page />), head: headTags() };
}
