import styles from "./AboutMe.module.css";

export default function AboutMe() {

    return(
        <section className={styles.section} id="about">
            <div>
                <h2 className={styles.heading}>
                    About Me
                </h2>
                <p className={styles.textBlock}>
                    I'm <strong>Seturaman</strong>, a developer based in India (IIT BHU) 
                    currently a student. I finished studying Full Stack in Decemeber 2025. 
                    I just started moving away from frontend to <strong>Backend and DevOps. </strong> 
                    I have used AWS before and worked with <strong>EC2 and S3.</strong>
                </p>
            </div>
            <div className={styles.bentoGrid}>
                <div className={`${styles.bentoBox} ${styles.wide} ${styles.mobileHidden}`}>
                    <h3 className={styles.boxTitle}>Setup</h3>
                    <div className={styles.tagContainer}>
                        <span className={styles.tag}>Arch Linux</span>
                        <span className={styles.tag}>NeoVim</span>
                        <span className={styles.tag}>VS Code</span>
                        <span className={styles.tag}>Tmux</span>
                    </div>
                </div>
                <div className={`${styles.bentoBox} ${styles.tall}`}>
                    <h3 className={styles.boxTitle}>Learning</h3>
                    <div className={styles.list}>
                        <span className={styles.listItems}>DevOps</span>
                        <span className={styles.listItems}>Ansible</span>
                        <span className={styles.listItems}>Terraform</span>
                        <span className={styles.listItems}>Django</span>
                        <span className={styles.listItems}>Structure Design</span>
                    </div>
                </div>
                <div className={`${styles.bentoBox}  ${styles.mobileHidden} ${styles.optional}`}>
                    <h3 className={styles.boxTitle}>Location</h3>
                    <p className={styles.boxValue}>India (IIT BHU)</p>
                </div>
                <div className={`${styles.bentoBox}  ${styles.mobileHidden} ${styles.optional}`}>
                    <h3 className={styles.boxTitle}>Hobbies</h3>
                    <p className={styles.boxValue}>Music</p>
                </div>
            </div>
            <div className={styles.textBlock}>
                <p>
                    Beyond the frontend, I find the backend and DevOps logic quite
                    interesting. Moving away from frontend I have learned <strong>Terraform, 
                    Ansible, Nginx and Monit</strong> for DevOps. And started learning <strong>Django </strong> 
                    for creating newer projects to start integrating AI/ML.
                </p>
            </div>
        </section>
    )

}