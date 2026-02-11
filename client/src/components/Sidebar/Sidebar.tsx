"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Sidebar.module.css";
import { motion, LayoutGroup } from "framer-motion";

const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Contact", path: "/contact" },
];

export default function Sidebar() {
    const pathname = usePathname(); 
    
    return(
        <aside className={styles.sidebar}>
            <nav className={styles.nav}>
                {
                    navItems.map((item) => {
                        const isActive = pathname === item.path;
                        return(
                            <Link 
                                key={item.path}
                                href={item.path}
                                className={`${styles.link} ${isActive ? styles.active : ""}`}
                            >
                                {
                                    isActive && (
                                        <motion.div
                                            layoutId="active-pill"
                                            className={styles.activeBackground}
                                            transition={{ type: "spring", stiffness: 300, damping:30 }}
                                        />
                                    )
                                }
                                <span className={styles.linkText}>
                                    {item.name}
                                </span>
                            </Link>
                        )
                    })
                }
            </nav>
        </aside>
    )
}