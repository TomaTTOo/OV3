import type { Content } from '../content.ts';
import { ParticleCube } from '../cube/ParticleCube.tsx';
import { heroCube } from './heroCube.ts';
import { Eyebrow } from '../ui/Eyebrow.tsx';
import { PillLink } from '../ui/PillLink.tsx';
import styles from './Hero.module.css';

type Props = { hero: Content['hero']; howHref: string };

/** The opening: the cube forming from scattered history, behind what Outcome Vault is for. */
export function Hero({ hero, howHref }: Props) {
  return (
    <section className={styles.hero}>
      <div className={styles.cube}>
        <ParticleCube
          mode={heroCube.mode}
          side={heroCube.side}
          zoom={heroCube.zoom}
          poster={heroCube.poster}
        />
      </div>
      <div className={styles.content}>
        <Eyebrow>{hero.eyebrow}</Eyebrow>
        <h1 className={styles.title}>{hero.title}</h1>
        <p className={styles.lead}>{hero.lead}</p>
        <PillLink href={howHref} look="light">
          {hero.cta}
        </PillLink>
      </div>
    </section>
  );
}
