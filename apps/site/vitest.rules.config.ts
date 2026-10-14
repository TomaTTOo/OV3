import { defineConfig } from 'vitest/config';

/** The Firestore rules tests: run against the emulator by `pnpm test:rules` (needs Java). */
export default defineConfig({ test: { include: ['src/**/*.rules.test.ts'], environment: 'node' } });
