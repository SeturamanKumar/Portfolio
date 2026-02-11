import styles from "./ProjectsMe.module.css";

export default function Projects() {
  return (
    <section className={styles.section} id="projects">
      <div className={styles.container}>
        <span className={styles.icon}>🚧</span>
        <h2 className={styles.title}>Under Construction</h2>
        <p className={styles.subtitle}>
          I'm currently curating my best work for this showcase. 
          <br />
          Check back soon for some exciting updates!
        </p>
      </div>
    </section>
  );
}