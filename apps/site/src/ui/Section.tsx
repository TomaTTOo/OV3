import type { ReactNode } from 'react';
import styles from './Section.module.css';

type Props = {
  id?: string;
  tone?: 'plain' | 'surface' | 'light' | 'capacity';
  width?: 'text' | 'wide';
  ruled?: boolean;
  children: ReactNode;
};

/** A full-width band of the page, its content centred at the text or wide width. */
export function Section({ id, tone = 'plain', width = 'text', ruled = false, children }: Props) {
  const classes = [styles.band, styles[tone], ruled ? styles.ruled : undefined].filter(Boolean).join(' ');
  return (
    <section id={id} className={classes}>
      <div className={width === 'wide' ? styles.wide : styles.text}>{children}</div>
    </section>
  );
}
