import { PillLink } from '../ui/PillLink.tsx';
import styles from './SiteHeader.module.css';

type Props = { brand: string; logo: string; cta: string; ctaHref: string };

/** The bar across the top, over the hero: the logo and wordmark, and the one action the site asks for. */
export function SiteHeader({ brand, logo, cta, ctaHref }: Props) {
  return (
    <header className={styles.header}>
      <span className={styles.brand}>
        <img src={logo} alt="" className={styles.logo} />
        <span className={styles.wordmark}>{brand}</span>
      </span>
      <PillLink href={ctaHref} look="outline">
        {cta}
      </PillLink>
    </header>
  );
}
