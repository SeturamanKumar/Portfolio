import styles from "./ProjectsMe.module.css";
import ProjectCard from "../ProjectCard/ProjectCard";

const projects = [
  {
    title: "Cloud-Native Portfolio (This Website)",
    description: "A full-stack personal platform deployed on Azure. It features a self-healing infrastructure managed by Monit, automated configuration via Ansible, infrastructure-as-code provisioning with Terraform, and SSL certificates signed by certbot.",
    tech: [
      "Next.js",
      "Django",
      "Azure VM",
      "Nginx",
      "Ansible",
      "Terraform",
      "Monit",
    ],
    status: "Live" as const,
    links: {
      github: "https://github.com/SeturamanKumar/Portfolio",
      live: "https://seturaman.me",
    },
  },
  {
    title: "SqaudHost (Building)",
    description: "An on-demand Minecraft server hosting platform. It uses AWS Boto3 to programmatically launch EC2 Spot Instances and backs up game worlds to S3 automatically to minimize costs.",
    tech: [
      "AWS EC2",
      "AWS S3",
      "Docker",
      "Python/Boto3",
      "Next.js",
    ],
    status: "In Progress" as const,
    links: {
      github: "https://github.com/SeturamanKumar",
      live: "#",
    },
  },
];

export default function Projects() {
  return (
    <section className={styles.section} id="projects">
      <div className={styles.container}>
        <h2 className={styles.heading}>Featured Projects</h2>
        <div className={styles.grid}>
          {
            projects.map((project, index) => (
              <ProjectCard
                key={index}
                {...project}
              />
            ))
          }
        </div>
      </div>
    </section>
  );
}