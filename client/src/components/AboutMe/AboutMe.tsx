import styles from "./AboutMe.module.css";
import ScrambleText from "@/components/ScrambleText/ScrambleText";
import { SCRAMBLE_DURATION, GAP } from "@/lib/scrambleConfig";
import { aboutContent } from "@/lib/pageContent";

export default function AboutMe() {

    return(
        <section className={styles.section} id="about">
            <div>
              <ScrambleText as="h1" text={aboutContent.heading} className={styles.heading} delay={0}/>
              <ScrambleText as="p" text={aboutContent.intro} className={styles.textBlock} delay={SCRAMBLE_DURATION + GAP}/>
            </div>
            <div className={styles.bentoGrid}>
                <div className={`${styles.bentoBox} ${styles.wide} ${styles.mobileHidden}`}>
                    <h3 className={styles.boxTitle}>Setup</h3>
                    <div className={styles.tagContainer}>
                        <span className={styles.tag}>Arch Linux</span>
                        <span className={styles.tag}>NeoVim</span>
                        <span className={styles.tag}>VS Code</span>
                        <span className={styles.tag}>Tmux</span>
                    </div>
                </div>
                <div className={`${styles.bentoBox} ${styles.tall}`}>
                    <h3 className={styles.boxTitle}>Learning</h3>
                    <div className={styles.list}>
                        <span className={styles.listItems}>DevOps</span>
                        <span className={styles.listItems}>Ansible</span>
                        <span className={styles.listItems}>Terraform</span>
                        <span className={styles.listItems}>Django</span>
                        <span className={styles.listItems}>Structure Design</span>
                    </div>
                </div>
                <div className={`${styles.bentoBox}  ${styles.mobileHidden} ${styles.optional}`}>
                    <h3 className={styles.boxTitle}>Location</h3>
                    <p className={styles.boxValue}>India (IIT BHU)</p>
                </div>
                <div className={`${styles.bentoBox}  ${styles.mobileHidden} ${styles.optional}`}>
                    <h3 className={styles.boxTitle}>Hobbies</h3>
                    <p className={styles.boxValue}>Music</p>
                </div>
            </div>
            <div className={styles.textBlock}>
                <ScrambleText as="p" text={aboutContent.outro} delay={SCRAMBLE_DURATION * 2 + GAP}/>
            </div>
        </section>
    )

}
