import styles from "./AboutMe.module.css";
import ScrambleText from "@/components/ScrambleText/ScrambleText";
import ScrambleCard from "@/components/ScrambleCard/ScrambleCard";
import { SCRAMBLE_DURATION, GAP } from "@/lib/scrambleConfig";
import { aboutContent } from "@/lib/pageContent";

const STEP = SCRAMBLE_DURATION + GAP;
const TOTAL = SCRAMBLE_DURATION;

const HEADING_DELAY = 0;
const INTRO_DELAY   = HEADING_DELAY + STEP;
const BENTO_0_DELAY = INTRO_DELAY   + STEP;
const BENTO_1_DELAY = BENTO_0_DELAY + STEP;
const BENTO_2_DELAY = BENTO_1_DELAY + STEP;
const BENTO_3_DELAY = BENTO_2_DELAY + STEP;
const OUTRO_DELAY   = BENTO_3_DELAY + STEP;

function slices(cardDelay: number, n: number): Array<{ delay: number; duration: number }> {
  const duration = TOTAL / n;
  return Array.from({ length: n }, (_, i) => ({
    delay: cardDelay + i * duration,
    duration,
  }));
}

export default function AboutMe() {

  const setup    = slices(BENTO_0_DELAY, 5);
  const learning = slices(BENTO_3_DELAY, 6);
  const location = slices(BENTO_1_DELAY, 2);
  const hobbies  = slices(BENTO_2_DELAY, 2);

  return (
    <section className={styles.section} id="about">
      <div>
        <ScrambleText as="h1" text={aboutContent.heading} className={styles.heading} delay={HEADING_DELAY} />
        <ScrambleText as="p"  text={aboutContent.intro}   className={styles.textBlock} delay={INTRO_DELAY} />
      </div>

      <div className={styles.bentoGrid}>

        <ScrambleCard delay={BENTO_0_DELAY} className={`${styles.bentoBox} ${styles.wide} ${styles.mobileHidden}`}>
          <h3 className={styles.boxTitle}>
            <ScrambleText as="span" text="Setup"     delay={setup[0].delay} duration={setup[0].duration} />
          </h3>
          <div className={styles.tagContainer}>
            <ScrambleText as="span" text="Arch Linux" className={styles.tag} delay={setup[1].delay} duration={setup[1].duration} />
            <ScrambleText as="span" text="NeoVim"     className={styles.tag} delay={setup[2].delay} duration={setup[2].duration} />
            <ScrambleText as="span" text="VS Code"    className={styles.tag} delay={setup[3].delay} duration={setup[3].duration} />
            <ScrambleText as="span" text="Tmux"       className={styles.tag} delay={setup[4].delay} duration={setup[4].duration} />
          </div>
        </ScrambleCard>

        <ScrambleCard delay={BENTO_3_DELAY} className={`${styles.bentoBox} ${styles.tall}`}>
          <h3 className={styles.boxTitle}>
            <ScrambleText as="span" text="Learning"        delay={learning[0].delay} duration={learning[0].duration} />
          </h3>
          <div className={styles.list}>
            <ScrambleText as="span" text="DevOps"           className={styles.listItems} delay={learning[1].delay} duration={learning[1].duration} />
            <ScrambleText as="span" text="Ansible"          className={styles.listItems} delay={learning[2].delay} duration={learning[2].duration} />
            <ScrambleText as="span" text="Terraform"        className={styles.listItems} delay={learning[3].delay} duration={learning[3].duration} />
            <ScrambleText as="span" text="Django"           className={styles.listItems} delay={learning[4].delay} duration={learning[4].duration} />
            <ScrambleText as="span" text="Structure Design" className={styles.listItems} delay={learning[5].delay} duration={learning[5].duration} />
          </div>
        </ScrambleCard>

        <ScrambleCard delay={BENTO_1_DELAY} className={`${styles.bentoBox} ${styles.mobileHidden} ${styles.optional}`}>
          <h3 className={styles.boxTitle}>
            <ScrambleText as="span" text="Location"     delay={location[0].delay} duration={location[0].duration} />
          </h3>
          <ScrambleText as="p" text="India (IIT BHU)" className={styles.boxValue} delay={location[1].delay} duration={location[1].duration} />
        </ScrambleCard>

        <ScrambleCard delay={BENTO_2_DELAY} className={`${styles.bentoBox} ${styles.mobileHidden} ${styles.optional}`}>
          <h3 className={styles.boxTitle}>
            <ScrambleText as="span" text="Hobbies" delay={hobbies[0].delay} duration={hobbies[0].duration} />
          </h3>
          <ScrambleText as="p" text="Music"       className={styles.boxValue} delay={hobbies[1].delay} duration={hobbies[1].duration} />
        </ScrambleCard>

      </div>

      <div className={styles.textBlock}>
        <ScrambleText as="p" text={aboutContent.outro} delay={OUTRO_DELAY} />
      </div>
    </section>
  );
}
