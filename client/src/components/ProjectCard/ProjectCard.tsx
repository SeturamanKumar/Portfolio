import styles from "./ProjectCard.module.css";

interface ProjectProps {
    title: string,
    description: string,
    tech: string[],
    status: "Live" | "In Progress",
    links: {
        github: string,
        live: string,
    };
}

export default function ProjectCard({ title, description, tech, status, links }: ProjectProps) {

    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <h3 className={styles.projectTitle}>{title}</h3>
                <div className={styles.statusBadge} data-status={status}>
                    {status === "Live" ? "🟢 Live" : "🚧 Building"}
                </div>
            </div>
            <p className={styles.description}>{description}</p>
            <div className={styles.techStack}>
                {
                    tech.map((item) => (
                        <span key={item} className={styles.tag}>
                            {item}
                        </span>
                    ))
                }
            </div>
            <div className={styles.links}>
                <a href={links.github} target="_blank" rel="noopener noreferrer" className={styles.link}>
                    GitHub ↗
                </a>
                {
                    status === "Live" && links.live !== "#" && (
                        <a href={links.live} target="_blank" rel="noopener noreferrer" className={styles.link}>
                            Live Demo ↗
                        </a>
                    )
                }
            </div>
        </div>
    ); 

}
