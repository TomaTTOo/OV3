/** The particle cube's geometry: pure functions, no DOM. Used by the live canvas and by the still image built at build time. */

/** form: the cube forms once. overload: formed, with red particles above. story: forms, then the red arrives, holds, scatters, again. */
export type CubeMode = 'form' | 'overload' | 'story';
export type Vec = { x: number; y: number; z: number };
export type Particle = { kind: 'capacity' | 'over'; target: Vec; home: Vec; position: Vec; wobble: number };
export type Projected = { x: number; y: number; size: number; depth: number };
export type View = { width: number; height: number; zoom: number; mode: CubeMode };
/** Where the story is: whether everything is flying back to the cloud, and how visible the red is (0 to 1). */
export type Phase = { scattered: boolean; over: number };

/** Distance between neighbouring particles in the formed cube. */
export const SPACING = 22;
/** Width of the cloud the particles start from. */
const SCATTER = 1600;
/** How many over-capacity particles there are, per particle on one face. */
const OVER_PER_FACE_PARTICLE = 1.4;
/** How many spacings above the cube the over-capacity particles may hover. */
const OVER_LAYERS = 4.5;
const PERSPECTIVE = 700;
/** The story's timeline, in seconds: the cube forms, the red arrives, all holds, then scatters and starts again. */
export const STORY = { redArrives: 4, scatters: 14, length: 17 } as const;
/** The moment a still image shows: the cube formed, the red arrived, turned three-quarters. The live cube starts there when it replaces a still. */
export const STILL_TIME = 6;

const scatter = (random: () => number): Vec => ({
  x: (random() - 0.5) * SCATTER,
  y: (random() - 0.5) * SCATTER,
  z: (random() - 0.5) * SCATTER,
});

/** A repeatable random sequence (mulberry32), so the still image is the same at every build. */
export function seeded(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const particle = (kind: Particle['kind'], target: Vec, random: () => number, wobble = 0): Particle => {
  const home = scatter(random);
  return { kind, target, home, position: { ...home }, wobble };
};

/** The cube's particles, each starting in the cloud. With overload or story, red ones hover above the top face. */
export function createParticles(side: number, mode: CubeMode, random: () => number): Particle[] {
  const offset = ((side - 1) * SPACING) / 2;
  const particles: Particle[] = [];
  for (let x = 0; x < side; x++) {
    for (let y = 0; y < side; y++) {
      for (let z = 0; z < side; z++) {
        particles.push(
          particle(
            'capacity',
            { x: x * SPACING - offset, y: y * SPACING - offset, z: z * SPACING - offset },
            random,
          ),
        );
      }
    }
  }
  if (mode !== 'form') {
    const extra = Math.round(side * side * OVER_PER_FACE_PARTICLE);
    for (let i = 0; i < extra; i++) {
      const target = {
        x: (random() - 0.5) * side * SPACING,
        y: -offset - SPACING * (1 + random() * OVER_LAYERS),
        z: (random() - 0.5) * side * SPACING,
      };
      particles.push(particle('over', target, random, random() * Math.PI * 2));
    }
  }
  return particles;
}

/** Where the story is at a given time. Other modes have no story: formed, red fully visible. */
export function phaseAt(mode: CubeMode, time: number): Phase {
  if (mode !== 'story') return { scattered: false, over: 1 };
  const t = time % STORY.length;
  if (t >= STORY.scatters) return { scattered: true, over: Math.max(0, 1 - (t - STORY.scatters)) };
  return { scattered: false, over: Math.min(1, Math.max(0, t - STORY.redArrives)) };
}

/** Moves a particle a step towards where the phase wants it; red particles hover once they arrive. */
export function step(particle: Particle, time: number, ease: number, phase: Phase): void {
  const away = phase.scattered || (particle.kind === 'over' && phase.over === 0);
  const goal = away ? particle.home : particle.target;
  const hover = particle.kind === 'over' && !away ? Math.sin(time * 1.4 + particle.wobble) * 6 : 0;
  particle.position.x += (goal.x - particle.position.x) * ease;
  particle.position.y += (goal.y + hover - particle.position.y) * ease;
  particle.position.z += (goal.z - particle.position.z) * ease;
}

/** Where a particle lands on screen, the cube turning slowly with time. */
export function project(point: Vec, time: number, view: View): Projected {
  const yaw = time * 0.18;
  const pitch = 0.45 + Math.sin(time * 0.2) * 0.12;
  const x1 = point.x * Math.cos(yaw) - point.z * Math.sin(yaw);
  const z1 = point.x * Math.sin(yaw) + point.z * Math.cos(yaw);
  const y1 = point.y * Math.cos(pitch) - z1 * Math.sin(pitch);
  const z2 = point.y * Math.sin(pitch) + z1 * Math.cos(pitch);
  const perspective = PERSPECTIVE / (PERSPECTIVE + z2);
  const roomForRed = view.mode !== 'form';
  const scale = (Math.min(view.width, view.height) / (roomForRed ? 640 : 520)) * view.zoom;
  const lift = roomForRed ? 70 : 0;
  return {
    x: view.width / 2 + x1 * perspective * scale,
    y: view.height / 2 + (y1 + lift) * perspective * scale,
    size: Math.max(0.6, 1.9 * perspective * scale),
    depth: Math.max(0.12, Math.min(1, 0.95 - z2 / 600)),
  };
}

/** How strongly a particle shows: nearer is brighter; red fades with the story. */
export function alphaOf(particle: Particle, point: Projected, phase: Phase): number {
  return particle.kind === 'over' ? Math.min(1, point.depth * 0.88) * phase.over : point.depth * 0.55;
}

/** The particles of a still image: the cube formed (with its red, if any), seen at STILL_TIME. */
export function stillFrame(side: number, view: View, seed: number) {
  const particles = createParticles(side, view.mode, seeded(seed));
  const phase = phaseAt(view.mode, STILL_TIME);
  return particles.map((p) => {
    const point = project(p.target, STILL_TIME, view);
    return { kind: p.kind, ...point, alpha: alphaOf(p, point, phase) };
  });
}

/** `#579dff` → `[87, 157, 255]`. */
export function rgb(hex: string): [number, number, number] {
  const match = /^#([0-9a-f]{6})$/i.exec(hex.trim());
  if (!match?.[1]) throw new Error(`Not a six-digit hex colour: "${hex}"`);
  const n = parseInt(match[1], 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
