import styles from './SiteHeader.module.css';

type Props = { brand: string; logo: string };

/** The bar across the top, over the hero: the logo and wordmark. */
export function SiteHeader({ brand, logo }: Props) {
  return (
    <header className={styles.header}>
      <span className={styles.brand}>
        <img src={logo} alt="" className={styles.logo} />
        <span className={styles.wordmark}>{brand}</span>
      </span>
    </header>
  );
}
