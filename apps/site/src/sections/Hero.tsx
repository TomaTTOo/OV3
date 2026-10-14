import type { Content } from '../content.ts';
import { ParticleCube } from '../cube/ParticleCube.tsx';
import { heroCube } from './heroCube.ts';
import { Eyebrow } from '../ui/Eyebrow.tsx';
import { PillLink } from '../ui/PillLink.tsx';
import styles from './Hero.module.css';

type Props = { hero: Content['hero']; cta: string; ctaHref: string; howHref: string };

/** The opening: the cube telling the story (scattered history, a plan, then the overload) behind what Outcome Vault is. */
export function Hero({ hero, cta, ctaHref, howHref }: Props) {
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
        <div className={styles.actions}>
          <PillLink href={ctaHref} look="light">
            {cta}
          </PillLink>
          <PillLink href={howHref} look="outline">
            {hero.secondaryCta}
          </PillLink>
        </div>
      </div>
    </section>
  );
}
