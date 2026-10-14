/** Where each bar of the capacity chart goes: pure, no DOM. */
import type { SprintLoad } from '../content.ts';

export type Bar = {
  sprint: SprintLoad;
  fits: boolean;
  x: number;
  width: number;
  /** The part within capacity, from the baseline up. */
  within: { y: number; height: number };
  /** The part beyond capacity, above it (height 0 when it fits). */
  over: { y: number; height: number };
  /** The capacity line's height. */
  capacityY: number;
};

export type Frame = { width: number; height: number; top: number; bottom: number };

/** Lays the sprints out side by side on a common scale, the tallest bar reaching the top of the frame. */
export function layoutBars(sprints: readonly SprintLoad[], frame: Frame): Bar[] {
  const highest = Math.max(...sprints.flatMap((s) => [s.planned, s.capacity]));
  if (!Number.isFinite(highest) || highest <= 0)
    throw new Error('A chart needs at least one sprint with work or capacity.');
  const baseline = frame.height - frame.bottom;
  const unit = (baseline - frame.top) / highest;
  const slot = frame.width / sprints.length;
  const width = slot * 0.36;
  return sprints.map((sprint, index) => {
    const withinItems = Math.min(sprint.planned, sprint.capacity);
    const overItems = Math.max(0, sprint.planned - sprint.capacity);
    const withinTop = baseline - withinItems * unit;
    return {
      sprint,
      fits: overItems === 0,
      x: slot * index + (slot - width) / 2,
      width,
      within: { y: withinTop, height: withinItems * unit },
      over: { y: withinTop - overItems * unit, height: overItems * unit },
      capacityY: baseline - sprint.capacity * unit,
    };
  });
}
