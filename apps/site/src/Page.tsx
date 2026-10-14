import { content } from './content.ts';
import { SiteHeader } from './sections/SiteHeader.tsx';
import { Hero } from './sections/Hero.tsx';
import { Statement } from './sections/Statement.tsx';
import { Planning } from './sections/Planning.tsx';
import { Steps } from './sections/Steps.tsx';
import { Trust } from './sections/Trust.tsx';
import { Proof } from './sections/Proof.tsx';
import { Pilot } from './sections/Pilot.tsx';
import { SiteFooter } from './sections/SiteFooter.tsx';
import styles from './Page.module.css';

const ids = { pilot: 'pilot', how: 'how-it-works' } as const;
const pilotEmail = `mailto:${content.pilot.email}?subject=${encodeURIComponent(content.pilot.subject)}`;

/** The whole site: one page, top to bottom. */
export function Page() {
  return (
    <>
      <div className={styles.top}>
        <SiteHeader
          brand={content.brand}
          logo={content.logo}
          cta={content.pilotCta}
          ctaHref={`#${ids.pilot}`}
        />
        <main>
          <Hero
            hero={content.hero}
            cta={content.pilotCta}
            ctaHref={`#${ids.pilot}`}
            howHref={`#${ids.how}`}
          />
          <Statement statement={content.statement} />
          <Planning planning={content.planning} />
          <Steps id={ids.how} how={content.how} />
          <Trust trust={content.trust} />
          <Proof proof={content.proof} />
          <Pilot id={ids.pilot} pilot={content.pilot} href={pilotEmail} />
        </main>
      </div>
      <SiteFooter footer={content.footer} />
    </>
  );
}
