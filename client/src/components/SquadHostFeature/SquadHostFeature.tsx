import styles from "./SquadHostFeature.module.css";
import RoadmapTimeline from "@/components/RoadmapTimeline/RoadmapTimeline";

export default function SquadHostFeature() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>

        <p className={`${styles.eyebrow} reveal`}>Featured Project</p>

        <div className={`${styles.header} reveal reveal-delay-1`}>
          <h2 className={styles.name}>SquadHost</h2>
          <p className={styles.tagline}>
            Self-hosted Minecraft infrastructure on AWS.<br />
            Scale to zero.{" "}
            <span className={styles.accent}>$0 when idle.</span>
          </p>
        </div>

        <div className={`${styles.stats} reveal reveal-delay-2`}>
          <div className={styles.stat}>
            <span className={styles.statVal}>~$0.06</span>
            <span className={styles.statLabel}>per 2 hr session</span>
          </div>
          <div className={styles.divider} aria-hidden="true" />
          <div className={styles.stat}>
            <span className={styles.statVal}>$0.00</span>
            <span className={styles.statLabel}>when idle</span>
          </div>
          <div className={styles.divider} aria-hidden="true" />
          <div className={styles.stat}>
            <span className={styles.statVal}>8 min</span>
            <span className={styles.statLabel}>auto-shutdown</span>
          </div>
          <div className={styles.divider} aria-hidden="true" />
          <div className={styles.stat}>
            <span className={styles.statVal}>10–15 min</span>
            <span className={styles.statLabel}>to deploy</span>
          </div>
        </div>

        <div className={`reveal reveal-delay-3`}>
          <RoadmapTimeline />
        </div>

        <div className={`${styles.ctas} reveal reveal-delay-4`}>
          <a
            href="https://github.com/SeturamanKumar/SquadHost"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnPrimary}
          >
            GitHub ↗
          </a>
          <a
            href="https://squadhost.seturaman.me"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnSecondary}
          >
            Docs ↗
          </a>
        </div>

      </div>
    </section>
  );
}
