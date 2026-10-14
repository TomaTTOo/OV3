import type { Content } from '../content.ts';
import styles from './SiteFooter.module.css';

/** Copyright and the trademark notice. */
export function SiteFooter({ footer }: { footer: Content['footer'] }) {
  return (
    <footer className={styles.footer}>
      <span>{footer.copyright}</span>
      <span>{footer.trademark}</span>
    </footer>
  );
}
