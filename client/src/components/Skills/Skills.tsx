"use client";

import SkillCard from "../SkillCard/SkillCard";
import styles from "./Skills.module.css";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"

const skills = [
    {name: "Node.js",icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"},
    {name: "Express.js",icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg"},
    {name: "Next.js",icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg"},
    {name: "Ansible",icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ansible/ansible-original.svg"},
    {name: "Terraform",icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg"},
    {name: "Nginx",icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg"},
    {name: "Docker",icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg"},
    {name: "TypeScript",icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"},
    {name: "Monit",icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg"},
    {name: "React",icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"},
    {name: "HTML & CSS",icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"},
    {name: "Redis",icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg"},
    {name: "MongoDB",icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg"},
    {name: "MySQL",icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg"},
    {name: "PostgreSQL",icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"},
    {name: "Git & GitHub",icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"},
    {name: "Arch Linux",icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/archlinux/archlinux-original.svg"},
];

export default function Skills() {

    const [isExpanded, setIsExpanded] = useState(false);
    const INITIAL_COUNT = 6;
    const initialSkills = skills.slice(0, INITIAL_COUNT);
    const hiddenSkills = skills.slice(INITIAL_COUNT);

    return (
        <section className={styles.section}>
            <h2 className={styles.title}>Tech Stacks</h2>
            <div className={styles.grid}>
                {
                    initialSkills.map((skill) => (
                        <SkillCard
                            key={skill.name}
                            name={skill.name}
                            iconPath={skill.icon}
                        />
                    ))
                }
            </div>
            <AnimatePresence>
                {
                    isExpanded && (
                        <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            style={{ overflow: "hidden" }}
                        >
                            <div className={styles.grid} style={{ marginTop: "1rem" }}>
                                {
                                    hiddenSkills.map((skills, index) => (
                                        <motion.div
                                            key={skills.name}
                                            initial={{ opacity:0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, delay: index * 0.05}}
                                        >
                                            <SkillCard 
                                                name={skills.name}
                                                iconPath={skills.icon}
                                            />
                                        </motion.div>
                                    ))
                                }
                            </div>
                        </motion.div>
                    )
                }
            </AnimatePresence>
            <div className={styles.buttonContainer}>
                <motion.button 
                    layout
                    onClick={() => setIsExpanded(!isExpanded)} 
                    className={styles.expandButton}
                >
                    <span>{isExpanded ? "Show Less" : "Show All"}</span>
                    <motion.svg
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        width="20" 
                        height="20" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                    >
                        <path d="m6 9 6 6 6-6"/>
                    </motion.svg>
                </motion.button>
            </div>
        </section>
    );

}