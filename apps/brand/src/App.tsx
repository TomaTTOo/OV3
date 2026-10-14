import { useState } from 'react';
import tokensCss from '@ov/design/tokens.css?raw';
import { parseTokens, preset } from '@ov/design';
import { fromPreset } from './state.ts';
import { Controls } from './Controls.tsx';
import { Preview } from './Preview.tsx';
import { Contrast } from './Contrast.tsx';
import { Exports } from './Exports.tsx';
import styles from './App.module.css';

const tokens = parseTokens(tokensCss);
/** The generator opens on the website's header logo. */
const first = preset('site-header');

/** The logo generator: every file drawn from the brand's one source (@ov/design). */
export function App() {
  const [state, setState] = useState(() => fromPreset(first, tokens));
  return (
    <main className={styles.app}>
      <header className={styles.header}>
        <h1 className={styles.title}>Logo generator</h1>
        <p className={styles.note}>
          Drawn from packages/design. The website builds its own files from the same presets.
        </p>
      </header>
      <div className={styles.columns}>
        <Controls state={state} tokens={tokens} onChange={setState} />
        <section className={styles.stage}>
          <Preview state={state} />
          <Contrast state={state} tokens={tokens} />
          <Exports state={state} />
        </section>
      </div>
    </main>
  );
}
