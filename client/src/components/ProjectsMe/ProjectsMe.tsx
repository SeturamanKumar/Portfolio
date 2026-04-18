import styles from "./ProjectsMe.module.css";
import ProjectCard from "../ProjectCard/ProjectCard";
import ScrambleText from "@/components/ScrambleText/ScrambleText";
import { SCRAMBLE_DURATION, GAP } from "@/lib/scrambleConfig";
import { projectsContent } from "@/lib/pageContent";

const STEP = SCRAMBLE_DURATION + GAP;

const HEADING_DELAY = 0;
const CARD_0_DELAY  = HEADING_DELAY + STEP;
const CARD_1_DELAY  = CARD_0_DELAY  + STEP;

const projects = [
  {
    title: "Portfolio Website",
    description: "Personal portfolio website with a serverless contact form. Frontend hosted on CloudFront, backend uses Lambda and API Gateway to send emails via SES.",
    tech: ["Next.js", "Node.js/Express", "AWS Lambda", "API Gateway", "SES", "CloudFront"],
    status: "Live" as const,
    links: { github: "https://github.com/SeturamanKumar/Portfolio", live: "https://seturaman.me" },
  },
  {
    title: "SquadHost",
    description: "Minecraft server hosting platform on AWS. Users select server specs via a web interface and launch servers on demand. Auto-shutdown after 8 min of no players; master server terminates itself after 10 min of no active servers to achieve scale-to-zero billing.",
    tech: ["Next.js", "Python/Django", "PostgreSQL", "Docker", "AWS (EC2, S3, Lambda, RDS)", "Terraform", "Ansible"],
    status: "Live" as const,
    links: { github: "https://github.com/SeturamanKumar/SquadHost", live: "#" },
  },
];

export default function Projects() {
  return (
    <section className={styles.section} id="projects">
      <div className={styles.container}>
        <ScrambleText as="h2" text={projectsContent.heading} className={styles.heading} delay={HEADING_DELAY} />
        <div className={styles.grid}>
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              {...project}
              delay={index === 0 ? CARD_0_DELAY : CARD_1_DELAY}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
