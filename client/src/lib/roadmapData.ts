export type PhaseStatus = "done" | "active" | "planned";

export interface RoadmapPhase {
  id: number;
  label: string;
  shortLabel: string;
  status: PhaseStatus;
  brief: string;
}

export const roadmapPhases: RoadmapPhase[] = [
  {
    id: 1,
    label: "Architecture Refactoring & Stable Base",
    shortLabel: "Stable Base",
    status: "active",
    brief: "DynamoDB migration, Lambda orchestration, cross-platform Terraform, pre-flight checks.",
  },
  {
    id: 2,
    label: "Cybersecurity & Networking Hardening",
    shortLabel: "Security",
    status: "planned",
    brief: "VPC hardening, IAM least-privilege audit, Secrets management, AWS Shield, audit logging.",
  },
  {
    id: 3,
    label: "Mod Support (Non-Servo)",
    shortLabel: "Mods",
    status: "planned",
    brief: "CurseForge & Modrinth API integration, Minecraft version management UI, mod file persistence.",
  },
  {
    id: 4,
    label: "Servo-Type Serverless Hosting",
    shortLabel: "Serverless",
    status: "planned",
    brief: "Lambda-based computation offloading, Adaptive Predictive Pre-warming (APP) protocol.",
  },
  {
    id: 5,
    label: "Qt Launcher",
    shortLabel: "Launcher",
    status: "planned",
    brief: "Native cross-platform desktop app wrapping Terraform. First-run wizard, OAuth, world sync.",
  },
  {
    id: 6,
    label: "Multi-Game Support",
    shortLabel: "Multi-Game",
    status: "planned",
    brief: "Abstract server lifecycle interface. Valheim, Terraria, Factorio as initial targets.",
  },
  {
    id: 7,
    label: "Multi-Cloud Support",
    shortLabel: "Multi-Cloud",
    status: "planned",
    brief: "Abstract provider layer in Terraform. DigitalOcean, GCP, and Azure support.",
  },
];
