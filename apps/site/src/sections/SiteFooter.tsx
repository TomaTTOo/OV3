import type { Content } from '../content.ts';
import styles from './SiteFooter.module.css';

/** Copyright (the current year, read when the page is shown) and the trademark notice. */
export function SiteFooter({ footer }: { footer: Content['footer'] }) {
  return (
    <footer className={styles.footer}>
      {/* The static page carries the year it was built; the browser corrects it if a new year has begun since. */}
      <span suppressHydrationWarning>{footer.copyright(new Date().getFullYear())}</span>
      <span>{footer.trademark}</span>
    </footer>
  );
}
