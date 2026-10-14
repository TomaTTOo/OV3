import type { ReactNode } from 'react';
import styles from './Eyebrow.module.css';

/** The small spaced capitals above a heading. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return <span className={styles.eyebrow}>{children}</span>;
}
