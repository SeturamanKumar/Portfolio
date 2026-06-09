"use client";

import { useState } from "react";
import styles from "./AboutMe.module.css";
import SkillCard from "@/components/SkillCard/SkillCard";
import { aboutContent, skills } from "@/lib/pageContent";

const INITIAL = 6;
const visibleSkills = skills.slice(0, INITIAL);
const hiddenSkills  = skills.slice(INITIAL);

export default function AboutMe() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`page ${styles.page}`}>
      <div className={styles.inner}>

        <h1 className={`${styles.heading} reveal`}>{aboutContent.heading}</h1>

        <p className={`${styles.bio} reveal reveal-delay-1`}>{aboutContent.bio}</p>

        {/* Currently Learning */}
        <div className={`${styles.block} reveal reveal-delay-2`}>
          <p className={styles.blockLabel}>Currently Learning</p>
          <div className={styles.chips}>
            {aboutContent.learning.map((item) => (
              <span key={item} className={styles.chip}>{item}</span>
            ))}
          </div>
        </div>

        {/* Setup */}
        <div className={`${styles.block} reveal reveal-delay-3`}>
          <p className={styles.blockLabel}>Setup</p>
          <div className={styles.chips}>
            {aboutContent.setup.map((item) => (
              <span key={item} className={`${styles.chip} ${styles.chipMono}`}>{item}</span>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className={`${styles.block} reveal reveal-delay-4`}>
          <p className={styles.blockLabel}>Tech Stack</p>

          {/* Always visible — first 6 */}
          <div className={styles.grid}>
            {visibleSkills.map((s) => (
              <SkillCard key={s.name} name={s.name} iconPath={s.icon} />
            ))}
          </div>

          {/* Expandable — rest */}
          <div className={`${styles.expandGrid} ${expanded ? styles.open : ""}`}>
            <div className={styles.grid}>
              {hiddenSkills.map((s) => (
                <SkillCard key={s.name} name={s.name} iconPath={s.icon} />
              ))}
            </div>
          </div>

          <button
            className={styles.expandBtn}
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
          >
            <span>{expanded ? "Show Less" : `Show All (${skills.length})`}</span>
            <svg
              className={expanded ? styles.chevronUp : styles.chevronDown}
              width="16" height="16" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
}
