"use client";

import { useEffect, useRef } from "react";
import styles from "./SquadHostFeature.module.css";
import RoadmapTimeline from "@/components/RoadmapTimeline/RoadmapTimeline";

const stats = [
  { value: "~$0.06", label: "per session" },
  { value: "$0.00",  label: "when idle" },
  { value: "8 min",  label: "auto-shutdown" },
  { value: "10–15m", label: "to deploy" },
];

export default function SquadHostFeature() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll(".reveal");
    if (!els) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } }),
      { threshold: 0.08 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className={styles.section} ref={sectionRef}>
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
          {stats.map((s, i) => (
            <div key={s.label} className={styles.statGroup}>
              {i > 0 && <div className={styles.divider} aria-hidden="true" />}
              <div className={styles.stat}>
                <span className={styles.statVal}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            </div>
          ))}
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
