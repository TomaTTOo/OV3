import { describe, expect, it } from 'vitest';
import { layoutBars } from './layout.ts';

const frame = { width: 300, height: 220, top: 20, bottom: 0 };

describe('the capacity chart', () => {
  it('splits a sprint over capacity into what fits and what does not', () => {
    const [bar] = layoutBars([{ name: 'S', planned: 12, capacity: 8, likelihood: 41 }], frame);
    expect(bar?.fits).toBe(false);
    expect(bar?.within.height).toBeCloseTo((8 / 12) * 200);
    expect(bar?.over.height).toBeCloseTo((4 / 12) * 200);
    expect(bar?.capacityY).toBeCloseTo(bar?.within.y ?? NaN);
  });

  it('keeps a sprint that fits entirely within capacity', () => {
    const [bar] = layoutBars([{ name: 'S', planned: 7, capacity: 9, likelihood: 92 }], frame);
    expect(bar?.fits).toBe(true);
    expect(bar?.over.height).toBe(0);
    expect(bar?.capacityY).toBeLessThan(bar?.within.y ?? NaN);
  });

  it('places sprints side by side, each in its own slot', () => {
    const bars = layoutBars(
      [
        { name: 'A', planned: 1, capacity: 1, likelihood: 90 },
        { name: 'B', planned: 1, capacity: 1, likelihood: 90 },
      ],
      frame,
    );
    const [first, second] = bars;
    expect((second?.x ?? NaN) - (first?.x ?? NaN)).toBeCloseTo(150);
  });

  it('refuses a chart with nothing to draw', () => {
    expect(() => layoutBars([], frame)).toThrow('at least one sprint');
  });
});
