import Link from "next/link";
import styles from "./Hero.module.css";
import { heroContent } from "@/lib/pageContent";
import TechMarquee from "@/components/TechMarquee/TechMarquee";

export default function Hero() {
  return (
    <section className={styles.hero}>

      <div className={styles.content}>
        <div className={styles.nameWrap}>
          <h1 className={styles.name}>{heroContent.name}</h1>
        </div>

        <div className={styles.titleWrap}>
          <p className={styles.title}>{heroContent.title}</p>
        </div>

        <div className={styles.metaWrap}>
          <div className={styles.meta}>
            <a href={heroContent.locationUrl} target="_blank" rel="noopener noreferrer" className={styles.metaItem}>
              {heroContent.location}
            </a>
            <span className={styles.sep} aria-hidden="true">·</span>
            <a href={heroContent.github} target="_blank" rel="noopener noreferrer" className={styles.metaItem}>
              GitHub ↗
            </a>
            <span className={styles.sep} aria-hidden="true">·</span>
            <a href={heroContent.linkedin} target="_blank" rel="noopener noreferrer" className={styles.metaItem}>
              LinkedIn ↗
            </a>
            <span className={styles.sep} aria-hidden="true">·</span>
            <a href={`mailto:${heroContent.email}`} className={styles.metaItem}>
              Email ↗
            </a>
          </div>
        </div>

        {/* Contact CTA — sits between hero text and the marquee below */}
        <div className={styles.ctaWrap}>
          <Link href="/contact" className={styles.contactBtn}>
            Get in Touch
          </Link>
        </div>
      </div>
      <div className={styles.marqueeWrap}>
        <TechMarquee />
      </div>
    </section>
  );
}
