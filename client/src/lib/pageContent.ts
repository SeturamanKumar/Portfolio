export const heroContent = {
  name: "Seturaman Kumar",
  title: "Cloud Architecture & DevOps",
  location: "India · IIT BHU",
  locationUrl: "https://maps.app.goo.gl/rEZX88Bywc9zXqr77",
  github: "https://github.com/SeturamanKumar",
  linkedin: "https://www.linkedin.com/in/seturaman-kumar-955615320/",
  email: "kumar.seturaman@gmail.com",
};

export const aboutContent = {
  heading: "About",
  bio: "I'm Seturaman — a developer and infrastructure engineer based at IIT BHU. I started with Full Stack in 2024 and have since moved deeper into backend systems, cloud infrastructure, and DevOps. I work primarily on AWS, building things that scale gracefully and cost close to nothing when idle.",
  learning: [
    "AWS Advanced Services",
    "Terraform & IaC patterns",
    "Ansible automation",
    "Django & REST APIs",
    "Systems Architecture",
  ],
  setup: ["Arch Linux", "NeoVim", "VS Code", "Tmux"],
};

export const projectsContent = {
  heading: "Projects",
};

export const contactContent = {
  heading: "Get in Touch",
};

export const skills = [
  { name: "Python",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "TypeScript",  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "JavaScript",  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "C++",         icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
  { name: "Django",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" },
  { name: "Node.js",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Next.js",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "React",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "PostgreSQL",  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "MongoDB",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "Redis",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
  { name: "Docker",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "Ansible",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ansible/ansible-original.svg" },
  { name: "Nginx",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg" },
  { name: "AWS",         icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" },
  { name: "Azure",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" },
  { name: "Terraform",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg" },
  { name: "Linux",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
  { name: "Arch Linux",  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/archlinux/archlinux-original.svg" },
  { name: "Git",         icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
  { name: "MySQL",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "SQLite",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg" },
  { name: "Express.js",  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
  { name: "Ubuntu",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ubuntu/ubuntu-plain.svg" },
];

export const projects = [
  {
    id: "squadhost",
    title: "SquadHost",
    tagline: "Self-hosted Minecraft infrastructure on AWS. Scale to zero. $0 when idle.",
    description:
      "SquadHost lets you self-host a Minecraft server on AWS EC2 that automatically hibernates after 8 minutes of inactivity and restores world data from S3 on demand. Terraform provisions everything; Ansible configures the instance. A Next.js dashboard controls the server lifecycle. A typical 2-hour session costs around $0.06.",
    tech: ["Next.js", "Python / Django", "PostgreSQL", "Docker", "AWS EC2 · S3 · Lambda · RDS", "Terraform", "Ansible"],
    status: "Live" as const,
    featured: true,
    links: {
      github: "https://github.com/SeturamanKumar/SquadHost",
      live: "https://squadhost.seturaman.me",
      docs: "https://squadhost.seturaman.me",
    },
  },
  {
    id: "portfolio",
    title: "Portfolio Website",
    tagline: "This site — serverless contact form, CloudFront CDN.",
    description:
      "Personal portfolio with a fully serverless contact form. The frontend is distributed via CloudFront; the backend uses Lambda + API Gateway to forward messages through SES.",
    tech: ["Next.js", "AWS Lambda", "API Gateway", "SES", "CloudFront"],
    status: "Live" as const,
    featured: false,
    links: {
      github: "https://github.com/SeturamanKumar/Portfolio",
      live: "https://seturaman.me",
      docs: "",
    },
  },
  {
    id: "da-paper",
    title: "Data Analysis Verification",
    tagline: "Exploratory research paper — IoT & ML extensions incoming.",
    description:
      "An exploratory research paper on data analysis verification methodologies. Future work branches into IoT sensor data integrity and ML-based anomaly detection pipelines.",
    tech: ["Python", "Data Analysis", "Research"],
    status: "Research" as const,
    featured: false,
    links: {
      github: "",
      live: "",
      docs: "",
    },
  },
];
