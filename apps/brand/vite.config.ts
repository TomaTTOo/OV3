import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

export default defineConfig({
  // The build is one self-contained HTML file (code, styles and fonts inlined), opened straight from disk.
  plugins: [react(), viteSingleFile()],
  server: { port: 4190 },
  build: { outDir: 'dist' },
  // css: the generator reads tokens.css as text (?raw); Vitest blanks CSS unless told not to.
  test: { environment: 'jsdom', setupFiles: ['./src/test-setup.ts'], css: true },
});
