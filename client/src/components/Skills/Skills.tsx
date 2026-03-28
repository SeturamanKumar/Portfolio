"use client";

import SkillCard from "../SkillCard/SkillCard";
import styles from "./Skills.module.css";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrambleText from "@/components/ScrambleText/ScrambleText";
import { SCRAMBLE_DURATION, GAP } from "@/lib/scrambleConfig";

const STEP = 200 + GAP;

const skills = [
  { name: "Node.js",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Express.js",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
  { name: "Next.js",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "Ansible",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ansible/ansible-original.svg" },
  { name: "Terraform",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg" },
  { name: "Nginx",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg" },
  { name: "Docker",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "TypeScript",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "Monit",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg" },
  { name: "React",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "HTML & CSS",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "Redis",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
  { name: "MongoDB",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "MySQL",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "PostgreSQL",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "Git & GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
  { name: "Arch Linux",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/archlinux/archlinux-original.svg" },
];

const INITIAL_COUNT    = 6;
const HERO_DONE_DELAY  = 2000; 
const HEADING_DELAY    = HERO_DONE_DELAY;
const FIRST_CARD_DELAY = HEADING_DELAY + STEP;

export default function Skills() {
  const [isExpanded, setIsExpanded] = useState(false);
  const expandedAtRef = useRef<number | null>(null);

  const initialSkills = skills.slice(0, INITIAL_COUNT);
  const hiddenSkills  = skills.slice(INITIAL_COUNT);

  function handleExpand() {
    if (!isExpanded) {
      expandedAtRef.current = Date.now();
    }
    setIsExpanded(!isExpanded);
  }

  return (
    <section className={styles.section}>
      <ScrambleText as="h2" text="Tech Stacks" className={styles.title} delay={HEADING_DELAY} />

      <div className={styles.grid}>
        {initialSkills.map((skill, index) => (
          <SkillCard
            key={skill.name}
            name={skill.name}
            iconPath={skill.icon}
            delay={FIRST_CARD_DELAY + index * STEP}
          />
        ))}
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div className={styles.grid} style={{ marginTop: "1rem" }}>
              {hiddenSkills.map((skill, index) => {
                const delay = expandedAtRef.current
                  ? Math.max(0, expandedAtRef.current + index * STEP - Date.now())
                  : index * STEP;
                return (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <SkillCard
                      name={skill.name}
                      iconPath={skill.icon}
                      delay={delay}
                    />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={styles.buttonContainer}>
        <motion.button
          layout
          onClick={handleExpand}
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
            <path d="m6 9 6 6 6-6" />
          </motion.svg>
        </motion.button>
      </div>
    </section>
  );
}
