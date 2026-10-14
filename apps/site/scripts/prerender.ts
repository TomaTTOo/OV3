/**
 * Writes the page as static HTML into dist/index.html, so search engines and link previews read it
 * without running JavaScript. Runs after the client build (dist) and the server build (dist-ssr).
 */
import { readFile, writeFile, rm } from 'node:fs/promises';

type Rendered = { html: string; head: string };

const dist = new URL('../dist/', import.meta.url);
const serverBuild = new URL('../dist-ssr/entry-server.js', import.meta.url);

function fill(template: string, page: Rendered): string {
  const filled = template.replace('<!--head-->', page.head).replace('<!--app-->', page.html);
  if (filled.includes('<!--head-->') || filled.includes('<!--app-->')) {
    throw new Error('A placeholder in index.html was not filled.');
  }
  return filled;
}

const { renderPage } = (await import(serverBuild.href)) as { renderPage: () => Rendered };
const template = await readFile(new URL('index.html', dist), 'utf8');
await writeFile(new URL('index.html', dist), fill(template, renderPage()));
await rm(new URL('../dist-ssr/', import.meta.url), { recursive: true });
console.log('Static page written to dist/index.html');
