import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: { port: 4190 },
  // css: the generator reads tokens.css as text (?raw); Vitest blanks CSS unless told not to.
  test: { environment: 'jsdom', setupFiles: ['./src/test-setup.ts'], css: true },
});
