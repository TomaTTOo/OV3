import { brandFile } from '../brandFiles.ts';
import styles from './SiteHeader.module.css';

/** The bar across the top, over the hero: the logo (mark and wordmark, one image). */
export function SiteHeader({ brand }: { brand: string }) {
  return (
    <header className={styles.header}>
      <img src={brandFile('site-header')} alt={brand} className={styles.logo} />
    </header>
  );
}
