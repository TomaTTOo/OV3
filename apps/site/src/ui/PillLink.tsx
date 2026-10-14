import type { ReactNode } from 'react';
import styles from './PillLink.module.css';

type Props = { href: string; look: 'light'; children: ReactNode };

/** A link shaped as a pill button, light on the dark ground. */
export function PillLink({ href, look, children }: Props) {
  return (
    <a href={href} className={`${styles.pill} ${styles[look]}`}>
      {children}
    </a>
  );
}
