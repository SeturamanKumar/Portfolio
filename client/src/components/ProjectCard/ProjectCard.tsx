import styles from "./ProjectCard.module.css";
import ScrambleText from "@/components/ScrambleText/ScrambleText";
import ScrambleCard from "@/components/ScrambleCard/ScrambleCard";
import { SCRAMBLE_DURATION } from "@/lib/scrambleConfig";

interface ProjectProps {
  title: string;
  description: string;
  tech: string[];
  status: "Live" | "In Progress";
  links: {
    github: string;
    live: string;
  };
  delay?: number;
}

const SLICES = 4;
const SLICE_DURATION = SCRAMBLE_DURATION / SLICES;

export default function ProjectCard({ title, description, tech, status, links, delay = 0 }: ProjectProps) {

  const s0 = { delay: delay + SLICE_DURATION * 0, duration: SLICE_DURATION };
  const s1 = { delay: delay + SLICE_DURATION * 1, duration: SLICE_DURATION };
  const s2 = { delay: delay + SLICE_DURATION * 2, duration: SLICE_DURATION };
  const s3 = { delay: delay + SLICE_DURATION * 3, duration: SLICE_DURATION };

  return (
    <ScrambleCard delay={delay} className={styles.card}>
      <div className={styles.cardHeader}>
        <ScrambleText as="h3" text={title} className={styles.projectTitle} delay={s0.delay} duration={s0.duration} />
        <ScrambleText
          as="div"
          text={status === "Live" ? "🟢 Live" : "🚧 Building"}
          className={styles.statusBadge}
          delay={s0.delay}
          duration={s0.duration}
        />
      </div>

      <ScrambleText as="p" text={description} className={styles.description} delay={s1.delay} duration={s1.duration} />

      <div className={styles.techStack}>
        {tech.map((item) => (
          <ScrambleText key={item} as="span" text={item} className={styles.tag} delay={s2.delay} duration={s2.duration} />
        ))}
      </div>

      <div className={styles.links}>
        <ScrambleText as="span" text="GitHub ↗" className={styles.link} delay={s3.delay} duration={s3.duration} />
        {status === "Live" && links.live !== "#" && (
          <ScrambleText as="span" text="Live Demo ↗" className={styles.link} delay={s3.delay} duration={s3.duration} />
        )}
      </div>
    </ScrambleCard>
  );
}
