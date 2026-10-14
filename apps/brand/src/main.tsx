import '@fontsource/sora/400.css';
import '@fontsource/sora/600.css';
import '@ov/design/tokens.css';
import './base.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App.tsx';

const root = document.getElementById('root');
if (!root) throw new Error('The page has no #root element.');
createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
