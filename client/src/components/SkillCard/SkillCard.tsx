import styles from "./SkillCard.module.css";
import ScrambleCard from "@/components/ScrambleCard/ScrambleCard";
import ScrambleText from "@/components/ScrambleText/ScrambleText";

interface SkillCardProps {
  name: string;
  iconPath: string;
  delay?: number;
}

export default function SkillCard({ name, iconPath, delay = 0 }: SkillCardProps) {
  return (
    <ScrambleCard delay={delay} className={styles.card}>
      <div className={styles.iconContainer}>
        <img src={iconPath} alt={`${name} logo`} className={styles.icon} />
      </div>
      <ScrambleText as="span" text={name} className={styles.name} delay={delay} duration={300} />
    </ScrambleCard>
  );
}
