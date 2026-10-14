import '@fontsource/sora/300.css';
import '@fontsource/sora/400.css';
import '@fontsource/sora/600.css';
import '@fontsource/syncopate/700.css';
import './styles/tokens.css';
import './styles/base.css';
import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { Page } from './Page.tsx';

const root = document.getElementById('root');
if (!root) throw new Error('The page has no #root element.');

const page = (
  <StrictMode>
    <Page />
  </StrictMode>
);

if (root.hasChildNodes()) hydrateRoot(root, page);
else createRoot(root).render(page);
