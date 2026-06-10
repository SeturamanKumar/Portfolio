"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./AboutMe.module.css";
import SkillCard from "@/components/SkillCard/SkillCard";
import { aboutContent, skills } from "@/lib/pageContent";

const INITIAL = 6;
const visibleSkills = skills.slice(0, INITIAL);
const hiddenSkills  = skills.slice(INITIAL);

interface ChipMeta {
  icon?: string;
  svg?: React.ReactNode;
  glow: string;
  border: string;
}

const CHIP_DETAILS: Record<string, ChipMeta> = {
  "AWS Advanced Services": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
    glow: "rgba(255, 153, 0, 0.15)",
    border: "rgba(255, 153, 0, 0.5)",
  },
  "Terraform & IaC patterns": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg",
    glow: "rgba(132, 79, 186, 0.18)",
    border: "rgba(132, 79, 186, 0.5)",
  },
  "Ansible automation": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ansible/ansible-original.svg",
    glow: "rgba(238, 0, 0, 0.15)",
    border: "rgba(238, 0, 0, 0.5)",
  },
  "Django & REST APIs": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
    glow: "rgba(43, 169, 112, 0.18)",
    border: "rgba(43, 169, 112, 0.5)",
  },
  "Systems Architecture": {
    svg: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
        <rect x="2" y="3" width="20" height="8" rx="2" ry="2" />
        <rect x="2" y="13" width="20" height="8" rx="2" ry="2" />
        <line x1="6" y1="7" x2="6.01" y2="7" />
        <line x1="6" y1="17" x2="6.01" y2="17" />
        <line x1="10" y1="7" x2="10.01" y2="7" />
        <line x1="10" y1="17" x2="10.01" y2="17" />
      </svg>
    ),
    glow: "rgba(100, 160, 255, 0.15)",
    border: "rgba(100, 160, 255, 0.4)",
  },
  "Arch Linux": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/archlinux/archlinux-original.svg",
    glow: "rgba(23, 147, 209, 0.18)",
    border: "rgba(23, 147, 209, 0.5)",
  },
  "NeoVim": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/neovim/neovim-original.svg",
    glow: "rgba(87, 161, 67, 0.18)",
    border: "rgba(87, 161, 67, 0.5)",
  },
};

const defaultMeta: ChipMeta = {
  svg: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  ),
  glow: "rgba(255,255,255,0.06)",
  border: "var(--border-hover)",
};

function ChipList({ items }: { items: string[] }) {
  return (
    <div className={styles.chips}>
      {items.map((item) => {
        const meta = CHIP_DETAILS[item] || defaultMeta;
        return (
          <span
            key={item}
            className={styles.chip}
            style={{
              "--hover-glow": meta.glow,
              "--hover-border": meta.border,
            } as React.CSSProperties}
          >
            {meta.icon ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={meta.icon} alt={item} width={16} height={16} className={styles.chipIcon} />
            ) : (
              meta.svg
            )}
            {item}
          </span>
        );
      })}
    </div>
  );
}

export default function AboutMe() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const els = pageRef.current?.querySelectorAll(".reveal");
    if (!els) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } }),
      { threshold: 0.08 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className={`page ${styles.page}`} ref={pageRef}>
      <div className={styles.inner}>

        <h1 className={`${styles.heading} reveal`}>{aboutContent.heading}</h1>

        <p className={`${styles.bio} reveal reveal-delay-1`}>{aboutContent.bio}</p>

        {/* Currently Learning */}
        <div className={`${styles.block} reveal reveal-delay-2`}>
          <p className={styles.blockLabel}>Currently Learning</p>
          <ChipList items={aboutContent.learning} />
        </div>

        {/* Setup */}
        <div className={`${styles.block} reveal reveal-delay-3`}>
          <p className={styles.blockLabel}>Daily Setup</p>
          <ChipList items={aboutContent.setup} />
        </div>

        {/* Tech Stack — expandable SkillCard grid */}
        <div className={`${styles.block} reveal reveal-delay-4`}>
          <p className={styles.blockLabel}>Tech Stack</p>

          <div className={styles.grid}>
            {visibleSkills.map((s) => (
              <SkillCard key={s.name} name={s.name} iconPath={s.icon} />
            ))}
          </div>

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
