import { content } from './content.ts';
import { SiteHeader } from './sections/SiteHeader.tsx';
import { Hero } from './sections/Hero.tsx';
import { Statement } from './sections/Statement.tsx';
import { Planning } from './sections/Planning.tsx';
import { Steps } from './sections/Steps.tsx';
import { Trust } from './sections/Trust.tsx';
import { Contact } from './sections/Contact.tsx';
import { SiteFooter } from './sections/SiteFooter.tsx';
import styles from './Page.module.css';

const ids = { contact: 'contact', how: 'how-it-works' } as const;

/** The whole site: one page, top to bottom. */
export function Page() {
  return (
    <>
      <div className={styles.top}>
        <SiteHeader brand={content.brand} />
        <main>
          <Hero hero={content.hero} howHref={`#${ids.how}`} />
          <Statement statement={content.statement} />
          <Planning planning={content.planning} />
          <Steps id={ids.how} how={content.how} />
          <Trust trust={content.trust} />
          <Contact id={ids.contact} contact={content.contact} />
        </main>
      </div>
      <SiteFooter footer={content.footer} />
    </>
  );
}
