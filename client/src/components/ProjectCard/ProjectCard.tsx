import styles from "./ProjectCard.module.css";

interface ProjectCardProps {
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  status: "Live" | "Research" | "In Progress";
  links: { github: string; live: string; docs: string };
}

export default function ProjectCard({ title, tagline, description, tech, status, links }: ProjectCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.cardTop}>
        <div className={styles.titleRow}>
          <h3 className={styles.title}>{title}</h3>
          <span className={`${styles.badge} ${styles[`badge_${status.replace(" ", "_").toLowerCase()}`]}`}>
            {status}
          </span>
        </div>
        <p className={styles.tagline}>{tagline}</p>
      </div>

      <p className={styles.desc}>{description}</p>

      <div className={styles.tech}>
        {tech.map((t) => (
          <span key={t} className={styles.tag}>{t}</span>
        ))}
      </div>

      {(links.github || links.live || links.docs) && (
        <div className={styles.links}>
          {links.github && (
            <a href={links.github} target="_blank" rel="noopener noreferrer" className={styles.link}>
              GitHub ↗
            </a>
          )}
          {links.live && (
            <a href={links.live} target="_blank" rel="noopener noreferrer" className={styles.link}>
              Live ↗
            </a>
          )}
          {links.docs && (
            <a href={links.docs} target="_blank" rel="noopener noreferrer" className={styles.link}>
              Docs ↗
            </a>
          )}
        </div>
      )}
    </div>
  );
}
