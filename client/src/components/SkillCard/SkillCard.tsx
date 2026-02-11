import styles from "./SkillCard.module.css";

interface SkillCardProps {
    name: string;
    iconPath: string;
}

export default function SkillCard({ name, iconPath }: SkillCardProps) {

    return(
        <div className={styles.card}>
            <div className={styles.iconContainer}>
                <img src={iconPath} alt={`${name} logo`} />
            </div>
            <span className={styles.name}>
                {name}
            </span>
        </div>
    );

}