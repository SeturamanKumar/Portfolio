export type PhaseStatus = "done" | "active" | "planned";

export interface RoadmapPhase {
  id: number;
  label: string;
  shortLabel: string;
  status: PhaseStatus;
  brief: string;
  bullets: string[];
}

export const roadmapPhases: RoadmapPhase[] = [
  {
    id: 1,
    label: "Architecture Refactoring & Stable Base",
    shortLabel: "Stable Base",
    status: "active",
    brief: "DynamoDB migration, Lambda orchestration, cross-platform Terraform, pre-flight checks.",
    bullets: [
      "Migrate from RDS to DynamoDB",
      "Fully serverless Minecraft orchestration via Lambda (removes Ansible)",
      "Windows-native Terraform deployment (removes Docker requirement)",
      "CloudFormation one-click IAM setup",
      "Pre-flight checks: virtualization, Docker, Terraform version detection",
      "Automatic playit.gg tunnel reconnection",
      "S3 mod file persistence (skip re-download if version unchanged)",
      "Nuke flag to destroy everything including worlds; default preserves world data",
      "Terraform version pinning with local copy fallback",
      "Documentation polish",
    ],
  },
  {
    id: 2,
    label: "Cybersecurity & Networking Hardening",
    shortLabel: "Security",
    status: "planned",
    brief: "VPC hardening, IAM least-privilege audit, Secrets management, AWS Shield, audit logging.",
    bullets: [
      "VPC hardening with private subnets",
      "Security group tightening",
      "IAM least-privilege audit",
      "Secrets management improvements",
      "AWS Shield Standard configuration",
      "Audit logging",
    ],
  },
  {
    id: 3,
    label: "Mod Support (Non-Servo)",
    shortLabel: "Mods",
    status: "planned",
    brief: "CurseForge & Modrinth API integration, Minecraft version management UI, mod file persistence.",
    bullets: [
      "itzg environment variable integration in dashboard",
      "CurseForge and Modrinth API integration for modpack selection",
      "Minecraft version management UI",
      "S3 mod file persistence to skip re-downloads on same modpack version",
    ],
  },
  {
    id: 4,
    label: "Servo-Type Serverless Hosting",
    shortLabel: "Serverless",
    status: "planned",
    brief: "Lambda-based computation offloading, Hybrid EC2/Lambda architecture, APP protocol.",
    bullets: [
      "Lambda-based computation offloading for game server workloads",
      "Hybrid EC2/Lambda architecture",
      "APP protocol: successor Lambda triggered at 80% of predecessor execution",
      "Crash handling: kill signal propagates downstream via CloudWatch",
      "Timeout handling: failed instance warms the next one",
      "Benchmarking against standard EC2 hosting",
    ],
  },
  {
    id: 5,
    label: "Qt Launcher",
    shortLabel: "Launcher",
    status: "planned",
    brief: "Native cross-platform desktop app wrapping Terraform. First-run wizard, OAuth, world sync.",
    bullets: [
      "Native cross-platform desktop app (Windows, Linux, macOS)",
      "Wraps existing Terraform deployment internally",
      "First-run wizard: virtualization check, Docker detection, CloudFormation IAM setup",
      "Access Key + Secret Key input once, never again",
      "Minecraft Microsoft OAuth authentication",
      "Prism Launcher-style instance management",
      "World file conversion (singleplayer → multiplayer via S3)",
      "Server launch, monitor, and status from launcher",
      "Auto-updater, Windows code signing + Apple notarization",
    ],
  },
  {
    id: 6,
    label: "Multi-Game Support",
    shortLabel: "Multi-Game",
    status: "planned",
    brief: "Abstract server lifecycle interface. Valheim, Terraria, Factorio as initial targets.",
    bullets: [
      "Abstract server lifecycle into a generic interface",
      "Each game: Docker image, port config, watchdog logic",
      "Dynamic dashboard per game type",
      "Initial targets: Valheim, Terraria, Factorio",
    ],
  },
  {
    id: 7,
    label: "Multi-Cloud Support",
    shortLabel: "Multi-Cloud",
    status: "planned",
    brief: "Abstract provider layer in Terraform. DigitalOcean, GCP, and Azure support.",
    bullets: [
      "Abstract provider layer in Terraform configs",
      "DigitalOcean support",
      "Google Cloud Platform support",
      "Microsoft Azure support",
    ],
  },
];
