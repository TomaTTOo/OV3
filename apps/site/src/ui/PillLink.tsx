import type { ReactNode } from 'react';
import styles from './PillLink.module.css';

type Props = { href: string; look: 'light' | 'outline' | 'dark'; children: ReactNode };

/** A link shaped as a pill button: light (the main action on dark), outline (secondary) or dark (the main action on blue). */
export function PillLink({ href, look, children }: Props) {
  return (
    <a href={href} className={`${styles.pill} ${styles[look]}`}>
      {children}
    </a>
  );
}
