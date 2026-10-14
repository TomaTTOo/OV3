import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(cleanup);

// jsdom draws nothing: the cube is decorative and skips its animation when the canvas has no 2D context.
HTMLCanvasElement.prototype.getContext = () => null;
