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
    title: "Cloud-Native Portfolio (This Website)",
    description: "A full-stack personal platform deployed on Azure. It features a self-healing infrastructure managed by Monit, automated configuration via Ansible, infrastructure-as-code provisioning with Terraform, and SSL certificates signed by certbot.",
    tech: ["Next.js", "Django", "Azure VM", "Nginx", "Ansible", "Terraform", "Monit"],
    status: "Live" as const,
    links: { github: "https://github.com/SeturamanKumar/Portfolio", live: "https://seturaman.me" },
  },
  {
    title: "SqaudHost (Building)",
    description: "An on-demand Minecraft server hosting platform. It uses AWS Boto3 to programmatically launch EC2 Spot Instances and backs up game worlds to S3 automatically to minimize costs.",
    tech: ["AWS EC2", "AWS S3", "Docker", "Python/Boto3", "Next.js"],
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
