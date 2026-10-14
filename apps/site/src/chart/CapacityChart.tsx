import type { Content } from '../content.ts';
import { Legend } from '../ui/Legend.tsx';
import { layoutBars } from './layout.ts';
import styles from './CapacityChart.module.css';

const frame = { width: 600, height: 300, top: 36, bottom: 0 };

/** The idea in one picture: each sprint's planned work against the capacity the team really has, the overflow in red. */
export function CapacityChart({ chart }: { chart: Content['how']['chart'] }) {
  const bars = layoutBars(chart.sprints, frame);
  const description = bars
    .map(
      (b) =>
        `${b.sprint.name}: ${chart.load(b.sprint.planned, b.sprint.capacity)}, ${chart.likely(b.sprint.likelihood)}.`,
    )
    .join(' ');
  return (
    <figure className={styles.figure}>
      <figcaption className={styles.title}>{chart.title}</figcaption>
      <svg
        viewBox={`0 0 ${frame.width} ${frame.height + 56}`}
        role="img"
        aria-label={`${chart.title}. ${description}`}
        className={styles.chart}
      >
        {bars.map((bar) => (
          <g key={bar.sprint.name}>
            <rect
              x={bar.x}
              y={bar.within.y}
              width={bar.width}
              height={bar.within.height}
              className={styles.within}
            />
            <rect
              x={bar.x}
              y={bar.over.y}
              width={bar.width}
              height={bar.over.height}
              className={styles.over}
            />
            <line
              x1={bar.x - 14}
              x2={bar.x + bar.width + 14}
              y1={bar.capacityY}
              y2={bar.capacityY}
              className={styles.capacity}
            />
            <text
              x={bar.x + bar.width / 2}
              y={Math.min(bar.over.y, bar.capacityY) - 12}
              className={bar.fits ? styles.label : `${styles.label} ${styles.overText}`}
            >
              {chart.likely(bar.sprint.likelihood)}
            </text>
            <text x={bar.x + bar.width / 2} y={frame.height + 26} className={styles.label}>
              {bar.sprint.name}
            </text>
            <text x={bar.x + bar.width / 2} y={frame.height + 48} className={styles.load}>
              {chart.load(bar.sprint.planned, bar.sprint.capacity)}
            </text>
          </g>
        ))}
        <line x1={0} x2={frame.width} y1={frame.height} y2={frame.height} className={styles.baseline} />
      </svg>
      <Legend
        items={[
          { label: chart.legend.within, mark: 'capacityOnLight' },
          { label: chart.legend.over, mark: 'overOnLight' },
          { label: chart.legend.capacity, mark: 'capacityLine' },
        ]}
      />
      <p className={styles.caption}>{chart.caption}</p>
    </figure>
  );
}
