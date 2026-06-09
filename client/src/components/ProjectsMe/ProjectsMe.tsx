import styles from "./ProjectsMe.module.css";
import ProjectCard from "@/components/ProjectCard/ProjectCard";
import RoadmapTimeline from "@/components/RoadmapTimeline/RoadmapTimeline";
import { projects, projectsContent } from "@/lib/pageContent";

const featured  = projects.find((p) => p.featured)!;
const secondary = projects.filter((p) => !p.featured);

export default function ProjectsMe() {
  return (
    <div className={`page ${styles.page}`}>
      <div className={styles.inner}>

        <h1 className={`${styles.heading} reveal`}>{projectsContent.heading}</h1>

        {/* ── SquadHost Featured ── */}
        <section className={`${styles.featured} reveal reveal-delay-1`}>
          <p className={styles.featuredEyebrow}>Featured</p>

          <div className={styles.featuredHeader}>
            <h2 className={styles.featuredName}>{featured.title}</h2>
            <span className={styles.featuredBadge}>Live</span>
          </div>

          <p className={styles.featuredTagline}>{featured.tagline}</p>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statVal}>~$0.06</span>
              <span className={styles.statLabel}>per 2 hr session</span>
            </div>
            <div className={styles.statDiv} />
            <div className={styles.stat}>
              <span className={styles.statVal}>$0.00</span>
              <span className={styles.statLabel}>when idle</span>
            </div>
            <div className={styles.statDiv} />
            <div className={styles.stat}>
              <span className={styles.statVal}>8 min</span>
              <span className={styles.statLabel}>auto-shutdown</span>
            </div>
          </div>

          <p className={styles.featuredDesc}>{featured.description}</p>

          <div className={styles.tech}>
            {featured.tech.map((t) => (
              <span key={t} className={styles.tag}>{t}</span>
            ))}
          </div>

          <div className={styles.roadmapWrap}>
            <RoadmapTimeline />
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
