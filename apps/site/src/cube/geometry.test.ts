import { describe, expect, it } from 'vitest';
import {
  createParticles,
  phaseAt,
  project,
  rgb,
  seeded,
  SPACING,
  stillFrame,
  step,
  STORY,
} from './geometry.ts';

const fixed = () => 0.5;

describe('the cube', () => {
  it('has one particle per cell of the cube', () => {
    expect(createParticles(4, 'form', fixed)).toHaveLength(64);
  });

  it('is centred on the origin', () => {
    const targets = createParticles(3, 'form', fixed).map((p) => p.target);
    const xs = targets.map((t) => t.x);
    expect(Math.min(...xs)).toBe(-SPACING);
    expect(Math.max(...xs)).toBe(SPACING);
  });

  it('in overload mode, adds red particles above the top face', () => {
    const particles = createParticles(10, 'overload', Math.random);
    const over = particles.filter((p) => p.kind === 'over');
    expect(over).toHaveLength(140);
    const top = -((10 - 1) * SPACING) / 2;
    over.forEach((p) => expect(p.target.y).toBeLessThan(top));
  });

  it('moves a particle towards its target', () => {
    const [particle] = createParticles(1, 'form', () => 1);
    if (!particle) throw new Error('No particle');
    const before = Math.abs(particle.position.x - particle.target.x);
    step(particle, 0, 0.5, phaseAt('form', 0));
    expect(Math.abs(particle.position.x - particle.target.x)).toBeCloseTo(before / 2);
  });

  it('tells the story: the red arrives after the cube forms, then everything scatters', () => {
    expect(phaseAt('story', 1)).toEqual({ scattered: false, over: 0 });
    expect(phaseAt('story', STORY.redArrives + 2)).toEqual({ scattered: false, over: 1 });
    expect(phaseAt('story', STORY.scatters + 0.5).scattered).toBe(true);
    expect(phaseAt('story', STORY.length + 1)).toEqual({ scattered: false, over: 0 });
  });

  it('shows the red at once in the modes without a story', () => {
    expect(phaseAt('overload', 0).over).toBe(1);
  });

  it('draws the same still image at every build', () => {
    const view = { width: 400, height: 300, zoom: 1, mode: 'story' as const };
    expect(stillFrame(4, view, 7)).toEqual(stillFrame(4, view, 7));
    expect(seeded(1)()).not.toBe(seeded(2)());
  });

  it('projects the centre to the middle of the view', () => {
    const point = project({ x: 0, y: 0, z: 0 }, 0, { width: 800, height: 600, zoom: 1, mode: 'form' });
    expect(point.x).toBe(400);
    expect(point.y).toBe(300);
  });

  it('reads colour tokens and refuses anything else', () => {
    expect(rgb(' #579dff')).toEqual([87, 157, 255]);
    expect(() => rgb('blue')).toThrow('Not a six-digit hex colour');
  });
});
