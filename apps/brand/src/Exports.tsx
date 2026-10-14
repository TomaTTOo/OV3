import { useState } from 'react';
import { downloadPng, downloadSvg } from './download.ts';
import { svgOf, type GeneratorState } from './state.ts';
import styles from './Exports.module.css';

/** Saves the logo as drawn, without the safe-zone guide. */
export function Exports({ state }: { state: GeneratorState }) {
  const [problem, setProblem] = useState<string | null>(null);
  const svg = svgOf(state, false);
  const png = () =>
    downloadPng(state.name, svg, state.width, state.height).catch((error: unknown) =>
      setProblem(String(error)),
    );
  return (
    <div className={styles.exports}>
      <button type="button" className={styles.button} onClick={() => downloadSvg(state.name, svg)}>
        Download SVG
      </button>
      <button type="button" className={styles.button} onClick={png}>
        Download PNG · {state.width} × {state.height}
      </button>
      {problem && <p className={styles.problem}>{problem}</p>}
    </div>
  );
}
