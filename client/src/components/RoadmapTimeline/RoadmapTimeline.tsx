"use client";

import { useState } from "react";
import styles from "./RoadmapTimeline.module.css";
import { roadmapPhases } from "@/lib/roadmapData";

const STATUS_LABEL: Record<string, string> = {
  done:    "Completed",
  active:  "In Progress",
  planned: "Planned",
};

export default function RoadmapTimeline() {
  const [hovered, setHovered] = useState<number | null>(null);
  const total     = roadmapPhases.length;
  const activeIdx = roadmapPhases.findIndex((p) => p.status === "active");
  const fillPct   = activeIdx <= 0 ? 0 : (activeIdx / (total - 1)) * 100;

  return (
    <div className={styles.wrapper}>
      <p className={styles.eyebrow}>Roadmap</p>

      {/* ── Desktop: horizontal grid ── */}
      <div
        className={styles.grid}
        style={{ gridTemplateColumns: `repeat(${total}, 1fr)` }}
      >
        {/* Track line — spans all columns */}
        <div className={styles.trackWrap} style={{ gridColumn: `1 / ${total + 1}` }}>
          <div className={styles.track}>
            <div className={styles.fill} style={{ width: `${fillPct}%` }} />
          </div>
        </div>

        {roadmapPhases.map((phase, i) => {
          const isEdgeRight = i >= total - 2;
          const isEdgeLeft  = i <= 1;
          return (
            <div
              key={phase.id}
              className={styles.col}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className={`${styles.dot} ${styles[`dot_${phase.status}`]}`} />

              <div className={styles.labelGroup}>
                <span className={styles.phaseNum}>P{phase.id}</span>
                {/* Short label — desktop only */}
                <span className={`${styles.shortLabel} ${phase.status === "active" ? styles.accentText : ""}`}>
                  {phase.shortLabel}
                </span>
              </div>

              {hovered === i && (
                <div
                  className={`${styles.tooltip}
                    ${isEdgeRight ? styles.tooltipRight : ""}
                    ${isEdgeLeft  ? styles.tooltipLeft  : ""}`}
                >
                  <span className={styles.ttPhase}>Phase {phase.id}</span>
                  <span className={styles.ttLabel}>{phase.label}</span>
                  <span className={styles.ttBrief}>{phase.brief}</span>
                  <span className={`${styles.ttStatus} ${styles[`status_${phase.status}`]}`}>
                    {STATUS_LABEL[phase.status]}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Mobile: vertical list ── */}
      <ol className={styles.verticalList}>
        {roadmapPhases.map((phase) => (
          <li key={phase.id} className={styles.verticalItem}>
            <div className={`${styles.vDot} ${styles[`dot_${phase.status}`]}`} />
            <div className={styles.vContent}>
              <div className={styles.vHeader}>
                <span className={styles.vPhaseNum}>P{phase.id}</span>
                <span className={`${styles.vStatus} ${styles[`status_${phase.status}`]}`}>
                  {STATUS_LABEL[phase.status]}
                </span>
              </div>
              <p className={`${styles.vLabel} ${phase.status === "active" ? styles.accentText : ""}`}>
                {phase.label}
              </p>
              <p className={styles.vBrief}>{phase.brief}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
