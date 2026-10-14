import { useEffect, useRef, useState } from 'react';
import {
  alphaOf,
  createParticles,
  phaseAt,
  project,
  rgb,
  step,
  STILL_TIME,
  type CubeMode,
  type Particle,
} from './geometry.ts';
import styles from './ParticleCube.module.css';

type Props = { mode: CubeMode; side: number; zoom: number; poster?: string };
type Colors = Record<'ground' | 'capacity' | 'over', [number, number, number]>;

/** Reads a colour token from the page (tokens.css), so the canvas uses the same values as the CSS. */
const token = (name: string) => rgb(getComputedStyle(document.documentElement).getPropertyValue(name));

/**
 * A cube of particles flying in from chaos. Decorative: hidden from screen readers.
 * With a poster, that still image shows until the live cube has drawn, then the canvas fades in over it.
 */
export function ParticleCube({ mode, side, zoom, poster }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;
    return animate(canvas, context, { mode, side, zoom }, Boolean(poster), () => setLive(true));
  }, [mode, side, zoom, poster]);

  return (
    <div className={styles.cube} aria-hidden="true">
      {poster && <img src={poster} alt="" className={styles.poster} />}
      <canvas
        ref={canvasRef}
        className={live || !poster ? styles.canvas : `${styles.canvas} ${styles.waiting}`}
      />
    </div>
  );
}

function animate(
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  props: Omit<Props, 'poster'>,
  fromStill: boolean,
  onFirstFrame: () => void,
): () => void {
  const colors: Colors = {
    ground: token('--ov-color-ground'),
    capacity: token('--ov-color-capacity'),
    over: token('--ov-color-over'),
  };
  const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const particles = createParticles(props.side, props.mode, Math.random);
  // Replacing a still, or for visitors who turn motion off: start where the still is, the cube formed.
  if (still || fromStill) particles.forEach((p) => Object.assign(p.position, p.target));
  const startedAt = performance.now() - (fromStill || still ? STILL_TIME * 1000 : 0);
  let frame = 0;
  let visible = true;
  let first = true;

  const draw = (now: number) => {
    const time = still ? STILL_TIME : (now - startedAt) / 1000;
    paint(canvas, context, colors, (view) =>
      drawParticles(context, particles, colors, props, view, time, still),
    );
    if (first) {
      first = false;
      onFirstFrame();
    }
    if (!still && visible) frame = requestAnimationFrame(draw);
  };

  const observer = new IntersectionObserver(([entry]) => {
    const wasVisible = visible;
    visible = entry?.isIntersecting ?? false;
    if (visible && !wasVisible && !still) frame = requestAnimationFrame(draw);
  });
  observer.observe(canvas);
  frame = requestAnimationFrame(draw);
  return () => {
    cancelAnimationFrame(frame);
    observer.disconnect();
  };
}

function drawParticles(
  context: CanvasRenderingContext2D,
  particles: Particle[],
  colors: Colors,
  props: Omit<Props, 'poster'>,
  view: { width: number; height: number },
  time: number,
  still: boolean,
) {
  const phase = phaseAt(props.mode, time);
  for (const particle of particles) {
    if (!still) step(particle, time, 0.035, phase);
    const point = project(particle.position, time, { ...view, zoom: props.zoom, mode: props.mode });
    const alpha = alphaOf(particle, point, phase);
    if (alpha <= 0) continue;
    const [r, g, b] = particle.kind === 'over' ? colors.over : colors.capacity;
    context.fillStyle = `rgba(${r},${g},${b},${alpha.toFixed(3)})`;
    context.fillRect(point.x - point.size / 2, point.y - point.size / 2, point.size, point.size);
  }
}

/** Clears the canvas to the ground colour at the screen's resolution, lets `drawAll` add light, then fades the bottom into the ground. */
function paint(
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  colors: Colors,
  drawAll: (view: { width: number; height: number }) => void,
) {
  const ratio = window.devicePixelRatio || 1;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  if (canvas.width !== Math.round(width * ratio) || canvas.height !== Math.round(height * ratio)) {
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
  }
  const ground = colors.ground.join(',');
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  context.globalCompositeOperation = 'source-over';
  context.fillStyle = `rgb(${ground})`;
  context.fillRect(0, 0, width, height);
  context.globalCompositeOperation = 'lighter';
  drawAll({ width, height });
  context.globalCompositeOperation = 'source-over';
  const fade = context.createLinearGradient(0, height * 0.6, 0, height);
  fade.addColorStop(0, `rgba(${ground},0)`);
  fade.addColorStop(1, `rgba(${ground},1)`);
  context.fillStyle = fade;
  context.fillRect(0, height * 0.6, width, height * 0.4);
}
