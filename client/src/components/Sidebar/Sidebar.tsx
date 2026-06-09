"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Sidebar.module.css";

const STEP = 100; // ms delay between each nav item fade-in

const navItems = [
  { name: "Home",     path: "/" },
  { name: "About",    path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Contact",  path: "/contact" },
];

interface NavLinkProps {
  name: string;
  path: string;
  isActive: boolean;
  initialDelay: number;
}

function NavLink({ name, path, isActive, initialDelay }: NavLinkProps) {
  return (
    <Link href={path} className={`${styles.link} ${isActive ? styles.active : ""}`}>
      <span
        className={styles.linkText}
        style={{ animationDelay: `${initialDelay}ms` }}
      >
        {name}
      </span>
    </Link>
  );
}

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        {navItems.map((item, index) => {
          function isActivePath(itemPath: string, currentPath: string): boolean {
            const normalise = (p: string) => (p.replace(/\/$/, '') || '/');
            const cur = normalise(currentPath);
            const item = normalise(itemPath);
            if (item === '/') return cur === '/';
            return cur.startsWith(item);
          }
          const isActive = isActivePath(item.path, pathname);

          return (
            <NavLink
              key={item.path}
              name={item.name}
              path={item.path}
              isActive={isActive}
              initialDelay={index * STEP}
            />
          );
        })}
      </nav>
    </aside>
  );
}
