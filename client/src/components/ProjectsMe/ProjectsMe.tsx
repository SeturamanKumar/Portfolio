"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./ProjectsMe.module.css";
import ProjectCard from "@/components/ProjectCard/ProjectCard";
import { roadmapPhases } from "@/lib/roadmapData";
import { projects, projectsContent } from "@/lib/pageContent";

const featured  = projects.find((p) => p.featured)!;
const secondary = projects.filter((p) => !p.featured);

const STATUS_LABEL: Record<string, string> = {
  done:    "Completed",
  active:  "In Progress",
  planned: "Planned",
};

const stats = [
  { value: "~$0.06", label: "per 2 hr session" },
  { value: "$0.00",  label: "when idle" },
  { value: "8 min",  label: "auto-shutdown" },
];

export default function ProjectsMe() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const activePhase = hovered !== null ? roadmapPhases[hovered] : null;

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

        <h1 className={`${styles.heading} reveal`}>{projectsContent.heading}</h1>

        {/* ── SquadHost Featured ── */}
        <section className={`${styles.featured} reveal reveal-delay-1`}>
          <div className={styles.featuredHeader}>
            <div>
              <p className={styles.featuredEyebrow}>Featured</p>
              <h2 className={styles.featuredName}>{featured.title}</h2>
            </div>
            <span className={styles.featuredBadge}>Live</span>
          </div>

          <p className={styles.featuredDesc}>{featured.description}</p>

          <div className={styles.stats}>
            {stats.map((s) => (
              <div key={s.label} className={styles.statPill}>
                <span className={styles.statVal}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>

          <div className={styles.tech}>
            {featured.tech.map((t) => (
              <span key={t} className={styles.tag}>{t}</span>
            ))}
          </div>

          {/* Side-view roadmap */}
          <div className={styles.roadmapWrap}>
            <div className={styles.roadmapCard}>

              {/* Dot track */}
              <div className={styles.trackCol}>
                <p className={styles.roadmapLabel}>Roadmap</p>
                <ol className={styles.timeline}>
                  {roadmapPhases.map((phase, i) => {
                    const isLast    = i === roadmapPhases.length - 1;
                    const isHovered = hovered === i;

                    const displayStatus =
                      hovered !== null
                        ? isHovered ? "active" : "planned"
                        : phase.status;

                    return (
                      <li
                        key={phase.id}
                        className={`${styles.timelineItem} ${isLast ? styles.timelineItemLast : ""}`}
                        onMouseEnter={() => setHovered(i)}
                        onMouseLeave={() => setHovered(null)}
                      >
                        <div className={styles.dotWrap}>
                          <div className={`${styles.dot} ${styles[`dot_${displayStatus}`]}`} />
                          {!isLast && <div className={styles.trackLine} />}
                        </div>
                        <div className={styles.timelineText}>
                          <span className={styles.phaseNum}>P{phase.id}</span>
                          <span className={`${styles.phaseName} ${isHovered ? styles.phaseNameHovered : ""}`}>
                            {phase.shortLabel}
                          </span>
                        </div>

                        {/* Mobile inline detail */}
                        {isHovered && (
                          <div className={styles.mobileDetail}>
                            <span className={styles.dtPhase}>Phase {phase.id}</span>
                            <span className={styles.dtLabel}>{phase.label}</span>
                            <ul className={styles.dtBullets}>
                              {phase.bullets.map((b) => (
                                <li key={b}>{b}</li>
                              ))}
                            </ul>
                            <span className={`${styles.dtStatus} ${styles[`status_${phase.status}`]}`}>
                              {STATUS_LABEL[phase.status]}
                            </span>
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ol>
              </div>

              {/* Detail panel — desktop only */}
              <div className={styles.detailPanel}>
                {activePhase ? (
                  <div className={styles.detailCard} key={activePhase.id}>
                    <span className={styles.dtPhase}>Phase {activePhase.id}</span>
                    <span className={styles.dtLabel}>{activePhase.label}</span>
                    <ul className={styles.dtBullets}>
                      {activePhase.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                    <span className={`${styles.dtStatus} ${styles[`status_${activePhase.status}`]}`}>
                      {STATUS_LABEL[activePhase.status]}
                    </span>
                  </div>
                ) : (
                  <div className={styles.detailHint}>
                    <span>Hover a phase</span>
                    <span>to see details →</span>
                  </div>
                )}
              </div>

            </div>
          </div>

          <div className={styles.ctas}>
            <a href={featured.links.github} target="_blank" rel="noopener noreferrer" className={styles.btnPrimary}>
              GitHub ↗
            </a>
            <a href={featured.links.docs} target="_blank" rel="noopener noreferrer" className={styles.btnSecondary}>
              Docs ↗
            </a>
          </div>
        </section>

        <div className={`${styles.divider} reveal`} aria-hidden="true" />

        {/* ── Secondary cards ── */}
        <div className={styles.grid}>
          {secondary.map((project, i) => (
            <div key={project.id} className={`reveal reveal-delay-${i + 1}`}>
              <ProjectCard
                title={project.title}
                tagline={project.tagline}
                description={project.description}
                tech={project.tech}
                status={project.status}
                links={project.links}
              />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
